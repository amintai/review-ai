# Persona Testing Guide

This guide explains how to test and verify that personas are enhancing and changing LLM responses in ReviewAI.

---

## Understanding Persona Integration

Personas work by injecting a `promptModifier` into the AI analysis prompt under the "Buyer Context" section:

```
### Buyer Context (Apply This Filter to Your Analysis):
The user is a budget-conscious buyer.
Prioritize value-for-money signals above all else.
Downweight complaints about premium features, aesthetics, or build quality if the core function is solid.
Amplify any reviews mentioning core function failure, deceptive pricing, or poor durability-to-price ratio.
Verdict should lean BUY if core use case is validated at the price point.
```

---

## Testing Methods

### Method 1: API Testing with Same Product, Different Personas

**Test the same Amazon product with different personas to see how responses change.**

#### Setup Test Product
Choose a product with mixed reviews (some positive, some negative) for best results:
```
Test Product: https://www.amazon.in/dp/B08C7MG5PH (Echo Dot India)
```

#### Test Script
```bash
# Test 1: Budget Buyer
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH",
    "persona": "budget_buyer"
  }'

# Test 2: Durability Focused  
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH", 
    "persona": "durability_focused"
  }'

# Test 3: Risk Averse
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH",
    "persona": "risk_averse"
  }'

# Test 4: No Persona (baseline)
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH"
  }'
```

#### What to Compare
Look for differences in:
- **Verdict**: Same product might be BUY for budget_buyer but CAUTION for risk_averse
- **Summary**: Different emphasis based on persona priorities
- **Perfect_for/Avoid_if**: Persona-specific recommendations
- **Deal_breakers**: Risk-averse should surface more concerns
- **Buyer_psychology**: Different motivations highlighted

---

### Method 2: Web Interface Testing

#### Step-by-Step Manual Testing

1. **Set Up Test User**:
   - Create account or login
   - Go to Settings page
   - Set default persona to "Budget Buyer"

2. **Analyze Product**:
   - Paste Amazon URL: `https://www.amazon.in/dp/PRODUCT_ID`
   - Note the analysis results
   - Save/screenshot the report

3. **Change Persona & Re-test**:
   - Go back to Settings
   - Change persona to "Durability Focused"
   - Analyze the SAME product URL
   - Compare results

4. **Repeat for All Personas**:
   - Risk-Averse
   - Tech Enthusiast  
   - Gift Buyer

#### Expected Differences by Persona

**Budget Buyer** should show:
- More tolerance for minor flaws if price is good
- Focus on "core function works" vs premium features
- Deal-breakers around deceptive pricing

**Durability Focused** should show:
- Heavy weight on longevity complaints
- SKIP verdict if any failure patterns exist
- Perfect_for mentions long-term users

**Risk-Averse** should show:
- More CAUTION verdicts on borderline products
- Expanded deal_breakers list
- Summary leads with risks, not benefits

**Tech Enthusiast** should show:
- Focus on spec accuracy vs marketing claims
- Weight technical reviews higher
- Flag compatibility/firmware issues

**Gift Buyer** should show:
- Focus on packaging, sizing, return ease
- Perfect_for describes recipient types
- Less focus on personal long-term use

---

### Method 3: Controlled Review Testing

**Create test scenarios with known review patterns to verify persona logic.**

#### Test Case: Mixed Quality Product

Use this test payload with controlled reviews:

```json
{
  "url": "https://www.amazon.in/dp/TEST123",
  "product_title": "Test Wireless Headphones",
  "price": "₹3,999",
  "reviews": [
    "Great sound quality for the price, but build feels cheap",
    "Broke after 3 months of normal use, very disappointed", 
    "Perfect for my daily commute, good value",
    "Sound is amazing but comfort could be better for long sessions",
    "Returned due to poor fit, but sound was decent"
  ],
  "persona": "budget_buyer"
}
```

**Expected Results**:
- **Budget Buyer**: Likely BUY (good sound for price, tolerates build quality)
- **Durability Focused**: Likely SKIP (broke after 3 months)
- **Risk-Averse**: Likely CAUTION (mixed signals, return mentioned)

---

### Method 4: Logging & Debug Testing

#### Add Debug Logging

Temporarily add logging to see persona injection:

