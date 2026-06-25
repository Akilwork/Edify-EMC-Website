"use client";

import Image from "next/image";
import { TextReveal } from "@/components/ui/text-reveal";

export default function ServicesOverviewSection() {
  return (
    <section id="services-overview" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/Service.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 w-full container-responsive container-xl text-center">
        <h1
          className="font-sans font-medium text-black leading-[1.15] tracking-tight mx-auto"
          style={{
            fontSize: 'clamp(1.5rem, 0.97rem + 2.25vw, 3.5rem)',
            maxWidth: 'min(92%, 1070px)',
          }}
        >
          <TextReveal mode="scroll-blur">
            Creating A Structured Path to Institutional Growth Impact in Education
          </TextReveal>
        </h1>
      </div>
    </section>
  );
}
