# Persona Improvement Test Plan

After updating the persona prompt modifiers, use this test plan to verify improvements.

---

## 🎯 Expected Improvements

### Budget Buyer Should Now Show:
- **More CAUTION verdicts** for expensive products (₹50,000+)
- **Price-specific language**: "expensive", "value for money", "₹92,900 is steep"
- **Different Perfect For**: "budget-conscious users", "students", "cost-sensitive"
- **Price-related Deal Breakers**: "expensive compared to alternatives"

### Durability Focused Should Now Show:
- **Lower confidence** for non-repairable products
- **Repairability concerns**: "sealed design", "non-replaceable battery"
- **Long-term focus**: "5+ year ownership", "business professionals"
- **Serviceability deal-breakers**: repair and upgrade limitations

### Risk-Averse Should Continue:
- **CAUTION verdicts** (already working well)
- **Risk-first summaries**: lead with problems, not benefits
- **Conservative language**: "potential issues", "safer alternatives"

---

## 🧪 Test Products

### 1. Re-test MacBook Air M1 (₹92,900)
**URL**: `https://www.amazon.in/dp/B08C7MG5PH`

**Expected Changes**:
- **Budget Buyer**: Should now give CAUTION due to high price
- **Durability Focused**: Should mention sealed design concerns
- **Risk-Averse**: Should remain CAUTION (already working)

### 2. Test Budget Product (₹10,000-20,000)
**Suggested**: Budget smartphone or laptop
**URL**: `https://www.amazon.in/dp/[BUDGET_PRODUCT]`

**Expected**:
- **Budget Buyer**: Should give BUY with value emphasis
- **Durability Focused**: Should be more critical of build quality
- **Risk-Averse**: Should flag potential quality issues

### 3. Test Mid-Range Product (₹30,000-50,000)
**Expected**:
- **Budget Buyer**: Should evaluate price-performance carefully
- **Durability Focused**: Should focus on longevity at this price point
- **Risk-Averse**: Should weigh pros/cons more evenly

---

## 📊 Comparison Matrix

Test the same products and fill this matrix:

### MacBook Air M1 (₹92,900) - After Updates

| Persona | Verdict | Confidence | Key Language Changes |
|---------|---------|------------|---------------------|
| Budget Buyer | ? | ? | Should mention "expensive" or "₹92,900" |
| Durability Focused | ? | ? | Should mention "sealed design" or "repairability" |
| Risk-Averse | CAUTION | ~73 | Should remain similar (was working) |
| No Persona | BUY | ~92 | Should remain similar |

### Budget Product Test

| Persona | Verdict | Confidence | Expected Behavior |
|---------|---------|------------|-------------------|
| Budget Buyer | BUY | High | "Great value", "budget-friendly" |
| Durability Focused | CAUTION | Lower | Quality concerns at low price |
| Risk-Averse | CAUTION | Lower | "Potential quality issues" |

---

## ✅ Success Criteria

### Budget Buyer Improvements:
- [ ] CAUTION verdict for MacBook (was BUY)
- [ ] Mentions specific price (₹92,900) in analysis
- [ ] Uses "expensive" or "value" language
- [ ] Perfect_for includes "budget-conscious" users
- [ ] Deal_breakers mention price concerns

### Durability Focused Improvements:
- [ ] Lower confidence for MacBook (was 85%)
- [ ] Mentions "sealed design" or "repairability"
- [ ] Perfect_for includes "long-term users"
- [ ] Deal_breakers include serviceability concerns
- [ ] Different verdict for products with durability issues

### Overall System:
- [ ] At least 3 different verdicts across personas for same product
- [ ] Each persona uses distinct vocabulary
- [ ] Recommendations reflect persona priorities
- [ ] Deal_breakers vary significantly by persona

---

## 🔍 Testing Commands

### Quick API Tests:

```bash
# Test Budget Buyer (should now be more price-sensitive)
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH",
    "persona": "budget_buyer"
  }' | jq '.verdict, .summary'

# Test Durability Focused (should mention repairability)
curl -X POST http://localhost:3000/api/amazon/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.amazon.in/dp/B08C7MG5PH",
    "persona": "durability_focused"
  }' | jq '.verdict, .deal_breakers'
```

---

## 🚨 Red Flags

If you still see these, personas need more work:

### Budget Buyer Red Flags:
- Still gives BUY for expensive products without price justification
- Doesn't mention price or value in summary
- Same "Perfect For" as other personas
- No price-related deal-breakers

### Durability Focused Red Flags:
- Same confidence as baseline for non-repairable products
- Doesn't mention longevity, repairability, or serviceability
- Generic "Perfect For" recommendations
- No durability-specific deal-breakers

### All Personas Red Flags:
- Identical verdicts across all personas
- Same confidence scores
- Generic language without persona-specific terms
- Similar "Perfect For" and "Deal Breakers" sections

---

## 📈 Next Steps Based on Results

### If Budget Buyer Still Not Working:
1. Add price context to AI prompt (include actual product price)
2. Strengthen price-sensitivity in prompt modifier
3. Test with wider price range of products

### If Durability Focused Still Generic:
1. Add more specific repairability language to prompt
2. Test with products known to have durability issues
3. Emphasize long-term ownership scenarios

### If All Personas Still Too Similar:
1. Consider making prompt modifiers more extreme
2. Test with products that have clear trade-offs
3. Add persona-specific scoring weights to AI logic

---

Run these tests and compare with your previous results to measure improvement!