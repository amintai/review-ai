import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Check, X, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: 'Pricing | ReviewAI - Choose Your Shopping Intelligence Plan',
    description: 'Start for free with 10 AI analyses per month. Upgrade to Pro for unlimited shopping verdicts, priority processing, and advanced creator features.',
};

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for occasional shoppers",
        features: [
            { text: "10 AI Analysis per month", included: true },
            { text: "Chrome Extension access", included: true },
            { text: "Smart Pros & Cons", included: true },
            { text: "Standard processing speed", included: true },
            { text: "Review Trust Scoring", included: false },
            { text: "Creator Affiliate Insights", included: false },
            { text: "Analysis History (30 days)", included: false },
        ],
        cta: "Add to Chrome",
        highlighted: false
    },
    {
        name: "Pro",
        price: "$9",
        period: "/month",
        description: "For power shoppers & creators",
        features: [
            { text: "Unlimited AI Analysis", included: true },
            { text: "Chrome Extension access", included: true },
            { text: "Instant VIP processing", included: true },
            { text: "Advanced Trust Scoring", included: true },
            { text: "Creator Affiliate Insights", included: true },
            { text: "Forever Analysis History", included: true },
            { text: "Priority Email Support", included: true },
        ],
        cta: "Go Pro Now",
        highlighted: true
    },
    {
        name: "Creator",
        price: "$19",
        period: "/month",
        description: "For professional reviewers",
        features: [
            { text: "Unlimited AI Analysis", included: true },
            { text: "Custom Report Branding", included: true },
            { text: "API Access (Early Access)", included: true },
            { text: "Bulk ASIN Analysis", included: true },
            { text: "Advanced Comparison Tools", included: true },
            { text: "Dedicated Success Manager", included: true },
            { text: "Export to CSV / PDF", included: true },
        ],
        cta: "Join as Creator",
        highlighted: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Simple Plans for <br />
                        <span className="text-orange-600">Smarter Shopping</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Start for free, upgrade when you need more power. Stop wasting money on bad products.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`rounded-3xl p-8 border hover:shadow-2xl transition-all duration-300 flex flex-col ${plan.highlighted
                                ? 'border-orange-500 ring-4 ring-orange-50 shadow-xl bg-white scale-105 z-10'
                                : 'border-gray-200 bg-gray-50/50'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="text-center mb-6">
                                    <span className="bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                        Best Value
                                    </span>
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                                <span className="text-gray-500 font-medium">{plan.period}</span>
                            </div>
                            <p className="text-gray-500 mb-8 font-medium">{plan.description}</p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <div className="mt-1 bg-green-100 rounded-full p-0.5">
                                                <Check className="h-3.5 w-3.5 text-green-600" />
                                            </div>
                                        ) : (
                                            <div className="mt-1 bg-gray-100 rounded-full p-0.5">
                                                <X className="h-3.5 w-3.5 text-gray-400" />
                                            </div>
                                        )}
                                        <span className={`text-sm ${feature.included ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/login"
                                className={`block w-full text-center py-4 px-6 rounded-2xl font-bold transition-all ${plan.highlighted
                                    ? 'bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200'
                                    : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-gray-100 pt-16">
                    <div className="flex flex-col items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-orange-600" />
                        <h4 className="font-bold text-gray-900">Secure Payments</h4>
                        <p className="text-sm text-gray-500">Stripe-powered security</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <Zap className="h-8 w-8 text-orange-600" />
                        <h4 className="font-bold text-gray-900">Instant Access</h4>
                        <p className="text-sm text-gray-500">Upgrade took seconds</p>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <Sparkles className="h-8 w-8 text-orange-600" />
                        <h4 className="font-bold text-gray-900">Cancel Anytime</h4>
                        <p className="text-sm text-gray-500">No long-term contracts</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
