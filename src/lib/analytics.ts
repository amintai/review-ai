"use client";

import { track } from "@vercel/analytics";

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
