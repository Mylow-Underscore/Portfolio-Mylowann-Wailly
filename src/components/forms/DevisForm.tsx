"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import Card from "../ui/Card";

type DevisFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  budget: string;
};

const initialValues: DevisFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  description: '',
  budget: '',
}

export default function DevisForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Envoi...");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/devis", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Demande de devis envoyée avec succès ✅");
    } else {
      setStatus("Erreur lors de l'envoi");
    }
  }

  return (
    <Card variant="default" className="max-w-2xl mx-auto">
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
          <label className="block text-sm font-medium text-primary-500 mb-2">
            Service intéressé
          </label>
          <Select
            className="w-full p-4 px-4 py-2 border-2 border-neutral-light rounded-lg bg-primary focus:border-accent-500"
            label="Service"
            name="service"
            options={services.map((s) => ({ value: s.id.toString(), label: s.name }))}
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
        <Button type="submit" variant="primary" size="lg" className="w-full">
          Envoyer la demande de devis
        </Button>
      </form>
      {status && <p className="text-green-500">{status}</p>}
    </Card>
  );
}