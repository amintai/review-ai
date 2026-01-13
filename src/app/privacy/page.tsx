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
                            We collect information you provide directly, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li><strong>Account Information:</strong> Email address, name, and business details when you register.</li>
                            <li><strong>Google Business Data:</strong> Business reviews, location information, and responses when you connect your Google Business Profile.</li>
                            <li><strong>Usage Data:</strong> How you interact with our Service, including features used and preferences.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>To provide and maintain the ReviewAI Service.</li>
                            <li>To generate AI-powered responses to your customer reviews.</li>
                            <li>To improve and personalize your experience.</li>
                            <li>To communicate with you about updates, support, and promotional offers.</li>
                            <li>To detect, prevent, and address technical issues or fraud.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Data Sharing</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We do not sell your personal information. We may share data with:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                            <li><strong>Service Providers:</strong> Third parties that help us operate our Service (e.g., hosting, analytics).</li>
                            <li><strong>Google:</strong> To enable integration with Google Business Profile.</li>
                            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Depending on your location, you may have the following rights:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li><strong>Access:</strong> Request a copy of your personal data.</li>
                            <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
                            <li><strong>Deletion:</strong> Request deletion of your data.</li>
                            <li><strong>Portability:</strong> Request transfer of your data to another service.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookies through your browser settings.
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
