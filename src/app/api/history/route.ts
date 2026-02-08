import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyNotBot } from '@/lib/botProtection';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        // 0. Bot Protection Check
        const botCheck = await verifyNotBot();
        if (botCheck) return botCheck;

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = searchParams.get('search') || '';
        const tone = searchParams.get('tone') || 'all';

        const offset = (page - 1) * limit;

        const authHeader = req.headers.get('Authorization');


        if (!authHeader && !req.headers.get('cookie')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: {
                        Authorization: authHeader || '',
                    },
                },
            }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let query = supabase
            .from('product_analyses')
            .select('*', { count: 'exact' })
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (search) {
            query = query.or(`product_name.ilike.%${search}%,asin.ilike.%${search}%`);
        }

        if (tone && tone !== 'all') {
            query = query.eq('analysis_result->>verdict', tone.toUpperCase());
        }

        const { data, count, error } = await query;

        if (error) {
            console.error('History Fetch Error:', error);
            return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
        }

        return NextResponse.json({
            data,
            total: count || 0,
            page,
            totalPages: Math.ceil((count || 0) / limit)
        });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
