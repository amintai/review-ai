import { NextResponse } from 'next/server';
import Bytez from "bytez.js";
import { z } from 'zod';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { extractAsin, extractMarketplace } from '@/lib/amazon';
import { AMAZON_SYSTEM_PROMPT, constructAmazonAnalysisPrompt } from '@/lib/amazon-ai';
import { verifyNotBot } from '@/lib/botProtection';
import { createClient } from '@/lib/supabaseServer';
import { scrapeAmazonData } from '@/lib/amazon-scraper';

const bytez = new Bytez(process.env.BYTEZ_API_KEY!);
const model = bytez.model("openai/gpt-4.1");

const AnalysisRequestSchema = z.object({
    url: z.string().url(),
    product_title: z.string().optional(),
    price: z.string().optional(),
    reviews: z.array(z.any()).optional()
});

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

const withCors = (response: NextResponse) => {
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
};

export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
        // 1. Bot Protection
        const botCheck = await verifyNotBot();
        if (botCheck) return withCors(botCheck);

        // 2. Parse & Validate Input
        const body = await req.json();
        const validation = AnalysisRequestSchema.safeParse(body);

        if (!validation.success) {
            return withCors(NextResponse.json({
                error: 'Invalid input data',
                details: validation.error.format()
            }, { status: 400 }));
        }

        const { url, product_title, price, reviews: incomingReviews } = validation.data;
        const asin = extractAsin(url);
        const marketplace = extractMarketplace(url);

        if (!asin) {
            return withCors(
                NextResponse.json({ error: 'Invalid Amazon URL or ASIN not found' }, { status: 400 })
            );
        }

        // 3. Auth Check
        const authHeader = req.headers.get('authorization') || '';

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

        const { data: { user } } = await supabase.auth.getUser();

        // 4. Build Data Inputs (Extension-provided reviews first, then server scraping fallback)
        const normalizedIncomingReviews = Array.isArray(incomingReviews)
            ? incomingReviews
                .map((r: any) => (typeof r === 'string' ? r : (r?.text || r?.review || '')).trim())
                .filter((r: string) => r.length >= 20)
                .slice(0, 50)
            : [];

        const scraped = normalizedIncomingReviews.length >= 3
            ? null
            : await scrapeAmazonData(url);

        const productName = (product_title || scraped?.productName || `Amazon Product (${asin})`).trim();
        const effectivePrice = (price || scraped?.price || '').trim();
        const reviews = Array.from(
            new Set([...(normalizedIncomingReviews || []), ...(scraped?.reviews || [])])
        ).slice(0, 50);

        if (reviews.length < 3) {
            return withCors(NextResponse.json(
                { error: 'Not enough real review data found for this product. Try another product URL.' },
                { status: 422 }
            ));
        }

        // 5. AI Analysis
        const { error, output } = await model.run([
            { role: "system", content: AMAZON_SYSTEM_PROMPT },
            {
                role: "user", content: constructAmazonAnalysisPrompt({
                    productName,
                    reviews,
                    price: effectivePrice || undefined
                })
            }
        ]);

        if (error || !output?.content) {
            throw new Error("AI generation failed or returned empty content");
        }

        const analysis = JSON.parse(output.content);

        // 6. Save to Supabase (using product_analyses table as per schema)
        const { data: generation, error: dbError } = await supabase.from('product_analyses').insert({
            user_id: user?.id || null,
            asin,
            product_name: productName,
            price: effectivePrice,
            analysis_result: analysis,
            is_public: true,
            marketplace: marketplace
        }).select('id').single();

        if (dbError) {
            console.error('[DB Error]:', dbError);
        }

        // 7. Success
        return withCors(NextResponse.json({
            id: generation?.id,
            asin,
            productName,
            reviews_used: reviews.length,
            ...analysis
        }));

    } catch (err: any) {
        console.error('[Amazon Analysis Error]:', err.message);
        return withCors(NextResponse.json({ error: 'Failed to analyze product' }, { status: 500 }));
    }
}
