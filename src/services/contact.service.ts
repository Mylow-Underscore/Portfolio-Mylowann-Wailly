export const contactService = {
  async send(formData: {
    name: string
    email: string
    message: string
  }) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      throw new Error('Erreur lors de l’envoi du message')
    }

    return res.json()
  },
}