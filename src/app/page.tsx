import dynamic from 'next/dynamic';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import "@radix-ui/themes/styles.css";
import "./styles/animate.css";
import "./styles/dashboard-theme.css";
import { Suspense } from 'react';

// Dynamic imports for optimized loading
const HeroSection = dynamic(() => import("@/components/landing/HeroSection"), {
    ssr: true,
    loading: () => <div className="h-[600px] w-full bg-slate-50 animate-pulse" />
});

const ProblemSection = dynamic(() => import("@/components/landing/ProblemSection"), {
    ssr: true,
    loading: () => <div className="h-[500px] w-full bg-white animate-pulse" />
});

const SolutionSection = dynamic(() => import("@/components/landing/SolutionSection"), {
    ssr: true,
    loading: () => <div className="h-[500px] w-full bg-slate-50 animate-pulse" />
});

const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks"), {
    ssr: true,
    loading: () => <div className="h-[500px] w-full bg-white animate-pulse" />
});

const FAQSection = dynamic(() => import("@/components/landing/FAQSection"), {
    ssr: true,
    loading: () => <div className="h-[500px] w-full bg-slate-50 animate-pulse" />
});

const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"), {
    ssr: true,
    loading: () => <div className="h-[400px] w-full bg-white animate-pulse" />
});

export default function LandingPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading ReviewAI...</div>}>
            <main className="min-h-screen bg-white font-sans selection:bg-orange-100">
                <Navbar />

                <header className="relative pt-8">
                    <HeroSection />
                </header>

                <ProblemSection />
                <SolutionSection />
                <HowItWorks />
                <FAQSection />
                <FinalCTA />

                <Footer />
            </main>
        </Suspense>
    );
}
