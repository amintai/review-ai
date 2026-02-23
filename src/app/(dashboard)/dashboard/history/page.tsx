"use client";

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search, History, ChevronLeft, ChevronRight,
    Calendar, ChevronRight as ArrowRight, Layers,
    TrendingUp, TrendingDown, AlertTriangle, X
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { CardSpotlight } from '@/components/ui/card-spotlight';

// ─── Types ────────────────────────────────────────────────────────────────────
type VerdictType = 'BUY' | 'SKIP' | 'CAUTION' | 'PENDING';

const VERDICT_CONFIG: Record<string, {
    bg: string; text: string; border: string; dot: string;
    icon: any; activeBg: string; activeText: string;
}> = {
    BUY: {
        bg: '#ECFDF5', text: '#10B981', border: '#A7F3D0',
        dot: '#10B981', icon: TrendingUp,
        activeBg: '#10B981', activeText: '#fff',
    },
    CAUTION: {
        bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A',
        dot: '#F59E0B', icon: AlertTriangle,
        activeBg: '#F59E0B', activeText: '#fff',
    },
    SKIP: {
        bg: '#FEF2F2', text: '#EF4444', border: '#FECACA',
        dot: '#EF4444', icon: TrendingDown,
        activeBg: '#EF4444', activeText: '#fff',
    },
};

function VerdictBadge({ verdict }: { verdict?: string }) {
    const v = (verdict?.toUpperCase() ?? 'PENDING') as VerdictType;
    const cfg = VERDICT_CONFIG[v];

    if (!cfg) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest bg-gray-50 text-gray-400 border-gray-200">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
                PENDING
            </span>
        );
    }

    const Icon = cfg.icon;
    return (
        <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest font-[Syne]"
            style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.border }}
        >
            <Icon className="w-3 h-3" />
            {v}
        </span>
    );
}

// ─── Score display ─────────────────────────────────────────────────────────────
function TrustScore({ value }: { value?: number }) {
    if (value == null) {
        return (
            <div className="text-right">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Trust</div>
                <div className="w-16 h-5 bg-gray-100 rounded animate-pulse" />
            </div>
        );
    }
    const color = value >= 70 ? '#10B981' : value >= 40 ? '#F59E0B' : '#EF4444';
    return (
        <div className="text-right">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Trust</div>
            <div className="font-[Syne] font-black text-xl leading-none" style={{ color }}>
                {value}<span className="text-xs text-gray-400 font-medium">/100</span>
            </div>
        </div>
    );
}

// ─── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <div className="bg-white rounded-2xl border border-[#EBEBF0] p-5 flex flex-col gap-3 animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-16 h-5 bg-gray-100 rounded-md" />
                <div className="w-24 h-5 bg-gray-100 rounded-md" />
                <div className="w-32 h-4 bg-gray-100 rounded-md ml-auto" />
            </div>
            <div className="w-3/4 h-4 bg-gray-100 rounded" />
            <div className="w-full h-3 bg-gray-50 rounded" />
        </div>
    );
}

