import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export const metadata = {
  title: "Nos Services - PM Rénovation",
  description: "Découvrez tous nos services de rénovation générale",
};

export default function ServicesPage() {
  return (
    <main className="flex-grow py-16">
      <Container>
        <h1 className="text-4xl font-bold text-center mb-4 text-primary-700">
          Nos Services
        </h1>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          PM Rénovation propose une gamme complète de services pour tous vos
          travaux de rénovation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </main>
  );
}