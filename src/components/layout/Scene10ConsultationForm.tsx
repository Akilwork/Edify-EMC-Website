"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { COUNTRY_CODES } from "./ConsultationModal";

const MAX_CHARACTERS = 200;

export default function Scene10ConsultationForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    designation: "",
    institutionType: "",
    institutionName: "",
    serviceRequired: defaultService,
    howCanWeHelp: "",
  });

  const [countryCode, setCountryCode] = useState("+971");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: boolean;
    contactNumber?: boolean;
    email?: boolean;
    howCanWeHelp?: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryCodes(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      contactNumber: "",
      email: "",
      designation: "",
      institutionType: "",
      institutionName: "",
      serviceRequired: defaultService,
      howCanWeHelp: "",
    });
    setCountryCode("+971");
    setFormErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: {
      name?: boolean;
      contactNumber?: boolean;
      email?: boolean;
      howCanWeHelp?: boolean;
    } = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.contactNumber.trim()) errors.contactNumber = true;
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = true;
    if (!formData.howCanWeHelp.trim()) errors.howCanWeHelp = true;

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all marked fields to submit your enquiry.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const fullContactNumber = `${countryCode} ${formData.contactNumber.trim()}`;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          countryCode,
          contactNumber: formData.contactNumber.trim(),
          fullContactNumber,
          message: formData.howCanWeHelp.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      setIsSubmitted(true);
      toast({
        title: "Enquiry Sent Successfully!",
        description:
          "Thank you for reaching out. Your enquiry has been sent to our mail and recorded.",
      });

      resetForm();
      setIsSubmitted(true);
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

  if (isSubmitted) {
    return (
      <div className="py-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-sm">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
          Enquiry Sent Successfully!
        </h3>
        <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Thank you for contacting Edify Management Consultancy. Your details
          have been automatically sent to our mail, and an advisor will get back
          to you shortly.
        </p>
        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 transition-all duration-300 text-sm cursor-pointer shadow-md active:scale-95"
        >
          <span>Send Another Enquiry</span>
          <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Field 1: Name */}
      <div className="flex flex-col relative z-10">
        <label htmlFor="scene10-name" className="text-[13px] font-medium text-white mb-2 block">
          Name
        </label>
        <input
          id="scene10-name"
          type="text"
          placeholder="Enter Full Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: false }));
          }}
          className={`w-full px-4 h-[52px] border rounded-[8px] text-white placeholder-white/30 focus:outline-none transition-all duration-200 text-sm backdrop-blur-sm ${
            formErrors.name ? "border-red-500 focus:border-red-500" : "border-white/5 focus:border-white/20"
          }`}
          style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
        />
      </div>

      {/* Field 2: Email Address */}
      <div className="flex flex-col relative z-10">
        <label htmlFor="scene10-email" className="text-[13px] font-medium text-white mb-2 block">
          Email Address
        </label>
        <input
          id="scene10-email"
          type="email"
          placeholder="Enter Email Address"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: false }));
          }}
          className={`w-full px-4 h-[52px] border rounded-[8px] text-white placeholder-white/30 focus:outline-none transition-all duration-200 text-sm backdrop-blur-sm ${
            formErrors.email ? "border-red-500 focus:border-red-500" : "border-white/5 focus:border-white/20"
          }`}
          style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
        />
      </div>

      {/* Row 2: Contact Number */}
      <div className={`flex flex-col relative ${showCountryCodes ? "z-50" : "z-10"}`}>
        <label htmlFor="scene10-phone" className="text-[13px] font-medium text-white mb-2 block">
          Contact Number
        </label>
        <div
          className={`flex items-center border rounded-[8px] h-[52px] transition-all duration-200 backdrop-blur-sm ${
            formErrors.contactNumber ? "border-red-500 focus-within:border-red-500" : "border-white/5 focus-within:border-white/20"
          }`}
          style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
        >
          <div ref={countryDropdownRef} className="relative flex-shrink-0 h-full">
            <button
              type="button"
              onClick={() => setShowCountryCodes(!showCountryCodes)}
              className="flex items-center gap-1 px-3 text-sm text-white/80 hover:text-white cursor-pointer h-full"
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
                className="absolute top-[58px] left-0 z-[100] border border-white/10 rounded-lg shadow-2xl py-1 max-h-48 overflow-y-auto w-36 bg-[#1f1f22]"
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
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />
          <input
            id="scene10-phone"
            type="tel"
            placeholder="Contact Number"
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
            className="w-full h-full bg-transparent px-3 text-sm text-white placeholder-white/30 focus:outline-none"
          />
        </div>
      </div>

      {/* Line 2: Message (maximum 200 characters) */}
      <div className="flex flex-col relative z-10">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="scene10-help" className="text-[13px] font-medium text-white block">
            Message (maximum 200 characters)
          </label>
          <span
            className={`text-[11px] font-mono ${
              formData.howCanWeHelp.length >= MAX_CHARACTERS
                ? "text-white font-bold"
                : "text-white/40"
            }`}
          >
            {formData.howCanWeHelp.length} / {MAX_CHARACTERS}
          </span>
        </div>
        <textarea
          id="scene10-help"
          rows={3}
          maxLength={MAX_CHARACTERS}
          placeholder="Tell us briefly about your institution or enquiry requirements..."
          value={formData.howCanWeHelp}
          onChange={(e) => {
            setFormData({
              ...formData,
              howCanWeHelp: e.target.value.slice(0, MAX_CHARACTERS),
            });
            if (formErrors.howCanWeHelp) {
              setFormErrors((prev) => ({ ...prev, howCanWeHelp: false }));
            }
          }}
          className={`w-full px-4 py-3 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-200 text-sm resize-none h-[110px] backdrop-blur-sm ${
            formErrors.howCanWeHelp
              ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
              : "border-white/15 focus:border-white/40"
          }`}
          style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-lg text-[15px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin text-black" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <span>Submit</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
