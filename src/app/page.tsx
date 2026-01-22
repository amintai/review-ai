import dynamic from 'next/dynamic';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import Footer from '@/components/landing/Footer';
import "@radix-ui/themes/styles.css";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// Dynamic imports for heavy or below-the-fold components
const StickyScroll = dynamic(() => import("@/components/ui/sticky-scroll-reveal").then(mod => mod.StickyScroll), {
    ssr: true,
    loading: () => <div className="h-[500px] w-full bg-slate-50/50 animate-pulse rounded-3xl" />
});

const LiveDemo = dynamic(() => import('@/components/landing/LiveDemo'), {
    ssr: true,
    loading: () => <div className="h-[600px] w-full bg-white animate-pulse rounded-3xl border border-gray-100" />
});

const content = [
    {
        title: "Instant AI Replies",
        description:
            "Paste any review and get 3 polished, human-like responses in seconds. Managing reviews has never been this easy and fast.",
        content: (
            <div className="h-full w-full flex flex-col items-center justify-center text-white bg-blue-500/10 p-6">
                <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-8 w-8 rounded-full bg-gray-100"></span>
                        <div className="h-2 w-24 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-2 w-full bg-gray-50 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-50 rounded"></div>
                </div>
                <div className="w-full bg-blue-50 rounded-lg border border-blue-100 p-4">
                    <div className="text-xs text-blue-600 font-medium mb-1">AI Generated Reply</div>
                    <div className="text-sm text-gray-600">&quot;Thank you for your feedback! We&apos;re glad you enjoyed your experience...&quot;</div>
                </div>
            </div>
        ),
    },
    {
        title: "Google Integration",
        description:
            "Connect your Business Profile to fetch and reply to reviews directly. Seamlessly integrate with your existing workflow.",
        content: (
            <div className="h-full w-full bg-gradient-to-br from-white to-gray-50 border border-gray-100 flex flex-col items-center justify-center p-6 text-center">
                <div className="h-16 w-16 bg-white rounded-xl shadow-lg flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                </div>
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Connected
                </div>
            </div>
        ),
    },
    {
        title: "Tone Customization",
        description:
            "Choose between Professional, Friendly, Empathetic, or Witty personas. Tailor your responses to fit your brand's voice perfectly.",
        content: (
            <div className="h-full w-full bg-slate-50 border border-gray-100 flex flex-col items-center justify-center p-8 gap-3">
                <button className="w-full bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-between group">
                    <span className="font-medium">Professional</span>
                    <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                </button>
                <button className="w-full bg-white border border-blue-500 text-blue-600 py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-between ring-2 ring-blue-50">
                    <span className="font-medium">Empathetic</span>
                    <div className="w-4 h-4 rounded-full border border-blue-500 bg-blue-500"></div>
                </button>
                <button className="w-full bg-white border border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-between group">
                    <span className="font-medium">Witty</span>
                    <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-blue-500 group-hover:bg-blue-500 transition-colors"></div>
                </button>
            </div>
        ),
    },
];

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
            <Navbar />
            <div className="relative overflow-hidden">
                <BackgroundRippleEffect />
                <header className="relative z-10">
                    <HeroSection />
                </header>
            </div>

            {/* Sticky Scroll Features */}
            <section id="features" className="py-20 w-full bg-slate-50/50">
                <div className="max-w-4xl mx-auto text-center mb-16 px-6">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Precision Review Management</h2>
                    <p className="text-gray-500 text-lg">Sophisticated tools designed to protect and grow your online reputation.</p>
                </div>

                {/* SEO Content Section */}
                <div className="max-w-4xl mx-auto px-6 mb-20 text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Why ReviewAI is the Best Review Management Software for Small Business</h3>
                    <div className="prose prose-lg text-gray-600 max-w-none">
                        <p className="mb-4">
                            In today's digital landscape, your <strong>Google Business Profile</strong> is your new storefront. 85% of consumers trust online reviews as much as personal recommendations.
                            However, managing reviews across multiple platforms like Google, Yelp, Facebook, and TripAdvisor can be overwhelming.
                        </p>
                        <p className="mb-4">
                            ReviewAI solves this by being the ultimate <strong>AI review response generator</strong>. We don't just use generic templates; our advanced AI analyzes the sentiment of every customer review
                            to craft personalized, professional, and human-sounding responses. This helps you:
                        </p>
                        <ul className="list-disc pl-6 mb-4 space-y-2">
                            <li><strong>Boost Local SEO:</strong> Regular activity and keyword-rich replies signal to Google that your business is active, improving your ranking in the "Map Pack".</li>
                            <li><strong>Save Time:</strong> What used to take hours now takes seconds. specific responses are generated instantly, allowing you to focus on running your business.</li>
                            <li><strong>Improve Customer Loyalty:</strong> A timely, empathetic response to a negative review can turn a frustrated customer into a loyal advocate.</li>
                        </ul>
                        <p>
                            Whether you are a restaurant owner, a dentist, or a real estate agent, ReviewAI provides the <strong>reputation management tools</strong> you need to scale your trust and credibility on autopilot.
                        </p>
                    </div>
                </div>

                <StickyScroll content={content} />
            </section>

            <LiveDemo />

            <Footer />
        </main>
    );
}
