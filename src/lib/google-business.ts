import { google } from 'googleapis';

// Initialize OAuth Client for refreshing tokens
const getOAuthClient = () => {
    return new google.auth.OAuth2(
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    );
};

export const listLocations = async (refreshToken: string) => {
    const auth = getOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });

    const mybusinessaccountmanagement = google.mybusinessaccountmanagement({ version: 'v1', auth });

    // 1. Get Accounts
    const accountsRes = await mybusinessaccountmanagement.accounts.list();
    const accounts = accountsRes.data.accounts;

    if (!accounts || accounts.length === 0) return [];

    // 2. Get Locations for the first account (MVP simplification)
    // Note: New API 'mybusinessbusinessinformation' handles locations
    const mybusinessbusinessinformation = google.mybusinessbusinessinformation({ version: 'v1', auth });

    const accountName = accounts[0].name!; // e.g. "accounts/12345"

    const locationsRes = await mybusinessbusinessinformation.accounts.locations.list({
        parent: accountName,
        readMask: 'name,title,storeCode,latlng,phoneNumbers,categories'
    });

    return locationsRes.data.locations || [];
};


export const listReviews = async (refreshToken: string, locationName: string) => {
    const auth = getOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });

    // Reviews are in 'mybusinessqanda' or similar? No, 'mybusinessreviews' API?
    // Actually, standard is 'mybusinessreviews' v4 was deprecated. 
    // It is now 'mybusinessreviews.googleapis.com' v1? Or part of specific API?
    // Correction: It is `google.mybusinessreviews` (v1)

    const mybusinessreviews = (google as any).mybusinessreviews({ version: 'v1', auth });

    const res = await mybusinessreviews.accounts.locations.reviews.list({
        parent: locationName // e.g., "accounts/{accountId}/locations/{locationId}"
    });

    return res.data.reviews || [];
};

export const replyToReview = async (refreshToken: string, reviewName: string, replyText: string) => {
    const auth = getOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });

    const mybusinessreviews = (google as any).mybusinessreviews({ version: 'v1', auth });

    await mybusinessreviews.accounts.locations.reviews.updateReply({
        name: `${reviewName}/reply`,
        requestBody: {
            comment: replyText
        }
    });
};
