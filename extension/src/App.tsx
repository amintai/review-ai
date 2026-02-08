import { useEffect, useMemo, useState } from 'react';
import {
    AlertCircle,
    ArrowRight,
    ExternalLink,
    History,
    Home,
    LogIn,
    Settings,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    User
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
            <div className="w-[380px] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shadow-lg">
                        <Sparkles size={32} className="text-white animate-pulse" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Initializing ReviewAI...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[380px] bg-white min-h-[500px] flex flex-col font-sans">
            {/* Enhanced Header with Logo */}
            <header className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-5">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                            <ShieldCheck size={28} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-lg font-black text-white tracking-tight leading-none mb-1">
                                ReviewAI
                            </h1>
                            <p className="text-[11px] text-white/90 font-bold uppercase tracking-wider leading-none">
                                Amazon Intelligence
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Bar */}
            {session && (
                <nav className="flex border-b border-gray-100 bg-gray-50/50">
                    <button
                        onClick={() => openExternal('/')}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 transition-all"
                    >
                        <Home size={16} />
                        <span>Home</span>
                    </button>
                    <button
                        onClick={() => openExternal('/dashboard/history')}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 transition-all border-l border-gray-100"
                    >
                        <History size={16} />
                        <span>History</span>
                    </button>
                    <button
                        onClick={() => openExternal('/dashboard/settings')}
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold text-gray-600 hover:text-orange-600 hover:bg-orange-50/50 transition-all border-l border-gray-100"
                    >
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>
                </nav>
            )}

            <main className="flex-1 p-5 space-y-4">
                {error ? (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-3 shadow-sm">
                        <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{error}</span>
                    </div>
                ) : null}
                
                {!session ? (
                    <div className="text-center py-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                            <ShieldCheck size={40} className="text-orange-600" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-sm text-gray-600 mb-6 px-4 leading-relaxed">
                            Sign in to unlock instant AI verdicts and smart product analysis
                        </p>
                        <button
                            onClick={() => {
                                const nextUrl = isAmazonProduct
                                    ? `/chat?url=${encodeURIComponent(currentUrl)}`
                                    : '/chat';
                                openExternal(`/login?next=${encodeURIComponent(nextUrl)}`);
                            }}
                            className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-orange-700 hover:to-amber-600 transition-all shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-600/30"
                        >
                            <LogIn size={18} /> Sign In to Continue
                        </button>
                        <p className="text-xs text-gray-400 mt-4">
                            New user? <button onClick={() => openExternal('/login')} className="text-orange-600 font-semibold hover:underline">Create account</button>
                        </p>
                    </div>
                ) : (
                    <>
                        {/* User Info Card */}
                        <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                                <User size={20} strokeWidth={2.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Signed in as</div>
                                <div className="text-sm font-semibold text-gray-900 truncate">
                                    {session.user?.email || 'Logged in user'}
                                </div>
                            </div>
                        </div>

                        {/* Main Action Area */}
                        {isAmazonProduct ? (
                            <div className="relative overflow-hidden p-5 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-2xl border border-orange-200 shadow-sm">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 text-orange-800 font-bold mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                                            <ShoppingCart size={16} className="text-white" strokeWidth={2.5} />
                                        </div>
                                        <span>Product Ready</span>
                                    </div>
                                    <p className="text-sm text-orange-900/80 mb-5 leading-relaxed">
                                        Get an instant AI verdict with confidence scoring and deep review analysis
                                    </p>
                                    <button
                                        onClick={() => openExternal(`/chat?url=${encodeURIComponent(currentUrl)}`)}
                                        className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-orange-700 hover:to-amber-600 shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-600/30 transition-all"
                                    >
                                        <Sparkles size={18} />
                                        Analyze This Product
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ) : isAmazon ? (
                            <div className="text-center py-8 px-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle size={32} className="text-gray-400" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">Not a Product Page</h3>
                                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                                    Navigate to an Amazon product page (with /dp/ASIN in the URL) to analyze
                                </p>
                                <button
                                    onClick={() => chrome.tabs?.reload()}
                                    className="text-orange-600 text-sm font-bold hover:underline"
                                >
                                    Refresh Tab
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-8 px-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <ShoppingCart size={32} className="text-gray-500" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">Ready to Analyze</h3>
                                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                                    Visit any Amazon product page to see instant AI verdicts
                                </p>
                                <button
                                    onClick={() => window.open('https://amazon.com', '_blank', 'noopener,noreferrer')}
                                    className="inline-flex items-center justify-center gap-2 text-orange-600 text-sm font-bold hover:underline"
                                >
                                    Go to Amazon <ExternalLink size={14} />
                                </button>
                            </div>
                        )}

                        {/* Quick Links */}
                        <div className="pt-2 space-y-2">
                            <button
                                onClick={() => openExternal('/dashboard')}
                                className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-between group"
                            >
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">View Dashboard</span>
                                <ArrowRight size={16} className="text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>
                    </>
                )}
            </main>

            {/* Enhanced Footer */}
            <footer className="p-4 border-t border-gray-100 bg-gray-50/80 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-[10px] text-gray-500 font-semibold">Extension Active</span>
                </div>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">v1.1.0</span>
            </footer>
        </div>
    );
}

export default App;
