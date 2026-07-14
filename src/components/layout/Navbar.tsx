"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ChevronDown,
  BookOpen,
  GraduationCap,
  BadgeDollarSign,
  Users,
  Monitor,
  Printer,
  MessageSquare,
} from "lucide-react";
import { useConsultation } from "@/components/providers/ConsultationProvider";

/* ────────────────────────────────────────────────────────────
 data – icon mapped per service id
──────────────────────────────────────────────────────────── */
const MEGA_SERVICES = [
  {
    id: "behavioural-counselling",
    title: "Behavioural Counselling & Student Support",
    description: "Holistic support for student growth and well-being.",
    icon: MessageSquare,
    slug: "behavioural-counselling-student-support",
  },
  {
    id: "educational-consulting",
    title: "Educational & Institutional Consulting",
    description: "Strategic guidance for institutions to thrive.",
    icon: GraduationCap,
    slug: "educational-institutional-consulting",
  },
  {
    id: "financial-consultancy",
    title: "Financial Consultancy",
    description: "Expert financial planning and advisory services.",
    icon: BadgeDollarSign,
    slug: "financial-consultancy",
  },
  {
    id: "hr-services",
    title: "Human Resource Services",
    description: "End-to-end HR solutions for your organisation.",
    icon: Users,
    slug: "human-resource-services",
  },
  {
    id: "it-solutions",
    title: "IT Solutions & Digital Transformation",
    description: "Modernise your operations with smart technology.",
    icon: Monitor,
    slug: "it-solutions-digital-transformation",
  },
  {
    id: "printing-branding",
    title: "Printing & Branding Solutions",
    description: "Impactful branding that leaves a lasting impression.",
    icon: Printer,
    slug: "printing-branding-solutions",
  },
];

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SERVICES", href: "/services", hasMega: true },
];

