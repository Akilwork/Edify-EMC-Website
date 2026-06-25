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
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-white font-sans"
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

      <div className="relative container-responsive container-max">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center" ref={ref}>

          {/* Left: Photo */}
          <motion.div
            initial={animate ? { opacity: 0, x: -40 } : undefined}
            animate={animate && inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1 chairman-fade-el"
          >
            <div className="relative max-w-[350px] sm:max-w-[400px] mx-auto lg:mx-0">
              {/* Profile Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <Image
                  src="/assets/Subtract.png"
                  alt="Zakir Hussain Kamaluddin - Chairman"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 350px, (max-width: 1024px) 400px, 400px"
                />
                
                {/* Name card overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="text-white font-sans font-bold text-lg sm:text-xl">
                    Zakir Hussain Kamaluddin
                  </div>
                  <div className="text-white/70 text-sm font-medium mt-1">
                    Chairman
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6 }}
              className="mb-4 sm:mb-6 chairman-fade-el"
            >
              <span className="text-black/40 text-fluid-xs font-semibold tracking-[0.2em] uppercase">
                Chairman&apos;s Vision
              </span>
            </motion.div>

            <motion.h2
              initial={animate ? { opacity: 0, y: 30 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans font-semibold leading-tight mb-6 sm:mb-8 chairman-heading"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
            >
              <span className="text-[#2D2D2D] chairman-fade-text">Building Institutions That Inspire </span>
              <span className="excellence-chairman inline-block text-black">Excellence</span>
              <span className="text-[#2D2D2D] chairman-fade-text"> And</span>
              <span className="text-black chairman-fade-text"> Lasting Impact</span>
            </motion.h2>

            <motion.p
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#8B8B8B] text-fluid-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 chairman-fade-el"
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
