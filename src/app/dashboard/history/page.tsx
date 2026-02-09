"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, Loader2, Check, Search, Filter, History, ChevronLeft, ChevronRight, Calendar, MessageSquare, Zap, Layers } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

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
            const response = await fetch(`/api/history?page=${page}&limit=${limit}&search=${search}&tone=${verdictFilter}`);
            const data = await response.json();
            setHistory(data.history || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error('Failed to fetch history', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [page, search, verdictFilter]);

    const results = ['BUY', 'CAUTION', 'SKIP'];

    const getVerdictColor = (v: string) => {
        switch (v?.toUpperCase()) {
            case 'BUY': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'CAUTION': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'SKIP': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-xl">
                            <History className="h-6 w-6 text-orange-600" />
                        </div>
                        Analysis History
                    </h1>
                    <p className="text-gray-500 mt-1 ml-11">Review and manage your product intelligence reports</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="bg-orange-50 px-4 py-2 rounded-full border border-orange-100 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-semibold text-orange-700">{history.length} Reports Found</span>
                    </div>
                </div>
            </div>

            {/* Filters Card */}
            <Card className="p-4 border-gray-100 shadow-sm bg-white/50 backdrop-blur-sm sticky top-20 z-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                            placeholder="Search by product name or ASIN..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-500/10 rounded-xl transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                        <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-100">
                            <button
                                onClick={() => setVerdictFilter('all')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${verdictFilter === 'all'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                All
                            </button>
                            {results.map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setVerdictFilter(v)}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${verdictFilter === v
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* History List */}
            {loading ? (
                <div className="h-64 flex flex-col items-center justify-center gap-4 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                    <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                    <p className="text-gray-500 animate-pulse font-medium">Fetching history...</p>
                </div>
            ) : history.length === 0 ? (
                <div className="h-80 flex flex-col items-center justify-center text-center gap-6 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                    <div className="p-6 bg-gray-50 rounded-3xl">
                        <Layers className="h-12 w-12 text-gray-300" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">No reports found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">Try adjusting your search filters or start a new analysis from the dashboard.</p>
                    </div>
                    <Button
                        onClick={() => window.location.href = '/dashboard'}
                        className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-200 px-8"
                    >
                        New Analysis
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={item.id}
                        >
                            <Card className="group overflow-hidden border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 rounded-2xl bg-white">
                                <div className="p-5 flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Verdict Badge */}
                                    <div className="flex-shrink-0">
                                        <div className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-transform group-hover:scale-105 ${getVerdictColor(item.analysis_result?.verdict)}`}>
                                            <span className="text-xs font-black uppercase tracking-wider opacity-60">Verdict</span>
                                            <span className="text-xl font-black">{item.analysis_result?.verdict || 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                                                {item.asin}
                                            </span>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(item.created_at), 'MMM d, yyyy • h:mm a')}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                                            {item.product_name}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed italic">
                                            "{item.analysis_result?.summary?.substring(0, 150)}..."
                                        </p>
                                    </div>

                                    {/* Actions & Metrics */}
                                    <div className="flex items-center gap-6">
                                        <div className="hidden lg:flex items-center gap-6">
                                            <div className="text-center">
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Trust Score</div>
                                                <div className="text-xl font-black text-gray-900">{item.analysis_result?.trust_score}/100</div>
                                            </div>
                                            <div className="h-10 w-px bg-gray-100"></div>
                                            <Link
                                                href={`/report/${item.id}`}
                                                className="p-3 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-xl transition-all"
                                            >
                                                <ChevronRight className="h-6 w-6" />
                                            </Link>
                                        </div>
                                        <div className="lg:hidden flex justify-end w-full">
                                            <Button
                                                variant="outline"
                                                onClick={() => window.location.href = `/report/${item.id}`}
                                                className="w-full border-gray-200 hover:border-orange-200 hover:bg-orange-50 text-orange-600 font-bold"
                                            >
                                                View Full Report
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-between pt-6 px-2">
                        <div className="text-sm text-gray-500 font-medium">
                            Showing <span className="text-gray-900 font-bold">{(page - 1) * limit + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(page * limit, totalPages * limit)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="h-9 w-9 p-0 rounded-lg hover:border-orange-200 hover:bg-orange-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`h-9 w-9 rounded-lg text-sm font-bold transition-all ${page === p
                                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-200'
                                            : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="h-9 w-9 p-0 rounded-lg hover:border-orange-200 hover:bg-orange-50"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
