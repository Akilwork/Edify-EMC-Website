"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

export default function OurJourneySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="our-journey" className="bg-[#0A0D14] py-24 md:py-32 overflow-hidden relative">

      {/* Subtle teal glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3ABAB4]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Video/Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#1C2030] border border-white/10 shadow-2xl group cursor-pointer">
              {/* Poster image */}
              <Image
                src="/Rectangle 53.png"
                alt="Edify journey video"
                fill
                className="object-cover opacity-70 group-hover:opacity-60 transition-opacity duration-300"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14]/60 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Play size={22} className="text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Video label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-white/60 text-[12px] font-medium tracking-widest uppercase mb-1">Our Story</div>
                <div className="text-white text-[1rem] font-semibold font-heading">Building the Future of Education Management</div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-5 bg-[#3ABAB4] text-white rounded-2xl px-5 py-4 shadow-2xl"
            >
              <div className="text-[1.8rem] font-bold leading-none font-heading">12+</div>
              <div className="text-[11px] font-medium opacity-90 mt-0.5">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-8 h-[2px] bg-[#3ABAB4]" />
              <span className="text-[#3ABAB4] text-[13px] font-semibold tracking-[0.2em] uppercase">
                Our Journey
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] font-bold text-white leading-[1.15] mb-6"
            >
              A Decade of Transforming
              <br />
              <span className="text-[#3ABAB4]">Educational Institutions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-[15px] leading-relaxed mb-6"
            >
              Founded with a singular mission — to elevate educational institutions
              through integrated management excellence — Edify Management Consultancy
              has grown from a boutique advisory practice into the region's leading
              education-sector consultancy.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/60 text-[15px] leading-relaxed mb-10"
            >
              Today, we partner with over 50 institutions — from independent schools
              to multi-campus university groups — delivering measurable transformation
              across every pillar of institutional management.
            </motion.p>

            {/* Timeline milestones */}
            <div className="space-y-4">
              {[
                { year: "2012", event: "Founded as a boutique education consultancy" },
                { year: "2016", event: "Expanded to full-service institutional management" },
                { year: "2020", event: "Surpassed 30+ institutional clients across the region" },
                { year: "2024", event: "Launched integrated EdTech advisory practice" },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-8 rounded-full bg-[#3ABAB4]/10 border border-[#3ABAB4]/20 flex items-center justify-center">
                    <span className="text-[#3ABAB4] text-[11px] font-bold">{item.year}</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-white/5 group-hover:bg-[#3ABAB4]/20 transition-colors duration-300" />
                  <p className="text-white/50 text-[13px] flex-shrink-0 max-w-[60%] text-right">
                    {item.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
