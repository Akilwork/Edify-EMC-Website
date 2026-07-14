"use client";

import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactFormSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill out Name, Email, and Message fields.",
        variant: "destructive",
      });
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    let success = false;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
        company: "",
        message: "",
      });
      success = true;

      // Allow new submissions after a short delay (2 seconds)
      setTimeout(() => {
        submittingRef.current = false;
        setIsSubmitting(false);
      }, 2000);
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
    <section id="contact-form" className="section-padding bg-[#16213E]">
      <div className="container-custom max-w-2xl">
        <h2 className="font-heading text-4xl font-bold text-white mb-10">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {[
            { id: "name",    label: "Full Name",    type: "text",  placeholder: "John Smith" },
            { id: "email",   label: "Email Address",type: "email", placeholder: "john@company.com" },
            { id: "company", label: "Company",      type: "text",  placeholder: "Acme Corp" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm text-white/60 mb-2">{label}</label>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E8C97A] transition-colors duration-200"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm text-white/60 mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#E8C97A] transition-colors duration-200 resize-none"
            />
          </div>
          <button
            type="submit"
            id="contact-submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-[#E8C97A] text-[#0F0F1A] font-bold rounded-full hover:bg-[#F5E4A8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
