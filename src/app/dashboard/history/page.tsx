"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Copy, Loader2, Check, Search, Filter, History, ChevronLeft, ChevronRight, Calendar, MessageSquare, Zap, Layers } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [tone, setTone] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    // State to track active tab for each history item: { [itemId]: 'response_1' | 'response_2' ... }
    const [activeTabs, setActiveTabs] = useState<Record<string, string>>({});

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '10',
                search,
                tone: tone !== 'all' ? tone : ''
            });

            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            // add Authorization header
            const res = await fetch(`/api/history?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setHistory(data.data || []);
                setTotalPages(data.totalPages);
                setTotalRecords(data.total);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            fetchHistory();
        }, 500);
        return () => clearTimeout(timer);
    }, [page, search, tone]);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Helper to parse response content
    const parseResponse = (content: string) => {
        try {
            const parsed = JSON.parse(content);
            // If it's a simple string that was JSON stringified (unlikely but possible)
            if (typeof parsed === 'string') return { response_1: parsed };
            // If it's the expected object
            if (parsed.response_1 || parsed.response) return parsed;
            return { response_1: content };
        } catch {
            return { response_1: content };
        }
    };

    const tones = ['professional', 'friendly', 'empathetic', 'witty'];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    <History className="h-8 w-8 text-blue-600" />
                    Response History
                </h1>
                <p className="text-gray-500 mt-2">View and manage your previously generated review responses.</p>
            </div>

            {/* Filters */}
            <Card className="p-4 border-gray-200 shadow-sm bg-white rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-72 lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search reviews or responses..."
                            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all h-10 rounded-xl shadow-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                        <span className="text-sm font-medium text-gray-500 whitespace-nowrap flex items-center gap-2">
                            <Filter className="h-4 w-4" /> Filter by Tone:
                        </span>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                            <button
                                onClick={() => { setTone('all'); setPage(1); }}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${tone === 'all'
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                All
                            </button>
                            {tones.map(t => (
                                <button
                                    key={t}
                                    onClick={() => { setTone(t); setPage(1); }}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all border ${tone === t
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
                    <p className="text-gray-500 font-medium">Loading history...</p>
                </div>
            ) : history.length === 0 ? (
                <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <History className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No history found</h3>
                    <p className="text-gray-500 text-sm">Try adjusting your filters or generate your first response!</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {history.map((item) => {
                        const responses = parseResponse(item.response_content);
                        const responseKeys = Object.keys(responses).filter(k => k.startsWith('response') || k === 'response');
                        const activeKey = activeTabs[item.id] || responseKeys[0];
                        const activeContent = responses[activeKey] || responses.response || item.response_content;

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 group"
                            >
                                <div className="flex flex-col lg:flex-row gap-8">
                                    {/* Review Side */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                            <MessageSquare className="h-3 w-3" /> Original Review
                                        </div>
                                        <div className="relative">
                                            <p className="text-gray-700 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 italic">
                                                "{item.review_content || <span className="text-gray-400">No review content saved</span>}"
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium pl-1">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(item.created_at), 'MMM d, yyyy • h:mm a')}
                                        </div>
                                    </div>

                                    {/* Divider Arrow (Desktop) */}
                                    <div className="hidden lg:flex items-center justify-center text-gray-300">
                                        <ChevronRight className="h-6 w-6" />
                                    </div>

                                    {/* Response Side */}
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                                                <Zap className="h-3 w-3" /> AI Response
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${!item.tone_used ? 'bg-gray-100 text-gray-500 border-gray-200' :
                                                item.tone_used === 'professional' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                                    item.tone_used === 'friendly' ? 'bg-green-50 text-green-600 border-green-200' :
                                                        item.tone_used === 'empathetic' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                                            'bg-amber-50 text-amber-600 border-amber-200'
                                                }`}>
                                                {item.tone_used || 'General'}
                                            </span>
                                        </div>

                                        <div className="relative group/response">
                                            {/* Tabs if multiple responses */}
                                            {responseKeys.length > 1 && (
                                                <div className="flex gap-1 mb-2 bg-gray-100/50 p-1 rounded-lg w-max">
                                                    {responseKeys.map((key, idx) => (
                                                        <button
                                                            key={key}
                                                            onClick={() => setActiveTabs(prev => ({ ...prev, [item.id]: key }))}
                                                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeKey === key
                                                                ? 'bg-white text-blue-600 shadow-sm'
                                                                : 'text-gray-500 hover:text-gray-700'
                                                                }`}
                                                        >
                                                            Option {idx + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100 text-gray-800 text-sm leading-relaxed min-h-[100px]">
                                                {activeContent}
                                            </div>

                                            <div className="absolute top-2 right-2 flex gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleCopy(activeContent, item.id)}
                                                    className="opacity-0 group-hover/response:opacity-100 transition-opacity bg-white hover:bg-white shadow-sm h-8 w-auto px-3 py-0 text-xs rounded-lg font-medium text-gray-600"
                                                >
                                                    {copiedId === item.id ? (
                                                        <span className="flex items-center gap-1.5 text-green-600"><Check className="h-3 w-3" /> Copied</span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5"><Copy className="h-3 w-3" /> Copy</span>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {!loading && history.length > 0 && (
                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(page * 10, totalRecords)}</span> of <span className="font-medium">{totalRecords}</span> results
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="h-9 w-9 p-0 rounded-lg"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center justify-center px-4 font-medium text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="h-9 w-9 p-0 rounded-lg"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
