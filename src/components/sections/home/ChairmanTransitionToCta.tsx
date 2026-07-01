"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import ChairmanSection from "./ChairmanSection";
import CtaSection from "./CtaSection";

/**
 * Shared Sticky Word Transition — "Excellence"
 *
 * Z-stack inside the pinned wrapper (height: 100svh):
 *   z-10  ChairmanSection   ← base, visible at rest
 *   z-20  CTA panel         ← slides up on scroll
 *   z-30  Portal div        ← Excellence floats HERE above CTA the whole time
 *
 * Animation sequence:
 *  [0→0.55 ] Chairman description reveals, other text fades out
 *  [0.55   ] Excellence detaches into portal at its original position
 *  [0.55→0.78] Excellence floats (scrubbed) from chairman heading → prominent
 *              standalone position center-right of viewport (design reference)
 *  [0.6    ] CTA panel slides up from below
 *  [0.78   ] Flip: Excellence moves from float position → CTA heading
 *  [end    ] Wrapper unpins
 *
 * Reverse: onLeaveBack restores Excellence to Chairman heading.
 */
export default function ChairmanTransitionToCta() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ctaPanelRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, Flip);

    const wrapper = wrapperRef.current;
    const ctaPanel = ctaPanelRef.current;
    const portal = portalRef.current;
    if (!wrapper || !ctaPanel || !portal) return;

    // ── Element queries ────────────────────────────────────────────────────────
    const chairmanSection = wrapper.querySelector<HTMLElement>("#chairman");
    const excellenceChairman = wrapper.querySelector<HTMLElement>(".excellence-chairman");
    const excellenceCta = wrapper.querySelector<HTMLElement>(".excellence-cta");
    const excellencePlaceholder = wrapper.querySelector<HTMLElement>(".excellence-placeholder");

    const chairmanSubheading = wrapper.querySelector<HTMLElement>(".chairman-subheading");
    const chairmanHeading = wrapper.querySelector<HTMLElement>(".chairman-heading");
    const chairmanPhoto = wrapper.querySelector<HTMLElement>(".chairman-photo");
    const chairmanDescription = wrapper.querySelector<HTMLElement>(".chairman-description");

    const chairmanFadeTexts = Array.from(wrapper.querySelectorAll<HTMLElement>(".chairman-fade-text"));
    const ctaFadeTexts = Array.from(wrapper.querySelectorAll<HTMLElement>(".cta-fade-text"));
    const ctaFadeEls = Array.from(wrapper.querySelectorAll<HTMLElement>(".cta-fade-el"));
    const ctaExcellencePlaceholder = wrapper.querySelector<HTMLElement>(".cta-excellence-placeholder");

    if (!chairmanSection || !excellenceChairman || !excellenceCta) return;

    // ── Stash original DOM anchor for reverse restoration ─────────────────────
    const originalParent = excellenceChairman.parentElement!;
    const originalSibling = excellenceChairman.nextSibling;

    /**
     * Safe reparent: moves `node` from wherever it currently lives.
     * Avoids "removeChild: node is not a child" by always detaching from
     * the node's *actual* current parent before inserting elsewhere.
     */
    const safeRestore = () => {
      // If it's already back home, nothing to do.
      if (excellenceChairman.parentElement === originalParent) return;
      // Detach from wherever GSAP left it (portal or CTA heading).
      excellenceChairman.parentElement?.removeChild(excellenceChairman);
      // Re-insert at the original position.
      if (originalSibling && originalParent.contains(originalSibling as Node)) {
        originalParent.insertBefore(excellenceChairman, originalSibling);
      } else {
        originalParent.appendChild(excellenceChairman);
      }
    };

    // ── Initial states ─────────────────────────────────────────────────────────
    gsap.set(ctaPanel, { yPercent: 100 });
    gsap.set([...ctaFadeTexts, ...ctaFadeEls], { opacity: 0, y: 40 });
    gsap.set(excellenceChairman, { willChange: "transform, opacity" });
    if (chairmanDescription) {
      gsap.set(chairmanDescription, { opacity: 0, y: 30 });
    }

    // ── Portal float coordinates (set on moveToPortal, used in animateFloat) ──
    let portalStartX = 0, portalStartY = 0;
    let portalEndX = 0, portalEndY = 0;
    let portalW = 0;

    // ── Flip state machine ────────────────────────────────────────────────────
    let currentParent = "original"; // "original" | "portal" | "cta"
    let activeFlipTl: gsap.core.Timeline | null = null;

    const restoreExcellence = () => {
      activeFlipTl?.kill();
      activeFlipTl = null;

      safeRestore();

      if (excellencePlaceholder) excellencePlaceholder.classList.add("hidden");
      if (ctaExcellencePlaceholder) {
        ctaExcellencePlaceholder.style.display = "";
        ctaExcellencePlaceholder.style.visibility = "hidden";
      }

      gsap.set(excellenceChairman, { clearProps: "all" });
      gsap.set(excellenceChairman, { willChange: "transform, opacity" });
    };

    /**
     * Move Excellence into the portal div and fix it at its original screen
     * coordinates using explicit left/top (avoids Flip.fit cross-layer bug).
     * Also records start + end coordinates for the scroll-scrubbed float.
     */
    const moveToPortal = () => {
      safeRestore();
      gsap.set(excellenceChairman, { clearProps: "all" });

      // Measure natural position relative to wrapper before reparenting
      const elRect = excellenceChairman.getBoundingClientRect();
      const wRect = wrapper.getBoundingClientRect();
      portalW = elRect.width;
      portalStartX = elRect.left - wRect.left;
      portalStartY = elRect.top - wRect.top;

      // Float target: center of viewport, slightly right — matches design reference
      //   horizontally centred (50% wrapper − half element width)
      //   vertically at 44% viewport height
      portalEndX = wRect.width * 0.50 - portalW / 2;
      portalEndY = wRect.height * 0.44 - elRect.height / 2;

      // Reparent to portal
      portal.appendChild(excellenceChairman);
      if (excellencePlaceholder) excellencePlaceholder.classList.remove("hidden");

      // Pin at original position with explicit coords
      gsap.set(excellenceChairman, {
        position: "absolute",
        left: portalStartX,
        top: portalStartY,
        width: portalW,
        margin: 0,
      });
    };

    /**
     * Scrub the Excellence word across the viewport during the portal phase.
     * t = 0 → original chairman heading position
     * t = 1 → large floating standalone position (center of screen)
     */
    const animateFloat = (t: number) => {
      // ease-in-out quad for natural feel
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      gsap.set(excellenceChairman, {
        left: portalStartX + (portalEndX - portalStartX) * e,
        top: portalStartY + (portalEndY - portalStartY) * e,
        // Gently scale up as it floats centre — evokes "breaking free" from text
        scale: 1 + e * 0.35,
        color: `rgba(45,45,45,${1 - e * 0.15})`, // stays dark until CTA flip
      });
    };

    /**
     * GSAP Flip from current float position → natural inline position in CTA heading.
     */
    const doFlip = () => {
      // Capture state while Excellence is absolutely positioned in the portal
      const state = Flip.getState(excellenceChairman);

      // Remove from portal
      portal.removeChild(excellenceChairman);

      // Insert inline into CTA heading (before the absolute placeholder)
      const ctaParent = excellenceCta.parentElement!;
      ctaParent.insertBefore(excellenceChairman, excellenceCta);

      // Clear portal absolute coords so Flip can measure the natural destination
      gsap.set(excellenceChairman, {
        clearProps: "position,left,top,width,margin,scale",
        color: "#ffffff",
      });

      activeFlipTl = Flip.from(state, {
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(excellenceChairman, { color: "#ffffff", clearProps: "transform" });
          if (ctaExcellencePlaceholder) ctaExcellencePlaceholder.style.display = "none";
        },
      }) as gsap.core.Timeline;
    };

    // ── Master scrubbed timeline ──────────────────────────────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chairmanSection,
          start: "top top",
          end: "+=200%",
          pin: wrapper,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            restoreExcellence();
            currentParent = "original";
          },
          onRefresh: () => {
            restoreExcellence();
            currentParent = "original";
          },
          onUpdate: (self) => {
            const p = self.progress;

            if (p < 0.55) {
              // ── Phase: Chairman visible ──────────────────────────────────────
              if (currentParent !== "original") {
                restoreExcellence();
                currentParent = "original";
              }

            } else if (p < 0.78) {
              // ── Phase: Excellence floats in portal ───────────────────────────
              if (currentParent !== "portal") {
                if (currentParent === "cta") restoreExcellence();
                moveToPortal();
                currentParent = "portal";
              }
              // Scrub the floating position every frame
              const t = (p - 0.55) / (0.78 - 0.55); // 0→1 across portal phase
              animateFloat(Math.min(1, Math.max(0, t)));

            } else {
              // ── Phase: Excellence in CTA heading ─────────────────────────────
              if (currentParent !== "cta") {
                if (currentParent === "original") moveToPortal();
                doFlip();
                currentParent = "cta";
              }
            }
          }
        },
      });

      // Phase 1 → Chairman description paragraph reveals
      if (chairmanDescription) {
        tl.to(
          chairmanDescription,
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          0.1
        );
      }

      // Phase 2 → Chairman elements fade out (Excellence detaches at 0.55)
      const fadeOutElements = [...chairmanFadeTexts];
      if (chairmanSubheading) fadeOutElements.push(chairmanSubheading);
      if (chairmanPhoto) fadeOutElements.push(chairmanPhoto);
      if (chairmanDescription) fadeOutElements.push(chairmanDescription);

      tl.to(
        fadeOutElements,
        { opacity: 0, y: -60, stagger: 0.03, duration: 0.2, ease: "power2.in" },
        0.45
      );

      // Phase 3 → CTA panel slides up while Excellence is floating (0.62)
      tl.to(ctaPanel, { yPercent: 0, duration: 0.25, ease: "power2.out" }, 0.62);

      // Phase 4 → CTA supporting text rises after Excellence lands (0.80)
      tl.to(
        [...ctaFadeTexts, ...ctaFadeEls],
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.22, ease: "power2.out" },
        0.80
      );
    }, wrapper);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      activeFlipTl?.kill();
      // Restore Excellence BEFORE ctx.revert() to prevent GSAP from trying
      // to move a node that we've already relocated, causing removeChild errors.
      safeRestore();
      gsap.set(excellenceChairman, { clearProps: "all" });
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* z-10: Chairman section */}
      <div className="absolute inset-0 z-10">
        <ChairmanSection animate={false} />
      </div>

      {/* z-20: CTA panel — slides up on scroll */}
      <div
        ref={ctaPanelRef}
        className="absolute inset-0 z-20"
        style={{ willChange: "transform" }}
      >
        <CtaSection animate={false} />
      </div>

      {/* z-30: Portal — Excellence floats here above both sections */}
      <div
        ref={portalRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
