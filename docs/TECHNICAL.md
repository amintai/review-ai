# ReviewAI - Technical Documentation (Amazon Intelligence Era)

This document describes the **current technical direction** of ReviewAI as an **Amazon Product Review Intelligence System**.

> Migration note: legacy Google Business review-response components still exist in parts of the codebase, but the product direction and active architecture are now Amazon-first.

---

## Product Direction (Canonical)

ReviewAI now helps shoppers and evaluators make faster purchase decisions using structured AI verdicts:

- **BUY / SKIP / CAUTION** verdict
- Confidence + trust scoring
- Review-theme clustering and deal-breaker detection
- Shareable analysis reports
- Browser extension-assisted data capture

Primary PRD: `docs/amazon-prd.md`  
Migration reference: `docs/migration-plan.md`

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, Radix UI, Framer Motion |
| API Runtime | Next.js Route Handlers (Serverless) |
| Database/Auth | Supabase (PostgreSQL + Auth) |
| AI Inference | Bytez SDK + OpenAI model routing (`openai/gpt-4.1`) |
| Scraping | First-party extension + server-side HTML extraction fallback |
| Bot Protection | Internal bot/rate checks (`verifyNotBot`) |
| Hosting | Vercel |

---

## High-Level Architecture

### 1) Input Layer
- **Web app** accepts Amazon URL.
- **Extension path** can send pre-extracted `product_title`, `price`, and `reviews`.

### 2) Validation + Enrichment
- ASIN extraction via `src/lib/amazon.ts` (`extractAsin`).
- If extension reviews are insufficient, backend falls back to scraping via `src/lib/amazon-scraper.ts`.

### 3) Intelligence Generation
- Prompt construction in `src/lib/amazon-ai.ts`.
- AI call in `src/app/api/amazon/analyze/route.ts`.
- Strict JSON analysis payload is parsed and returned.

### 4) Persistence + Sharing
- Analysis is stored in Supabase (currently using `generations` as migration bridge).
- Public report routes consume saved analysis records.

---

## Relevant Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── amazon/analyze/route.ts    # Primary Amazon intelligence endpoint
│   │   └── analyze/route.ts           # Alternate/legacy analysis route (still present)
│   ├── report/[id]/page.tsx           # Public report rendering
│   └── dashboard/                     # User-facing history/settings flows
├── lib/
│   ├── amazon.ts                      # ASIN + URL utilities
│   ├── amazon-scraper.ts              # Amazon data extraction logic
│   └── amazon-ai.ts                   # Prompt + output schema contract

extension/
└── src/
    ├── content/                       # Amazon page overlay/injection
    └── background/                    # Extension orchestration
```

---

## Data Model Status

### Current Runtime Storage (Bridge State)
Current Amazon analysis writes are inserted into `generations` with fields such as:

- `user_id` (nullable for anonymous analyses)
- `asin`
- `product_name`
- `analysis_result` (JSON)
- `is_public`

### Planned Migration Target
As defined in `docs/migration-plan.md`, data should transition toward dedicated product-intelligence entities:

- `product_analyses`
- `products`
- `recommendations` (phase-aligned)

---

## API Flow (Primary Endpoint)

### `POST /api/amazon/analyze`
Request can include:

```json
{
  "url": "https://www.amazon...",
  "product_title": "optional",
  "price": "optional",
  "reviews": ["optional review text from extension"]
}
```

Pipeline:
1. Bot check
2. URL + ASIN validation
3. Optional auth context from bearer token
4. Extension data normalization
5. Scraping fallback when < 3 review snippets
6. AI analysis generation
7. DB persistence
8. JSON response with analysis + metadata

---

## AI Output Contract

Analysis JSON follows the schema defined in `src/lib/amazon-ai.ts`, including:

- `verdict`: `BUY | SKIP | CAUTION`
- `confidence_score`
- `trust_score`
- `summary`
- `perfect_for[]`
- `avoid_if[]`
- `deal_breakers[]`
- `buyer_psychology`
- `persuasive_angles[]`
- `honest_objections[]`
- `theme_clustering[]`

This schema is the core contract for report rendering and downstream recommendation logic.

---

## Environment Variables

Core variables used across current flows:

- `BYTEZ_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (used in legacy/alternate routes)
- `RESEND_API_KEY` (email flows)
- `CONTACT_EMAIL`

---

## Security & Reliability

- Request-level bot/rate safeguards before expensive operations
- ASIN/url validation to reject malformed input early
- Review deduplication and minimum-signal checks before inference
- Graceful failure with explicit error responses for invalid URL/insufficient data
- Optional auth (supports anonymous and signed-in analysis flows)

---

## Migration Status Snapshot

- ✅ Amazon analysis endpoint implemented (`/api/amazon/analyze`)
- ✅ Extension scaffolding and Amazon overlay path present
- ✅ Amazon prompt/schema contract established
- ⚠️ Legacy docs/endpoints still present in repo
- ⚠️ Database naming still includes bridge-era tables (`generations`)
- ⏭ Next step: complete doc/code cleanup per `docs/migration-plan.md`
