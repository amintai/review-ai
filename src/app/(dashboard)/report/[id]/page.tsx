import { createClient } from '@/lib/supabaseServer';
import {
    ShieldCheck, AlertTriangle, ShoppingCart,
    CheckCircle, XCircle, Lock, ArrowLeft,
    ExternalLink, Share2, Star, TrendingUp,
    TrendingDown, Zap, Award, Target
} from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardSpotlight } from '@/components/ui/card-spotlight'; // Aceternity
import { BackgroundGradient } from '@/components/ui/background-gradient'; // Aceternity
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'; // Aceternity

export const dynamic = 'force-dynamic';

const VERDICT_CONFIG = {
    BUY: {
        color: '#10B981',
        bg: '#ECFDF5',
        border: '#A7F3D0',
        lightBg: '#F0FDF9',
        label: 'Green light',
        icon: TrendingUp,
        tagline: 'Strong buy signal across review patterns',
    },
    SKIP: {
        color: '#EF4444',
        bg: '#FEF2F2',
        border: '#FECACA',
        lightBg: '#FFF5F5',
        label: 'Hard pass',
        icon: TrendingDown,
        tagline: 'Significant red flags detected',
    },
    CAUTION: {
        color: '#F59E0B',
        bg: '#FFFBEB',
        border: '#FDE68A',
        lightBg: '#FFFDF0',
        label: 'Mixed signals',
        icon: AlertTriangle,
        tagline: 'Proceed carefully — inconsistent signals',
    },
} as const;

function ScoreRing({
    value,
    label,
    color,
    size = 120,
}: {
    value: number;
    label: string;
    color: string;
    size?: number;
}) {
    const r = 42;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 100 100"
                    className="-rotate-90"
                >
                    <circle
                        cx="50" cy="50" r={r}
                        fill="none"
                        stroke="#EBEBF0"
                        strokeWidth="7"
                    />
                    <circle
                        cx="50" cy="50" r={r}
                        fill="none"
                        stroke={color}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        className="transition-all duration-1000 ease-out"
                        style={{
                            filter: `drop-shadow(0 0 6px ${color}60)`,
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                        className="font-[Syne] font-black leading-none"
                        style={{ fontSize: size * 0.22, color }}
                    >
                        {value}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold mt-0.5">
                        /100
                    </span>
                </div>
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}

function SectionCard({
    icon: Icon,
    title,
    iconColor,
    iconBg,
    children,
    accent,
}: {
    icon: any;
    title: string;
    iconColor: string;
    iconBg: string;
    children: React.ReactNode;
    accent?: string;
}) {
    return (
        <div
            className="bg-white rounded-2xl border p-6 relative overflow-hidden group transition-all duration-200 hover:shadow-md"
            style={{ borderColor: '#EBEBF0' }}
        >
            {accent && (
                <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ backgroundColor: accent }}
                />
            )}
            <div className="flex items-center gap-3 mb-5">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: iconBg }}
                >
                    <Icon className="w-4 h-4" style={{ color: iconColor }} />
                </div>
                <h3 className="font-[Syne] font-bold text-gray-900 text-base">{title}</h3>
            </div>
            {children}
        </div>
    );
}

