"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInScene?: boolean;
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

// Returns the current moment as an ISO string expressed in Indian Standard Time
// (Asia/Kolkata, UTC+05:30). The +05:30 offset keeps it a real instant so the
// backend can parse it, while the wall-clock reads as Indian local time.
const getISTTimestamp = (): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  for (const part of parts) partMap[part.type] = part.value;
  const hour = partMap.hour === "24" ? "00" : partMap.hour;
  return `${partMap.year}-${partMap.month}-${partMap.day}T${hour}:${partMap.minute}:${partMap.second}.000+05:30`;
};

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, countryCode, submittedAt: getISTTimestamp() }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Form submission failed");

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
        /*
         * Mobile / Tablet  →  bottom-sheet: slides up from bottom, fills screen, rounded top
         * Desktop (lg+)    →  centred card: classic left-text / right-form split layout
         */
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-6 xl:p-10">

          {/* ── Backdrop ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* ── Modal shell ───────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.08 }}
            className={[
              "relative w-full overflow-hidden shadow-2xl z-10",
              "rounded-t-[24px] lg:rounded-[14px]",
              "h-[92dvh] lg:max-w-6xl lg:h-[760px]",
              "flex flex-col lg:flex-row",
              "border-0 lg:border lg:border-white/10",
            ].join(" ")}
          >

            {/* ── Full-modal video background ─────────────────────────────────── */}
            <div className="absolute inset-0 z-0 bg-black">
              <video
                autoPlay loop muted playsInline
                className="w-full h-full object-cover"
              >
                <source src="/Consultation/parmardarshil.mp4" type="video/mp4" />
              </video>
              {/* Uniform dark scrim — same depth on all screen sizes */}
              <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* ── Close button (top-right of modal) ───────────────────────────── */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 z-50 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: "#222225" }}
              aria-label="Close modal"
            >
              <X size={15} className="sm:hidden" />
              <X size={17} className="hidden sm:block lg:hidden" />
              <X size={18} className="hidden lg:block" />
            </button>

            {/* ══════════════════════════════════════════════════════════════════
                MOBILE / TABLET  —  Hero banner (visible below lg)
                Shows the video background with heading text overlaid on top.
            ══════════════════════════════════════════════════════════════════ */}
            <div className="lg:hidden relative z-10 flex-shrink-0 px-6 pt-11 pb-8 sm:px-8 sm:pt-12 sm:pb-9 md:px-10 md:pt-14 md:pb-10">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="font-sans font-semibold text-white leading-[1.15] tracking-tight text-[26px] sm:text-[32px] md:text-[38px]">
                  Building Stronger <br />
                  Institutions Starts Here
                </h2>
                <p className="text-white/65 text-[13px] sm:text-sm md:text-[15px] leading-relaxed max-w-sm md:max-w-md">
                  Connect with our consultants to explore tailored solutions designed for your institution's unique needs and growth objectives.
                </p>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                DESKTOP  —  Left column (visible on lg+)
            ══════════════════════════════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:w-1/2 p-12 xl:p-16 flex-col justify-center relative backdrop-blur-md bg-black/30 border-r border-white/5 overflow-hidden flex-shrink-0 select-none z-10">
              <div className="relative z-10 space-y-8 max-w-md">
                <h2 className="font-sans font-medium text-white leading-[1.1] text-[40px] xl:text-[50px] 2xl:text-[54px] tracking-tight">
                  Building Stronger <br />
                  Institutions Starts <br />
                  Here
                </h2>
                <p className="text-white/70 text-[15px] xl:text-[16px] leading-relaxed font-normal">
                  Connect with our consultants to explore tailored solutions designed for your institution's unique needs and growth objectives.
                </p>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                FORM PANEL
                · All breakpoints : backdrop-blur + semi-transparent dark panel
                  so the full-screen video shows through on mobile & tablet too
                · Desktop         : same treatment, half-width, fixed fields without scrolling
            ══════════════════════════════════════════════════════════════════ */}
            <div
              className={[
                "relative z-10 w-full lg:w-1/2",
                "bg-[#0d0d0d]/70 backdrop-blur-md",
                "flex-1 min-h-0 lg:h-full",
                "flex flex-col justify-start lg:justify-center",
              ].join(" ")}
            >
              <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-visible no-scrollbar pt-5 px-5 pb-24 sm:pt-7 sm:px-7 sm:pb-28 md:pt-9 md:px-9 md:pb-32 lg:p-8 xl:p-12 lg:pb-0 xl:pb-0">
                <form id="consultation-form" onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 lg:space-y-5 xl:space-y-6 pb-6 lg:pb-0">

                  {/* ── Row 1: Name & Contact Number ───────────────────────────── */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-5 xl:gap-6 relative ${showCountryCodes ? "z-30" : "z-10"}`}>

                    <div className="flex flex-col relative z-10">
                      <label htmlFor="modal-name" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                        Name
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] border border-white/8 rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-all duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                        required
                      />
                    </div>

                    <div className={`flex flex-col relative ${showCountryCodes ? "z-50" : "z-10"}`}>
                      <label htmlFor="modal-phone" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                        Contact Number
                      </label>
                      <div
                        className="flex items-center border border-white/8 rounded-[8px] h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] focus-within:border-white/20 transition-all duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      >
                        <div ref={countryDropdownRef} className="relative flex-shrink-0 h-full">
                          <button
                            type="button"
                            onClick={() => setShowCountryCodes(!showCountryCodes)}
                            className="flex items-center gap-1 px-3 sm:px-3.5 text-[13px] sm:text-sm text-white/80 hover:text-white cursor-pointer h-full"
                          >
                            <span>{countryCode}</span>
                            <ChevronDown
                              size={13}
                              className={`text-white/50 transition-transform duration-200 ${showCountryCodes ? "rotate-180" : ""}`}
                            />
                          </button>
                          {showCountryCodes && (
                            <div
                              className="absolute top-[52px] sm:top-[56px] lg:top-[52px] xl:top-[56px] left-0 z-[100] border border-white/10 rounded-lg shadow-2xl py-1 max-h-44 overflow-y-auto w-32 sm:w-36 bg-[#1c1c1f]"
                            >
                              {COUNTRY_CODES.map((item) => (
                                <button
                                  key={item.code}
                                  type="button"
                                  onClick={() => { setCountryCode(item.code); setShowCountryCodes(false); }}
                                  className="w-full text-left px-3 sm:px-4 py-2 text-[13px] text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                                >
                                  {item.code} ({item.name})
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="w-px h-5 bg-white/10 flex-shrink-0" />
                        <input
                          id="modal-phone"
                          type="tel"
                          placeholder="Enter Contact Number"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          className="w-full h-full bg-transparent px-3 text-[13px] sm:text-sm text-white placeholder-white/25 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Row 2: Email Address & Designation ─────────────────────── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-5 xl:gap-6 relative z-10">

                    <div className="flex flex-col relative z-10">
                      <label htmlFor="modal-email" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                        Email Address
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] border border-white/8 rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-all duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                        required
                      />
                    </div>

                    <div className="flex flex-col relative z-10">
                      <label htmlFor="modal-designation" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                        Designation
                      </label>
                      <input
                        id="modal-designation"
                        type="text"
                        placeholder="Enter Designation"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full px-4 h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] border border-white/8 rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-all duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      />
                    </div>
                  </div>

                  {/* ── Row 3: Institution Type & Institution Name ──────────────── */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-5 xl:gap-6 relative ${showInstTypes ? "z-30" : "z-10"}`}>

                    <div className={`flex flex-col relative ${showInstTypes ? "z-50" : "z-10"}`} ref={instDropdownRef}>
                      <label className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                        Institution Type
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowInstTypes(!showInstTypes)}
                          className="w-full flex items-center justify-between px-4 h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] border border-white/8 rounded-[8px] text-[13px] sm:text-sm text-left cursor-pointer focus:outline-none focus:border-white/20 transition-colors duration-200 backdrop-blur-sm"
                          style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                        >
                          <span className={`truncate mr-2 ${formData.institutionType ? "text-white" : "text-white/25"}`}>
                            {formData.institutionType || "Select Institution Type"}
                          </span>
                          <ChevronDown
                            size={15}
                            className={`flex-shrink-0 text-white/50 transition-transform duration-200 ${showInstTypes ? "rotate-180" : ""}`}
                          />
                        </button>
                        {showInstTypes && (
                          <div
                            className="absolute top-[52px] sm:top-[56px] lg:top-[52px] xl:top-[56px] left-0 right-0 z-[100] border border-white/10 rounded-lg shadow-2xl py-1 max-h-44 sm:max-h-48 overflow-y-auto bg-[#1c1c1f]"
                          >
                            {INSTITUTION_TYPES.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => { setFormData({ ...formData, institutionType: type }); setShowInstTypes(false); }}
                                className="w-full text-left px-4 py-2.5 text-[13px] text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col relative z-10">
                      <label htmlFor="modal-inst-name" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                        Institution Name
                      </label>
                      <input
                        id="modal-inst-name"
                        type="text"
                        placeholder="Enter Institution Name"
                        value={formData.institutionName}
                        onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                        className="w-full px-4 h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] border border-white/8 rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-all duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      />
                    </div>
                  </div>

                  {/* ── Row 4: Service Required (full width) ───────────────────── */}
                  <div className={`flex flex-col relative ${showServices ? "z-50" : "z-10"}`} ref={serviceDropdownRef}>
                    <label className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                      Service Required
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowServices(!showServices)}
                        className="w-full flex items-center justify-between px-4 h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] border border-white/8 rounded-[8px] text-[13px] sm:text-sm text-left cursor-pointer focus:outline-none focus:border-white/20 transition-colors duration-200 backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      >
                        <span className={`truncate mr-2 ${formData.serviceRequired ? "text-white" : "text-white/25"}`}>
                          {formData.serviceRequired || "Select Service Required"}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`flex-shrink-0 text-white/50 transition-transform duration-200 ${showServices ? "rotate-180" : ""}`}
                        />
                      </button>
                      {showServices && (
                        <div
                          className="absolute top-[52px] sm:top-[56px] lg:top-[52px] xl:top-[56px] left-0 right-0 z-[100] border border-white/10 rounded-lg shadow-2xl py-1 max-h-44 sm:max-h-48 overflow-y-auto bg-[#1c1c1f]"
                        >
                          {SERVICE_OPTIONS.map((service) => (
                            <button
                              key={service}
                              type="button"
                              onClick={() => { setFormData({ ...formData, serviceRequired: service }); setShowServices(false); }}
                              className="w-full text-left px-4 py-2.5 text-[13px] text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Row 5: How Can We Help? ─────────────────────────────────── */}
                  <div className="flex flex-col">
                    <label htmlFor="modal-help" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                      How Can We Help?
                    </label>
                    <textarea
                      id="modal-help"
                      placeholder="Enter Text"
                      value={formData.howCanWeHelp}
                      onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
                      className="w-full px-4 py-3 border border-white/8 rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-all duration-200 resize-none h-[96px] sm:h-[110px] lg:h-[95px] xl:h-[110px] backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                    />
                  </div>

                </form>
              </div>

              {/* ── Row 6: Submit button (outside scroll view, absolute on mobile, relative on desktop) ── */}
              <div className="absolute bottom-0 left-0 right-0 z-20 pt-4 pb-5 px-5 bg-[#0d0d0d]/70 backdrop-blur-md border-t border-white/10 sm:px-7 sm:pb-7 md:px-9 md:pb-9 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:bg-transparent lg:backdrop-blur-none lg:border-t-0 lg:px-8 lg:pb-8 xl:px-12 xl:pb-12 lg:pt-4 xl:pt-5">
                <button
                  type="submit"
                  form="consultation-form"
                  disabled={isSubmitting}
                  className="group w-full sm:w-auto inline-flex items-center justify-center sm:justify-start gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-lg text-[14px] sm:text-[15px]"
                >
                  <span>{isSubmitting ? "Requesting..." : "Request Consultation"}</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
