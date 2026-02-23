"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Download, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { trackEvent } from "@/lib/analytics";
import { useRouter } from "next/navigation";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

export default function HeroSection() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url || loading) return;

        setLoading(true);
        trackEvent('hero_analyze_clicked', { url });

        try {
            const res = await fetch('/api/amazon/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const data = await res.json();

            if (data.id) {
                router.push(`/report/${data.id}`);
            } else if (data.error) {
                alert(data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <HeroHighlight containerClassName="h-auto md:h-auto py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm text-orange-800 mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2"></span>
                    Viral Amazon Review Intelligence
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6"
                >
                    Shop Smarter. Get the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
                        Real Amazon Verdict.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                >
                    The AI copilot that lives in your browser. Read thousands of reviews instantly and decide: <strong>Buy or Skip?</strong>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col items-center justify-center gap-6"
                >
                    {/* Primary Extension CTA */}
                    <Button
                        size="lg"
                        className="bg-gray-900 text-white hover:bg-black h-16 px-10 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center gap-3"
                        onClick={() => trackEvent('hero_cta_clicked', { type: 'add_to_chrome' })}
                    >
                        <Download className="h-6 w-6" /> Add to Chrome — It's Free
                    </Button>
                    <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Compatible with classic Amazon pages & mobile web.</p>

                    {/* Waitlist Section */}
                    <div className="w-full max-w-lg border-t border-gray-200 my-6 relative">
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-xs font-medium uppercase tracking-wider">OR JOIN THE WAITLIST</span>
                    </div>

                    <div className="w-full max-w-lg">
                        <p className="text-sm text-gray-500 mb-4 text-center">Get notified when we launch new features and updates</p>
                        <WaitlistForm source="homepage-hero" />
                    </div>
                </motion.div>


                {/* Social Proof / Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500"
                >
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1 text-gray-900 font-bold text-lg">
                            <ShieldCheck className="text-green-500" /> 100% Unbiased
                        </div>
                        <span className="text-sm">Detects Fake Reviews</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1 text-gray-900 font-bold text-lg">
                            <ShoppingCart className="text-orange-500" /> Affiliate Friendly
                        </div>
                        <span className="text-sm">Conversion Optimised</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1 text-gray-900 font-bold text-lg">
                            <span className="text-2xl">98%</span>
                        </div>
                        <span className="text-sm">Verdict Accuracy</span>
                    </div>
                </motion.div>
            </div>
        </HeroHighlight>
    );
}
