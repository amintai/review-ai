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
| Analytics | PostHog (Events/Sessions), Vercel Analytics, Google Analytics |
| Persistence | Supabase (PostgreSQL + Auth + Event Mirroring) |
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
- **Event Mirroring**: All UI interactions (clicks, pageviews, share events) are mirrored in Supabase `user_events` table for permanent audit logs and internal query-ability.

### 5) Analytics & Observability
- Unified tracking via `src/lib/analytics.ts`.
- Pageview tracking in Next.js App Router via `PostHogPageView.tsx`.
- User identification across sessions using Supabase/PostHog ID mapping.

---

## Relevant Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── amazon/analyze/route.ts    # Primary Amazon intelligence endpoint
│   │   ├── user/
│   │   │   ├── profile/route.ts       # User profile API (auth + profile data)
│   │   │   └── persona/route.ts       # Persona preference management
│   │   └── analyze/route.ts           # Alternate/legacy analysis route (still present)
│   ├── report/[id]/page.tsx           # Public report rendering
│   └── dashboard/                     # User-facing history/settings flows
├── lib/
│   ├── amazon.ts                      # ASIN + URL utilities
│   ├── amazon-scraper.ts              # Amazon data extraction logic
│   ├── amazon-ai.ts                   # Prompt + output schema contract
│   ├── analytics.ts                   # Unified multi-platform tracking utility
│   └── supabaseServer.ts              # Server-side Supabase client
├── types/
│   └── user.ts                        # User profile TypeScript interfaces

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

### User Profile Management
User data is managed through a hybrid approach:
- **Auth data**: Stored in Supabase `auth.users` (email, metadata, etc.)
- **Profile data**: Stored in `profiles` table (business_name, default_persona, is_pro, etc.)
- **API pattern**: `/api/user/profile` combines both sources for complete user context

**Profiles Table Schema**:
```sql
CREATE TABLE profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  business_name text,
  default_persona text, -- PersonaId enum
  is_pro boolean default false
);
```

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
  "reviews": ["optional review text from extension"],
  "persona": "budget_buyer"
}
```

Pipeline:
1. Bot check
2. URL + ASIN validation
3. Optional auth context from bearer token
4. Persona resolution (request > user default > null)
5. Extension data normalization
6. Scraping fallback when < 3 review snippets
7. AI analysis generation
8. DB persistence
9. JSON response with analysis + metadata

### User Management APIs

**`GET /api/user/profile`**: Fetch complete user profile (auth + profile table data)
- Provides access to `is_pro` field from profiles table
- Combines Supabase auth user with profile table data
- Used by dashboard/settings components

**`GET/PATCH /api/user/persona`**: Manage user's default persona preference
- Stores persona choice in profiles.default_persona
- Used by persona selector components

> **API Documentation**: See `docs/API_DOCUMENTATION.md` for complete API reference

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
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_APP_URL` (for auth redirects)

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
- ✅ User profile API pattern implemented (`/api/user/profile`)
- ✅ Persona management system integrated
- ⚠️ Legacy docs/endpoints still present in repo
- ⚠️ Database naming still includes bridge-era tables (`generations`)
- ⏭ Next step: complete doc/code cleanup per `docs/migration-plan.md`
