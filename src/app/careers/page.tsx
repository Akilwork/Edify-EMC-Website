import CareerHero from "@/components/sections/careers/CareerHero";
import CareerPillars from "@/components/sections/careers/CareerPillars";
import CareerCultureZoom from "@/components/sections/careers/CareerCultureZoom";
import CareerPositions from "@/components/sections/careers/CareerPositions";
import CtaSection from "@/components/sections/home/CtaSection";

export default function CareersPage() {
  return (
    <main className="bg-[#05060b] text-white min-h-screen">
      <CareerHero />
      <CareerPillars />
      <CareerCultureZoom />
      <CareerPositions />
      <CtaSection animate={true} />
    </main>
  );
}
