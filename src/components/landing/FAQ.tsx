"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ() {
    const faqs = [
        {
            q: "Will the responses sound robotic?",
            a: "Not at all. ReviewAI is specifically tuned to mimic natural human conversation, using empathy and context awareness. Most customers cannot distinguish our AI replies from human-written ones."
        },
        {
            q: "Which platforms do you support?",
            a: "Our copy-paste generator works for ANY platform (Google, Yelp, Facebook, TripAdvisor, etc.). For direct integration (fetching & publishing), we currently support Google Business Profile, with Yelp coming soon."
        },
        {
            q: "How secure is my Google Business account data?",
            a: "We take an expert-level approach to security. We use OAuth 2.0 with restricted scopes, meaning we only access what is strictly necessary. Your tokens are encrypted using AES-256 and stored in an isolated Supabase environment with Row Level Security (RLS) enabled."
        },
        {
            q: "Is my customer data safe?",
            a: "Absolutely. We are GDPR compliant. Your review data is used in real-time to generate responses and is never stored permanently unless logged for your own history. We never sell or share your data with third parties."
        },
        {
            q: "Is there a free plan?",
            a: "Yes! You can generate up to 10 high-quality responses per month for free, forever. No credit card required to get started."
        }
    ];

    return (
        <section className="py-20 max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className="text-left text-lg font-medium text-gray-800">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
