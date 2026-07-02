import HeroSection from "@/components/sections/home/HeroSection";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import WhyEdifySection from "@/components/sections/home/WhyEdifySection";
import ChairmanTransitionToCta from "@/components/sections/home/ChairmanTransitionToCta";
import { ScrollStory } from "@/components/ScrollStory";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrollStory/>
      <ServicesOverviewSection />
      <WhyEdifySection />
      <ChairmanTransitionToCta />
    </>
  );
}
