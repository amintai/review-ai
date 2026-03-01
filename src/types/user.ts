import type { PersonaId } from '@/lib/personas';

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
    // Profile table fields
    default_persona: PersonaId | null;
    is_pro: boolean;
    profile_updated_at: string | null;
}