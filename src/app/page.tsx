import dynamic from 'next/dynamic';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import "@radix-ui/themes/styles.css";
import "./styles/animate.css";
import "./styles/dashboard-theme.css";
import { Copy } from 'lucide-react';
import { Suspense } from 'react';
// import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// Dynamic imports for heavy or below-the-fold components
const StickyScroll = dynamic(() => import("@/components/ui/sticky-scroll-reveal").then(mod => mod.StickyScroll), {
    ssr: true,
    loading: () => <div className="h-[500px] w-full bg-slate-50/50 animate-pulse rounded-3xl" />
});

// const LiveDemo = dynamic(() => import('@/components/landing/LiveDemo'), {
//     ssr: true,
//     loading: () => <div className="h-[600px] w-full bg-white animate-pulse rounded-3xl border border-gray-100" />
// });


const HeroSection = dynamic(() => import("@/components/landing/HeroSection"), {
    ssr: true,
    loading: () => <div className="h-[600px] w-full bg-white animate-pulse rounded-3xl border border-gray-100" />
});

const BackgroundRippleEffect = dynamic(() => import("@/components/ui/background-ripple-effect"), {
    loading: () => <div className="h-[600px] w-full bg-white animate-pulse rounded-3xl border border-gray-100" />
});

const content = [
    {
        title: "Instant Verification Overlay",
        description:
            "Don't leave the Amazon page. Our extension overlays a clear 'Buy' or 'Skip' verdict instantly as you browse.",
        content: (
            <div className="h-full w-full flex flex-col items-center justify-center text-white bg-orange-500/10 p-6">
                <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-green-100 text-green-700 text-xs font-bold rounded-bl-xl">VERDICT: BUY</div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-lg shrink-0"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                            <div className="h-3 w-1/2 bg-gray-50 rounded"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-50 rounded"></div>
                        <div className="h-2 w-full bg-gray-50 rounded"></div>
                    </div>
                </div>
                <div className="w-full bg-orange-50 rounded-xl border border-orange-100 p-4">
                    <div className="text-xs text-orange-600 font-bold mb-1">AI INSIGHT</div>
                    <div className="text-sm text-gray-600">"Great battery life, but the charging case feels flimsy compared to last gen."</div>
                </div>
            </div>
        ),
    },
    {
        title: "Trust Score Intelligence",
        description:
            "We analyze thousands of reviews to detect fake bot activity and incentivized posts, giving you a true 'Trust Score' out of 100.",
        content: (
            <div className="h-full w-full bg-slate-50 border border-gray-100 flex flex-col items-center justify-center p-8 gap-6">
                <div className="relative h-40 w-40 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="70" strokeLinecap="round" />
                    </svg>
                    <div className="text-center">
                        <span className="text-4xl font-black text-slate-800">74</span>
                        <div className="text-xs text-slate-500 font-medium uppercase mt-1">Trust Score</div>
                    </div>
                </div>
                <div className="text-center max-w-xs">
                    <div className="text-sm font-bold text-slate-700 mb-1">Suspicious Activity Detected</div>
                    <p className="text-xs text-slate-500">23% of 5-star reviews were posted within the same 48-hour window.</p>
                </div>
            </div>
        ),
    },
    {
        title: "Affiliate-Ready Summaries",
        description:
            "Creators: Get high-converting 'Pros vs Cons' and persuasive angles to use in your content. Copy with one click.",
        content: (
            <div className="h-full w-full bg-white border border-gray-100 flex flex-col p-8 relative">
                <div className="absolute top-4 right-4"><Copy size={16} className="text-gray-400" /></div>
                <div className="text-xs font-bold text-blue-600 mb-4 uppercase tracking-wider">Creator Summary</div>
                <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="text-xs font-bold text-green-700 mb-1">Why they buy</div>
                        <div className="text-xs text-green-800">"Unbeatable noise cancellation for the price point."</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-xs font-bold text-red-700 mb-1">Deal breaker</div>
                        <div className="text-xs text-red-800">"Mic quality is poor for outdoor calls."</div>
                    </div>
                </div>
                <button className="mt-auto w-full py-2 bg-slate-900 text-white rounded-lg text-sm font-bold">Copy for Social</button>
            </div>
        ),
    },
];

export default function LandingPage() {
    return (
        <Suspense fallback={<div>Loading....</div>}>
            <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
                <Navbar />
                <div className="relative overflow-hidden">
                    {/* <BackgroundRippleEffect /> */}
                    <header className="relative z-10">
                        <HeroSection />
                    </header>
                </div>

                {/* <LiveDemo /> */}

                <Footer />
            </main>
        </Suspense>
    );
}
