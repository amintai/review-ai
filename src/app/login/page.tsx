"use client";

import { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function LoginPage() {

    return (
        <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading…</div>}>
            <LoginClient />
        </Suspense>
    );
}
