"use client";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
    const faqs = [
        {
            question: "Is it free?",
            answer: "Yes. You can start analyzing products right now for free — no credit card, no account required."
        },
        {
            question: "Is it really unbiased?",
            answer: "Completely. ReviewAI has zero affiliation with Amazon, sellers, or any brand. We're paid by users, not advertisers."
        },
        {
            question: "Is my data private?",
            answer: "Yes. We don't store your search history or share your data with third parties."
        },
        {
            question: "Does it work on all Amazon products?",
            answer: "ReviewAI works on the vast majority of Amazon product pages. If a product has reviews, we can analyze it."
        },
        {
            question: "When is the Chrome Extension available?",
            answer: "The extension is in development and launching soon. In the meantime, the web app works on any browser — just paste and go."
        },
        {
            question: "Is this a Fakespot replacement?",
            answer: "Fakespot shut down in July 2025. ReviewAI is the modern, AI-native alternative built for shoppers, not sellers."
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-gray-50">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold tracking-tight text-gray-900 mb-4"
                    >
                        Common questions, straight answers.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-100 rounded-2xl px-6">
                                <AccordionTrigger className="text-left py-6 text-lg font-semibold text-gray-900 hover:no-underline hover:text-orange-600 transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
