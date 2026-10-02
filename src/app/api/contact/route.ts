import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/components/template/contact";

// Correction : On vérifie si la clé existe avant d'instancier, 
// ou on utilise une chaîne par défaut pour éviter que le builder ne plante.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null | undefined) {
  return String(value || "").trim();
}

export async function POST(req: NextRequest) {
  try {
    // Vérification au moment de l'exécution (Runtime)
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
    const sujet = clean(formData.get("sujet"));
    const phone = clean(formData.get("phone"));
    const service = clean(formData.get("service"));

    if (!name || !email || !message || !sujet) {
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

    if (
      name.length > 120 ||
      email.length > 160 ||
      sujet.length > 160 ||
      phone.length > 40 ||
      service.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Un ou plusieurs champs sont trop longs" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "portfolio@waily-mylowann.fr";
    const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouveau message de ${name} - ${sujet}`,
      react: await ContactEmail({
        name,
        email,
        sujet,
        message,
        phone,
        service,
      }),
    });

    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Erreur critique /api/contact:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}