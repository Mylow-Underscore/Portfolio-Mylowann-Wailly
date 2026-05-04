"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import Card from "../ui/Card";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function DevisForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("Envoi de la demande de devis...");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus("error");
        setMessage(
          data?.error || "Erreur lors de l'envoi de la demande de devis."
        );
        return;
      }

      setStatus("success");
      setMessage("Demande de devis envoyée avec succès ✅");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Erreur réseau ou serveur.");
    }
  }

  return (
    <Card variant="default" className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Nom complet"
          type="text"
          name="name"
          required
          placeholder="Votre nom"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          required
          placeholder="votre@email.com"
        />

        <Input
          label="Téléphone"
          type="tel"
          name="phone"
          placeholder="06 12 34 56 78"
        />

        <div>
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-medium text-primary-500"
          >
            Service intéressé
          </label>

          <Select
            id="service"
            className="w-full rounded-lg border-2 border-neutral-light bg-primary px-4 py-2 focus:border-accent-500"
            label="Service"
            name="service"
            options={services.map((s) => ({
              value: s.name.toString(),
              label: s.name,
            }))}
            required
          />
        </div>

        <Textarea
          label="Description du projet"
          name="description"
          placeholder="Décrivez votre projet..."
          required
        />

        <Input
          label="Budget estimé (optionnel)"
          type="text"
          name="budget"
          placeholder="Ex: 1500 EUR"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Envoi..."
            : "Envoyer la demande de devis"}
        </Button>
      </form>

      {status !== "idle" && (
        <p
          className={`mt-4 text-sm ${
            status === "success"
              ? "text-green-500"
              : status === "error"
              ? "text-red-500"
              : "text-primary-500"
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </Card>
  );
}