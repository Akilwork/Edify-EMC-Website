import type { Metadata } from "next";
import ServicesScroll from "@/components/sections/services/ServicesScroll";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Edify EMC's comprehensive management consulting services — from strategic planning to organisational transformation.",
};

export default function ServicesPage() {
  return <ServicesScroll />;
}
