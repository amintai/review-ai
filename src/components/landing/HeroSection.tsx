"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import ReportShowcase from "./ReportShowcase";

export default function HeroSection() {
    const [user, setUser] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Simple check for mobile/tablet
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const ctaLink = user ? "/dashboard" : "/login?next=/dashboard";

    return (
        <HeroHighlight containerClassName="h-auto py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
                    {/* Left Column: Content */}
                    <div className="flex flex-col items-start space-y-6">
                        {/* Banner Note - Plain Text, No Emojis */}
                        <motion.div
                            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full text-orange-700 text-sm font-semibold backdrop-blur-sm"
                        >
                            Chrome Extension — launching soon. Use the web app free today.
                        </motion.div>

                        <motion.h1
                            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1]"
                        >
                            BUY or SKIP? <br />
                            Get the AI Verdict on Any Amazon Product in <br />
                            <span className="text-[#F97316]">
                                10 Seconds.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl text-gray-500 max-w-xl leading-relaxed"
                        >
                            Our AI scans thousands of reviews, strips out the fakes, and tells you exactly whether a product is worth your money — <strong>before you click purchase.</strong>
                        </motion.p>

                        <motion.div
                            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col items-start gap-4 w-full"
                        >
                            <Link href={ctaLink} className="w-full max-w-sm">
                                <Button
                                    size="lg"
                                    className="w-full bg-[#F97316] text-white hover:bg-[#EA580C] h-16 px-10 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-95 group"
                                    onClick={() => trackEvent('hero_cta_clicked', { type: user ? 'dashboard' : 'login' })}
                                >
                                    Analyze a Product Free <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-400">
                                <div className="flex items-center gap-1.5">
                                    <Sparkles size={16} className="text-orange-500" /> No account needed
                                </div>
                                <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                                    <Sparkles size={16} className="text-orange-400" /> Works on any Amazon product
                                </div>
                                <div className="flex items-center gap-1.5 border-l border-gray-200 pl-4">
                                    <ShieldCheck size={16} className="text-green-500" /> 100% unbiased
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Dashboard Mockup */}
                    <motion.div
                        initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 40, rotate: 0 }}
                        animate={{ opacity: 1, x: 0, y: 0, rotate: isMobile ? 0 : -2 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative block lg:block scale-100 lg:scale-105 origin-center mt-12 lg:mt-0"
                    >
                        {/* Browser Frame */}
                        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden relative z-10 transition-transform hover:scale-[1.02] duration-500">
                            {/* Browser Top Bar */}
                            <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="mx-auto bg-white border border-gray-200 rounded-md px-3 py-1 text-[10px] text-gray-400 w-1/2 text-center truncate">
                                    reviewai.pro/dashboard
                                </div>
                            </div>

                            {/* Dashboard Report Showcase Component */}
                            <div className="relative h-[480px] bg-[#F7F6F3] overflow-hidden group">
                                <ReportShowcase />

                                {/* Tooltip or indicator that it's a demo */}
                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    Live Mockup
                                </div>
                            </div>
                        </div>

                        {/* Floating Decoration - Repositioned to overlap frame */}
                        <div className="absolute -top-4 -right-2 lg:-right-4 z-20 bg-orange-600 text-white px-4 lg:px-5 py-2 lg:py-3 rounded-xl lg:rounded-2xl shadow-2xl flex items-center gap-2 lg:gap-3 animate-bounce-subtle">
                            <Sparkles size={isMobile ? 16 : 20} className="text-orange-200" />
                            <div className="flex flex-col">
                                <span className="font-black text-base lg:text-lg leading-none">98%</span>
                                <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest opacity-80">Accuracy</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </HeroHighlight>
    );
}
