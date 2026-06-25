"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaSection from "./CtaSection";
import ChairmanSection from "./ChairmanSection";

export default function CtaToChairmanTransition() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we are running in the browser
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctaWord = container.querySelector(".excellence-cta") as HTMLElement;
    const chairmanWord = container.querySelector(".excellence-chairman") as HTMLElement;
    const chairmanSection = container.querySelector("#chairman") as HTMLElement;
    

    
    const ctaFadeTexts = container.querySelectorAll(".cta-fade-text");
    const ctaFadeEls = container.querySelectorAll(".cta-fade-el");
    
    const chairmanFadeTexts = container.querySelectorAll(".chairman-fade-text");
    const chairmanFadeEls = container.querySelectorAll(".chairman-fade-el");

    if (!ctaWord || !chairmanWord || !chairmanSection) return;

    // Create the floating overlay element that morphs between the two states
    const floatWord = document.createElement("span");
    floatWord.innerText = "Excellence";
    floatWord.className = "excellence-float fixed pointer-events-none select-none font-heading font-semibold text-white";
    
    // Set initial custom styling styles
    floatWord.style.zIndex = "999";
    floatWord.style.transformOrigin = "left top";
    floatWord.style.opacity = "0"; // Start hidden
    floatWord.style.display = "inline-block";

    document.body.appendChild(floatWord);

    // Copy initial styling from CtaSection
    const ctaStyles = window.getComputedStyle(ctaWord);
    floatWord.style.fontFamily = ctaStyles.fontFamily;
    floatWord.style.fontWeight = ctaStyles.fontWeight;
    floatWord.style.lineHeight = ctaStyles.lineHeight;
    floatWord.style.letterSpacing = ctaStyles.letterSpacing;

    // Calculate coordinates for transition
    const calculateCoords = () => {
      const ctaRect = ctaWord.getBoundingClientRect();
      const chairmanRect = chairmanWord.getBoundingClientRect();
      const chairmanSecRect = chairmanSection.getBoundingClientRect();

      const startTop = ctaRect.top;
      const startLeft = ctaRect.left;
      const startWidth = ctaRect.width;
      const startHeight = ctaRect.height;

      // The viewport coordinate of chairmanWord when chairmanSection is at top: 0
      const endTop = chairmanRect.top - chairmanSecRect.top;
      const endLeft = chairmanRect.left;
      const endWidth = chairmanRect.width;
      const endHeight = chairmanRect.height;

      return {
        startTop,
        startLeft,
        startWidth,
        startHeight,
        endTop,
        endLeft,
        endWidth,
        endHeight,
        deltaX: endLeft - startLeft,
        deltaY: endTop - startTop,
        scaleX: endWidth / startWidth,
        scaleY: endHeight / startHeight,
      };
    };

    let coords = calculateCoords();

    // Context for GSAP cleanups
    let ctx = gsap.context(() => {
      // 1. Initial setups of hidden state for Chairman Section items
      gsap.set([chairmanFadeTexts, chairmanFadeEls], { opacity: 0, y: 40 });

      // 2. Setup ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chairmanSection,
          start: "top bottom", // Starts when ChairmanSection enters the bottom of the viewport
          end: "top top",     // Ends when ChairmanSection is at the top of the viewport
          scrub: 0.5,         // Smooth scrubbing
          invalidateOnRefresh: true,
          onEnter: () => {
            coords = calculateCoords();
            
            // Set styles of floatWord to match ctaWord exactly
            gsap.set(floatWord, {
              top: coords.startTop,
              left: coords.startLeft,
              width: coords.startWidth,
              height: coords.startHeight,
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              color: "#FFFFFF",
              opacity: 1,
            });

            // Hide original words
            gsap.set(ctaWord, { opacity: 0 });
            gsap.set(chairmanWord, { opacity: 0 });
          },
          onLeaveBack: () => {
            // Restore original words when scrolling back up completely
            gsap.set(ctaWord, { opacity: 1 });
            gsap.set(chairmanWord, { opacity: 1 });
            gsap.set(floatWord, { opacity: 0 });
          },
          onLeave: () => {
            // Restore chairman word when scrolling past the transition
            gsap.set(chairmanWord, { opacity: 1 });
            gsap.set(floatWord, { opacity: 0 });
          },
          onEnterBack: () => {
            coords = calculateCoords();
            gsap.set(floatWord, {
              top: coords.startTop,
              left: coords.startLeft,
              width: coords.startWidth,
              height: coords.startHeight,
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              color: "#FFFFFF",
              opacity: 1,
            });
            gsap.set(ctaWord, { opacity: 0 });
            gsap.set(chairmanWord, { opacity: 0 });
          }
        }
      });

      // 3. Fade out CTA contents
      tl.to([ctaFadeTexts, ctaFadeEls], {
        opacity: 0,
        y: -30,
        stagger: 0.02,
        duration: 0.5,
        ease: "power1.inOut"
      }, 0);



      // 5. Fade and slide in ChairmanSection content
      tl.to([chairmanFadeTexts, chairmanFadeEls], {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power2.out"
      }, 0.3);

      // 6. Transition the floating word "Excellence"
      tl.to(floatWord, {
        x: () => {
          coords = calculateCoords();
          return coords.deltaX;
        },
        y: () => {
          coords = calculateCoords();
          return coords.deltaY;
        },
        scaleX: () => {
          coords = calculateCoords();
          return coords.scaleX;
        },
        scaleY: () => {
          coords = calculateCoords();
          return coords.scaleY;
        },
        color: "#000000", // Morph color from white to black
        duration: 1.0,
        ease: "power1.inOut"
      }, 0);

    }, container);

    // Handle resize to update float positions and scroll triggers
    const handleResize = () => {
      coords = calculateCoords();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      if (floatWord.parentNode) {
        floatWord.parentNode.removeChild(floatWord);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Sticky container for CtaSection */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden z-10">
        <CtaSection />
      </div>

      {/* Relative container for ChairmanSection that scrolls over */}
      <div className="relative w-full bg-white z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
        <ChairmanSection animate={false} />
      </div>
    </div>
  );
}
