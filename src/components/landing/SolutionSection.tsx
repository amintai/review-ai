"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ShieldCheck, UserCheck } from 'lucide-react';

export default function SolutionSection() {
    const outcomes = [
        {
            icon: <Zap className="w-8 h-8 text-orange-600" />,
            title: "Instant Verdict",
            description: "Paste any Amazon URL and get a clear BUY, SKIP, or CAUTION verdict — no guesswork, no scrolling, no regret."
        },
        {
            icon: <UserCheck className="w-8 h-8 text-orange-600" />,
            title: "AI Fake Detection",
            description: "Our engine identifies paid reviews, bot patterns, and incentivized praise so only real human feedback shapes your decision."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-orange-600" />,
            title: "Shop With Confidence",
            description: "Know exactly what you're getting before checkout. No more buyer's remorse, no more wasted returns."
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-16"
                >
                    ReviewAI gives you the truth <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                        in 10 seconds flat.
                    </span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {outcomes.map((outcome, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                                {outcome.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{outcome.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-lg">
                                {outcome.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