/* ────────────────────────────────────────────────────────────
   Mega Menu Component
──────────────────────────────────────────────────────────── */
function ServicesMegaMenu({
  onClose,
  openConsultation,
}: {
  onClose: () => void;
  openConsultation: () => void;
}) {
  const leftCol = MEGA_SERVICES.slice(0, 3);
  const rightCol = MEGA_SERVICES.slice(3, 6);

  return (
    <div className="absolute top-full left-0 right-0 z-40">
      {/* Full-screen backdrop to close on outside click */}
      <div
        className="fixed inset-0 top-0 z-[-1]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* White panel */}
      <div
        className="w-full bg-white border-b border-black/8"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        }}
      >
        <div className="container-responsive container-max">
          <div className="grid grid-cols-[280px_1fr] min-h-[320px]">

            {/* ── Left hero image panel ── */}
            <div className="relative rounded-[16px] overflow-hidden m-5 mr-0 min-h-[290px]">
              <Image
                src="/Rectangle 53.png"
                alt="Edify services"
                fill
                className="object-cover"
              />
              {/* Stronger dark overlay for glass feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
              {/* Subtle glass sheen on image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-semibold text-[18px] leading-[1.3] max-w-[200px] drop-shadow-lg">
                  Expert Solutions for Every Need
                </p>
                <p className="text-white/60 text-[12.5px] mt-2 max-w-[200px] leading-relaxed">
                  High-quality consulting designed around your goals.
                </p>
              </div>
            </div>

            {/* ── Right content ── */}
            <div className="flex flex-col px-8 py-6">
              {/* Column heading */}
              <p className="text-[11px] font-semibold tracking-[1.5px] uppercase text-black/40 mb-3">
                Our Services
              </p>

              {/* Service rows */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 flex-1">
                {/* Left column */}
                <div className="space-y-0.5">
                  {leftCol.map(({ id, title, description, icon: Icon, slug }) => (
                    <Link
                      key={id}
                      href={`/services/${slug}`}
                      onClick={onClose}
                      className="flex items-start gap-3 p-3 rounded-[12px] group transition-all duration-200 cursor-pointer hover:bg-black/[0.04]"
                    >
                      {/* Icon box */}
                      <div className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-200">
                        <Icon
                          size={16}
                          className="text-black/60 group-hover:text-black transition-colors duration-200"
                          strokeWidth={1.5}
                        />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-black/80 group-hover:text-black leading-snug transition-colors duration-200">
                          {title}
                        </p>
                        <p className="text-[11.5px] text-black/45 mt-0.5 leading-snug transition-colors duration-200">
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right column */}
                <div className="space-y-0.5">
                  {rightCol.map(({ id, title, description, icon: Icon, slug }) => (
                    <Link
                      key={id}
                      href={`/services/${slug}`}
                      onClick={onClose}
                      className="flex items-start gap-3 p-3 rounded-[12px] group transition-all duration-200 cursor-pointer hover:bg-black/[0.04]"
                    >
                      {/* Icon box */}
                      <div className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-200">
                        <Icon
                          size={16}
                          className="text-black/60 group-hover:text-black transition-colors duration-200"
                          strokeWidth={1.5}
                        />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-black/80 group-hover:text-black leading-snug transition-colors duration-200">
                          {title}
                        </p>
                        <p className="text-[11.5px] text-black/45 mt-0.5 leading-snug transition-colors duration-200">
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Bottom CTA strip ── */}
              <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-black/80">
                    Need assist for choosing a service?
                  </p>
                  <p className="text-[11.5px] text-black/45 mt-0.5">
                    Our experts will guide you to the right solution.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    openConsultation();
                  }}
                  className="flex items-center gap-2 px-5 py-[11px] text-[13px] font-semibold rounded-[40px] bg-black text-white hover:bg-black/80 transition-all duration-200 whitespace-nowrap cursor-pointer border-none outline-none active:scale-95"
                >
                  Contact us
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


/* ────────────────────────────────────────────────────────────
   Main Navbar
──────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openConsultation } = useConsultation();
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Close mega on route change
  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const handleServicesEnter = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const handleServicesLeave = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-sm border-b border-white/10 ${hidden ? "-translate-y-full" : "translate-y-0"
          } ${scrolled ? "bg-black/50" : "bg-transparent"}`}
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
            {NAV_LINKS.map(({ label, href, hasMega }) =>
              hasMega ? (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <button
                    onClick={() => {
                      setMegaOpen(false);
                      router.push(href);
                    }}
                    className={`flex items-center gap-1 text-[14px] font-semibold tracking-[0.96px] uppercase transition-colors duration-200 whitespace-nowrap cursor-pointer hover:text-white ${pathname.startsWith("/services") ? "text-white" : "text-white/60"
                      }`}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                  >
                    {label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={`text-[14px] font-semibold tracking-[0.96px] uppercase transition-colors duration-200 whitespace-nowrap cursor-pointer hover:text-white ${pathname === href ? "text-white" : "text-white/60"
                    }`}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={openConsultation}
              className="flex items-center gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-white text-black hover:bg-white/90 transition-all duration-200 whitespace-nowrap cursor-pointer border-none outline-none"
            >
              Get a Free Consultation
              <ArrowRight size={18} />
            </button>
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

        {/* Horizontal Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-black/10">
            <div className="container-responsive py-4 space-y-1">
              {NAV_LINKS.map(({ label, href, hasMega }) =>
                hasMega ? (
                  <div key={href}>
                    <div className="flex items-center justify-between">
                      {/* Label navigates to /services */}
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex-1 text-[14px] font-semibold tracking-[0.96px] uppercase py-2 cursor-pointer transition-colors duration-200 ${pathname.startsWith("/services")
                            ? "text-black"
                            : "text-black/50"
                          }`}
                      >
                        {label}
                      </Link>
                      {/* Chevron toggles the sub-list */}
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`p-2 cursor-pointer transition-colors duration-200 ${pathname.startsWith("/services") ? "text-black" : "text-black/50"}`}
                        aria-label="Expand services menu"
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-4 pb-2 space-y-1">
                        {MEGA_SERVICES.map(({ id, title, icon: Icon, slug }) => (
                          <Link
                            key={id}
                            href={`/services/${slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 py-2 px-3 rounded-[10px] hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-black/5 flex items-center justify-center">
                              <Icon size={15} className="text-black/60" strokeWidth={1.5} />
                            </div>
                            <span className="text-[13px] font-medium text-black/70">
                              {title}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-1 text-[12px] font-semibold text-black/40 px-3 pt-1 hover:text-black transition-colors duration-200"
                        >
                          View all services <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-[14px] font-semibold tracking-[0.96px] uppercase transition-colors duration-200 hover:text-black py-2 cursor-pointer ${pathname === href ? "text-black" : "text-black/50"
                      }`}
                  >
                    {label}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-black/10 space-y-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openConsultation();
                  }}
                  className="flex items-center justify-center w-full gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-black text-white cursor-pointer border-none outline-none"
                >
                  Get a Free Consultation
                  <ArrowRight size={18} />
                </button>
                <Link
                  href="tel:+601234567890"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-7 py-[14px] text-[14px] font-normal rounded-[40px] bg-white text-black border border-black/30 cursor-pointer"
                >
                  <Phone size={16} />
                  Call Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mega Menu – rendered outside header to avoid clipping */}
      {megaOpen && (
        <div
          className="fixed left-0 right-0 z-40"
          style={{ top: "var(--navbar-height, 72px)" }}
          onMouseEnter={handleServicesEnter}
          onMouseLeave={handleServicesLeave}
        >
          <ServicesMegaMenu
            onClose={() => setMegaOpen(false)}
            openConsultation={openConsultation}
          />
        </div>
      )}
    </>
  );
}
