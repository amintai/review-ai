import { createClient } from './supabaseServer';

// Subscription tier limits
export const TIER_LIMITS = {
    prod_starter: {
        responses_per_month: 10,
        locations: 1
    },
    prod_pro: {
        responses_per_month: -1, // unlimited
        locations: 5
    },
    prod_enterprise: {
        responses_per_month: -1,
        locations: -1 // unlimited
    }
} as const;

export interface UserSubscription {
    id: string;
    product_id: string;
    status: string;
    current_period_end: string | null;
    cancel_at_period_end: boolean;
}

/**
 * Get user's active subscription
 */
export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('subscriptions')
        .select('id, product_id, status, current_period_end, cancel_at_period_end')
        .eq('user_id', userId)
        .in('status', ['active', 'trialing'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error || !data) {
        return null;
    }

    return data;
}

/**
 * Get user's current usage count for the billing period
 */
export async function getUserUsageCount(
    userId: string,
    action: string = 'generation'
): Promise<number> {
    const supabase = await createClient();

    // Get start of current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
        .from('usage_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('action', action)
        .gte('created_at', startOfMonth.toISOString());

    if (error) {
        console.error('Error getting usage count:', error);
        return 0;
    }

    return count || 0;
}

/**
 * Check if user has remaining usage quota
 */
export async function checkUsageLimit(
    userId: string,
    action: string = 'generation'
): Promise<{ allowed: boolean; remaining: number; limit: number }> {
    const subscription = await getUserSubscription(userId);

    // Determine product tier
    const productId = subscription?.product_id || 'prod_starter';
    const limits = TIER_LIMITS[productId as keyof typeof TIER_LIMITS] || TIER_LIMITS.prod_starter;

    // -1 means unlimited
    if (limits.responses_per_month === -1) {
        return { allowed: true, remaining: -1, limit: -1 };
    }

    const currentUsage = await getUserUsageCount(userId, action);
    const remaining = Math.max(0, limits.responses_per_month - currentUsage);

    return {
        allowed: remaining > 0,
        remaining,
        limit: limits.responses_per_month
    };
}

/**
 * Log a usage event
 */
export async function logUsage(
    userId: string,
    action: string,
    metadata: Record<string, unknown> = {}
): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('usage_logs')
        .insert({
            user_id: userId,
            action,
            metadata
        });

    if (error) {
        console.error('Error logging usage:', error);
    }
}

/**
 * Get user's tier info with limits
 */
export async function getUserTier(userId: string): Promise<{
    productId: string;
    name: string;
    limits: { responses_per_month: number; locations: number };
    usage: { responses: number };
}> {
    const subscription = await getUserSubscription(userId);
    const productId = subscription?.product_id || 'prod_starter';
    const limits = TIER_LIMITS[productId as keyof typeof TIER_LIMITS] || TIER_LIMITS.prod_starter;
    const responseUsage = await getUserUsageCount(userId, 'generation');

    const tierNames: Record<string, string> = {
        prod_starter: 'Starter',
        prod_pro: 'Pro',
        prod_enterprise: 'Enterprise'
    };

    return {
        productId,
        name: tierNames[productId] || 'Starter',
        limits,
        usage: { responses: responseUsage }
    };
}
