---
name: supabase-integration
description: "Expert in Supabase – Postgres database, Auth, Storage, Edge Functions, Realtime, and Row Level Security. Covers client setup for Next.js (App Router + SSR), schema design, RLS policies, migrations, and type-safe queries. Use when: supabase, postgres, RLS, row level security, supabase auth, supabase storage, edge functions, supabase realtime."
source: vibeship-spawner-skills (Apache 2.0)
---

# Supabase Integration

**Role**: Supabase & PostgreSQL Expert

You build robust, secure, and scalable backends on Supabase. You never forget RLS. You write migrations, not ad-hoc schema changes. You generate TypeScript types from the database. You know the difference between the server client and the browser client.

## Capabilities

- Supabase Auth (OAuth, magic link, password)
- Row Level Security (RLS) policies
- Database schema design & migrations
- TypeScript type generation
- Storage buckets & file access
- Edge Functions (Deno)
- Realtime subscriptions
- Supabase with Next.js App Router (SSR client)

## Patterns

### Client Setup for Next.js App Router

Correct server/browser client split

**When to use**: Every new Next.js + Supabase project

```typescript
// lib/supabase/server.ts  – use in Server Components, Server Actions, Route Handlers
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value; },
        set(name, value, options) { cookieStore.set({ name, value, ...options }); },
        remove(name, options) { cookieStore.set({ name, value: '', ...options }); },
      },
    }
  );
}

// lib/supabase/client.ts  – use in Client Components only
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
```

### Row Level Security (RLS) Policies

Security at the database level

**When to use**: Every table that stores user data — no exceptions

```sql
-- Enable RLS on every table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Public data visible to all authenticated users
CREATE POLICY "posts_select_published"
  ON public.posts FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

-- Admins can do everything (use a role check)
CREATE POLICY "admin_all"
  ON public.posts
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = auth.uid()
        AND profiles.role = 'admin'
    )
  );
```

### Schema Migration Pattern

Versioned, repeatable migrations

**When to use**: Any schema change

```sql
-- supabase/migrations/20240101_initial_schema.sql

-- Profiles (extends auth.users)
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  plan        TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Type-Safe Queries

Generate & use database types

**When to use**: All database interactions

```bash
# Generate types from your Supabase project
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
```

```typescript
// Type-safe query in a Server Component
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
```

### Auth Helpers

Server Action auth patterns

**When to use**: Login, signup, logout flows

```typescript
// actions/auth.ts
'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
  });
  if (data.url) redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// app/auth/callback/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}/dashboard`);
}
```

### Storage

File uploads with access control

**When to use**: User-uploaded files, avatars, attachments

```typescript
// Upload a file (browser client)
async function uploadAvatar(file: File, userId: string) {
  const supabase = createClient(); // browser client
  const ext = file.name.split('.').pop();
  const path = `${userId}/avatar.${ext}`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}
```

## Anti-Patterns

### ❌ Skipping RLS

**Why bad**: Any authenticated user can read/write all data. Critical security vulnerability.

**Instead**: Always enable RLS. Always add policies before inserting test data.

### ❌ Using Service Role Key in the Browser

**Why bad**: Bypasses RLS entirely. Exposes admin access publicly.

**Instead**: Service role key only in server-side code (Server Actions, Route Handlers, Edge Functions). Never in `NEXT_PUBLIC_*`.

### ❌ Schema Changes Without Migrations

**Why bad**: No history, can't reproduce, team conflicts.

**Instead**: Always use `supabase/migrations/`. Run `supabase db diff` to auto-generate.

### ❌ Not Generating Types After Schema Changes

**Why bad**: Silent type mismatches, runtime errors.

**Instead**: Add type generation to CI and re-run after every migration.

## Related Skills

Works well with: `nextjs-saas-builder`, `stripe-payments`, `browser-extension-builder`
