import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata = {
    title: 'Terms of Service | ReviewAI',
    description: 'Terms of Service for using ReviewAI platform.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                <p className="text-gray-500 mb-12">Last updated: January 12, 2026</p>

                <div className="prose prose-gray max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By installing the ReviewAI Browser Extension or using the ReviewAI platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of those changes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ReviewAI provides a browser extension and platform designed to analyze e-commerce product reviews (primarily on Amazon) using artificial intelligence. The Service provides trust scores, sentiment analysis, and creator-focused summaries to help users "Shop Smarter."
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>You must use the browser extension in accordance with the policies of the e-commerce platforms you visit.</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li>You agree not to use the Service for any automated data scraping beyond the intended use through the official browser extension interface.</li>
                            <li>AI-generated insights are for informational purposes; we do not guarantee the absolute accuracy of sentiment or trust scores.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Browser Extension & E-commerce Integration</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ReviewAI interacts with product pages to summarize reviews and provide data-driven insights. While we strive for accuracy, our service depends on the data provided by third-party platforms. We are not affiliated with, endorsed by, or sponsored by Amazon.com or any other e-commerce platform.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All algorithms, design elements, and functionality of the Service are owned by ReviewAI. The "Trust Score" and "Buy/Skip Verdict" methodologies are proprietary. You may use generated creator summaries for your own content creation purposes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ReviewAI shall not be liable for any purchasing decisions made based on the AI analysis. The service is provided "as is" and "as available." We do not guarantee that the extension will always be compatible with changes made by third-party e-commerce sites.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Termination</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may terminate or suspend your access to the Service immediately for conduct that we believe violates these Terms or is harmful to our systems or reputation.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms, please contact us at{' '}
                            <a href="mailto:amin.tai.work@gmail.com" className="text-blue-600 hover:underline">
                                amin.tai.work@gmail.com
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
