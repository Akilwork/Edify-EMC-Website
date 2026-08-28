"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const CARDS_DATA = [
  {
    image: "/assets/careers/career-1.png",
    alt: "Professional working on laptop",
    offset: "translate-y-16"
  },
  {
    image: "/assets/careers/career-2.png",
    alt: "Female advisor presenting in meeting",
    offset: "translate-y-0"
  },
  {
    image: "/assets/careers/career-3.png",
    alt: "Diverse corporate coworkers collaborating",
    offset: "translate-y-8"
  },
  {
    image: "/assets/careers/career-4.png",
    alt: "Modern open-plan creative office interior",
    offset: "translate-y-0"
  },
  {
    image: "/assets/careers/career-5.png",
    alt: "Male developer programming at desk",
    offset: "translate-y-16"
  }
];

export default function CareerHero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // GSAP Animations on Mount
  useEffect(() => {
    // Initial entry animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1 }
    );

    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9 },
      "-=0.7"
    );



    // Staggered entry for cards
    tl.fromTo(
      ".career-card-wrapper",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" },
      "-=0.7"
    );

    // Continuous float loop animation (applied to the inner container to avoid overriding layout coordinates)
    const floatElements = document.querySelectorAll(".career-card-inner");
    const floatTweens = Array.from(floatElements).map((el, idx) => {
      const direction = idx % 2 === 0 ? -1 : 1;
      const amplitude = 12 + (idx % 3) * 4; // 12px, 16px, 20px variation
      const duration = 3.2 + idx * 0.45; // 3.2s, 3.65s, 4.1s, etc. variation
      
      return gsap.to(el, {
        y: `${direction * amplitude}px`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: idx * 0.15
      });
    });

    return () => {
      tl.kill();
      floatTweens.forEach((t) => t.kill());
    };
  }, []);

  const scrollToPositions = () => {
    const section = document.getElementById("open-positions");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black pt-28 sm:pt-36 pb-20 md:pb-28 flex flex-col items-center justify-between"
    >
      {/* Background visual glow matches teal design theme */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#3ABAB4]/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Hero Content Section */}
      <div className="relative z-10 w-full container-responsive container-max text-center px-4 flex flex-col items-center mb-16 md:mb-24">
        <h1 className="hero-title font-sans text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white max-w-4xl leading-[1.12]">
          Build Your Career. <br className="sm:hidden" /> Shape What&apos;s Next.
        </h1>
        
        <p className="hero-subtitle text-white/60 text-sm sm:text-base md:text-md max-w-2xl mt-6 leading-relaxed font-sans font-normal">
          Join a growing team where your ideas, skills, and ambition can create meaningful impact.
        </p>


      </div>

      {/* GSAP Staggered Cards container */}
      <div className="relative w-full z-10 container-responsive container-max max-w-[1240px]">
        {/* Horizontal flex swipeable container on mobile, fixed grid on desktop */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-6 py-8 w-full max-w-full lg:overflow-x-visible lg:snap-none lg:px-0 lg:py-0 lg:grid lg:grid-cols-5 lg:gap-6">
          {CARDS_DATA.map((card, idx) => {
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={idx}
                className={`career-card-wrapper flex-shrink-0 w-[240px] sm:w-[280px] lg:w-auto snap-center lg:block transition-all duration-500 ${card.offset}`}
              >
                {/* Inner wrapper animates the floating loop */}
                <div className="career-card-inner w-full h-full">
                  <div
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative overflow-hidden rounded-[24px] aspect-[3/4.2] border border-white/10 transition-all duration-500 ease-out cursor-pointer ${
                      isHovered
                        ? "scale-105 shadow-2xl shadow-[#3ABAB4]/15 border-[#3ABAB4]/30 z-20"
                        : isAnyHovered
                        ? "opacity-35 scale-95 z-0"
                        : "opacity-90 z-10"
                    }`}
                  >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 280px, 240px"
                      className="object-cover object-center filter grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-500"
                      priority={idx <= 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

