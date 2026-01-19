import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { listLocations, listReviews } from '@/lib/google-business';

export async function GET(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch Refresh Token and Selected Location from Profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('google_refresh_token, google_location_id, google_location_name, is_pro')
            .eq('id', user.id)
            .single();

        if (!profile?.google_refresh_token) {
            return NextResponse.json({ error: 'Not connected to Google' }, { status: 400 });
        }

        // If no location is selected, return available locations instead of reviews
        if (!profile.google_location_id) {
            const locations = await listLocations(profile.google_refresh_token);

            console.log("locations", locations)
            return NextResponse.json({
                connected: true,
                needsLocation: true,
                locations,
                is_pro: profile.is_pro
            });
        }

        // Get Reviews for the selected location
        const reviews = await listReviews(profile.google_refresh_token, profile.google_location_id);

        return NextResponse.json({
            reviews,
            location: {
                name: profile.google_location_id,
                title: profile.google_location_name
            },
            connected: true,
            needsLocation: false,
            is_pro: profile.is_pro
        });

    } catch (error: any) {
        console.error('Fetch Reviews Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
