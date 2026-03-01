# ReviewAI Agent Context (Canonical)

This document is the **source-of-truth context for AI agents and LLM assistants** working with this repository.


---

## 1) What ReviewAI Is (Now)

ReviewAI is an **Amazon Product Review Intelligence** system.

Its core purpose is to help users make faster, better purchase decisions using structured analysis outputs:

- `BUY` / `SKIP` / `CAUTION` verdict
- confidence and trust scoring
- **Persona-Based Verdicts** (Budget, Durability, Risk-Averse, Tech, Gift)
- evidence-backed review pattern extraction
- fit guidance (`perfect_for`, `avoid_if`, `deal_breakers`)
- shareable public reports

---

## 2) What ReviewAI Is Not (Primary Positioning)

ReviewAI is **not currently positioned** as a Google Business review-reply product in canonical docs.

Legacy business-review code may still exist during migration, but assistants should treat it as transitional unless a task explicitly references migration cleanup.

---

## 3) Canonical Terminology

Use these phrases in documentation, messaging, and agent responses:

- “Amazon Product Review Intelligence”
- “Purchase decision engine”
- “BUY/SKIP/CAUTION verdict”
- “Confidence and trust score”
- “Evidence-based product due diligence”
- “Join early shoppers” (Honest social proof)

Avoid leading with:
- “AI review reply generator”
- “Google Business review management”
- “Local business reputation responder”

---

## 4) Design & Aesthetic Principles

ReviewAI follows a "Premium Decision Support" aesthetic. Agents should maintain these rules when suggesting or modifying UI:

- **Subtle Textures**: Background patterns (like `HeroHighlight`) must be subtle to ensure high text readability. Prefer low dot density and light gray/slate values.
- **Single-Row Trust**: Desktop social proof and trust signals should be grouped in single horizontal rows to maximize visual stability and "premium" whitespace.
- **Action-Oriented CTAs**: Use vibrant oranges (`#F97316`) for primary actions against a clean or high-contrast background.
- **No Placeholders**: Avoid fake ratings, awards, or user counts. If specific data isn't available, rely on value-driven copy (e.g., "Join early shoppers").

---

## 5) Core Flow (Current)

1. User provides Amazon URL.
2. System validates URL and extracts ASIN.
3. Reviews are collected (extension signal first, scraper fallback).
4. AI returns strict JSON analysis.
5. Analysis is stored and presented in report UI.

Primary endpoint: `POST /api/amazon/analyze`

---

## 5) Output Contract (High-Level)

Expected fields include:

- `verdict`
- `confidence_score`
- `trust_score`
- `summary`
- `perfect_for[]`
- `avoid_if[]`
- `deal_breakers[]`
- `buyer_psychology`
- `theme_clustering[]`
- `persona_used` (ID of the persona used for the analysis)
- `persona_fit_score` (logic-calculated score for that persona)

---

## 6) Migration Awareness

Migration docs may mention legacy routes/tables and cleanup tasks. This is expected.

Agent guidance:
- Do not describe legacy behavior as active product positioning.
- When uncertain, explicitly call out “legacy/migration context” vs “current direction.”

---

## 8) Analytics & Observability

ReviewAI uses a unified tracking stack via `src/lib/analytics.ts`.

Key rules for agents:
- Use `trackEvent(eventName, properties)` for all UI interactions.
- Events are automatically mirrored to PostHog and Supabase (`user_events` table).
- Analytics are automatically disabled in `NODE_ENV !== 'production'` to prevent test data noise.
- Direct `posthog.capture` should be avoided in favor of the unified utility.

---

## 9) Quick Response Template (for Assistants)

When asked “What is ReviewAI?”, prefer:

> ReviewAI is an Amazon product intelligence platform that analyzes review signals and returns an evidence-based BUY/SKIP/CAUTION verdict with confidence and trust scoring.