// ─── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ hasFilter }: { hasFilter: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-[#EBEBF0] flex items-center justify-center">
                <Layers className="w-7 h-7 text-gray-300" />
            </div>
            <div>
                <h3 className="font-[Syne] font-bold text-gray-900 text-lg mb-1">
                    {hasFilter ? 'No matching reports' : 'No analyses yet'}
                </h3>
                <p className="text-sm text-gray-400 max-w-xs">
                    {hasFilter
                        ? 'Try clearing your search or changing the verdict filter.'
                        : 'Paste an Amazon URL in the dashboard to get your first AI verdict.'}
                </p>
            </div>
            <Link href="/dashboard">
                <Button
                    size="sm"
                    className="bg-[#FF6B35] hover:bg-[#E85A25] text-white font-semibold rounded-xl px-5"
                >
                    Start Analyzing
                </Button>
            </Link>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [verdictFilter, setVerdictFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const response = await fetch(
                `/api/history?page=${page}&limit=${limit}&search=${search}&tone=${verdictFilter}`,
                {
                    headers: {
                        ...(session?.access_token && {
                            'Authorization': `Bearer ${session.access_token}`
                        })
                    }
                }
            );
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            setHistory(data.data || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            console.error('Failed to fetch history', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchHistory(); }, [page, search, verdictFilter]);

    const hasFilter = search.trim().length > 0 || verdictFilter !== 'all';
    const verdicts = ['BUY', 'CAUTION', 'SKIP'];

    return (
        // ── FIX: outer wrapper fills available space, inner splits into
        // fixed header + scrollable list. No more content sliding under
        // the sticky bar.
        <div className="flex flex-col h-full max-h-[calc(100vh-64px)] overflow-hidden">

            {/* ── FIXED TOP SECTION — never scrolls ──────────────────────── */}
            <div className="flex-none px-6 pt-6 pb-4">

                {/* Page header row */}
                <CardSpotlight className="flex items-start justify-between mb-5 p-6">
                    <div>
                        <h1 className="font-[Syne] font-bold text-xl text-gray-900 flex items-center gap-2.5">
                            <History className="w-5 h-5 text-[#FF6B35]" />
                            Analysis History
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5 ml-7">
                            Your Amazon product intelligence reports
                        </p>
                    </div>

                    {/* Live count badge */}
                    {!loading && (
                        <div className="flex items-center gap-2 bg-white border border-[#EBEBF0] px-3 py-1.5 rounded-xl shadow-sm">
                            <span
                                className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"
                                style={{ boxShadow: '0 0 6px rgba(255,107,53,0.5)' }}
                            />
                            <span className="text-xs font-mono font-semibold text-gray-700">
                                {history.length} report{history.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                </CardSpotlight>

                {/* ── SEARCH + FILTER BAR ──────────────────────────────────── */}
                <div className="bg-white border border-[#EBEBF0] rounded-2xl p-1.5 shadow-sm flex flex-col sm:flex-row gap-1.5">

                    {/* Search input */}
                    <div className="relative flex-1 group p-2">
                        <Search className="absolute ml-2 left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 group-focus-within:text-[#FF6B35] transition-colors pointer-events-none" />
                        <Input
                            placeholder="Search product name or ASIN..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="pl-10 h-10 bg-[#F9F8F6]  border-transparent focus:border-[#FF6B35]/30 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl text-sm text-gray-700 placeholder:text-gray-300 shadow-none hover:bg-[#F4F3F0] transition-colors"
                        />
                        {/* Clear button */}
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 hover:text-gray-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Divider on desktop */}
                    <div className="hidden sm:block w-px bg-[#EBEBF0] self-stretch my-1" />

                    {/* Filter pills */}
                    <div className="flex p-2 items-center gap-1 p-1 bg-[#F9F8F6] rounded-xl">
                        {/* All pill */}
                        <button
                            onClick={() => { setVerdictFilter('all'); setPage(1); }}
                            className={`px-3 h-8 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${verdictFilter === 'all'
                                ? 'bg-white text-gray-900 shadow-sm border border-[#EBEBF0]'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-white/60'
                                }`}
                        >
                            All
                        </button>

                        {verdicts.map((v) => {
                            const cfg = VERDICT_CONFIG[v];
                            const isActive = verdictFilter === v;
                            return (
                                <button
                                    key={v}
                                    onClick={() => { setVerdictFilter(isActive ? 'all' : v); setPage(1); }}
                                    className="px-3 h-8 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 border"
                                    style={
                                        isActive
                                            ? {
                                                backgroundColor: cfg.activeBg,
                                                color: cfg.activeText,
                                                borderColor: cfg.activeBg,
                                            }
                                            : {
                                                backgroundColor: 'transparent',
                                                color: '#9CA3AF',
                                                borderColor: 'transparent',
                                            }
                                    }
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            (e.target as HTMLElement).style.backgroundColor = cfg.bg;
                                            (e.target as HTMLElement).style.color = cfg.text;
                                            (e.target as HTMLElement).style.borderColor = cfg.border;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                            (e.target as HTMLElement).style.color = '#9CA3AF';
                                            (e.target as HTMLElement).style.borderColor = 'transparent';
                                        }
                                    }}
                                >
                                    {v}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Active filter indicator */}
                {hasFilter && (
                    <div className="flex items-center gap-2 mt-3 ml-1">
                        <span className="text-xs text-gray-400">Filtering by:</span>
                        {search && (
                            <Badge
                                variant="outline"
                                className="text-xs text-gray-500 border-[#EBEBF0] gap-1.5 cursor-pointer hover:border-red-200 hover:text-red-400 transition-colors"
                                onClick={() => setSearch('')}
                            >
                                "{search}" <X className="w-2.5 h-2.5" />
                            </Badge>
                        )}
                        {verdictFilter !== 'all' && (
                            <Badge
                                variant="outline"
                                className="text-xs gap-1.5 cursor-pointer hover:border-red-200 hover:text-red-400 transition-colors"
                                style={{
                                    borderColor: VERDICT_CONFIG[verdictFilter]?.border,
                                    color: VERDICT_CONFIG[verdictFilter]?.text,
                                }}
                                onClick={() => setVerdictFilter('all')}
                            >
                                {verdictFilter} <X className="w-2.5 h-2.5" />
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* ── SCROLLABLE CONTENT AREA ────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 pb-8">
                {loading ? (
                    <div className="space-y-3 pt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonRow key={i} />
                        ))}
                    </div>
                ) : history.length === 0 ? (
                    <EmptyState hasFilter={hasFilter} />
                ) : (
                    <div className="space-y-3 pt-1">
                        <AnimatePresence mode="popLayout">
                            {history.map((item, idx) => {
                                const verdict = item.analysis_result?.verdict?.toUpperCase();
                                const cfg = VERDICT_CONFIG[verdict];
                                const accentColor = cfg?.dot ?? '#D1D5DB';

                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ delay: idx * 0.04, duration: 0.2 }}
                                    >
                                        <Link href={`/report/${item.id}`} className="block group">
                                            <div
                                                className="bg-white border border-[#EBEBF0] rounded-2xl overflow-hidden relative transition-all duration-200 hover:shadow-md hover:border-transparent"
                                                style={{
                                                    borderLeft: `3px solid ${accentColor}`,
                                                }}
                                            // On hover, strengthen the left border via inline style isn't ideal —
                                            // Tailwind group-hover handles the rest
                                            >
                                                <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">

                                                    {/* Left — product info */}
                                                    <div className="flex-1 min-w-0 space-y-2">

                                                        {/* Meta row */}
                                                        <div className="flex items-center gap-2.5 flex-wrap">
                                                            <VerdictBadge verdict={verdict} />
                                                            <span className="text-[11px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-[#EBEBF0]">
                                                                {item.asin}
                                                            </span>
                                                            <span className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400">
                                                                <Calendar className="w-3 h-3" />
                                                                {format(new Date(item.created_at), 'MMM d, yyyy · h:mm a')}
                                                            </span>
                                                        </div>

                                                        {/* Product name */}
                                                        <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#FF6B35] transition-colors leading-snug">
                                                            {item.product_name || `Amazon Product · ${item.asin}`}
                                                        </h3>

                                                        {/* Summary snippet */}
                                                        {item.analysis_result?.summary && (
                                                            <p className="text-xs text-gray-400 line-clamp-1 italic leading-relaxed">
                                                                "{item.analysis_result.summary}"
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Right — score + chevron */}
                                                    <div className="flex items-center gap-4 shrink-0 sm:pl-4">
                                                        <TrustScore value={item.analysis_result?.trust_score} />

                                                        {/* <Separator orientation="vertical" className="h-10 hidden sm:block" /> */}

                                                        <div className="w-8 h-8 rounded-xl bg-[#F9F8F6] border border-[#EBEBF0] flex items-center justify-center text-gray-300 group-hover:bg-[#FFF2ED] group-hover:border-[#FF6B35]/30 group-hover:text-[#FF6B35] transition-all">
                                                            <ArrowRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* ── Pagination ──────────────────────────────────────── */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-6 px-1">
                                <p className="text-xs text-gray-400">
                                    Page <span className="font-semibold text-gray-700">{page}</span> of{' '}
                                    <span className="font-semibold text-gray-700">{totalPages}</span>
                                </p>

                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="w-8 h-8 rounded-xl border-[#EBEBF0] text-gray-400 hover:text-gray-700 hover:bg-[#F9F8F6] disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>

                                    {/* Page numbers */}
                                    <div className="flex items-center gap-1 mx-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                                            .filter(p => p === 1 || p === totalPages || Math.abs(page - p) <= 1)
                                            .reduce<(number | '...')[]>((acc, p, i, arr) => {
                                                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
                                                acc.push(p);
                                                return acc;
                                            }, [])
                                            .map((p, i) =>
                                                p === '...' ? (
                                                    <span key={`dot-${i}`} className="text-gray-400 text-xs px-1">…</span>
                                                ) : (
                                                    <button
                                                        key={p}
                                                        onClick={() => setPage(p as number)}
                                                        className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${page === p
                                                            ? 'bg-[#FF6B35] text-white shadow-sm'
                                                            : 'text-gray-400 hover:bg-[#F9F8F6] hover:text-gray-700'
                                                            }`}
                                                    >
                                                        {p}
                                                    </button>
                                                )
                                            )}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="w-8 h-8 rounded-xl border-[#EBEBF0] text-gray-400 hover:text-gray-700 hover:bg-[#F9F8F6] disabled:opacity-30"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}