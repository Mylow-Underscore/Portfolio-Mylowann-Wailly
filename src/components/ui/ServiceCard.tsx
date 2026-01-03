import { Service } from "@/types/service";
import Typography from '@/components/ui/Typography';

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-primary-500bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white/90 dark:hover:bg-gray-900/90 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <Typography variant="h3" className="text-center mb-4">{service.icon || "🔧"}</Typography>
      <Typography variant="h3" className="font-semibold mb-2 text-primary-700">{service.name}</Typography>
      <Typography variant="body-base" className="mb-4 text-neutral-600">{service.description}</Typography>
    </div>
  );
}