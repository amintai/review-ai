import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { replyToReview } from '@/lib/google-business';
import { z } from 'zod';

const ReplySchema = z.object({
    reviewName: z.string().min(1),
    replyText: z.string().min(1).max(4000)
});

export async function POST(req: Request) {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const json = await req.json();
        const validation = ReplySchema.safeParse(json);
        if (!validation.success) {
            return NextResponse.json({ error: 'Invalid input', details: validation.error.format() }, { status: 400 });
        }

        const { reviewName, replyText } = validation.data;

        // Fetch Refresh Token
        const { data: profile } = await supabase
            .from('profiles')
            .select('google_refresh_token')
            .eq('id', user.id)
            .single();

        if (!profile?.google_refresh_token) {
            return NextResponse.json({ error: 'Not connected to Google' }, { status: 400 });
        }

        await replyToReview(profile.google_refresh_token, reviewName, replyText);

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('[Reply Error]:', error.message);
        return NextResponse.json({ error: 'Failed to publish reply. Please try again.' }, { status: 500 });
    }
}
