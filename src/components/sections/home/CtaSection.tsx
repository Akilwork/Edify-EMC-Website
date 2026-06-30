"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection({ animate = true }: { animate?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background image */}
      <div className="absolute inset-0 z-0 cta-bg-container">
        <Image
          src="/assets/image 2505.png"
          alt="Educational classroom"
          fill
          className="object-cover object-center cta-bg-image"
          quality={85}
          sizes="100vw"
        />
      </div>

      <div className="container-responsive container-max relative z-10">
        <div
          ref={ref}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h2
            initial={animate ? { opacity: 0, y: 30 } : undefined}
            animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7 }}
            className="font-sans font-medium text-white leading-[1.15] mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(1.5rem, 0.97rem + 2.25vw, 3.5rem)' }}
          >
            <span className="block mb-2 sm:whitespace-nowrap">
              <span className="relative inline-block">
                <span className="cta-excellence-placeholder invisible select-none">Excellence</span>
                <span className="excellence-cta absolute left-0 top-0 text-white opacity-0 pointer-events-none">Excellence</span>
              </span>
              <span className="cta-fade-text"> in education starts with institutions</span>
            </span>
            <span className="block cta-fade-text">built for the future.</span>
          </motion.h2>

          <motion.p
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 text-fluid-base md:text-fluid-lg leading-relaxed mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto cta-fade-el"
          >
            Partner With Edify Management Consultancy Today And Experience The Power Of Professional,
            Results-Driven Services Across Every Domain That Matters.
          </motion.p>

          <motion.div
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 cta-fade-el"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-sans text-[clamp(0.8125rem,0.75rem+0.28vw,0.875rem)] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl cursor-pointer w-full sm:w-auto justify-center"
            >
              Get a Free Consultation
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-md text-white font-sans text-[clamp(0.8125rem,0.75rem+0.28vw,0.875rem)] font-semibold rounded-full border border-white/40 hover:bg-white/15 hover:border-white/60 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
