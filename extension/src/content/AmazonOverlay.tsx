import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, ExternalLink, Loader2, ShieldCheck, TrendingUp, X } from 'lucide-react';
import { isAmazonProductUrl, REVIEWAI_BASE_URL } from '../lib/config';

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
};

const BADGE_ID = 'reviewai-badge-trigger';

const AmazonOverlay: React.FC = () => {
    const [verdict, setVerdict] = useState<VerdictResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);

    const isSupportedPage = useMemo(() => isAmazonProductUrl(window.location.href), []);

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
                    setLastUpdatedAt(new Date().toLocaleTimeString());
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

    useEffect(() => {
        if (!isSupportedPage) return;

        const insertionTargets = [
            '#priceInsideBuyBox_feature_div',
            '#corePrice_feature_div',
            '#ppd',
            '#centerCol'
        ];

        const attachBadge = () => {
            if (document.getElementById(BADGE_ID)) return true;

            const target = insertionTargets
                .map((selector) => document.querySelector(selector))
                .find(Boolean);

            if (!target) return false;

            const badge = document.createElement('button');
            badge.id = BADGE_ID;
            badge.className = 'reviewai-badge-trigger';
            badge.type = 'button';
            badge.innerHTML =
                '<span class="reviewai-badge-icon">🛡️</span><span>Get AI Verdict</span>';
            badge.addEventListener('click', (event) => {
                event.preventDefault();
                analyzeProduct();
            });

            target.appendChild(badge);
            return true;
        };

        if (attachBadge()) return;

        const observer = new MutationObserver(() => {
            if (attachBadge()) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        const timeout = window.setTimeout(() => observer.disconnect(), 7000);

        return () => {
            observer.disconnect();
            window.clearTimeout(timeout);
        };
    }, [analyzeProduct, isSupportedPage]);

    if (!visible) return null;

    const getVerdictIcon = () => {
        if (verdict?.verdict === 'BUY') return <CheckCircle2 size={24} className="text-green-600" />;
        if (verdict?.verdict === 'SKIP') return <X size={24} className="text-red-600" />;
        return <ShieldCheck size={24} className="text-amber-600" />;
    };

    return (
        <div className="reviewai-overlay-fixed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <div className="reviewai-overlay-card">
                {/* Enhanced Header */}
                <div className="reviewai-overlay-header">
                    <div className="reviewai-title-wrap">
                        <div className="reviewai-logo-badge">
                            <ShieldCheck size={18} strokeWidth={2.5} />
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

                        <div className="reviewai-info-text">
                            <ShieldCheck size={12} />
                            <span>Report saved to your dashboard</span>
                        </div>

                        <a
                            href={`${REVIEWAI_BASE_URL}/dashboard/history`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reviewai-secondary-link"
                        >
                            <ExternalLink size={14} />
                            <span>View All Reports</span>
                        </a>
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
    );
};

export default AmazonOverlay;
