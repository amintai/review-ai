import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { type PersonaId } from '@/lib/personas';
import { z } from 'zod';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('default_persona, is_pro')
            .eq('id', user.id)
            .single();

        return NextResponse.json({
            persona_id: (profile?.default_persona as PersonaId) ?? null,
            is_pro: profile?.is_pro ?? false,
        });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch persona' }, { status: 500 });
    }
}

const PatchSchema = z.object({
    persona_id: z.enum(['budget_buyer', 'durability_focused', 'risk_averse', 'tech_enthusiast', 'gift_buyer']).nullable(),
});

export async function PATCH(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const validation = PatchSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: 'Invalid persona_id' }, { status: 400 });
        }

        const { error } = await supabase
            .from('profiles')
            .update({ default_persona: validation.data.persona_id, updated_at: new Date().toISOString() })
            .eq('id', user.id);

        if (error) {
            return NextResponse.json({ error: 'Failed to update persona' }, { status: 500 });
        }

        return NextResponse.json({ success: true, persona_id: validation.data.persona_id });
    } catch {
        return NextResponse.json({ error: 'Failed to update persona' }, { status: 500 });
    }
}
