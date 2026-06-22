import type { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesListSection from "@/components/sections/services/ServicesListSection";
import ServiceDetailSection from "@/components/sections/services/ServiceDetailSection";
import ServicesCtaSection from "@/components/sections/services/ServicesCtaSection";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Edify EMC's full suite of management consulting services — from strategic planning to organisational transformation.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesListSection />
      <ServiceDetailSection />
      <ServicesCtaSection />
    </>
  );
}
