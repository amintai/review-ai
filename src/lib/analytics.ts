"use client";

import { track } from "@vercel/analytics";
import posthog from "posthog-js";
import { supabase } from "./supabaseClient";

/**
 * Unified tracking utility for Google Analytics and Vercel Analytics.
 * @param eventName The name of the event to track.
 * @param properties Optional properties to include with the event.
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // 1. Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName, properties);
    }

    // 2. Vercel Analytics
    track(eventName, properties);

    // 3. PostHog
    if (typeof window !== "undefined") {
        posthog.capture(eventName, properties);
    }

    // 4. Supabase
    if (typeof window !== "undefined") {
        const logToSupabase = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                await supabase.from("user_events").insert({
                    event_name: eventName,
                    properties: properties || {},
                    user_id: session?.user?.id || null,
                    page_url: window.location.href,
                });
            } catch (err) {
                console.error("Failed to log event to Supabase:", err);
            }
        };
        logToSupabase();
    }
};

/**
 * Specifically tracks conversion-related events.
 */
export const trackConversion = (type: string, details?: Record<string, any>) => {
    trackEvent("conversion", {
        type,
        ...details,
    });
};
