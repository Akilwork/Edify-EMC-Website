"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <p className="text-[#3ABAB4] text-[13px] font-medium py-2">
        ✓ Thank you for subscribing!
      </p>
    );
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 text-[13px] placeholder-white/25 focus:outline-none focus:border-[#3ABAB4]/40 transition-colors duration-200"
      />
      <button
        type="submit"
        className="w-full px-4 py-3 rounded-xl bg-[#3ABAB4] text-white text-[13px] font-semibold hover:bg-[#2ea8a2] transition-colors duration-200"
      >
        Subscribe
      </button>
    </form>
  );
}
