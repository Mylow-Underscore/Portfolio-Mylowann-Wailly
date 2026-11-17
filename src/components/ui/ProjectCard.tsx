'use client'

import Image from 'next/image'
import CustomLink from '@/components/ui/Link'
import { Typography } from '@/components/ui/Typography'
import { Project } from '@/types/index'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ProjectCardProps {
  project: Project
}

const statusStyles: Record<Project['status'], string> = {
  'en-cours': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  terminé: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  livré: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200/50 bg-white/70 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl dark:border-gray-800/50 dark:bg-gray-900/70 dark:hover:bg-gray-900/90">
      {project.featured && (
        <div className="bg-primary-500 absolute top-4 right-4 z-50 rounded-full px-3 py-1 text-xs font-semibold text-white">
          🔥 En vedette
        </div>
      )}

      <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl transition-transform duration-500 group-hover:scale-105">
        <Image
          src={project.image}
          alt={project.title}
          loading="eager"
          sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
          className="object-cover"
          fill
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Catégorie */}
      <Typography variant="body-sm" color="accent" className="mb-2 tracking-wider uppercase">
        {project.category.replace('-', ' ').toUpperCase()}
      </Typography>

      {/* Statut */}
      <div
        className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}
      >
        {project.status === 'en-cours'
          ? '⚡ En cours'
          : project.status === 'terminé'
            ? '✅ Terminé'
            : '🚀 Livré'}
      </div>

      {/* Titre */}
      <Typography
        variant="h4"
        className="group-hover:text-primary-500 mb-3 line-clamp-2 font-bold transition-colors"
      >
        {project.title}
      </Typography>

      {/* Description */}
      <Typography variant="body-base" color="muted" className="mb-6 line-clamp-3">
        {project.description}
      </Typography>

      {/* Technologies */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 dark:bg-gray-800">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      {/* Métadonnées */}
      <div className="mb-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{format(project.createdAt, 'MMM yyyy', { locale: fr })}</span>
        {project.clientId && <span>👤 Client #{project.clientId}</span>}
      </div>

      <CustomLink href={`/portfolio/${project.slug}`}>
        {project.slug && (
          <Typography variant="body-sm" className="text-primary">
            Voir Le Projets en détails
          </Typography>
        )}
      </CustomLink>

      <CustomLink href={`${project.link}`}>
        {project.link && (
          <div className="flex gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">
            <span className="text-primary-500 flex-1 truncate text-sm font-medium hover:underline">
              Voir le projet →
            </span>
          </div>
        )}
      </CustomLink>
    </div>
  )
}
