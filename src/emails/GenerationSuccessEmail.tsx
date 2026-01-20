import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Link,
} from '@react-email/components';
import * as React from 'react';

export const GenerationSuccessEmail = ({
    businessName,
    reviewText,
    response
}: {
    businessName: string;
    reviewText: string;
    response: string;
}) => (
    <Html>
        <Head />
        <Preview>Your AI response for {businessName} is ready!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Review Sculpted! ✨</Heading>
                <Text style={text}>
                    Successfully generated a response for a review at <strong>{businessName}</strong>.
                </Text>

                <Section style={quoteContainer}>
                    <Text style={quoteLabel}>Customer Review:</Text>
                    <Text style={quoteText}>"{reviewText}"</Text>
                </Section>

                <Section style={responseContainer}>
                    <Text style={quoteLabel}>AI Suggested Response:</Text>
                    <Text style={responseText}>{response}</Text>
                </Section>

                <Text style={text}>
                    You can find all your generated responses in your <Link href="https://reviewai.vercel.app/dashboard/reviews" style={link}>Dashboard</Link>.
                </Text>

                <Text style={footer}>
                    &copy; 2026 ReviewAI Team
                </Text>
            </Container>
        </Body>
    </Html>
);

export default GenerationSuccessEmail;

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
};

const h1 = {
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '30px 0',
};

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
    padding: '0 40px',
};

const quoteContainer = {
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    padding: '16px 24px',
    margin: '20px 40px',
    borderLeft: '4px solid #e5e7eb',
};

const responseContainer = {
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    padding: '16px 24px',
    margin: '20px 40px',
    borderLeft: '4px solid #2563eb',
};

const quoteLabel = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    marginBottom: '4px',
};

const quoteText = {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#4b5563',
};

const responseText = {
    fontSize: '15px',
    color: '#1e40af',
    lineHeight: '24px',
};

const link = {
    color: '#2563eb',
    textDecoration: 'underline',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    marginTop: '48px',
};
