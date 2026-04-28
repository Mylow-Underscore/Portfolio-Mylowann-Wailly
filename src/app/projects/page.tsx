'use client'

import FadeInSection from '@/components/animations/FadeInSection';
import HeroSection from '@/components/sections/PortfolioSection';
import { Container } from '@/components/ui/Container';
import { ProjectCard } from '@/components/ui/ProjectCard';
import Typography from '@/components/ui/Typography';
import { projects } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<string | 'all'>('all')

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const categories: Record<ProjectCategory, number> = {
    'web-dev': projects.filter(p => p.category === 'web-dev').length,
    'iot': projects.filter(p => p.category === 'iot').length,
    'informatique': projects.filter(p => p.category === 'informatique').length,
    'montage-pc': projects.filter(p => p.category === 'montage-pc').length,
  }
  return (
    <div className="relative min-h-screen py-20 px-4 bg-primary-500 z-1">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <Typography variant='h2' className="text-5xl font-display font-bold text-primary-500 mb-4">
            Portfolio
          </Typography>
          <Typography variant='body-base' className="text-lg text-neutral-gray max-w-2xl mx-auto">
            Découvrez mes projets récents dans le développement web, l'IoT, l'informatique et le montage PC
          </Typography>
        </FadeInSection>

        <FadeInSection className="text-center">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {(['all' as const, ...Object.keys(categories) as ProjectCategory[]]).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'all' ? 'all' : cat)}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'Tous' : `${cat.replace('-', ' ').toUpperCase()} (${categories[cat as ProjectCategory]})`}
              </button>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection className="text-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </FadeInSection>

        <FadeInSection className="text-center">
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
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
  );
}
