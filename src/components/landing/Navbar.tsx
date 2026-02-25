"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { trackEvent } from "@/lib/analytics";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Navbar() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const ctaLink = user ? "/dashboard" : "/login?next=/dashboard";

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <Link href="/" className="transition-transform hover:scale-105">
                    <Logo size="md" />
                </Link>

                <div className="flex items-center space-x-4">
                    <Link href={ctaLink} onClick={() => trackEvent('navbar_clicked', { type: 'go_to_dashboard' })}>
                        <Button className='cursor-pointer bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-6 rounded-xl transition-all active:scale-95 shadow-md hover:shadow-lg'>
                            Analyze Free →
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
