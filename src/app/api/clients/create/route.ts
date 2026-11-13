import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { generateClientCode } from "@/lib/generateCode";
import { generateMDP } from "@/lib/generateMDP";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    const { nom, prenom, tel, email, raison_Sociale, siret } = await req.json();

    if (!nom || !prenom || !siret || !raison_Sociale) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    const code = await generateClientCode(nom, prenom);

    const existing = await prisma.fiche_Client.findUnique({
      where: { code_Reference: code },
    });

    if (existing) {
      return NextResponse.json({ error: "Code déjà existant, réessaie" }, { status: 409 });
    }

    const mdp = await generateMDP(nom, prenom, siret, raison_Sociale);

    const client = await prisma.fiche_Client.create({
      data: {
        nom_Prenom: `${nom.trim()} ${prenom.trim()}`,
        code_Reference: code,
        raison_Sociale: raison_Sociale,
        siret: siret,
        tel: tel ?? null,
        email: email ?? null,
        mot_de_passe: mdp,
      },
    });

    return NextResponse.json({ success: true, client, code });
  } catch (error) {
    console.error("Create client error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}