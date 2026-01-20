"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Wand2, Copy, Sparkles, Check, RefreshCw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToneSelector from '../ui/ToneSelector';
import { ReviewTone } from '@/lib/ai-prompt';
import Link from 'next/link';


const USAGE_LIMIT = 3;


export default function LiveDemo() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [usageCount, setUsageCount] = useState(0);
    const [limitReached, setLimitReached] = useState(false);

    // Form State
    const [review, setReview] = useState("The food was amazing but the service was a bit slow. Deeply disappointed in the wait time.");
    const [selectedTone, setSelectedTone] = useState<ReviewTone>('professional');
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('Restaurant');
    const [location, setLocation] = useState('');
    const [productService, setProductService] = useState('');
    const [instructions, setInstructions] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('demo_usage_count');
        if (stored) {
            const count = parseInt(stored, 10);
            setUsageCount(count);
            if (count >= USAGE_LIMIT) {
                setLimitReached(true);
            }
        }
    }, []);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const generateResponse = async () => {
        if (usageCount >= USAGE_LIMIT) {
            setLimitReached(true);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/demo/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    reviewText: review,
                    businessName,
                    businessType,
                    tone: selectedTone,
                    location,
                    productService,
                    instructions
                })
            });

            const data = await response.json();

            if (data.response) {
                setResult(data.response);
                const newCount = usageCount + 1;
                setUsageCount(newCount);
                localStorage.setItem('demo_usage_count', newCount.toString());
                if (newCount >= USAGE_LIMIT) {
                    setLimitReached(true);
                }
            }
        } catch (error) {
            console.error("Failed to generate", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <section id="demo" className="py-24 bg-gradient-to-b from-slate-50 to-white">

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                        ✨ Try It Free
                    </span>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                        Generate Your First Reply
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Paste any review, customize your response style, and get a human-like reply in seconds.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Input Panel */}
                    <Card className="p-0 border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        <div className="p-8 space-y-6">

                            {/* Business Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Business Type</label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                >
                                    <option>Restaurant</option>
                                    <option>Cafe</option>
                                    <option>Retail Store</option>
                                    <option>Salon / Spa</option>
                                    <option>Hotel</option>
                                    <option>Service Provider</option>
                                    <option>Medical Clinic</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* New Fields Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="e.g. NYC"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                                        value={productService}
                                        onChange={(e) => setProductService(e.target.value)}
                                        placeholder="e.g. Coffee"
                                    />
                                </div>
                            </div>


                            {/* Review Text */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Review</label>
                                <textarea
                                    className="w-full p-4 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-32 resize-none text-sm leading-relaxed bg-gray-50/50"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Paste the customer review here..."
                                />
                            </div>

                            {/* Tone Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Response Tone</label>
                                <ToneSelector
                                    value={selectedTone}
                                    onChange={(t) => setSelectedTone(t)}
                                />
                            </div>

                            {/* Optional Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name <span className="text-gray-400 font-normal">(optional)</span></label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        placeholder="e.g., Bella's Cafe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instructions <span className="text-gray-400 font-normal">(optional)</span></label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        placeholder="e.g., Offer refund"
                                    />
                                </div>
                            </div>


                            {/* Conversion / Button Section */}
                            {limitReached ? (
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-center text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10">
                                        <Lock className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                                        <h3 className="text-lg font-bold mb-2">Free Trial Limit Reached</h3>
                                        <p className="text-gray-300 text-sm mb-4">You&apos;ve used all 3 free generations. Create a free account to continue and unlock all features.</p>
                                        <Link href="/login">
                                            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold cursor-pointer">
                                                Sign Up Free
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-center mb-2 px-1">
                                        <span className="text-xs font-medium text-gray-500">Free Uses Remaining</span>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                            {USAGE_LIMIT - usageCount} / {USAGE_LIMIT}
                                        </span>
                                    </div>
                                    <Button
                                        onClick={generateResponse}
                                        disabled={loading || !review.trim()}
                                        className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg shadow-blue-200 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="h-5 w-5 mr-2" />
                                                Generate AI Response
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-xs text-center text-gray-400 mt-2">No signup required • 100% free demo</p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Output Panel */}
                    <div className="lg:sticky lg:top-8">
                        <AnimatePresence mode="wait">
                            {!result ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl bg-white/50 p-10"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-30"></div>
                                        <Sparkles className="relative h-16 w-16 text-blue-400 mb-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Response Will Appear Here</h3>
                                    <p className="text-gray-400 text-center max-w-sm">Fill out the form and click generate to see the magic happen</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                                >
                                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <Check className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800">AI-Generated Response</h3>
                                                <p className="text-xs text-gray-500">
                                                    {selectedTone === 'professional' ? '👔' : selectedTone === 'friendly' ? '👋' : selectedTone === 'empathetic' ? '❤️' : '😄'} {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)} Tone
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleCopy}
                                            className={`gap-2 transition-all ${copied ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                                        >
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </div>
                                    <div className="p-8">
                                        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{result}</p>
                                    </div>
                                    <div className="px-8 pb-8">
                                        <Button
                                            variant="ghost"
                                            onClick={() => { setResult(null); }}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Generate Another
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

