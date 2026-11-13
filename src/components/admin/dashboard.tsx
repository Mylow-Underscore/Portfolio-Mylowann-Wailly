"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

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

interface Client {
  id: number;
  code: string;
  mot_de_passe: string;
  nomPrenom: string;
  raison_Sociale: string | null;
  siret: string | null;
  tel: string | null;
  email: string | null;
  createdAt: string;
}

type Tab = "dashboard" | "clients" | "commandes en ligne" | "commandes" | "points";

function StatCard({ label, value, color, sub }: { label: string; value: string | number; color: string; sub?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: C.grisDark, border: `1px solid ${C.border}`, padding: "20px 22px" }}>
      <p style={{ color: C.gris, fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 6px" }}>{label}</p>
      <p style={{ color, fontWeight: 900, fontSize: 30, margin: "0 0 2px", letterSpacing: "-0.02em" }}>{value}</p>
      {sub && <p style={{ color: "#444", fontSize: 11, margin: 0 }}>{sub}</p>}
    </motion.div>
  );
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("tous");
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [cr] = await Promise.all([
        fetch("/api/clients"),
      ]);
      if (cr.ok) { const d = await cr.json(); setClients(d.clients ?? []); }
    } catch (error) {
      console.error("Fetch clients error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me").then(async (r) => {
      if (!r.ok) { router.replace("/login"); return; }
      const d = await r.json();
      if (!d.isAdmin) { router.replace("/compte"); return; }
      fetchData();
    }).catch(() => router.replace("/login"));
  }, [router, fetchData]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("fr-FR");
  

  const TABS: { key: Tab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "clients", label: `Clients (${clients.length})` },
  ];

  return (
    <>
      <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ paddingTop: 32 }}>
        <div className="max-md:hidden md:grid relative" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 40 }}>
          <StatCard label="Clients" value={clients.length} color={C.rose} />
        </div>
        <div className="max-md:grid md:hidden" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 40 }}>
          <StatCard label="Clients" value={clients.length} color={C.rose} />
        </div>
      </motion.div>
    </>
  );
}