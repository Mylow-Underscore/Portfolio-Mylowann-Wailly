import "dotenv/config";
import { env } from "prisma/config";
import { PrismaClient} from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaMariaDb({
    host: env("DB_HOST") as string,
    port: Number(env("DB_PORT")) || 3306,
    user: env("DB_USER") as string,
    password: env("DB_PASSWORD") as string,
    database: env("DB_NAME") as string,
    connectionLimit: 5,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;