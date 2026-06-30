import HeroSection from "@/components/sections/home/HeroSection";
import IntroSection from "@/components/sections/home/IntroSection";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import WhyEdifySection from "@/components/sections/home/WhyEdifySection";
import ChairmanTransitionToCta from "@/components/sections/home/ChairmanTransitionToCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesOverviewSection />
      <WhyEdifySection />
      <ChairmanTransitionToCta />
    </>
  );
}
