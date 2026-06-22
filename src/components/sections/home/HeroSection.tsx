"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full container-responsive container-max pt-safe">
        <div className="text-center pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          
          {/* Main Heading */}
          <h1 className="font-sans font-medium text-white leading-[1.1] mb-4 sm:mb-6 md:mb-8 max-w-5xl mx-auto">
            <span 
              className="block"
              style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}
            >
              Empowering Educational Institutions
            </span>
            <span 
              className="block"
              style={{ fontSize: 'clamp(2rem, 8vw, 4.5rem)' }}
            >
              Through Integrated Management Solutions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-fluid-lg md:text-fluid-xl text-white/80 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
            From HR and finance to infrastructure, technology, student development, and operations, Edify 
            Management Consultancy helps educational institutions grow with confidence and excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-sans text-fluid-sm sm:text-fluid-base font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
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
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-sans text-fluid-sm sm:text-fluid-base font-semibold rounded-full border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
            >
              Explore Our Solutions
              <ArrowRight 
                size={18} 
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
