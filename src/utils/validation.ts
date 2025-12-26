import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(5, 'Le sujet est requis'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  phone: z.string().optional(),
  service: z.enum(['web-dev', 'iot', 'informatique', 'montage-pc']).optional(),
})

export const projectSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  description: z.string().min(10, 'La description est requise'),
  content: z.string().min(20, 'Le contenu est requis'),
  technologies: z.array(z.string()).min(1, 'Au moins une technologie est requise'),
  category: z.enum(['web-dev', 'iot', 'informatique', 'montage-pc']),
  link: z.string().url().optional().or(z.literal('')),
  status: z.enum(['en-cours', 'terminé', 'livré']),
  featured: z.boolean().default(false),
})

export const ticketSchema = z.object({
  title: z.string().min(3, 'Le titre est requis'),
  description: z.string().min(10, 'La description est requise'),
  priority: z.enum(['basse', 'moyenne', 'haute', 'critique']),
  category: z.string().min(1, 'La catégorie est requise'),
})