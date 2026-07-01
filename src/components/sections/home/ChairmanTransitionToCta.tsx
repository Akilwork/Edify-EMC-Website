"use client";

import ChairmanSection from "./ChairmanSection";
import CtaSection from "./CtaSection";

/**
 * Animation disabled — ChairmanSection and CtaSection render as
 * normal stacked flow sections with no GSAP / ScrollTrigger / Flip.
 */
export default function ChairmanTransitionToCta() {
  return (
    <>
      <ChairmanSection />
      <CtaSection />
    </>
  );
}
