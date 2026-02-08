"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <Link href="/" className="transition-transform hover:scale-105">
                    <Logo size="md" />
                </Link>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/login"
                        className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                        onClick={() => trackEvent('navbar_clicked', { type: 'signin' })}
                    >
                        Sign in
                    </Link>
                    <Link href="/login" onClick={() => trackEvent('navbar_clicked', { type: 'get_started' })}>
                        <Button className='cursor-pointer bg-orange-600 hover:bg-orange-700 text-white'>Add to Chrome</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
