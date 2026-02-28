'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { ContactFormData } from '@/types'
import { Select } from '@/components/ui/Select'
import { toFormData } from 'axios'
import { Form } from 'lucide-react'


type ContactFormValues = {
  name: string;
  email: string;
  sujet: string;
  phone: string;
  service: string;
  message: string;
};

const initialValues: ContactFormData = {
  name: '',
  email: '',
  sujet: '',
  message: '',
  phone: '',
  service: undefined,
}


export default function ContactForm() {

  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Envoi...");

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setStatus("Message envoyé ✅");
    } else {
      setStatus("Erreur lors de l'envoi");
    }
  }

  return (
    <Card variant="default" className="max-w-2xl mx-auto">
      <form name="contact" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom complet"
            name="name"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Sujet"
            name="sujet"
            required
          />
          <Input
            label="Téléphone (optionnel)"
            name="phone"
            type="tel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-500 mb-2">
            Service intéressé
          </label>
          <Select
            className="w-full p-4 px-4 py-2 border-2 border-neutral-light rounded-lg bg-primary focus:border-accent-500"
            name="service"
            options={ [
              { value: 'web-dev', label: 'Développement Web' },
              { value: 'iot', label: 'IoT & Automatisation' },
              { value: 'informatique', label: 'Support Informatique' },
              { value: 'montage-pc', label: 'Montage PC' },
            ] }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-500 mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            className="w-full px-4 py-2 border-2 border-neutral-light rounded-lg focus:border-accent-500 focus:outline-none"
            placeholder="Votre message..."
          />
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="btn--primary w-full"
        >
          Envoyer le message
        </Button>
      </form>
      {status && <p className="text-green-500">{status}</p>}
    </Card>
  )
}