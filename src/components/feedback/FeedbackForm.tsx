'use client';

import { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

const CATEGORIES = [
    'Analysis Accuracy',
    'UI/UX Design',
    'Feature Request',
    'Bug Report',
    'Other'
];

export default function FeedbackForm({ onSuccess }: { onSuccess: () => void }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please select a star rating');
            return;
        }

        setIsSubmitting(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();

            const { error } = await supabase
                .from('feedback')
                .insert([
                    {
                        user_id: session?.user?.id || null,
                        rating,
                        category,
                        comment,
                        metadata: {
                            url: window.location.href,
                            userAgent: navigator.userAgent
                        }
                    }
                ]);

            if (error) throw error;

            toast.success('Thank you for your feedback!');
            onSuccess();
        } catch (err) {
            console.error('Feedback error:', err);
            toast.error('Failed to send feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-secondary">How was your experience?</p>
                <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="p-1 transition-transform hover:scale-110"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <Star
                                size={32}
                                className={`transition-colors duration-200 ${(hoverRating || rating) >= star
                                    ? 'text-primary fill-primary'
                                    : 'text-border'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                        Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setCategory(cat)}
                                className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-all ${category === cat
                                    ? 'bg-primary/10 text-primary ring-1 ring-primary/50'
                                    : 'bg-card text-secondary border border-border hover:bg-black/[0.02]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pl-1">
                        Message
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what's on your mind..."
                        rows={4}
                        className="w-full px-4 py-3 bg-[#F9F8F6] border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder:text-muted-foreground/60"
                        required
                    />
                </div>
            </div>

            <Button
                type="submit"
                className="w-full h-12 cursor-pointer rounded-xl font-bold bg-primary hover:bg-[#E85A25] shadow-[0_8px_30px_rgba(255,107,53,0.30)]"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Loader2 className="animate-spin mr-2" />
                ) : (
                    <Send size={18} className="mr-2" />
                )}
                Submit Feedback
            </Button>
        </form>
    );
}
