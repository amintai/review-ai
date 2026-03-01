# ReviewAI — Feature Roadmap & Priority Matrix
**Last updated:** February 28, 2026  
**Stage:** Post-launch, pre-growth  
**Strategic direction:** AI Shopping Decision Copilot (not just a fake review detector)

---

## North Star

> The next winner in this category won't be "best fake review detector."  
> It will be the **AI Shopping Decision Copilot.**  
> That's the market ReviewAI is building toward.

---

## Priority Tiers

| Tier | Label | Criteria |
|---|---|---|
| 🔴 P0 | Ship Now | Unblocks growth, fixes critical gaps, highest user impact |
| 🟠 P1 | This Month | Strengthens core differentiators, monetization-ready |
| 🟡 P2 | Next Quarter | Expands TAM, opens new personas |
| 🟢 P3 | Future | Enterprise / platform plays, requires scale first |

---

## 🔴 P0 — SHIP NOW
---

### ✅ P0-4 · Fix Hero Trust Gaps & Inconsistencies [COMPLETED]
**What:** Addressed critical conversion killers:
1. **Social Proof Integrity:** Removed fake "2,000+" claims. Replaced with "Join 100+ early adopters."
2. **Login Friction:** Updated "No account needed" to clarify free signup requirement.
3. **UI Polish:** Refined background density and tagline alignment for premium readability.
**Success metric:** CTR on Hero CTA increased, bounce rate reduced due to honest messaging.

---

### P0-1 · Chrome Extension — Live Verdict Badge
**What:** Full inline verdict badge on Amazon product pages. One click → full report overlay without leaving Amazon. Currently in "Signal Assist" mode — needs to become the primary product surface.  
**Why P0:** This is the single feature that turns ReviewAI from a tool you visit into a habit. Fakespot's extension was why millions used it daily. Every day without the extension is a day users aren't forming the habit.  
**Competitive gap:** ReviewMeta has no extension. Fakespot's extension is dead. You have a clear lane.  
**Effort:** Medium (foundation exists per features.md)  
**Impact:** Highest — daily active usage, organic word-of-mouth, Chrome Web Store distribution channel  
**Success metric:** 500+ extension installs in first 30 days post-launch

---

### P0-2 · Landing Page — Show the Full Report Output
**What:** The homepage currently describes 3 generic features (Instant Verdict, AI Fake Detection, Shop With Confidence). It needs to show the actual report: Verdict card, Trust/Confidence scores, Perfect For, Avoid If, Deal Breakers, Buyer Psychology. Let the depth of the output do the selling.  
**Why P0:** The biggest thing underselling ReviewAI right now is the landing page. Someone reading it thinks they're getting a score. They're getting a full intelligence report.  
**Effort:** Low  
**Impact:** High — directly affects conversion rate of every visitor  
**Success metric:** Homepage bounce rate drops, demo video plays increase

---

### P0-3 · "Fakespot Alternative" SEO Landing Page
**What:** A dedicated `/fakespot-alternative` page targeting the exact queries orphaned Fakespot users are searching. Direct comparison, honest positioning, clear CTA.  
**Why P0:** Fakespot shut down July 1, 2025. It's now February 2026 — 7 months of unmet demand. No competitor has cleanly captured this search traffic. This is a time-sensitive window.  
**Target keywords:** "fakespot alternative" · "fakespot replacement" · "amazon fake review checker" · "fakespot not working"  
**Effort:** Low (1 page + 1 blog post)  
**Impact:** High — free organic traffic from high-intent users  
**Success metric:** Ranking in top 5 Google results for "fakespot alternative" within 60 days

---

## 🟠 P1 — THIS MONTH
### Core differentiators that separate ReviewAI from every competitor

---

### P1-1 · Persona-Based Verdict Mode
**What:** Let users choose their buyer persona before or during analysis. The AI verdict adapts accordingly.

```
Personas:
├── Budget Buyer         → prioritizes value, tolerates minor quality issues
├── Durability Focused   → flags any longevity complaints heavily
├── Brand Loyalist       → compares to brand's other products
├── Risk-Averse          → amplifies deal-breakers and caution signals
└── Tech Enthusiast      → prioritizes spec accuracy and technical review depth
```

**Why P1:** No competitor does this. A "CAUTION" verdict for a risk-averse shopper might be a "BUY" for a budget buyer. Context-aware verdicts make the AI feel personal, not algorithmic. This is the feature that generates the most word-of-mouth ("it actually understood what I care about").  
**Monetization hook:** Persona mode is a Pro-tier feature. It's the clearest upgrade incentive on the free plan.  
**Effort:** Medium  
**Impact:** Very high — differentiation, retention, upgrade conversion  
**Success metric:** 30%+ of Pro users use persona mode within first week of feature launch

---

### P1-2 · Risk Scoring Layer
**What:** Expand beyond Trust Score + Confidence Score. Add four specific risk dimensions shown visually in the report.

