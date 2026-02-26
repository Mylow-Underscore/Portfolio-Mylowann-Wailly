import * as React from "react";
import {Html, Head, Preview, Body, Container} from "@react-email/components";

type Props = {
  name: string;
  email: string;
  sujet: string;
  message: string;
  phone?: string;
  service?: string;
};

interface ContactEmailProps {
  name: string;
  email: string;
  sujet: string;
  message: string;
  phone?: string;
  service?: string;
}

const ContactEmail: React.FC<ContactEmailProps> = ({ name, email, sujet, message, phone, service }) => {
  
    return (
      <Html>
        <Head />
        <Preview>Nouveau message de contact de {name}</Preview>
        <Body style={styles.body}></Body>
          <Container style={styles.container}>
            <h1 style={styles.heading}>Nouveau message de contact</h1>
            <p style={styles.paragraph}><strong>Nom:</strong> {name}</p>
            <p style={styles.paragraph}><strong>Email:</strong> {email}</p>
            <p style={styles.paragraph}><strong>Sujet:</strong> {sujet}</p>
            {phone && <p style={styles.paragraph}><strong>Téléphone:</strong> {phone}</p>}
            {service && <p style={styles.paragraph}><strong>Service:</strong> {service}</p>}
            <p style={styles.paragraph}><strong>Message:</strong><br />{message}</p>
          </Container>
      </Html>
    );
};

const styles = {
  body: {
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  paragraph: {
    color: "#555555",
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "10px",
  },
};

export default ContactEmail;