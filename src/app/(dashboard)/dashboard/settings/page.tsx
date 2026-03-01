"use client";

import { useEffect, useState } from 'react';
import { ShieldCheck, CreditCard, User, Mail, Globe, CheckCircle2, Clock, Zap, UserCircle2 } from 'lucide-react';
import PersonaSelector from '@/components/ui/PersonaSelector';
import type { PersonaId } from '@/lib/personas';
import { getPersona } from '@/lib/personas';
import type { UserProfile } from '@/types/user';

export default function SettingsPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activePersona, setActivePersona] = useState<PersonaId | null>(null);
    const [personaSaving, setPersonaSaving] = useState(false);
    const [personaSaved, setPersonaSaved] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Fetch complete user profile from our API
                const res = await fetch('/api/user/profile');
                if (!res.ok) {
                    throw new Error('Failed to fetch profile');
                }
                
                const profileData = await res.json();
                setProfile(profileData);
                setActivePersona(profileData.default_persona);
            } catch (e) {
                console.error('Error fetching profile:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handlePersonaChange = async (id: PersonaId | null) => {
        setActivePersona(id);
        setPersonaSaving(true);
        setPersonaSaved(false);
        try {
            await fetch('/api/user/persona', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ persona_id: id }),
            });
            setPersonaSaved(true);
            setTimeout(() => setPersonaSaved(false), 2500);
        } finally {
            setPersonaSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings & Billing</h1>
                <p className="text-gray-500 mt-1">Manage your account, subscription, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <User className="h-5 w-5 mr-2 text-blue-600" />
                                Account Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Full Name</label>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="font-medium text-gray-900">{profile?.full_name || 'Not set'}</div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Email Address</label>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <div className="font-medium text-gray-900">{profile?.email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <UserCircle2 className="h-5 w-5 mr-2 text-violet-600" />
                                Buyer Profile
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">Your verdicts will be personalized automatically on every product analysis.</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <PersonaSelector
                                value={activePersona}
                                isPro={profile?.is_pro ?? false}
                                onChange={handlePersonaChange}
                                onUpgradeRequired={() => window.location.href = '/pricing'}
                            />
                            {activePersona && (() => {
                                const p = getPersona(activePersona);
                                const Icon = p?.icon;
                                return p && Icon ? (
                                    <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                                        <Icon size={13} style={{ color: p.color }} />
                                        <span><strong className="text-gray-700">{p.label}:</strong> {p.description}</span>
                                    </div>
                                ) : null;
                            })()}
                            {(personaSaving || personaSaved) && (
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <CheckCircle2 size={12} />
                                    {personaSaving ? 'Saving...' : 'Buyer profile saved!'}
                                </p>
                            )}
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <Globe className="h-5 w-5 mr-2 text-orange-600" />
                                Browser Extension
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-orange-100 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">ReviewAI Extension</div>
                                        <div className="text-xs text-gray-500">
                                            Status: Connected & Active
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center">
                                    <CheckCircle2 className="h-3 w-3 mr-1" /> Linked
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Plan Card */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden ring-4 ring-orange-50/50">
                        <div className="p-6 border-b border-orange-50 bg-orange-50/30">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center">
                                <ShieldCheck className="h-5 w-5 mr-2 text-orange-600" />
                                Current Plan
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <div className="text-3xl font-black text-gray-900">{profile?.is_pro ? 'Pro' : 'Starter'}</div>
                                <div className="text-sm text-gray-500 mt-1">{profile?.is_pro ? '$9/month' : 'Free tier'}</div>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                    {profile?.is_pro ? 'Unlimited AI Analysis' : '10 AI Analysis / month'}
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                    {profile?.is_pro ? 'Priority Processing' : 'Standard Speed'}
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                    Priority Email Support
                                </li>
                            </ul>

                            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                                {profile?.is_pro ? 'Manage Subscription' : 'Upgrade to Pro'}
                            </button>
                        </div>
                    </section>

                    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center space-y-2">
                        <CreditCard className="h-6 w-6 text-gray-400 mx-auto" />
                        <div className="text-sm font-bold text-gray-900">Billing History</div>
                        <div className="text-xs text-gray-400 flex items-center justify-center italic">
                            <Clock className="h-3 w-3 mr-1" /> Coming Soon
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
