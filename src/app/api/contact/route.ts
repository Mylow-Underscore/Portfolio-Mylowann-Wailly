// import { prisma } from "@/database/db";
import { ReactElement } from "react";
import { render } from "@react-email/render";

import * as React from "react";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "@/components/template/contact";
import { util } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const utils = require("util");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const sujet = String(formData.get("sujet") || "");
    const phone = String(formData.get("phone") || "");
    const service = String(formData.get("service") || "");

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: 'portfolio@wailly-mylowann.fr',
      subject: `Nouveau message de ${name}`,
      react: utils.promisify(ContactEmail)({ name, email, sujet, message, phone, service }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}