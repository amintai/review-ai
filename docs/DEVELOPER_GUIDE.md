# Developer Guide - ReviewAI

Quick reference for developers working on ReviewAI.

---

## User Profile Data Pattern

### ✅ Recommended: Use `/api/user/profile`

When you need user data in components, use the centralized profile API:

```typescript
// In React components
import type { UserProfile } from '@/types/user';

const [profile, setProfile] = useState<UserProfile | null>(null);

useEffect(() => {
    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/user/profile');
            if (!res.ok) throw new Error('Failed to fetch profile');
            const profileData: UserProfile = await res.json();
            setProfile(profileData);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };
    
    fetchProfile();
}, []);

// Now you have access to:
// - profile.is_pro (from profiles table)
// - profile.default_persona (from profiles table)  
// - profile.email (from auth.users)
// - profile.full_name (from auth user_metadata)
```

### ❌ Avoid: Direct Supabase auth calls

```typescript
// ❌ Don't do this - missing profile table data
const { data: { user } } = await supabase.auth.getUser();
// user.is_pro doesn't exist! ❌
```

---

## Creating New API Endpoints

### Server-side Pattern

```typescript
// src/app/api/your-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        
        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Your business logic here
        const { data, error } = await supabase
            .from('your_table')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
```

### Key Points:
1. Always `await createClient()` - it returns a Promise
2. Handle auth errors explicitly
3. Use proper error responses with status codes
4. Log errors for debugging

---

## Persona System Integration

### Using Personas in Analysis

```typescript
// In analysis endpoints
import { PERSONAS, type PersonaId } from '@/lib/personas';

// Resolve persona priority: request > user default > null
let activePersonaId: PersonaId | null = requestPersona ?? null;
if (!activePersonaId && user?.id) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('default_persona')
        .eq('id', user.id)
        .single();
    activePersonaId = profile?.default_persona as PersonaId || null;
}

const activePersona = activePersonaId ? PERSONAS[activePersonaId] : null;
```

### Persona UI Components

```typescript
// In React components
import PersonaSelector from '@/components/ui/PersonaSelector';
import type { PersonaId } from '@/lib/personas';

<PersonaSelector
    value={activePersona}
    isPro={profile?.is_pro ?? false}
    onChange={handlePersonaChange}
    onUpgradeRequired={() => window.location.href = '/pricing'}
/>
```

---

## Database Patterns

### Profiles Table Access

```sql
-- Always include these fields when fetching profiles
SELECT 
    id,
    business_name,
    default_persona,
    is_pro,
    updated_at
FROM profiles 
WHERE id = $1;
```

### User Event Tracking

```typescript
// Use unified analytics utility
import { trackEvent } from '@/lib/analytics';

// Track user interactions
trackEvent('persona_changed', {
    persona_id: newPersona,
    user_id: user.id,
    source: 'settings_page'
});
```

---

## Type Safety

### Import Order

```typescript
// 1. Next.js imports
import { NextRequest, NextResponse } from 'next/server';

// 2. Internal utilities
import { createClient } from '@/lib/supabaseServer';

// 3. Type imports (use 'type' keyword)
import type { PersonaId } from '@/lib/personas';
import type { UserProfile } from '@/types/user';

// 4. Validation libraries
import { z } from 'zod';
```

### Component State Typing

```typescript
// Always type your state properly
const [profile, setProfile] = useState<UserProfile | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [activePersona, setActivePersona] = useState<PersonaId | null>(null);
```

---

## Common Patterns

### Loading States

```typescript
if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
}

if (!profile) {
    return <div className="p-8 text-center text-red-500">Failed to load profile</div>;
}
```

### Error Handling

```typescript
try {
    const res = await fetch('/api/endpoint');
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
} catch (error) {
    console.error('API call failed:', error);
    // Handle error appropriately
}
```

### Conditional Rendering Based on Pro Status

```typescript
{profile?.is_pro ? (
    <ProFeatureComponent />
) : (
    <UpgradePrompt onClick={() => window.location.href = '/pricing'} />
)}
```

---

## Testing API Endpoints

### Manual Testing

```bash
# Test profile endpoint (requires auth cookie)
curl -X GET http://localhost:3000/api/user/profile \
  -H "Cookie: your-session-cookie"

# Test persona update
curl -X PATCH http://localhost:3000/api/user/persona \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{"persona_id": "budget_buyer"}'
```

### Integration Testing

```typescript
// In your test files
import { createClient } from '@/lib/supabaseServer';

// Mock authenticated user for testing
const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com'
};
```

---

## Performance Considerations

### API Response Caching

```typescript
// Consider caching user profile data
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Use SWR or React Query for client-side caching
import useSWR from 'swr';

const { data: profile, error } = useSWR('/api/user/profile', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: CACHE_DURATION
});
```

### Database Query Optimization

```sql
-- Index on frequently queried fields
CREATE INDEX idx_profiles_user_id ON profiles(id);
CREATE INDEX idx_profiles_persona ON profiles(default_persona);
```

---

## Security Checklist

- [ ] Always validate user authentication in API routes
- [ ] Use parameterized queries to prevent SQL injection
- [ ] Validate input data with Zod schemas
- [ ] Don't expose sensitive data in API responses
- [ ] Log security-relevant events for monitoring
- [ ] Use HTTPS in production
- [ ] Implement rate limiting for expensive operations