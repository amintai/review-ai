import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, CheckCircle2, ExternalLink, Loader2, TrendingUp, X } from 'lucide-react';
import { isAmazonProductUrl, REVIEWAI_BASE_URL } from '../lib/config';

const LogoIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#brandGradientOvl)" />
        <path
            d="M20 8L22.5 15.5H30L24 20L26.5 27.5L20 23L13.5 27.5L16 20L10 15.5H17.5L20 8Z"
            fill="white"
            fillOpacity="0.3"
        />
        <text
            x="20"
            y="27"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
        >
            R
        </text>
        <defs>
            <linearGradient
                id="brandGradientOvl"
                x1="2"
                y1="2"
                x2="38"
                y2="38"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#ea580c" />
                <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
        </defs>
    </svg>
);

type ScrapedPayload = {
    product_title: string;
    price: string;
    reviews: string[];
};

type VerdictResponse = {
    id?: string;
    verdict?: 'BUY' | 'SKIP' | 'CAUTION' | string;
    summary?: string;
    trust_score?: number;
    confidence_score?: number;
    error?: string;
    is_anonymous?: boolean;
};

const BADGE_ID = 'reviewai-badge-trigger';
const CACHE_PREFIX = 'reviewai_verdict_';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const extractAsin = (url: string) => {
    const match = url.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
    return match ? match[1] : null;
};

