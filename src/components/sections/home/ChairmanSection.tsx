"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ChairmanSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="chairman"
      className="relative py-24 md:py-32 overflow-hidden bg-white"
    >
      {/* Background Abstract Design */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/assets/Vector.png"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" ref={ref}>

          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-[400px] mx-auto lg:mx-0">
              {/* Profile Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/Subtract.png"
                  alt="Zakir Hussain Kamaluddin - Chairman"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
                
                {/* Name card overlay - no background */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white font-heading font-bold text-xl">
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
          <div className="order-1 lg:order-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="text-black/40 text-sm font-semibold tracking-[0.2em] uppercase">
                Chairman&apos;s Vision
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl lg:text-4xl font-Semibold leading-tight mb-8"
            >
              <span className="text-[#2D2D2D]">Building Institutions That Inspire Excellence And </span>
              <span className="text-black"> Lasting Impact</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#8B8B8B] text-lg leading-relaxed mb-3"
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
