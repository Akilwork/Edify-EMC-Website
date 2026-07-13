"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ConsultationModal from "@/components/layout/ConsultationModal";

interface ConsultationContextType {
  isOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const openConsultation = () => setIsOpen(true);
  const closeConsultation = () => setIsOpen(false);

  return (
    <ConsultationContext.Provider value={{ isOpen, openConsultation, closeConsultation }}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={closeConsultation} />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error("useConsultation must be used within a ConsultationProvider");
  }
  return context;
}