const AmazonOverlay: React.FC = () => {
    const [verdict, setVerdict] = useState<VerdictResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);

    const isSupportedPage = useMemo(() => isAmazonProductUrl(window.location.href), []);

    // Check for cached verdict on mount
    useEffect(() => {
        if (!isSupportedPage) return;
        const asin = extractAsin(window.location.href);
        if (asin) {
            try {
                const cached = localStorage.getItem(`${CACHE_PREFIX}${asin}`);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (Date.now() - parsed.timestamp < CACHE_TTL) {
                        setVerdict(parsed.verdict);
                        setLastUpdatedAt(parsed.timeString);
                    } else {
                        localStorage.removeItem(`${CACHE_PREFIX}${asin}`);
                    }
                }
            } catch (e) {
                console.warn('Failed to parse cached ReviewAI verdict', e);
            }
        }
    }, [isSupportedPage]);

    const extractVisiblePageData = useCallback((): ScrapedPayload => {
        const productTitle =
            document.querySelector('#productTitle')?.textContent?.trim() ||
            document.title?.replace(/\s*:\s*Amazon.*$/i, '').trim() ||
            '';

        const price =
            document.querySelector('.a-price .a-offscreen')?.textContent?.trim() ||
            document.querySelector('#priceblock_ourprice')?.textContent?.trim() ||
            document.querySelector('#priceblock_dealprice')?.textContent?.trim() ||
            '';

        const reviewNodes = Array.from(document.querySelectorAll('[data-hook="review-body"] span'));
        const reviews = Array.from(
            new Set(
                reviewNodes
                    .map((node) => node.textContent?.trim() || '')
                    .filter((text) => text.length >= 20)
            )
        ).slice(0, 40);

        return {
            product_title: productTitle,
            price,
            reviews
        };
    }, []);

    const analyzeProduct = useCallback(() => {
        setLoading(true);
        setVisible(true);
        setError(null);

        chrome.runtime.sendMessage(
            {
                action: 'analyze_product',
                url: window.location.href,
                scraped: extractVisiblePageData()
            },
            (response: VerdictResponse | undefined) => {
                if (chrome.runtime.lastError) {
                    setError(chrome.runtime.lastError.message || 'Extension communication failed.');
                    setLoading(false);
                    return;
                }

                if (!response) {
                    setError('No response from ReviewAI service.');
                    setLoading(false);
                    return;
                }

                if (response.error) {
                    setError(response.error);
                    setVerdict(null);
                } else {
                    setVerdict(response);
                    const timeString = new Date().toLocaleTimeString();
                    setLastUpdatedAt(timeString);

                    const asin = extractAsin(window.location.href);
                    if (asin) {
                        try {
                            localStorage.setItem(
                                `${CACHE_PREFIX}${asin}`,
                                JSON.stringify({
                                    verdict: response,
                                    timeString,
                                    timestamp: Date.now()
                                })
                            );
                        } catch (e) {
                            console.warn('Failed to cache verdict', e);
                        }
                    }
                }
                setLoading(false);
            }
        );
    }, [extractVisiblePageData]);

    // Listen for trigger_analysis message sent from the extension popup
    useEffect(() => {
        if (!isSupportedPage) return;

        const handleMessage = (
            message: { action: string },
            _sender: chrome.runtime.MessageSender,
            sendResponse: (r: unknown) => void
        ) => {
            if (message.action === 'trigger_analysis') {
                analyzeProduct();
                sendResponse({ ok: true });
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);
        return () => chrome.runtime.onMessage.removeListener(handleMessage);
    }, [analyzeProduct, isSupportedPage]);

    // State for the injected badge container
    const [badgeContainer, setBadgeContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!isSupportedPage) return;

        const insertionTargets = [
            '#priceInsideBuyBox_feature_div',
            '#corePrice_feature_div',
            '#ppd',
            '#centerCol'
        ];

        const mountBadgeContainer = () => {
            if (document.getElementById(BADGE_ID)) return true;

            const target = insertionTargets
                .map((selector) => document.querySelector(selector))
                .find(Boolean);

            if (!target) return false;

            const container = document.createElement('div');
            container.id = BADGE_ID;
            target.appendChild(container);
            setBadgeContainer(container);

            return true;
        };

        if (mountBadgeContainer()) return;

        const observer = new MutationObserver(() => {
            if (mountBadgeContainer()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        const timeout = window.setTimeout(() => observer.disconnect(), 7000);

        return () => {
            observer.disconnect();
            window.clearTimeout(timeout);
        };
    }, [isSupportedPage]);

    // We no longer abort rendering based on `visible`, because we need the badge to render inside the Portal.
    if (!badgeContainer) return null;

    const getVerdictIcon = () => {
        if (verdict?.verdict === 'BUY') return <CheckCircle2 size={24} className="text-green-600" />;
        if (verdict?.verdict === 'SKIP') return <X size={24} className="text-red-600" />;
        return <LogoIcon size={24} className="text-amber-600" />;
    };

    // The Interactive Capsule Badge
    const renderBadge = () => {
        if (loading) {
            return (
                <button className="reviewai-capsule reviewai-capsule-loading" disabled>
                    <Loader2 size={16} className="animate-spin text-secondary" />
                    <span className="text-secondary font-medium">Analyzing reviews...</span>
                </button>
            );
        }

        if (verdict) {
            const isBuy = verdict.verdict === 'BUY';
            const isSkip = verdict.verdict === 'SKIP';
            const stateClass = isBuy ? 'reviewai-capsule-buy' : isSkip ? 'reviewai-capsule-skip' : 'reviewai-capsule-caution';

            return (
                <button
                    className={`reviewai-capsule ${stateClass}`}
                    onClick={() => {
                        // Redirect to the dashboard report
                        const asin = extractAsin(window.location.href);
                        if (asin) {
                            window.open(`${REVIEWAI_BASE_URL}/dashboard?product=${asin}`, '_blank');
                        } else {
                            setVisible(true); // Fallback to expanding the overlay
                        }
                    }}
                >
                    {isBuy ? <CheckCircle2 size={16} /> : isSkip ? <X size={16} /> : <LogoIcon size={16} />}
                    <span className="font-bold">{verdict.trust_score}% Trust Score | {verdict.verdict}</span>
                </button>
            );
        }

        // Idle State
        return (
            <button
                className="reviewai-capsule reviewai-capsule-idle"
                onClick={(e) => {
                    e.preventDefault();
                    analyzeProduct();
                }}
            >
                <LogoIcon size={20} />
                <span className="font-semibold">ReviewAI • Analyze Product</span>
            </button>
        );
    };

    return (
        <>
            {createPortal(renderBadge(), badgeContainer)}

            {visible && (
                <div className="reviewai-overlay-fixed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    <div className="reviewai-overlay-card">
                        {/* Enhanced Header */}
                        <div className="reviewai-overlay-header">
                            <div className="reviewai-title-wrap">
                                <div className="reviewai-logo-badge">
                                    <LogoIcon size={18} />
                                </div>
                                <div>
                                    <span className="reviewai-title">ReviewAI</span>
                                    <span className="reviewai-subtitle">Product Intelligence</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setVisible(false)}
                                className="reviewai-close"
                                aria-label="Close ReviewAI panel"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {loading ? (
                            <div className="reviewai-loading">
                                <div className="reviewai-loading-spinner">
                                    <Loader2 size={40} className="animate-spin" />
                                </div>
                                <h3 className="reviewai-loading-title">Analyzing Product</h3>
                                <p className="reviewai-loading-text">Evaluating quality signals and review patterns...</p>
                            </div>
                        ) : error ? (
                            <div className="reviewai-error-wrap">
                                <div className="reviewai-error-icon">⚠️</div>
                                <p className="reviewai-error">{error}</p>
                                <button className="reviewai-primary-btn" onClick={analyzeProduct}>
                                    <TrendingUp size={16} />
                                    Retry Analysis
                                </button>
                            </div>
                        ) : verdict ? (
                            <div>
                                {/* Enhanced Verdict Card */}
                                <div
                                    className={`reviewai-verdict reviewai-verdict-${verdict.verdict === 'BUY'
                                        ? 'buy'
                                        : verdict.verdict === 'SKIP'
                                            ? 'skip'
                                            : 'caution'
                                        }`}
                                >
                                    <div className="reviewai-verdict-header">
                                        {getVerdictIcon()}
                                        <div>
                                            <div className="reviewai-label">AI Verdict</div>
                                            <div className="reviewai-verdict-value">{verdict.verdict || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>

                                <p className="reviewai-summary">
                                    {verdict.summary || 'Analysis complete. Open full report for detailed insights.'}
                                </p>

                                {lastUpdatedAt && (
                                    <div className="reviewai-sync-badge">
                                        <CheckCircle2 size={12} />
                                        <span>Synced at {lastUpdatedAt}</span>
                                    </div>
                                )}

                                {/* Enhanced Metrics */}
                                <div className="reviewai-metrics">
                                    <div className="reviewai-metric-card">
                                        <div className="reviewai-metric-icon">🛡️</div>
                                        <div>
                                            <div className="reviewai-metric-value">{verdict.trust_score ?? '--'}%</div>
                                            <div className="reviewai-metric-label">Trust Score</div>
                                        </div>
                                    </div>
                                    <div className="reviewai-metric-card">
                                        <div className="reviewai-metric-icon">📊</div>
                                        <div>
                                            <div className="reviewai-metric-value">{verdict.confidence_score ?? '--'}%</div>
                                            <div className="reviewai-metric-label">Confidence</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <a
                                    href={`${REVIEWAI_BASE_URL}/report/${verdict.id ?? ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="reviewai-link-btn"
                                >
                                    <span>View Full Report</span>
                                    <ArrowRight size={16} />
                                </a>

                                {verdict.is_anonymous ? (
                                    <a
                                        href={`${REVIEWAI_BASE_URL}/login`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="reviewai-info-text"
                                        style={{ backgroundColor: '#fff7ed', borderColor: '#ffedd5', color: '#c2410c', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffedd5'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff7ed'}
                                    >
                                        <LogoIcon size={12} />
                                        <span>Sign in to save this to your history</span>
                                    </a>
                                ) : (
                                    <div className="reviewai-info-text">
                                        <LogoIcon size={12} />
                                        <span>Report saved to your dashboard</span>
                                    </div>
                                )}

                                {!verdict.is_anonymous && (
                                    <a
                                        href={`${REVIEWAI_BASE_URL}/dashboard/history`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="reviewai-secondary-link"
                                    >
                                        <ExternalLink size={14} />
                                        <span>View All Reports</span>
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div className="reviewai-error-wrap">
                                <div className="reviewai-error-icon">🔒</div>
                                <p className="reviewai-error">
                                    Sign in to unlock instant product analysis and AI verdicts
                                </p>
                                <button
                                    className="reviewai-primary-btn"
                                    onClick={() => window.open(`${REVIEWAI_BASE_URL}/login`, '_blank', 'noopener,noreferrer')}
                                >
                                    Sign In to ReviewAI
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AmazonOverlay;
