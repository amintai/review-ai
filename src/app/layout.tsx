import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css"
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'sonner';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import FacebookPixel from "@/components/analytics/FacebookPixel";
import Script from "next/script";

const syne = Syne({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-syne',
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-dm-sans',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-jetbrains-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewai.pro';

export const metadata: Metadata = {
    title: {
        default: "ReviewAI – Amazon Product Review Intelligence | BUY or SKIP?",
        template: "%s | ReviewAI"
    },
    description: "Stop guessing on Amazon. ReviewAI analyzes thousands of product reviews in seconds and gives you an instant BUY, SKIP, or CAUTION verdict — with trust scorin...",
    keywords: [
        "Amazon product review analyzer",
        "should I buy this Amazon product",
        "AI Amazon review summary",
        "Amazon product verdict",
        "fake Amazon review detector",
        "Amazon review trust score",
        "best Amazon product checker",
        "Amazon review intelligence",
        "AI shopping assistant",
        "Amazon ASIN analyzer",
        "product review analysis tool",
        "Amazon purchase decision tool",
        "Chrome extension Amazon reviews",
        "Amazon review sentiment analysis",
        "avoid bad Amazon products"
    ],
    authors: [{ name: "ReviewAI Team" }],
    creator: "ReviewAI",
    publisher: "ReviewAI",

    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: '/',
    },

    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: 'ReviewAI',
        title: 'ReviewAI – Know if an Amazon Product is Worth It Before You Buy',
        description: 'AI-powered Amazon review analysis. Get an instant BUY, SKIP, or CAUTION verdict with trust scoring — in seconds, on any product.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ReviewAI – Amazon Product Review Intelligence',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'ReviewAI – AI Amazon Review Analyzer',
        description: 'Paste any Amazon URL. Get an instant BUY, SKIP, or CAUTION verdict. Never waste money on a bad product again.',
        images: ['/og-image.png'],
        creator: '@reviewai_pro',
    },

    applicationName: 'ReviewAI',
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.png', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',

    category: 'Shopping & Consumer Tools',
    classification: 'Amazon Product Intelligence Software',
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

    verification: {
        google: 'your-google-site-verification-code',
        yandex: 'your-yandex-verification-code',
        other: {
            'msvalidate.01': 'your-bing-verification-code',
        },
    },
};

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReviewAI',
    applicationCategory: 'ShoppingApplication',
    operatingSystem: 'All',
    description: 'ReviewAI analyzes Amazon product reviews using AI and returns an evidence-based BUY, SKIP, or CAUTION verdict with confidence and trust scoring. Available as a web app and Chrome extension.',
    url: siteUrl,
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier available (10 analyses/month). Pro plan at $9/month.',
        availability: 'https://schema.org/OnlineOnly',
    },
    softwareRequirements: 'Modern Web Browser (Chrome, Safari, Firefox, Edge)',
    audience: {
        '@type': 'Audience',
        audienceType: 'Online Shoppers, Amazon Buyers, Deal Hunters, Consumer Researchers',
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
        'Instant BUY / SKIP / CAUTION verdict for any Amazon product',
        'AI-powered review trust scoring',
        'Confidence score based on review volume and quality',
        'Evidence-backed reasoning (perfect_for, avoid_if, deal_breakers)',
        'Chrome extension — works directly on Amazon product pages',
        'Full analysis history dashboard',
        'Shareable product intelligence reports',
    ],
    screenshot: `${siteUrl}/og-image.png`,
    mainEntity: {
        '@type': 'Organization',
        name: 'ReviewAI',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        sameAs: [
            'https://x.com/reviewai_pro',
            'https://facebook.com/reviewai_pro',
            'https://instagram.com/reviewai_pro',
            'https://www.linkedin.com/in/reviewai-pro-1302153a8/',
            'https://youtube.com/@reviewai_pro'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91 8141759119',
            contactType: 'customer service',
            areaServed: 'Global',
            availableLanguage: 'English'
        }
    }
};


const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How does ReviewAI analyze Amazon products?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ReviewAI collects review signals from the Amazon product page — either through our Chrome extension (which reads the live page) or our server-side scraper — then runs them through an AI model trained to detect patterns, fake reviews, and sentiment clusters. The result is a BUY, SKIP, or CAUTION verdict with a trust score and confidence score.'
            }
        },
        {
            '@type': 'Question',
            name: 'What does the BUY / SKIP / CAUTION verdict mean?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'BUY means the product has strong, trustworthy reviews and is likely a good purchase. SKIP means the product has significant issues — fake reviews, quality complaints, or deal-breakers — and is not recommended. CAUTION means the product has mixed signals and may be worth researching further before buying.'
            }
        },
        {
            '@type': 'Question',
            name: 'Does ReviewAI work on all Amazon products?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'ReviewAI works on any Amazon product with at least 3 reviews. For products with fewer reviews, we return a low-confidence result and flag that more data is needed. Simply paste any Amazon product URL or ASIN and get your verdict in seconds.'
            }
        },
        {
            '@type': 'Question',
            name: 'Is the Chrome extension required?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. You can use ReviewAI entirely from the web app by pasting an Amazon URL. The Chrome extension is optional but enhances the experience — it injects a verdict overlay directly on Amazon product pages so you never have to leave Amazon to get your verdict.'
            }
        },
        {
            '@type': 'Question',
            name: 'Is there a free plan?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The free Starter plan includes 10 AI product analyses per month with full report history and Chrome extension access — no credit card required.'
            }
        },
        {
            '@type': 'Question',
            name: 'How is ReviewAI different from just reading Amazon reviews myself?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Amazon has hundreds — sometimes thousands — of reviews per product, many of which are fake, incentivized, or irrelevant to your needs. ReviewAI reads all of them, weights them by authenticity signals, clusters them by theme, and gives you a distilled verdict in seconds. What takes you 20 minutes of scrolling takes ReviewAI under 10 seconds.'
            }
        }
    ]
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
                <link rel="dns-prefetch" href="https://connect.facebook.net" />

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <Script
                    strategy="lazyOnload"
                    data-website-id="dfid_jl6tqx4c2gwgmNlrkI5a4"
                    data-domain="reviewai.pro"
                    src="https://datafa.st/js/script.js">
                </Script>

                <FacebookPixel />

                {/* Capture UTM Parameters */}
                <Script id="capture-utm" strategy="lazyOnload">
                    {`
                        (function() {
                            const urlParams = new URLSearchParams(window.location.search);
                            const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref'];
                            const captured = {};
                            
                            utms.forEach(param => {
                                const value = urlParams.get(param);
                                if (value) {
                                    captured[param] = value;
                                    localStorage.setItem('reviewai_' + param, value);
                                }
                            });
                            
                            if (Object.keys(captured).length > 0) {
                                console.log('Captured UTMs:', captured);
                            }
                        })();
                    `}
                </Script>
            </head>
            <body className={`${dmSans.className} ${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
                {children}
                <CookieConsentBanner />
                <Analytics />
                <SpeedInsights />
                <Toaster richColors position="bottom-right" />

                <GoogleAnalytics />
            </body>
        </html>
    );
}
