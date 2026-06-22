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
      className={`fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-50 transition-all duration-500 rounded-xl ${
        scrolled
          ? "bg-[#0A0D14]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
          : "bg-[#0A0D14]/70 backdrop-blur-md border border-white/5"
      }`}
    >
      <div className="container-responsive container-max flex items-center justify-between h-16 sm:h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0 min-w-0">
          <Image
            src="/Logo.png"
            alt="Edify Management Consultancy"
            width={120}
            height={36}
            className="h-7 sm:h-9 w-auto object-contain max-w-[100px] sm:max-w-none"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-fluid-xs font-semibold tracking-widest transition-colors duration-200 hover:text-white whitespace-nowrap cursor-pointer ${
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
        <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 px-3 lg:px-5 py-2 lg:py-2.5 text-fluid-xs font-semibold rounded-full bg-white text-[#0A0D14] hover:bg-white/90 transition-all duration-200 shadow-lg whitespace-nowrap cursor-pointer"
          >
            <span className="hidden xl:inline">Get a Free Consultation</span>
            <span className="xl:hidden">Consultation</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="tel:+601234567890"
            className="flex items-center gap-1.5 px-3 lg:px-5 py-2 lg:py-2.5 text-fluid-xs font-semibold rounded-full bg-[#1C2030] text-white border border-white/20 hover:bg-[#252A3D] transition-all duration-200 cursor-pointer"
          >
            Call Us
            <Phone size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0A0D14]/98 backdrop-blur-xl border-t border-white/10 rounded-b-xl mx-2 sm:mx-0">
          <div className="container-responsive py-4 space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block text-fluid-sm font-medium tracking-widest transition-colors duration-200 hover:text-white py-2 cursor-pointer ${
                  pathname === href ? "text-white" : "text-white/60"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 text-fluid-sm font-semibold rounded-full bg-white text-[#0A0D14] cursor-pointer"
              >
                Get a Free Consultation 
                <ArrowRight size={14} />
              </Link>
              <Link
                href="tel:+601234567890"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 text-fluid-sm font-semibold rounded-full bg-[#1C2030] text-white border border-white/20 cursor-pointer"
              >
                Call Us
                <Phone size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
