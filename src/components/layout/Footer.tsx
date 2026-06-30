"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const SERVICES_COL1 = [
  "HR Services",
  "Financial Services",
  "IT Services",
  "Educational & Institutional Services",
  "SEED Behavioural Counselling",
  "Imprint Solutions",
];

const SERVICES_COL2 = [
  "EMKE Garage",
  "E-Commerce Services",
  "Uni-Dezine",
  "Civil Engineering Services",
  "Toss Academy",
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(14,30,70,0.85) 0%, rgba(8,16,40,0.6) 45%, transparent 75%), radial-gradient(ellipse 50% 40% at 70% 55%, rgba(10,25,80,0.5) 0%, transparent 60%), linear-gradient(180deg, #0a0e1a 0%, #080c18 40%, #060810 100%)",
        isolation: "isolate",
      }}
    >
      {/* Blue radial glow – center-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 65% 45%, rgba(15,50,150,0.28) 0%, rgba(10,30,100,0.12) 40%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Main content wrapper */}
      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: "1440px",
          paddingTop: "clamp(80px, 13.5vw, 185px)",
          paddingBottom: "clamp(60px, 8vw, 120px)",
          paddingLeft: "clamp(24px, 5.5vw, 80px)",
          paddingRight: "clamp(24px, 5.5vw, 80px)",
        }}
      >
        {/* ── Three-column grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.1fr_1.6fr_0.7fr]"
          style={{ gap: "clamp(32px, 4vw, 80px)" }}
        >
          {/* ── LEFT: Company Info ── */}
          <div className="flex flex-col" style={{ gap: "20px" }}>
            {/* Company Name */}
            <h2
              className="font-sans font-bold text-white leading-tight"
              style={{
                fontSize: "clamp(1.25rem, 1.5vw, 1.625rem)",
                letterSpacing: "-0.01em",
                maxWidth: "300px",
              }}
            >
              Edify Management Consultancy
            </h2>

            {/* Description */}
            <p
              className="font-sans text-white/50 leading-relaxed"
              style={{
                fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)",
                maxWidth: "260px",
                lineHeight: "1.6",
              }}
            >
              Your Trusted Management Consultancy for HR, Finance, IT, and Beyond
            </p>

            {/* Contact Details */}
            <div className="flex flex-col" style={{ gap: "10px", marginTop: "4px" }}>
              <a
                href="mailto:edify@gmail.com"
                className="group flex items-center text-white/50 transition-colors duration-300 hover:text-white/90"
                style={{ gap: "10px", fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)" }}
              >
                <Mail
                  size={15}
                  className="flex-shrink-0 text-white/40 transition-colors duration-300 group-hover:text-white/80"
                />
                <span className="font-sans">edify@gmail.com</span>
              </a>
              <a
                href="tel:+971234567789"
                className="group flex items-center text-white/50 transition-colors duration-300 hover:text-white/90"
                style={{ gap: "10px", fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)" }}
              >
                <Phone
                  size={15}
                  className="flex-shrink-0 text-white/40 transition-colors duration-300 group-hover:text-white/80"
                />
                <span className="font-sans">+971 234 567 789</span>
              </a>
            </div>
          </div>

          {/* ── CENTER: Our Services ── */}
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <h3
              className="font-sans font-semibold uppercase tracking-widest text-white/70"
              style={{ fontSize: "clamp(0.6875rem, 0.75vw, 0.8125rem)", letterSpacing: "0.12em" }}
            >
              OUR SERVICES
            </h3>

            {/* Two sub-columns */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: "clamp(16px, 2.5vw, 48px)" }}
            >
              {/* Sub-col 1 */}
              <ul className="flex flex-col" style={{ gap: "12px" }}>
                {SERVICES_COL1.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="font-sans text-white/50 transition-colors duration-300 hover:text-white/90 block"
                      style={{ fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)", lineHeight: "1.4" }}
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Sub-col 2 */}
              <ul className="flex flex-col" style={{ gap: "12px" }}>
                {SERVICES_COL2.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="font-sans text-white/50 transition-colors duration-300 hover:text-white/90 block"
                      style={{ fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)", lineHeight: "1.4" }}
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT: Quick Links ── */}
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <h3
              className="font-sans font-semibold uppercase tracking-widest text-white/70"
              style={{ fontSize: "clamp(0.6875rem, 0.75vw, 0.8125rem)", letterSpacing: "0.12em" }}
            >
              QUICK LINKS
            </h3>
            <ul className="flex flex-col" style={{ gap: "14px" }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-white/50 transition-colors duration-300 hover:text-white/90 block"
                    style={{ fontSize: "clamp(0.75rem, 0.85vw, 0.875rem)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom strip (copyright) ── */}
        <div
          className="relative flex items-end justify-center md:justify-end"
          style={{ paddingBottom: "clamp(30px, 4vw, 65px)", marginTop: "clamp(75px, 8.5vw, 115px)" }}
        >
          <p
            className="font-sans italic text-white/35 text-center md:text-right"
            style={{ fontSize: "clamp(0.6875rem, 0.75vw, 0.8125rem)" }}
          >
            © 2026 Edify Management Consultancy. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* ── WATERMARK: giant "Edify" – bottom-center ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute bottom-0 left-1/2 w-[90%] max-w-[1200px]"
        style={{
          zIndex: 1,
          transform: "translateX(-50%) translateY(20%)",
        }}
      >
        <img
          src="/Footer/image 73.png"
          alt="Edify Watermark"
          className="w-full h-auto mx-auto object-contain opacity-[0.45]"
        />
      </div>


    </footer>
  );
}