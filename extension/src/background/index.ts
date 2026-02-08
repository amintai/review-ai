import { isAmazonProductUrl, REVIEWAI_BASE_URL } from '../lib/config';
import { syncSession } from '../lib/supabase';

type AnalyzeRequest = {
    action: 'analyze_product';
    url?: string;
    scraped?: {
        product_title?: string;
        price?: string;
        reviews?: string[];
    };
};

type SessionRequest = {
    action: 'get_session';
};

type ExtensionRequest = AnalyzeRequest | SessionRequest;

chrome.runtime.onInstalled.addListener(() => {
    console.log('ReviewAI extension installed');
});

chrome.runtime.onMessage.addListener((request: ExtensionRequest, _sender, sendResponse) => {
    if (request.action === 'get_session') {
        syncSession()
            .then((session) => sendResponse({ session }))
            .catch((error) => {
                console.error('Failed to sync extension session:', error);
                sendResponse({ session: null, error: 'Failed to verify session' });
            });
        return true;
    }

    if (request.action === 'analyze_product') {
        handleAnalysis(request.url, request.scraped)
            .then((result) => sendResponse(result))
            .catch((error) => {
                console.error('Product analysis failed:', error);
                sendResponse({ error: 'Unexpected failure during analysis' });
            });
        return true;
    }

    return false;
});

async function handleAnalysis(
    url?: string,
    scraped?: { product_title?: string; price?: string; reviews?: string[] }
) {
    if (!url || !isAmazonProductUrl(url)) {
        return { error: 'Open a supported Amazon product page and try again.' };
    }

    try {
        const session = await syncSession();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        };

        if (session?.access_token) {
            headers.Authorization = `Bearer ${session.access_token}`;
        }

        const response = await fetch(`${REVIEWAI_BASE_URL}/api/amazon/analyze`, {
            method: 'POST',
            headers,
            credentials: 'include',
            body: JSON.stringify({
                url,
                product_title: scraped?.product_title,
                price: scraped?.price,
                reviews: scraped?.reviews ?? []
            })
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            return {
                error:
                    data?.error ||
                    `Analysis failed (${response.status}). Please try again in a few moments.`
            };
        }

        return data ?? { error: 'Received an empty response from ReviewAI.' };
    } catch (error) {
        console.error('API call failed:', error);
        return { error: 'Could not connect to ReviewAI servers. Check your internet connection.' };
    }
}
