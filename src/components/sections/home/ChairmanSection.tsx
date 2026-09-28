"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

export default function ChairmanSection({ animate = true }: { animate?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Refs for Chairman
  const chairmanPhotoRef = useRef<HTMLDivElement>(null);
  const chairmanTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      // Chairman Animation
      gsap.fromTo(chairmanPhotoRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
      
      gsap.fromTo(chairmanTextRef.current?.children as unknown as HTMLElement[],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white font-sans h-[100svh] min-h-[600px] flex items-center"
    >
      {/* Background Abstract Design */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Image
          src="/assets/Vector.png"
          alt=""
          fill
          className="object-cover object-center"
          priority={false}
        />
      </div>

      <div className="w-full h-full flex flex-col justify-center">
        {/* ================= CHAIRMAN ================= */}
        <div className="relative container-responsive container-max w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left: Photo */}
            <div
              ref={chairmanPhotoRef}
              className="relative order-1 lg:order-1 flex justify-center lg:justify-start"
            >
              <div
                className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] mx-auto lg:mx-0"
                style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))" }}
              >
                <div className="relative w-full">
                  <Image
                    src="/Chairman/Zakir_Hussain_Kamaluddin.jpg"  
                    alt="Zakir Hussain Kamaluddin - Chairman"
                    width={480}
                    height={600}
                    className="w-full h-auto object-cover rounded-2xl"
                    priority
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 rounded-2xl"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 38%, transparent 65%)",
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
            <div ref={chairmanTextRef} className="order-2 lg:order-2 text-left flex flex-col justify-center">
              <div className="mb-4 sm:mb-6">
                <span className="text-black/40 text-fluid-xs font-semibold tracking-[0.2em]">
                  Chairman&apos;s Vision
                </span>
              </div>

              <h2
                className="font-sans font-semibold leading-tight mb-4 sm:mb-6 text-left"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                <span className="text-[#2D2D2D]">Building Institutions That Inspire </span>
                <span className="text-black">Excellence</span>
                <span className="text-[#2D2D2D]"> And</span>
                <span className="text-black"> Lasting Impact</span>
              </h2>

              <p className="text-[#8B8B8B] text-fluid-lg leading-relaxed max-w-2xl lg:max-w-none text-left">
                We believe that education is the foundation of progress. By strengthening
                institutions through innovation, integrity, and collaboration, we help create
                environments where students, educators, and communities can achieve their fullest potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
