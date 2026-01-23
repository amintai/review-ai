"use client";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";

export default function HeroSection() {
    return (
        <HeroHighlight containerClassName="h-auto md:h-auto py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-800 mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                    Now with Multi-Platform Support
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6"
                >
                    Reply to Every Review in 30 Seconds <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                        Without Sounding Like a Robot
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                >
                    Generate authentic, human-sounding responses to customer reviews in seconds. Works across Google, Yelp, Facebook, and TripAdvisor.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/login">
                        <Button size="lg" className="bg-black text-white hover:bg-black/80 hover:text-white h-12 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
                            Generate Your First Reply Free <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="#demo">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-xl bg-white/50 backdrop-blur-sm cursor-pointer">
                            See How It Works
                        </Button>
                    </Link>
                </motion.div>

                {/* Featured On Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex flex-wrap justify-center items-center gap-8"
                >
                    <a href="https://launchigniter.com/product/reviewai?ref=badge-reviewai" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://launchigniter.com/api/badge/reviewai?theme=light"
                            alt="Featured on LaunchIgniter"
                            width="212"
                            height="55"
                            className="hover:opacity-90 transition-opacity"
                        />
                    </a>

                    <a href="https://open-launch.com/projects/reviewai" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://open-launch.com/api/badge/8734867b-adb4-4df6-bb71-065e0a05678c/featured-light.svg"
                            alt="Featured on Open-Launch"
                            width="200"
                            height="50"
                            className="hover:opacity-90 transition-opacity"
                        />
                    </a>

                    <a href="https://turbo0.com/item/reviewai" target="_blank" rel="noopener noreferrer">
                        <img
                            src="https://img.turbo0.com/badge-listed-light.svg"
                            alt="Listed on Turbo0"
                            width="180"
                            height="54"
                            className="hover:opacity-90 transition-opacity"
                        />
                    </a>
                </motion.div>


                {/* Social Proof / Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500"
                >
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-2xl text-gray-900">10h+</span>
                        <span className="text-sm">Saved Weekly</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-2xl text-gray-900">300%</span>
                        <span className="text-sm">Response Rate</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-2xl text-gray-900">100%</span>
                        <span className="text-sm">Human-Sounding</span>
                    </div>
                </motion.div>
            </div>
        </HeroHighlight>
    );
}
