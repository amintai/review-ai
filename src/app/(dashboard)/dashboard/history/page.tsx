"use client";

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search, History, ChevronLeft, ChevronRight,
    ChevronRight as ArrowRight, Layers,
    TrendingUp, TrendingDown, AlertTriangle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import PersonaFilter from '@/components/persona/PersonaFilter';

// ─── Types ────────────────────────────────────────────────────────────────────
type VerdictType = 'BUY' | 'SKIP' | 'CAUTION' | 'PENDING';

interface Analysis {
    id: string;
    asin: string;
    product_name: string | null;
    brand?: string;
    rating?: string;
    review_count?: string;
    price?: string;
    currency?: string;
    category?: string;
    image_url?: string;
    availability?: string;
    persona_used?: string | null;
    created_at: string;
    analysis_result: {
        verdict?: string;
        summary?: string;
        trust_score?: number;
        confidence_score?: number;
    } | null;
}

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

function getPersonaCounts(analyses: Analysis[]): Record<string, number> {
    const counts: Record<string, number> = {};
    analyses.forEach(analysis => {
        if (analysis.persona_used) {
            counts[analysis.persona_used] = (counts[analysis.persona_used] || 0) + 1;
        }
    });
    return counts;
}

function getFilteredAnalyses(analyses: Analysis[], personaFilter: string | null): Analysis[] {
    if (!personaFilter) return analyses;
    return analyses.filter(analysis => analysis.persona_used === personaFilter);
}

