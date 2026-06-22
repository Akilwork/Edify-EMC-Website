"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function IntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 40%, #0f0f23 100%)",
      }}
    >
      {/* Main Content */}
      <div
        ref={ref}
        className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center"
      >
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            One Trusted Partner for Every Educational
            Institution Need
          </h1>
        </motion.div>

        {/* 3D Card Image */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
            <Image
              src="/assets/Group 42.png"
              alt="Edify 3D Isometric Cube"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
    </section>
  );
}
