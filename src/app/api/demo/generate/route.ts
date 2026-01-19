import { NextResponse } from 'next/server';
import Bytez from "bytez.js";
import { SYSTEM_PROMPT, constructUserPrompt, GenerateReviewParams } from '@/lib/ai-prompt';
import { z } from 'zod';

const GenerationSchema = z.object({
    reviewText: z.string().min(10).max(5000),
    businessName: z.string().max(200).optional(),
    tone: z.enum(['professional', 'friendly', 'empathetic', 'witty']).default('professional'),
    instructions: z.string().max(1000).optional(),
    starRating: z.number().int().min(1).max(5).optional(),
});

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);
const model = bytez.model("openai/gpt-4.1");

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const validation = GenerationSchema.safeParse(json);

        if (!validation.success) {
            return NextResponse.json({
                error: 'Invalid input data',
                details: validation.error.format()
            }, { status: 400 });
        }

        const { reviewText, businessName, tone, instructions, starRating } = validation.data;

        const params: GenerateReviewParams = {
            reviewText,
            businessName: businessName || 'your business',
            businessType: 'Business', // default – you can map from platform later if needed
            tone,
            instructions,
            starRating, // passed for future prompt enhancements
        };

        const { error, output } = await model.run([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: constructUserPrompt(params) }
        ]);

        if (error || !output?.content) {
            throw new Error("AI generation failed");
        }

        const content = output.content;
        const jsonResponse = JSON.parse(content);

        // Expecting { responses: string[] }
        if (!jsonResponse.responses || !Array.isArray(jsonResponse.responses)) {
            throw new Error("Invalid response format");
        }

        return NextResponse.json({ responses: jsonResponse.responses });

    } catch (error: any) {
        console.error('[Demo Generation Error]:', error.message);
        return NextResponse.json(
            { error: 'Failed to generate responses. Please try again.' },
            { status: 500 }
        );
    }
}