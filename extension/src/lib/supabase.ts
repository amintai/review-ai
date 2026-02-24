import { createClient } from '@supabase/supabase-js';
import { REVIEWAI_BASE_URL } from './config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
    ? createClient(supabaseUrl as string, supabaseAnonKey as string)
    : null;

type ParsedSessionCookie = {
    access_token?: string;
    refresh_token?: string;
};

/**
 * Try to parse Supabase session data from a raw cookie value.
 * Handles the different formats used by @supabase/ssr across versions:
 * - JSON array: [access_token, refresh_token]
 * - Plain JSON object: { access_token, refresh_token }
 * - URL-encoded wrapping of any of the above
 */
const parseSessionCookie = (raw: string): ParsedSessionCookie | null => {
    const attempts = [raw, decodeURIComponent(raw)];

    for (const value of attempts) {
        try {
            const parsed = JSON.parse(value);

            // Format: [access_token, refresh_token] (older @supabase/ssr)
            if (Array.isArray(parsed) && parsed.length >= 2) {
                return { access_token: parsed[0], refresh_token: parsed[1] };
            }

            // Format: { access_token, refresh_token } (object)
            if (parsed && typeof parsed === 'object' && parsed.access_token) {
                return {
                    access_token: parsed.access_token,
                    refresh_token: parsed.refresh_token,
                };
            }
        } catch {
            // not valid JSON — try next
        }
    }

    return null;
};

/**
 * Synchronizes the Supabase session from the extension's cookies.
 *
 * Strategy:
 * 1. Try the canonical cookie name derived from the Supabase project ID
 * 2. Try chunked variant (sb-<id>-auth-token.0) used by newer @supabase/ssr
 * 3. Fall back to scanning ALL cookies on the REVIEWAI_BASE_URL domain for any
 *    sb-*-auth-token pattern — handles edge cases where the project ID differs
 */
export const syncSession = async () => {
    if (!hasSupabaseConfig || !supabaseUrl || !supabase) {
        console.warn('Supabase env vars not configured for extension auth sync.');
        return null;
    }

    const cookieUrl = REVIEWAI_BASE_URL;
    const projectId = supabaseUrl.split('.')[0].split('//')[1];

    // Candidate cookie names to try in order
    const candidateNames = [
        `sb-${projectId}-auth-token`,
        `sb-${projectId}-auth-token.0`,
    ];

    const tryWithCookie = async (name: string): Promise<ParsedSessionCookie | null> => {
        try {
            const cookie = await chrome.cookies.get({ url: cookieUrl, name });
            if (!cookie?.value) return null;
            return parseSessionCookie(cookie.value);
        } catch {
            return null;
        }
    };

    // 1 & 2: Try canonical names
    for (const name of candidateNames) {
        const data = await tryWithCookie(name);
        if (data?.access_token && data?.refresh_token) {
            return applySession(data);
        }
    }

    // 3: Broad fallback — scan all cookies on the domain
    try {
        const allCookies = await chrome.cookies.getAll({ url: cookieUrl });
        const tokenCookies = allCookies.filter(c => /^sb-.*-auth-token/.test(c.name));

        // Sort: prefer chunked .0 last (it's partial), prefer the base token first
        tokenCookies.sort((a, b) => {
            const chunkA = a.name.includes('.') ? 1 : 0;
            const chunkB = b.name.includes('.') ? 1 : 0;
            return chunkA - chunkB;
        });

        for (const cookie of tokenCookies) {
            const data = parseSessionCookie(cookie.value);
            if (data?.access_token && data?.refresh_token) {
                return applySession(data);
            }
        }
    } catch (err) {
        console.error('Fallback cookie scan failed:', err);
    }

    return null;
};

async function applySession(data: ParsedSessionCookie) {
    if (!supabase || !data.access_token || !data.refresh_token) return null;

    const { data: result, error } = await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
    });

    if (error) {
        console.warn('Supabase setSession failed in extension:', error.message);
        return null;
    }

    return result.session;
}
