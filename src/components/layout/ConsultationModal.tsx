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
            <div className="lg:hidden relative z-10 flex-shrink-0 px-6 pt-11 pb-8 sm:px-8 sm:pt-12 sm:pb-9 md:px-10 md:pt-14 md:pb-10 [@media(max-height:680px)]:pt-6 [@media(max-height:680px)]:pb-3">
              <div className="space-y-3 sm:space-y-4 [@media(max-height:680px)]:space-y-1">
                <h2 className="font-sans font-semibold text-white leading-[1.15] tracking-tight text-[26px] sm:text-[32px] md:text-[38px] [@media(max-height:680px)]:text-[20px] [@media(max-height:680px)]:leading-snug">
                  Building Stronger <br />
                  Institutions Starts Here
                </h2>
                <p className="text-white/65 text-[13px] sm:text-sm md:text-[15px] leading-relaxed max-w-sm md:max-w-md [@media(max-height:680px)]:hidden">
                  Connect with our consultants to explore tailored solutions designed for your institution's unique needs and growth objectives.
                </p>
              </div>
            </div>

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
                <>
                  <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pt-5 px-5 pb-24 sm:pt-7 sm:px-7 sm:pb-28 md:pt-9 md:px-9 md:pb-32 lg:pt-14 lg:px-8 lg:pb-6 xl:pt-16 xl:px-12 xl:pb-8">
                <form id="consultation-form" onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6 lg:space-y-5 xl:space-y-6 pb-6 lg:pb-0">

                  {/* ── Field 1: Name ────────────────── */}
                  <div className="flex flex-col relative z-10">
                    <label htmlFor="modal-name" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
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
                      className={`w-full px-4 h-[48px] sm:h-[52px] border rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
                        formErrors.name ? "border-red-500 focus:border-red-500" : "border-white/8 focus:border-white/20"
                      }`}
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                    />
                  </div>

                  {/* ── Field 2: Email Address ────────────────── */}
                  <div className="flex flex-col relative z-10">
                    <label htmlFor="modal-email" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
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
                      className={`w-full px-4 h-[48px] sm:h-[52px] border rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none transition-all duration-200 backdrop-blur-sm ${
                        formErrors.email ? "border-red-500 focus:border-red-500" : "border-white/8 focus:border-white/20"
                      }`}
                      style={{ backgroundColor: "rgba(34, 34, 37, 0.7)" }}
                    />
                  </div>

                  {/* ── Row 2: Contact Number ─────────────────────────────────── */}
                  <div className={`flex flex-col relative ${showCountryCodes ? "z-50" : "z-10"}`}>
                    <label htmlFor="modal-phone" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                      Contact Number
                    </label>
                    <div
                      className={`flex items-center border rounded-[8px] h-[48px] sm:h-[52px] lg:h-[48px] xl:h-[52px] transition-all duration-200 backdrop-blur-sm ${
                        formErrors.contactNumber ? "border-red-500 focus-within:border-red-500" : "border-white/8 focus-within:border-white/20"
                      }`}
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
                        className="w-full h-full bg-transparent px-3 text-[13px] sm:text-sm text-white placeholder-white/25 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* ── Row 3: How Can We Help? ─────────────────────────────────── */}
                  <div className="flex flex-col">
                    <label htmlFor="modal-help" className="text-[12px] sm:text-[13px] font-normal text-white/80 mb-2 block">
                      How Can We Help?
                    </label>
                    <textarea
                      id="modal-help"
                      placeholder="Enter Text"
                      value={formData.howCanWeHelp}
                      onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
                      className="w-full px-4 py-3 border border-white/8 rounded-[8px] text-white text-[13px] sm:text-sm placeholder-white/25 focus:outline-none focus:border-white/20 transition-all duration-200 resize-none h-[96px] sm:h-[110px] lg:h-[105px] xl:h-[120px] backdrop-blur-sm"
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
                  <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
