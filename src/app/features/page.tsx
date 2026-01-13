import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Zap, Globe, Palette, BarChart3, Clock, Shield, Sparkles, MessageSquare } from 'lucide-react';

export const metadata = {
    title: 'Features | ReviewAI',
    description: 'Discover all the powerful features of ReviewAI for managing your online reputation.',
};

const features = [
    {
        icon: Zap,
        title: "Instant AI Responses",
        description: "Generate 3 unique, professionally crafted responses to any review in under 5 seconds. Our AI understands context, sentiment, and customer intent.",
        color: "bg-yellow-100 text-yellow-600"
    },
    {
        icon: Globe,
        title: "Google Business Integration",
        description: "Connect your Google Business Profile with one click. Fetch reviews automatically and post responses directly without leaving ReviewAI.",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: Palette,
        title: "Tone Customization",
        description: "Choose from Professional, Friendly, Empathetic, or Witty tones. Match your brand voice perfectly for every customer interaction.",
        color: "bg-purple-100 text-purple-600"
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Track your review response rate, sentiment trends, and customer satisfaction metrics. Make data-driven decisions for your business.",
        color: "bg-green-100 text-green-600"
    },
    {
        icon: Clock,
        title: "Time Savings",
        description: "Save an average of 5 hours per week on review management. Focus on running your business while we handle the responses.",
        color: "bg-orange-100 text-orange-600"
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Your data is encrypted at rest and in transit. SOC 2 compliant infrastructure ensures your business information stays protected.",
        color: "bg-red-100 text-red-600"
    },
    {
        icon: Sparkles,
        title: "Smart Suggestions",
        description: "Our AI learns from your edits and preferences to provide increasingly personalized response suggestions over time.",
        color: "bg-cyan-100 text-cyan-600"
    },
    {
        icon: MessageSquare,
        title: "Multi-Platform Support",
        description: "Coming soon: Support for Yelp, TripAdvisor, Facebook Reviews, and more. Manage all your reviews from one unified dashboard.",
        color: "bg-pink-100 text-pink-600"
    }
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-24 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Everything You Need to <br />
                        <span className="text-blue-600">Manage Your Reputation</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        ReviewAI combines the power of artificial intelligence with seamless integrations to help you respond to reviews faster and better.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-6`}>
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to transform your review management?</h2>
                    <p className="text-blue-100 mb-8 text-lg">Start for free. No credit card required.</p>
                    <a
                        href="/login"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                    >
                        Get Started Free
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
