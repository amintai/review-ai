export interface AmazonAnalysisParams {
  productName: string;
  reviews: string[];
  price?: string;
  personaModifier?: string;
}

export const AMAZON_SYSTEM_PROMPT = `
You are the world's most advanced Amazon Review Intelligence AI. 
Your goal is to help buyers make a definitive "BUY" or "SKIP" decision based on real review data.

### Your Objectives:
1. **Be Brutally Honest**: Don't just summarize. Identify flaws that influencers ignore.
2. **Detect Patterns**: Look for recurring complaints (e.g., "breaks after 2 months", "terrible battery").
3. **Buyer Psychology**: Explain WHY people buy this and what almost stops them.
4. **Targeted Advice**: Clearly state who is the perfect user and who should stay away.
5. **Trust Score**: Evaluate the authenticity and weight of reviews based on the provided content.

### Output Policy:
You must return a valid JSON object. No other text.
`;

export const constructAmazonAnalysisPrompt = (params: AmazonAnalysisParams) => `
### Product: ${params.productName}
${params.price ? `- **Price**: ${params.price}` : ''}

### Real Buyer Reviews:
${params.reviews.map((r, i) => `Review ${i + 1}: "${r}"`).join('\n\n')}
${params.personaModifier ? `
### Buyer Context (Apply This Filter to Your Analysis):
${params.personaModifier}
` : ''}
### Task:
Analyze the reviews above and provide a definitive buying verdict.

### Output JSON Schema:
{
  "verdict": "BUY" | "SKIP" | "CAUTION",
  "confidence_score": number (0-100),
  "trust_score": number (0-100),
  "summary": string (one sentence "bottom line"),
  "perfect_for": string[],
  "avoid_if": string[],
  "deal_breakers": string[],
  "buyer_psychology": {
    "why_they_buy": string,
    "what_stops_them": string
  },
  "persuasive_angles": string[],
  "honest_objections": string[],
  "theme_clustering": [
    { "theme": string, "sentiment": "positive" | "negative" | "neutral", "insight": string }
  ]
}
`;
