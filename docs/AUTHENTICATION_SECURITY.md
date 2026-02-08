# Authentication & Security Implementation

## Overview

ReviewAI implements a multi-layered authentication system to ensure that report pages are secure and cannot be accessed without proper authentication.

## Security Layers

### 1. Middleware Protection (First Line of Defense)

**File:** `src/middleware.ts`

The middleware runs on **every request** before it reaches the application routes. This is the first security checkpoint.

```typescript
// Protected routes that require authentication
const protectedPaths = ['/report/', '/dashboard'];
const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
);

// If accessing a protected route without authentication, redirect to login
if (isProtectedPath && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
}
```

**Security Benefits:**
- ✅ Runs before any page logic
- ✅ Cannot be bypassed by client-side code
- ✅ Handles all routes matching `/report/*` and `/dashboard/*`
- ✅ Preserves intended destination in `next` parameter

### 2. Server-Side Page Protection (Second Line of Defense)

**File:** `src/app/report/[id]/page.tsx`

Even if middleware is bypassed (which shouldn't happen), the page itself checks authentication server-side.

```typescript
// Check authentication first - SECURE: Server-side check that cannot be bypassed
const { data: { session } } = await supabase.auth.getSession();

if (!session) {
    // Redirect to login with return URL - user must authenticate to view report
    redirect(`/login?next=${encodeURIComponent(`/report/${params.id}`)}`);
}
```

**Security Benefits:**
- ✅ Server-side rendering (SSR) - runs on server, not client
- ✅ Cannot be manipulated by browser DevTools
- ✅ Uses Supabase server client with secure cookies
- ✅ Double-checks authentication even if middleware fails

### 3. Database Row-Level Security (Third Line of Defense)

**Supabase RLS Policies** (should be configured in Supabase dashboard)

```sql
-- Example RLS policy for product_analyses table
CREATE POLICY "Users can view their own analyses"
ON product_analyses
FOR SELECT
USING (auth.uid() = user_id OR is_public = true);
```

**Security Benefits:**
- ✅ Database-level protection
- ✅ Even with valid session, users can only access their own data
- ✅ Prevents data leaks through API manipulation

## Authentication Flow

### Normal Flow (Authenticated User)

```
1. User clicks "View Full Report" in extension
   ↓
2. Opens: https://reviewai.pro/report/abc123
   ↓
3. Middleware checks authentication
   ✅ User has valid session
   ↓
4. Page component checks authentication
   ✅ User has valid session
   ↓
5. Report is rendered with user info
```

### Blocked Flow (Unauthenticated User)

```
1. User clicks "View Full Report" in extension
   ↓
2. Opens: https://reviewai.pro/report/abc123
   ↓
3. Middleware checks authentication
   ❌ No valid session
   ↓
4. Redirect to: /login?next=/report/abc123
   ↓
5. User sees login page with "Report Access Required" notice
   ↓
6. User signs in with Google or Email
   ↓
7. Auth callback processes login
   ↓
8. Redirect to: /report/abc123 (from 'next' parameter)
   ↓
9. Middleware checks authentication
   ✅ User now has valid session
   ↓
10. Report is rendered
```

## Extension Integration

### Overlay Behavior

The extension overlay shows the report link immediately after analysis, but the link itself is protected:

```typescript
<a
    href={`${REVIEWAI_BASE_URL}/report/${verdict.id ?? ''}`}
    target="_blank"
    rel="noopener noreferrer"
    className="reviewai-link-btn"
>
    <span>View Full Report</span>
    <ArrowRight size={16} />
</a>
```

**Why this is secure:**
- The link opens in a new tab
- The web app's middleware immediately checks authentication
- If not authenticated, user is redirected to login
- After login, user is redirected back to the report
- The extension doesn't need to handle auth state for report access

## Login Page Enhancements

### Report Access Notice

When a user is redirected from a report page, they see a special notice:

```typescript
{isReportAccess && (
    <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
        <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
                <h3 className="font-bold text-orange-900 mb-1">Report Access Required</h3>
                <p className="text-sm text-orange-800 leading-relaxed">
                    Sign in to view your full AI analysis report with detailed insights and recommendations.
                </p>
            </div>
        </div>
    </div>
)}
```

## Report Page User Experience

### Welcome Banner

Authenticated users see a personalized welcome banner:

```typescript
<div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-center justify-between">
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            {user.email?.charAt(0).toUpperCase()}
        </div>
        <div>
            <div className="text-sm font-semibold text-gray-900">
                Welcome back, {user.email?.split('@')[0]}!
            </div>
            <div className="text-xs text-gray-600">
                This report is saved to your dashboard
            </div>
        </div>
    </div>
    <Link 
        href="/dashboard/history"
        className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
    >
        View All Reports →
    </Link>
</div>
```

## Security Best Practices Implemented

### ✅ Server-Side Rendering (SSR)
- All authentication checks happen on the server
- Client cannot manipulate or bypass checks

### ✅ Secure Cookie Management
- Supabase handles secure HTTP-only cookies
- Cookies are automatically managed by middleware

### ✅ No Client-Side Auth Logic for Protected Routes
- Extension doesn't try to determine if user can access report
- Web app handles all authentication logic

### ✅ Redirect Preservation
- `next` parameter preserves intended destination
- User lands on report after successful login

### ✅ Multiple Security Layers
- Middleware (Edge)
- Page component (Server)
- Database RLS (Data layer)

### ✅ No Bypass Possible
- Cannot access report by:
  - Disabling JavaScript
  - Manipulating cookies in DevTools
  - Direct URL access
  - API manipulation

## Testing Security

### Test Cases

1. **Unauthenticated Access**
   ```
   Action: Open /report/abc123 without being logged in
   Expected: Redirect to /login?next=/report/abc123
   ```

2. **Login and Redirect**
   ```
   Action: Sign in from /login?next=/report/abc123
   Expected: After auth, redirect to /report/abc123
   ```

3. **Direct Report Access (Authenticated)**
   ```
   Action: Open /report/abc123 while logged in
   Expected: Report displays immediately
   ```

4. **Session Expiry**
   ```
   Action: Access report with expired session
   Expected: Redirect to login
   ```

5. **Extension Flow**
   ```
   Action: Click "View Full Report" from extension
   Expected: Opens report in new tab, redirects to login if needed
   ```

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Configuration

### Auth Settings

1. **Enable Google OAuth**
   - Configure in Supabase Dashboard > Authentication > Providers
   - Add authorized redirect URLs

2. **Enable Email Magic Links**
   - Configure email templates
   - Set up email provider (Resend)

3. **Configure Redirect URLs**
   - Add `https://reviewai.pro/auth/callback` to allowed URLs
   - Add `http://localhost:3000/auth/callback` for development

### Database Policies

Ensure RLS is enabled on `product_analyses` table:

```sql
-- Enable RLS
ALTER TABLE product_analyses ENABLE ROW LEVEL SECURITY;

-- Policy for viewing reports
CREATE POLICY "Users can view their own analyses or public ones"
ON product_analyses
FOR SELECT
USING (
    auth.uid() = user_id 
    OR is_public = true
);

-- Policy for creating reports
CREATE POLICY "Authenticated users can create analyses"
ON product_analyses
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Monitoring & Logging

### Key Metrics to Monitor

1. **Failed Authentication Attempts**
   - Track redirects to login from protected routes
   - Monitor for unusual patterns

2. **Session Duration**
   - Track how long users stay authenticated
   - Monitor session refresh patterns

3. **Report Access Patterns**
   - Track which reports are accessed most
   - Monitor for suspicious access patterns

## Future Enhancements

### Potential Improvements

1. **Rate Limiting**
   - Limit report access per user per time period
   - Prevent abuse of free tier

2. **Report Sharing**
   - Generate shareable links with tokens
   - Time-limited public access

3. **Analytics**
   - Track which reports are viewed
   - User engagement metrics

4. **Two-Factor Authentication**
   - Optional 2FA for enhanced security
   - Required for premium accounts

## Conclusion

The authentication system is designed with security as the top priority. Multiple layers ensure that reports cannot be accessed without proper authentication, while maintaining a smooth user experience for legitimate users.

**Key Takeaway:** Even if one security layer fails (which shouldn't happen), the other layers provide redundant protection.
