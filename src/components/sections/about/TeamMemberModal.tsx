"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Code2,
  ShoppingBag,
  Zap,
  BarChart3,
  ShieldCheck,
  Layers,
  Users,
  Target,
  Sparkles,
  Globe,
} from "lucide-react";
import { TeamMember, TEAM_MEMBERS } from "./teamData";

interface TeamMemberModalProps {
  selectedMember: TeamMember | null;
  onClose: () => void;
  onSelectMember: (member: TeamMember) => void;
}

export default function TeamMemberModal({
  selectedMember,
  onClose,
  onSelectMember,
}: TeamMemberModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMember) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        navigateMember("prev");
      } else if (e.key === "ArrowRight") {
        navigateMember("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember]);

  if (!selectedMember) return null;

  const currentIndex = TEAM_MEMBERS.findIndex((m) => m.id === selectedMember.id);

  const navigateMember = (direction: "prev" | "next") => {
    if (currentIndex === -1) return;
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0) nextIndex = TEAM_MEMBERS.length - 1;
    if (nextIndex >= TEAM_MEMBERS.length) nextIndex = 0;
    onSelectMember(TEAM_MEMBERS[nextIndex]);
  };

  const renderIcon = (iconType: string) => {
    const iconClass = "w-5 h-5 text-blue-400";
    switch (iconType) {
      case "code":
        return <Code2 className={iconClass} />;
      case "cart":
        return <ShoppingBag className={iconClass} />;
      case "zap":
        return <Zap className={iconClass} />;
      case "chart":
        return <BarChart3 className={iconClass} />;
      case "shield":
        return <ShieldCheck className={iconClass} />;
      case "layers":
        return <Layers className={iconClass} />;
      case "users":
        return <Users className={iconClass} />;
      case "target":
        return <Target className={iconClass} />;
      case "sparkles":
        return <Sparkles className={iconClass} />;
      case "globe":
        return <Globe className={iconClass} />;
      default:
        return <Code2 className={iconClass} />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#090C15] border border-white/10 sm:border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all text-white my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateMember("prev")}
            className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/10 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Previous member"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateMember("next")}
            className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 border border-white/10 hover:bg-black/90 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            aria-label="Next member"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Upper Section: Profile Details & Headshot */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 items-center p-6 sm:p-8 md:p-10 pt-12 sm:pt-10">
            {/* Left Info Column */}
            <div className="text-left z-10">
              <h2 className="font-sans text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-2">
                {selectedMember.name}
              </h2>
              <p className="text-blue-400 font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase mb-4 sm:mb-6">
                {selectedMember.roleSubtitle}
              </p>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed font-light max-w-xl">
                {selectedMember.bio}
              </p>
            </div>

            {/* Right Headshot Image Column */}
            <div className="relative flex items-center justify-center z-10 mt-2 lg:mt-0">
              {/* Vibrant radial blue glow effect behind portrait */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-70 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(37, 99, 235, 0.45) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 75%)",
                }}
              />
              <div className="relative w-full max-w-[250px] xs:max-w-[280px] sm:max-w-[320px] aspect-[4/5] mx-auto rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/40">
                <Image
                  src={selectedMember.imageSrc}
                  alt={selectedMember.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 250px, (max-width: 1024px) 280px, 320px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Bottom Highlights & Specializations Container */}
          <div className="bg-[#0D121F]/90 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-md mx-4 xs:mx-6 sm:mx-8 md:mx-10 mb-6 sm:mb-8 md:mb-10">
            {/* 3 Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-5">
              {selectedMember.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {renderIcon(feature.iconType)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm font-normal mt-1 leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Specializations / Technologies bottom line */}
            <div className="flex flex-wrap items-center gap-2 pt-3.5 border-t border-white/10 text-xs sm:text-sm">
              <span className="text-blue-400 font-bold uppercase tracking-wider text-xs">
                SPECIALIZATIONS:
              </span>
              <span className="text-white/70 font-medium">
                {selectedMember.specializations.join(" • ")}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
