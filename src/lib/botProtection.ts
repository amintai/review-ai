import { checkBotId } from 'botid/server';
import { NextResponse } from 'next/server';

/**
 * Verifies that the incoming request is not from a bot.
 * Returns a 403 error response if bot is detected, null otherwise.
 * 
 * Usage in API routes:
 * ```
 * const botCheck = await verifyNotBot();
 * if (botCheck) return botCheck;
 * ```
 */
export async function verifyNotBot(): Promise<NextResponse | null> {
    try {
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
