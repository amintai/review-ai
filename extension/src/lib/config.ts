const DEFAULT_LOCAL_URL = 'http://localhost:3000';
const DEFAULT_PROD_URL = 'https://reviewai.pro';

export const REVIEWAI_BASE_URL =
    import.meta.env.VITE_REVIEWAI_BASE_URL?.trim() ||
    (import.meta.env.DEV ? DEFAULT_LOCAL_URL : DEFAULT_PROD_URL);

export const AMAZON_PRODUCT_PATH_REGEX = /\/(dp|gp\/product)\/[A-Z0-9]{10}/i;

export const isAmazonDomain = (url: string): boolean => {
    try {
        const { hostname } = new URL(url);
        return /(^|\.)amazon\./i.test(hostname) || /(^|\.)amzn\.to$/i.test(hostname);
    } catch {
        return false;
    }
};

export const isAmazonProductUrl = (url: string): boolean => {
    try {
        const parsed = new URL(url);
        return isAmazonDomain(url) && AMAZON_PRODUCT_PATH_REGEX.test(parsed.pathname);
    } catch {
        return false;
    }
};
