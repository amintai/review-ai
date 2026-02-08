import { createClient } from '@/lib/supabaseServer';
import { ShieldCheck, AlertTriangle, ShoppingCart, CheckCircle, XCircle, Lock } from 'lucide-react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

// Force dynamic rendering since we are fetching specific IDs
export const dynamic = 'force-dynamic';

export default async function ReportPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const supabase = await createClient();

    // Check authentication first - SECURE: Server-side check that cannot be bypassed
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        // Redirect to login with return URL - user must authenticate to view report
        redirect(`/login?next=${encodeURIComponent(`/report/${params.id}`)}`);
    }

    const { data: report, error } = await supabase
        .from('product_analyses')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !report) {
        notFound();
    }

    const result = report.analysis_result;
    const user = session.user;

    const getVerdictColor = (v: string) => {
        switch (v?.toUpperCase()) {
            case 'BUY': return 'text-green-600 bg-green-50 border-green-200';
            case 'SKIP': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-black text-xl tracking-tight">
                        Review<span className="text-orange-600">AI</span>.pro
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/dashboard" 
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <a 
                            href={`https://amazon.com/dp/${report.asin}`} 
                            target="_blank" 
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            View on Amazon &rarr;
                        </a>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-10">
                {/* Welcome Banner - Shows user is authenticated */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                Welcome back, {user.email?.split('@')[0]}!
                            </div>
                            <div className="text-xs text-gray-600">
                                This report is saved to your dashboard
                            </div>
                        </div>
                    </div>
                    <Link 
                        href="/dashboard/history"
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        View All Reports →
                    </Link>
                </div>

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{report.product_name}</h1>
                    <div className="text-sm text-gray-500">ASIN: {report.asin} • Analyzed on {new Date(report.created_at).toLocaleDateString()}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Verdict & Trust Score */}
                    <div className="md:col-span-1 space-y-6">
                        <div className={`p-6 rounded-2xl border-2 text-center ${getVerdictColor(result.verdict)}`}>
                            <div className="text-sm font-bold uppercase tracking-wider mb-2 opacity-80">AI Verdict</div>
                            <div className="text-5xl font-black mb-2">{result.verdict}</div>
                            <p className="text-sm font-medium">{result.summary}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="relative h-32 w-32 mx-auto mb-4 flex items-center justify-center">
                                {/* Simple CSS Gauge */}
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke={result.trust_score > 70 ? "#16a34a" : result.trust_score > 40 ? "#ca8a04" : "#dc2626"}
                                        strokeWidth="10"
                                        strokeDasharray="282.7"
                                        strokeDashoffset={282.7 - (282.7 * result.trust_score) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-900">{result.trust_score}</span>
                                    <span className="text-[10px] uppercase text-gray-400 font-bold">Trust Score</span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">Based on pattern analysis of reviewer history and language.</div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
                                <ShieldCheck className="w-4 h-4" /> Buyer Protection
                            </div>
                            <div className="text-sm text-blue-700 space-y-2">
                                <div className="flex justify-between">
                                    <span>Confidence</span>
                                    <span className="font-bold">{result.confidence_score}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Insights */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Perfect For / Avoid If */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> Perfect For
                                </h3>
                                <ul className="space-y-2">
                                    {result.perfect_for?.map((item: string, i: number) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="mt-1.5 w-1 h-1 bg-gray-400 rounded-full shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                                    <XCircle className="w-5 h-5 text-red-500" /> Avoid If
                                </h3>
                                <ul className="space-y-2">
                                    {result.avoid_if?.map((item: string, i: number) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                            <span className="mt-1.5 w-1 h-1 bg-gray-400 rounded-full shrink-0"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Buyer Psychology */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-orange-500" /> Buyer Psychology
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Why People Buy</div>
                                    <p className="text-gray-700 italic">"{result.buyer_psychology?.why_they_buy}"</p>
                                </div>
                                <div className="h-px bg-gray-100"></div>
                                <div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">What Stops Them</div>
                                    <p className="text-gray-700 italic">"{result.buyer_psychology?.what_stops_them}"</p>
                                </div>
                            </div>
                        </div>

                        {/* Affiliate Suite */}
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <ShoppingCart className="w-5 h-5 text-orange-400" /> Affiliate Content Suite
                                    </h3>
                                    <span className="px-2 py-1 rounded bg-white/10 text-xs font-medium">Creators Only</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 mb-2">Persuasive Angles</div>
                                        <ul className="space-y-2">
                                            {result.persuasive_angles?.map((angle: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-300 flex gap-2">
                                                    <span className="text-orange-400">→</span> {angle}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 mb-2">Honest Objections (Trust Builder)</div>
                                        <ul className="space-y-2">
                                            {result.honest_objections?.map((obj: string, i: number) => (
                                                <li key={i} className="text-sm text-gray-300 flex gap-2">
                                                    <span className="text-red-400">→</span> {obj}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
