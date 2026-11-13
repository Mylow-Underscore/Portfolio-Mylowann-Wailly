import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

function parseLimit(value: string | null): number {
  if (!value || !/^\d+$/.test(value)) return DEFAULT_LIMIT;

  return Math.min(Math.max(Number(value), 1), MAX_LIMIT);
}

/** Recherche des clients par nom, code de référence, e-mail, téléphone ou identifiant. */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn || (!session.isAdmin && !session.isCompta)) {
      return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
    }

    const query = req.nextUrl.searchParams.get("q")?.trim() ?? "";
    if (query.length < 2) {
      return NextResponse.json(
        { error: "Saisissez au moins 2 caractères pour rechercher un client." },
        { status: 400 }
      );
    }

    const clientId = /^\d+$/.test(query) ? Number(query) : undefined;
    const clients = await prisma.fiche_Client.findMany({
      where: {
        OR: [
          { nom_Prenom: { contains: query } },
          { code_Reference: { contains: query } },
          { email: { contains: query } },
          { tel: { contains: query } },
          ...(clientId && Number.isSafeInteger(clientId) ? [{ id: clientId }] : []),
        ],
      },
      orderBy: { nom_Prenom: "asc" },
      take: parseLimit(req.nextUrl.searchParams.get("limit")),
    });

    const logs_points_fidelite = await prisma.logs_Points_Fidelite.findMany({
      where: {
        OR: [
          { clientCode: { contains: query } },
          { description: { contains: query } },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: parseLimit(req.nextUrl.searchParams.get("limit")),
    });

    return NextResponse.json({
      query,
      logs_points_fidelite,
      clients: clients.map((client) => ({
        id: client.id,
        code: client.code_Reference,
        mot_de_passe: client.mot_de_passe,
        raison_Sociale: client.raison_Sociale,
        siret: client.siret,
        tel: client.tel,
        email: client.email,
        nomPrenom: client.nom_Prenom,
        createdAt: client.createdAt,
      })),
    });
  } catch (error) {
    console.error("[RECHERCHE CLIENTS] Erreur :", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
