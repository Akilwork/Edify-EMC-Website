"use client";

import { useConsultation } from "@/components/providers/ConsultationProvider";
import type { ServiceDetail } from "@/data/service-details";
import DetailHero from "./DetailHero";
import DetailOverview from "./DetailOverview";
import DetailCapabilities from "./DetailCapabilities";
import DetailWhyItMatters from "./DetailWhyItMatters";
// import DetailApproach from "./DetailApproach"; // hidden
import DetailWhyChoose from "./DetailWhyChoose";
import DetailRelated from "./DetailRelated";
import CtaSection from "@/components/sections/home/CtaSection";

/**
 * Single client boundary for the service detail page.
 * Calls useConsultation() once and threads the callback to the Hero
 * section, which renders the consult button. The final CTA reuses the
 * home page's CtaSection (with the current service pre-selected).
 */
export default function ServiceDetailClient({ detail }: { detail: ServiceDetail }) {
  const { openConsultation } = useConsultation();

  return (
    <>
      <DetailHero detail={detail} onConsultation={openConsultation} />
      <DetailOverview detail={detail} />
      <DetailCapabilities detail={detail} />
      <DetailWhyItMatters detail={detail} />
      {/* <DetailApproach detail={detail} /> */}
      <DetailWhyChoose detail={detail} />
      <DetailRelated detail={detail} currentSlug={detail.slug} />
      <CtaSection defaultService={detail.title} />
    </>
  );
}
