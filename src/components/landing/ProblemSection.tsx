"use client";
import { motion } from "framer-motion";

export default function ProblemSection() {
    return (
        <section id="features" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                            Amazon's review system is broken. <br />
                            <span className="text-orange-600">And you're paying for it.</span>
                        </h2>
                        <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                            <p>
                                Up to 42% of Amazon product reviews are fake, incentivized, or bot-generated. Brands pay for 5-star ratings. Sellers delete bad reviews overnight.
                            </p>
                            <p>
                                And by the time you realize the product is garbage, you're already waiting on a return label.
                            </p>
                            <p className="font-semibold text-gray-900">
                                You shouldn't need to spend 45 minutes cross-referencing Reddit threads just to buy a phone case. That's not shopping — that's detective work.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>

                            <div className="relative z-10">
                                <div className="text-6xl md:text-8xl font-black text-orange-500 mb-4 italic tracking-tighter">42%</div>
                                <div className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                    of Amazon electronics reviews are estimated to be fake or compensated.
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-sm font-medium uppercase tracking-widest">
                                    <span className="h-px w-8 bg-gray-700"></span>
                                    Source: Consumer Analysis 2025
                                </div>
                            </div>
                        </div>

                        {/* Floating elements for visual interest */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-bold text-gray-900">"Bot-generated praise detected"</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
