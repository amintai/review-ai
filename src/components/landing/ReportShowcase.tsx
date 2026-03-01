"use client";

import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VERDICT_CONFIG = {
    BUY: {
        color: '#10B981',
        bg: '#ECFDF5',
        border: '#A7F3D0',
        lightBg: '#F0FDF9',
        label: 'Green light',
        icon: TrendingUp,
        tagline: 'Strong buy signal across review patterns',
    }
};

function ScoreRing({
    value,
    label,
    color,
    size = 70,
    delay = 0,
}: {
    value: number;
    label: string;
    color: string;
    size?: number;
    delay?: number;
}) {
    const r = 42;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay }}
            className="flex flex-col items-center gap-1"
        >
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    className="-rotate-90"
                >
                    <circle cx="50" cy="50" r={r} fill="none" stroke="#EBEBF0" strokeWidth="7" />
                    <motion.circle
                        cx="50" cy="50" r={r}
                        fill="none"
                        stroke={color}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
                        style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-[Syne] font-black leading-none text-gray-900" style={{ fontSize: size * 0.26 }}>
                        {value}
                    </span>
                    <span className="text-[7px] uppercase tracking-widest text-gray-400 font-semibold mt-0.5">
                        /100
                    </span>
                </div>
            </div>
            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">
                {label}
            </span>
        </motion.div>
    );
}

export default function ReportShowcase() {
    const vc = VERDICT_CONFIG.BUY;
    const VerdictIcon = vc.icon;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
    };

    return (
        <motion.div
            className="w-full h-full bg-[#F7F6F3] overflow-y-auto no-scrollbar relative pointer-events-none select-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="p-4 sm:p-5 md:p-6 space-y-4">

                {/* Header Mockup */}
                <motion.div variants={itemVariants} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <h2 className="font-[Syne] font-bold text-sm sm:text-base text-gray-900 leading-tight mb-2 line-clamp-2">
                        Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones, Silver
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge
                            className="px-2 py-0.5 gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border font-[Syne]"
                            style={{ backgroundColor: vc.bg, color: vc.color, borderColor: vc.border }}
                        >
                            <VerdictIcon className="w-3 h-3" />
                            BUY
                        </Badge>
                        <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                            B09ZNXJFX1
                        </span>
                    </div>
                </motion.div>

                {/* Verdict Section */}
                <motion.div
                    variants={itemVariants}
                    className="rounded-xl border overflow-hidden shadow-sm"
                    style={{ backgroundColor: vc.lightBg, borderColor: vc.border, borderLeft: `3px solid ${vc.color}` }}
                >
                    <div className="p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${vc.color}15` }}
                                >
                                    <VerdictIcon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: vc.color }} />
                                </div>
                                <div>
                                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                                        AI Verdict
                                    </div>
                                    <div className="font-[Syne] font-black text-2xl sm:text-3xl leading-none" style={{ color: vc.color }}>
                                        BUY
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-medium text-gray-500 mt-1 line-clamp-1">
                                        {vc.tagline}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-6 pr-2">
                                <ScoreRing value={94} label="Trust" color="#06B6D4" size={55} delay={0.6} />
                                <ScoreRing value={88} label="Confidence" color="#FF6B35" size={55} delay={0.8} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Grid Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-8">

                    {/* Perfect For */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-3 h-3 text-emerald-500" />
                            </div>
                            <h3 className="font-[Syne] font-bold text-sm text-gray-900">Perfect For</h3>
                        </div>
                        <ul className="space-y-2">
                            {["Frequent flyers needing top-tier ANC", "Audiophiles working in open offices", "Comfort-focused users"].map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-600">
                                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                    <span className="leading-snug">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Deal Breakers */}
                    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-3 h-3 text-amber-500" />
                            </div>
                            <h3 className="font-[Syne] font-bold text-sm text-gray-900">Deal Breakers</h3>
                        </div>
                        <div className="space-y-2">
                            {["Cannot fold down compactly in bags", "Not sweat-resistant for gym use"].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-600 bg-amber-50/50 rounded-lg p-2 border border-amber-100/50">
                                    <span className="text-amber-500 font-bold mt-0.5 text-[9px]">!</span>
                                    <span className="leading-snug">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* Fade Out Gradient at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F7F6F3] to-transparent pointer-events-none z-10" />
        </motion.div>
    );
}
