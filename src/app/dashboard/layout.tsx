"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Layout, History, MessageCircle, Settings, CreditCard } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import clsx from 'clsx';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push('/login');
            } else {
                setUser(user);
            }
        };
        getUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const NavItem = ({ href, icon: Icon, label }: any) => (
        <Link
            href={href}
            className={clsx(
                "flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors",
                pathname === href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
            )}
        >
            <Icon className="h-5 w-5" />
            <span className="hidden md:block">{label}</span>
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <aside className="bg-white border-b md:border-b-0 md:border-r border-gray-200 md:w-64 flex-shrink-0">
                <div className="p-4 flex md:flex-col justify-between h-full">
                    <div className="flex items-center md:items-start space-x-2 md:space-x-0 md:space-y-8 flex-row md:flex-col">
                        <Link href="/" className="flex items-center space-x-2 pl-2 hover:opacity-80 transition-opacity">
                            <Logo size="sm" />
                            {/* <span className="text-xl font-bold text-gray-900 hidden md:block">ReviewAI</span> */}
                        </Link>

                        <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 w-full pl-0 md:pl-2 overflow-x-auto md:overflow-visible">
                            <NavItem href="/dashboard" icon={Layout} label="Generator" />
                            <NavItem href="/dashboard/reviews" icon={MessageCircle} label="Google Reviews" />
                            <NavItem href="/dashboard/history" icon={History} label="Response History" />
                            <NavItem href="/dashboard/settings" icon={Settings} label="Settings & Plan" />
                        </nav>
                    </div>

                    <div className="hidden md:block p-4 border-t border-gray-100">
                        <div className="text-xs text-gray-400 mb-2 truncate">{user.email}</div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium w-full"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="md:hidden flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors p-2"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
