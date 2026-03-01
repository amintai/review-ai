# Manual Persona Testing Guide

Quick manual testing steps to verify personas are working correctly.

---

## Test Products (Amazon India)

Use these products for testing - they have mixed reviews which work best for persona differentiation:

### 1. Electronics (Budget vs Quality tension)
- **Echo Dot**: `https://www.amazon.in/dp/B08C7MG5PH`
- **Fire TV Stick**: `https://www.amazon.in/dp/B08C1W5N87`
- **Wireless Earbuds**: `https://www.amazon.in/dp/B08F7PTF53`

### 2. Home & Kitchen (Durability concerns)
- **Air Fryer**: `https://www.amazon.in/dp/B07GJBBGHG`
- **Water Purifier**: `https://www.amazon.in/dp/B01FDGW8CS`

### 3. Fashion (Fit & Return issues)
- **Casual Shoes**: `https://www.amazon.in/dp/B07HGLZQPB`
- **T-Shirts**: `https://www.amazon.in/dp/B07MDHQMZX`

---

## Manual Testing Steps

### Step 1: Test via Web Interface

1. **Open ReviewAI** in your browser
2. **Login/Register** to access persona features
3. **Go to Settings** → Set persona to "Budget Buyer"
4. **Analyze Product**: Paste `https://www.amazon.in/dp/B08C7MG5PH`
5. **Note Results**: Screenshot or copy the verdict, summary, and key points
6. **Change Persona**: Go back to settings, change to "Durability Focused"
7. **Re-analyze Same Product**: Use the same URL
8. **Compare Results**: Look for differences

### Step 2: Test via API (if comfortable with curl)

```bash
# Test Budget Buyer
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH",
    "persona": "budget_buyer"
  }'

# Test Durability Focused (same product)
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH",
    "persona": "durability_focused"
  }'
```

---

## What to Look For

### ✅ Personas Working Correctly If You See:

#### Different Verdicts
- **Budget Buyer**: More likely to say BUY if price is good
- **Durability Focused**: More likely to say SKIP if durability issues exist
- **Risk-Averse**: More CAUTION verdicts on borderline products

#### Persona-Specific Language
- **Budget Buyer**: "value for money", "price point", "core function"
- **Durability Focused**: "longevity", "build quality", "long-term use"
- **Risk-Averse**: "caution", "potential issues", "safer alternatives"
- **Tech Enthusiast**: "specifications", "performance", "technical accuracy"
- **Gift Buyer**: "packaging", "recipient", "return policy"

#### Different Recommendations
- **Perfect For** section should reflect persona priorities
- **Deal Breakers** should vary (risk-averse shows more concerns)
- **Buyer Psychology** should highlight different motivations

### ❌ Red Flags (Personas Not Working):

- Identical verdicts across all personas
- Same summary text regardless of persona
- No persona-specific language or priorities
- Generic recommendations that don't reflect buyer type

---

## Quick Test Matrix

Test the same product with all personas and fill this out:

| Persona | Verdict | Confidence | Key Language Used |
|---------|---------|------------|-------------------|
| Budget Buyer | | | |
| Durability Focused | | | |
| Risk-Averse | | | |
| Tech Enthusiast | | | |
| Gift Buyer | | | |
| No Persona (baseline) | | | |

**Expected**: At least 2-3 different verdicts, persona-specific language in summaries.

---

## Troubleshooting

### If All Personas Give Same Result:
1. **Try a different product** - some products are very clear-cut
2. **Use products with mixed reviews** - 3-4 star products work best
3. **Check console logs** - verify persona is being passed to API

### If No Persona-Specific Language:
1. **Check persona implementation** - verify promptModifier is being used
2. **Test with extreme personas** - Budget vs Risk-Averse should be very different
3. **Use products with clear trade-offs** - cheap but fragile items work well

### If API Errors:
1. **Check server is running** - `npm run dev`
2. **Verify URL format** - must be valid Amazon India URL
3. **Check network** - ensure localhost:3000 is accessible

---

## Sample Expected Results

### Product: Echo Dot (₹4,499)

**Budget Buyer Response:**
- Verdict: BUY
- Summary: "Great value smart speaker with solid Alexa features at this price point"
- Perfect For: "Budget-conscious users wanting smart home entry"

**Durability Focused Response:**
- Verdict: CAUTION  
- Summary: "Good features but some reports of connectivity issues after 6+ months"
- Perfect For: "Users who don't mind occasional troubleshooting"

**Risk-Averse Response:**
- Verdict: CAUTION
- Summary: "Mixed reviews on long-term reliability suggest waiting for newer model"
- Perfect For: "Users willing to accept some uncertainty for Alexa features"

---

This manual testing approach will help you quickly verify that personas are enhancing the AI responses appropriately for the Indian market.