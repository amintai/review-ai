# ReviewAI - Technical Documentation

This document covers the technical architecture, technology stack, deployment strategy, and data management for ReviewAI.

---

## Technology Stack

| Layer         | Technology                                  |
|---------------|---------------------------------------------|
| **Framework** | Next.js 16 (App Router)                     |
| **Language**  | TypeScript                                  |
| **Styling**   | Tailwind CSS 4, Radix UI, Framer Motion     |
| **Backend**   | Next.js API Routes (Serverless Functions)   |
| **Database**  | Supabase (PostgreSQL)                       |
| **Auth**      | Supabase Auth (OAuth 2.0 with Google)       |
| **AI Engine** | OpenAI API (GPT-4o / GPT-4o-mini)             |
| **Email**     | Resend (Transactional Emails)               |
| **Rate Limit**| Upstash Redis                               |
| **Analytics** | Vercel Analytics, Google Analytics 4        |
| **Hosting**   | Vercel (Edge Network)                       |

---

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/             # API routes (generate, contact, etc.)
│   ├── dashboard/       # Protected user dashboard
│   └── (public pages)   # Landing, Blog, Pricing, etc.
├── components/          # Reusable UI components
├── lib/                 # Utilities (Supabase client, email, etc.)
└── _posts/              # MDX blog content
```

---

## Database Schema (Supabase)

### `profiles` Table
Stores user profile data linked to `auth.users`.

| Column          | Type        | Description                       |
|-----------------|-------------|-----------------------------------|
| `id`            | UUID (PK)   | References `auth.users`           |
| `business_name` | text        | User's business name              |
| `business_type` | text        | Category (e.g., Restaurant)       |
| `default_tone`  | text        | Preferred AI tone                 |
| `google_refresh_token` | text (encrypted) | OAuth token for Google API |
| `google_location_id`   | text        | Selected Google Business location |

### `generations` Table
Logs every AI-generated response for usage tracking and history.

| Column             | Type        | Description                      |
|--------------------|-------------|----------------------------------|
| `id`               | bigint (PK) | Auto-incrementing ID             |
| `user_id`          | UUID (FK)   | References `auth.users`          |
| `review_content`   | text        | Original review text             |
| `response_content` | text        | AI-generated response            |
| `tone_used`        | text        | Tone selected for generation     |
| `created_at`       | timestamptz | Timestamp of generation          |

**Security:** Both tables have Row Level Security (RLS) enabled. Users can only access their own data.

---

## Deployment

ReviewAI is deployed on **Vercel** with the following configuration:

- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Environment Variables:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `OPENAI_API_KEY`
  - `RESEND_API_KEY`
  - `CONTACT_EMAIL`
  - `NEXT_PUBLIC_GA_ID`

### Custom Domain
- Production: `reviewai.pro`

---

## Data Flow

1. **User Auth:** User signs in via Google OAuth -> Supabase creates a session.
2. **Review Input:** User pastes a review or fetches from Google Business API.
3. **AI Generation:** Request sent to `/api/generate` -> OpenAI API called -> Response returned.
4. **Logging:** The generation is saved to `generations` table.
5. **Google Reply (Optional):** User posts reply via `/api/google/reply` -> Google My Business API.

---

## Security

- **OAuth 2.0:** Google integration uses restricted OAuth scopes.
- **Token Encryption:** Refresh tokens are encrypted (AES-256) before storage.
- **RLS:** Supabase tables enforce user-level access control.
- **Rate Limiting:** Upstash Redis protects API routes from abuse.
- **GDPR Compliant:** User data is not sold or shared.

---

## Third-Party Integrations

| Service        | Purpose                               |
|----------------|---------------------------------------|
| OpenAI         | AI-powered response generation        |
| Google APIs    | Fetch reviews, post replies           |
| Supabase       | Database, Auth                        |
| Resend         | Transactional email delivery          |
| Vercel         | Hosting, Edge Functions, Analytics    |
| Upstash        | Rate limiting via Redis               |
