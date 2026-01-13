import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper to validate URL to prevent build crashes with placeholders
const isValidUrl = (url: string | undefined) => {
    try {
        return url && new URL(url);
    } catch {
        return false;
    }
};

// Fallback to a syntactically valid URL if env var is missing or invalid (e.g. 'your-project-url')
const urlToUse = isValidUrl(supabaseUrl) ? supabaseUrl! : 'https://placeholder.supabase.co';
const keyToUse = supabaseAnonKey || 'placeholder-key';

export const supabase = createBrowserClient(urlToUse, keyToUse)
