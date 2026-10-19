"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowRight, CheckCircle2 } from "lucide-react";
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
  const [formErrors, setFormErrors] = useState<{ name?: boolean; contactNumber?: boolean; email?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submittingRef = useRef(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryCodes(false);
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
      setFormErrors({});
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const errors: { name?: boolean; contactNumber?: boolean; email?: boolean } = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.contactNumber.trim()) errors.contactNumber = true;
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = true;

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields marked in red.",
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
        <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center lg:p-6 xl:p-10">

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
              "h-[92dvh] lg:max-w-5xl lg:h-[620px] xl:h-[640px] lg:max-h-[90vh]",
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
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-md"
              style={{ backgroundColor: "#222225" }}
              aria-label="Close modal"
            >
              <X size={15} className="sm:hidden" />
              <X size={17} className="hidden sm:block lg:hidden" />
              <X size={18} className="hidden lg:block" />
            </button>

            {/* ══════════════════════════════════════════════════════════════════
                DESKTOP  —  Left column (visible on lg+)
            ══════════════════════════════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:w-1/2 p-8 lg:p-10 xl:p-12 flex-col justify-center relative backdrop-blur-md bg-black/30 border-r border-white/5 overflow-hidden flex-shrink-0 select-none z-10">
              <div className="relative z-10 space-y-6 max-w-lg">
                <h2 className="font-sans font-medium text-white leading-[1.2] text-[28px] lg:text-[32px] xl:text-[36px] tracking-tight">
                  Building Stronger <br />
                  Institutions Starts Here
                </h2>
                <p className="text-white/70 text-[15px] xl:text-[16px] leading-relaxed font-normal">
                  Connect with our consultants to explore tailored solutions designed for your institution's unique needs and growth objectives.
                </p>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                FORM PANEL (Desktop Right Column / Full Mobile Sheet Content)
            ══════════════════════════════════════════════════════════════════ */}
            <div
              className={[
                "relative z-10 w-full lg:w-1/2",
                "bg-[#0d0d0d]/80 lg:bg-[#0d0d0d]/70 backdrop-blur-md",
                "flex-1 min-h-0 lg:h-full",
                "flex flex-col",
              ].join(" ")}
            >
              {isSubmitted ? (
                <div className="flex-1 min-h-0 flex flex-col items-center justify-center py-12 px-6 sm:px-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-medium text-white mb-3">
                    Enquiry Sent Successfully!
                  </h3>
                  <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for contacting Edify Management Consultancy. Your details have been automatically sent to our mail, and an advisor will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 transition-all duration-300 text-sm cursor-pointer shadow-md active:scale-95"
                  >
                    <span>Close</span>
                  </button>
                </div>
              ) : (
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar overscroll-contain flex flex-col justify-start lg:justify-center p-5 sm:p-7 md:p-8 lg:p-8 xl:p-12 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] lg:pb-8 xl:pb-12">
                  {/* Mobile header (Title & Subtitle) */}
                  <div className="lg:hidden mb-5 sm:mb-6 pr-8">
                    <h2 className="font-sans font-semibold text-white leading-[1.2] tracking-tight text-[22px] sm:text-[26px]">
                      Building Stronger <br />
                      Institutions Starts Here
                    </h2>
                    <p className="text-white/65 text-[13px] sm:text-sm leading-relaxed mt-2 max-w-sm sm:max-w-md">
                      Connect with our consultants to explore tailored solutions designed for your institution's unique needs and growth objectives.
                    </p>
                  </div>

                  <form id="consultation-form" onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 lg:space-y-4 xl:space-y-5 w-full">

                    {/* ── Field 1: Name ────────────────── */}
                    <div className="flex flex-col relative z-10">
                      <label htmlFor="modal-name" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-1.5 block">
                        Name
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: false }));
                        }}
                        className={`w-full px-4 h-[46px] sm:h-[50px] border rounded-[8px] text-white text-base sm:text-sm placeholder-white/25 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
                          formErrors.name ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-white/25"
                        }`}
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      />
                    </div>

                    {/* ── Field 2: Email Address ────────────────── */}
                    <div className="flex flex-col relative z-10">
                      <label htmlFor="modal-email" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-1.5 block">
                        Email Address
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: false }));
                        }}
                        className={`w-full px-4 h-[46px] sm:h-[50px] border rounded-[8px] text-white text-base sm:text-sm placeholder-white/25 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
                          formErrors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-white/25"
                        }`}
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      />
                    </div>

                    {/* ── Row 3: Contact Number ─────────────────────────────────── */}
                    <div className={`flex flex-col relative ${showCountryCodes ? "z-50" : "z-10"}`}>
                      <label htmlFor="modal-phone" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-1.5 block">
                        Contact Number
                      </label>
                      <div
                        className={`flex items-center border rounded-[8px] h-[46px] sm:h-[50px] transition-all duration-200 backdrop-blur-sm ${
                          formErrors.contactNumber ? "border-red-500 focus-within:border-red-500" : "border-white/10 focus-within:border-white/25"
                        }`}
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      >
                        <div ref={countryDropdownRef} className="relative flex-shrink-0 h-full">
                          <button
                            type="button"
                            onClick={() => setShowCountryCodes(!showCountryCodes)}
                            className="flex items-center gap-1 px-3 sm:px-3.5 text-base sm:text-sm text-white/80 hover:text-white cursor-pointer h-full"
                          >
                            <span>{countryCode}</span>
                            <ChevronDown
                              size={13}
                              className={`text-white/50 transition-transform duration-200 ${showCountryCodes ? "rotate-180" : ""}`}
                            />
                          </button>
                          {showCountryCodes && (
                            <div
                              className="absolute top-[50px] sm:top-[54px] left-0 z-[100] border border-white/10 rounded-lg shadow-2xl py-1 max-h-44 overflow-y-auto w-32 sm:w-36 bg-[#1c1c1f]"
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
                          onChange={(e) => {
                            setFormData({ ...formData, contactNumber: e.target.value.replace(/[^0-9]/g, "") });
                            if (formErrors.contactNumber) setFormErrors((prev) => ({ ...prev, contactNumber: false }));
                          }}
                          onKeyDown={(e) => {
                            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter", "Home", "End"];
                            if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
                              e.preventDefault();
                            }
                          }}
                          className="w-full h-full bg-transparent px-3 text-base sm:text-sm text-white placeholder-white/25 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* ── Row 4: How Can We Help? ─────────────────────────────────── */}
                    <div className="flex flex-col">
                      <label htmlFor="modal-help" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-1.5 block">
                        How Can We Help?
                      </label>
                      <textarea
                        id="modal-help"
                        placeholder="Enter Text"
                        value={formData.howCanWeHelp}
                        onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
                        className="w-full px-4 py-2.5 sm:py-3 border border-white/10 rounded-[8px] text-white text-base sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/25 transition-all duration-200 resize-none h-[84px] sm:h-[100px] lg:h-[95px] xl:h-[110px] backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                      />
                    </div>

                    {/* ── Submit button ────────────────────────────────────────── */}
                    <div className="pt-2 sm:pt-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-lg text-[14px] sm:text-[15px]"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
