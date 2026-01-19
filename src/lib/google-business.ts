import { google } from 'googleapis';

// Initialize OAuth Client for refreshing tokens
const getOAuthClient = () => {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_CLIENT_SECRET
    );
};

export const listLocations = async (refreshToken: string) => {
    const auth = getOAuthClient();

    auth.setCredentials({ refresh_token: refreshToken });

    const mbBusinessInfo = google.mybusinessbusinessinformation({ version: 'v1', auth });

    const accountsRes = await google.mybusinessaccountmanagement({ version: 'v1', auth }).accounts.list();
    const accounts = accountsRes.data.accounts ?? [];

    if (accounts.length === 0) return [];

    const accountName = accounts[0].name!; // MVP: first account

    const locationsRes = await mbBusinessInfo.accounts.locations.list({
        parent: accountName,
        readMask: 'name,title,storeCode,latlng,phoneNumbers,categories',
        pageSize: 100, // can go higher
    });

    return locationsRes.data.locations ?? [];
};

export const listReviews = async (refreshToken: string, locationName: string) => {
    const auth = getOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });

    const mybusiness = (google as any).mybusiness({ version: 'v4', auth });

    const reviews: any[] = [];
    let pageToken: string | undefined;

    do {
        const res = await mybusiness.accounts.locations.reviews.list({
            parent: locationName,
            pageSize: 100,
            pageToken,
        });

        reviews.push(...(res.data.reviews ?? []));
        pageToken = res.data.nextPageToken;
    } while (pageToken);

    return reviews;
};

export const replyToReview = async (refreshToken: string, reviewName: string, replyText: string) => {
    const auth = getOAuthClient();
    auth.setCredentials({ refresh_token: refreshToken });

    const mybusinessreviews = (google as any).mybusiness({ version: 'v4', auth });
    const fullName = reviewName.includes('/reply') ? reviewName : `${reviewName}/reply`;

    await mybusinessreviews.accounts.locations.reviews.updateReply({
        name: fullName,
        requestBody: {
            comment: replyText
        }
    });
};
