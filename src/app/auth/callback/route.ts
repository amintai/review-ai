import { createClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import WelcomeEmail from '@/emails/WelcomeEmail';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && session?.user) {
            const user = session.user;

            // Check if welcome email has been sent
            const { data: profile } = await supabase
                .from('profiles')
                .select('welcome_sent, full_name')
                .eq('id', user.id)
                .single();

            if (profile && !profile.welcome_sent) {
                // Send welcome email
                await sendEmail({
                    to: user.email!,
                    subject: 'Welcome to ReviewAI!',
                    react: WelcomeEmail({ userFirstname: profile.full_name?.split(' ')[0] })
                });

                // Mark as sent
                await supabase
                    .from('profiles')
                    .update({ welcome_sent: true })
                    .eq('id', user.id);
            }

            return NextResponse.redirect(`${origin}${next}`);
        }

        console.error('Auth Callback Error:', error);
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

