import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import DevisEmail from "@/components/template/devis";

// Correction identique ici pour éviter l'échec du build
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null | undefined) {
  return String(value || "").trim();
}

export async function POST(req: NextRequest) {
  try {
    if (!resend) {
      console.error("RESEND_API_KEY manquante lors de la tentative d'envoi.");
      return NextResponse.json(
        { error: "Service email non configuré" },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const name = clean(formData.get("name"));
    const email = clean(formData.get("email"));
    const message = clean(formData.get("message"));
    const description = clean(formData.get("description"));
    const phone = clean(formData.get("phone"));
    const service = clean(formData.get("service"));
    const budget = clean(formData.get("budget"));

    if (!name || !email || !message || !description || !service ) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "portfolio@waily-mylowann.fr";
    const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Demande de devis de ${name} - ${service}`,
      react: await DevisEmail({
        name,
        email,
        budget,
        description,
        phone,
        service,
      }),
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du devis" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Erreur critique /api/devis:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
