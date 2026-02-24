import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { waitlistSchema, type WaitlistEntry } from '@/lib/schemas/waitlist';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate request data
    const validationResult = waitlistSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Invalid email address',
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { email, source } = validationResult.data;

    // Initialize Supabase client
    const supabase = await createClient();

    // Check for duplicate email
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new emails
      console.error('Database error checking duplicate:', checkError);
      return NextResponse.json(
        { message: 'Failed to process signup. Please try again.' },
        { status: 500 }
      );
    }

    // If email already exists, return success (idempotent behavior)
    if (existingEntry) {
      return NextResponse.json(
        { message: "You're already on the waitlist!" },
        { status: 200 }
      );
    }

    // Insert new waitlist entry
    const { data: newEntry, error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email,
        source: source || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Database error inserting entry:', insertError);
      return NextResponse.json(
        { message: 'Failed to process signup. Please try again.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: 'Successfully joined the waitlist!',
        data: {
          id: newEntry.id,
          email: newEntry.email,
          created_at: newEntry.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json(
      { message: 'Failed to process signup. Please try again.' },
      { status: 500 }
    );
  }
}
