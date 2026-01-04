'use client'

import { useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { contactService } from '@/types/contact.service'
import { contactSchema } from '@/utils/validation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { ContactFormData } from '@/types'

const initialValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  phone: '',
  service: undefined,
}

const onSubmit = async (values: ContactFormData) => {
  const validated = contactSchema.parse(values)
  
  await contactService.send({
    name: validated.name,
    email: validated.email,
    message: validated.message
  })
}


export default function ContactForm() {
  const form = useForm<ContactFormData>({
    initialValues,
    onSubmit
  })
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  return (
    <Card variant="default" className="max-w-2xl mx-auto">
      <form onSubmit={form.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom complet"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            error={form.error || undefined}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.values.email}
            onChange={form.handleChange}
            error={form.error || undefined}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Sujet"
            name="subject"
            value={form.values.subject}
            onChange={form.handleChange}
            error={form.error || undefined}
            required
          />
          <Input
            label="Téléphone (optionnel)"
            name="phone"
            type="tel"
            value={form.values.phone}
            onChange={form.handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-500 mb-2">
            Service intéressé
          </label>
          <select
            name="service"
            value={form.values.service || ''}
            onChange={form.handleChange}
            className="w-full p-4 px-4 py-2 border-2 border-neutral-light rounded-lg bg-primary focus:border-accent-500"
          >
            <option className='hover:bg-secondary' value="">-- Sélectionner --</option>
            <option value="web-dev">Développement Web</option>
            <option value="iot">IoT & Automatisation</option>
            <option value="informatique">Support Informatique</option>
            <option value="montage-pc">Montage PC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-500 mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={form.values.message}
            onChange={form.handleChange as any}
            rows={5}
            className="w-full px-4 py-2 border-2 border-neutral-light rounded-lg focus:border-accent-500 focus:outline-none"
            placeholder="Votre message..."
          />
          {form.error && (
            <p className="text-sm text-status-error mt-2">
              {form.error}
            </p>
          )}
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 bg-status-success/20 border border-status-success rounded-lg text-status-success">
            Message envoyé avec succès! Je vous répondrai bientôt.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-status-error/20 border border-status-error rounded-lg text-status-error">
            Une erreur est survenue. Veuillez réessayer.
          </div>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="btn--primary w-full"
          isLoading={form.loading}
          disabled={form.loading}
        >
          Envoyer le message
        </Button>
      </form>
    </Card>
  )
}