import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'sonner';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"], display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewai.pro';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
    // Basic SEO - Optimized title length (58 chars)
    title: {
        default: "ReviewAI - AI Review Response Generator for Businesses",
        template: "%s | ReviewAI"
    },
    description: "Generate professional, human-sounding responses to customer reviews in seconds. AI-powered review management for Google Business Profile, Yelp, Facebook & TripAdvisor. Save 10+ hours weekly with automated review responses.",
    keywords: [
        "AI review response generator",
        "Google Business Profile review management",
        "automated review responses",
        "reputation management software",
        "reply to Google reviews",
        "AI customer review response",
        "review management for small business",
        "Google My Business review assistant",
        "professional review responses",
        "Yelp review management AI",
        "respond to negative reviews",
        "customer feedback management",
        "online reputation management",
        "review response automation"
    ],
    authors: [{ name: "ReviewAI Team" }],
    creator: "ReviewAI",
    publisher: "ReviewAI",

    // Canonical & Base
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: 'ReviewAI',
        title: 'ReviewAI - AI Review Response Generator | Manage Reviews Instantly',
        description: 'Generate professional, human-sounding responses to customer reviews in seconds. Works across Google, Yelp, Facebook & TripAdvisor.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ReviewAI - AI-Powered Review Response Generator',
            },
        ],
    },

    // Twitter/X Card
    twitter: {
        card: 'summary_large_image',
        title: 'ReviewAI - AI Review Response Generator',
        description: 'Generate professional responses to customer reviews in seconds. Save 10+ hours weekly with AI-powered review management.',
        images: ['/og-image.png'],
        creator: '@reviewai',
    },

    // App & Icons
    applicationName: 'ReviewAI',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',

    // Additional SEO
    category: 'Business Software',
    classification: 'Review Management Software',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // Verification - Add your actual codes after registering with each console
    verification: {
        google: 'your-google-site-verification-code', // Get from Google Search Console
        yandex: 'your-yandex-verification-code', // Get from Yandex Webmaster
        other: {
            'msvalidate.01': 'your-bing-verification-code', // Get from Bing Webmaster Tools
        },
    },
};

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReviewAI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'AI-powered review response generator for Google Business Profile, Yelp, Facebook, and TripAdvisor. Generate professional, human-sounding responses to customer reviews in seconds.',
    url: siteUrl,
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier available (15 generations/month). Pro plan at $12/month (approx ₹999).',
        availability: 'https://schema.org/OnlineOnly',
    },
    softwareRequirements: 'Modern Web Browser (Chrome, Safari, Firefox, Edge)',
    audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Small Business Owners',
        geographicArea: {
            '@type': 'GeoShape',
            region: 'Global'
        }
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1',
    },
    featureList: [
        'AI-powered review response generation',
        'Google Business Profile integration',
        'Multi-platform support (Yelp, Facebook, TripAdvisor)',
        'Tone customization (Professional, Friendly, Empathetic, Witty)',
        'Instant response generation',
        'Human-sounding AI responses',
    ],
    screenshot: `${siteUrl}/og-image.png`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Resource Hints for Performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>
                {children}
                <CookieConsentBanner />
                <Analytics />
                <SpeedInsights />
                <Toaster richColors position="top-center" />

                {/* Google Analytics 4 - Loads after interactive */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                            anonymize_ip: true,
                            cookie_flags: 'SameSite=None;Secure'
                        });
                    `}
                </Script>
            </body>
        </html>
    );
}
