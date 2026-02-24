import { extractAsin } from './amazon';

export interface ScrapedReview {
    text: string;
    title?: string;
    rating?: string;
}

export interface ScrapedAmazonData {
    asin: string;
    productName: string;
    price?: string;
    reviews: string[];
}

const DEFAULT_HEADERS: HeadersInit = {
    'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    Connection: 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
};

const stripHtml = (input: string) =>
    input
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();

const matchFirst = (html: string, patterns: RegExp[]) => {
    for (const p of patterns) {
        const m = html.match(p);
        if (m?.[1]) {
            return stripHtml(m[1]);
        }
    }
    return '';
};

export function extractReviewsFromHtml(html: string, max = 30): string[] {
    const snippets = new Set<string>();

    const bodyRegexes = [
        /data-hook="review-body"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi,
        /class="[^"]*review-text-content[^"]*"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi
    ];

    for (const regex of bodyRegexes) {
        let m: RegExpExecArray | null;
        while ((m = regex.exec(html)) && snippets.size < max) {
            const text = stripHtml(m[1]);
            if (text.length >= 20) snippets.add(text);
        }
    }

    return Array.from(snippets).slice(0, max);
}

export async function scrapeAmazonData(url: string): Promise<ScrapedAmazonData> {
    const asin = extractAsin(url);
    if (!asin) {
        throw new Error('ASIN not found in URL');
    }

    const parsed = new URL(url);
    const origin = `${parsed.protocol}//${parsed.host}`;
    const canonicalProductUrl = `${origin}/dp/${asin}`;
    const reviewsUrl = `${origin}/product-reviews/${asin}/?reviewerType=all_reviews&pageNumber=1&sortBy=helpful`;

    const [productRes, reviewsRes] = await Promise.all([
        fetch(canonicalProductUrl, { headers: DEFAULT_HEADERS, cache: 'no-store' }),
        fetch(reviewsUrl, { headers: DEFAULT_HEADERS, cache: 'no-store' })
    ]);

    if (!productRes.ok) {
        throw new Error(`Failed to fetch product page (${productRes.status})`);
    }

    const productHtml = await productRes.text();
    const reviewsHtml = reviewsRes.ok ? await reviewsRes.text() : '';

    const productName =
        matchFirst(productHtml, [
            /<span[^>]*id="productTitle"[^>]*>([\s\S]*?)<\/span>/i,
            /<title>([\s\S]*?)<\/title>/i
        ]) || `Amazon Product (${asin})`;

    const price = matchFirst(productHtml, [
        /<span[^>]*class="[^"]*a-price-whole[^"]*"[^>]*>([\s\S]*?)<\/span>/i,
        /<span[^>]*id="priceblock_ourprice"[^>]*>([\s\S]*?)<\/span>/i,
        /<span[^>]*id="priceblock_dealprice"[^>]*>([\s\S]*?)<\/span>/i,
        /"priceToPay"[\s\S]*?"displayPrice":"([^"]+)"/i
    ]);

    const reviews = [
        ...extractReviewsFromHtml(reviewsHtml, 40),
        ...extractReviewsFromHtml(productHtml, 20)
    ];

    const dedupedReviews = Array.from(new Set(reviews)).slice(0, 40);

    return {
        asin,
        productName,
        price: price || undefined,
        reviews: dedupedReviews
    };
}
