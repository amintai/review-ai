import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';
import Bytez from "bytez.js";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { extractAsin } from '@/lib/amazon';
import { AMAZON_SYSTEM_PROMPT, constructAmazonAnalysisPrompt } from '@/lib/amazon-ai';
import { verifyNotBot } from '@/lib/botProtection';
import { scrapeAmazonData } from '@/lib/amazon-scraper';

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);
const model = bytez.model("openai/gpt-4.1");

export async function POST(request: Request) {
    try {
        // 1. Bot Protection (temporarily disabled for debugging)
        // const botCheck = await verifyNotBot();
        // if (botCheck) return botCheck;

        // 2. Auth Check (required for chat)
        const authHeader = request.headers.get('authorization') || '';

        const supabase = authHeader
            ? createSupabaseClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    global: {
                        headers: {
                            Authorization: authHeader
                        }
                    }
                }
            )
            : await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error('[Chat API] Auth error:', authError);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 3. Parse Input
        const { messages, conversationId, amazonUrl } = await request.json();
        console.log('[Chat API] Request:', {
            messagesCount: messages?.length,
            conversationId,
            hasAmazonUrl: !!amazonUrl
        });

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
        }

        // 4. Handle conversation creation/management
        let currentConversationId = conversationId;
        let productContext = null;

        // If continuing existing conversation, load product context
        if (currentConversationId && !amazonUrl) {
            const { data: conversation } = await supabase
                .from('conversations')
                .select('amazon_asin')
                .eq('id', currentConversationId)
                .eq('user_id', user.id)
                .single();

            if (conversation?.amazon_asin) {
                // Load existing analysis for context
                const { data: existingAnalysis } = await supabase
                    .from('product_analyses')
                    .select('*')
                    .eq('asin', conversation.amazon_asin)
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (existingAnalysis) {
                    productContext = {
                        ...existingAnalysis,
                        productName: existingAnalysis.product_name
                    };
                }
            }
        }

        // If new conversation with Amazon URL, create conversation and analyze product
        if (!currentConversationId && amazonUrl) {
            const asin = extractAsin(amazonUrl);
            if (!asin) {
                return NextResponse.json({ error: 'Invalid Amazon URL' }, { status: 400 });
            }

            // Try to get existing analysis for this ASIN
            const { data: existingAnalysis } = await supabase
                .from('product_analyses')
                .select('*')
                .eq('asin', asin)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            // If no existing analysis, create one
            if (!existingAnalysis) {
                try {
                    // Use the same scraping and analysis logic as the analyze API
                    const scraped = await scrapeAmazonData(amazonUrl);

                    if (!scraped || scraped.reviews.length < 3) {
                        return NextResponse.json({
                            error: 'Not enough review data found for this product. Try another product URL.'
                        }, { status: 422 });
                    }

                    // Generate AI analysis
                    const { error, output } = await model.run([
                        { role: "system", content: AMAZON_SYSTEM_PROMPT },
                        {
                            role: "user", content: constructAmazonAnalysisPrompt({
                                productName: scraped.productName,
                                reviews: scraped.reviews,
                                price: scraped.price
                            })
                        }
                    ]);

                    if (error || !output?.content) {
                        throw new Error("AI generation failed");
                    }

                    const analysis = JSON.parse(output.content);

                    // Save analysis
                    const { data: newAnalysis } = await supabase.from('product_analyses').insert({
                        user_id: user.id,
                        asin,
                        product_name: scraped.productName,
                        price: scraped.price,
                        analysis_result: analysis,
                        is_public: true
                    }).select().single();

                    productContext = {
                        ...newAnalysis,
                        productName: scraped.productName
                    };
                } catch (err) {
                    console.error('Analysis error:', err);
                    return NextResponse.json({ error: 'Failed to analyze product' }, { status: 500 });
                }
            } else {
                productContext = {
                    ...existingAnalysis,
                    productName: existingAnalysis.product_name
                };
            }

            // Create conversation
            const { data: newConversation, error: convError } = await supabase
                .from('conversations')
                .insert({
                    user_id: user.id,
                    amazon_asin: asin,
                    product_title: productContext.productName
                })
                .select()
                .single();

            if (convError) {
                console.error('Failed to create conversation', convError);
                return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
            }
            currentConversationId = newConversation.id;
        }

        // Handle case where user starts new conversation without Amazon URL
        if (!currentConversationId && !amazonUrl) {
            // For now, we'll create a general conversation
            // In the future, this could be enhanced to handle general product questions
            const { data: newConversation, error: convError } = await supabase
                .from('conversations')
                .insert({
                    user_id: user.id,
                    product_title: 'General Chat'
                })
                .select()
                .single();

            if (convError) {
                console.error('Failed to create conversation', convError);
                return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
            }
            currentConversationId = newConversation.id;
        }

        // 5. Store user message
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage.role === 'user') {
            await supabase.from('messages').insert({
                conversation_id: currentConversationId,
                role: 'user',
                content: lastUserMessage.content
            });
        }

        // 6. Prepare context-aware system prompt
        let systemPrompt = `You are ReviewAI, an AI shopping assistant that helps users make smart purchase decisions on Amazon.

You provide conversational, helpful responses about Amazon products. When analyzing products, you give:
- Clear BUY, SKIP, or CAUTION verdicts
- Trust scores (0-100) based on review authenticity
- Key pros and cons from real reviews
- Who the product is perfect for and who should avoid it

Be conversational, helpful, and concise. Use emojis sparingly for visual appeal.`;

        // Add product context if available
        if (productContext?.analysis_result) {
            const analysis = productContext.analysis_result;
            systemPrompt += `

CURRENT PRODUCT CONTEXT:
Product: ${productContext.productName}
Verdict: ${analysis.verdict}
Confidence: ${analysis.confidence_score}%
Trust Score: ${analysis.trust_score}%
Summary: ${analysis.summary}

Perfect for: ${analysis.perfect_for?.join(', ')}
Avoid if: ${analysis.avoid_if?.join(', ')}
Deal breakers: ${analysis.deal_breakers?.join(', ')}

Use this context to answer follow-up questions about this specific product.`;
        }

        // 7. Prepare messages for AI
        const aiMessages = [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: any) => ({
                role: m.role,
                content: m.content
            }))
        ];

        // 8. Generate AI response (non-streaming first, then convert to streaming)
        console.log('[Chat API] Generating AI response with', aiMessages.length, 'messages');
        const { error, output } = await model.run(aiMessages);

        if (error) {
            console.error('[Chat API] Bytez error:', error);
            throw new Error(`AI generation failed: ${JSON.stringify(error)}`);
        }

        if (!output?.content) {
            console.error('[Chat API] No content in output:', output);
            throw new Error("AI generation returned empty content");
        }

        console.log('[Chat API] Generated response length:', output.content.length);

        // 9. Create streaming response by chunking the complete response
        const encoder = new TextEncoder();
        const fullResponse = output.content;

        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    // Simulate streaming by sending chunks of the response
                    const chunkSize = 10; // Send ~10 characters at a time
                    for (let i = 0; i < fullResponse.length; i += chunkSize) {
                        const chunk = fullResponse.slice(i, i + chunkSize);
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                            content: chunk,
                            conversationId: currentConversationId
                        })}\n\n`));

                        // Small delay to simulate streaming
                        await new Promise(resolve => setTimeout(resolve, 50));
                    }

                    // Store assistant message
                    if (currentConversationId && fullResponse) {
                        await supabase.from('messages').insert({
                            conversation_id: currentConversationId,
                            role: 'assistant',
                            content: fullResponse
                        });
                    }

                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
                } catch (err) {
                    console.error('Stream error:', err);
                    controller.error(err);
                }
            }
        });

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error('Chat API Error', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}