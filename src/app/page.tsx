import HeroSection from "@/components/sections/home/HeroSection";
import IntroSection from "@/components/sections/home/IntroSection";
import ServicesOverviewSection from "@/components/sections/home/ServicesOverviewSection";
import WhyEdifySection from "@/components/sections/home/WhyEdifySection";
import ChairmanSection from "@/components/sections/home/ChairmanSection";
import CtaSection from "@/components/sections/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesOverviewSection />
      <WhyEdifySection />
      <ChairmanSection />
      <CtaSection />
    </>
  );
}
