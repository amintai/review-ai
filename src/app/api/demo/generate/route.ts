import { NextResponse } from 'next/server';
import Bytez from "bytez.js";
import { GenerateReviewParams, SYSTEM_PROMPT } from '@/lib/ai-prompt';
import { z } from 'zod';

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

// Simplified prompt for single response generation
const constructDemoPrompt = (params: GenerateReviewParams) => `
### Business Context:
- **Name**: ${params.businessName || 'Our Business'}
- **Type**: ${params.businessType || 'General'}
- **Location**: ${params.location || 'Not specified'}
- **Focus**: ${params.productService || 'General experience'}

### Customer Review:
"${params.reviewText}"

### Requirements:
- **Requested Tone**: ${params.tone}
- **Additional Instructions**: ${params.instructions || 'None'}

### Task:
Generate a single, high-quality response to this review in the ${params.tone} tone.
Do not generate multiple options. Just one standard response.

Format the output as a valid JSON object with a single key: "response".
Example: { "response": "Dear customer..." }
Include NO markdown formatting, NO backticks, and NO extra text.
`;

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
            // Fallback if model didn't return JSON
            return NextResponse.json({ response: content });
        }

    } catch (error: any) {
        console.error('[Demo Generation Error]:', error.message);
        return NextResponse.json(
            { error: 'An internal error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}