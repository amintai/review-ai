import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import CookieConsentBanner from "@/components/ui/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from 'sonner';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import FacebookPixel from "@/components/analytics/FacebookPixel";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reviewai.pro';

export const metadata: Metadata = {
    // Basic SEO - Optimized title length (58 chars)
    title: {
        default: "ReviewAI – AI Review Response Generator for Google & Yelp",
        template: "%s | ReviewAI"
    },
    description: "AI-Powered Review Response Generator: Automated replies for Google, Yelp, Facebook and TripAdvisor. Create human-sounding responses in seconds to boost ratings and save time.",
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
        creator: '@reviewai_pro',
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

const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ReviewAI',
    image: `${siteUrl}/og-image.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+91 8141759119',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '',
        addressLocality: 'Vadodara, Gujarat',
        addressRegion: 'Gujarat',
        postalCode: '390001',
        addressCountry: 'India'
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.3039,
        longitude: 72.8777
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        opens: '09:00',
        closes: '17:00'
    },
    sameAs: [
        'https://x.com/reviewai_pro',
        'https://facebook.com/reviewai_pro',
        'https://instagram.com/reviewai_pro',
        'https://linkedin.com/company/reviewai',
        'https://youtube.com/@reviewai_pro'
    ]
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Will the responses sound robotic?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Not at all. ReviewAI is specifically tuned to mimic natural human conversation, using empathy and context awareness. Most customers cannot distinguish our AI replies from human-written ones.'
            }
        },
        {
            '@type': 'Question',
            name: 'Which platforms do you support?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our copy-paste generator works for ANY platform (Google, Yelp, Facebook, TripAdvisor, etc.). For direct integration (fetching & publishing), we currently support Google Business Profile, with Yelp coming soon.'
            }
        },
        {
            '@type': 'Question',
            name: 'How secure is my Google Business account data?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'We take an expert-level approach to security. We use OAuth 2.0 with restricted scopes, meaning we only access what is strictly necessary. Your tokens are encrypted using AES-256 and stored in an isolated Supabase environment with Row Level Security (RLS) enabled.'
            }
        },
        {
            '@type': 'Question',
            name: 'Is my customer data safe?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. We are GDPR compliant. Your review data is used in real-time to generate responses and is never stored permanently unless logged for your own history. We never sell or share your data with third parties.'
            }
        },
        {
            '@type': 'Question',
            name: 'Is there a free plan?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! You can generate up to 10 high-quality responses per month for free, forever. No credit card required to get started.'
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

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />

                <Script
                    defer
                    data-website-id="dfid_jl6tqx4c2gwgmNlrkI5a4"
                    data-domain="reviewai.pro"
                    src="https://datafa.st/js/script.js">
                </Script>

                <FacebookPixel />

                {/* Capture UTM Parameters */}
                <Script id="capture-utm" strategy="afterInteractive">
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
            <body className={inter.className}>
                {children}
                <CookieConsentBanner />
                <Analytics />
                <SpeedInsights />
                <Toaster richColors position="top-center" />

                <GoogleAnalytics />
            </body>
        </html>
    );
}
