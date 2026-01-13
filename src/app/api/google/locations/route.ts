import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { listLocations } from '@/lib/google-business';

export async function GET(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch Refresh Token from Profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('google_refresh_token')
            .eq('id', user.id)
            .single();

        if (!profile?.google_refresh_token) {
            return NextResponse.json({ error: 'Not connected to Google' }, { status: 400 });
        }

        // Get Locations
        const locations = await listLocations(profile.google_refresh_token);

        return NextResponse.json({
            locations,
            connected: true
        });

    } catch (error: any) {
        console.error('Fetch Locations Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { locationId, locationName } = await req.json();

        if (!locationId || !locationName) {
            return NextResponse.json({ error: 'Missing location details' }, { status: 400 });
        }

        // Update selected location in profile
        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                google_location_id: locationId,
                google_location_name: locationName
            })
            .eq('id', user.id);

        if (updateError) {
            console.error('Update Location Error:', updateError);
            return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Save Location Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
