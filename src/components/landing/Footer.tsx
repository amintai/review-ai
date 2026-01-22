"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Link from 'next/link';
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import Logo from "@/components/ui/Logo";

export default function Footer() {
    return (
        <AuroraBackground>
            <motion.footer
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4 w-full h-full"
            >
                {/* Final CTA Section */}
                <div className="text-center mb-16 max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold dark:text-white text-black mb-6">
                        Ready to save hours every week?
                    </h2>
                    <p className="font-light text-base md:text-xl dark:text-neutral-200 text-neutral-600 mb-8">
                        Join 500+ small businesses using ReviewAI to grow their reputation.
                    </p>
                    <Link
                        href="/login"
                        className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-8 py-3 font-medium transition-transform hover:scale-105"
                    >
                        Get Started for Free
                    </Link>
                </div>

                {/* Footer Grid */}
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8 px-6 pb-20 pt-10 border-t border-neutral-200 dark:border-neutral-700">
                    {/* Brand / About */}
                    <div className="flex flex-col gap-4">
                        <Logo size="md" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Automate your reputation management with AI-powered review responses.
                        </p>
                        <div className="mt-4">
                            <h4 className="font-semibold text-sm mb-2 dark:text-white">Built by</h4>
                            <Link href="https://x.com/aminnnn_09" target="_blank" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                                Amin Tai
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg dark:text-white">Product</h3>
                        <div className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Link href="/#features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link>
                            <Link href="/pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
                            <Link href="/blog" className="hover:text-black dark:hover:text-white transition-colors">Blog</Link>
                            <Link href="/login" className="hover:text-black dark:hover:text-white transition-colors">Login</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg dark:text-white">Legal</h3>
                        <div className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/faq" className="hover:text-black dark:hover:text-white transition-colors">FAQ</Link>
                        </div>
                    </div>

                    {/* Contact - New Column for Local SEO */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg dark:text-white">Contact</h3>
                        <div className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <p>Arena Arcade<br />Mumbai, Maharashtra 400001</p>
                            <Link href="tel:+918141759119" className="hover:text-black dark:hover:text-white transition-colors">+91 8141759119</Link>
                            <Link href="mailto:support@reviewai.pro" className="hover:text-black dark:hover:text-white transition-colors">support@reviewai.pro</Link>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg dark:text-white">Socials</h3>
                        <div className="flex gap-4">
                            <Link href="https://x.com/aminnnn_09" target="_blank" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:scale-110 transition-transform">
                                <Twitter className="w-5 h-5 text-neutral-600 dark:text-white" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/amintai" target="_blank" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:scale-110 transition-transform">
                                <Linkedin className="w-5 h-5 text-neutral-600 dark:text-white" />
                            </Link>
                            <Link href="https://instagram.com/aminnn_09" target="_blank" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:scale-110 transition-transform">
                                <Instagram className="w-5 h-5 text-neutral-600 dark:text-white" />
                            </Link>
                            <Link href="https://facebook.com/aminnnn_09" target="_blank" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:scale-110 transition-transform">
                                <Facebook className="w-5 h-5 text-neutral-600 dark:text-white" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="text-center text-xs text-neutral-500 pb-4">
                    © {new Date().getFullYear()} ReviewAI. All rights reserved.
                </div>
            </motion.footer>
        </AuroraBackground>
    );
}