// ─── Skeleton row ──────────────────────────────────────────────────────────────
function SkeletonRow() {
    return (
        <div className="bg-white rounded-2xl border border-[#EBEBF0] p-4 space-y-3 animate-pulse h-full flex flex-col">
            {/* Product header skeleton */}
            <div className="flex gap-3 min-h-[80px]">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                    <div className="flex gap-2">
                        <div className="w-12 h-4 bg-gray-100 rounded-md" />
                        <div className="w-16 h-4 bg-gray-100 rounded-md" />
                    </div>
                    <div className="w-full h-8 bg-gray-100 rounded" />
                    <div className="w-3/4 h-4 bg-gray-100 rounded" />
                </div>
            </div>
            
            {/* Verdict and scores skeleton */}
            <div className="flex justify-between items-center min-h-[24px]">
                <div className="flex gap-2">
                    <div className="w-12 h-5 bg-gray-100 rounded-md" />
                    <div className="w-16 h-5 bg-gray-100 rounded-md" />
                </div>
                <div className="w-8 h-3 bg-gray-100 rounded" />
            </div>
            
            {/* Summary skeleton */}
            <div className="flex-1 min-h-[32px]">
                <div className="w-full h-3 bg-gray-50 rounded mb-1" />
                <div className="w-2/3 h-3 bg-gray-50 rounded" />
            </div>

            {/* Bottom section skeleton */}
            <div className="flex justify-between items-center pt-2 mt-auto border-t border-gray-100">
                <div className="flex gap-2">
                    <div className="w-12 h-5 bg-gray-100 rounded" />
                    <div className="w-12 h-5 bg-gray-100 rounded" />
                </div>
                <div className="w-6 h-6 bg-gray-100 rounded-lg" />
            </div>
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
    const [history, setHistory] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [verdictFilter, setVerdictFilter] = useState('all');
    const [personaFilter, setPersonaFilter] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 12; // Increased for better grid layout

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

    useEffect(() => { fetchHistory(); }, [page, search, verdictFilter, personaFilter]);

    const hasFilter = search.trim().length > 0 || verdictFilter !== 'all' || personaFilter !== null;
    const verdicts = ['BUY', 'CAUTION', 'SKIP'];
    const filteredHistory = getFilteredAnalyses(history, personaFilter);

    return (
        // ── FIX: outer wrapper fills available space, inner splits into
        // fixed header + scrollable list. No more content sliding under
        // the sticky bar.
        <div className="flex flex-col h-full max-h-[calc(100vh-64px)] overflow-hidden">

            {/* ── FIXED TOP SECTION — never scrolls ──────────────────────── */}
            <div className="flex-none px-6 pt-6 pb-4">

                {/* Compact Page header row */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/10 flex items-center justify-center">
                                <History className="w-4 h-4 text-[#FF6B35]" />
                            </div>
                            <div>
                                <h1 className="font-[Syne] font-bold text-lg text-gray-900">
                                    Analysis History
                                </h1>
                                <p className="text-xs text-gray-500 -mt-0.5">
                                    Your product intelligence reports
                                </p>
                            </div>
                        </div>

                        {/* Inline stats */}
                        {!loading && (
                            <div className="hidden sm:flex items-center gap-4 ml-6">
                                <div className="flex items-center gap-1.5 text-xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                                    <span className="font-semibold text-gray-700">{history.length}</span>
                                    <span className="text-gray-500">total</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="font-semibold text-gray-700">
                                        {history.filter(h => h.analysis_result?.verdict?.toUpperCase() === 'BUY').length}
                                    </span>
                                    <span className="text-gray-500">buy</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    <span className="font-semibold text-gray-700">
                                        {history.filter(h => h.analysis_result?.verdict?.toUpperCase() === 'CAUTION').length}
                                    </span>
                                    <span className="text-gray-500">caution</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile stats */}
                    {!loading && (
                        <div className="sm:hidden flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <span className="text-xs font-semibold text-gray-700">{history.length}</span>
                            <span className="text-xs text-gray-500">reports</span>
                        </div>
                    )}
                </div>

                {/* ── SEARCH + FILTER BAR ──────────────────────────────────── */}
                <div className="bg-white border border-[#EBEBF0] rounded-2xl p-4 shadow-sm space-y-4">
                    
                    {/* Search input */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 group-focus-within:text-[#FF6B35] transition-colors pointer-events-none" />
                        <Input
                            placeholder="Search product name or ASIN..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="pl-10 h-12 bg-[#F9F8F6] border-transparent focus:border-[#FF6B35]/30 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 shadow-none hover:bg-[#F4F3F0] transition-colors"
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

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        {/* Persona Filter */}
                        <div className="flex-1">
                            <PersonaFilter
                                selectedPersona={personaFilter}
                                onPersonaChange={setPersonaFilter}
                                reportCounts={getPersonaCounts(history)}
                                totalReports={history.length}
                            />
                        </div>

                        {/* Verdict Filter pills */}
                        <div className="flex items-center gap-1 p-1 bg-[#F9F8F6] rounded-xl">
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
                                onClick={() => setVerdictFilter('all')}
                            >
                                {verdictFilter} <X className="w-2.5 h-2.5" />
                            </Badge>
                        )}
                        {personaFilter && (
                            <Badge
                                variant="outline"
                                className="text-xs gap-1.5 cursor-pointer hover:border-red-200 hover:text-red-400 transition-colors"
                                onClick={() => setPersonaFilter(null)}
                            >
                                {personaFilter.replace('_', ' ')} <X className="w-2.5 h-2.5" />
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            {/* ── SCROLLABLE CONTENT AREA ────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 pb-8">
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-1">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonRow key={i} />
                        ))}
                    </div>
                ) : filteredHistory.length === 0 ? (
                    <EmptyState hasFilter={hasFilter} />
                ) : (
                    <div className="space-y-6 pt-1">
                        {/* Results count */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold">{filteredHistory.length}</span> of{' '}
                                <span className="font-semibold">{history.length}</span> reports
                            </p>
                            {hasFilter && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearch('');
                                        setVerdictFilter('all');
                                        setPersonaFilter(null);
                                        setPage(1);
                                    }}
                                    className="text-xs text-gray-500 hover:text-gray-700"
                                >
                                    Clear all filters
                                </Button>
                            )}
                        </div>

                        {/* Product Cards Grid - Consistent Heights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            <AnimatePresence mode="popLayout">
                                {filteredHistory.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ delay: idx * 0.02, duration: 0.2 }}
                                        className="h-full" // Ensure full height
                                    >
                                        <div className="h-full flex flex-col"> {/* Consistent card container */}
                                            <ProductCard
                                                id={item.id}
                                                asin={item.asin}
                                                productName={item.product_name || 'Amazon Product Intelligence Report'}
                                                brand={item.brand}
                                                rating={item.rating}
                                                reviewCount={item.review_count}
                                                price={item.price}
                                                currency={item.currency}
                                                category={item.category}
                                                imageUrl={item.image_url}
                                                availability={item.availability}
                                                createdAt={item.created_at}
                                                analysisResult={item.analysis_result}
                                                personaUsed={item.persona_used}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

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