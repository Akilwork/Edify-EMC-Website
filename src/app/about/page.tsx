import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionVisionSection from "@/components/sections/about/MissionVisionSection";
import TeamSection from "@/components/sections/about/TeamSection";
import ValuesSection from "@/components/sections/about/ValuesSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Edify Management Consultancy — our story, mission, values, and the team behind our success.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
    </>
  );
}
