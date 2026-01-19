import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    try {
        // 1. Validate User
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // 2. Generate Google Auth URL
        const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback`;

        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_CLIENT_SECRET,
            redirectUri
        );

        // Note: Callback URL above must match EXACTLY what's in Google Console
        // Adjusting path to match the file structure: /api/auth/google/callback

        const scopes = [
            'https://www.googleapis.com/auth/business.manage', // Manage business
            'https://www.googleapis.com/auth/userinfo.email'
        ];

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline', // Essential for refresh_token
            scope: scopes,
            include_granted_scopes: true,
            state: user.id, // Pass User ID to callback (secure enough for MVP if relying on HTTPS)
            prompt: 'consent' // Force to get refresh_token
        });

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error('OAuth Init Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
