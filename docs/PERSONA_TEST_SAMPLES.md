# Persona Test Samples & Benchmarks

This document tracks how different buyer personas influence the Verdict Engine's output for the same product. Use these as benchmarks when tuning AI prompts or scoring logic.

---

## Sample 1: MacBook Air M1 (2020)
**Link:** [Amazon.in - B08C7MG5PH](https://www.amazon.in/dp/B08C7MG5PH)  
**Context:** A universally acclaimed product with known legacy port/webcam limitations.

### Results Comparison

| Persona | Verdict | Trust | Confidence | Key Distinction |
| :--- | :--- | :--- | :--- | :--- |
| **No Persona** | BUY | 87 | 92 | Baseline: Strong buy based on massive consensus. |
| **Budget Buyer** | BUY | 88 | 92 | Very similar to baseline; emphasizes "value" for students/coders. |
| **Durability Focused** | BUY | 91 | 85 | Higher trust (validated longevity); slightly lower confidence (ASIN is older). |
| **Risk-Averse** | **CAUTION** | 92 | **73** | **Success**: Correctly identified high friction (legacy ports/webcam) as a cautionary signal. |

---

## 🔍 Analysis: What Works & What Needs Help

### What Works ✅
1. **Risk-Averse Sensitivity**: The engine correctly flipped the verdict to **CAUTION** despite 90%+ positive reviews. It prioritized the *content* of the "Avoid If" (ports/webcam) over the volume of praise.
2. **Confidence Variance**: The drop to `73` for Risk-Averse shows the AI is appropriately "unsure" when a high-quality product doesn't fit a high-security persona.
3. **Persona-Specific "Avoid If"**: The Risk-Averse persona added "Learning Curves" (Windows → Mac), which is a unique psychological insight not found in the baseline.

### What Needs Work 🛠️
1. **Budget vs. Baseline**: Currently, `budget_buyer` and `no persona` are extremely similar (88 vs 87 trust). We need to push the Budget persona to specifically call out "Deal Breakers" related to *price spikes* or *cheaper current-gen alternatives* more aggressively.
2. **Durability Confidence**: The `durability_focused` persona had lower confidence than the baseline. Ideally, for a 4-year-old product, durability confidence should be *higher* because of the long-term review pool. We should adjust the prompt to weight "Helpful" older reviews more heavily for this persona.
3. **Trust Score Overlap**: All results are in the 87–92 range. We may need to refine the Trust Score logic to be more punishing if the review pool "feels" too perfect or lacks critical depth.

---
*Last Updated: March 1, 2026*
