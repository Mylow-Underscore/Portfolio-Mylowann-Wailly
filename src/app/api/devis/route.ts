// import { prisma } from "@/database/db";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import DevisEmail from "@/components/template/devis";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY manquant");
      return NextResponse.json(
        { error: "Service email non configuré" },
        { status: 503 }
      );
    }

    const formData = await req.formData();
    const name = clean(formData.get("name"));
    const email = clean(formData.get("email"));
    const description = clean(formData.get("description"));
    const phone = clean(formData.get("phone"));
    const service = clean(formData.get("service"));
    const budget = clean(formData.get("budget"));

    // Ici je considère phone comme optionnel, comme dans ton formulaire
    if (!name || !email || !description || !service || !budget) {
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

    // Limites très basiques (à adapter)
    if (
      name.length > 120 ||
      email.length > 160 ||
      service.length > 100 ||
      budget.length > 100 ||
      description.length > 5000
    ) {
      return NextResponse.json(
        { error: "Un ou plusieurs champs sont trop longs" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "portfolio@wailly-mylowann.fr";
    const from =
      process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // pour pouvoir répondre directement au client
      subject: `Nouveau devis de ${name}`,
      react: await DevisEmail({ 
        name,
        email,
        phone,
        service,
        description,
        budget
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("Erreur /api/devis:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}