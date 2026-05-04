'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus('loading');
    setMessage('Envoi en cours...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error || "Erreur lors de l'envoi.");
        return;
      }

      setStatus('success');
      setMessage('Message envoyé ✅');
      form.reset();
    } catch {
      setStatus('error');
      setMessage('Erreur réseau ou serveur.');
    }
  }

  return (
    <Card variant="default" className="mx-auto max-w-2xl">
      <form name="contact" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Nom complet" name="name" required />
          <Input label="Email" name="email" type="email" required />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input label="Sujet" name="sujet" required />
          <Input label="Téléphone (optionnel)" name="phone" type="tel" />
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-medium text-primary-500"
          >
            Service intéressé
          </label>

          <Select
            name="service"
            className="w-full rounded-lg border-2 border-neutral-light bg-primary px-4 py-2 focus:border-accent-500"
            options={[
              { value: '', label: 'Sélectionnez un service' },
              { value: 'web-dev', label: 'Développement Web' },
              { value: 'iot', label: 'IoT & Automatisation' },
              { value: 'informatique', label: 'Support Informatique' },
              { value: 'montage-pc', label: 'Montage PC' },
            ]}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-primary-500" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-lg border-2 border-neutral-light px-4 py-2 focus:border-accent-500 focus:outline-none"
            placeholder="Votre message..."
          />
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="btn--primary w-full"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Envoi...' : 'Envoyer le message'}
        </Button>
      </form>

      {status !== 'idle' && (
        <p
          className={`mt-4 text-sm ${
            status === 'success'
              ? 'text-green-500'
              : status === 'error'
              ? 'text-red-500'
              : 'text-primary-500'
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </Card>
  );
}