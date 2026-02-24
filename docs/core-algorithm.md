# ReviewAI Core Algorithm & Verdict Engine

This document outlines the technical architecture and logic behind ReviewAI's "Buy or Skip" verdict engine. It describes the data pipeline from raw Amazon scraping to structured AI-driven product intelligence.

## 1. Data Harvesting & Preprocessing

The algorithm starts by aggregating data from multiple sources to ensure a comprehensive view of the product.

### Scraping Pipeline
- **Canonicalization**: The system extracts the ASIN (Amazon Standard Identification Number) and standardizes the URL to handle international marketplaces (Amazon US, UK, IN, etc.).
- **Parallel Fetching**: We fetch the **Product Detail Page** (for metadata like Name, Price, Specs) and the **Helpful Reviews Page** (sorted by highest engagement) simultaneously.
- **Linguistic Filtering**: Raw HTML is stripped. Any review text shorter than **20 characters** is discarded to prevent "vague noise" from contaminating the analysis.
- **Sampling**: We cluster and sample up to **50 high-impact reviews** to maintain performance while capturing the distribution of sentiment.

## 2. The Verdict Engine

The core logic is an AI-orchestrated heuristic engine designed for **brutal honesty**. Unlike standard sentiment analyzers, ReviewAI is optimized to find "Deal Breakers."

### Verdict Categories
| Verdict | Logic Criteria |
| :--- | :--- |
| **BUY** | Overwhelming positive utility, minor flaws, high confidence in quality/price ratio. |
| **SKIP** | Fatal hardware flaws, poor longevity patterns, or widespread value-for-money complaints. |
| **CAUTION** | Product is good but niche. Requires specific user conditions (e.g., "Only if you already own X"). |

### AI Directives
The engine operates under five key objectives:
1. **Influence Neutralization**: Actively filters out "sponsored" sounding language to find the raw truth.
2. **Failure Pattern Detection**: Specifically looks for phrases like "stopped working after month 3" or "customer service was terrible."
3. **Buyer Psychology Mapping**: Analyzes the "Aha!" moment (why people buy) vs. the "Buyer's Remorse" (what stops them).
4. **Theme Clustering**: Groups insights into logical buckets like *Build Quality*, *Software UX*, or *Battery Life*.

## 3. Scoring Mechanisms

ReviewAI provides two distinct metrics to help users quantify risk.

### Trust Score (0-100)
Evaluates the **authenticity** of the review data:
- **Linguistic Depth**: Do reviewers provide specific details or generic platitudes?
- **Recurring Evidence**: If 10 people mention a specific screw is loose, the Trust Score for that flaw increases.
- **Sentiment Variance**: Extreme "love/hate" without detail lowers the score, while nuanced "middle-ground" reviews increase it.

### Confidence Score (0-100)
Evaluates the **statistical strength** of our verdict:
- **Volume**: Higher review count = Higher confidence.
- **Consistency**: High confidence when the AI finds strong consensus among top "helpful" reviewers.
- **Data Freshness**: Weight is given to recent reviews to catch "stealth revisions" in product manufacturing.

## 4. Pros, Cons, and Insight Engine

The engine generates structured insights that go beyond simple bullet points:
- **Deal Breakers**: Critical flaws that would make most people return the item.
- **Perfect For**: Identifying the exact persona (e.g., "Professional photographers on a budget").
- **Avoid If**: Identifying usage scenarios where the product fails (e.g., "Not for outdoor use").
- **Buyer Objections**: Specifically addressing the common reasons people hesitate.

---

*Note: The algorithm is continuously refined based on feedback loops and emerging Amazon review patterns (like AI-generated fake reviews).*
