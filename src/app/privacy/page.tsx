import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata = {
    title: 'Privacy Policy | ReviewAI',
    description: 'Privacy Policy for ReviewAI - How we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last updated: January 12, 2026</p>

                <div className="prose prose-gray max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We collect information necessary to provide e-commerce analysis, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li><strong>Account Information:</strong> Email address and name when you register to save reports or access creator features.</li>
                            <li><strong>Extension Usage Data:</strong> The URL of the product page you are viewing (e.g., Amazon product pages) to trigger analysis.</li>
                            <li><strong>Public Review Data:</strong> We fetch and analyze publicly available reviews and product descriptions to generate scores.</li>
                            <li><strong>Interaction Data:</strong> How you interact with the extension overlay and dashboard.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>To provide real-time AI analysis of product quality and review authenticity.</li>
                            <li>To generate "Trust Scores" and "Buy/Skip" verdicts.</li>
                            <li>To create affiliate-ready summaries for content creators.</li>
                            <li>To improve our AI models' understanding of consumer sentiment.</li>
                            <li>To communicate with you about your account or new features.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Sharing</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not sell your personal browsing history. We may share data with:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                            <li><strong>Service Providers:</strong> Cloud hosting (e.g., Supabase, Vercel) and AI processing partners.</li>
                            <li><strong>Legal Requirements:</strong> Only when required by law or to protect our legal rights.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We implement industry-standard security measures to protect your account data. The browser extension only reads data when you are on supported e-commerce domains.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li><strong>Access & Export:</strong> Request a copy of your saved reports.</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and associated data.</li>
                            <li><strong>Opt-out:</strong> Disable the extension at any time from your browser settings.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use minimal cookies for authentication and performance analytics. We do not use cookies to track you across unrelated third-party websites.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Children&apos;s Privacy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our Service is not intended for children under 16. We do not knowingly collect personal information from children.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For privacy-related inquiries, contact us at{' '}
                            <a href="mailto:privacy@reviewai.com" className="text-blue-600 hover:underline">
                                privacy@reviewai.com
                            </a>.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>
            <Footer />
        </main>
    );
}
