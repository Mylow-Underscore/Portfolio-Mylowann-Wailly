"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

export default function DevisForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      description: "",
      budget: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
          Merci ! Votre demande a été reçue. Nous vous recontacterons rapidement.
        </div>
      )}
      <Input
        label="Nom complet"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Votre nom"
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="votre@email.com"
      />
      <Input
        label="Téléphone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="06 12 34 56 78"
      />
      <Select
        label="Service"
        name="service"
        value={formData.service}
        onChange={handleChange}
        options={services.map((s) => ({ value: s.id.toString(), label: s.name }))}
        required
      />
      <Textarea
        label="Description du projet"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Décrivez votre projet..."
        required
      />
      <Input
        label="Budget estimé (optionnel)"
        type="text"
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Ex: 5000 EUR"
      />
      <Button type="submit" variant="primary" size="lg" className="w-full">
        Envoyer la demande de devis
      </Button>
    </form>
  );
}