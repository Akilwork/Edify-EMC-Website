"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Edify's HR restructuring programme transformed how we manage our 400-strong staff. Within 6 months, we saw measurable improvements in retention, morale, and operational efficiency. Truly a game-changer.",
    author: "Dr. Ahmad Farouk",
    role: "Principal",
    institution: "Al-Amin International School",
    rating: 5,
    initials: "AF",
  },
  {
    quote:
      "Their financial advisory team helped us identify RM 2.3 million in operational savings while improving our budget allocation across departments. We now have full visibility of our financials for the first time.",
    author: "Puan Siti Rahmah",
    role: "Chief Financial Officer",
    institution: "Prestige College Group",
    rating: 5,
    initials: "SR",
  },
  {
    quote:
      "The technology integration roadmap Edify developed was exactly what we needed. Our digital transition was seamless, and staff adoption exceeded our expectations. We're now a fully digital campus.",
    author: "Mr. Rajesh Nair",
    role: "Vice Chancellor",
    institution: "Nexus University",
    rating: 5,
    initials: "RN",
  },
  {
    quote:
      "From day one, the Edify team felt like an extension of our own leadership. Their student development frameworks have directly contributed to a 35% improvement in student satisfaction scores.",
    author: "Prof. Aishah binti Malik",
    role: "Academic Director",
    institution: "Pinnacle Academy",
    rating: 5,
    initials: "AM",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="testimonials" className="bg-[#F8F9FA] py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-8 h-[2px] bg-[#3ABAB4]" />
            <span className="text-[#3ABAB4] text-[13px] font-semibold tracking-[0.2em] uppercase">
              Client Testimonials
            </span>
            <span className="w-8 h-[2px] bg-[#3ABAB4]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold text-[#0A0D14] leading-[1.15] max-w-2xl mx-auto"
          >
            What Our Clients{" "}
            <span className="text-[#3ABAB4]">Say About Us</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#3ABAB4]/20 hover:shadow-xl transition-all duration-400 relative overflow-hidden"
            >
              {/* Quote icon */}
              <Quote
                size={40}
                className="text-[#3ABAB4]/15 absolute top-6 right-6"
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    className="text-[#E8C97A]"
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-[#374151] text-[15px] leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#3ABAB4]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#3ABAB4] text-[13px] font-bold">{t.initials}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#0A0D14] text-[14px]">{t.author}</div>
                  <div className="text-[#6B7280] text-[13px]">
                    {t.role} · {t.institution}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
