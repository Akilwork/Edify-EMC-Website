import type { Metadata } from "next";
import CaseStudiesHero from "@/components/sections/case-studies/CaseStudiesHero";
import CaseStudiesGrid from "@/components/sections/case-studies/CaseStudiesGrid";
import CaseStudiesCtaSection from "@/components/sections/case-studies/CaseStudiesCtaSection";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Discover how Edify EMC has helped organisations achieve transformative results through strategic consulting.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudiesHero />
      <CaseStudiesGrid />
      <CaseStudiesCtaSection />
    </>
  );
}
