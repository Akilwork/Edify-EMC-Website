"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ServicesOverviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services-overview" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20">
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

      <div className="relative z-10 w-full container-responsive container-xl text-center" ref={ref}>
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-sans font-normal text-black leading-[1.1] tracking-tight max-w-5xl mx-auto">
            <span 
              className="block mb-2"
              style={{ fontSize: 'clamp(1.75rem, 7vw, 5rem)' }}
            >
              Creating A Structured Path to
            </span>
            <span 
              className="block mb-2"
              style={{ fontSize: 'clamp(1.75rem, 7vw, 5rem)' }}
            >
              Institutional Growth Impact
            </span>
            <span 
              className="block"
              style={{ fontSize: 'clamp(1.75rem, 7vw, 5rem)' }}
            >
              in Education
            </span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}