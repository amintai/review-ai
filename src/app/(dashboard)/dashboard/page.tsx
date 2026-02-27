"use client";

import { useEffect, useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { supabase } from '@/lib/supabaseClient';
import { trackEvent } from '@/lib/analytics';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { CardHoverEffect } from '@/components/ui/card-hover-effect';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
    Loader2, Search, ArrowRight,
    Zap, Activity, Sparkles, Command, Check, X, AlertCircle, FileText
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Analysis {
    id: string;
    asin: string;
    product_name: string | null;
    created_at: string;
    analysis_result: {
        verdict?: string;
        summary?: string;
        trust_score?: number;
        confidence_score?: number;
    } | null;
}

function getVerdictStyle(verdict?: string) {
    switch (verdict?.toUpperCase()) {
        case 'BUY': return {
            badgeVariant: 'verdictBuy' as const,
            leftBorder: 'border-l-2 border-l-emerald-400',
            icon: <Check size={14} className="text-[#10B981]" />,
            mood: 'Green light'
        };
        case 'SKIP': return {
            badgeVariant: 'verdictSkip' as const,
            leftBorder: 'border-l-2 border-l-red-400',
            icon: <X size={14} className="text-[#EF4444]" />,
            mood: 'Hard pass'
        };
        case 'CAUTION': return {
            badgeVariant: 'verdictCaution' as const,
            leftBorder: 'border-l-2 border-l-amber-400',
            icon: <AlertCircle size={14} className="text-[#F59E0B]" />,
            mood: 'Mixed signals'
        };
        default: return {
            badgeVariant: 'outline' as const,
            leftBorder: 'border-l border-l-border',
            icon: <FileText size={14} className="text-muted-foreground" />,
            mood: 'Pending'
        };
    }
}

function DashboardContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const posthog = usePostHog();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const [url, setUrl] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [analyzeError, setAnalyzeError] = useState<string | null>(null);

    const isValidAmazonUrl = (value: string) => {
        if (!value) return false;
        try {
            const urlObj = new URL(value);
            return urlObj.hostname.includes('amazon.') &&
                (urlObj.pathname.includes('/dp/') || urlObj.pathname.includes('/gp/product/'));
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                const next = searchParams.get('url')
                    ? `/dashboard?url=${searchParams.get('url')}`
                    : '/dashboard';
                router.push(`/login?next=${encodeURIComponent(next)}`);
                return;
            }
            setUser(session.user);
            if (session.user) {
                if (posthog.__loaded) {
                    posthog.identify(session.user.id, {
                        email: session.user.email,
                    });
                }
            }

            const incomingUrl = searchParams.get('url');
            if (incomingUrl) setUrl(incomingUrl);

            await fetchRecentAnalyses();
            setLoading(false);
        };
        init();
    }, []);

    const fetchRecentAnalyses = async () => {
        setHistoryLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();

            const res = await fetch('/api/dashboard', {
                method: 'GET',
                headers: {
                    ...(session?.access_token && {
                        Authorization: `Bearer ${session.access_token}`
                    })
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch history');
            }

            const result = await res.json();
            setAnalyses(result.data || []);

        } catch (error) {
            console.error('History fetch error:', error);
            toast.error('Could not load dashboard history');
        } finally {
            setHistoryLoading(false);
        }
    };

    const handleAnalyze = async (e: FormEvent) => {
        e.preventDefault();
        if (!url.trim() || analyzing) return;

        setAnalyzing(true);
        setAnalyzeError(null);
        trackEvent('analysis_started', { url: url.trim() });

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch('/api/amazon/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` })
                },
                body: JSON.stringify({ url: url.trim() }),
            });


            const data = await res.json();
            if (!res.ok) {
                const message = data.error || 'Analysis failed. Please try again.';
                toast.error(message);
                trackEvent('analysis_failed', {
                    error: message,
                    url: url.trim()
                });
                setAnalyzeError(message);
                setAnalyzing(false);
                return;
            }

            if (data.id) {
                toast.success('Analysis complete. Opening report…');
                trackEvent('analysis_success', {
                    analysis_id: data.id,
                    url: url.trim()
                });
                router.push(`/report/${data.id}`);
            } else {
                const message = 'Unexpected response. Please try again.';
                toast.error(message);
                trackEvent('analysis_failed', {
                    error: 'unexpected_response',
                    url: url.trim()
                });
                setAnalyzeError(message);
                setAnalyzing(false);
            }
        } catch {
            const message = 'Could not connect to ReviewAI. Check your internet connection.';
            toast.error(message);
            setAnalyzeError(message);
            setAnalyzing(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[60vh] w-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const recentCount = analyses.length;
    const thisWeek = analyses.filter(a => {
        const d = new Date(a.created_at);
        const now = new Date();
        return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
    }).length;
    const buyCount = analyses.filter(a => a.analysis_result?.verdict?.toUpperCase() === 'BUY').length;

    return (
        <div className="space-y-12">
            {/* Command-like Analyze Input */}
            <div className="w-full max-w-3xl mx-auto mt-4 mb-12">
                <CardSpotlight className="p-6 sm:p-8">
                    <div className="mb-4 text-center">
                        <h2 className="text-2xl font-syne font-bold text-foreground">Analyze a product</h2>
                        <p className="text-sm text-secondary mt-1">Paste an Amazon link to generate an instant BUY / SKIP / CAUTION verdict.</p>
                    </div>
                    <form onSubmit={handleAnalyze} className="relative group">
                        <div className="relative flex items-center bg-[#F9F8F6] border border-input rounded-2xl shadow-sm p-1.5 pl-6 transition-all focus-within:border-primary focus-within:bg-card focus-within:shadow-[0_0_0_4px_rgba(255,107,53,0.1)]">
                            <Sparkles size={20} className="text-primary shrink-0" />
                            <Input
                                type="url"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                placeholder="https://amazon.com/dp/B0..."
                                className="border-0 bg-transparent px-4 py-3 text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                                disabled={analyzing}
                                autoFocus
                            />
                            <motion.button
                                type="submit"
                                disabled={analyzing || !url.trim()}
                                className="cursor-pointer px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 shrink-0 group/btn text-primary-foreground disabled:opacity-50"
                                animate={{
                                    backgroundColor: isValidAmazonUrl(url) ? 'rgba(255,107,53,1)' : 'rgba(209,213,219,1)',
                                }}
                                whileHover={isValidAmazonUrl(url) && !analyzing ? { scale: 1.02 } : {}}
                            >
                                {analyzing ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Analyzing…</span>
                                    </>
                                ) : (
                                    <>
                                        ANALYZE
                                        <ArrowRight
                                            size={16}
                                            className="opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all"
                                        />
                                    </>
                                )}
                            </motion.button>
                        </div>
                        {analyzing && (
                            <div className="mt-4 flex flex-col gap-2 text-xs text-secondary">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    <span>Collecting reviews…</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse [animation-delay:120ms]" />
                                    <span>Running AI analysis…</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse [animation-delay:240ms]" />
                                    <span>Generating verdict & report…</span>
                                </div>
                            </div>
                        )}
                    </form>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
                        <span>Try:</span>
                        {["B09G9FPHY6", "B08N5WRWNW"].map(example => (
                            <Badge
                                key={example}
                                variant="secondary"
                                className="cursor-pointer"
                                onClick={() => setUrl(`https://www.amazon.com/dp/${example}`)}
                            >
                                {example}
                            </Badge>
                        ))}
                    </div>
                </CardSpotlight>
            </div>

            {/* Metrics Row */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { staggerChildren: 0.06 }
                    }
                }}
            >
                {[
                    { label: 'Total Analyses', value: recentCount, icon: <Activity className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
                    { label: 'Run This Week', value: thisWeek, icon: <Zap className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-50' },
                    { label: 'Buy Verdicts', value: buyCount, icon: <Check className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
                ].map((stat) => (
                    <motion.div
                        key={stat.label}
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <Card className="border-border/80 bg-card/90 rounded-2xl p-6 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-[1px]">
                            <div className="flex items-center gap-3 mb-4">
                                <BackgroundGradient className="rounded-xl bg-gradient-to-br from-primary/15 via-orange-400/5 to-sky-500/15">
                                    <div className={`p-2 rounded-[10px] ${stat.bg}`}>
                                        {stat.icon}
                                    </div>
                                </BackgroundGradient>
                                <span className="text-sm font-semibold text-secondary">{stat.label}</span>
                            </div>
                            <div className="text-4xl font-syne font-bold text-foreground">
                                <AnimatedNumber value={stat.value} />
                            </div>
                            <div className="mt-2 text-xs font-medium text-muted-foreground">
                                {stat.label === 'Buy Verdicts' && recentCount > 0
                                    ? `${Math.round((buyCount / recentCount) * 100)}% BUY rate`
                                    : stat.label === 'Run This Week'
                                        ? `↑ Activity steady`
                                        : `Across all sources`}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Recent Reports Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-syne font-bold text-foreground">
                        Recent Reports
                    </h3>
                    <Link
                        href="/dashboard/history"
                        className="text-sm font-semibold text-primary hover:text-[#E85A25] transition-colors flex items-center gap-1 group"
                    >
                        View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {historyLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-muted/10 border border-border rounded-2xl h-32 animate-pulse" />
                        ))}
                    </div>
                ) : analyses.length === 0 ? (
                    <div className="bg-card border border-border border-dashed rounded-2xl p-16 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-black/[0.02] border border-border flex items-center justify-center mb-6 shadow-sm">
                            <Search size={32} className="text-muted-foreground opacity-50" />
                        </div>
                        <h4 className="text-xl font-syne font-bold text-foreground mb-2">No analyses yet</h4>
                        <p className="text-sm text-secondary max-w-sm mx-auto mb-6">
                            Paste an Amazon link above to initiate your first AI analysis sequence, or install our Chrome Extension for native integration.
                        </p>
                        <button onClick={() => {
                            const input = document.querySelector('input[type="url"]') as HTMLInputElement;
                            input?.focus();
                        }} className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-[#E85A25] transition-colors shadow-sm flex items-center gap-2">
                            Start Analyzing <ArrowRight size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {analyses.map((item) => {
                            const style = getVerdictStyle(item.analysis_result?.verdict);
                            const trustScore = item.analysis_result?.trust_score ?? 85;
                            const confScore = item.analysis_result?.confidence_score ?? 92;

                            return (
                                <Link key={item.id} href={`/report/${item.id}`}>
                                    <CardHoverEffect className={style.leftBorder}>
                                        <div className="p-5 flex flex-col gap-3">
                                            <div className="flex justify-between items-start gap-3">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <Badge
                                                        variant={style.badgeVariant}
                                                        className="gap-1.5 px-2.5 py-1 text-[11px]"
                                                    >
                                                        {style.icon}
                                                        <span className="uppercase">
                                                            {item.analysis_result?.verdict || 'PENDING'}
                                                        </span>
                                                    </Badge>
                                                    <span className="text-[11px] font-mono text-muted-foreground truncate">
                                                        {item.asin}
                                                    </span>
                                                </div>
                                                <div className="text-right space-y-0.5">
                                                    <span className="block text-[11px] text-muted-foreground" suppressHydrationWarning>
                                                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                                                    </span>
                                                    <span className="block text-[11px] font-medium text-muted-foreground/90">
                                                        {style.mood}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                                                    {item.product_name || 'Amazon Product Intelligence Report'}
                                                </h4>
                                                {item.analysis_result?.summary && (
                                                    <p className="text-xs text-secondary line-clamp-2">
                                                        {item.analysis_result.summary}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                                <Badge
                                                    variant="trust"
                                                    className="text-[11px] px-2.5 py-1"
                                                >
                                                    Trust {trustScore}/100
                                                </Badge>
                                                <Badge
                                                    variant="confidence"
                                                    className="text-[11px] px-2.5 py-1"
                                                >
                                                    Confidence {confScore}/100
                                                </Badge>
                                            </div>

                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-[11px] font-medium text-muted-foreground">
                                                    Tap in to see the full story.
                                                </span>
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 px-2 text-xs font-semibold text-primary"
                                                >
                                                    <span className="inline-flex items-center gap-1.5">
                                                        Open report
                                                        <ArrowRight
                                                            size={14}
                                                            className="ml-0.5"
                                                        />
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHoverEffect>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="h-[60vh] w-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
