import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const { name, email, phone, service, description, budget } = data;

    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Nouvelle demande de devis</h2>
        <p><strong style="display:block">Nom:</strong> ${name}</p>
        <p><strong style="display:block">Email:</strong> ${email}</p>
        <p><strong style="display:block">Téléphone:</strong> ${phone || 'Non fourni'}</p>
        <p><strong style="display:block">Service:</strong> ${service}</p>
        <p><strong style="display:block">Budget estimé:</strong> ${budget || 'Non spécifié'}</p>
        <p><strong style="display:block">Description du projet:</strong></p>
        <p>${description}</p>
        <hr />
        <p>Répondre directement : <a href="mailto:portfolio@wailly-mylowann.fr">Cliquer ici</a></p>
      </div>
    `;

    await sendMail(
      process.env.EMAIL_RECEIVER || 'wailly.mylowann@hotmail.fr',
      `Demande de devis: ${service}`,
      htmlContent
    );

    return NextResponse.json({ message: 'Demande de devis envoyée avec succès !' }, { status: 200 });
  } catch (error) {
    console.error('Route Error:', error);
    return NextResponse.json({ error: 'Une erreur interne est survenue.' }, { status: 500 });
  }
}
