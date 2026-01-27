import DodoPayments from 'dodopayments';

// Initialize Dodo Payments client
export const dodo = new DodoPayments(process.env.DODO_API_KEY!, {
    environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode'
});

// Product IDs (should match Dodo dashboard)
export const PRODUCT_IDS = {
    STARTER: 'prod_starter',
    PRO: process.env.DODO_PRO_PRODUCT_ID || 'prod_pro',
    ENTERPRISE: process.env.DODO_ENTERPRISE_PRODUCT_ID || 'prod_enterprise',
} as const;

// Subscription status types
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'trialing' | 'inactive';

// Helper to verify webhook signature
export async function verifyWebhookSignature(
    payload: string,
    signature: string
): Promise<boolean> {
    try {
        // Dodo uses HMAC-SHA256 for webhook signatures
        const crypto = await import('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', process.env.DODO_WEBHOOK_SECRET!)
            .update(payload)
            .digest('hex');

        return crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );
    } catch {
        return false;
    }
}
