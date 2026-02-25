"use client";
import { motion } from "framer-motion";
import { Link2, Cpu, FileText } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: <Link2 className="w-8 h-8 text-white" />,
            title: "Paste the Link",
            description: "Copy any Amazon product URL and drop it into ReviewAI."
        },
        {
            icon: <Cpu className="w-8 h-8 text-white" />,
            title: "AI Does the Work",
            description: "Our engine analyzes thousands of reviews, filters fakes, and scores the product."
        },
        {
            icon: <FileText className="w-8 h-8 text-white" />,
            title: "Get the Verdict",
            description: "Receive a BUY, SKIP, or CAUTION report with a plain-English summary."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
                    >
                        Three steps. Ten seconds. One clear answer.
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mb-8 relative z-10 transition-transform group-hover:scale-110 duration-300 shadow-xl">
                                    {step.icon}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed max-w-xs">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
