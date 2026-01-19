"use client";

import { motion } from "framer-motion";
import { ReviewTone } from "@/lib/ai-prompt";
import { cn } from "@/lib/utils";
import { Briefcase, Heart, Smile, Sparkles } from "lucide-react";

interface ToneOption {
    id: ReviewTone;
    label: string;
    icon: React.ReactNode;
    description: string;
    emoji: string;
}

const TONES: ToneOption[] = [
    {
        id: 'professional',
        label: 'Professional',
        icon: <Briefcase className="h-4 w-4" />,
        emoji: '👔',
        description: 'Formal & business-like'
    },
    {
        id: 'friendly',
        label: 'Friendly',
        icon: <Smile className="h-4 w-4" />,
        emoji: '👋',
        description: 'Casual & warm'
    },
    {
        id: 'empathetic',
        label: 'Empathetic',
        icon: <Heart className="h-4 w-4" />,
        emoji: '❤️',
        description: 'Understanding & caring'
    },
    {
        id: 'witty',
        label: 'Witty',
        icon: <Sparkles className="h-4 w-4" />,
        emoji: '😄',
        description: 'Clever & humorous'
    },
];

interface ToneSelectorProps {
    value: ReviewTone;
    onChange: (tone: ReviewTone) => void;
    variant?: 'compact' | 'full';
    className?: string;
}

export default function ToneSelector({ value, onChange, variant = 'full', className }: ToneSelectorProps) {
    if (variant === 'compact') {
        return (
            <div className={cn(" flex bg-gray-100/80 p-1 rounded-xl space-x-1", className)}>
                {TONES.map((tone) => (
                    <button
                        key={tone.id}
                        type="button"
                        onClick={() => onChange(tone.id)}
                        className={cn(
                            "relative flex-1 py-2 text-xs font-bold rounded-lg capitalize transition-all z-10",
                            value === tone.id ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {value === tone.id && (
                            <motion.div
                                layoutId="active-tone-compact"
                                className="absolute inset-0 bg-white rounded-lg shadow-sm z-[-1]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                        )}
                        <span className="cursor-pointer hidden sm:inline">{tone.label}</span>
                        <span className="sm:hidden">{tone.emoji}</span>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={cn("grid grid-cols-2 gap-3", className)}>
            {TONES.map((tone) => (
                <button
                    key={tone.id}
                    type="button"
                    onClick={() => onChange(tone.id)}
                    className={cn(
                        "relative p-4 rounded-2xl border-2 text-left transition-all overflow-hidden group",
                        value === tone.id
                            ? "border-blue-500 bg-blue-50/50 shadow-md translate-y-[-2px]"
                            : "border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/50"
                    )}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                            "text-xl transition-transform group-hover:scale-110",
                            value === tone.id ? "scale-110" : ""
                        )}>
                            {tone.emoji}
                        </span>
                        <span className={cn(
                            "font-bold transition-colors",
                            value === tone.id ? "text-blue-700" : "text-gray-800"
                        )}>
                            {tone.label}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-tight">
                        {tone.description}
                    </p>

                    {value === tone.id && (
                        <motion.div
                            layoutId="active-indicator"
                            className="absolute bottom-0 left-0 h-1 w-full bg-blue-500"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
