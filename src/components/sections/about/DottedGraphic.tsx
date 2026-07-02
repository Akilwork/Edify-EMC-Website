"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import gsap from "gsap";

interface DottedGraphicProps {
  isVisible?: boolean;
}

export interface DottedGraphicRef {
  setScrollProgress: (progress: number) => void;
}

/**
 * DottedGraphic - Programmatic SVG dotted pattern
 *
 * Creates an elegant, modern dotted graphic element that:
 * - Randomly scattered dots (not grid pattern)
 * - Varying sizes for visual depth
 * - Increases density as user scrolls
 * - Subtle floating motion when settled
 */
export const DottedGraphic = forwardRef<DottedGraphicRef, DottedGraphicProps>(
  ({ isVisible = true }, ref) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const groupRef = useRef<SVGGElement>(null);
    const dotsRef = useRef<SVGCircleElement[]>([]);
    const baseOpacityRef = useRef<number[]>([]);
    const [isReady, setIsReady] = useState(false);

    // Expose method to update scroll progress
    useImperativeHandle(ref, () => ({
      setScrollProgress: (progress: number) => {
        const dots = dotsRef.current;
        const baseOpacities = baseOpacityRef.current;

        dots.forEach((dot, i) => {
          if (dot && baseOpacities[i] !== undefined) {
            // Each dot becomes visible when progress passes its threshold
            const threshold = i / dots.length;
            const shouldShow = progress >= threshold;

            const targetOpacity = shouldShow ? baseOpacities[i] : 0;

            gsap.to(dot, {
              attr: { opacity: targetOpacity },
              scale: shouldShow ? 1 : 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
    }));

    useEffect(() => {
      if (!svgRef.current || !isVisible) return;

      const svg = svgRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight * 0.4; // Top 40% of screen

      // Set SVG dimensions
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

      // Clear any existing dots
      if (groupRef.current) {
        while (groupRef.current.firstChild) {
          groupRef.current.removeChild(groupRef.current.firstChild);
        }
      }

      const dots: SVGCircleElement[] = [];
      const baseOpacities: number[] = [];

      // Generate randomly scattered dots - decreased density
      const totalDots = 350; // Decreased from 800 for lower density

      // Define scattering bounds - more spread out across full width
      const marginX = width * 0.05;
      const marginY = height * 0.15;
      const scatterWidth = width - marginX * 2;
      const scatterHeight = height - marginY * 2;

      for (let i = 0; i < totalDots; i++) {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        );

        // Random position across full width
        const x = marginX + Math.random() * scatterWidth;
        const y = marginY + Math.random() * scatterHeight;

        // Tiny sizes - very small dots
        const size = 0.8 + Math.random() * 1.5; // 0.8 to 2.3 pixels (tiny)

        // Varying opacity for depth
        const opacity = 0.25 + Math.random() * 0.5;

        circle.setAttribute("cx", x.toString());
        circle.setAttribute("cy", y.toString());
        circle.setAttribute("r", size.toString());
        circle.setAttribute("fill", "white");
        circle.setAttribute("opacity", "0"); // Start hidden

        groupRef.current?.appendChild(circle);
        dots.push(circle);
        baseOpacities.push(opacity);
      }

      dotsRef.current = dots;
      baseOpacityRef.current = baseOpacities;
      setIsReady(true);

      // Initial state - all dots hidden
      gsap.set(dots, { scale: 0 });

      // Sort dots by position for staggered entrance from top-left to bottom-right
      const sortedDots = [...dots].sort((a, b) => {
        const ay = parseFloat(a.getAttribute("cy") || "0");
        const ax = parseFloat(a.getAttribute("cx") || "0");
        const by = parseFloat(b.getAttribute("cy") || "0");
        const bx = parseFloat(b.getAttribute("cx") || "0");
        return (ay + ax * 0.5) - (by + bx * 0.5);
      });

      // Staggered entrance animation for initial dots (first 25%)
      const initialDotCount = Math.floor(dots.length * 0.25);
      const initialDots = sortedDots.slice(0, initialDotCount);

      gsap.to(initialDots, {
        scale: 1.2,
        attr: { opacity: (i, dot) => {
          const idx = dots.indexOf(dot);
          return Math.min(baseOpacities[idx] * 1.2, 1);
        }},
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "start"
        },
        ease: "power2.out",
        delay: 0.3
      });

      // Gentle floating animation - more subtle for tiny dots
      dots.forEach((dot) => {
        const originalCx = parseFloat(dot.getAttribute("cx") || "0");
        const originalCy = parseFloat(dot.getAttribute("cy") || "0");

        // Subtle floating for tiny dots
        const floatX = (Math.random() - 0.5) * 2;
        const floatY = (Math.random() - 0.5) * 1.5;
        const duration = 2.5 + Math.random() * 2.5;

        gsap.to(dot, {
          attr: {
            cx: originalCx + floatX,
            cy: originalCy + floatY
          },
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 1
        });
      });

      return () => {
        gsap.killTweensOf(dots);
      };
    }, [isVisible]);

    return (
      <svg
        ref={svgRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "5%", height: "40%", zIndex: 40 }}
        aria-hidden="true"
      >
        <g ref={groupRef} />
      </svg>
    );
  }
);

DottedGraphic.displayName = "DottedGraphic";
