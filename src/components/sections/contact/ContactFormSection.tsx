"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Send, Loader2 } from "lucide-react";

export default function ContactFormSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{
    name?: boolean;
    email?: boolean;
    contactNumber?: boolean;
    message?: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const MAX_CHARACTERS = 200;

  const handleChange = (
    field: "name" | "email" | "contactNumber" | "message",
    value: string
  ) => {
    if (field === "message" && value.length > MAX_CHARACTERS) {
      value = value.slice(0, MAX_CHARACTERS);
    }
    if (field === "contactNumber") {
      value = value.replace(/[^0-9+\s-]/g, "");
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const errors: {
      name?: boolean;
      email?: boolean;
      contactNumber?: boolean;
      message?: boolean;
    } = {};

    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = true;
    if (!formData.contactNumber.trim()) errors.contactNumber = true;
    if (!formData.message.trim()) errors.message = true;

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill out all fields marked in red.",
        variant: "destructive",
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Message submission failed");
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We will get back to you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        message: "",
      });
      setFormErrors({});
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="section-padding bg-[#16213E]">
      <div className="container-responsive container-max max-w-2xl">
        <h2 className="font-heading text-4xl font-bold text-white mb-2">Send Us a Message</h2>
        <p className="text-white/50 text-sm mb-8">Reach out directly and our advisory team will respond.</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div>
            <label htmlFor="form-name" className="block text-sm text-white/70 mb-2">
              Name <span className="text-[#E8C97A]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                <User size={16} />
              </div>
              <input
                id="form-name"
                type="text"
                placeholder="John Smith"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors duration-200 ${
                  formErrors.name ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#E8C97A]"
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="form-email" className="block text-sm text-white/70 mb-2">
                Email ID <span className="text-[#E8C97A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail size={16} />
                </div>
                <input
                  id="form-email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors duration-200 ${
                    formErrors.email ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#E8C97A]"
                  }`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="form-phone" className="block text-sm text-white/70 mb-2">
                Contact Number <span className="text-[#E8C97A]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Phone size={16} />
                </div>
                <input
                  id="form-phone"
                  type="tel"
                  placeholder="+971 50 123 4567"
                  value={formData.contactNumber}
                  onChange={(e) => handleChange("contactNumber", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors duration-200 ${
                    formErrors.contactNumber ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#E8C97A]"
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="form-message" className="block text-sm text-white/70">
                Message (maximum 200 characters) <span className="text-[#E8C97A]">*</span>
              </label>
              <span className="text-xs font-mono text-white/40">
                {formData.message.length} / {MAX_CHARACTERS}
              </span>
            </div>
            <textarea
              id="form-message"
              rows={4}
              maxLength={MAX_CHARACTERS}
              placeholder="Tell us briefly about your requirement..."
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`w-full p-4 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors duration-200 resize-none ${
                formErrors.message ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-[#E8C97A]"
              }`}
            />
          </div>

          <button
            type="submit"
            id="contact-form-submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 bg-[#E8C97A] text-[#0F0F1A] font-bold rounded-full hover:bg-[#F5E4A8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <Send size={15} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
