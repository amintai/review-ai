"use client";

import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Wand2, Copy, Sparkles, Star, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToneSelector from '../ui/ToneSelector';
import { ReviewTone } from '@/lib/ai-prompt';

// Simple math CAPTCHA for bot prevention
const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { question: `${a} + ${b} = ?`, answer: a + b };
};

const platforms = [
    { id: 'google', label: 'Google', color: 'bg-red-50 text-red-600 border-red-100' },
    { id: 'yelp', label: 'Yelp', color: 'bg-red-50 text-red-700 border-red-100' },
    { id: 'facebook', label: 'Facebook', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'tripadvisor', label: 'TripAdvisor', color: 'bg-green-50 text-green-600 border-green-100' },
];

export default function LiveDemo() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Form State
    const [review, setReview] = useState("The food was amazing but the service was a bit slow. Deeply disappointed in the wait time.");
    const [starRating, setStarRating] = useState(3);
    const [selectedTone, setSelectedTone] = useState<ReviewTone>('professional');
    const [selectedPlatform, setSelectedPlatform] = useState('google');
    const [businessName, setBusinessName] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    // CAPTCHA State
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaError, setCaptchaError] = useState(false);

    const refreshCaptcha = useCallback(() => {
        setCaptcha(generateCaptcha());
        setCaptchaInput('');
        setCaptchaError(false);
    }, []);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const generateResponse = () => {
        // Validate CAPTCHA
        if (parseInt(captchaInput) !== captcha.answer) {
            setCaptchaError(true);
            return;
        }
        setCaptchaError(false);

        setLoading(true);
        // Simulate AI generation with context
        setTimeout(() => {
            const toneResponses: Record<ReviewTone, string> = {
                professional: `Thank you for taking the time to share your feedback${businessName ? ` about ${businessName}` : ''}. We're pleased to hear you enjoyed the food quality. We sincerely apologize for the wait time you experienced – this falls below our standards. ${additionalInfo ? `${additionalInfo} ` : ''}We've addressed this with our service team and are implementing measures to ensure faster service. We value your patronage and hope to welcome you back soon.`,
                friendly: `Hey there! Thanks so much for the review! 🙌 We're thrilled you loved the food${businessName ? ` at ${businessName}` : ''}! 😋 Super sorry about the wait though – totally get how frustrating that is! ${additionalInfo ? `${additionalInfo} ` : ''}We're working hard to speed things up. Hope to see you again soon! 💙`,
                empathetic: `We truly appreciate you sharing your experience with us${businessName ? ` at ${businessName}` : ''}. It means so much to hear you enjoyed the food, but we completely understand your frustration with the wait time. Your feelings are valid, and we're sorry we let you down on the service front. ${additionalInfo ? `${additionalInfo} ` : ''}Please know we're taking this seriously and working to make things right.`,
                witty: `Thanks for keeping it real! 📝 Glad our food passed the taste test${businessName ? ` at ${businessName}` : ''} – our chef's ego needed that boost! 😄 As for the wait... let's just say we're training our team to move faster than a caffeinated cheetah. ${additionalInfo ? `${additionalInfo} ` : ''}Come back soon – we promise less waiting, more eating! 🍕`
            };
            setResult(toneResponses[selectedTone] || toneResponses.professional);
            setLoading(false);
            refreshCaptcha(); // Reset CAPTCHA after successful generation
        }, 1800);
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

                            {/* Platform Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Platform</label>
                                <div className="flex flex-wrap gap-2">
                                    {platforms.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setSelectedPlatform(p.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedPlatform === p.id
                                                ? `${p.color} ring-2 ring-offset-1 ring-blue-400`
                                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                                }`}
                                        >
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Review Star Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setStarRating(star)}
                                            className="p-1 transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`h-8 w-8 ${star <= starRating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-3 text-sm text-gray-500 self-center">
                                        {starRating === 1 && 'Very Negative'}
                                        {starRating === 2 && 'Negative'}
                                        {starRating === 3 && 'Neutral'}
                                        {starRating === 4 && 'Positive'}
                                        {starRating === 5 && 'Very Positive'}
                                    </span>
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Extra Context <span className="text-gray-400 font-normal">(optional)</span></label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50/50"
                                        value={additionalInfo}
                                        onChange={(e) => setAdditionalInfo(e.target.value)}
                                        placeholder="e.g., We now offer reservations"
                                    />
                                </div>
                            </div>

                            {/* CAPTCHA */}
                            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-semibold text-gray-700">Quick Verification</label>
                                    <button onClick={refreshCaptcha} className="text-gray-400 hover:text-gray-600 p-1">
                                        <RefreshCw className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-mono bg-white px-4 py-2 rounded-lg border border-gray-200 text-gray-800">
                                        {captcha.question}
                                    </span>
                                    <input
                                        type="text"
                                        className={`w-20 p-2 border rounded-lg text-center font-mono text-lg outline-none focus:ring-2 ${captchaError
                                            ? 'border-red-400 bg-red-50 focus:ring-red-300'
                                            : 'border-gray-200 focus:ring-blue-500'
                                            }`}
                                        value={captchaInput}
                                        onChange={(e) => {
                                            setCaptchaInput(e.target.value);
                                            setCaptchaError(false);
                                        }}
                                        placeholder="?"
                                    />
                                    {captchaError && <span className="text-red-500 text-sm">Incorrect</span>}
                                </div>
                            </div>

                            {/* Generate Button */}
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
                            <p className="text-xs text-center text-gray-400">No signup required • 100% free demo</p>
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
                                                    {selectedTone === 'professional' ? '👔' : selectedTone === 'friendly' ? '👋' : selectedTone === 'empathetic' ? '❤️' : '😄'} {selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1)} Tone • {platforms.find(p => p.id === selectedPlatform)?.label}
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
                                        <p className="text-gray-700 leading-relaxed text-lg">{result}</p>
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
