import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Pricing | ReviewAI',
    description: 'Simple, transparent pricing for ReviewAI. Start free, upgrade when you need more.',
};

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for trying out ReviewAI",
        features: [
            { text: "10 AI responses per month", included: true },
            { text: "1 Google Business location", included: true },
            { text: "Basic tone selection", included: true },
            { text: "Email support", included: true },
            { text: "Analytics dashboard", included: false },
            { text: "Priority support", included: false },
            { text: "Custom tone training", included: false },
        ],
        cta: "Get Started",
        highlighted: false
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "For growing businesses",
        features: [
            { text: "Unlimited AI responses", included: true },
            { text: "Up to 5 locations", included: true },
            { text: "All tone options", included: true },
            { text: "Priority email support", included: true },
            { text: "Full analytics dashboard", included: true },
            { text: "Response scheduling", included: true },
            { text: "Custom tone training", included: false },
        ],
        cta: "Start Free Trial",
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For large organizations",
        features: [
            { text: "Unlimited everything", included: true },
            { text: "Unlimited locations", included: true },
            { text: "Custom AI training", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "Advanced analytics & API", included: true },
            { text: "SSO & team management", included: true },
            { text: "Custom integrations", included: true },
        ],
        cta: "Contact Sales",
        highlighted: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-24 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Start for free, upgrade when your business grows. No hidden fees, cancel anytime.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl p-8 border ${plan.highlighted
                                    ? 'border-blue-500 ring-2 ring-blue-100 shadow-xl'
                                    : 'border-gray-200'
                                }`}
                        >
                            {plan.highlighted && (
                                <div className="text-center mb-4">
                                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                <span className="text-gray-500">{plan.period}</span>
                            </div>
                            <p className="text-gray-500 mb-6">{plan.description}</p>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                                        )}
                                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.name === "Enterprise" ? "mailto:sales@reviewai.com" : "/login"}
                                className={`block w-full text-center py-3 px-6 rounded-xl font-medium transition-colors ${plan.highlighted
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Link */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center bg-gray-50 rounded-2xl p-10">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Have questions about pricing?</h3>
                    <p className="text-gray-600 mb-6">Check out our FAQ or reach out to our team.</p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/faq"
                            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            View FAQ
                        </Link>
                        <a
                            href="mailto:support@reviewai.com"
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Contact Sales
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
