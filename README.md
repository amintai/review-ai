# ReviewAI

ReviewAI is an **Amazon Product Review Intelligence** platform that helps users make faster purchase decisions with structured AI outputs:

- **BUY / SKIP / CAUTION** verdict
- **Persona-Based Verdicts** (Budget, Durability, Risk-Averse, etc.)
- **Interactive Dashboard**: Persona selection, persistent settings, and history.
- Confidence and trust scoring
- Pattern-level evidence from review text
- **Enhanced Metadata** (Brand, Category, Price, and Imagery)
- **PostHog Analytics**: Integrated tracking for user behavior.
- Shareable public report pages

---

## Current Product Direction (Important)

This repository has migrated from a legacy business review-response concept to an Amazon product intelligence workflow.

Canonical references:
- PRD: `docs/amazon-prd.md`
- Migration roadmap: `docs/migration-plan.md`
- Agent source-of-truth: `docs/AGENT_CONTEXT.md`
- Technical architecture: `TECHNICAL.md`

---

## Core Flow

1. User submits an Amazon product URL.
2. System validates URL and extracts ASIN.
3. Review signals are collected from extension payload and/or server-side scraping fallback.
4. AI generates a structured analysis JSON.
5. Analysis is persisted and rendered via public report pages.

Primary endpoint: `POST /api/amazon/analyze`

---

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth)
- PostHog (Analytics + Session Recording)
- Bytez SDK + OpenAI model routing
- Vercel deployment

---

## Project Structure (Key Paths)

```text
src/
├── app/
│   ├── api/
│   │   ├── amazon/analyze/route.ts
│   │   ├── analyze/route.ts
│   │   └── history/route.ts
│   ├── dashboard/
│   └── report/[id]/
├── lib/
│   ├── amazon.ts
│   ├── amazon-scraper.ts
│   └── amazon-ai.ts

extension/
└── src/
    ├── content/
    └── background/
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Run web app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Set required variables in your environment (for example `.env.local`):

- `BYTEZ_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

---

## Extension Development

The browser extension lives in `extension/` and supports Amazon-page signal capture.

Typical commands:

```bash
cd extension
npm install
npm run dev
```

Load the built/dev output in your browser’s extension manager for testing.

---

## Documentation Index

- `TECHNICAL.md` — active technical architecture
- `docs/API_DOCUMENTATION.md` — API endpoints and patterns reference
- `docs/DEVELOPER_GUIDE.md` — quick reference for developers
- `FEATURES.md` — product capability summary
- `docs/amazon-prd.md` — product requirements and acceptance criteria
- `docs/migration-plan.md` — migration phases and cleanup plan
- `public/llms.txt` — compact AI-agent discoverability context
- `docs/AGENT_CONTEXT.md` — canonical agent instructions for terminology + positioning
- `docs/VERDICT_ENGINE.md` — methodology for BUY/SKIP/CAUTION predictions
- `docs/PERSONA_TEST_SAMPLES.md` — benchmarks for persona-based analysis