```
Risk Dimensions:
├── Durability Risk      → likelihood of failure within 6–12 months
├── Return Risk          → based on complaint patterns about defects on arrival
├── Quality Inconsistency Risk → variance in experience across reviewers
└── Overhype Risk        → gap between marketing claims and actual review sentiment
```

**Why P1:** Trust Score tells you if reviews are authentic. Risk scores tell you what to be afraid of. These are different questions — both matter. This is what turns ReviewAI into a "risk radar" rather than a review scorer.  
**Effort:** Medium (requires new scoring dimensions in the AI prompt + new UI components)  
**Impact:** High — richer reports, more defensible verdicts, better Pro value  
**Success metric:** Risk scores section has >70% scroll-through rate in report

---

### P1-3 · Methodology / Transparency Page
**What:** A plain-English explanation of how ReviewAI analyzes reviews. What signals it looks for, what it doesn't claim to do, what its limitations are.  
**Why P1:** ReviewMeta publishes their methodology explicitly — it's a major trust signal. RateBud was caught doing fake marketing and lost credibility instantly. In a category where users are specifically worried about biased tools, transparency is a moat.  
**Effort:** Low (500-word page, no engineering)  
**Impact:** Medium-High — trust, SEO, press/journalist credibility  
**Success metric:** Referenced by at least 2 external blogs/articles within 90 days

---

### P1-4 · Affiliate / Creator Dedicated Landing Page
**What:** A separate landing page targeting Amazon affiliate creators. Highlights the Affiliate Content Suite — Persuasive Angles, Honest Objections, Buyer Psychology. Clear Creator plan CTA ($29–$79/month).  
**Why P1:** Creators are the most monetizable persona in ReviewAI's user base. They run dozens of analyses, need structured outputs for content, and have clear professional ROI. They're currently invisible in the product's public positioning.  
**Effort:** Low-Medium  
**Impact:** High — opens highest-LTV user segment  
**Success metric:** Creator plan signups begin within 30 days of page going live

---

## 🟡 P2 — NEXT QUARTER
### Features that expand the product's reach and open new markets

---

### P2-1 · Comparison Mode (Product A vs Product B)
**What:** Let users paste two Amazon URLs and get a side-by-side comparison.

```
Output per comparison:
├── Verdict per product (with persona context if set)
├── Risk comparison matrix (4 risk dimensions, side by side)
├── Long-term value assessment
├── Who each product is best for
└── Recommendation: which wins for your persona
```

**Why P2:** This is where affiliate revenue lives. Comparison content ("Product A vs Product B") is the highest-converting affiliate content format. Comparison mode makes ReviewAI the tool for generating that content — and for the individual shopper choosing between two finalists.  
**Monetization:** Comparison mode = Pro tier or Creator tier feature.  
**Effort:** High (new UI, new prompt structure, new report schema)  
**Impact:** Very high — opens affiliate creator market fully, viral content potential  
**Success metric:** 500+ comparisons run in first month post-launch

---

### P2-2 · Similar Product Recommendations
**What:** At the end of every SKIP or CAUTION report, show 2–3 alternative products with their own verdicts and rationale. "You should skip this — but here's what to buy instead."  
**Why P2:** Already in the features.md roadmap. This is the natural completion of a SKIP verdict — if you tell someone not to buy something, the next question is always "then what?" Answering it keeps users in the product loop and opens affiliate linking revenue.  
**Monetization:** Affiliate commission on recommended alternative purchases.  
**Effort:** Medium-High  
**Impact:** High — retention, monetization, user delight  
**Success metric:** 20%+ of SKIP report viewers click through to a recommended alternative

---

### P2-3 · Letter Grade Display (Fakespot Bridge)
**What:** Add a letter grade (A/B/C/D/F) alongside the BUY/SKIP/CAUTION verdict.

```
BUY  + Trust >75  = A
BUY  + Trust 60–75 = B
CAUTION           = C
SKIP + Trust >50  = D
SKIP + Trust <50  = F
```

**Why P2:** Fakespot's A–F system was immediately understood by millions of users. Adding a letter grade alongside the verdict costs almost nothing to build and directly bridges the familiarity gap for Fakespot refugees — the most valuable acquisition segment right now.  
**Effort:** Very Low  
**Impact:** Medium — acquisition/familiarity, not core differentiation  
**Success metric:** Referenced in "Fakespot alternative" content as a comparable signal

---

### P2-4 · Bulk Analysis (Creator / Affiliate Workflow)
**What:** Let Pro/Creator users paste up to 10 ASINs or URLs at once and get a batch report. Downloadable as CSV or structured JSON.  
**Why P2:** Individual analysis is fine for shoppers. Creators writing "Top 10 Gaming Chairs" roundups need to analyze 15 products efficiently. This is a Creator plan feature with clear professional value.  
**Effort:** Medium  
**Impact:** High for Creator segment specifically  
**Success metric:** Creator plan retention increases by 20% after launch

---

