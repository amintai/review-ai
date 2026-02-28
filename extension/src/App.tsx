import { useEffect, useMemo, useState } from 'react';
import {
    AlertCircle,
    ArrowRight,
    Check,
    ExternalLink,
    ShieldAlert,
    X,
    Zap
} from 'lucide-react';
import { isAmazonDomain, isAmazonProductUrl, REVIEWAI_BASE_URL } from './lib/config';
import './App.css';

type SessionResponse = {
    session?: {
        user?: {
            email?: string;
        };
    } | null;
    error?: string;
};

const openExternal = (path = '') => {
    window.open(`${REVIEWAI_BASE_URL}${path}`, '_blank', 'noopener,noreferrer');
};

const hasChromeExtensionApi =
    typeof chrome !== 'undefined' && Boolean(chrome.runtime?.id);
const extensionUnavailableMessage =
    'Run this UI from the installed Chrome extension popup, not a regular browser tab.';

function App() {
    const [session, setSession] = useState<SessionResponse['session']>(null);
    const [loading, setLoading] = useState<boolean>(hasChromeExtensionApi);
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(
        hasChromeExtensionApi ? null : extensionUnavailableMessage
    );

    useEffect(() => {
        if (!hasChromeExtensionApi) {
            return;
        }

        const checkSession = () => {
            chrome.runtime.sendMessage({ action: 'get_session' }, (response: SessionResponse | undefined) => {
                if (chrome.runtime.lastError) {
                    setError(chrome.runtime.lastError.message || 'Could not reach extension background service.');
                    setLoading(false);
                    return;
                }

                setSession(response?.session || null);
                if (response?.error) {
                    setError(response.error);
                }
                setLoading(false);
            });
        };

        // Check initially
        checkSession();

        // Check again when popup regains focus (e.g., after logging in)
        window.addEventListener('focus', checkSession);

        if (chrome.tabs?.query) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const url = tabs[0]?.url ?? '';
                setCurrentUrl(url);
            });
        }

        return () => {
            window.removeEventListener('focus', checkSession);
        };
    }, []);

    const isAmazon = useMemo(() => isAmazonDomain(currentUrl), [currentUrl]);
    const isAmazonProduct = useMemo(() => isAmazonProductUrl(currentUrl), [currentUrl]);

    if (loading) {
        return (
            <div className="w-[380px] min-h-[500px] flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center">
                        <Zap size={24} className="text-primary animate-pulse" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Loading ReviewAI...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[380px] bg-background min-h-[500px] flex flex-col font-sans">
            {/* Header */}
            <header className="bg-card border-b border-border p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                            <ShieldAlert size={20} className="text-primary-foreground" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-foreground tracking-tight leading-none">ReviewAI</h1>
                            <p className="text-[11px] text-muted-foreground font-medium mt-1">Amazon Intelligence</p>
                        </div>
                    </div>
                    {session ? (
                        <button onClick={() => openExternal('/dashboard')} className="text-xs font-semibold text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1">
                            Dashboard <ArrowRight size={12} />
                        </button>
                    ) : (
                        <button onClick={() => openExternal('/login')} className="text-xs font-bold text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-md transition-colors">
                            Sign In
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-1 p-5 space-y-4">
                {error ? (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs flex items-start gap-2 shadow-sm">
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                ) : null}

                {/* Main Analysis Section (Available to everyone) */}
                {isAmazonProduct ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Zap size={16} className="text-primary" strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-foreground text-sm mb-1">Ready for Analysis</h3>
                                    <p className="text-xs text-secondary leading-relaxed">
                                        Get an intelligent verdict on this product with confidence scoring.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                                    const tabId = tabs[0]?.id;
                                    if (tabId) {
                                        chrome.tabs.sendMessage(tabId, { action: 'trigger_analysis' });
                                        window.close();
                                    }
                                });
                            }}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <Zap size={18} />
                            Analyze Product
                        </button>

                        {!session && (
                            <div className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-lg text-center cursor-pointer hover:bg-orange-100 transition-colors" onClick={() => openExternal('/login')}>
                                <p className="text-xs text-orange-800">
                                    <span className="font-bold">Want to save this report?</span><br />
                                    Sign in to ReviewAI to keep your history.
                                </p>
                            </div>
                        )}

                        {/* Verdict Info Cards */}
                        <div className="border-t border-border pt-4 mt-2">
                            <p className="text-[11px] font-bold text-muted-foreground uppercase mb-3 tracking-wider">Verdict Scale</p>
                            <div className="space-y-2">
                                <div className="p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Check size={14} className="text-[#10B981]" strokeWidth={3} />
                                        <span className="font-bold text-[#065F46] text-xs">BUY</span>
                                    </div>
                                    <p className="text-[11px] text-[#047857]">Excellent product worth purchasing</p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertCircle size={14} className="text-[#F59E0B]" strokeWidth={3} />
                                        <span className="font-bold text-[#92400E] text-xs">CAUTION</span>
                                    </div>
                                    <p className="text-[11px] text-[#B45309]">Mixed reviews, consider carefully</p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <X size={14} className="text-[#EF4444]" strokeWidth={3} />
                                        <span className="font-bold text-[#991B1B] text-xs">SKIP</span>
                                    </div>
                                    <p className="text-[11px] text-[#B91C1C]">Poor reviews, not recommended</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : isAmazon ? (
                    <div className="text-center py-10 px-4">
                        <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <AlertCircle size={28} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-bold text-foreground mb-1.5 text-sm">Not a Product Page</h3>
                        <p className="text-xs text-secondary mb-5 leading-relaxed max-w-[240px] mx-auto">
                            Navigate to an Amazon product page to analyze reviews.
                        </p>
                        <button
                            onClick={() => chrome.tabs?.reload()}
                            className="inline-flex items-center justify-center gap-2 text-primary text-xs font-bold hover:underline"
                        >
                            Refresh Page
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-10 px-4">
                        <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <ExternalLink size={28} className="text-muted-foreground" />
                        </div>
                        <h3 className="font-bold text-foreground mb-1.5 text-sm">Not on Amazon</h3>
                        <p className="text-xs text-secondary mb-5 leading-relaxed max-w-[240px] mx-auto">
                            Visit an Amazon product page to get an intelligent verdict.
                        </p>
                        <button
                            onClick={() => window.open('https://amazon.com', '_blank', 'noopener,noreferrer')}
                            className="inline-flex items-center justify-center gap-2 bg-card border border-border px-4 py-2 rounded-lg text-foreground text-xs font-bold hover:bg-gray-50 shadow-sm"
                        >
                            Open Amazon <ArrowRight size={14} />
                        </button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="p-3 border-t border-border bg-card flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_4px_rgba(16,185,129,0.5)]"></div>
                    <span className="font-semibold">System Active</span>
                </div>
                {session?.user?.email && (
                    <span className="truncate max-w-[150px] font-medium" title={session.user.email}>
                        {session.user.email}
                    </span>
                )}
            </footer>
        </div>
    );
}

export default App;
