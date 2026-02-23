import { useEffect, useMemo, useState } from 'react';
import {
    AlertCircle,
    ArrowRight,
    Check,
    ExternalLink,
    LogIn,
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

        if (chrome.tabs?.query) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const url = tabs[0]?.url ?? '';
                setCurrentUrl(url);
            });
        }
    }, []);

    const isAmazon = useMemo(() => isAmazonDomain(currentUrl), [currentUrl]);
    const isAmazonProduct = useMemo(() => isAmazonProductUrl(currentUrl), [currentUrl]);

    if (loading) {
        return (
            <div className="w-[380px] min-h-[500px] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gray-900 flex items-center justify-center">
                        <Zap size={24} className="text-white animate-pulse" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Loading ReviewAI...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[380px] bg-white min-h-[500px] flex flex-col font-sans">
            {/* Header */}
            <header className="bg-gray-900 text-white p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                        <ShieldAlert size={22} className="text-white" strokeWidth={2.2} />
                    </div>
                    <div>
                        <h1 className="text-base font-bold tracking-tight">ReviewAI</h1>
                        <p className="text-[11px] text-gray-400 font-medium">Amazon Intelligence</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-5 space-y-4">
                {error ? (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs flex items-start gap-2 shadow-sm">
                        <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                ) : null}

                {!session ? (
                    <div className="text-center py-12 px-4">
                        <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <ShieldAlert size={32} className="text-white" strokeWidth={2.2} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Welcome</h2>
                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                            Sign in to get intelligent verdicts on Amazon products
                        </p>
                        <button
                            onClick={() => {
                                openExternal(`/login?next=${encodeURIComponent('/dashboard')}`);
                            }}
                            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                        >
                            <LogIn size={16} /> Sign In
                        </button>
                        <p className="text-xs text-gray-400 mt-4">
                            New user? <button onClick={() => openExternal('/login')} className="text-gray-700 font-semibold hover:underline">Create account</button>
                        </p>
                    </div>
                ) : (
                    <>
                        {/* User Info */}
                        <div className="text-xs text-gray-500 font-medium">
                            Signed in as <span className="text-gray-700 font-semibold">{session.user?.email || 'User'}</span>
                        </div>

                        {/* Main Analysis Section */}
                        {isAmazonProduct ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Zap size={16} className="text-white" strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">Product Ready for Analysis</h3>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                Get an intelligent verdict on this Amazon product with confidence scoring
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
                                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                                >
                                    <Zap size={18} />
                                    Analyze Product
                                </button>

                                {/* Verdict Info Cards */}
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Verdict Scale</p>
                                    <div className="space-y-2">
                                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Check size={14} className="text-green-600" strokeWidth={3} />
                                                <span className="font-bold text-green-900 text-xs">BUY</span>
                                            </div>
                                            <p className="text-xs text-green-700">Excellent product worth purchasing</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertCircle size={14} className="text-amber-600" strokeWidth={3} />
                                                <span className="font-bold text-amber-900 text-xs">CAUTION</span>
                                            </div>
                                            <p className="text-xs text-amber-700">Mixed reviews, consider carefully</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                                            <div className="flex items-center gap-2 mb-1">
                                                <X size={14} className="text-red-600" strokeWidth={3} />
                                                <span className="font-bold text-red-900 text-xs">SKIP</span>
                                            </div>
                                            <p className="text-xs text-red-700">Poor reviews, not recommended</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : isAmazon ? (
                            <div className="text-center py-8 px-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <AlertCircle size={24} className="text-gray-400" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Not a Product Page</h3>
                                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                    Navigate to an Amazon product page to get started
                                </p>
                                <button
                                    onClick={() => chrome.tabs?.reload()}
                                    className="text-gray-700 text-xs font-semibold hover:text-gray-900 hover:underline"
                                >
                                    Refresh Page
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-8 px-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <ExternalLink size={24} className="text-gray-400" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1 text-sm">Not on Amazon</h3>
                                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                    Visit an Amazon product page to analyze
                                </p>
                                <button
                                    onClick={() => window.open('https://amazon.com', '_blank', 'noopener,noreferrer')}
                                    className="inline-flex items-center justify-center gap-2 text-gray-700 text-xs font-semibold hover:text-gray-900"
                                >
                                    Open Amazon <ArrowRight size={12} />
                                </button>
                            </div>
                        )}

                        {/* Quick Link */}
                        {isAmazonProduct && (
                            <button
                                onClick={() => openExternal('/dashboard')}
                                className="w-full px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group border border-gray-200"
                            >
                                <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">View Dashboard</span>
                                <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-700" />
                            </button>
                        )}
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="p-3 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="font-medium">Active</span>
                </div>
                <span className="font-semibold">v1.1.0</span>
            </footer>
        </div>
    );
}

export default App;
