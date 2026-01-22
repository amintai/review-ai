import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface ContactEmailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const ContactEmail = ({
    name,
    email,
    subject,
    message,
}: ContactEmailProps) => (
    <Html>
        <Head />
        <Preview>New message from {name}: {subject}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>New Contact Form Submission</Heading>
                <Text style={text}>
                    You have received a new message from your website contact form.
                </Text>
                <Section style={section}>
                    <Text style={label}>From:</Text>
                    <Text style={value}>{name} ({email})</Text>

                    <Text style={label}>Subject:</Text>
                    <Text style={value}>{subject}</Text>

                    <Hr style={hr} />

                    <Text style={label}>Message:</Text>
                    <Text style={messageText}>{message}</Text>
                </Section>
                <Hr style={hr} />
                <Text style={footer}>
                    This email was sent from the contact form on ReviewAI.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContactEmail;

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
    padding: '0 48px',
};

const section = {
    padding: '0 48px',
};

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
    padding: '0 48px',
};

const label = {
    color: '#8898aa',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    marginBottom: '4px',
};

const value = {
    color: '#333',
    fontSize: '16px',
    marginBottom: '20px',
};

const messageText = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '24px',
    whiteSpace: 'pre-wrap' as const,
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 48px',
};
