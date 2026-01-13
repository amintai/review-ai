"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        category: "Getting Started",
        questions: [
            {
                q: "What is ReviewAI?",
                a: "ReviewAI is an AI-powered platform that helps businesses manage their online reputation by automatically generating professional, empathetic responses to customer reviews. It integrates with Google Business Profile to streamline your review management workflow."
            },
            {
                q: "How do I get started?",
                a: "Simply sign in with your Google account, connect your Google Business Profile, and you're ready to go! You can start generating AI responses to your reviews immediately."
            },
            {
                q: "Is there a free trial?",
                a: "Yes! We offer a free tier that includes a limited number of AI-generated responses per month. You can upgrade anytime to unlock unlimited responses and premium features."
            }
        ]
    },
    {
        category: "Google Integration",
        questions: [
            {
                q: "How does the Google Business Profile integration work?",
                a: "When you connect your Google account, we securely access your business reviews through Google's official APIs. You can view all your reviews in one dashboard and post AI-generated replies directly."
            },
            {
                q: "Is my Google data secure?",
                a: "Absolutely. We use OAuth 2.0 for authentication and only request the minimum permissions needed. Your credentials are never stored on our servers. You can revoke access at any time from your Google account settings."
            },
            {
                q: "Can I manage multiple business locations?",
                a: "Yes! If your Google Business Profile has multiple locations, you can manage reviews for all of them from a single ReviewAI dashboard."
            }
        ]
    },
    {
        category: "AI Responses",
        questions: [
            {
                q: "How accurate are the AI-generated responses?",
                a: "Our AI is trained on thousands of professional business responses and achieves high accuracy. However, we always recommend reviewing responses before posting to ensure they match your brand voice and address specific customer concerns."
            },
            {
                q: "Can I customize the tone of responses?",
                a: "Yes! You can choose between Professional, Friendly, Empathetic, or Witty tones. Each style is designed to match different brand personalities and customer situations."
            },
            {
                q: "What languages are supported?",
                a: "Currently, ReviewAI primarily supports English. We're working on adding support for Spanish, French, German, and other major languages in upcoming releases."
            }
        ]
    },
    {
        category: "Billing & Account",
        questions: [
            {
                q: "How does billing work?",
                a: "We offer monthly and annual subscription plans. You can view our pricing page for detailed information. Annual plans come with a 20% discount."
            },
            {
                q: "Can I cancel my subscription?",
                a: "Yes, you can cancel anytime from your account settings. Your access will continue until the end of your current billing period."
            },
            {
                q: "How do I delete my account?",
                a: "You can request account deletion from your account settings or by contacting our support team. We'll remove all your data within 30 days."
            }
        ]
    }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 text-left hover:text-blue-600 transition-colors"
            >
                <span className="font-medium text-gray-900">{question}</span>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-5 text-gray-600 leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-500">Everything you need to know about ReviewAI</p>
                </div>

                {faqs.map((section) => (
                    <div key={section.category} className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{section.category}</h2>
                        <div className="bg-gray-50 rounded-xl p-6">
                            {section.questions.map((item, idx) => (
                                <FAQItem key={idx} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mt-16 text-center bg-blue-50 rounded-2xl p-10">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
                    <p className="text-gray-600 mb-6">Can&apos;t find what you&apos;re looking for? Our support team is here to help.</p>
                    <a
                        href="mailto:support@reviewai.com"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Contact Support
                    </a>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
}
