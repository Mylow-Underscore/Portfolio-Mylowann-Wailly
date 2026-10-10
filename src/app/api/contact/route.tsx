import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { ContactEmail } from './email-template';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const { name, email, sujet, phone, service, message } = data;

    // Génération du contenu HTML à partir du composant React
    // Note: Pour simplifier sans moteur de rendu complexe, on peut aussi
    // passer directement le HTML si le composant est simple,
    // ou utiliser un rendu minimal. Ici on va construire le HTML manuellement
    // pour assurer la compatibilité avec Nodemailer.

    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
        <p><strong>Sujet:</strong> ${sujet}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p>Répondre directement : <a href="mailto:portfolio@wailly-mylowann.fr">Cliquer ici</a></p>
      </div>
    `;

    await sendMail(
      process.env.EMAIL_RECEIVER || 'wailly.mylowann@hotmail.fr',
      `Contact: ${sujet}`,
      htmlContent
    );

    return NextResponse.json({ message: 'Message envoyé avec succès !' }, { status: 200 });
  } catch (error) {
    console.error('Route Error:', error);
    return NextResponse.json({ error: 'Une erreur interne est survenue.' }, { status: 500 });
  }
}
