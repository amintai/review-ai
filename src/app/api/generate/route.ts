import { NextResponse } from 'next/server';
// import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import { SYSTEM_PROMPT, constructUserPrompt, GenerateReviewParams } from '@/lib/ai-prompt';
import { z } from 'zod';
import Bytez from "bytez.js";
import { sendEmail } from '@/lib/email';
import GenerationSuccessEmail from '@/emails/GenerationSuccessEmail';
import { verifyNotBot } from '@/lib/botProtection';


// Schema for input validation
const GenerationSchema = z.object({
    reviewText: z.string().min(10).max(5000),
    businessName: z.string().min(1).max(200),
    businessType: z.string().max(100).optional(),
    tone: z.enum(['professional', 'friendly', 'empathetic', 'witty']).default('professional'),
    instructions: z.string().max(1000).optional(),
    location: z.string().max(200).optional(),
    productService: z.string().max(200).optional()
});

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);
const model = bytez.model("openai/gpt-4.1");

export async function POST(req: Request) {
    try {
        // 0. Bot Protection Check
        const botCheck = await verifyNotBot();
        if (botCheck) return botCheck;

        // 1. Parse and Validate Input
        const json = await req.json();
        const validation = GenerationSchema.safeParse(json);

        if (!validation.success) {
            return NextResponse.json({
                error: 'Invalid input data',
                details: validation.error.format()
            }, { status: 400 });
        }

        const { reviewText, businessName, businessType, tone, instructions, location, productService } = validation.data;

        // 2. Auth Check
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const token = authHeader.replace('Bearer ', '');

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: authHeader } } }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 3. Usage Check (Free Tier)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { count, error: countError } = await supabase
            .from('generations')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth.toISOString())
            .eq('user_id', user.id);

        if (countError) throw new Error('Database connection error');

        if (count !== null && count >= 10) {
            return NextResponse.json({
                error: 'Usage limit reached. Upgrade to Pro for unlimited generations.',
                limitReached: true
            }, { status: 403 });
        }

        // 4. AI Generation
        const params: GenerateReviewParams = {
            reviewText,
            businessName,
            businessType: businessType || 'Business',
            tone,
            location,
            productService,
            instructions
        };

        // const completion = await openai.chat.completions.create({
        //     model: "gpt-4o-mini",
        //     messages: [
        //         { role: "system", content: SYSTEM_PROMPT },
        //         { role: "user", content: constructUserPrompt(params) }
        //     ],
        //     response_format: { type: "json_object" },
        //     temperature: 0.7,
        //     max_tokens: 500,
        // });

        const { error, output } = await model.run([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: constructUserPrompt(params) }
        ]);

        if (error) throw new Error("AI generation failed");

        const content = output?.content;

        if (!content) throw new Error("Empty response");

        const jsonResponse = JSON.parse(content);

        // 5. Audit Log / Usage Tracking
        try {
            await supabase.from('generations').insert({
                user_id: user.id,
                review_content: reviewText.substring(0, 5000), // Match schema or max allowed
                response_content: content,
                tone_used: tone
            });

            // Send transactional email (fire and forget for response time)
            sendEmail({
                to: user.email!,
                subject: 'Your AI Response is ready!',
                react: GenerationSuccessEmail({
                    businessName: businessName,
                    reviewText: reviewText,
                    response: jsonResponse.response_1 || jsonResponse.response_2 || jsonResponse.response_3 || "Response generated"
                })
            }).catch(e => console.error('Transactional email failed:', e));

        } catch (dbError) {
            // Log the error but don't fail the request for the user
            console.error('[Audit Log Error]:', dbError);
        }

        return NextResponse.json(jsonResponse);


    } catch (error: any) {
        // Sanitize error reporting for production
        console.error('[Generation Error]:', error.message);

        return NextResponse.json(
            { error: 'An internal error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
