import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ | ReviewAI - Questions about Amazon Review Analysis',
    description: 'Find answers to common questions about ReviewAI verdicts, trust scores, Amazon integration, and our AI-powered shopping assistant.',
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
