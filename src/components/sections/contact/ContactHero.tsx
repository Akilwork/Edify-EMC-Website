"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Mail,
  MapPin,
  ArrowRight,
  Loader2,
  ChevronDown,
  Check,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  message: string;
}

interface FormErrors {
  name?: boolean;
  email?: boolean;
  contactNumber?: boolean;
  message?: boolean;
}

const MAX_CHARACTERS = 200;

const COUNTRY_CODES = [
  { code: "+971", name: "UAE" },
  { code: "+966", name: "KSA" },
  { code: "+974", name: "QAT" },
  { code: "+968", name: "OMN" },
  { code: "+965", name: "KWT" },
  { code: "+973", name: "BHR" },
  { code: "+91", name: "IND" },
  { code: "+44", name: "UK" },
  { code: "+1", name: "US/CA" },
  { code: "+61", name: "AUS" },
  { code: "+65", name: "SGP" },
  { code: "+60", name: "MYS" },
  { code: "+49", name: "DEU" },
  { code: "+33", name: "FRA" },
  { code: "+41", name: "CHE" },
  { code: "+81", name: "JPN" },
  { code: "+86", name: "CHN" },
  { code: "+20", name: "EGY" },
  { code: "+92", name: "PAK" },
  { code: "+880", name: "BGD" },
  { code: "+94", name: "LKA" },
  { code: "+234", name: "NGA" },
  { code: "+27", name: "ZAF" },
  { code: "+254", name: "KEN" },
];

