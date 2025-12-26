import { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="text-4xl mb-4 text-secondary-500">
        {service.icon || "🔧"}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary-700">
        {service.name}
      </h3>
      <p className="text-neutral-600">{service.description}</p>
    </div>
  );
}