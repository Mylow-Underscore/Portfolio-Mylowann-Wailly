'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Typography } from '@/components/ui/Typography'
import { ProjectCategory } from '@/types/index'
import FadeInSection from '../animations/FadeInSection'

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<string | 'all'>('all')

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const categories: Record<ProjectCategory, number> = {
    'web-dev': projects.filter((p) => p.category === 'web-dev').length,
    iot: projects.filter((p) => p.category === 'iot').length,
    informatique: projects.filter((p) => p.category === 'informatique').length,
    'montage-pc': projects.filter((p) => p.category === 'montage-pc').length,
  }

  return (
    <section id="portfolio">
      <div className="bg-primary-500 relative z-1 min-h-screen px-4 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-16 text-center">
            <Typography
              variant="h2"
              className="font-display text-primary-500 mb-4 text-5xl font-bold"
            >
              Portfolio
            </Typography>
            <Typography variant="body-base" className="text-neutral-grey mx-auto max-w-2xl text-lg">
              Découvrez mes projets récents dans le développement web, l&apos;IoT, l&apos;informatique
              et le montage PC
            </Typography>
          </FadeInSection>

          <FadeInSection className="text-center">
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              {['all' as const, ...(Object.keys(categories) as ProjectCategory[])].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'all' ? 'all' : cat)}
                  className={`rounded-xl px-6 py-2 font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat === 'all'
                    ? 'Tous'
                    : `${cat.replace('-', ' ').toUpperCase()} (${categories[cat as ProjectCategory]})`}
                </button>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection className="text-center">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </FadeInSection>

          <FadeInSection className="text-center">
            {filteredProjects.length === 0 && (
              <div className="py-20 text-center">
                <Typography variant="h3" color="muted" className="mb-4">
                  Aucun projet trouvé
                </Typography>
                <Typography variant="body-base" color="muted">
                  Essaie un autre filtre
                </Typography>
              </div>
            )}
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
