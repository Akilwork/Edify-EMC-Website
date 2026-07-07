"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInScene?: boolean; // New prop for Scene 10 integration
}

// Shared constants
export const COUNTRY_CODES = [
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

export const INSTITUTION_TYPES = [
  "K-12 School",
  "Higher Education (University/College)",
  "Vocational / Technical Institute",
  "Early Childhood Education",
  "Corporate Academy",
  "Special Education Institution",
  "Other",
];

export const SERVICE_OPTIONS = [
  "Strategy & Planning",
  "Organisational Transformation",
  "Leadership Development",
  "Change Management",
  "Academic Quality & Accreditation",
  "Other / General Consultation",
];

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    designation: "",
    institutionType: "",
    institutionName: "",
    serviceRequired: "",
    howCanWeHelp: "",
  });

  const [countryCode, setCountryCode] = useState("+971");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [showInstTypes, setShowInstTypes] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        designation: "",
        institutionType: "",
        institutionName: "",
        serviceRequired: "",
        howCanWeHelp: "",
      });
      setCountryCode("+971");
      setShowCountryCodes(false);
      setShowInstTypes(false);
      setShowServices(false);
      submittingRef.current = false;
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.contactNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill out Name, Contact Number, and Email Address.",
        variant: "destructive",
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    let success = false;
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
      success = true;
      onClose();
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      if (!success) {
        submittingRef.current = false;
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.05 }}
            className="relative w-full max-w-6xl border border-white/10 rounded-[12px] overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[92vh] lg:h-[760px] z-10 bg-transparent"
          >
            {/* Background Video (Common Single Div Section) */}
            <div className="absolute inset-0 z-0 bg-black">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/Consultation/parmardarshil.mp4" type="video/mp4" />
              </video>
              {/* Smooth dark overlay over the video */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Close button inside container */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 flex items-center justify-center w-9 h-9 rounded-full text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: "#222225" }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Left Column - Text Content */}
            <div className="hidden lg:flex lg:w-1/2 p-16 flex-col justify-center relative backdrop-blur-md bg-black/30 border-r border-white/5 overflow-hidden flex-shrink-0 select-none z-10">
              {/* Content - Exact centered alignment and larger spacing */}
              <div className="relative z-10 space-y-8 max-w-md">
                <h2 className="font-sans font-medium text-white leading-[1.1] text-[44px] lg:text-[50px] xl:text-[54px] tracking-tight">
                  Building Stronger <br />
                  Institutions Starts <br />
                  Here
                </h2>
                <p className="text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-normal">
                  Connect with our consultants to explore tailored solutions designed for your institution's unique needs and growth objectives.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div
              className="relative z-10 w-full lg:w-1/2 p-6 sm:p-10 md:p-14 overflow-y-auto no-scrollbar flex flex-col justify-center backdrop-blur-md bg-[#151515]/80"
            >
              {/* Heading only visible on mobile/tablet */}
              <div className="lg:hidden mb-8 mt-4 space-y-2">
                <h2 className="font-sans font-medium text-white text-2xl">
                  Building Stronger Institutions Starts Here
                </h2>
                <p className="text-white/60 text-sm">
                  Connect with our consultants to explore tailored solutions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name & Contact Number */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 relative ${showCountryCodes ? "z-30" : "z-10"}`}>
                  <div className="flex flex-col">
                    <label htmlFor="modal-name" className="text-[13px] font-normal text-white mb-2 block">
                      Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      placeholder="Enter Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 h-[56px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm animate-none backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-phone" className="text-[13px] font-normal text-white mb-2 block">
                      Contact Number
                    </label>
                    <div
                      className="flex items-center border border-white/5 rounded-[8px] h-[56px] focus-within:border-white/20 transition-all duration-200 backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                    >
                      {/* Country Code Dropdown */}
                      <div ref={countryDropdownRef} className="relative flex-shrink-0 h-full">
                        <button
                          type="button"
                          onClick={() => setShowCountryCodes(!showCountryCodes)}
                          className="flex items-center gap-1 px-3.5 text-sm text-white/80 hover:text-white cursor-pointer h-full"
                        >
                          <span>{countryCode}</span>
                          <ChevronDown
                            size={14}
                            className={`text-white/50 transition-transform duration-200 ${
                              showCountryCodes ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {showCountryCodes && (
                          <div
                            className="absolute top-[60px] left-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-48 overflow-y-auto w-36 backdrop-blur-md"
                            style={{ backgroundColor: "rgba(31, 31, 34, 0.95)" }}
                          >
                            {COUNTRY_CODES.map((item) => (
                              <button
                                key={item.code}
                                type="button"
                                onClick={() => {
                                  setCountryCode(item.code);
                                  setShowCountryCodes(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                              >
                                {item.code} ({item.name})
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="w-px h-6 bg-white/10 flex-shrink-0" />
                      <input
                        id="modal-phone"
                        type="tel"
                        placeholder="Enter Contact Number"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className="w-full h-full bg-transparent px-4 text-sm text-white placeholder-white/30 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email Address & Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                  <div className="flex flex-col">
                    <label htmlFor="modal-email" className="text-[13px] font-normal text-white mb-2 block">
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      placeholder="Enter Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 h-[56px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-designation" className="text-[13px] font-normal text-white mb-2 block">
                      Designation
                    </label>
                    <input
                      id="modal-designation"
                      type="text"
                      placeholder="Enter Designation"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-4 h-[56px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                    />
                  </div>
                </div>

                {/* Row 3: Institution Type & Institution Name */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 relative ${showInstTypes ? "z-30" : "z-10"}`}>
                  <div className="flex flex-col" ref={instDropdownRef}>
                    <label className="text-[13px] font-normal text-white mb-2 block">
                      Institution Type
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowInstTypes(!showInstTypes)}
                        className="w-full flex items-center justify-between px-4 h-[56px] border border-white/5 rounded-[8px] text-sm text-left text-white/80 hover:text-white cursor-pointer focus:outline-none focus:border-white/20 transition-colors duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                      >
                        <span className={formData.institutionType ? "text-white" : "text-white/30"}>
                          {formData.institutionType || "Select Institution Type"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-white/50 transition-transform duration-200 ${
                            showInstTypes ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showInstTypes && (
                        <div
                          className="absolute top-[60px] left-0 right-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-52 overflow-y-auto backdrop-blur-md"
                          style={{ backgroundColor: "rgba(31, 31, 34, 0.95)" }}
                        >
                          {INSTITUTION_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, institutionType: type });
                                setShowInstTypes(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-inst-name" className="text-[13px] font-normal text-white mb-2 block">
                      Institution Name
                    </label>
                    <input
                      id="modal-inst-name"
                      type="text"
                      placeholder="Enter Institution Name"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      className="w-full px-4 h-[56px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                    />
                  </div>
                </div>

                {/* Row 4: Service Required (Full Width) */}
                <div className={`flex flex-col relative ${showServices ? "z-30" : "z-10"}`} ref={serviceDropdownRef}>
                  <label className="text-[13px] font-normal text-white mb-2 block">
                    Service Required
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowServices(!showServices)}
                      className="w-full flex items-center justify-between px-4 h-[56px] border border-white/5 rounded-[8px] text-sm text-left text-white/80 hover:text-white cursor-pointer focus:outline-none focus:border-white/20 transition-colors duration-200 backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                    >
                      <span className={formData.serviceRequired ? "text-white" : "text-white/30"}>
                        {formData.serviceRequired || "Select Service Required"}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-white/50 transition-transform duration-200 ${
                          showServices ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {showServices && (
                      <div
                        className="absolute top-[60px] left-0 right-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-52 overflow-y-auto backdrop-blur-md"
                        style={{ backgroundColor: "rgba(31, 31, 34, 0.95)" }}
                      >
                        {SERVICE_OPTIONS.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, serviceRequired: service });
                              setShowServices(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 5: How Can We Help? (Full Width) */}
                <div className="flex flex-col">
                  <label htmlFor="modal-help" className="text-[13px] font-normal text-white mb-2 block">
                    How Can We Help?
                  </label>
                  <textarea
                    id="modal-help"
                    rows={4}
                    placeholder="Enter Text"
                    value={formData.howCanWeHelp}
                    onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
                    className="w-full px-4 py-3.5 border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm resize-none h-[140px] backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
                  />
                </div>

                {/* Row 6: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-lg text-[15px] mt-2"
                  >
                    <span>{isSubmitting ? "Requesting..." : "Request Consultation"}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
