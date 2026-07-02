"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = "Creating A Structured Path to Institutional Growth Impact in Education".split(" ");

export default function ServicesOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[];
    if (!section || wordEls.length === 0) return;

    // Start all words blurred + invisible
    gsap.set(wordEls, { filter: "blur(10px)", opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // Pin for 150vh of scroll so the animation has room to play
          end: "+=150%",
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // Stagger each word's blur removal across the timeline
      wordEls.forEach((el, i) => {
        const position = (i / (wordEls.length - 1)) * 0.7; // spread across first 70% of scroll
        tl.to(
          el,
          {
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          position
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services-overview"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20"
    >
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
            fontSize: "clamp(1.5rem, 0.97rem + 2.25vw, 3.5rem)",
            maxWidth: "min(92%, 1070px)",
          }}
        >
          {WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el; }}
              className="inline-block"
              style={{ willChange: "filter, opacity" }}
            >
              {word}
              {i < WORDS.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
