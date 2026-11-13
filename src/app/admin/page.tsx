"use client";

import { useCallback, useEffect, useState } from "react";
import CustomLink from "@/components/ui/Link";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/ui/Typography";
import { Dashboard } from "@/components/admin/dashboard";
import { Clients } from "@/components/admin/clients";

const C = {
  black: "#000000",
  rose: "#FF66C4",
  bordeaux: "#80004E",
  gris: "#BFBFBF",
  blanc: "#FFFFFF",
  grisDark: "#111111",
  grisMid: "#1A1A1A",
  border: "#222222",
};

interface Client {
  id: number;
  code: string;
  nomPrenom: string;
  tel: string | null;
  email: string | null;
  createdAt: string;
}

type Tab = "dashboard" | "clients";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [clients, setClients] = useState<Client[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) return;
      const data = await res.json();
      setClients(data.clients ?? []);
    } catch {
      setClients([]);
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (r) => {
        if (!r.ok) {
          router.replace("/login");
          return;
        }

        const d = await r.json();
        if (!d.isAdmin) {
          router.replace("/compte");
          return;
        }

        await fetchData();
      })
      .catch(() => router.replace("/login"));
  }, [fetchData, router]);

  const TABS: { key: Tab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "clients", label: `Clients (${clients.length})` },
  ];

  return (
    <div className="h-screen bg-background"  style={{fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <nav className="sticky top-0 z-100 bg-primary-500 justify-end" style={{ backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, padding: "0 32px", height: 60, display: "flex", alignItems: "center" }}>
         <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <CustomLink href="/compte">
            Mon compte
          </CustomLink>
          <motion.button type="button" onClick={fetchData} whileTap={{ scale: 0.95 }} style={{ background: C.grisDark, border: `1px solid ${C.border}`, color: C.gris, padding: "6px 14px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ↻
          </motion.button>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
        <div className="max-md:hidden md:flex relative" style={{ gap: 0, marginBottom: 0, borderBottom: `1px solid ${C.border}` }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.key ? C.rose : "transparent"}`,
                color: activeTab === tab.key ? C.rose : C.gris,
                padding: "12px 24px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "inherit",
                marginBottom: -1,
                transition: "color 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-md:flex md:hidden" style={{ flexDirection: "column", gap: 12, marginBottom: 8, borderBottom: `1px solid ${C.border}`, backgroundColor: C.grisMid, padding: 12, borderRadius: 6 }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.key ? C.rose : "transparent"}`,
                color: activeTab === tab.key ? C.rose : C.gris,
                padding: "12px 24px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "inherit",
                marginBottom: -1,
                transition: "color 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "clients" && <Clients />}
        </AnimatePresence>
      </div>
    </div>
  );
}