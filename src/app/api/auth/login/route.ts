import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifiant = body?.identifiant;
    const mot_de_passe = body?.mot_de_passe;

    if (!identifiant || typeof identifiant !== "string" || identifiant.trim() === "") {
      return NextResponse.json({ error: "Identifiant manquant" }, { status: 400 });
    }

    if (!mot_de_passe || typeof mot_de_passe !== "string" || mot_de_passe.trim() === "") {
      return NextResponse.json({ error: "Mot de passe manquant" }, { status: 400 });
    }

    const normalizedIdentifiant = identifiant.trim().toUpperCase();

    let client;
    try {
      client = await prisma.fiche_Client.findUnique({
        where: { code_Reference: normalizedIdentifiant, mot_de_passe: mot_de_passe },
      });
    } catch (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json(
        { error: "Impossible de contacter la base de données. Réessaie dans un instant." },
        { status: 503 }
      );
    }

    if (!client) {
      return NextResponse.json(
        { error: "Identifiant invalide. Contacte-nous si tu penses que c'est une erreur." },
        { status: 401 }
      );
    }


    const session = await getSession();
    session.clientId = client.id;
    session.code = client.code_Reference;
    session.nomPrenom = client.nom_Prenom;
    session.isLoggedIn = true;
    session.isCompta = client.code_Reference === process.env.COMPTA_CODE || client.code_Reference === process.env.ADMIN_CODE;
    session.isAdmin = client.code_Reference === process.env.ADMIN_CODE;
    await session.save();

    return NextResponse.json({
      success: true,
      client: {
        id: client.id,
        code: client.code_Reference,
        mot_de_passe: client.mot_de_passe,
        raison_Sociale: client.raison_Sociale,
        siret: client.siret,
        tel: client.tel,
        email: client.email,
        nomPrenom: client.nom_Prenom,
        createdAt: client.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Erreur serveur inattendue." }, { status: 500 });
  }
}