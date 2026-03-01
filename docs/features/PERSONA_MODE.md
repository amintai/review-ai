# Persona-Based Verdict Mode

## Overview
Persona-Based Verdict Mode is a core differentiator for ReviewAI. It allows the AI to interpret the same set of reviews through different "lenses" based on what the specific buyer cares about most.

A product that is a "BUY" for a **Budget Buyer** might be a "SKIP" for a **Durability Focused** buyer if the reviews indicate it breaks quickly but is very cheap.

## The 5 Personas

| Persona | Icon | Focus | AI Behavior |
|---|-|---|---|
| **Budget Buyer** | `DollarSign` | Value for money | Prioritizes core function vs price; ignores lack of premium features. |
| **Durability Focused** | `Wrench` | Reliability | Heavily weights any reports of failure/degradation; prizes longevity. |
| **Risk-Averse** | `Shield` | Safety | Applies a "pessimism filter"; resolves ambiguity toward CAUTION/SKIP. |
| **Tech Enthusiast** | `Zap` | Performance | Focuses on spec accuracy and technical performance metrics. |
| **Gift Buyer** | `Gift` | Recipient Experience | Prioritizes packaging, fit accuracy, and return ease. |

## Implementation Details

### Database Schema
- `profiles.default_persona`: Stores the user's preferred persona.
- `product_analyses.persona_used`: Tracks which persona was used to generate a specific report.

### Logic Flow
1. **Selection:** User selects a persona in the Dashboard, Settings, or Report page.
2. **Injection:** The `promptModifier` for that persona is appended to the AI analysis prompt under `### Buyer Context`.
3. **Execution:** The AI (GPT-4.1) adjusts its sentiment weights and reasoning based on the context.
4. **Persistence:** The resulting report is tagged with the persona ID.

## User Experience
- **Free Users:** Can see persona chips but clicking them triggers an upgrade CTA.
- **Pro Users:** Can set a default persona in Settings and toggle them freely during analysis.

## Future Plans
- **Persona Fit Score:** A specific 0-100 score indicating how well the product matches that specific persona's requirements (beyond just the general Trust/Confidence scores).
- **Extension Integration:** Silent persona application within the Chrome Extension based on dashboard settings.
