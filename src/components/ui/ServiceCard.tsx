import { Service } from '@/types/service'
import Typography from '@/components/ui/Typography'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-primary-500bg-white/70 rounded-2xl rounded-lg border border-gray-200/50 p-6 p-8 shadow-md backdrop-blur-sm transition-all transition-shadow duration-500 hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl hover:shadow-lg dark:border-gray-800/50 dark:bg-gray-900/70 dark:hover:bg-gray-900/90">
      <Typography variant="h3" className="mb-4 text-center">
        {service.icon || '🔧'}
      </Typography>
      <Typography variant="h3" className="text-primary-700 mb-2 font-semibold">
        {service.name}
      </Typography>
      <Typography variant="body-base" className="mb-4 text-neutral-600">
        {service.description}
      </Typography>
    </div>
  )
}
