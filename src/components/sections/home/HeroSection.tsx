"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ═══════════ Background Image ═══════════════════════ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ═══════════ Content Container ═══════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* ─── Main Heading ─────────────────────────────────── */}
        <h1 className="font-Inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-5xl font-Medium text-white leading-tight mb-6 max-w-6xl mx-auto">
          Empowering Educational Institutions
          <br />
          Through Integrated Management Solutions
        </h1>

        {/* ─── Subtitle ────────────────────────────────────── */}
        <p className="font-sans text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
          From HR and finance to infrastructure, technology, student development, and operations, Edify 
          Management Consultancy helps educational institutions grow with confidence and excellence.
        </p>

        {/* ─── CTA Button ─────────────────────────────────── */}
        <div className="flex items-center justify-center">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-sans text-base font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer"
          >
            Get a Consultation
            <ArrowRight 
              size={18} 
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
