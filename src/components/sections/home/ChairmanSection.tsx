"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ChairmanSection({ animate = true }: { animate?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!animate) return;

    const section = sectionRef.current;
    const photo = photoRef.current;
    const heading = headingRef.current;
    const desc = descRef.current;

    if (!section || !photo || !heading || !desc) return;

    const ctx = gsap.context(() => {
      // ── Phase 1: Entrance — profile + heading fade in on first sight ──
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
      });

      entranceTl
        .fromTo(
          photo,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          heading,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        );

      // ── Phase 2: Pin section, then reveal description on scroll ──
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=500",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      pinTl.fromTo(
        desc,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power2.out" }
      );
    }, section);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section
      id="chairman"
      ref={sectionRef}
      className="relative w-full h-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-white font-sans py-8 sm:py-12 md:py-16"
    >
      {/* Background Abstract Design */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/assets/Vector.png"
          alt=""
          fill
          className="object-cover object-center"
          priority={false}
        />
      </div>

      <div className="relative container-responsive container-max w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* Left: Photo */}
          <div
            ref={photoRef}
            className="relative order-1 lg:order-1 chairman-photo flex justify-center lg:justify-start opacity-0"
          >
            {/* Card wrapper */}
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] mx-auto lg:mx-0">
              <div className="relative w-full">
                <Image
                  src="/assets/Subtract.png"
                  alt="Zakir Hussain Kamaluddin - Chairman"
                  width={480}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
                />

                {/* Bottom gradient + name overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 38%, transparent 65%)",
                    /* Clip to the PNG blob so gradient doesn't bleed outside */
                    WebkitMaskImage: "url('/assets/Subtract.png')",
                    WebkitMaskSize: "100% 100%",
                    maskImage: "url('/assets/Subtract.png')",
                    maskSize: "100% 100%",
                  }}
                >
                  <span className="text-white font-sans font-bold text-lg sm:text-xl lg:text-2xl leading-tight drop-shadow-sm">
                    Zakir Hussain Kamaluddin
                  </span>
                  <span className="text-white/70 text-sm sm:text-base font-medium mt-1">
                    Chairman
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-2 lg:order-2 text-left flex flex-col justify-center">
            <motion.div
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6 }}
              className="mb-4 sm:mb-6 chairman-subheading"
            >
              <span className="text-black/40 text-fluid-xs font-semibold tracking-[0.2em]">
                Chairman&apos;s Vision
              </span>
            </motion.div>
 
            <motion.h2
              initial={animate ? { opacity: 0, y: 30 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans font-semibold leading-tight mb-4 sm:mb-6 text-left"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
            >
              <span className="text-[#2D2D2D]">Building Institutions That Inspire </span>
              <span className="text-black">Excellence</span>
              <span className="text-[#2D2D2D]"> And</span>
              <span className="text-black"> Lasting Impact</span>
            </motion.h2>

            <motion.p
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#8B8B8B] text-fluid-lg leading-relaxed max-w-2xl lg:max-w-none text-left"
            >
              We believe that education is the foundation of progress. By strengthening
              institutions through innovation, integrity, and collaboration, we help create
              environments where students, educators, and communities can achieve their fullest
              potential.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
