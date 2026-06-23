"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-end justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays matching Figma design */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%), linear-gradient(90deg, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.20) 100%)",
          }}
        />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full container-responsive container-max pt-safe pb-[clamp(4rem,12vh,10rem)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          {/* Main Heading — reveals first on load */}
          <motion.h1
            className="font-sans font-medium text-white leading-[1.15] mx-auto mb-4 xs:mb-6 sm:mb-6 lg:mb-8"
            style={{
              fontSize: "clamp(1.5rem, 0.97rem + 2.25vw, 3.5rem)",
              maxWidth: "min(92%, 1070px)",
            }}
            variants={childVariants}
          >
            Empowering Educational Institutions Through Integrated Management
            Solutions
          </motion.h1>

          {/* Subtitle — reveals second on scroll */}
          <motion.p
            className="text-white/70 mx-auto mb-6 sm:mb-8 lg:mb-10 leading-[1.4] sm:leading-[1.3]"
            style={{
              fontSize: "clamp(0.8125rem, 0.75rem + 0.28vw, 1rem)",
              maxWidth: "min(88%, 654px)",
            }}
            variants={childVariants}
          >
            From HR and finance to infrastructure, technology, student
            development, and operations, Edify Management Consultancy helps
            educational institutions grow with confidence.
          </motion.p>

          {/* CTA Buttons — reveals third on scroll */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[440px] sm:max-w-none mx-auto"
            variants={childVariants}
          >
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-5 xs:px-7 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-sans text-[clamp(0.8125rem,0.75rem+0.28vw,0.875rem)] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              Get a Consultation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 px-5 xs:px-7 sm:px-8 py-3 sm:py-4 bg-[#3a3a3a] text-white font-sans text-[clamp(0.8125rem,0.75rem+0.28vw,0.875rem)] font-semibold rounded-full border border-white/60 hover:bg-white/10 hover:border-white/80 transition-all duration-300 cursor-pointer w-full sm:w-auto"
            >
              Explore Our Solutions
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
