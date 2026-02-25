import { checkBotId } from 'botid/server';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

/**
 * Verifies that the incoming request is not from a bot.
 * Returns a 403 error response if bot is detected, null otherwise.
 * 
 * Bypasses check if user is authenticated.
 */
export async function verifyNotBot(): Promise<NextResponse | null> {
    try {
        // Bypass for authenticated users
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            console.log(`[BotID] Bypassing bot check for authenticated user: ${user.id}`);
            return null;
        }

        const verification = await checkBotId();
        if (verification.isBot) {
            console.warn('[BotID] Bot traffic detected and blocked');
            return NextResponse.json(
                {
                    error: 'Access denied. Automated traffic detected.',
                    code: 'BOT_DETECTED'
                },
                { status: 403 }
            );
        }

        return null; // Not a bot, proceed with request
    } catch (error) {
        // If BotID check fails, log but don't block the request
        // This prevents legitimate users from being blocked due to service issues
        console.error('[BotID] Verification error:', error);
        return null;
    }
}