```typescript
// In src/app/api/amazon/analyze/route.ts
console.log('🎭 Active Persona:', activePersona?.label);
console.log('📝 Persona Modifier:', activePersona?.promptModifier);

// In constructAmazonAnalysisPrompt
console.log('🤖 Full Prompt with Persona:', prompt);
```

#### Monitor Prompt Construction

Check that persona modifiers are properly injected:
1. Start dev server with logging
2. Make API calls with different personas
3. Verify console shows different prompt modifiers
4. Confirm AI receives persona-specific instructions

---

### Method 5: A/B Response Comparison

#### Create Comparison Tool

```typescript
// Test utility: src/scripts/persona-comparison.ts
import { PERSONAS } from '@/lib/personas';

const testProduct = {
  url: "https://www.amazon.in/dp/B08C7MG5PH",
  product_title: "Echo Dot (4th Gen)",
  reviews: [/* sample reviews */]
};

async function comparePersonas() {
  const results = {};
  
  // Test each persona
  for (const [id, persona] of Object.entries(PERSONAS)) {
    const response = await fetch('/api/amazon/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...testProduct,
        persona: id
      })
    });
    
    results[persona.label] = await response.json();
  }
  
  // Compare verdicts
  console.table(Object.entries(results).map(([persona, result]) => ({
    Persona: persona,
    Verdict: result.verdict,
    Confidence: result.confidence_score,
    Trust: result.trust_score,
    Summary: result.summary.substring(0, 100) + '...'
  })));
}
```

---

## Verification Checklist

### ✅ Persona Integration Working If:

- [ ] **Different Verdicts**: Same product gets different BUY/SKIP/CAUTION based on persona
- [ ] **Persona-Specific Language**: 
  - Budget Buyer mentions "value", "price point"
  - Durability Focused mentions "longevity", "failure"
  - Risk-Averse uses "caution", "risk" language
- [ ] **Targeted Recommendations**: perfect_for/avoid_if reflect persona priorities
- [ ] **Weighted Deal-Breakers**: Risk-averse surfaces more concerns than budget buyer
- [ ] **Buyer Psychology Shifts**: Different motivations highlighted per persona

### ❌ Red Flags (Persona Not Working):

- [ ] Identical responses across all personas
- [ ] No persona-specific language in summaries
- [ ] Same verdict for obviously persona-sensitive products
- [ ] Generic perfect_for/avoid_if that don't reflect persona priorities

---

## Sample Test Products

### Good Test Candidates:

1. **Budget vs Quality Tension**:
   - Cheap electronics with mixed durability reviews
   - Generic brands vs name brands

2. **Risk vs Reward Products**:
   - New/innovative products with limited reviews
   - Products with some failure reports but good features

3. **Technical vs Simple Products**:
   - Smart home devices (tech enthusiast vs gift buyer)
   - Complex gadgets with spec accuracy issues

### Example URLs for Testing:
```
Budget Electronics: https://www.amazon.in/dp/B08C7MG5PH
Durability Question: https://www.amazon.in/dp/B07FZ8S74R  
Tech Product: https://www.amazon.in/dp/B08KRV7S9Q
Gift Item: https://www.amazon.in/dp/B07YTK3JQT
```

---

## Automated Testing Script

```bash
#!/bin/bash
# persona-test.sh

PRODUCT_URL="https://www.amazon.in/dp/B08C7MG5PH"
BASE_URL="http://localhost:3000"

echo "🧪 Testing Persona Responses..."

for persona in "budget_buyer" "durability_focused" "risk_averse" "tech_enthusiast" "gift_buyer"; do
  echo "Testing $persona..."
  
  response=$(curl -s -X POST "$BASE_URL/api/amazon/analyze" \
    -H "Content-Type: application/json" \
    -d "{\"url\":\"$PRODUCT_URL\",\"persona\":\"$persona\"}")
  
  verdict=$(echo $response | jq -r '.verdict')
  summary=$(echo $response | jq -r '.summary')
  
  echo "  Verdict: $verdict"
  echo "  Summary: $summary"
  echo "---"
done
```

Run with: `chmod +x persona-test.sh && ./persona-test.sh`

---

This comprehensive testing approach will help you verify that personas are working correctly and enhancing the AI responses as intended.