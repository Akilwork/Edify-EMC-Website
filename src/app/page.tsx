import HeroSection from "@/components/sections/home/HeroSection";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import WhyEdifySection from "@/components/sections/home/WhyEdifySection";
import ChairmanTransitionToCta from "@/components/sections/home/ChairmanTransitionToCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverviewSection />
      <WhyEdifySection />
      <ChairmanTransitionToCta />
    </>
  );
}
