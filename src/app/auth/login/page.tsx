"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { Container } from "@/components/ui/Container";

export default function LoginPage() {
  const router = useRouter();
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <Typography variant="h1" className="text-3xl font-bold">
          Connexion
        </Typography>

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
      </div>
    </Container>
  );
}