"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function FinalCTA() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const ctaLink = user ? "/dashboard" : "/login?next=/dashboard";

    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_50%)]"></div>
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.05),transparent_50%)]"></div>

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
                        >
                            Stop guessing. <br />
                            <span className="text-orange-500">Start shopping smarter.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Every product has a real story buried under the fake reviews. ReviewAI finds it in seconds.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <Link href={ctaLink} className="w-full max-w-sm">
                                <Button
                                    size="lg"
                                    className="w-full bg-orange-600 text-white hover:bg-orange-700 h-16 px-10 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-95 group"
                                    onClick={() => trackEvent('final_cta_clicked', { type: user ? 'dashboard' : 'login' })}
                                >
                                    Analyze a Product Free <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <Sparkles size={16} className="text-orange-500" /> Trusted by 2,000+ shoppers
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Sparkles size={16} className="text-orange-500" /> Free to start
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Sparkles size={16} className="text-orange-500" /> No signup needed
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
