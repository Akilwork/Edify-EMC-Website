"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ServicesOverviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services-overview" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/Service.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center" ref={ref}>
        {/* Main Heading - Exactly as shown in design */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-black leading-[1.1] tracking-tight max-w-4xl mx-auto">
            Creating A Structured Path to Institutional Growth Impact in Education
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
