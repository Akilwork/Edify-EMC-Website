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
    "Uni-Hosing",
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
    <footer className="relative min-h-[600px] overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950"></div>
      
      {/* Large background "Edify" text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="text-[280px] lg:text-[320px] xl:text-[400px] font-bold text-white/[0.03] select-none leading-none tracking-tight"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transform: 'translateY(-20px)'
          }}
        >
          Edify
        </div>
      </div>

      {/* Geometric background shapes */}
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent transform -rotate-12"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-tl from-slate-600/30 to-transparent transform rotate-12"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Company Info - Takes full width on mobile */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                Edify Management Consultancy
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed">
                Your Trusted Management Consultancy for HR, Finance, IT, and Beyond
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <a 
                href="mailto:edify@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group"
              >
                <Mail size={16} className="group-hover:text-blue-400" />
                <span className="text-sm">edify@gmail.com</span>
              </a>
              <a 
                href="tel:+971234567789"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group"
              >
                <Phone size={16} className="group-hover:text-blue-400" />
                <span className="text-sm">+971 234 567 789</span>
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-[0.15em]">
              OUR SERVICES
            </h3>
            <ul className="space-y-3">
              {FOOTER_DATA.services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href="/services"
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300 block hover:translate-x-1 transform transition-transform"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsidiaries */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-[0.15em]">
              SUBSIDIARIES
            </h3>
            <ul className="space-y-3">
              {FOOTER_DATA.subsidiaries.map((subsidiary, index) => (
                <li key={index}>
                  <span className="text-sm text-slate-400 block">
                    {subsidiary}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-[0.15em]">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {FOOTER_DATA.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link === "Home" ? "/" : link === "About Us" ? "/about" : "/services"}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300 block hover:translate-x-1 transform transition-transform"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="mt-20 pt-8 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-xs text-slate-500">
              © 2025 Edify Management Consultancy. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
