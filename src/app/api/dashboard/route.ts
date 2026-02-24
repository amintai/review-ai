import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const {
            data: { user },
            error
        } = await supabase.auth.getUser(token);

        if (error || !user) {
            return NextResponse.json({ message: 'Unauthorized', status: 401 });
        }

        const { data } = await supabase
            .from('product_analyses')
            .select('id, asin, product_name, created_at, analysis_result')
            .order('created_at', { ascending: false })
            .eq('user_id', user.id)
            .limit(8);

        return NextResponse.json({ data: data, message: 'Data Retrieved Successfully', status: 200 });

    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error', status: 500 }
        );
    }
}