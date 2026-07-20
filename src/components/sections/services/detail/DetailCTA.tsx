"use client";

"use client";

import { useState, useRef, useEffect } from "react";
import RevealSection from "./RevealSection";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ServiceDetail } from "@/data/service-details";

const COUNTRY_CODES = [
  { code: "+971", name: "UAE" },
  { code: "+966", name: "KSA" },
  { code: "+965", name: "Kuwait" },
  { code: "+974", name: "Qatar" },
  { code: "+973", name: "Bahrain" },
  { code: "+968", name: "Oman" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+91", name: "India" },
];

const INSTITUTION_TYPES = [
  "K-12 School",
  "Higher Education (University/College)",
  "Vocational / Technical Institute",
  "Early Childhood Education",
  "Corporate Academy",
  "Special Education Institution",
  "Other",
];

const SERVICE_OPTIONS = [
  "Human Resource Management",
  "Educational & Institutional Consulting",
  "Financial Consultancy",
  "Behavioural Counselling & Student Support",
  "IT Solutions & Digital Transformation",
  "Printing & Branding Solutions",
  "E-Commerce & Digital Services",
  "Civil Engineering & Infrastructure Development",
  "Transportation & Fleet Support",
  "Uniform Solutions",
  "Sports Training & Talent Development",
  "Other / General Enquiry"
];

export default function DetailCTA({
  detail,
  onConsultation,
  subtitle = "Get Started",
  title = "Ready to take your business or personal goals to the next level?",
  id = "cta",
}: {
  detail?: ServiceDetail;
  onConsultation?: () => void;
  subtitle?: string;
  title?: string;
  id?: string;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    designation: "",
    institutionType: "",
    institutionName: "",
    serviceRequired: detail ? detail.title : "", // Pre-select current service
    howCanWeHelp: "",
  });

  const [countryCode, setCountryCode] = useState("+971");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [showInstTypes, setShowInstTypes] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const instDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryCodes(false);
      }
      if (instDropdownRef.current && !instDropdownRef.current.contains(event.target as Node)) {
        setShowInstTypes(false);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target as Node)) {
        setShowServices(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.contactNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill out Name, Contact Number, and Email Address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          countryCode,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Form submission failed");
      }

      toast({
        title: "Consultation Requested!",
        description: "Thank you for reaching out. A consultant will get in touch with you shortly.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        designation: "",
        institutionType: "",
        institutionName: "",
        serviceRequired: detail ? detail.title : "",
        howCanWeHelp: "",
      });
      setCountryCode("+971");
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={id} className="relative w-full bg-black py-20 md:py-28 overflow-hidden border-t border-white/5">
      {/* Background Graphic overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="container-responsive container-max relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-left">
            <RevealSection>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                {subtitle}
              </p>
            </RevealSection>
            <RevealSection delay={0.05}>
              <h2 className="font-sans text-3xl md:text-4xl lg:text-[42px] leading-tight font-normal text-white max-w-2xl">
                {title}
              </h2>
            </RevealSection>
          </div>

          {/* Form */}
          <RevealSection delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name, Contact Number, Email Address */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="cta-name" className="text-[13px] font-normal text-white/70 mb-2 block">
                    Name
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 h-[56px] border border-white/10 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 text-sm backdrop-blur-sm bg-white/[0.03]"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cta-phone" className="text-[13px] font-normal text-white/70 mb-2 block">
                    Contact Number
                  </label>
                  <div className="flex items-center border border-white/10 rounded-[8px] h-[56px] focus-within:border-white/30 transition-all duration-200 backdrop-blur-sm bg-white/[0.03]">
                    <div ref={countryDropdownRef} className="relative flex-shrink-0 h-full">
                      <button
                        type="button"
                        onClick={() => setShowCountryCodes(!showCountryCodes)}
                        className="flex items-center gap-1 px-3 text-sm text-white/80 hover:text-white cursor-pointer h-full"
                      >
                        <span>{countryCode}</span>
                        <ChevronDown size={14} className="text-white/50" />
                      </button>
                      {showCountryCodes && (
                        <div className="absolute top-[60px] left-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-48 overflow-y-auto w-36 backdrop-blur-md bg-[#121214]">
                          {COUNTRY_CODES.map((item) => (
                            <button
                              key={item.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(item.code);
                                setShowCountryCodes(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-white/85 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                            >
                              {item.code} ({item.name})
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-px h-5 bg-white/10 flex-shrink-0" />
                    <input
                      id="cta-phone"
                      type="tel"
                      placeholder="Contact Number"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full h-full bg-transparent px-4 text-sm text-white placeholder-white/30 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cta-email" className="text-[13px] font-normal text-white/70 mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    placeholder="Enter Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 h-[56px] border border-white/10 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 text-sm backdrop-blur-sm bg-white/[0.03]"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Institution Type, Institution Name, Designation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col" ref={instDropdownRef}>
                  <label className="text-[13px] font-normal text-white/70 mb-2 block">
                    Institution Type
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowInstTypes(!showInstTypes)}
                      className="w-full flex items-center justify-between px-4 h-[56px] border border-white/10 rounded-[8px] text-sm text-left text-white/85 hover:text-white cursor-pointer focus:outline-none focus:border-white/30 transition-colors duration-200 backdrop-blur-sm bg-white/[0.03]"
                    >
                      <span className={formData.institutionType ? "text-white" : "text-white/30"}>
                        {formData.institutionType || "Select Type"}
                      </span>
                      <ChevronDown size={16} className="text-white/50" />
                    </button>
                    {showInstTypes && (
                      <div className="absolute top-[60px] left-0 right-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-52 overflow-y-auto backdrop-blur-md bg-[#121214]">
                        {INSTITUTION_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, institutionType: type });
                              setShowInstTypes(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-white/85 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cta-inst-name" className="text-[13px] font-normal text-white/70 mb-2 block">
                    Institution Name
                  </label>
                  <input
                    id="cta-inst-name"
                    type="text"
                    placeholder="Enter Institution Name"
                    value={formData.institutionName}
                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                    className="w-full px-4 h-[56px] border border-white/10 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 text-sm backdrop-blur-sm bg-white/[0.03]"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cta-designation" className="text-[13px] font-normal text-white/70 mb-2 block">
                    Designation
                  </label>
                  <input
                    id="cta-designation"
                    type="text"
                    placeholder="Enter Designation"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 h-[56px] border border-white/10 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 text-sm backdrop-blur-sm bg-white/[0.03]"
                  />
                </div>
              </div>

              {/* Row 3: Service Required */}
              <div className="flex flex-col" ref={serviceDropdownRef}>
                <label className="text-[13px] font-normal text-white/70 mb-2 block">
                  Service Required
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowServices(!showServices)}
                    className="w-full flex items-center justify-between px-4 h-[56px] border border-white/10 rounded-[8px] text-sm text-left text-white/85 hover:text-white cursor-pointer focus:outline-none focus:border-white/30 transition-colors duration-200 backdrop-blur-sm bg-white/[0.03]"
                  >
                    <span className={formData.serviceRequired ? "text-white" : "text-white/30"}>
                      {formData.serviceRequired || "Select Service Required"}
                    </span>
                    <ChevronDown size={16} className="text-white/50" />
                  </button>
                  {showServices && (
                    <div className="absolute top-[60px] left-0 right-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-52 overflow-y-auto backdrop-blur-md bg-[#121214]">
                      {SERVICE_OPTIONS.map((service) => (
                        <button
                          key={service}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, serviceRequired: service });
                            setShowServices(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-white/85 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: How Can We Help? */}
              <div className="flex flex-col">
                <label htmlFor="cta-help" className="text-[13px] font-normal text-white/70 mb-2 block">
                  How Can We Help?
                </label>
                <textarea
                  id="cta-help"
                  rows={4}
                  placeholder="Enter Text"
                  value={formData.howCanWeHelp}
                  onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
                  className="w-full px-4 py-3 border border-white/10 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all duration-200 text-sm resize-none h-[120px] backdrop-blur-sm bg-white/[0.03]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-lg text-[15px]"
                >
                  <span>{isSubmitting ? "Submitting..." : "Request Consultation"}</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
