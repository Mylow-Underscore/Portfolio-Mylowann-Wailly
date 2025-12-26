import HeroSection from "@/components/sections/HeroSection"
import PortfolioSection from "@/components/sections/PortfolioSection";
import Hero from "@/components/sections/Hero";
import Typography from "@/components/ui/Typography";

export default function Home() {
  return (
    <div>
      <video className="fixed z-0" autoPlay muted loop playsInline>
        <source src="/hero-bg/hero-bg-3.mp4" type="video/mp4" />
      </video>
      <Hero></Hero>
      <PortfolioSection></PortfolioSection>
      <HeroSection></HeroSection>
    </div>
  );
}
