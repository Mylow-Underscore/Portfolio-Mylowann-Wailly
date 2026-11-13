import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();
    const isAuthorized = session.isLoggedIn && session.isCompta;

    if (!isAuthorized) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }
    const clients = await prisma.fiche_Client.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      clients: clients.map((c) => ({
        id: c.id,
        code: c.code_Reference,
        mot_de_passe: c.mot_de_passe,
        raison_Sociale: c.raison_Sociale,
        siret: c.siret,
        tel: c.tel,
        email: c.email,
        nomPrenom: c.nom_Prenom,
        createdAt: c.createdAt,
      })),
    });
  } catch (error) {
    console.error("List clients error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}