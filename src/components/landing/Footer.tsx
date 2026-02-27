"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import Logo from "@/components/ui/Logo";

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden">
            <AuroraBackground className="!h-auto pt-20 pb-0">
                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    {/* CTA / Header Section within Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <Logo size="lg" className="mb-6" />
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6">
                                    The verdict is clear. <br />
                                    <span className="text-neutral-500">Shop with total confidence.</span>
                                </h2>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-4"
                        >
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-xs text-sm">
                                Join thousands of smart shoppers using AI to cut through the noise of Amazon reviews.
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                            >
                                Get Started Free
                            </Link>
                        </motion.div>
                    </div>

                    {/* Footer Main Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 pb-20 border-t border-neutral-200 dark:border-neutral-800 pt-16">
                        <div className="col-span-2 lg:col-span-2 flex flex-col justify-between">
                            <div className="flex flex-col gap-4">
                                <h3 className="font-bold text-lg dark:text-white">ReviewAI</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
                                    Advanced Amazon Product Review Intelligence. We analyze thousands of reviews so you don't have to.
                                </p>
                            </div>

                            <div className="mt-8 md:mt-0 pt-8 md:pt-0">
                                <p className="font-medium text-xs uppercase tracking-widest text-neutral-500 mb-4">
                                    Socials
                                </p>
                                <div className="flex gap-4">
                                    <Link href="https://x.com/aminnnn_09" target="_blank" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </Link>
                                    <Link href="https://www.linkedin.com/in/reviewai-pro-1302153a8/" target="_blank" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                    <Link href="https://instagram.com/aminnn_09" target="_blank" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Product</h4>
                            <ul className="flex flex-col gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                                <li><Link href="/#features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="/pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="/blog" className="hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="/login" className="hover:text-black dark:hover:text-white transition-colors">Login</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Legal</h4>
                            <ul className="flex flex-col gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                                <li><Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link></li>
                                <li><Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link></li>
                                <li><Link href="/faq" className="hover:text-black dark:hover:text-white transition-colors">FAQ</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">Support</h4>
                            <ul className="flex flex-col gap-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                                <li><Link href="/contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="mailto:support@reviewai.pro" className="hover:text-black dark:hover:text-white transition-colors">Email Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* BIG TEXT SECTION - ACETERNITY STYLE */}
                    <div className="relative w-full flex items-center justify-center pointer-events-none select-none overflow-hidden pb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="text-[14vw] font-bold leading-none tracking-tighter text-neutral-900/[0.07] dark:text-white/[0.03] whitespace-nowrap uppercase"
                        >
                            ReviewAI
                        </motion.h1>
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 to-transparent z-20" />
                    </div>
                </div>
            </AuroraBackground>

            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-900">
                <p>© {new Date().getFullYear()} ReviewAI. Built with ❤️ by Amin Tai.</p>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
