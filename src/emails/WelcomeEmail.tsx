import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

export const WelcomeEmail = ({ userFirstname }: { userFirstname?: string }) => (
    <Html>
        <Head />
        <Preview>Welcome to ReviewAI - Let's sculpt your first review!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>Welcome to ReviewAI</Heading>
                <Text style={text}>
                    Hi {userFirstname || 'there'},
                </Text>
                <Text style={text}>
                    Thank you for joining ReviewAI! We’re thrilled to have you on board.
                    Our AI is ready to help you craft the perfect responses to your customer reviews,
                    saving you time and building authentic connections with your audience.
                </Text>
                <Section style={buttonContainer}>
                    <Button style={button} href="https://reviewai.vercel.app/dashboard">
                        Get Started Now
                    </Button>
                </Section>
                <Text style={text}>
                    If you have any questions, just reply to this email. We're here to help!
                </Text>
                <Text style={footer}>
                    &copy; 2026 ReviewAI Team
                </Text>
            </Container>
        </Body>
    </Html>
);

export default WelcomeEmail;

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

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '33px 0',
};

const button = {
    backgroundColor: '#2563eb',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px 24px',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    marginTop: '48px',
};
