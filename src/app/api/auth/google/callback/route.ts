import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@/lib/supabaseServer';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const userId = searchParams.get('state'); // We passed userId as state
    const errorParam = searchParams.get('error');

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (errorParam) {
        console.error('Google Auth Error:', errorParam);
        return NextResponse.redirect(`${appUrl}/dashboard/reviews?error=${encodeURIComponent(errorParam)}`);
    }

    if (!code || !userId) {
        console.error('Missing code or state in callback');
        return NextResponse.redirect(`${appUrl}/dashboard/reviews?error=missing_params`);
    }

    try {
        const oauth2Client = new google.auth.OAuth2(
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            `${appUrl}/api/auth/google/callback`
        );

        const { tokens } = await oauth2Client.getToken(code);

        if (tokens.refresh_token) {
            const supabase = await createClient();

            // Use RPC to bypass RLS and ensure token is saved
            // We use the internal secret defined in the DB function
            const { error: rpcError } = await supabase.rpc('set_google_token_secure', {
                p_user_id: userId,
                p_token: tokens.refresh_token,
                p_secret: 'review-ai-internal-secret-8923'
            });

            if (rpcError) {
                console.error('RPC Error saving token:', rpcError);
                return NextResponse.redirect(`${appUrl}/dashboard/reviews?error=db_save_failed`);
            }
        } else {
            console.warn('No refresh token returned from Google. This usually happens if the user already granted permission and we did not force prompt:consent.');
            // Note: If they already granted it, we might still have it or need to ask them to disconnect/reconnect.
            // But with prompt: 'consent', we should ALWAYS get it.
        }

        return NextResponse.redirect(`${appUrl}/dashboard/reviews?connected=true`);
    } catch (err: any) {
        console.error('OAuth Callback Error:', err);
        return NextResponse.redirect(`${appUrl}/dashboard/reviews?error=${encodeURIComponent(err.message)}`);
    }
}
