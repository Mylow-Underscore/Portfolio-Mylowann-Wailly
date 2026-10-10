import { Html, Button, Heading } from '@react-email/components';

interface DevisEmailProps {
  name: string;
  email: string;
  phone?: string;
  service: string;
  description: string;
  budget?: string;
}

export const DevisEmail = ({ name, email, phone, service, description, budget }: DevisEmailProps) => (
  <Html>
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Heading>Nouvelle demande de devis</Heading>
        <strong style={{ display: 'block', marginTop: '10px' }}>Nom:</strong> {name}
        <strong style={{ display: 'block', marginTop: '10px' }}>Email:</strong> {email}
        <strong style={{ display: 'block', marginTop: '10px' }}>Téléphone:</strong> {phone || 'Non fourni'}
        <strong style={{ display: 'block', marginTop: '10px' }}>Service:</strong> {service}
        <strong style={{ display: 'block', marginTop: '10px' }}>Budget estimé:</strong> {budget || 'Non spécifié'}
        <strong style={{ display: 'block', marginTop: '10px' }}>Description du projet:</strong> <br />
        {description}
      <Button href="mailto:portfolio@wailly-mylowann.fr" style={{ marginTop: '20px' }}>Répondre directement</Button>
    </main>
  </Html>
);
