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
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
      
      gsap.fromTo(chairmanTextRef.current?.children as unknown as HTMLElement[],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white font-sans min-h-[100svh] py-12 sm:py-16 md:py-20 lg:py-0 lg:h-[100svh] flex items-center"
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

      <div className="w-full flex flex-col justify-center my-auto relative z-10">
        {/* ================= CHAIRMAN ================= */}
        <div className="container-responsive container-max w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
            {/* Left: Photo */}
            <div
              ref={chairmanPhotoRef}
              className="relative order-1 lg:order-1 flex justify-center lg:justify-start"
            >
              <div
                className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[460px] xl:max-w-[480px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-[0_20px_48px_rgba(0,0,0,0.16)]"
              >
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src="/Chairman/Zakir_Hussain_Kamaluddin.jpg"  
                    alt="Zakir Hussain Kamaluddin - Chairman"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 380px, 480px"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
                    }}
                  >
                    <span className="text-white font-sans font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight drop-shadow-sm">
                      Zakir Hussain Kamaluddin
                    </span>
                    <span className="text-white/80 text-xs sm:text-sm md:text-base font-medium mt-0.5 sm:mt-1">
                      Chairman
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div ref={chairmanTextRef} className="order-2 lg:order-2 text-left flex flex-col justify-center">
              <div className="mb-2 sm:mb-4 lg:mb-6">
                <span className="text-black/40 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                  Chairman&apos;s Vision
                </span>
              </div>

              <h2
                className="font-sans font-semibold leading-[1.18] mb-3 sm:mb-5 lg:mb-6 text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              >
                <span className="text-[#2D2D2D]">Building Institutions That Inspire </span>
                <span className="text-black">Excellence</span>
                <span className="text-[#2D2D2D]"> And</span>
                <span className="text-black"> Lasting Impact</span>
              </h2>

              <p className="text-[#737373] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl lg:max-w-none text-left">
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
