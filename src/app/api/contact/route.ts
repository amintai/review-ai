import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import ContactEmail from '@/components/emails/ContactEmail';
import * as z from 'zod';

const contactFormSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate request body
        const validatedData = contactFormSchema.parse(body);

        const { name, email, subject, message } = validatedData;

        // Send email to admin
        const result = await sendEmail({
            to: process.env.CONTACT_EMAIL || 'admin@reviewai.pro',
            subject: `New Contact Form: ${subject}`,
            react: ContactEmail({ name, email, subject, message }),
        });

        console.log("result-----result", result)
        if (!result.success) {
            return NextResponse.json(
                { message: 'Failed to send message' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact API Error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Invalid form data', errors: error },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
