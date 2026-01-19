"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Wand2, Send, X, ShieldCheck, History, Bookmark, Sparkles, AlertCircle } from 'lucide-react';
import { ReviewTone } from '@/lib/ai-prompt';

interface ReplyModalProps {
    review: any;
    businessName: string;
    onClose: () => void;
    onSuccess: () => void;
    isPro?: boolean;
}

export default function ReplyModal({ review, businessName, onClose, onSuccess, isPro = true }: ReplyModalProps) {
    const [tone, setTone] = useState<ReviewTone>('professional');
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(false);
    const [publishing, setPublishing] = useState<string | null>(null);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState('');

    const generateResponses = async () => {
        setLoading(true);
        setError('');
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            if (!token) throw new Error("Authentication session expired. Please sign in again.");

            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    reviewText: review.comment || "(No text review)",
                    businessName,
                    businessType: "Business",
                    tone,
                    instructions,
                    location: "Google Business Profile"
                }),
            });

            if (!res.ok) throw new Error("AI generation failed. Please try again later.");
            const data = await res.json();
            setResults(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (responseKey: string, text: string) => {
        setPublishing(responseKey);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const res = await fetch('/api/google/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    reviewName: review.name,
                    replyText: text
                })
            });

            if (!res.ok) throw new Error("Failed to publish reply to Google.");

            onSuccess();
            onClose();
        } catch (e: any) {
            alert(e.message);
            setPublishing(null);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">AI Response Suite</h3>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Review Snippet */}
                    <div className="relative p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-inner">
                        <div className="flex items-center space-x-2 mb-3">
                            <img src={review.reviewer.profilePhotoUrl} alt="" className="h-6 w-6 rounded-full" />
                            <span className="text-sm font-bold text-gray-700">{review.reviewer.displayName} wrote:</span>
                        </div>
                        <p className="text-gray-800 italic leading-relaxed">
                            "{review.comment || (review.starRating + ' Star Rating')}"
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center space-x-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center">
                                Select Response Tone
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['professional', 'friendly', 'empathic', 'witty'] as const).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTone(t as ReviewTone)}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${tone === t
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                                            : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700">Special Instructions</label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none h-[104px]"
                                placeholder="Mention a special discount or a specific team member..."
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                            />
                        </div>
                    </div>

                    {!results && (
                        <button
                            onClick={generateResponses}
                            disabled={loading}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black flex items-center justify-center transition-all hover:scale-[1.01] active:scale-100 disabled:opacity-50 shadow-lg shadow-gray-200"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-3">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    <span>AI is thinking...</span>
                                </div>
                            ) : (
                                <><Wand2 className="mr-2 h-5 w-5" /> Generate Premium Responses</>
                            )}
                        </button>
                    )}

                    {results && (
                        <div className="space-y-6 border-t border-gray-100 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-gray-900 flex items-center">
                                    <Sparkles className="h-4 w-4 mr-2 text-blue-600" />
                                    AI Suggested Options
                                </h4>
                                <div className="flex items-center space-x-4">
                                    <button className="text-xs font-bold text-gray-400 hover:text-blue-600 flex items-center transition-colors group">
                                        <History className="h-3.5 w-3.5 mr-1 group-hover:rotate-[-45deg] transition-transform" /> History
                                    </button>
                                    <button className="text-xs font-bold text-gray-400 hover:text-blue-600 flex items-center transition-colors">
                                        <Bookmark className="h-3.5 w-3.5 mr-1" /> Saves
                                    </button>
                                </div>
                            </div>

                            <div className="grid gap-5">
                                {[1, 2, 3].map(num => {
                                    const key = `response_${num}`;
                                    const text = results[key];
                                    if (!text) return null;

                                    return (
                                        <div key={key} className="relative group p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50/50 transition-all">
                                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button title="Save as template" className="p-1.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-lg border border-gray-100">
                                                    <Bookmark className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Option {num}</div>
                                            <p className="text-sm text-gray-800 leading-relaxed mb-6 whitespace-pre-wrap">{text}</p>
                                            <button
                                                onClick={() => handlePublish(key, text)}
                                                disabled={!!publishing}
                                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl flex items-center justify-center transition-all shadow-md shadow-blue-100"
                                            >
                                                {publishing === key ? <Loader2 className="animate-spin h-4 w-4" /> : <><Send className="mr-2 h-4 w-4" /> Publish to Google Profile</>}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex items-center justify-center space-x-6 py-4">
                                <button onClick={() => setResults(null)} className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                                    Discard and Retake
                                </button>
                                {isPro && (
                                    <span className="flex items-center space-x-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        <span>Pro Unlimited</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
