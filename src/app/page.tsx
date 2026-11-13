import HeroSection from "@/components/sections/HeroSection"
import PortfolioSection from "@/components/sections/PortfolioSection";
import Hero from "@/components/sections/Hero";
import Typography from "@/components/ui/Typography";

export const metadata = {
  title: "Wyloz Buisness | Wailly Mylowann ; Développeur Web",
  description: "Découvrez le portfolio de Mylowann Wailly | Wyloz Buisness. Spécialiste en développement Web et référencement SEO, montage PC et solutions Smart Home IoT.",
  keywords: ["Wailly Mylowann", "Mylowann Wailly", "Wailly", "Mylowann", "Mylow", "Wyloz", "Wyloz Buisness", "Developpeur Web Aude", "Developpeur Montagne Noir", "wailly-mylowann.fr"],
};

export default function Home() {
  return (
    <div>
      <video className="max-md:none md:flex fixed z-0" autoPlay muted loop playsInline>
        <source src="/hero-bg/hero-bg-3.mp4" type="video/mp4" />
      </video>
      <video className="max-md:flex md:none fixed z-0" autoPlay muted loop playsInline>
        <source src="/hero-bg/hero-bg-portable.mp4" type="video/mp4" />
      </video>
      <div>
        <Hero></Hero>
        <PortfolioSection></PortfolioSection>
        <HeroSection></HeroSection>
      </div>
    </div>
  );
}