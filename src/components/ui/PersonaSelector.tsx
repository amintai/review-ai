"use client";

import { PERSONA_LIST, type PersonaId, type Persona } from "@/lib/personas";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaSelectorProps {
    /** Currently active persona, or null if none selected */
    value: PersonaId | null;
    /** Whether the current user is Pro */
    isPro: boolean;
    /** Called when user selects a persona chip (Pro only) */
    onChange?: (id: PersonaId | null) => void;
    /** Called when a Free user clicks a chip (show upgrade gate) */
    onUpgradeRequired?: () => void;
    /** Optional override class for the outer container */
    className?: string;
    /** If true, renders a compact row (no label, smaller chips) */
    compact?: boolean;
}

export default function PersonaSelector({
    value,
    isPro,
    onChange,
    onUpgradeRequired,
    className,
    compact = false,
}: PersonaSelectorProps) {
    const handleClick = (persona: Persona) => {
        if (!isPro) {
            onUpgradeRequired?.();
            return;
        }
        // Toggle off if already selected
        if (value === persona.id) {
            onChange?.(null);
        } else {
            onChange?.(persona.id);
        }
    };

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {!compact && (
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Buyer Profile
                    </span>
                    {!isPro && (
                        <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-200 rounded-md px-1.5 py-0.5 font-bold">
                            Pro
                        </span>
                    )}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {PERSONA_LIST.map((persona) => {
                    const Icon = persona.icon;
                    const isSelected = value === persona.id;
                    const isDisabled = !isPro;

                    return (
                        <button
                            key={persona.id}
                            type="button"
                            onClick={() => handleClick(persona)}
                            title={isDisabled ? `${persona.label} — Upgrade to Pro` : persona.description}
                            className={cn(
                                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                                compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
                                isSelected
                                    ? "text-white shadow-sm"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300",
                                isDisabled && !isSelected
                                    ? "opacity-60 cursor-not-allowed hover:border-gray-200"
                                    : "cursor-pointer",
                            )}
                            style={isSelected ? { backgroundColor: persona.color, borderColor: persona.color } : {}}
                        >
                            <Icon size={compact ? 11 : 13} />
                            {persona.label}
                            {isDisabled && (
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-50">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            )}
                        </button>
                    );
                })}

                {/* Settings shortcut when a persona is active */}
                {isPro && value && (
                    <button
                        type="button"
                        title="Change default buyer profile in Settings"
                        onClick={() => onChange?.(null)}
                        className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <Settings size={11} />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
