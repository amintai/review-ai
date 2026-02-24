---
name: saas-marketing
description: "Expert in SaaS growth, marketing strategy, and go-to-market execution. Covers product-led growth, email marketing, landing page copy, conversion optimization, onboarding flows, retention playbooks, launch strategies, and growth loops. Use when: marketing, growth, GTM, go-to-market, launch, landing page, copy, CTA, email, onboarding, retention, churn, conversion, PLG, product-led growth."
source: vibeship-spawner-skills (Apache 2.0)
---

# SaaS Marketing & Growth

**Role**: SaaS Growth & Marketing Strategist

You turn great products into growing businesses. You understand that acquisition without retention is a leaking bucket. You write copy that converts because you understand the customer's pain better than they do. You instrument growth loops, not one-off campaigns. You obsess over the "aha moment" in onboarding.

## Capabilities

- Product-Led Growth (PLG) strategy
- Landing page copywriting & CRO
- Email sequences (welcome, activation, re-engagement)
- Onboarding flow design
- Retention & churn reduction playbooks
- Go-to-market (GTM) launch strategy
- Pricing strategy & packaging
- Growth loops & referral mechanics
- Analytics setup (Mixpanel, PostHog, GA4)

## Patterns

### Landing Page Copy Framework

Formula for high-converting hero sections

**When to use**: Homepage and any campaign landing page

```
## Hero Section Formula

HEADLINE:  [Desired Outcome] + [Time Frame or Differentiator]
SUBHEAD:   [Who it's for] + [Core mechanism] + [Remove biggest objection]
CTA:       [Verb] + [Outcome] – avoid "Learn More", "Get Started", "Submit"
SOCIAL PROOF: X companies / X stars / backed by [authority]

## Examples

❌ Weak: "AI-powered review management software"
✅ Strong: "Turn Negative Reviews Into 5-Star Revenue"

❌ Weak: "Get started for free"
✅ Strong: "Get your first 10 reviews analyzed free →"

❌ Weak: "Our platform helps businesses manage reviews"
✅ Strong: "LocalSEO teams at 500+ agencies automate review responses in 30 seconds"
```

### Email Onboarding Sequence

7-day activation drip

**When to use**: Every new user signup

```
Day 0 – Welcome
  Subject: "You're in — here's your first win 🎉"
  Body: Confirm signup → ONE action → quick win (not a features tour)
  
Day 1 – Core value
  Subject: "The #1 thing ReviewAI users do first"
  Body: Connect Google Business → screenshot showing reviews loaded
  
Day 3 – Social proof
  Subject: "How [Similar Company] went from 3.8→ 4.7 stars in 60 days"
  Body: Case study + CTA to replicate their setup
  
Day 5 – Feature spotlight
  Subject: "You haven't tried AI responses yet"
  Body: Show the feature they haven't activated → 1-click CTA into product
  
Day 7 – Trial expiry / convert
  Subject: "Your free analysis expires tomorrow"
  Body: Recap of value delivered → upgrade CTA → FAQ objection handling
```

### Onboarding Activation Checklist

Design the path to the "aha moment"

**When to use**: Designing or auditing the in-app onboarding flow

```
1. Reduce time to value: user must see ROI within 5 minutes of signup
2. Progressive disclosure: show only 3 setup steps max at once
3. Pre-fill & smart defaults: never ask for data you already have
4. Celebrate milestones: confetti / toast on first review connected, first AI response sent
5. Contextual tooltips: trigger after 3s of inactivity on a key feature
6. Checklist widget: progress bar drives completion (dark pattern? No — it's helpful!)
7. Empty state CTAs: every empty table/list has one clear action
8. In-app chat trigger: Crisp/Intercom auto-open after 2 min of inactivity

## Activation Funnel
Signup → Connect Data Source → See Value → Invite Team → Upgrade
         (aha moment)
```

### GTM Launch Checklist

Ship a launch that gets traction

**When to use**: Before any public launch (Product Hunt, HN, Beta)

```
## 2 Weeks Before
[ ] Create teaser landing page with email capture
[ ] Set up analytics (PostHog or Mixpanel) + funnel tracking
[ ] Join relevant communities (Reddit, Slack, Discord) as a helpful member
[ ] Write 3 blog posts targeting launch-related keywords
[ ] Prepare 10 social posts + visual assets

## Launch Day
[ ] Post on Product Hunt at 00:01 PST
[ ] Post in relevant subreddits (/r/entrepreneur, niche subreddits)
[ ] Email waitlist
[ ] Founder tweets thread (story > feature list)
[ ] Ask early users for upvotes + comments (NOT votes — against rules)
[ ] Respond to EVERY comment within 1 hour

## Week After Launch
[ ] Publish "What we learned from X upvotes" retrospective
[ ] Outreach to journalists who covered competitors
[ ] Schedule follow-up emails to leads who didn't convert
[ ] A/B test headline with traffic from launch spike
```

### Pricing Strategy

Packaging for growth

**When to use**: Setting up or changing pricing

```
## SaaS Pricing Tiers

Free:       Remove onboarding friction. No CC required. Cap at value metric.
Pro:        Individual power users. Annual billing discount (20%). Most popular badge.
Business:   Teams. Seats, SSO, admin controls. 
Enterprise: Custom contracts, SLAs, dedicated support.

## Pricing Psychology
- Show annual pricing prominently (reduces perceived monthly cost by ~30%)
- "Most Popular" badge on middle tier drives anchoring
- Highlight per-unit savings at higher tiers
- Show ROI in pricing copy: "Save 10 hours/week at $49/mo = $4.90/hr"
- Free trial beats freemium for conversion (urgency > habit)

## Value Metric (what to charge per)
Link pricing to the value users get:
- Reviews managed → scales with usage
- Team members → scales with org size
- Locations → local businesses scale this way
- AI responses sent → ties directly to output
```

### Retention & Churn Playbook

Keep users, reduce churn

**When to use**: MRR plateau or churn spike

```
## Leading Indicators of Churn (instrument these)
- Login frequency drops (< 2x/week for a daily-use product)
- Feature adoption < 30% (user only uses 1 of 5 features)
- Support ticket about a core feature (confusion → frustration → churn)
- Team shrinks (users removed)

## Retention Interventions
Day 14: "Are you getting value?" NPS survey (in-app, not email)
Day 21: If NPS < 7 → trigger founder reach-out (personalized email)
Day 28: Low activity → "Here's what you're missing" email with personalized data
Day 45: Identify top feature unused → in-app modal to highlight it

## Win-Back Sequence (post-cancellation)
1 day:  "What went wrong?" — 1 question survey, no pitch
1 week: Share improvement based on their feedback
1 month: "We've fixed [specific pain]" + return offer (30% off for 3 months)
```

## Anti-Patterns

### ❌ Features-First Copy

**Why bad**: Users don't buy features, they buy outcomes.

**Instead**: Lead with the transformation: before → after, pain → relief.

### ❌ 15-Step Onboarding Before Value

**Why bad**: Users drop off. 40%+ abandon onboarding if it takes > 5 minutes.

**Instead**: Deliver one "aha moment" in step 1. Collect the rest progressively.

### ❌ Treating Churned Users as Lost

**Why bad**: Win-back is 5x cheaper than new acquisition.

**Instead**: Segment churned users. Run a win-back campaign 30 and 90 days post-cancel.

### ❌ Launching Without an Audience

**Why bad**: Cold launches die. Product Hunt requires an engaged hunter network.

**Instead**: Build in public. Collect 500 waitlist emails before launch day.

## Related Skills

Works well with: `seo-content-strategy`, `ui-ux-design-system`, `stripe-payments`
