/**
 * Amazon Utility Functions
 */

/**
 * Extracts the ASIN (Amazon Standard Identification Number) from an Amazon URL.
 * @param url The Amazon product URL
 * @returns The ASIN or null if not found
 */
export function extractAsin(url: string): string | null {
    if (!url) return null;

    // Regular expression to find ASIN in various Amazon URL formats
    // Matches 10-character alphanumeric strings following /dp/ or /product/
    const asinRegex = /\/(?:dp|gp\/product)\/([A-Z0-9]{10})|dp\/([A-Z0-9]{10})/;
    const match = url.match(asinRegex);

    if (match) {
        return match[1] || match[2];
    }

    // Check for short URLs like amzn.to (though these usually redirect, we can't easily resolve them client-side)
    // For now, we expect the full URL.

    return null;
}

/**
 * Extracts the marketplace domain from an Amazon URL.
 * @param url The Amazon product URL
 * @returns The marketplace domain (e.g., "amazon.com", "amazon.co.uk") or null if not found
 */
export function extractMarketplace(url: string): string | null {
    if (!url) return null;

    try {
        const parsedUrl = new URL(url);
        // Return the hostname (e.g., "www.amazon.com", "amazon.co.uk")
        return parsedUrl.hostname;
    } catch {
        return null;
    }
}

/**
 * Validates if a string is a valid Amazon URL.
 * @param url The URL to validate
 * @returns boolean
 */
export function isValidAmazonUrl(url: string): boolean {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname.includes('amazon.') || parsedUrl.hostname.includes('amzn.');
    } catch {
        return false;
    }
}
