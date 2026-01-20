"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Copy, RefreshCw, Wand2, Check, ChevronDown } from 'lucide-react';
import { ReviewTone } from '@/lib/ai-prompt';
import ToneSelector from './ui/ToneSelector';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewForm() {
    const [reviewText, setReviewText] = useState('');

    // Collapsed state for business details
    const [showDetails, setShowDetails] = useState(false);

    // Business Details (Persisted)
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('Restaurant');
    const [location, setLocation] = useState('');
    const [productService, setProductService] = useState('');

    const [tone, setTone] = useState<ReviewTone>('professional');
    const [instructions, setInstructions] = useState('');

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // Load saved business details on mount
    useEffect(() => {
        const saved = localStorage.getItem('reviewai_business_context');
        if (saved) {
            const data = JSON.parse(saved);
            setBusinessName(data.name || '');
            setBusinessType(data.type || 'Restaurant');
            setLocation(data.location || '');
            setProductService(data.product || '');
            setShowDetails(false); // Returing user: Keep it clean
        } else {
            setShowDetails(true); // New user: Show fields to fill
        }
    }, []);

    // Save details when they change
    useEffect(() => {
        if (businessName) {
            localStorage.setItem('reviewai_business_context', JSON.stringify({
                name: businessName,
                type: businessType,
                location,
                product: productService
            }));
        }
    }, [businessName, businessType, location, productService]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResults(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                throw new Error('You must be logged in to generate reviews');
            }

            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    reviewText,
                    businessName,
                    businessType,
                    tone,
                    location,
                    productService,
                    instructions
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (errorData.limitReached) {
                    setError('limit');
                } else {
                    throw new Error(errorData.error || 'Failed to generate response');
                }
                return;
            }

            const data = await res.json();
            setResults(data);
            toast.success("✨ Reviews generated successfully!");
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            toast.error(err.message || "Failed to generate reviews");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Input Section */}
            {/* Main Form Area */}
            <form onSubmit={handleGenerate} className="space-y-6">

                {/* 1. The Core Input: Review */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-300">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                        Paste the Customer Review
                    </label>
                    <textarea
                        required
                        rows={4}
                        className="w-full px-0 bg-transparent border-0 outline-none text-gray-800 placeholder:text-gray-400 text-lg resize-none font-medium leading-relaxed"
                        placeholder="&quot;Great service, but the coffee was cold...&quot;"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </div>

                {/* 2. Business Context (Collapsible) */}
                <div className="bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full flex items-center justify-between p-4 px-6 hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="bg-gray-200 text-gray-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">2</span>
                            <span className="font-bold text-gray-700 text-sm uppercase tracking-wide">Business Context</span>
                            {!showDetails && businessName && (
                                <span className="ml-2 text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                                    {businessName}
                                </span>
                            )}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-6 pb-6 border-t border-gray-100"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Business Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 text-sm font-medium"
                                            value={businessName}
                                            onChange={(e) => setBusinessName(e.target.value)}
                                            placeholder="Joe's Coffee"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Type</label>
                                        <select
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all cursor-pointer text-sm font-medium"
                                            value={businessType}
                                            onChange={(e) => setBusinessType(e.target.value)}
                                        >
                                            {['Restaurant', 'Cafe', 'Retail Store', 'Salon / Spa', 'Hotel', 'Service Provider', 'Medical Clinic', 'Other'].map(t => (
                                                <option key={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Location <span className="text-gray-300 font-normal">(Optional)</span></label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 text-sm font-medium"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="e.g. Surat, Gujarat"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Key Product <span className="text-gray-300 font-normal">(Optional)</span></label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-300 text-sm font-medium"
                                            value={productService}
                                            onChange={(e) => setProductService(e.target.value)}
                                            placeholder="e.g. Cold Brew"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>



                <div className="grid grid-cols-1 md:grid-cols gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Brand Tone</label>
                        <ToneSelector
                            variant="compact"
                            value={tone}
                            onChange={(t) => setTone(t)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Custom Instructions <span className="text-gray-400 font-normal lowercase">(optional)</span></label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. Offer a 10% discount on next visit"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !reviewText || !businessName}
                    className="w-full h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 active:scale-[0.98]"
                >
                    {loading ? (
                        <><RefreshCw className="animate-spin mr-3 h-5 w-5" /> Sculpting Response...</>
                    ) : (
                        <><Wand2 className="mr-3 h-5 w-5" /> Generate Suggestions</>
                    )}
                </button>
            </form>

            {/* Error Message */}
            {error && error !== 'limit' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm font-medium">
                    ⚠️ {error}
                </div>
            )}

            {/* Limit Banner */}
            {error === 'limit' && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center shadow-sm">
                    <h3 className="text-xl font-black text-amber-900 mb-2">Free Generations Exhausted</h3>
                    <p className="text-amber-700 mb-6 text-sm">You&apos;ve hit your monthly cap. Upgrade to keep using our precision AI.</p>
                    <button className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-md active:scale-95">
                        Upgrade to Pro
                    </button>
                </div>
            )}

            {/* Suggestions */}
            {results && (
                <div className="space-y-6 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-gray-900">AI Suggested Responses</h2>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full border border-gray-100">3 Alternatives Generated</span>
                    </div>
                    <div className="grid gap-6">
                        {[1, 2, 3].map((num) => {
                            const key = `response_${num}`;
                            const content = results[key];
                            if (!content) return null;

                            const titles = ["Swift & Direct", "Polished & Gracious", "The Relationship Builder"];

                            return (
                                <div key={key} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="bg-blue-50 text-blue-600 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-md border border-blue-100">
                                                {num}
                                            </div>
                                            <span className="text-sm font-bold text-gray-900">{titles[num - 1]}</span>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(content, num)}
                                            className="text-gray-400 hover:text-blue-600 transition-all p-2 rounded-xl hover:bg-blue-50 active:scale-90 cursor-pointer"
                                            title="Copy response"
                                        >
                                            {copiedIndex === num ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium">
                                        {content}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
