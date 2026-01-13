"use client";

import { ShieldCheck, Lock, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityBadgeProps {
    className?: string;
    variant?: 'compact' | 'full';
}

export default function SecurityBadge({ className, variant = 'compact' }: SecurityBadgeProps) {
    if (variant === 'compact') {
        return (
            <div className={cn("flex items-center gap-2 text-xs text-gray-400 font-medium", className)}>
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>AES-256 Encrypted</span>
                <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                <span>SSO Secured</span>
            </div>
        );
    }

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4", className)}>
            <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900">Token Sovereignty</h4>
                    <p className="text-xs text-gray-600 mt-1">We never store passwords. Google API access is revoked automatically when you disconnect.</p>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50/50 rounded-2xl border border-green-100">
                <div className="p-2 bg-green-100 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900">Enterprise Encryption</h4>
                    <p className="text-xs text-gray-600 mt-1">Your review data is encrypted at rest using AES-256 standards, backed by Supabase.</p>
                </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                <div className="p-2 bg-purple-100 rounded-lg">
                    <ShieldAlert className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-900">Privacy First</h4>
                    <p className="text-xs text-gray-600 mt-1">GDPR compliant infrastructure. Your data is used only to generate responses, never sold.</p>
                </div>
            </div>
        </div>
    );
}
