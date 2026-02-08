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

const parseSessionCookie = (cookieValue: string): ParsedSessionCookie | null => {
    try {
        const parsed = JSON.parse(cookieValue);

        if (Array.isArray(parsed) && parsed.length >= 2) {
            return {
                access_token: parsed[0],
                refresh_token: parsed[1]
            };
        }

        if (typeof parsed === 'object' && parsed) {
            return {
                access_token: (parsed as ParsedSessionCookie).access_token,
                refresh_token: (parsed as ParsedSessionCookie).refresh_token
            };
        }
    } catch {
        // noop - we'll return null below
    }

    return null;
};

/**
 * Synchronizes the Supabase session from the extension's cookies.
 * This is crucial for linking the web app login to the extension.
 */
export const syncSession = async () => {
    if (!hasSupabaseConfig || !supabaseUrl || !supabase) {
        console.warn('Supabase environment variables are not configured for extension auth sync.');
        return null;
    }

    const cookieUrl = REVIEWAI_BASE_URL;

    // The cookie name format used by @supabase/ssr
    // Usually sb-[project-id]-auth-token
    const projectId = supabaseUrl.split('.')[0].split('//')[1];
    const cookieName = `sb-${projectId}-auth-token`;

    try {
        const cookie = await chrome.cookies.get({
            url: cookieUrl,
            name: cookieName
        });

        if (cookie) {
            // Supabase SSR cookies are often JSON encoded double-strings or base64.
            // We try to parse the access_token.
            const cookieValue = decodeURIComponent(cookie.value);
            const sessionData = parseSessionCookie(cookieValue);

            if (sessionData?.access_token && sessionData?.refresh_token) {
                const { data, error } = await supabase.auth.setSession({
                    access_token: sessionData.access_token,
                    refresh_token: sessionData.refresh_token
                });

                if (error) {
                    console.warn('Supabase setSession failed in extension:', error.message);
                    return null;
                }

                return data.session;
            }

            console.warn('ReviewAI auth cookie found but has unsupported format.');
        }
    } catch (err) {
        console.error('Failed to sync session from cookies', err);
    }
    return null;
};
