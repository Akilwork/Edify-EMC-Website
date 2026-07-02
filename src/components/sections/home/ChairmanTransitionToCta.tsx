"use client";

import ChairmanSection from "./ChairmanSection";
import CtaSection from "./CtaSection";

export default function ChairmanTransitionToCta() {
  return (
    <>
      <ChairmanSection animate={true} />
      <CtaSection animate={true} />
    </>
  );
}

