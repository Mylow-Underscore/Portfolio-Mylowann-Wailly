"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import CustomLink from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import input from "@/components/ui/Input";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";


const C = {
  black: "#000000",
  primary: "#f5f5f0",
  secondary: "#d4af37",
  gris: "#BFBFBF",
  blanc: "#FFFFFF",
  grisDark: "#111111",
  grisMid: "#1E1E1E",
  border: "#2A2A2A",
};

export default function LoginPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => { if (r.ok) router.replace("/compte"); })
      .finally(() => setChecking(false));
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiant: identifiant.trim(), mot_de_passe: motDePasse.trim() }),

      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
      } else {
        router.refresh();
      }
    } catch {
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.black, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Helvetica Neue', Arial, sans-serif", position: "relative", overflow: "hidden" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path className="stroke-blue-300" d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" />
      </svg>

      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}18 0%, transparent 70%)`, top: "50%", left: "35%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}18 0%, transparent 70%)`, top: "10%", left: "0%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.primary}18 0%, transparent 70%)`, top: "-10%", left: "65%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} style={{ fontSize: 64, marginBottom: 24, color: C.primary }}>✓</motion.div>
            <p style={{ color: C.primary, fontSize: 18, fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 8px" }}>Bienvenue !</p>
            <p style={{ color: C.gris, fontSize: 14 }}>Redirection vers ton compte…</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ width: "100%", maxWidth: 440, padding: "0 24px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ fontSize: "clamp(26px, 5vw, 40px)", fontWeight: 900, color: C.blanc, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 1, margin: "0 0 12px" }}>
                Connexion
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 10px" }}>
                Espace client
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="flex flex-col gap-2">
            <Typography variant="quote">Identifiant</Typography>
            <Input
              type="text"
              id="identifiant"
              name="identifiant"
              autoComplete="username"
              autoFocus
              value={identifiant}
              onChange={(event) => setIdentifiant(event.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="quote">Mot de passe</Typography>
            <Input
              type="password"
              id="mot_de_passe"
              name="mot_de_passe"
              autoComplete="current-password"
              value={motDePasse}
              onChange={(event) => setMotDePasse(event.target.value)}
              required
            />
          </div>

          {error && (
            <Typography variant="caption" className="text-red-500">
              {error}
            </Typography>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}