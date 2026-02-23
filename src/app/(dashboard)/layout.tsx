'use client';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import StoreProvider from '@/app/StoreProvider';
import { Spotlight } from '@/components/ui/spotlight';
import FeedbackModalRoot from './FeedbackModalRoot';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <div className="relative min-h-screen bg-background text-foreground flex selection:bg-primary/10 selection:text-primary">
                <Spotlight />
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0 bg-background transition-[margin,width] duration-300 ease-in-out">
                    <Header />
                    <main className="flex-1 overflow-y-auto custom-scrollbar">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <FeedbackModalRoot />
        </StoreProvider>
    );
}
