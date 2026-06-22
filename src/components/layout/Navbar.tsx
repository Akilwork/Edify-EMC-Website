"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME",     href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0D14]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <Image
            src="/Logo.png"
            alt="Edify Management Consultancy"
            width={120}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-[13px] font-semibold tracking-widest transition-colors duration-200 hover:text-white ${
                pathname === href
                  ? "text-white border-b-2 border-white pb-0.5"
                  : "text-white/70"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-full bg-white text-[#0A0D14] hover:bg-white/90 transition-all duration-200 shadow-lg"
          >
            Get a Free Consultation
            <ArrowRight size={14} />
          </Link>
          <Link
            href="tel:+601234567890"
            className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-full bg-[#1C2030] text-white border border-white/20 hover:bg-[#252A3D] transition-all duration-200"
          >
            Call Us
            <Phone size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0D14]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium tracking-widest transition-colors duration-200 hover:text-white ${
                pathname === href ? "text-white" : "text-white/60"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-full bg-white text-[#0A0D14]"
            >
              Get a Free Consultation <ArrowRight size={14} />
            </Link>
            <Link
              href="tel:+601234567890"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-full bg-[#1C2030] text-white border border-white/20"
            >
              Call Us <Phone size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
