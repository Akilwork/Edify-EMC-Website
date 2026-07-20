"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  COUNTRY_CODES,
  INSTITUTION_TYPES,
  SERVICE_OPTIONS,
} from "./ConsultationModal";

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
        title: "Enquiry Requested!",
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
        serviceRequired: defaultService,
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Line 1: Name, Contact Number, Email Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="scene10-name" className="text-[13px] font-normal text-white mb-2 block">
            Name
          </label>
          <input
            id="scene10-name"
            type="text"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 h-[52px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
            style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="scene10-phone" className="text-[13px] font-normal text-white mb-2 block">
            Contact Number
          </label>
          <div
            className="flex items-center border border-white/5 rounded-[8px] h-[52px] focus-within:border-white/20 transition-all duration-200 backdrop-blur-sm"
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
                  className="absolute top-[58px] left-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-48 overflow-y-auto w-36 backdrop-blur-md"
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
            <div className="w-px h-5 bg-white/10 flex-shrink-0" />
            <input
              id="scene10-phone"
              type="tel"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full h-full bg-transparent px-3 text-sm text-white placeholder-white/30 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="scene10-email" className="text-[13px] font-normal text-white mb-2 block">
            Email Address
          </label>
          <input
            id="scene10-email"
            type="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 h-[52px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
            style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
            required
          />
        </div>
      </div>

      {/* Line 2: Institution Type, Institution Name, Designation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col" ref={instDropdownRef}>
          <label className="text-[13px] font-normal text-white mb-2 block">
            Institution Type
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowInstTypes(!showInstTypes)}
              className="w-full flex items-center justify-between px-4 h-[52px] border border-white/5 rounded-[8px] text-sm text-left text-white/80 hover:text-white cursor-pointer focus:outline-none focus:border-white/20 transition-colors duration-200 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
            >
              <span className={formData.institutionType ? "text-white" : "text-white/30"}>
                {formData.institutionType || "Select Type"}
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
                className="absolute top-[58px] left-0 right-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-52 overflow-y-auto backdrop-blur-md"
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
          <label htmlFor="scene10-inst-name" className="text-[13px] font-normal text-white mb-2 block">
            Institution Name
          </label>
          <input
            id="scene10-inst-name"
            type="text"
            placeholder="Enter Institution Name"
            value={formData.institutionName}
            onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
            className="w-full px-4 h-[52px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
            style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="scene10-designation" className="text-[13px] font-normal text-white mb-2 block">
            Designation
          </label>
          <input
            id="scene10-designation"
            type="text"
            placeholder="Enter Designation"
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            className="w-full px-4 h-[52px] border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm backdrop-blur-sm"
            style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
          />
        </div>
      </div>

      {/* Line 3: Service Required */}
      <div className="flex flex-col" ref={serviceDropdownRef}>
        <label className="text-[13px] font-normal text-white mb-2 block">
          Service Required
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowServices(!showServices)}
            className="w-full flex items-center justify-between px-4 h-[52px] border border-white/5 rounded-[8px] text-sm text-left text-white/80 hover:text-white cursor-pointer focus:outline-none focus:border-white/20 transition-colors duration-200 backdrop-blur-sm"
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
              className="absolute top-[58px] left-0 right-0 z-50 border border-white/10 rounded-lg shadow-xl py-1 max-h-52 overflow-y-auto backdrop-blur-md"
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

      {/* Line 4: How Can We Help? */}
      <div className="flex flex-col">
        <label htmlFor="scene10-help" className="text-[13px] font-normal text-white mb-2 block">
          How Can We Help?
        </label>
        <textarea
          id="scene10-help"
          rows={3}
          placeholder="Enter Text"
          value={formData.howCanWeHelp}
          onChange={(e) => setFormData({ ...formData, howCanWeHelp: e.target.value })}
          className="w-full px-4 py-3 border border-white/5 rounded-[8px] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all duration-200 text-sm resize-none h-[100px] backdrop-blur-sm"
          style={{ backgroundColor: "rgba(34, 34, 37, 0.65)" }}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-lg text-[15px]"
        >
          <span>{isSubmitting ? "Requesting..." : "Request Enquiry"}</span>
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </form>
  );
}
