import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import CtaSection from "@/components/sections/home/CtaSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Edify Management Consultancy — our story, mission, values, and the team behind our success.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CtaSection />
    </>
  );
}
