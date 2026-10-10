import { Html, Button, Heading } from '@react-email/components';

interface ContactEmailProps {
  name: string;
  email: string;
  sujet: string;
  phone?: string;
  service: string;
  message: string;
}

export const ContactEmail = ({ name, email, sujet, phone, service, message }: ContactEmailProps) => (
  <Html>
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Heading>Nouveau message de contact</Heading>
        <strong style={{ display: 'block', marginTop: '10px' }}>Nom:</strong> {name}
        <strong style={{ display: 'block', marginTop: '10px' }}>Email:</strong> {email}
        <strong style={{ display: 'block', marginTop: '10px' }}>Téléphone:</strong> {phone || 'Non fourni'}
        <strong style={{ display: 'block', marginTop: '10px' }}>Sujet:</strong> {sujet}
        <strong style={{ display: 'block', marginTop: '10px' }}>Service:</strong> {service}
        <strong style={{ display: 'block', marginTop: '10px' }}>Message:</strong> <br />
        {message}
      <Button href="mailto:portfolio@wailly-mylowann.fr" style={{ marginTop: '20px' }}>Répondre directement</Button>
    </main>
  </Html>
);
