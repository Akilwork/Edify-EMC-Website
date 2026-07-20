"use client";

import Image from "next/image";
import RevealSection from "./RevealSection";
import CtaButton from "./CtaButton";
import type { ServiceDetail } from "@/data/service-details";

export default function DetailHero({
  detail,
  onConsultation,
}: {
  detail: ServiceDetail;
  onConsultation: () => void;
}) {
  const [primary, secondary] = detail.hero.ctas;

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-black">
      {/* Background image with left-to-right dark gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={detail.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black/30" />
      </div>

      <div className="relative z-10 flex flex-col min-h-[100svh] px-6 py-20 md:px-12 lg:px-20 xl:px-32">
        <div className="mt-auto pb-16 md:pb-24 lg:pb-32 flex flex-col max-w-4xl">
          {/* Service eyebrow */}
          <RevealSection>
            <p className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-[0.2em] mb-4">
              {detail.title}
            </p>
          </RevealSection>

          {/* Hero headline (the tagline) */}
          <RevealSection delay={0.05}>
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal leading-tight tracking-tight text-white mb-6">
              {detail.hero.tagline}
            </h1>
          </RevealSection>



          {/* Supporting copy */}
          <RevealSection delay={0.15}>
            <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-10">
              {detail.hero.supportingCopy}
            </p>
          </RevealSection>

          {/* CTAs — both route to the consultation modal */}
          <RevealSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <CtaButton label={primary.label} onClick={onConsultation} variant="solid" theme="dark" />
              <CtaButton label={secondary.label} onClick={onConsultation} variant="outline" theme="dark" withArrow={false} />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
