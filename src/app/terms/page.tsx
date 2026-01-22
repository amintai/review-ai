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
                            By accessing or using ReviewAI ("Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of those changes.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ReviewAI is an AI-powered platform that helps businesses manage their online reputation by generating professional responses to customer reviews. The Service integrates with Google Business Profile to fetch reviews and allows users to post AI-generated replies directly.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>You must provide accurate and complete information when creating an account.</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li>You agree to use the Service only for lawful purposes and in accordance with these Terms.</li>
                            <li>You are solely responsible for reviewing and approving AI-generated content before posting.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Google Integration</h2>
                        <p className="text-gray-600 leading-relaxed">
                            By connecting your Google Business Profile, you authorize ReviewAI to access your business reviews, respond to reviews on your behalf, and perform related actions. You may revoke this access at any time through your Google account settings.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All content, features, and functionality of the Service are owned by ReviewAI and are protected by international copyright, trademark, and other intellectual property laws. AI-generated responses created for your use become your property once generated.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ReviewAI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service. We do not guarantee the accuracy, appropriateness, or effectiveness of AI-generated content. You agree to review all content before posting.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Termination</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
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
