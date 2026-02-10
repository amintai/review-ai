"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ArrowRight, Loader2, CheckCircle, Mail, Lock } from 'lucide-react';
import SecurityBadge from '@/components/ui/SecurityBadge';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function LoginClient() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const searchParams = useSearchParams();
    const next = searchParams.get('next') || '/dashboard';
    const isReportAccess = next.includes('/report/');
    const redirectUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectUrl,
                scopes: 'email profile',
            },
        });

        if (error) {
            alert(error.message);
            setGoogleLoading(false);
        }
    };

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectUrl,
            },
        });

        console.log("error", error)

        if (error) {
            alert(error.message);
        } else {
            setSent(true);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block transition-transform hover:scale-105">
                        <Logo size="lg" />
                    </Link>
                </div>

                {/* Report Access Notice */}
                {isReportAccess && (
                    <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                                <Lock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-orange-900 mb-1">Report Access Required</h3>
                                <p className="text-sm text-orange-800 leading-relaxed">
                                    Sign in to view your full AI analysis report with detailed insights and recommendations.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {isReportAccess ? 'Sign in to continue' : 'Welcome back'}
                        </h2>
                        <p className="text-gray-500">
                            {isReportAccess
                                ? 'Access your report and save it to your dashboard'
                                : 'Sign in to manage your reviews securely'}
                        </p>
                    </div>

                    {sent ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-7 w-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
                            <p className="text-gray-500 mt-2 text-sm">
                                We sent a magic link to <span className="font-semibold">{email}</span>
                            </p>
                            <button
                                onClick={() => { setSent(false); setShowEmailForm(false); }}
                                className="mt-6 text-sm text-blue-600 hover:text-blue-500"
                            >
                                ← Back to login
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Google Sign In - Primary */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                {googleLoading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </>
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or</span>
                                </div>
                            </div>

                            {showEmailForm ? (
                                <form onSubmit={handleMagicLink} className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <>
                                                Send Magic Link <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowEmailForm(false)}
                                        className="w-full text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        ← Back
                                    </button>
                                </form>
                            ) : (
                                <button
                                    onClick={() => setShowEmailForm(true)}
                                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Mail className="h-5 w-5" />
                                    Continue with Email
                                </button>
                            )}
                        </div>
                    )}

                    {/* Info */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <SecurityBadge variant="compact" className="justify-center mb-4" />
                        <p className="text-xs text-gray-400">
                            By signing in, you agree to our{' '}
                            <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link>
                            {' '}and{' '}
                            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}