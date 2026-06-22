import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const FOOTER_DATA = {
  services: [
    "HR Services",
    "Financial Services",
    "IT Services", 
    "Educational & Institutional Services",
    "SEED Behavioural Counselling",
    "Imprint Solutions"
  ],
  subsidiaries: [
    "EMKL Garage",
    "E-Commerce Services",
    "Uni-Dezine",
    "Civil Engineering Services", 
    "Tees Academy"
  ],
  quickLinks: [
    "Home",
    "About Us", 
    "Services"
  ]
};

export default function Footer() {
  return (
    <footer className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-[#334155] via-[#1e293b] to-[#0f172a] py-12 sm:py-16 lg:py-20">
      {/* Geometric shapes on the left */}
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] h-[400px] sm:h-[500px] opacity-15 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[200px] sm:w-[280px] h-[280px] sm:h-[380px] bg-gradient-to-tr from-slate-600/30 to-transparent transform -rotate-12 -translate-x-8 sm:-translate-x-16"></div>
        <div className="absolute bottom-12 sm:bottom-20 left-4 sm:left-8 w-[140px] sm:w-[200px] h-[200px] sm:h-[280px] bg-gradient-to-tr from-blue-900/20 to-transparent transform -rotate-6"></div>
        <div className="absolute bottom-8 sm:bottom-12 left-8 sm:left-16 w-[100px] sm:w-[140px] h-[140px] sm:h-[200px] bg-gradient-to-tr from-slate-700/40 to-transparent transform rotate-12"></div>
      </div>
      
      {/* Large "Edify" background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="font-bold text-white/[0.04] select-none leading-none tracking-[-0.04em]"
          style={{ 
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: '900',
            fontSize: 'clamp(8rem, 25vw, 28rem)'
          }}
        >
          Edify
        </div>
      </div>
      
      {/* Main content grid */}
      <div className="relative z-10 container-responsive container-max">
        {/* Desktop: 4 columns, Tablet: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
          
          {/* Column 1: Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight max-w-xs">
                Edify Management Consultancy
              </h1>
              <p className="text-slate-400 text-fluid-sm leading-relaxed">
                Your Trusted Management Consultancy for HR, Finance, IT, and Beyond
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-2 mt-6">
              <a 
                href="mailto:edify@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-fluid-sm cursor-pointer"
              >
                <Mail size={14} />
                edify@gmail.com
              </a>
              <a 
                href="tel:+971234567789"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-fluid-sm cursor-pointer"
              >
                <Phone size={14} />
                +971 234 567 789
              </a>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="space-y-4">
            <h3 className="text-fluid-xs font-bold text-white/80 uppercase tracking-wide">
              OUR SERVICES
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_DATA.services.map((service) => (
                <li key={service}>
                  <Link 
                    href="/services" 
                    className="text-fluid-sm text-slate-400 hover:text-white transition-colors duration-200 block cursor-pointer"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Subsidiaries */}
          <div className="space-y-4">
            <h3 className="text-fluid-xs font-bold text-white/80 uppercase tracking-wide">
              SUBSIDIARIES
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_DATA.subsidiaries.map((subsidiary) => (
                <li key={subsidiary}>
                  <Link 
                    href="/services" 
                    className="text-fluid-sm text-slate-400 hover:text-white transition-colors duration-200 block cursor-pointer"
                  >
                    {subsidiary}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-fluid-xs font-bold text-white/80 uppercase tracking-wide">
              QUICK LINKS
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_DATA.quickLinks.map((link) => (
                <li key={link}>
                  <Link 
                    href={link === "Home" ? "/" : link === "About Us" ? "/about" : "/services"} 
                    className="text-fluid-sm text-slate-400 hover:text-white transition-colors duration-200 block cursor-pointer"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-fluid-sm text-slate-400">
            <p>© 2024 Edify Management Consultancy. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200 cursor-pointer">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200 cursor-pointer">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}