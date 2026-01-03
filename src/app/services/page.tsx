import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/data/services";
import Typography from '@/components/ui/Typography';

export const metadata = {
  title: "Nos Services - PM Rénovation",
  description: "Découvrez tous nos services de rénovation générale",
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen text-secondary-400 overflow-hidden flex items-center bg-primary-500 z-1">
      <Container className="">
        <Typography variant="h1" className="font-bold text-center mb-4 text-primary-700">Mes services</Typography>
        <Typography variant="body-base" className="text-center mb-12 text-neutral-600">
          Je propose une gamme complète de services pour tous vos
          besoins en Informatique.
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </main>
  );
}