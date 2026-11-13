import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const data = await resend.emails.send({
      from: 'Portfolio <portfolio@wailly-mylowann.fr>',
      to: [to],
      subject: subject,
      html: html,
    });
    return data;
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
};
