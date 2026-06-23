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
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setScrolled(true);
        setHidden(currentScrollY > lastScrollY);
      } else {
        setScrolled(false);
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "border-b border-white/10" : ""}`}
    >
      <div className="container-responsive container-max flex items-center justify-between pt-[clamp(12px,1.4vw,20px)] pb-[clamp(8px,1vw,14px)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <Image
            src="/Logo.png"
            alt="Edify Management Consultancy"
            width={82}
            height={36}
            className="h-[35.8px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-[14px] font-semibold tracking-[0.96px] uppercase transition-colors duration-200 hover:text-white whitespace-nowrap cursor-pointer ${
                pathname === href ? "text-white" : "text-white/60"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-white text-black hover:bg-white/90 transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            Get a Free Consultation
            <ArrowRight size={18} />
          </Link>
          <Link
            href="tel:+601234567890"
            className="flex items-center gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-[#3a3a3a] text-white border border-white/60 hover:bg-[#4a4a4a] transition-all duration-200 cursor-pointer"
          >
            <Phone size={16} />
            Call Us
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

      {/* Horizontal Divider — matching Figma */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0A0D14]/98 backdrop-blur-xl border-t border-white/10">
          <div className="container-responsive py-4 space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block text-[14px] font-semibold tracking-[0.96px] uppercase transition-colors duration-200 hover:text-white py-2 cursor-pointer ${
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
                className="flex items-center justify-center gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-white text-black cursor-pointer"
              >
                Get a Free Consultation
                <ArrowRight size={18} />
              </Link>
              <Link
                href="tel:+601234567890"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-[#3a3a3a] text-white border border-white/60 cursor-pointer"
              >
                <Phone size={16} />
                Call Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
