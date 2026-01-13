"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function GoogleConnect({ isConnected }: { isConnected: boolean }) {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                alert("Please sign in first");
                return;
            }

            const res = await fetch('/api/auth/google/init', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to initiate connection');
            }

            const { url } = await res.json();
            window.location.href = url; // Redirect to Google
        } catch (error: any) {
            alert(error.message);
            setLoading(false);
        }
    };

    if (isConnected) {
        return (
            <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <span className="font-medium">✓ Google Account Connected</span>
            </div>
        );
    }

    return (
        <button
            onClick={handleConnect}
            disabled={loading}
            className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
        >
            {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
            ) : (
                <img src="https://www.google.com/favicon.ico" alt="G" className="h-4 w-4" />
            )}
            <span>Connect Google Business Profile</span>
        </button>
    );
}
