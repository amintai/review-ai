import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { type PersonaId } from '@/lib/personas';
import { type UserProfile } from '@/types/user';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        
        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user profile from profiles table
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, default_persona, is_pro, updated_at')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('Profile fetch error:', profileError);
            return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
        }

        // Combine auth user data with profile data
        const userProfile: UserProfile = {
            id: user.id,
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
            created_at: user.created_at || '',
            // Profile table fields
            default_persona: profile?.default_persona as PersonaId | null,
            is_pro: profile?.is_pro ?? false,
            profile_updated_at: profile?.updated_at || null,
        };

        return NextResponse.json(userProfile);
    } catch (error) {
        console.error('User profile API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}