'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@/components/ui/Typography'
import { Project } from '@/types/index'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ProjectCardProps {
  project: Project
}

const statusStyles: Record<Project['status'], string> = {
  'en-cours': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  'terminé': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  'livré': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    
      <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-900/90">
        {project.featured && (
          <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-50">
            🔥 En vedette
          </div>
        )}

        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Catégorie */}
        <Typography variant="body-sm" color="accent" className="uppercase tracking-wider mb-2">
          {project.category.replace('-', ' ').toUpperCase()}
        </Typography>

        {/* Statut */}
        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${statusStyles[project.status]}`}>
          {project.status === 'en-cours' ? '⚡ En cours' : project.status === 'terminé' ? '✅ Terminé' : '🚀 Livré'}
        </div>

        {/* Titre */}
        <Typography 
          variant="h4" 
          className="font-bold mb-3 group-hover:text-primary-500 transition-colors line-clamp-2"
        >
          {project.title}
        </Typography>

        {/* Description */}
        <Typography variant="body-base" color="muted" className="mb-6 line-clamp-3">
          {project.description}
        </Typography>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-gray-500">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
          <span>
            {format(project.updatedAt, 'MMM yyyy', { locale: fr })}
          </span>
          {project.clientId && (
            <span>👤 Client #{project.clientId}</span>
          )}
        </div>

        <Link href={`/portfolio/${project.slug}`} className="group block">
          {project.slug && (
            <Typography variant='body-sm' className='text-primary'>Voir Le Projets en détails</Typography>
          )}
        </Link>

        <Link href={`${project.link}`} target="_blank" className="group block">
          {project.link && (
            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm font-medium text-primary-500 hover:underline flex-1 truncate">
                Voir le projet →
              </span>
            </div>
          )}
        </Link>
      </div>
  )
}
