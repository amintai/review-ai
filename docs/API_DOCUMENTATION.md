# ReviewAI API Documentation

This document describes the API endpoints and patterns used in ReviewAI.

---

## Authentication Pattern

All authenticated endpoints use Supabase server-side client with cookie-based sessions:

```typescript
import { createClient } from '@/lib/supabaseServer';

const supabase = await createClient();
const { data: { user }, error } = await supabase.auth.getUser();
```

---

## User Management APIs

### GET `/api/user/profile`

**Purpose**: Fetch complete user profile combining auth data and profile table data.

**Authentication**: Required (Bearer token via cookies)

**Response**:
```typescript
interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
    // Profile table fields
    business_name: string | null;
    default_persona: PersonaId | null;
    is_pro: boolean;
    profile_updated_at: string | null;
}
```

**Usage Pattern**:
```typescript
// In React components
const fetchProfile = async () => {
    const res = await fetch('/api/user/profile');
    if (!res.ok) throw new Error('Failed to fetch profile');
    const profile: UserProfile = await res.json();
    return profile;
};
```

**Why This Pattern**: 
- Centralizes user data fetching logic
- Provides access to `is_pro` field from profiles table (not available in `auth.getUser()`)
- Combines auth user metadata with profile table data
- Type-safe with proper TypeScript interfaces

---

### GET/PATCH `/api/user/persona`

**Purpose**: Manage user's default persona preference.

**GET Response**:
```json
{
    "persona_id": "budget_buyer" | null,
    "is_pro": boolean
}
```

**PATCH Request**:
```json
{
    "persona_id": "budget_buyer" | "durability_focused" | "risk_averse" | "tech_enthusiast" | "gift_buyer" | null
}
```

---

## Product Analysis APIs

### POST `/api/amazon/analyze`

**Purpose**: Primary Amazon product intelligence endpoint.

**Request**:
```json
{
    "url": "https://www.amazon.com/dp/ASIN",
    "product_title": "optional - from extension",
    "price": "optional - from extension", 
    "reviews": ["optional array of review text from extension"],
    "persona": "budget_buyer" // optional persona override
}
```

**Response**: Structured analysis JSON with verdict, scores, and insights.

**Pipeline**:
1. Bot protection check
2. URL validation and ASIN extraction
3. User authentication (optional)
4. Persona resolution (request > user default > null)
5. Review data collection (extension first, scraping fallback)
6. AI analysis generation
7. Database persistence
8. Response with analysis + metadata

---

## Data Access Patterns

### ✅ Recommended: Centralized API Endpoints

**Do**: Create dedicated API routes for data fetching
```typescript
// ✅ Good - Centralized, type-safe, includes profile data
const profile = await fetch('/api/user/profile').then(r => r.json());
```

**Don't**: Direct Supabase calls in components
```typescript
// ❌ Avoid - Missing profile data, scattered logic
const { data: { user } } = await supabase.auth.getUser();
```

### Database Table Access

**Profiles Table Fields**:
- `id` (UUID, references auth.users)
- `business_name` (text, nullable)
- `default_persona` (PersonaId, nullable)
- `is_pro` (boolean, default false)
- `updated_at` (timestamp)

**Access Pattern**:
```sql
-- Always join auth user data with profile data
SELECT 
    u.id, u.email, u.created_at,
    p.business_name, p.default_persona, p.is_pro
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.id = $1;
```

---

## Error Handling

### Standard Error Responses

```typescript
// 401 Unauthorized
{ "error": "Unauthorized" }

// 400 Bad Request  
{ "error": "Invalid request data" }

// 500 Internal Server Error
{ "error": "Internal server error" }
```

### Error Handling Pattern

```typescript
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // ... business logic
        
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
```

---

## Type Safety

### Import Patterns

```typescript
// User types
import type { UserProfile } from '@/types/user';

// Persona types  
import type { PersonaId } from '@/lib/personas';

// Supabase client
import { createClient } from '@/lib/supabaseServer';
```

### Response Typing

```typescript
// API responses should be properly typed
const userProfile: UserProfile = await fetch('/api/user/profile').then(r => r.json());

// Component state should use proper types
const [profile, setProfile] = useState<UserProfile | null>(null);
```

---

## Security Considerations

### Authentication
- All user-specific endpoints require authentication
- Use server-side Supabase client for secure database access
- Validate user permissions before data access

### Data Validation
- Validate all input parameters using Zod schemas
- Sanitize user inputs before database operations
- Use parameterized queries to prevent SQL injection

### Rate Limiting
- Bot protection on expensive operations (AI analysis)
- Consider implementing rate limiting for API endpoints
- Monitor for abuse patterns

---

## Future API Patterns

### Bulk Operations
```typescript
// POST /api/user/analyses/bulk
{
    "urls": ["amazon.com/dp/ASIN1", "amazon.com/dp/ASIN2"],
    "persona": "budget_buyer"
}
```

### Comparison APIs
```typescript  
// POST /api/amazon/compare
{
    "product_a": "ASIN1",
    "product_b": "ASIN2", 
    "persona": "durability_focused"
}
```

### Webhook Integration
```typescript
// POST /api/webhooks/stripe (for subscription management)
// POST /api/webhooks/analysis-complete (for async processing)
```
