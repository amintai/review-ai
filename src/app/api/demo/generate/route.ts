import { NextResponse } from 'next/server';
import Bytez from "bytez.js";
import { GenerateReviewParams, SYSTEM_PROMPT } from '@/lib/ai-prompt';
import { z } from 'zod';
import { verifyNotBot } from '@/lib/botProtection';

// Schema for input validation
const GenerationSchema = z.object({
    reviewText: z.string().min(10).max(5000),
    businessName: z.string().max(200).optional(),
    businessType: z.string().max(100).optional(),
    tone: z.enum(['professional', 'friendly', 'empathetic', 'witty']).default('professional'),
    instructions: z.string().max(1000).optional(),
    location: z.string().max(200).optional(),
    productService: z.string().max(200).optional()
});

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);
const model = bytez.model("openai/gpt-4.1");

// Improved prompt for 3 human-centric and SEO-friendly responses
const constructDemoPrompt = (params: GenerateReviewParams) => `
### Business Context:
- **Name**: ${params.businessName || 'Our Business'}
- **Type**: ${params.businessType || 'General'}
- **Location**: ${params.location || 'Not specified'}
- **Key Products/Services**: ${params.productService || 'General quality service'}

### Customer Review:
"${params.reviewText}"

### Requirements:
- **Requested Tone**: ${params.tone}
- **Additional Instructions**: ${params.instructions || 'None'}

### Task:
Generate **THREE (3)** distinct, high-quality response variations. 
Each response should:
1. **Sound Human-Centric**: Use a warm, authentic voice. Avoid robotic or overly formal "AI-speak". Speak like the owner or manager.
2. **SEO-Friendly**: Naturally incorporate the business name ("${params.businessName}"), location ("${params.location}"), and service ("${params.productService}") where it makes sense to help with local search relevance.
3. **Variations**:
   - **Response 1 (Standard)**: Warm, professional, and addresses all points.
   - **Response 2 (Concise)**: Short, punchy, yet deeply appreciative.
   - **Response 3 (Detailed)**: Comprehensive, perhaps mentioning a value-add or a specific follow-up.

Format the output as a valid JSON object with exactly three keys: "response_1", "response_2", and "response_3".
Include NO markdown formatting, NO backticks, and NO extra text.
`;


export async function POST(req: Request) {
    try {
        // 0. Bot Protection Check
        const botCheck = await verifyNotBot();
        if (botCheck) return botCheck;

        const json = await req.json();
        const validation = GenerationSchema.safeParse(json);

        if (!validation.success) {
            return NextResponse.json({
                error: 'Invalid input data',
                details: validation.error.format()
            }, { status: 400 });
        }

        const { reviewText, businessName, businessType, tone, instructions, location, productService } = validation.data;

        // Basic parameter construction
        const params: GenerateReviewParams = {
            reviewText,
            businessName: businessName || 'Our Business',
            businessType: businessType || 'Business',
            tone,
            location,
            productService,
            instructions
        };

        const { error, output } = await model.run([
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: constructDemoPrompt(params) }
        ]);

        if (error) throw new Error("AI generation failed");

        const content = output?.content;

        if (!content) throw new Error("Empty response");

        try {
            const jsonResponse = JSON.parse(content);
            return NextResponse.json(jsonResponse);
        } catch (e) {
            // Fallback if model didn't return perfect JSON
            return NextResponse.json({
                response_1: content,
                response_2: "Please try regenerating for more options.",
                response_3: "Please try regenerating for more options."
            });
        }


    } catch (error: any) {
        console.error('[Demo Generation Error]:', error.message);
        return NextResponse.json(
            { error: 'An internal error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}