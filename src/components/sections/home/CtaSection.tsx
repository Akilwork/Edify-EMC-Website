"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Scene10ConsultationForm from "@/components/layout/Scene10ConsultationForm";

export default function CtaSection({
  animate = true,
  defaultService,
}: {
  animate?: boolean;
  defaultService?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/about/Form/form-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Vignette: Dark on right, lighter on left */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.6) 85%, rgba(0, 0, 0, 0.3) 100%)"
          }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container-responsive container-max relative z-10 w-full">
        <div
          ref={ref}
          className="w-full max-w-[1600px] mx-auto grid lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center text-left"
        >
          {/* Left Column: Heading */}
          <div className="order-1 lg:order-1 text-left mb-8 md:mb-0">
            <motion.h2
              initial={animate ? { opacity: 0, y: 30 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7 }}
              className="font-sans text-[clamp(24px,5vw,32px)] md:text-[clamp(32px,4vw,40px)] lg:text-[clamp(36px,4vw,48px)] font-medium leading-[1.1] tracking-tight text-white mb-4"
            >
              Excellence in education starts with institutions built for the future.
            </motion.h2>
            <motion.p
              initial={animate ? { opacity: 0, y: 20 } : undefined}
              animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl"
            >
              Partner With Edify Management Consultancy Today And Experience The Power Of Professional,
              Results-Driven Services Across Every Domain That Matters.
            </motion.p>
          </div>

          {/* Right Column: Consultation Form */}
          <motion.div
            initial={animate ? { opacity: 0, y: 20 } : undefined}
            animate={animate && inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-2 w-full"
          >
            <div className="backdrop-blur-md bg-[#151515]/80 border border-white/10 rounded-xl p-5 md:p-6">
              <Scene10ConsultationForm defaultService={defaultService} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

