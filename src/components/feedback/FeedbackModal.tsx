'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquareHeart } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                    >
                        {/* Header Image/Pattern */}
                        <div className="h-32 bg-gradient-to-br from-primary via-orange-400 to-sky-500 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="relative w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white shadow-xl">
                                <MessageSquareHeart size={32} />
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute cursor-pointer top-4 right-4 p-2 rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-2xl font-syne font-bold text-foreground mb-1">We value your input</h3>
                                <p className="text-sm text-secondary">Help us make ReviewAI better for everyone.</p>
                            </div>

                            <FeedbackForm onSuccess={onClose} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