## 🟢 P3 — FUTURE
### Enterprise and platform plays. Requires user base and brand authority first.

---

### P3-1 · Enterprise Brand Intelligence Dashboard
**What:** A separate B2B product for brands and Amazon sellers.  

```
Features:
├── Monitor your own product's review sentiment trends
├── Monitor competitor products
├── Alert on negative trend spikes
├── Review authenticity analysis of your category
└── Monthly sentiment reports
```

**Pricing:** $199–$999/month per brand  
**Why P3:** This requires brand awareness, sales motion, and a different product surface. Not the right focus until consumer product has traction. But it's a real revenue path — TraceFuse serves the seller side and likely does $100k+ ARR. The brand intelligence angle is differentiated and larger.  
**Effort:** Very High  
**Impact:** Very High (at scale)

---

### P3-2 · API Access
**What:** Programmatic access to ReviewAI's verdict engine. ASIN in → structured verdict JSON out.  
**Pricing:** Usage-based ($0.10–$0.50 per analysis) or included in Creator/Enterprise plans  
**Why P3:** Opens ReviewAI to developers building their own shopping tools, browser extensions, comparison sites. Creates a platform play rather than just an end-user product.  
**Effort:** Medium (auth layer + rate limiting + docs)  
**Impact:** High at scale — B2D (business to developer) revenue channel

---

### P3-3 · Multi-Platform Expansion
**What:** Extend ReviewAI verdict engine to Flipkart, Walmart, eBay, Meesho.  
**Why P3:** Amazon-only is the right call for now — depth over breadth. But Flipkart is a massive opportunity specifically for the Indian market (ReviewAI's home base). Once the Amazon product is tight, Flipkart is the natural next platform.  
**Effort:** High (new scrapers, new prompt tuning per platform)  
**Impact:** High for Indian market specifically

---

## Summary Priority List (Flat)

| Status | # | Feature | Tier | Effort | Impact |
|---|---|---|---|---|---|
| ✅ | 1 | Chrome Extension — Live Verdict Badge | 🔴 P0 | Medium | Highest |
| ✅ | 2 | Landing Page — Show Full Report Output | 🔴 P0 | Low | High |
| ✅ | 3 | Fakespot Alternative SEO Page | 🔴 P0 | Low | High |
| ✅ | 4 | Fix Hero Trust Gaps & Inconsistencies | 🔴 P0 | Low | High |
| 🔲 | 5 | Risk Scoring Layer | 🟠 P1 | Medium | High |
| 🔲 | 6 | Methodology / Transparency Page | 🟠 P1 | Low | Medium-High |
| 🔲 | 7 | Affiliate / Creator Landing Page | 🟠 P1 | Low-Med | High |
| 🔲 | 8 | Comparison Mode | 🟡 P2 | High | Very High |
| 🔲 | 9 | Similar Product Recommendations | 🟡 P2 | Med-High | High |
| 🔲 | 10 | Letter Grade Display | 🟡 P2 | Very Low | Medium |
| 🔲 | 11 | Bulk Analysis | 🟡 P2 | Medium | High (creators) |
| 🔲 | 12 | Enterprise Brand Intelligence | 🟢 P3 | Very High | Very High |
| 🔲 | 13 | API Access | 🟢 P3 | Medium | High at scale |
| 🔲 | 14 | Multi-Platform (Flipkart) | 🟢 P3 | High | High (India) |

---

## What NOT to Build (Yet)

These are traps that look productive but dilute focus:

- ❌ Multi-platform coverage before Amazon is dominant
- ❌ Browser extension for Firefox/Safari before Chrome is proven
- ❌ A public review comparison feature (Yelp, TripAdvisor) — old product direction, don't revisit
- ❌ Mobile app before web + extension have retention signal
- ❌ Social sharing / gamification features — premature
- ❌ Becoming "just another fake review detector" — the category is losing, not winning

---

## Monetization Tiers (Aligned to Feature Roadmap)

```
Free (Starter)
├── 10 analyses/month
├── Full report output
├── Shareable report links
└── Analysis history (last 30 days)

Pro · $9–$19/month
├── Unlimited analyses
├── Persona-Based Verdict Mode          ← P1-1
├── Risk Scoring Layer                  ← P1-2
├── Comparison Mode                     ← P2-1
├── Extended history
└── Priority analysis speed

Creator · $29–$79/month
├── Everything in Pro
├── Bulk Analysis (up to 50 ASINs)      ← P2-4
├── Export as CSV / JSON
├── Affiliate Content Suite (full)
├── Comparison widgets (embeddable)
└── API access (limited)                ← P3-2

Enterprise · $199–$999/month
├── Brand Intelligence Dashboard        ← P3-1
├── Competitor product monitoring
├── Sentiment trend alerts
├── Dedicated support
└── Full API access
```

---

*This document should be reviewed and updated at the start of each sprint.*  
*Canonical context for AI assistants: see `docs/AGENT_CONTEXT.md`*
