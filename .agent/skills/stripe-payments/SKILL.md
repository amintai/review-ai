---
name: stripe-payments
description: "Expert in integrating Stripe for SaaS billing – subscriptions, one-time payments, usage-based billing, webhooks, customer portal, and trial periods. Covers Stripe Checkout, Billing Portal, webhooks with Next.js, and syncing subscription state to your database. Use when: stripe, payments, billing, subscription, checkout, webhook, payment gateway, pricing plans."
source: vibeship-spawner-skills (Apache 2.0)
---

# Stripe Payments

**Role**: SaaS Billing & Payments Engineer

You implement Stripe billing correctly the first time. Webhooks are your ground truth — not the redirect URL. You sync subscription state to your database synchronously. You never trust the client for billing status. Your pricing is clear, upgrade is one click, and cancel is not a dark pattern.

## Capabilities

- Stripe Checkout (hosted, embedded)
- Subscriptions & trials
- Usage-based billing / metered pricing
- Customer Portal (self-serve billing management)
- Webhook handling (idempotent, verified)
- Plan enforcement in middleware / server actions
- Stripe CLI for local webhook testing

## Patterns

### Database Schema for Billing

Sync Stripe state to your DB

**When to use**: Before writing any Stripe code

```sql
-- Migration: add billing columns to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS
  stripe_customer_id   TEXT UNIQUE,
  stripe_subscription_id TEXT,
  plan                 TEXT DEFAULT 'free',
  plan_status          TEXT DEFAULT 'active', -- active | trialing | past_due | canceled
  trial_ends_at        TIMESTAMPTZ,
  current_period_end   TIMESTAMPTZ;
```

### Create Checkout Session

Start a subscription

**When to use**: "Upgrade" button clicks

```typescript
// app/api/billing/create-checkout/route.ts
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS = {
  pro_monthly: 'price_xxx',
  pro_yearly:  'price_yyy',
};

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { plan } = await req.json();
  const profile = await getProfile(user.id); // your helper

  // Create or retrieve Stripe customer
  let customerId = profile.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email });
    customerId = customer.id;
    await supabase.from('profiles').update({ stripe_customer_id: customerId })
      .eq('user_id', user.id);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgraded=true`,
    cancel_url:  `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    subscription_data: { trial_period_days: 14 },
    metadata: { user_id: user.id },
  });

  return Response.json({ url: session.url });
}
```

### Webhook Handler

Ground truth for subscription state — always use webhooks

**When to use**: Any subscription event (upgrade, cancel, payment failure)

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response('Webhook signature invalid', { status: 400 });
  }

  const supabase = createClient(); // service role for DB writes
  
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const plan = sub.items.data[0].price.lookup_key ?? 'pro';
      await supabase.from('profiles').update({
        stripe_subscription_id: sub.id,
        plan,
        plan_status:        sub.status,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        trial_ends_at:      sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
      }).eq('stripe_customer_id', sub.customer as string);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await supabase.from('profiles').update({
        plan: 'free', plan_status: 'canceled',
        stripe_subscription_id: null,
      }).eq('stripe_customer_id', sub.customer as string);
      break;
    }
  }

  return new Response('ok');
}
```

### Customer Portal

Self-serve billing management

**When to use**: "Manage Billing" button in settings

```typescript
// app/api/billing/portal/route.ts
export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const profile = await getProfile(user!.id);

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id!,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/settings`,
  });

  return Response.json({ url: session.url });
}
```

### Plan Enforcement

Gate features by subscription plan

**When to use**: Anywhere a feature is plan-restricted

```typescript
// lib/billing.ts
import { createClient } from '@/lib/supabase/server';

export async function requirePlan(minPlan: 'pro' | 'enterprise') {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthenticated');

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, plan_status')
    .eq('user_id', user.id)
    .single();

  const PLAN_RANK = { free: 0, pro: 1, enterprise: 2 };
  if (
    !profile ||
    profile.plan_status !== 'active' ||
    PLAN_RANK[profile.plan] < PLAN_RANK[minPlan]
  ) {
    throw new Error('UpgradeRequired');
  }
}

// Usage in a Server Action:
export async function exportData() {
  await requirePlan('pro'); // throws if not pro+
  // ... do the work
}
```

### Local Testing

Test webhooks locally with Stripe CLI

**When to use**: Development

```bash
# Install Stripe CLI, then:
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events:
stripe trigger customer.subscription.created
stripe trigger customer.subscription.deleted
```

## Anti-Patterns

### ❌ Trusting the Redirect URL for Payment Success

**Why bad**: Users can manipulate URLs. Payment may still fail.

**Instead**: Always use webhooks as the source of truth for plan status.

### ❌ Storing Stripe Secret Key Client-Side

**Why bad**: Anyone with the key can charge any card / make refunds.

**Instead**: Secret key only on the server. Never in `NEXT_PUBLIC_*`.

### ❌ Not Verifying Webhook Signatures

**Why bad**: Anyone can POST fake events and get plan upgrades for free.

**Instead**: Always `stripe.webhooks.constructEvent()` with the endpoint secret.

### ❌ Letting Subscriptions Lapse Silently

**Why bad**: Users lose access without warning. Churn.

**Instead**: Handle `invoice.payment_failed`, send dunning emails, downgrade after grace period.

## Related Skills

Works well with: `nextjs-saas-builder`, `supabase-integration`, `saas-marketing`
