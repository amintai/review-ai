# Chat API Implementation

## Overview

The chat API (`/api/chat`) has been completely rewritten to work similarly to the analyze API, providing a conversational interface for Amazon product analysis with the same intelligence and reliability.

## Key Features

### 1. **Unified Intelligence Engine**
- Uses the same Bytez SDK + OpenAI GPT-4.1 model as the analyze API
- Applies identical Amazon analysis prompts and schemas
- Maintains consistency in verdict generation (BUY/SKIP/CAUTION)

### 2. **Smart Product Context Management**
- **New conversations with Amazon URL**: Automatically analyzes the product and stores the analysis
- **Existing conversations**: Loads previous analysis context for follow-up questions
- **General conversations**: Supports chat without specific product context

### 3. **Efficient Data Reuse**
- Checks for existing analysis before re-analyzing the same product
- Reuses scraped data and AI analysis to avoid redundant processing
- Maintains conversation history with proper context

### 4. **Streaming Response**
- Real-time streaming using Server-Sent Events (SSE)
- Progressive content delivery for better user experience
- Proper conversation ID management for frontend state

## API Flow

### Request Format
```json
{
  "messages": [
    { "role": "user", "content": "Analyze this Amazon product: https://amazon.com/..." }
  ],
  "conversationId": "optional-existing-conversation-id",
  "amazonUrl": "optional-amazon-url-for-new-conversations"
}
```

### Response Format
Streaming SSE format:
```
data: {"content": "partial response", "conversationId": "uuid"}
data: {"content": " more content", "conversationId": "uuid"}
data: [DONE]
```

## Implementation Details

### 1. **Bot Protection**
- Uses the same `verifyNotBot()` function as analyze API
- Prevents abuse and ensures quality traffic

### 2. **Authentication**
- Requires user authentication (unlike analyze API which supports anonymous)
- Ensures proper conversation ownership and privacy

### 3. **Product Analysis Pipeline**
When a new Amazon URL is provided:
1. Extract ASIN from URL
2. Check for existing analysis in database
3. If no existing analysis:
   - Scrape Amazon data using `scrapeAmazonData()`
   - Generate AI analysis using same prompts as analyze API
   - Store analysis in `generations` table
4. Create conversation record
5. Use analysis as context for chat responses

### 4. **Context-Aware Responses**
The system prompt includes product context when available:
```
CURRENT PRODUCT CONTEXT:
Product: [Product Name]
Verdict: BUY/SKIP/CAUTION
Confidence: XX%
Trust Score: XX%
Summary: [Analysis Summary]
Perfect for: [Target Users]
Avoid if: [Warning Conditions]
Deal breakers: [Critical Issues]
```

### 5. **Database Schema**
Uses existing `generations` table with Amazon-specific columns:
- `asin`: Amazon product identifier
- `product_name`: Product title
- `price`: Product price (optional)
- `analysis_result`: JSON analysis data
- `is_public`: Public sharing flag

Conversations stored in `conversations` table:
- `user_id`: Owner reference
- `amazon_asin`: Associated product
- `product_title`: Display name

Messages stored in `messages` table:
- `conversation_id`: Parent conversation
- `role`: user/assistant/system
- `content`: Message text

## Error Handling

### Common Error Scenarios
1. **Invalid Amazon URL**: Returns 400 with clear error message
2. **Insufficient review data**: Returns 422 when < 3 reviews found
3. **AI generation failure**: Returns 500 with fallback message
4. **Database errors**: Logged but don't break the flow
5. **Unauthorized access**: Returns 401 for unauthenticated requests

### Graceful Degradation
- Falls back to general conversation if product analysis fails
- Continues conversation even if context loading fails
- Provides helpful error messages to guide user actions

## Testing

### Manual Testing Steps
1. **New Product Analysis**:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer [user-token]" \
     -d '{
       "messages": [{"role": "user", "content": "Analyze this: https://amazon.com/dp/B08N5WRWNW"}],
       "amazonUrl": "https://amazon.com/dp/B08N5WRWNW"
     }'
   ```

2. **Follow-up Questions**:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer [user-token]" \
     -d '{
       "messages": [
         {"role": "user", "content": "Analyze this: https://amazon.com/dp/B08N5WRWNW"},
         {"role": "assistant", "content": "[Previous response]"},
         {"role": "user", "content": "Is this good for gaming?"}
       ],
       "conversationId": "[conversation-id]"
     }'
   ```

3. **General Chat**:
   ```bash
   curl -X POST http://localhost:3000/api/chat \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer [user-token]" \
     -d '{
       "messages": [{"role": "user", "content": "What should I look for in a laptop?"}]
     }'
   ```

## Performance Considerations

### Optimizations
- **Analysis Caching**: Reuses existing product analyses
- **Efficient Queries**: Single queries for context loading
- **Streaming**: Progressive response delivery
- **Error Boundaries**: Isolated failure handling

### Resource Usage
- **Database**: Minimal queries with proper indexing
- **AI Calls**: Only when necessary, with context reuse
- **Memory**: Streaming prevents large response buffering
- **Network**: Efficient SSE streaming format

## Future Enhancements

### Planned Features
1. **Multi-product Comparisons**: Compare multiple Amazon products in one conversation
2. **Price Tracking**: Alert users to price changes for discussed products
3. **Recommendation Engine**: Suggest similar or better alternatives
4. **Export Options**: Save analysis reports from chat conversations
5. **Voice Interface**: Audio input/output for hands-free shopping assistance

### Technical Improvements
1. **Caching Layer**: Redis cache for frequently accessed analyses
2. **Rate Limiting**: Per-user conversation limits
3. **Analytics**: Track conversation patterns and user satisfaction
4. **A/B Testing**: Test different prompt variations
5. **Monitoring**: Real-time performance and error tracking

## Migration Notes

### Changes from Previous Implementation
1. **Removed Llama 3**: Now uses GPT-4.1 for consistency
2. **Added Product Analysis**: Full Amazon intelligence integration
3. **Improved Context**: Smart context loading and management
4. **Better Error Handling**: Comprehensive error scenarios
5. **Database Alignment**: Uses same tables as analyze API

### Backward Compatibility
- Existing conversation records remain functional
- Message history is preserved
- API contract maintains compatibility with frontend
- Streaming format unchanged for client compatibility