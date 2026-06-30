"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ChairmanSection({ animate = true }: { animate?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="chairman"
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
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center" ref={ref}>

          {/* Left: Photo */}
          <motion.div
            initial={animate ? { opacity: 0, x: -40 } : undefined}
            animate={animate && inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-1 chairman-photo flex justify-center lg:justify-start"
          >
            {/* Card wrapper — natural blob shape comes from Subtract1.png PNG transparency */}
            <div
              className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] mx-auto lg:mx-0"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))" }}
            >
              {/* The PNG itself is the organic blob mask — render it as the base layer */}
              <div className="relative w-full">
                <Image
                  src="/Chairman/Subtract1.png"
                  alt="Zakir Hussain Kamaluddin - Chairman"
                  width={480}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
                />

                {/* Bottom gradient + name overlay, clipped to the same blob shape */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 38%, transparent 65%)",
                    /* Clip to the PNG blob so gradient doesn't bleed outside */
                    WebkitMaskImage: "url('/Chairman/Subtract1.png')",
                    WebkitMaskSize: "100% 100%",
                    maskImage: "url('/Chairman/Subtract1.png')",
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
          </motion.div>

 
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
              className="font-sans font-semibold leading-tight mb-4 sm:mb-6 chairman-heading text-left"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
            >
              <span className="text-[#2D2D2D] chairman-fade-text">Building Institutions That Inspire </span>
              <span className="relative inline-block">
                <span className="excellence-placeholder invisible select-none hidden">Excellence</span>
                <span className="excellence-chairman text-black inline-block">Excellence</span>
              </span>
              <span className="text-[#2D2D2D] chairman-fade-text"> And</span>
              <span className="text-black chairman-fade-text"> Lasting Impact</span>
            </motion.h2>

            <motion.p
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#8B8B8B] text-fluid-lg leading-relaxed max-w-2xl lg:max-w-none chairman-description text-left"
            >
              We believe that education is the foundation of progress. By strengthening 
              institutions through innovation, integrity, and collaboration, we help create 
              environments where students, educators, and communities can achieve their fullest potential.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