export default async function ReportPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    const isAuthenticated = !!session;
    const user = session?.user || null;

    const { data: report, error } = await supabase
        .from('product_analyses')
        .select('*')
        .eq('id', params.id)
        .single();

    const redirectUrl = report.marketplace ? `https://${report.marketplace}/dp/${report.asin}` : `https://amazon.com/dp/${report.asin}`;

    if (error || !report) notFound();

    const result = report.analysis_result;
    const verdict = result.verdict as 'BUY' | 'SKIP' | 'CAUTION';
    const vc = VERDICT_CONFIG[verdict] ?? VERDICT_CONFIG['CAUTION'];
    const VerdictIcon = vc.icon;

    return (
        <div className="min-h-screen bg-[#F7F6F3]">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                <div className="flex items-center justify-between">
                    <Link
                        href="/dashboard/history"
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#FF6B35] transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Reports
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 cursor-pointer text-xs font-medium border-[#EBEBF0] hover:border-[#FF6B35] hover:text-white transition-colors"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            Share
                        </Button>
                        <a
                            href={redirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="sm"
                                className="cursor-pointer gap-2 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-white"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                View on Amazon
                            </Button>
                        </a>
                    </div>
                </div>

                {isAuthenticated && user && (
                    <div
                        className="flex items-center justify-between p-4 bg-white rounded-xl border"
                        style={{ borderColor: '#EBEBF0' }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-sm font-bold font-[Syne]">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Welcome back, {user.email?.split('@')[0]}
                                </p>
                                <p className="text-xs text-gray-400">
                                    This report is saved to your dashboard
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/history"
                            className="text-xs font-bold text-[#FF6B35] hover:text-[#E85A25] transition-colors uppercase tracking-wide"
                        >
                            All Reports →
                        </Link>
                    </div>
                )}

                <div
                    className="bg-white rounded-2xl border p-5 sm:p-6"
                    style={{ borderColor: '#EBEBF0' }}
                >
                    {/* Product name — leading element, appropriately sized */}
                    <h1 className="font-[Syne] font-bold text-xl sm:text-2xl text-gray-900 leading-snug tracking-tight mb-3 max-w-3xl">
                        {report.product_name}
                    </h1>

                    {/* Verdict pill + ASIN + date — secondary metadata row */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                            className="px-2.5 py-1 gap-1.5 text-[11px] font-bold uppercase tracking-wider border font-[Syne]"
                            style={{
                                backgroundColor: vc.bg,
                                color: vc.color,
                                borderColor: vc.border,
                            }}
                        >
                            <VerdictIcon className="w-3 h-3" />
                            {verdict}
                        </Badge>
                        <span
                            className="text-[11px] font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded border"
                            style={{ borderColor: '#EBEBF0' }}
                        >
                            {report.asin}
                        </span>
                        <span className="text-[11px] text-gray-400">
                            · {new Date(report.created_at).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>

                <div
                    className="rounded-2xl border overflow-hidden"
                    style={{
                        backgroundColor: vc.lightBg,
                        borderColor: vc.border,
                        borderLeft: `4px solid ${vc.color}`,
                    }}
                >
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

                            <div className="flex items-center gap-5">
                                <div
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${vc.color}15` }}
                                >
                                    <VerdictIcon
                                        className="w-8 h-8 sm:w-10 sm:h-10"
                                        style={{ color: vc.color }}
                                    />
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                        AI Verdict
                                    </div>
                                    <div
                                        className="font-[Syne] font-black text-5xl sm:text-6xl leading-none"
                                        style={{ color: vc.color }}
                                    >
                                        {verdict}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 mt-1">
                                        {vc.tagline}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 sm:gap-10">
                                <ScoreRing
                                    value={result.trust_score}
                                    label="Trust"
                                    color="#06B6D4"
                                    size={100}
                                />
                                <ScoreRing
                                    value={result.confidence_score}
                                    label="Confidence"
                                    color="#FF6B35"
                                    size={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className={`space-y-4 ${!isAuthenticated ? 'blur-sm select-none pointer-events-none opacity-60' : ''}`}>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SectionCard
                                icon={CheckCircle}
                                title="Perfect For"
                                iconColor="#10B981"
                                iconBg="#ECFDF5"
                                accent="#10B981"
                            >
                                <ul className="space-y-3">
                                    {result.perfect_for?.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard
                                icon={XCircle}
                                title="Avoid If"
                                iconColor="#EF4444"
                                iconBg="#FEF2F2"
                                accent="#EF4444"
                            >
                                <ul className="space-y-3">
                                    {result.avoid_if?.map((item: string, i: number) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0" />
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </SectionCard>
                        </div>

                        {result.deal_breakers?.length > 0 && (
                            <SectionCard
                                icon={AlertTriangle}
                                title="Deal Breakers"
                                iconColor="#F59E0B"
                                iconBg="#FFFBEB"
                                accent="#F59E0B"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {result.deal_breakers?.map((item: string, i: number) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3 text-sm text-gray-600 bg-amber-50/50 rounded-xl p-3 border border-amber-100"
                                        >
                                            <span className="text-amber-500 font-bold mt-0.5 text-xs">!</span>
                                            <span className="leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        )}

                        <SectionCard
                            icon={Target}
                            title="Buyer Psychology"
                            iconColor="#8B5CF6"
                            iconBg="#F5F3FF"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            Why They Buy
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic leading-relaxed">
                                        "{result.buyer_psychology?.why_they_buy}"
                                    </p>
                                </div>
                                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            What Stops Them
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic leading-relaxed">
                                        "{result.buyer_psychology?.what_stops_them}"
                                    </p>
                                </div>
                            </div>
                        </SectionCard>


                        <div
                            className="rounded-2xl border overflow-hidden"
                            style={{ borderColor: '#EBEBF0' }}
                        >
                            {/* Header */}
                            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center">
                                        <Zap className="w-4 h-4 text-[#FF6B35]" />
                                    </div>
                                    <div>
                                        <h3 className="font-[Syne] font-bold text-white text-sm">
                                            Affiliate Content Suite
                                        </h3>
                                        <p className="text-xs text-gray-400">AI-generated content for creators</p>
                                    </div>
                                </div>
                                <Badge className="bg-[#FF6B35]/20 text-white border-[#FF6B35]/30 text-[10px] font-bold uppercase tracking-widest border">
                                    Creators Only
                                </Badge>
                            </div>

                            <div className="bg-white p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <Award className="w-3.5 h-3.5 text-[#FF6B35]" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                Persuasive Angles
                                            </span>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {result.persuasive_angles?.map((angle: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className="p-2 mb-2 flex items-start gap-3 text-sm text-gray-600 bg-[#F7F6F3] rounded-xl p-3.5 border border-[#EBEBF0] hover:border-[#FF6B35]/40 hover:bg-orange-50/30 transition-colors"
                                                >
                                                    <span className="text-[#FF6B35] font-bold mt-0.5 shrink-0">→</span>
                                                    <span className="leading-relaxed">{angle}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <ShieldCheck className="w-3.5 h-3.5 text-[#EF4444]" />
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                Honest Objections
                                                <span className="ml-1 opacity-50 normal-case tracking-normal font-normal">
                                                    (Trust builder)
                                                </span>
                                            </span>
                                        </div>
                                        <ul className="space-y-2.5">
                                            {result.honest_objections?.map((obj: string, i: number) => (
                                                <li
                                                    key={i}
                                                    className="p-2 mb-2 flex items-start gap-3 text-sm text-gray-600 bg-[#F7F6F3] rounded-xl p-3.5 border border-[#EBEBF0] hover:border-red-200 hover:bg-red-50/30 transition-colors"
                                                >
                                                    <span className="text-[#EF4444] font-bold mt-0.5 shrink-0">→</span>
                                                    <span className="leading-relaxed">{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            style={{ backgroundColor: '#FFF8F5', borderColor: '#FFD5C2' }}
                        >
                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-1">
                                    Want to dig deeper?
                                </p>
                                <p className="text-xs text-gray-500">
                                    Ask our AI anything about this product — sizing, comparisons, alternatives.
                                </p>
                            </div>
                            <Button
                                className="shrink-0 bg-[#FF6B35] hover:bg-[#E85A25] text-white text-sm font-semibold gap-2 rounded-xl"
                            >
                                <Zap className="w-3.5 h-3.5" />
                                Chat about this product
                            </Button>
                        </div>
                    </div>

                    {!isAuthenticated && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                            <div
                                className="bg-white/90 backdrop-blur-xl border shadow-2xl rounded-2xl p-8 max-w-sm w-full text-center"
                                style={{ borderColor: '#EBEBF0' }}
                            >
                                <div
                                    className="h-1 rounded-t-2xl absolute top-0 inset-x-0"
                                    style={{ background: `linear-gradient(90deg, ${vc.color}, #FF6B35)` }}
                                />

                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                    style={{ backgroundColor: vc.bg }}
                                >
                                    <Lock className="w-6 h-6" style={{ color: vc.color }} />
                                </div>

                                <h3 className="font-[Syne] font-bold text-gray-900 text-xl mb-2">
                                    Unlock Full Report
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                    Sign in free to see deep insights, buyer psychology, theme clusters, and creator angles.
                                </p>

                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {['Perfect For', 'Avoid If', 'Deal Breakers', 'Buyer Psychology', 'Themes'].map(f => (
                                        <Badge
                                            key={f}
                                            variant="outline"
                                            className="text-[10px] text-gray-400 border-[#EBEBF0]"
                                        >
                                            🔒 {f}
                                        </Badge>
                                    ))}
                                </div>

                                <Link
                                    href={`/login?next=${encodeURIComponent(`/report/${params.id}`)}`}
                                    className="block"
                                >
                                    <Button className="w-full bg-[#FF6B35] hover:bg-[#E85A25] text-white font-bold py-3 rounded-xl text-sm">
                                        Sign In — It's Free
                                    </Button>
                                </Link>
                                <p className="text-[11px] text-gray-400 mt-3">
                                    No credit card · 10 analyses free/month
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}