# Product Requirements Document (PRD)

## Product
Amazon Product Review Intelligence System (ReviewAI)

## Objective
Help shoppers decide **BUY / SKIP / CAUTION** using trustworthy Amazon review intelligence, then guide them to better alternatives (affiliate-ready in later phases).

## Problem Statement
Amazon product pages are noisy, biased, and time-consuming to evaluate. Users need a fast, evidence-based verdict with clear reasoning and safer alternatives.

## Target Users
- Everyday Amazon shoppers
- Creators/affiliates who need fast product due diligence
- Price-conscious users comparing options

## Success Metrics
- Time-to-verdict: under 10 seconds for typical products
- Report completion rate (user reaches full report)
- Outbound click-through rate to recommended products
- Return usage / repeated analysis sessions
- False-positive complaint rate (quality guardrail)

## Core User Flows

### Flow A: Web App
1. User pastes Amazon URL.
2. System validates URL and extracts ASIN.
3. System collects product + review signals.
4. AI returns structured verdict JSON.
5. User views report and recommendation blocks.

### Flow B: Browser Extension
1. User opens Amazon product page.
2. Extension injects “Get AI Verdict” button.
3. Extension scrapes visible page signals and triggers backend analysis.
4. Overlay shows verdict snapshot and links to full report.

## Functional Requirements

### 1) Input & Validation
- Accept Amazon URLs (`/dp/`, `/gp/product/`, locale variations).
- Extract ASIN reliably.
- Reject invalid URLs with actionable error copy.

### 2) Data Collection (Free-first)
- Gather product metadata:
  - product title
  - price (if available)
  - ASIN
- Gather review text from:
  - extension DOM scraping when available (best signal quality)
  - server-side fallback scraping when extension data is unavailable
- Deduplicate and normalize review text.

### 3) AI Intelligence Output
Return strict JSON schema with:
- `verdict`: BUY | SKIP | CAUTION
- `confidence_score` (0–100)
- `trust_score` (0–100)
- `summary`
- `perfect_for[]`
- `avoid_if[]`
- `deal_breakers[]`
- `buyer_psychology` (why buy / what stops)
- `persuasive_angles[]`
- `honest_objections[]`
- `theme_clustering[]`

### 4) Report Experience
- Public report URL for sharing
- Prominent verdict card + confidence/trust
- Evidence sections (fit, avoid, objections, themes)
- CTA to Amazon product

### 5) Similar Product Recommendations (Phase 2)
- Return 3–5 alternatives with rationale
- Add affiliate-ready link fields
- Track outbound clicks

## Non-Functional Requirements
- Response latency target: 3–10 sec
- Graceful fallbacks if scraping is partial
- Bot/rate protection on API
- Safe JSON parsing and schema-hardening
- Logging for scrape success/failure diagnostics

## Out of Scope (Current Iteration)
- Paid external scraping APIs
- Full historical price tracking
- Conversion attribution to sale-level events

## Rollout Plan

### Phase 1 (Now)
- Replace static/mock review data with real data pipeline
- Extension + backend payload support
- Reliable verdict generation + report persistence

### Phase 2
- Similar product recommendation engine
- Better trust heuristics + fake pattern signals

### Phase 3
- Affiliate link generation
- Recommendation ranking optimization for conversion + trust

## Risks & Mitigations
- **Amazon markup changes** → layered selectors + regex fallbacks
- **Scraping failures** → multiple extraction strategies + user-facing fallback messaging
- **Low review volume** → transparent low-confidence output

## Acceptance Criteria
1. Valid Amazon URL returns a non-mock analysis response.
2. At least 3 real review snippets are used when available.
3. Extension path sends live page-derived product/review data.
4. Report persists in DB and is viewable via public URL.
5. Errors are explicit for invalid URL or insufficient data.
