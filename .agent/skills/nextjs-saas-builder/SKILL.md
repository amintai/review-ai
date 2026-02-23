---
name: nextjs-saas-builder
description: "Expert in building production-grade SaaS applications with Next.js 14+ App Router. Covers project structure, server components, API routes, authentication, middleware, performance optimization, and deployment. Use when: next.js, nextjs, app router, server components, RSC, SaaS, full-stack Next."
source: vibeship-spawner-skills (Apache 2.0)
---

# Next.js SaaS Builder

**Role**: Senior Next.js Full-Stack Engineer

You build production SaaS apps on Next.js App Router that are fast, scalable, and maintainable. You know the difference between Server Components and Client Components and always choose correctly. You architect data-fetching patterns that minimize waterfalls.

## Capabilities

- App Router architecture (Next.js 14+)
- Server Components & Client Components
- Server Actions & API Routes
- Middleware (auth guards, redirects, i18n)
- Route Groups & Parallel Routes
- Streaming & Suspense
- Image & Font optimization
- Edge runtime
- Deployment on Vercel / self-hosted

## Patterns

### Project Structure

Scalable SaaS folder layout

**When to use**: Greenfield project or major refactor

```
src/
├── app/
│   ├── (marketing)/        # Route group – public pages
│   │   ├── page.tsx        # Landing page
│   │   ├── pricing/
│   │   └── blog/
│   ├── (auth)/             # Route group – auth pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/        # Route group – protected app
│   │   ├── layout.tsx      # Auth guard + sidebar
│   │   ├── dashboard/
│   │   └── settings/
│   ├── api/                # API routes
│   │   └── webhooks/
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Shadcn/radix primitives
│   └── shared/             # Business components
├── lib/
│   ├── supabase/           # DB client helpers
│   ├── stripe/             # Payment helpers
│   └── utils.ts
├── hooks/                  # Client-side hooks
├── actions/                # Server actions
├── types/                  # TypeScript types
└── middleware.ts
```

### Server vs Client Components

Choose the right component type

**When to use**: Every time you create a new component

```typescript
// ✅ SERVER COMPONENT (default) – no 'use client'
// - Fetches data directly (no useEffect)
// - Accesses backend resources (DB, file system)
// - Keeps secrets out of the browser bundle
// - Cannot use useState, useEffect, event handlers

async function ProductList() {
  const products = await db.query('SELECT * FROM products'); // direct DB access
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// ✅ CLIENT COMPONENT – 'use client' at top
// - Uses hooks (useState, useEffect, useContext)
// - Handles browser events (onClick, onChange)
// - Accesses browser APIs (localStorage, navigator)

'use client';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ✅ PATTERN: Server parent passes data to Client child
async function Page() {
  const data = await fetchData(); // server fetch
  return <ClientChart data={data} />; // pass as props
}
```

### Server Actions

Mutation pattern without API routes

**When to use**: Form submissions, data mutations

```typescript
// actions/user.ts
'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateProfile(formData: FormData) {
  const name = formData.get('name') as string;

  // Validate
  if (!name || name.length < 2) {
    return { error: 'Name too short' };
  }

  // Mutate
  await db.users.update({ where: { id: userId }, data: { name } });

  // Revalidate cache
  revalidatePath('/dashboard/profile');
}

// Usage in a Server Component form:
// <form action={updateProfile}><input name="name" /><button>Save</button></form>
```

### Middleware Auth Guard

Protect routes at the edge

**When to use**: Any authenticated route group

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthPage = req.nextUrl.pathname.startsWith('/login');
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
```

### Data Fetching Patterns

Avoid waterfalls, maximize performance

**When to use**: Any page that loads multiple data sources

```typescript
// ❌ BAD – Sequential waterfall
async function Page() {
  const user = await getUser();
  const projects = await getProjects(user.id); // waits for user
  const stats = await getStats(user.id);       // waits for projects
}

// ✅ GOOD – Parallel fetch
async function Page() {
  const [user, projects, stats] = await Promise.all([
    getUser(),
    getProjects(),
    getStats(),
  ]);
}

// ✅ STREAMING with Suspense – show content progressively
import { Suspense } from 'react';

async function Page() {
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <SlowDataComponent /> {/* lazy boundary */}
      </Suspense>
      <FastComponent /> {/* renders immediately */}
    </>
  );
}
```

## Anti-Patterns

### ❌ Fetching Data in Client Components

**Why bad**: Exposes API keys, slower (client-side waterfall), larger bundle.

**Instead**: Fetch in Server Components, pass via props, or use Server Actions.

### ❌ Putting Business Logic in `page.tsx`

**Why bad**: Hard to test, hard to reuse, bloated files.

**Instead**: Extract to `actions/`, `lib/`, or service modules.

### ❌ Ignoring Caching

**Why bad**: Slow responses, unnecessary DB hits, high costs.

**Instead**: Use `fetch` with `cache` option, `unstable_cache`, or `revalidateTag`.

### ❌ Using `useEffect` for Data Fetching

**Why bad**: Client waterfall, flash of empty content, SEO damage.

**Instead**: Fetch in Server Component or use `useSWR` with server-prefetched data.

## Related Skills

Works well with: `supabase-integration`, `ui-ux-design-system`, `seo-content-strategy`, `stripe-payments`
