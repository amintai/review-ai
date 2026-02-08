import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { messages, conversationId, amazonUrl } = await request.json();

        // If it's a new conversation with an Amazon URL, create the conversation
        let currentConversationId = conversationId;

        if (!currentConversationId && amazonUrl) {
            // Extract ASIN from URL
            const asinMatch = amazonUrl.match(/\/dp\/([A-Z0-9]{10})/i) || amazonUrl.match(/\/product\/([A-Z0-9]{10})/i);
            const asin = asinMatch ? asinMatch[1] : null;

            const { data: newConversation, error: convError } = await supabase
                .from('conversations')
                .insert({
                    user_id: session.user.id,
                    amazon_asin: asin,
                    product_title: 'Analyzing...'
                })
                .select()
                .single();

            if (convError) {
                console.error('Failed to create conversation', convError);
                return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
            }
            currentConversationId = newConversation.id;
        }

        // Store user message
        if (messages.length > 0) {
            const lastUserMessage = messages[messages.length - 1];
            if (lastUserMessage.role === 'user') {
                await supabase.from('messages').insert({
                    conversation_id: currentConversationId,
                    role: 'user',
                    content: lastUserMessage.content
                });
            }
        }

        // Construct system prompt for Amazon analysis
        const systemPrompt = `You are ReviewAI, an AI shopping assistant that helps users make smart purchase decisions on Amazon.

When given an Amazon product URL, you should:
1. Acknowledge the product (you can infer from the URL structure)
2. Provide a BUY, SKIP, or CAUTION verdict
3. Give a Trust Score (0-100) based on review authenticity signals
4. List key pros and cons
5. Identify who this product is perfect for and who should avoid it

Be conversational, helpful, and concise. Use emojis sparingly for visual appeal.
If the user asks follow-up questions, answer them based on common Amazon review patterns and product knowledge.`;

        // Prepare messages for Bytez (Llama 3)
        // Ensure system prompt is first
        const bytezMessages = [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: any) => ({
                role: m.role,
                content: m.content
            }))
        ];

        const BYTEZ_API_KEY = process.env.BYTEZ_API_KEY;
        if (!BYTEZ_API_KEY) {
            return NextResponse.json({ error: 'Bytez API Key not configured' }, { status: 500 });
        }

        const response = await fetch('https://api.bytez.com/models/v2/meta-llama/Meta-Llama-3-8B-Instruct/run', {
            method: 'POST',
            headers: {
                'Authorization': BYTEZ_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: bytezMessages,
                stream: true,
                params: {
                    max_new_tokens: 1024,
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Bytez API Error:', response.status, errorText);
            throw new Error(`Bytez API Error: ${response.statusText}`);
        }

        // Create a streaming response
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();
        let fullResponse = '';

        const readableStream = new ReadableStream({
            async start(controller) {
                const reader = response.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        // Parse Bytez SSE format
                        // Bytez usually sends "data: {...}\n\n"
                        const lines = chunk.split('\n');

                        for (const line of lines) {
                            if (line.trim() === '' || line.includes('[DONE]')) continue;

                            // Check if line starts with data:
                            if (line.startsWith('data: ')) {
                                try {
                                    const jsonStr = line.slice(6);
                                    const data = JSON.parse(jsonStr);

                                    // Bytez structure might vary, strictly check Llama 3 output
                                    // Usually data.output or data.token
                                    // Adapting generic SSE handling:
                                    const content = data.output || data.token || data.content || '';

                                    if (content) {
                                        fullResponse += content;
                                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content, conversationId: currentConversationId })}\n\n`));
                                    }
                                } catch (e) {
                                    // Ignore parse errors for partial chunks
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error('Stream reading error', err);
                    controller.error(err);
                } finally {
                    // Store assistant message after streaming completes
                    if (currentConversationId && fullResponse) {
                        await supabase.from('messages').insert({
                            conversation_id: currentConversationId,
                            role: 'assistant',
                            content: fullResponse
                        });
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
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
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
