"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Copy, RefreshCw, Wand2, Check, MessageSquareList, Terminal, ChevronRight } from 'lucide-react';
import { ReviewTone } from '@/lib/ai-prompt';
import ToneSelector from './ui/ToneSelector';

export default function ReviewForm() {
    const [reviewText, setReviewText] = useState('');
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
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
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
            <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Business Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g. Joe's Coffee"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Business Type</label>
                        <select
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Location</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. New York, NY"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Product/Service</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            value={productService}
                            onChange={(e) => setProductService(e.target.value)}
                            placeholder="e.g. Latte, Consulting"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Review Content</label>
                    <textarea
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                        placeholder="Paste the customer review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Brand Tone</label>
                        <ToneSelector
                            variant="compact"
                            value={tone}
                            onChange={(t) => setTone(t)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Custom Instructions</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            placeholder="e.g. Invite them back for brunch"
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
                                            className="text-gray-400 hover:text-blue-600 transition-all p-2 rounded-xl hover:bg-blue-50 active:scale-90"
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
