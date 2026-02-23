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
                a: "ReviewAI is a browser extension that uses AI to analyze Amazon product reviews. It helps you identify fake reviews, understand real consumer sentiment, and gives you a clear 'Buy' or 'Skip' verdict instantly."
            },
            {
                q: "How do I install the extension?",
                a: "You can add ReviewAI to Chrome via the Web Store. Once installed, simply visit any Amazon product page, and the ReviewAI overlay will appear automatically."
            },
            {
                q: "Is it free to use?",
                a: "Yes! We offer a free version that provides basic Trust Scores and sentiment analysis. Our Creator Pro plan includes advanced affiliate-ready summaries and deep-dive reports."
            }
        ]
    },
    {
        category: "Trust Scores & Verdicts",
        questions: [
            {
                q: "How is the Trust Score calculated?",
                a: "Our AI analyzes review patterns, account age of reviewers, and linguistic markers to detect bot activity and incentivized posts. A higher score means the reviews are more likely to be genuine."
            },
            {
                q: "What does the 'Verdict' mean?",
                a: "The Verdict (Buy or Skip) is based on a combination of product quality sentiment and review authenticity. It's designed to give you a quick recommendation based on thousands of analyzed data points."
            }
        ]
    },
    {
        category: "Creator Features",
        questions: [
            {
                q: "What are 'Affiliate-Ready Summaries'?",
                a: "For content creators and affiliates, we provide 1-click 'Pros vs Cons' summaries and persuasive angles that you can use in your social media posts or blog content to drive conversions."
            },
            {
                q: "How can I access deep-dive reports?",
                a: "Full reports with historical price tracking and detailed competitor comparisons are available in the ReviewAI Dashboard for logged-in users."
            }
        ]
    },
    {
        category: "Privacy & Data",
        questions: [
            {
                q: "Does ReviewAI track my browsing history?",
                a: "No. ReviewAI only activates when you are on supported e-commerce domains like Amazon. We do not track your activity on other websites."
            },
            {
                q: "Is my data secure?",
                a: "We use enterprise-grade encryption for all account data. Your browsing data is processed in real-time and never sold to third parties."
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
                        href="mailto:amin.tai.work@gmail.com"
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
