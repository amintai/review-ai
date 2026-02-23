import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Zap, Shield, Sparkles, BarChart3, Clock, Globe, Search, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
    title: 'Features | ReviewAI - Smart Amazon Product Intelligence',
    description: 'Explore the powerful features of ReviewAI: Instant BUY/SKIP verdicts, fake review detection, confidence scores, and seamless browser integration.',
};

const features = [
    {
        icon: Zap,
        title: "Instant AI Verdicts",
        description: "Get an immediate BUY, SKIP, or CAUTION verdict for any Amazon product. Our AI analyzes thousands of reviews in seconds so you don't have to.",
        color: "bg-orange-100 text-orange-600"
    },
    {
        icon: Shield,
        title: "Fake Review Detection",
        description: "Identify suspicious review patterns and incentivized ratings. We cut through the noise to give you the real truth about product quality.",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: Search,
        title: "Deeper Sentiment Hub",
        description: "Understand exactly WHY a product is good or bad. We cluster reviews into themes like durability, ease of use, and value for money.",
        color: "bg-purple-100 text-purple-600"
    },
    {
        icon: BarChart3,
        title: "Confidence Scores",
        description: "Every verdict comes with a confidence score based on review volume, freshness, and authenticity signals. Shop with data-backed certainty.",
        color: "bg-green-100 text-green-600"
    },
    {
        icon: MousePointer2,
        title: "Browser Extension",
        description: "Our AI lives where you shop. Get verdicts directly on Amazon product pages without ever leaving your browser tab.",
        color: "bg-amber-100 text-amber-600"
    },
    {
        icon: Clock,
        title: "Time-Saving Summaries",
        description: "Stop spending 20 minutes reading reviews. Get a 5-second summary of the 'Pros', 'Cons', and 'Deal Breakers' instantly.",
        color: "bg-red-100 text-red-600"
    },
    {
        icon: Sparkles,
        title: "Creator-Ready Insights",
        description: "Perfect for UGC creators and affiliate marketers. Get accurate, evidence-backed summaries for your content in one click.",
        color: "bg-cyan-100 text-cyan-600"
    },
    {
        icon: Globe,
        title: "Multi-Platform Support",
        description: "Optimized for Amazon (US, UK, DE, etc.), Walmart, and eBay. One tool to master all your e-commerce shopping decisions.",
        color: "bg-pink-100 text-pink-600"
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                        Everything You Need to <br />
                        <span className="text-orange-600">Shop Smarter</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        ReviewAI combines advanced LLMs with e-commerce data to help you avoid bad products and buy with confidence.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                        >
                            <div className={`inline-flex p-4 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop guessing. Start knowing.</h2>
                        <p className="text-gray-400 mb-10 text-lg">Add the ReviewAI extension to your browser today.</p>
                        <Link href="/login">
                            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 h-14 rounded-2xl text-lg font-bold">
                                Add to Chrome — It's Free
                            </Button>
                        </Link>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -ml-32 -mb-32"></div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
