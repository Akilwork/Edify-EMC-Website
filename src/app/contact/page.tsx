import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import ContactInfoSection from "@/components/sections/contact/ContactInfoSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Edify Management Consultancy. We'd love to discuss how we can help transform your organisation.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactInfoSection />
    </>
  );
}
