# ReviewAI - Features & Product Overview (Amazon Intelligence)

**ReviewAI** is an AI-powered **Amazon Product Review Intelligence** platform.  
It helps users decide **BUY / SKIP / CAUTION** in seconds using real review signals, structured reasoning, and clear confidence scoring.

Website: [https://reviewai.pro](https://reviewai.pro)

---

## Core Features

### 1. 🧠 AI Verdict Engine (BUY / SKIP / CAUTION)
Paste an Amazon product URL and get a decisive verdict with rationale—not generic summary text.

### 2. 📊 Confidence + Trust Scores
Each report includes:
- **Confidence score** (how certain the model is)
- **Trust score** (signal quality and review consistency)

### 3. 🔍 Real Review Pattern Extraction
ReviewAI identifies recurring themes such as:
- Quality consistency
- Durability complaints
- Value-for-money perception
- Hidden deal-breakers buyers frequently mention

### 4. ✅ Fit Analysis: Perfect For / Avoid If
Reports explicitly answer:
- Who should buy this product
- Who should avoid it
- Which complaints are likely deal-breakers

### 5. 🧩 Buyer Psychology Insights
Structured analysis explains:
- Why people still buy despite objections
- What almost stops conversions
- Honest objections to keep decisions trustworthy

### 6. 🔗 Shareable Public Report Links
Analyses are persisted and can be viewed via report URLs for quick sharing.

### 7. 🧪 Browser Extension Signal Assist
Extension flow can extract live Amazon page context and send higher-quality input to backend analysis.

### 8. 🚧 Next: Similar Product Recommendations
Planned phase includes better alternatives with rationale and affiliate-ready linking support.

---

## Who Is It For?

ReviewAI is built for:
- **Everyday Amazon shoppers** who want fast, evidence-based purchase decisions
- **Creators and affiliates** who need product due diligence at scale
- **Price-conscious buyers** comparing options before checkout

---

## Product Output Snapshot

Every analysis centers around a structured JSON/report contract including:

- `verdict`
- `confidence_score`
- `trust_score`
- `summary`
- `perfect_for[]`
- `avoid_if[]`
- `deal_breakers[]`
- `buyer_psychology`
- `theme_clustering[]`

---

## Migration Context

ReviewAI previously focused on business review-reply generation.  
Current and active direction is Amazon product intelligence.

See:
- `docs/amazon-prd.md`
- `docs/migration-plan.md`
- `docs/AGENT_CONTEXT.md` (canonical context for AI assistants)
