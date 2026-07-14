"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function VisionValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const orbitalContainerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;

    const init = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");

        gsap = gsapModule.default;
        ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const content = contentRef.current;
        const leftCol = leftColumnRef.current;
        const rightCol = rightColumnRef.current;
        const orbital = orbitalContainerRef.current;
        const r1 = ring1Ref.current;
        const r2 = ring2Ref.current;
        const r3 = ring3Ref.current;
        const g1 = glow1Ref.current;
        const g2 = glow2Ref.current;
        const center = centerImageRef.current;

        if (!section || !content || !leftCol || !rightCol) return;

        // ─── SCROLL-TRIGGERED FADE-IN WITH BLUR PARALLAX ───
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 15%",
            scrub: 1.2,
          },
        });

        // Content fades in with blur
        tl.fromTo(
          content,
          {
            opacity: 0,
            filter: "blur(15px)",
            y: 80,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );

        // Left column parallax from left
        tl.fromTo(
          leftCol,
          {
            opacity: 0,
            x: -100,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
          }
        );

        // Right column parallax from right with scale
        tl.fromTo(
          rightCol,
          {
            opacity: 0,
            x: 100,
            filter: "blur(12px)",
            scale: 0.88,
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        );

        // ─── CONTINUOUS ORBITAL ROTATION ANIMATION ───
        if (orbital && r1 && r2 && r3 && g1 && g2 && center) {
          // Ring 1 - slow rotation
          gsap.to(r1, {
            rotation: 360,
            duration: 45,
            repeat: -1,
            ease: "none",
          });

          // Ring 2 - medium rotation (opposite direction)
          gsap.to(r2, {
            rotation: -360,
            duration: 35,
            repeat: -1,
            ease: "none",
          });

          // Ring 3 - faster rotation
          gsap.to(r3, {
            rotation: 360,
            duration: 25,
            repeat: -1,
            ease: "none",
          });

          // Glow pulses
          gsap.to([g1, g2], {
            opacity: 0.4,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Center image subtle float
          gsap.to(center, {
            y: -8,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          // Parallax effect on orbital rings during scroll
          gsap.to(orbital, {
            y: -50,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // ─── AMBIENT GLOW ANIMATION ───
        const blueGlow = section.querySelector(".blue-glow");
        const greenGlow = section.querySelector(".green-glow");

        if (blueGlow && greenGlow) {
          gsap.to(blueGlow, {
            x: 30,
            y: -30,
            scale: 1.1,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.to(greenGlow, {
            x: -30,
            y: 30,
            scale: 1.15,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      } catch (error) {
        console.error("Failed to initialize GSAP:", error);
      }
    };

    init();

    return () => {
      if (gsap && ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
        gsap.killTweensOf("*");
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden flex items-center"
    >
      {/* ─── DOT BACKGROUND ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundSize: "20px 20px",
          backgroundImage: "radial-gradient(#555 1.5px, transparent 1.5px)",
        }}
      />

      {/* ─── RADIAL GRADIENT FADE OVERLAY ─── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, #000000 90%)",
        }}
      />

      {/* ─── AMBIENT RADIAL GRADIENT GLOWS ─── */}
      {/* Blue glow - top right */}
      <div
        ref={glow1Ref}
        className="blue-glow absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Green glow - bottom left */}
      <div
        ref={glow2Ref}
        className="green-glow absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.04) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1920px] mx-auto px-8 md:px-16 lg:px-20 xl:px-32"
      >
        <div className="grid lg:grid-cols-[45%_55%] gap-0 items-center justify-center">
          {/* ─── LEFT COLUMN: CONTENT ─── */}
          <div ref={leftColumnRef} className="order-2 lg:order-1 opacity-0">
            {/* Main heading */}
            <h2 className="font-sans text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-semibold text-white leading-[1.08] tracking-tight mb-8">
              <span className="block">Shaping The Future Of</span>
              <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Excellence
              </span>
              <span className="block mt-4 text-white/90">
                Empowering Institutions
              </span>
              <span className="block text-white/80">Through Expertise</span>
            </h2>

            {/* Description text */}
            <p className="text-white/50 text-[15px] md:text-[16px] lg:text-[17px] leading-[1.75] max-w-[520px] font-light">
              To help educational institutions overcome operational challenges,
              unlock growth opportunities, and create environments where students,
              educators, and communities can thrive.
            </p>

            {/* Optional CTA button */}
            <button className="mt-10 group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <span className="relative z-10 text-white/90 text-sm font-medium tracking-wide">
                Learn More
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* ─── RIGHT COLUMN: ORBITAL ILLUSTRATION ─── */}
          <div
            ref={rightColumnRef}
            className="order-1 lg:order-2 flex items-center justify-center opacity-0"
          >
            <div
              ref={orbitalContainerRef}
              className="relative w-full max-w-[520px] xl:max-w-[580px] aspect-square flex items-center justify-center"
            >
              {/* ─── ORBITAL RING 1 (Outer) ─── */}
              <div
                ref={ring1Ref}
                className="absolute inset-0 will-change-transform"
              >
                {/* Main ring */}
                <div
                  className="absolute inset-0 rounded-full border border-blue-500/20"
                  style={{
                    boxShadow: `
                      0 0 60px rgba(59, 130, 246, 0.1),
                      inset 0 0 60px rgba(59, 130, 246, 0.05)
                    `,
                  }}
                />

                {/* Accent dot at 3 o'clock */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" />

                {/* Accent dot at 9 o'clock */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400/80 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
              </div>

              {/* ─── ORBITAL RING 2 (Middle) ─── */}
              <div
                ref={ring2Ref}
                className="absolute inset-[8%] will-change-transform"
              >
                {/* Main ring */}
                <div
                  className="absolute inset-0 rounded-full border border-green-500/15"
                  style={{
                    boxShadow: `
                      0 0 50px rgba(34, 197, 94, 0.08),
                      inset 0 0 50px rgba(34, 197, 94, 0.04)
                    `,
                  }}
                />

                {/* Accent dot at 6 o'clock */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_18px_rgba(34,197,94,0.5)]" />

                {/* Small accent dot at 12 o'clock */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400/60 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.3)]" />
              </div>

              {/* ─── ORBITAL RING 3 (Inner) ─── */}
              <div
                ref={ring3Ref}
                className="absolute inset-[16%] will-change-transform"
              >
                {/* Main ring */}
                <div
                  className="absolute inset-0 rounded-full border border-purple-500/10"
                  style={{
                    boxShadow: `
                      0 0 40px rgba(168, 85, 247, 0.06),
                      inset 0 0 40px rgba(168, 85, 247, 0.03)
                    `,
                  }}
                />
              </div>

              {/* ─── CENTER IMAGE CONTAINER ─── */}
              <div
                ref={centerImageRef}
                className="relative w-[52%] aspect-square rounded-full overflow-hidden border-4 border-white/5 z-10 will-change-transform"
                style={{
                  boxShadow: `
                    0 0 80px rgba(59, 130, 246, 0.15),
                    0 0 40px rgba(34, 197, 94, 0.1),
                    inset 0 0 60px rgba(0, 0, 0, 0.3)
                  `,
                }}
              >
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 z-10 pointer-events-none" />

                {/* Image */}
                <Image
                  src="/about/hero/circular_img.png"
                  alt="Vision & Values"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 300px"
                  priority
                />

                {/* Inner glow ring */}
                <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM FADE GRADIENT ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </section>
  );
}
