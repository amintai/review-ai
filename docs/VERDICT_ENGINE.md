# Verdict Engine Methodology: How ReviewAI Thinks

ReviewAI’s "Verdict Engine" is a multi-stage intelligence pipeline designed to deliver brutally honest, evidence-based purchase recommendations. It is engineered to prioritize deep pattern detection over generic sentiment scoring.

---

## 1. Data Collection & Sampling
The engine does not read every review (which can be 10,000+). Instead, it uses a **High-Density Sampling** strategy:

- **Review Window**: Up to **50 reviews** per analysis.
- **Priority (Helpfulness)**: Reviews are fetched from the "product-reviews" page sorted by **"helpful"**. This ensures the AI sees the most high-impact, detailed signals first.
- **Context Injection**: The engine attempts to pull the specific **Product Price** and **Category Title** to give the AI context on value-for-money.
- **Minimal Safety Floor**: A minimum of **3 real reviews** is required. If beneath this floor, the engine rejects the analysis to prevent "hallucinated verdicts" based on insufficient data.

## 2. Decision Logic (The Prompt Philosophy)
The core logic resides in `src/lib/amazon-ai.ts`. The AI (GPT-4) is instructed to act as a "Review Intelligence Expert" with these mandates:

- **Pattern Detection**: Look for recurring physical flaws (e.g., "broken hinge", "software crash").
- **Persona Filtering**: If a user selects a persona, the AI applies a specific "Buyer Context" filter:
    - **Budget Buyer**: Prioritizes value; ignores minor aesthetic complaints.
    - **Durability Focused**: Heavily weights longevity signals.
    - **Risk-Averse**: Amplifies safety warnings and "deal breakers".
- **Trust Scoring**: Evaluation of the "weight" of the reviews. If reviews are repetitive or short, the **Trust Score** is lowered.

## 3. Predicted Verdicts
The AI maps its findings to one of three definitive verdicts:

| Verdict | Internal Logic Criteria |
| :--- | :--- |
| **BUY** | Positive patterns dominate; price is justified by utility; no critical recurring flaws found in the last 12-24 months. |
| **CAUTION** | Product is functional but has "trade-offs" (e.g., works great but customer support is poor, or it is overpriced for the build quality). |
| **SKIP** | Critical deal-breakers detected (frequent failure, misrepresentation of specs, or cheaper alternatives are vastly superior). |

## 4. Confidence & Trust Metrics
- **Confidence Score (0-100)**: Reflects the **volume and consistency** of the data. High confidence means the reviews provided a clear consensus.
- **Trust Score (0-100)**: Reflects the **authenticity signal**. It lowers if reviews appear biased, overly promotional, or lack detail/evidence.

---
*For implementation details, see `src/lib/amazon-ai.ts` and `src/app/api/amazon/analyze/route.ts`.*