export default function ContactHero() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const [countryCode, setCountryCode] = useState("+971");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");
  const submittingRef = useRef(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryCodes(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "message" && value.length > MAX_CHARACTERS) {
      return;
    }

    if (name === "contactNumber") {
      const sanitized = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, contactNumber: sanitized }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !validateEmail(formData.email.trim())) {
      errors.email = true;
    }
    if (!formData.contactNumber.trim() || formData.contactNumber.trim().length < 5) {
      errors.contactNumber = true;
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email, and contact number.",
        variant: "destructive",
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus("submitting");

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
          message: formData.message.trim() || "General website enquiry",
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      setSubmitStatus("success");
      toast({
        title: "Enquiry Sent Successfully!",
        description:
          "Thank you for reaching out. Your enquiry has been sent to our mail and recorded.",
      });

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        message: "",
      });
      setFormErrors({});

      setTimeout(() => {
        setSubmitStatus("idle");
        setIsSubmitting(false);
        submittingRef.current = false;
      }, 3000);
    } catch (err: any) {
      setSubmitStatus("idle");
      setIsSubmitting(false);
      submittingRef.current = false;
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contact-hero"
      className="relative min-h-screen pt-36 pb-20 md:pt-44 md:pb-28 bg-white text-gray-900 overflow-hidden flex items-center border-b border-gray-200"
    >
      {/* Background Pure White Abstract Image Layer */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/contact-abstract-bg.jpg"
          alt="Pure white abstract background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        {/* Crisp pure white vignette / gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/80" />
      </div>

      {/* Decorative Subtle Grid Mesh */}
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.025)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-responsive container-max relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── Left Column: Heading, Context & Direct Details ── */}
          <div className="lg:col-span-5 flex flex-col justify-center pt-2">
            <h1 className="font-sans font-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-tight tracking-tight text-gray-950 mb-6">
              Contact Us
            </h1>

            <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-10">
              Have an enquiry or looking to collaborate with Edify Management
              Consultancy? Fill in the form and your message will be immediately
              directed to our senior advisory team.
            </p>

            {/* Quick Info Cards */}
            <div className="space-y-4">
              <a
                href="mailto:info@edify.ae"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/90 hover:border-gray-300 hover:bg-white/95 hover:shadow-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
              >
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-gray-800 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-gray-300 group-hover:scale-105 shadow-sm">
                  <Mail size={18} className="text-gray-800" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold font-mono">
                    Direct Email
                  </p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">
                    info@edify.ae
                  </p>
                </div>
              </a>

              <div className="group flex items-center gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/90 hover:border-gray-300 hover:bg-white/95 hover:shadow-md transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="w-11 h-11 rounded-xl bg-white border border-gray-200 text-gray-800 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-gray-300 group-hover:scale-105 shadow-sm">
                  <MapPin size={18} className="text-gray-800" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold font-mono">
                    Headquarters
                  </p>
                  <p className="text-gray-900 font-medium text-sm sm:text-base">
                    Business Bay, Dubai, United Arab Emirates
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Enquiry Form Card ── */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white/85 backdrop-blur-lg border border-gray-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.07)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative">
              <div className="mb-8">
                <h2 className="font-sans text-2xl sm:text-3xl font-medium text-gray-950 mb-2 tracking-tight">
                  Send Us an Enquiry
                </h2>
                <p className="text-gray-500 text-sm">
                  Please enter your details below. All fields are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Row 1: Name & Email ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="contact-name"
                      className="text-[13px] font-medium text-gray-700 mb-2 block"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 h-[50px] bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                        formErrors.name
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                          : "border-gray-200 focus:border-gray-900"
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-red-500 mt-1">
                        Please provide your name
                      </span>
                    )}
                  </div>

                  {/* Email ID */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="contact-email"
                      className="text-[13px] font-medium text-gray-700 mb-2 block"
                    >
                      Email ID
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 h-[50px] bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm ${
                        formErrors.email
                          ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                          : "border-gray-200 focus:border-gray-900"
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-red-500 mt-1">
                        Please provide a valid email address
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Contact Number (with Country Code) */}
                <div
                  className={`flex flex-col relative ${
                    showCountryCodes ? "z-50" : "z-10"
                  }`}
                >
                  <label
                    htmlFor="contact-phone"
                    className="text-[13px] font-medium text-gray-700 mb-2 block"
                  >
                    Contact Number
                  </label>
                  <div
                    className={`flex items-center bg-gray-50 border rounded-xl h-[50px] transition-all duration-200 focus-within:bg-white ${
                      formErrors.contactNumber
                        ? "border-red-500 focus-within:border-red-500 ring-1 ring-red-500/20"
                        : "border-gray-200 focus-within:border-gray-900"
                    }`}
                  >
                    {/* Country Code Dropdown */}
                    <div
                      ref={countryDropdownRef}
                      className="relative flex-shrink-0 h-full"
                    >
                      <button
                        type="button"
                        onClick={() => setShowCountryCodes(!showCountryCodes)}
                        className="flex items-center gap-1 px-3 sm:px-3.5 text-sm font-medium text-gray-800 hover:bg-gray-200/60 cursor-pointer h-full rounded-l-xl transition-colors"
                      >
                        <span>{countryCode}</span>
                        <ChevronDown
                          size={14}
                          className={`text-gray-500 transition-transform duration-200 ${
                            showCountryCodes ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showCountryCodes && (
                        <div className="absolute top-[54px] left-0 z-[100] border border-gray-200 rounded-xl shadow-2xl py-1 max-h-52 overflow-y-auto w-44 bg-white">
                          {COUNTRY_CODES.map((item) => (
                            <button
                              key={item.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(item.code);
                                setShowCountryCodes(false);
                              }}
                              className="w-full text-left px-3.5 py-2 text-[13px] text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer flex items-center justify-between"
                            >
                              <span className="font-semibold text-gray-900">
                                {item.code}
                              </span>
                              <span className="text-gray-400 text-xs">
                                {item.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

                    {/* Input */}
                    <input
                      id="contact-phone"
                      name="contactNumber"
                      type="tel"
                      placeholder="50 123 4567"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 bg-transparent text-gray-900 text-sm placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  {formErrors.contactNumber && (
                    <span className="text-[11px] text-red-500 mt-1">
                      Please provide your contact number
                    </span>
                  )}
                </div>

                {/* Row 3: Message (maximum 200 characters) */}
                <div className="flex flex-col relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="text-[13px] font-medium text-gray-700 block"
                    >
                      Message (maximum 200 characters)
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        formData.message.length >= MAX_CHARACTERS
                          ? "text-red-500 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.message.length} / {MAX_CHARACTERS}
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    maxLength={MAX_CHARACTERS}
                    placeholder="Tell us briefly about your institution or enquiry requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all duration-200 text-sm resize-none h-[110px] ${
                      formErrors.message
                        ? "border-red-500 focus:border-red-500 ring-1 ring-red-500/20"
                        : "border-gray-200 focus:border-gray-900"
                    }`}
                  />
                  {/* Message is optional */}
                </div>

                {/* Row 4: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className={`group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-10 py-3.5 font-semibold rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-85 disabled:pointer-events-none cursor-pointer shadow-md text-[15px] ${
                      submitStatus === "success"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-950 text-white hover:bg-gray-800"
                    }`}
                  >
                    {submitStatus === "submitting" ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        <span>Submitting...</span>
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <Check size={16} className="text-white" />
                        <span>Submitted!</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
