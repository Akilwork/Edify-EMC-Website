"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ChairmanSection from "./ChairmanSection";
import CtaSection from "./CtaSection";

export default function ChairmanTransitionToCta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we are running in the browser
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const chairmanWord = container.querySelector(".excellence-chairman") as HTMLElement;
    const ctaWord = container.querySelector(".excellence-cta") as HTMLElement;
    const ctaSection = container.querySelector("#cta") as HTMLElement;
    const chairmanSection = container.querySelector("#chairman") as HTMLElement;
    

    
    const chairmanFadeTexts = container.querySelectorAll(".chairman-fade-text");
    const chairmanFadeEls = container.querySelectorAll(".chairman-fade-el");
    
    const ctaFadeTexts = container.querySelectorAll(".cta-fade-text");
    const ctaFadeEls = container.querySelectorAll(".cta-fade-el");

    if (!chairmanWord || !ctaWord || !ctaSection || !chairmanSection) return;

    // Create the floating overlay element that morphs between the two states
    const floatWord = document.createElement("span");
    floatWord.innerText = "Excellence";
    floatWord.className = "excellence-float fixed pointer-events-none select-none font-sans font-semibold text-black";
    
    // Set initial custom styling styles
    floatWord.style.zIndex = "999";
    floatWord.style.transformOrigin = "left top";
    floatWord.style.opacity = "0"; // Start hidden
    floatWord.style.display = "inline-block";

    document.body.appendChild(floatWord);

    // Copy initial styling from ChairmanSection
    const chairmanStyles = window.getComputedStyle(chairmanWord);
    floatWord.style.fontFamily = chairmanStyles.fontFamily;
    floatWord.style.fontWeight = chairmanStyles.fontWeight;
    floatWord.style.lineHeight = chairmanStyles.lineHeight;
    floatWord.style.letterSpacing = chairmanStyles.letterSpacing;

    // Calculate coordinates for transition
    const calculateCoords = () => {
      const chairmanRect = chairmanWord.getBoundingClientRect();
      const ctaRect = ctaWord.getBoundingClientRect();
      const ctaSecRect = ctaSection.getBoundingClientRect();

      // Viewport position of chairmanWord when chairmanSection is sticky at the top
      const startTop = chairmanRect.top;
      const startLeft = chairmanRect.left;
      const startWidth = chairmanRect.width;
      const startHeight = chairmanRect.height;

      // The viewport coordinate of ctaWord when ctaSection is at top: 0
      const endTop = ctaRect.top - ctaSecRect.top;
      const endLeft = ctaRect.left;
      const endWidth = ctaRect.width;
      const endHeight = ctaRect.height;

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
      // 1. Initial setups of hidden state for Cta Section items (fade in on scroll)
      gsap.set([ctaFadeTexts, ctaFadeEls], { opacity: 0, y: 40 });

      // 2. Setup ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSection,
          start: "top bottom", // Starts when CtaSection enters the bottom of the viewport
          end: "top top",     // Ends when CtaSection is at the top of the viewport
          scrub: 0.5,         // Smooth scrubbing
          invalidateOnRefresh: true,
          onEnter: () => {
            coords = calculateCoords();
            
            // Set styles of floatWord to match chairmanWord exactly
            gsap.set(floatWord, {
              top: coords.startTop,
              left: coords.startLeft,
              width: coords.startWidth,
              height: coords.startHeight,
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              color: "#000000",
              opacity: 1,
            });

            // Hide original words
            gsap.set(chairmanWord, { opacity: 0 });
            gsap.set(ctaWord, { opacity: 0 });
          },
          onLeaveBack: () => {
            // Restore original words when scrolling back up completely
            gsap.set(chairmanWord, { opacity: 1 });
            gsap.set(ctaWord, { opacity: 1 });
            gsap.set(floatWord, { opacity: 0 });
          },
          onLeave: () => {
            // Restore cta word when scrolling past the transition
            gsap.set(ctaWord, { opacity: 1 });
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
              color: "#000000",
              opacity: 1,
            });
            gsap.set(chairmanWord, { opacity: 0 });
            gsap.set(ctaWord, { opacity: 0 });
          }
        }
      });

      // 3. Fade out Chairman contents
      tl.to([chairmanFadeTexts, chairmanFadeEls], {
        opacity: 0,
        y: -30,
        stagger: 0.02,
        duration: 0.5,
        ease: "power1.inOut"
      }, 0);

      // 4. Fade and slide in CtaSection content
      tl.to([ctaFadeTexts, ctaFadeEls], {
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
        color: "#FFFFFF", // Morph color from black (chairman) to white (cta)
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
      {/* Sticky container for ChairmanSection */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden z-10">
        <ChairmanSection animate={false} />
      </div>

      {/* Relative container for CtaSection that scrolls over */}
      <div className="relative w-full bg-black z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <CtaSection animate={false} />
      </div>
    </div>
  );
}
