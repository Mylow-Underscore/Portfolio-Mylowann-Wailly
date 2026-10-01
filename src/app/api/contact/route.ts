import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/components/template/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fonction de nettoyage plus robuste pour les données du formulaire
function clean(value: FormDataEntryValue | null | undefined) {
  return String(value || "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("ERREUR : La clé RESEND_API_KEY est manquante dans les variables d'environnement.");
      return NextResponse.json(
        { error: "Service email non configuré (configuration manquante)" },
        { status: 503 }
      );
    }

    // Gestion du corps de la requête (FormData ou JSON)
    let formData: FormData;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    } else {
      formData = await req.formData();
    }

    const name = clean(formData.get("name"));
    const email = clean(formData.get("email"));
    const message = clean(formData.get("message"));
    const sujet = clean(formData.get("sujet"));
    const phone = clean(formData.get("phone") || "");
    const service = clean(formData.get("service") || "");

    // Validations de présence
    if (!name || !email || !message || !sujet) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires (Nom, Email, Message, Sujet) sont requis." },
        { status: 400 }
      );
    }

    // Validation de format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "L'adresse e-mail saisie n'est pas valide." },
        { status: 400 }
      );
    }

    // Validations de longueur (pour éviter les abus ou erreurs d'API)
    if (
      name.length > 120 ||
      email.length > 160 ||
      sujet.length > 160 ||
      phone.length > 40 ||
      service.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Un ou plusieurs champs sont trop longs." },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "votre-email@domaine.com"; // Remplacez par votre email de réception
    const from = process.env.RESEND_FROM_EMAIL || "Contact Form <onboarding@resend.dev>"; 
    // Note : Pour les comptes non-vérifiés, Resend impose l'utilisation du domaine ou e-mail validé (souvent onboarding@resend.dev)

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouveau message de ${name} - ${sujet}`,
      // On passe le composant React directement (le "await" devant ContactEmail est optionnel sauf si vous utilisez des hooks asynchrones internes)
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
      console.error("Erreur spécifique Resend :", error);
      return NextResponse.json(
        { error: "Le service de messagerie a rencontré une erreur." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });

  } catch (err) {
    console.error("Erreur critique sur la route /api/contact:", err);
    return NextResponse.json(
      { error: "Une erreur interne du serveur est survenue." },
      { status: 500 }
    );
  }
}