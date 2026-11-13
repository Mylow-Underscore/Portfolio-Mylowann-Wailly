"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import CustomLink from "@/components/ui/Link";

const C = {
  black: "#000000",
  rose: "#FF66C4",
  bordeaux: "#80004E",
  gris: "#BFBFBF",
  blanc: "#FFFFFF",
  grisDark: "#111111",
  grisMid: "#1A1A1A",
  border: "#222222",
  success: "#4FD080",
  warning: "#F0C040",
  error: "#FF4444",
};

interface ClientData {
  id: number;
  code: string;
  nomPrenom: string;
  raison_Sociale: string | null;
  siret: string | null;
  facturation: string | null;
  tel: string | null;
  email: string | null;
  createdAt: string;
}


export default function ComptePage() {
  const [client, setClient] = useState<ClientData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCompta, setIsCompta] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"infos" | "commandes" | "fidelite">("infos");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then(async (r) => {
        if (!r.ok) { router.replace("/login"); return; }
        const d = await r.json();
        setClient(d.client);
        setIsAdmin(d.isAdmin);
        setIsCompta(d.isCompta);
      }),
    ]).catch(() => router.replace("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const copyCode = () => {
    if (!client) return;
    navigator.clipboard.writeText(client.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (n: string) => n.trim().split(" ").map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2);
  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const formatDateShort = (d: string) => new Date(d).toLocaleDateString("fr-FR");


  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ color: C.gris, fontSize: 13, letterSpacing: "0.3em", textTransform: "uppercase" }}>Chargement…</motion.div>
      </div>
    );
  }

  if (!client) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.black, fontFamily: "'Helvetica Neue', Arial, sans-serif", color: C.blanc }}>
      <nav className="sticky top-0 z-100 bg-primary-500 justify-end" style={{ backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 32px", height: 60, display: "flex"}}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {isAdmin && (
            <CustomLink href="/admin" >Admin ⚙</CustomLink>
          )}
          {isCompta && (
            <CustomLink href="/compta" >Compta 💰</CustomLink>
          )}
          {/* <a href="/panier" style={{ color: C.gris, textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>🛒 Panier</a> */}
          {/* <a href="/boutique/coques" style={{ color: C.gris, textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Boutique</a> */}
          <motion.button onClick={handleLogout} disabled={loggingOut} whileTap={{ scale: 0.97 }} style={{ background: "transparent", color: C.gris, border: `1px solid ${C.border}`, padding: "7px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "inherit" }}>
            {loggingOut ? "…" : "Déconnexion"}
          </motion.button>
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 32px" }}>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${C.bordeaux}, ${C.rose})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: C.blanc, flexShrink: 0 }}>
            {getInitials(client.nomPrenom)}
          </div>
          <div>
            <p className="text-secondary-400" style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 4px" }}>— Mon compte</p>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 44px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 8px" }}>{client.nomPrenom}</h1>
          </div>
        </motion.div>


        <AnimatePresence mode="wait">

          {activeTab === "infos" && (
            <motion.div key="infos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ paddingTop: 28 }}>
              <div className="max-md:hidden md:grid relative" style={{ gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
                  <p className="text-secondary-400" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Mes infos</p>
                  {[
                    { label: "Code client", value: client.code },
                    ...(client.raison_Sociale ? [{ label: "Raison sociale", value: client.raison_Sociale }] : []),
                    ...(client.siret ? [{ label: "SIRET", value: client.siret }] : []),
                    ...(client.tel ? [{ label: "Téléphone", value: client.tel }] : []),
                    ...(client.email ? [{ label: "Email", value: client.email }] : []),
                    { label: "Membre depuis", value: formatDate(client.createdAt) },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ color: C.gris, fontSize: 13 }}>{row.label}</span>
                      <span style={{ color: C.blanc, fontSize: 13, fontWeight: 700 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
                  <p className="text-secondary-400" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Accès rapide</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      // { label: "🛒 Mon panier", href: "/panier" },
                      // { label: "Boutique Coques & Écrans", href: "/boutique/coques" },
                      // { label: "Boutique Goodies & Figurines", href: "/boutique/goodies" },
                      { label: "Retour accueil", href: "/" },
                    ].map((link) => (
                      <motion.a key={link.href} href={link.href} whileHover={{ x: 6 }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", border: `1px solid ${C.border}`, textDecoration: "none", color: C.blanc, fontSize: 13, fontWeight: 600 }}>
                        {link.label} <span style={{ color: C.rose }}>→</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-md:grid md:hidden" style={{ gridTemplateColumns: "1fr", gap: 20 }}>
                <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
                  <p className="text-secondary-400" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Mes infos</p>
                  {[
                    { label: "Code client", value: client.code },
                    ...(client.tel ? [{ label: "Téléphone", value: client.tel }] : []),
                    ...(client.email ? [{ label: "Email", value: client.email }] : []),
                    { label: "Membre depuis", value: formatDate(client.createdAt) },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ color: C.gris, fontSize: 13 }}>{row.label}</span>
                      <span style={{ color: C.blanc, fontSize: 13, fontWeight: 700 }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "28px" }}>
                  <p className="text-secondary-400" style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 20px" }}>Accès rapide</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "Retour accueil", href: "/" },
                    ].map((link) => (
                      <motion.a key={link.href} href={link.href} whileHover={{ x: 6 }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", border: `1px solid ${C.border}`, textDecoration: "none", color: C.blanc, fontSize: 13, fontWeight: 600 }}>
                        {link.label} <span style={{ color: C.rose }}>→</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}