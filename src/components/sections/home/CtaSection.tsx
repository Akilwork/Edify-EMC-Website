"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/image 2505.png"
          alt="Educational classroom"
          fill
          className="object-cover object-center"
          quality={85}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-heading text-[2.2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[2.2rem] font-Semibold text-white leading-[1.1] mb-8"
          >
            Excellence in education starts with institutions
            <br />
            built for the future.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/80 text-[16px] md:text-[18px] leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Partner With Edify Management Consultancy Today And Experience The Power Of Professional,
            Results-Driven Services Across Every Domain That Matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-[#0A0D14] text-[14px] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl cursor-pointer"
            >
              Get a Free Consultation
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 bg-transparent text-white text-[14px] font-semibold rounded-full border border-white/40 hover:bg-white/10 hover:border-white/60 transition-all duration-300 cursor-pointer"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
