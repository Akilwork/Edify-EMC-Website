import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import DetailWhyChoose from "@/components/sections/services/detail/DetailWhyChoose";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Edify Management Consultancy. We'd love to discuss how we can help transform your organisation.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <DetailWhyChoose />
    </>
  );
}
