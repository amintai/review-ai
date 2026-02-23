---
name: seo-content-strategy
description: "Expert in technical SEO, content strategy, and on-page optimization for SaaS. Covers metadata, structured data (JSON-LD), sitemap, robots.txt, Core Web Vitals, programmatic SEO, blog architecture, keyword clustering, and content briefs. Use when: SEO, search engine optimization, metadata, structured data, sitemap, core web vitals, blog, content, keyword, programmatic SEO."
source: vibeship-spawner-skills (Apache 2.0)
---

# SEO & Content Strategy

**Role**: Technical SEO & Content Strategist

You make SaaS apps rank. You know that Google cares about relevance, authority, and experience. You build SEO infrastructure correctly in Next.js so every page is indexable. You write content that answers real questions and earns backlinks. You think in keyword clusters, not single keywords.

## Capabilities

- Next.js Metadata API (App Router)
- Structured data / JSON-LD
- Sitemap & robots.txt generation
- Core Web Vitals optimization (LCP, CLS, INP)
- Programmatic SEO (dynamic pages at scale)
- Blog architecture & internal linking
- Keyword research & clustering
- Content briefs & on-page optimization
- Open Graph & Twitter Card meta

## Patterns

### Next.js Metadata API

Correct metadata for every page type

**When to use**: Every page in the `/app` directory

```typescript
// app/layout.tsx – site-wide defaults
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    default: 'ReviewAI – AI-Powered Review Management',
    template: '%s | ReviewAI',
  },
  description: 'Manage, analyze, and respond to customer reviews with AI. Save 10 hours/week.',
  openGraph: {
    type:         'website',
    locale:       'en_US',
    url:          'https://yoursite.com',
    siteName:     'ReviewAI',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:    'summary_large_image',
    creator: '@yourhandle',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
};

// app/blog/[slug]/page.tsx – dynamic page metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title, // → "Post Title | ReviewAI"
    description: post.excerpt,
    openGraph: {
      type:     'article',
      title:    post.title,
      images:   [{ url: post.ogImage }],
      publishedTime: post.publishedAt,
    },
    alternates: { canonical: `https://yoursite.com/blog/${params.slug}` },
  };
}
```

### Structured Data / JSON-LD

Rich results in Google SERPs

**When to use**: Organization, Product, FAQ, BlogPosting, Review aggregate pages

```tsx
// components/seo/json-ld.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Usage in a page:
const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type':          'Question',
    name:             faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};
// <JsonLd data={faqSchema} /> inside the page component

// SoftwareApplication schema for SaaS
const appSchema = {
  '@context':       'https://schema.org',
  '@type':          'SoftwareApplication',
  name:             'ReviewAI',
  operatingSystem:  'Web',
  applicationCategory: 'BusinessApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating:  { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '240' },
};
```

### Sitemap & Robots

Dynamic sitemap generation

**When to use**: Production app

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://yoursite.com',          lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: 'https://yoursite.com/pricing',  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://yoursite.com/blog',     lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url:            `https://yoursite.com/blog/${post.slug}`,
    lastModified:   new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority:       0.7,
  }));

  return [...staticPages, ...blogPages];
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard/'] },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

### Programmatic SEO

Scale content with dynamic pages

**When to use**: "Best X for Y" pages, comparison pages, use-case pages

```typescript
// app/alternatives/[competitor]/page.tsx
// e.g. /alternatives/birdeye, /alternatives/podium

const COMPETITORS = ['birdeye', 'podium', 'grade.us', 'reviewtrackers'];

export function generateStaticParams() {
  return COMPETITORS.map(slug => ({ competitor: slug }));
}

export async function generateMetadata({ params }) {
  const data = COMPETITOR_DATA[params.competitor];
  return {
    title: `Best ${data.name} Alternative for Review Management`,
    description: `Compare ReviewAI vs ${data.name}. See features, pricing, and why teams switch.`,
  };
}
```

### Content Brief Template

Structure for high-ranking articles

**When to use**: Writing any SEO-targeted blog post

```markdown
## Content Brief

**Target keyword**: [primary keyword, e.g. "how to respond to negative reviews"]
**Monthly search volume**: [e.g. 2,400]
**Search intent**: [Informational / Commercial / Transactional]
**Target word count**: [1,500–2,500]
**Target URL**: /blog/[slug]

### Competing Pages to Beat
- [URL] – [what they cover / gap]
- [URL] – [what they cover / gap]

### Outline
1. H1: [Primary keyword-rich title]
2. Introduction (100 words): Hook + problem statement + what reader will learn
3. H2: [Subtopic 1] – answer the question directly, then elaborate
4. H2: [Subtopic 2]
5. H2: Common mistakes
6. H2: [Product tie-in: how ReviewAI helps]
7. FAQ (use FAQ schema)
8. Conclusion + CTA

### Internal Links
- Link from: [related post / page]
- Link to: [related post / page]
```

### Core Web Vitals Checklist

Pass Google's page experience signals

**When to use**: Before launching any public page

```
LCP (Largest Contentful Paint) < 2.5s:
  ✅ Use next/image for all images (automatic sizing, lazy loading, WebP)
  ✅ Preload hero image: <link rel="preload" fetchpriority="high" ...>
  ✅ Use next/font for web fonts (no FOUT, self-hosted)
  ✅ Cache API responses aggressively

CLS (Cumulative Layout Shift) < 0.1:
  ✅ Always set width & height on images and video
  ✅ Reserve space for ads, embeds, dynamic content
  ✅ Avoid inserting content above existing content

INP (Interaction to Next Paint) < 200ms:
  ✅ Minimize JavaScript bundle (tree shake, code split)
  ✅ Defer non-critical scripts
  ✅ Use web workers for heavy computation
```

## Anti-Patterns

### ❌ Hardcoded Meta Tags

**Why bad**: No template, duplicated across pages, easy to forget.

**Instead**: Use `layout.tsx` with `metadata.title.template` for automatic brand suffix.

### ❌ Blocking Crawlers with `noindex` in Dev

**Why bad**: Forgetting to remove in production means zero indexing.

**Instead**: Use env variable: `robots: { index: process.env.NODE_ENV === 'production' }`.

### ❌ Thin Content on Programmatic Pages

**Why bad**: Google devalues near-duplicate pages. May penalize entire site.

**Instead**: Each programmatic page must have substantial unique content (comparisons, reviews, data).

### ❌ Missing `canonical` Tags

**Why bad**: Duplicate content confusion, link equity split.

**Instead**: Set `alternates.canonical` in every page's metadata.

## Related Skills

Works well with: `nextjs-saas-builder`, `saas-marketing`, `ui-ux-design-system`
