import { Resend } from 'resend';
import { render } from '@react-email/render';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
    to,
    subject,
    react,
}: {
    to: string | string[];
    subject: string;
    react: React.ReactElement;
}) => {
    try {
        const html = await render(react);

        const { data, error } = await resend.emails.send({
            from: 'ReviewAI <onboarding@resend.dev>',
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Email send error:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email exception:', error);
        return { success: false, error };
    }
};

