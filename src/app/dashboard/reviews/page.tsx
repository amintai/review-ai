"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import GoogleConnect from '@/components/google-connect';
import LocationSelector from '@/components/dashboard/LocationSelector';
import ReplyModal from '@/components/reply-modal';
import { Star, MessageSquare, CheckCircle2, ShieldCheck, Settings2, RefreshCcw, Loader2, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function ReviewsPage() {
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [needsLocation, setNeedsLocation] = useState(false);
    const [isPro, setIsPro] = useState(false);
    const [reviews, setReviews] = useState<any[]>([]);
    const [location, setLocation] = useState<any>(null);
    const [selectedReview, setSelectedReview] = useState<any>(null);

    const fetchStatus = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/google/reviews');
            const data = await res.json();

            if (data.connected) {
                setConnected(true);
                setIsPro(data.is_pro);
                if (data.needsLocation) {
                    setNeedsLocation(true);
                } else {
                    setNeedsLocation(false);
                    setReviews(data.reviews || []);
                    setLocation(data.location);
                }
            } else {
                setConnected(false);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();

        // Auto-refresh logic when redirected from connection
        const params = new URLSearchParams(window.location.search);
        if (params.get('connected') === 'true') {
            // Success is already handled by fetchStatus checking DB
        }
        if (params.get('error')) {
            const err = params.get('error');
            if (err === 'NO_BUSINESS_ACCOUNT') {
                alert("We couldn't find a Google Business account linked to this email. Please ensure you are managing a business profile.");
            }
        }
    }, []);

    const handleLocationSelect = async (loc: any) => {
        setLoading(true);
        try {
            const res = await fetch('/api/google/locations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locationId: loc.name, locationName: loc.title })
            });

            if (res.ok) {
                fetchStatus();
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating: string) => {
        const map: Record<string, number> = { "FIVE": 5, "FOUR": 4, "THREE": 3, "TWO": 2, "ONE": 1 };
        const num = map[rating] || (typeof rating === 'number' ? rating : 5);
        return (
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < num ? 'fill-current' : 'text-gray-300'}`} />
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reviews Management</h1>
                    <p className="text-gray-500 mt-1">Manage and reply to your Google Business reviews efficiently.</p>
                </div>
                <div className="flex items-center space-x-3">
                    {isPro && (
                        <div className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-blue-100 ring-4 ring-blue-50/50">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Pro Member</span>
                        </div>
                    )}
                    {!loading && connected && !needsLocation && (
                        <button
                            onClick={() => setNeedsLocation(true)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                            title="Change Location"
                        >
                            <Settings2 className="h-5 w-5" />
                        </button>
                    )}
                    {!loading && <GoogleConnect isConnected={connected} />}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
                    <p className="text-gray-500 font-medium">Synchronizing your reviews...</p>
                </div>
            ) : !connected ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center space-y-6">
                    <div className="mx-auto w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="h-10 w-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">Connect to Google Business</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">
                            Integrate your profile to start fetching reviews and generating AI-powered responses.
                        </p>
                    </div>
                    <div className="pt-2">
                        <GoogleConnect isConnected={false} />
                    </div>
                </div>
            ) : needsLocation ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
                    <div className="flex items-center space-x-3 text-blue-600">
                        <CheckCircle2 className="h-6 w-6" />
                        <h2 className="text-xl font-bold">Step 2: Verify Your Business Location</h2>
                    </div>
                    <p className="text-gray-600">We found the following locations associated with your Google account. Select one to proceed.</p>
                    <LocationSelector
                        onSelect={handleLocationSelect}
                        currentLocationId={location?.name}
                    />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Location Info Card */}
                    {location && (
                        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Business</div>
                                    <div className="font-bold text-gray-900">{location.title}</div>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center space-x-2 text-green-600 text-sm font-medium">
                                <CheckCircle2 className="h-4 w-4" />
                                <span>Verified Connection</span>
                            </div>
                        </div>
                    )}

                    {reviews.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">No reviews yet</h3>
                            <p className="text-gray-500">When you receive reviews on Google, they will appear here automatically.</p>
                            <button onClick={fetchStatus} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold pt-2">
                                <RefreshCcw className="h-4 w-4 mr-2" /> Refresh sync
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {reviews.map((review) => (
                                <div key={review.reviewId} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                        <div className="flex items-center space-x-4">
                                            {review.reviewer.profilePhotoUrl ? (
                                                <img src={review.reviewer.profilePhotoUrl} alt="" className="h-12 w-12 rounded-full ring-2 ring-gray-50" />
                                            ) : (
                                                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold uppercase ring-2 ring-blue-50">
                                                    {review.reviewer.displayName.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-gray-900">{review.reviewer.displayName}</div>
                                                <div className="text-xs font-medium text-gray-500">
                                                    {review.createTime ? format(new Date(review.createTime), 'PP') : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {renderStars(review.starRating)}
                                            {review.starRating === 'FIVE' && (
                                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Top Rated</span>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-6">
                                        {review.comment || <span className="text-gray-400 italic font-normal">No written comment provided.</span>}
                                    </p>

                                    <div className="pt-4 border-t border-gray-50">
                                        {review.reviewReply ? (
                                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center">
                                                        <ShieldCheck className="h-3 w-3 mr-1" /> Verified Reply
                                                    </span>
                                                    <span className="text-[10px] text-blue-400 font-medium">{format(new Date(review.reviewReply.updateTime || new Date()), 'PP')}</span>
                                                </div>
                                                <p className="text-sm text-gray-800 leading-relaxed">{review.reviewReply.comment}</p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedReview(review)}
                                                className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-blue-200"
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                                <span>AI Response Helper</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {selectedReview && (
                <ReplyModal
                    review={selectedReview}
                    businessName={location?.title || "My Business"}
                    onClose={() => setSelectedReview(null)}
                    onSuccess={() => {
                        fetchStatus(); // Refresh list to show new reply
                    }}
                />
            )}
        </div>
    );
}
