"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, Clock, X, ChevronRight } from "lucide-react";

// Position data: 3 main categories (Teaching Staff, Non-Teaching Staff, Academic Leaders)
const OPEN_POSITIONS = [
  {
    id: "teaching-staff",
    applyUrl: "https://recruitment.nimsuae.com/resume-upload?teach_id=MQ==&from=edify",
    title: "TEACHING STAFF",
    department: "Academic & Instructional",
    location: "Dubai & Northern Emirates, UAE",
    type: "Full-Time",
    experience: "2+ Years",
    badge: "TEACHING",
    theme: "purple",
    cardBgClass: "bg-gradient-to-br from-[#5850e6] via-[#4538d6] to-[#251e8c]",
    titleColorClass: "text-white",
    descColorClass: "text-white/85",
    badgeClass: "bg-white/15 text-white border-white/20 font-medium",
    btnClass: "bg-white text-black hover:bg-neutral-100 shadow-md",
    image: "/assets/careers/career-1.png",
    overview:
      "Join premier educational institutions across the UAE. We recruit certified and inspiring educators across Kindergarten, Primary, and Secondary levels in IB, British, and American curricula.",
    responsibilities: [
      "Deliver dynamic, learner-centric lessons aligned with international curriculum standards.",
      "Employ modern pedagogies, differentiated instruction, and technology-enhanced teaching methods.",
      "Monitor, evaluate, and report student developmental and academic progression.",
      "Collaborate with school leadership and parents to cultivate an inspiring learning environment."
    ],
    requirements: [
      "Bachelor's Degree in Education (B.Ed) or subject-specific degree with teaching certification (PGCE, QTS, or recognized equivalent).",
      "Minimum 2+ years of verified classroom teaching experience in accredited schools.",
      "Strong classroom management, collaborative spirit, and digital fluency.",
      "Fluency in English (Arabic or multilingual capability is a definite advantage)."
    ]
  },
  {
    id: "non-teaching-staff",
    applyUrl: "https://recruitment.nimsuae.com/resume-upload?teach_id=MA==&from=edify",
    title: "NON-TEACHING STAFF",
    department: "Operations, Administration & Support",
    location: "Dubai, UAE",
    type: "Full-Time",
    experience: "2+ Years",
    badge: "OPERATIONS",
    theme: "dark",
    cardBgClass: "bg-[#14151f] border border-white/10 hover:border-white/20",
    titleColorClass: "text-white",
    descColorClass: "text-white/70",
    badgeClass: "bg-white/10 text-white/80 border-white/10 font-medium",
    btnClass: "bg-white text-black hover:bg-neutral-100 shadow-md",
    image: "/assets/careers/career-4.png",
    overview:
      "Key administrative and operational positions powering school excellence—spanning Admissions, Human Resources, Finance, Facilities, ICT Support, and Student Services.",
    responsibilities: [
      "Manage daily campus operations, student onboarding, admissions inquiries, or administrative processes.",
      "Maintain stringent compliance with regional regulatory authority guidelines and school policies.",
      "Ensure efficient records management, parent communication, and vendor coordination.",
      "Provide proactive operational support to faculty, students, and executive management."
    ],
    requirements: [
      "Bachelor's Degree in Business Administration, Finance, Human Resources, IT, or relevant field.",
      "2+ years of administrative or operational experience, ideally within educational or corporate settings.",
      "Proficiency with ERP/School Management Systems (SMS) and productivity software.",
      "Strong communication, multitasking, and customer-service mindset."
    ]
  },
  {
    id: "academic-leaders",
    applyUrl: "https://recruitment.nimsuae.com/resume-upload?teach_id=Mg==&from=edify",
    title: "ACADEMIC LEADERS",
    department: "Executive Leadership & Governance",
    location: "Dubai & Regional Campuses",
    type: "Full-Time",
    experience: "5+ Years",
    badge: "LEADERSHIP",
    theme: "lime",
    cardBgClass: "bg-gradient-to-br from-[#c0ed38] via-[#a3e635] to-[#65a30d]",
    titleColorClass: "text-neutral-950",
    descColorClass: "text-neutral-900/80",
    badgeClass: "bg-black/10 text-neutral-950 border-black/10 font-medium",
    btnClass: "bg-white text-black hover:bg-neutral-100 shadow-md",
    image: "/assets/careers/career-5.png",
    overview:
      "Seeking accomplished Principals, Vice Principals, Heads of School, and Academic Directors to drive institutional transformation, instructional quality, and inspection readiness.",
    responsibilities: [
      "Steer strategic school improvement plans to achieve Outstanding/Very Good inspection ratings.",
      "Lead, mentor, and evaluate academic departments and instructional staff.",
      "Oversee school-wide accreditation processes (KHDA, ADEK, SPEA, NEASC, CIS, IB).",
      "Engage governors, trustees, and the parent community to build a culture of high achievement.",
    ],
    requirements: [
      "Master's Degree or higher in Educational Leadership, Curriculum & Instruction, or related discipline.",
      "5+ years of demonstrable leadership experience as Principal, Head of School, or Senior Academic Director.",
      "Exemplary knowledge of UAE and international inspection frameworks and standards.",
      "Proven record in school startup, operational scaling, and academic excellence."
    ]
  }
];

type PositionItem = typeof OPEN_POSITIONS[0];

export default function CareerPositions() {
  const [detailJob, setDetailJob] = useState<PositionItem | null>(null);

  // Lock document and body scrolling when detail modal is open
  useEffect(() => {
    if (detailJob) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [detailJob]);

  const allPositions = OPEN_POSITIONS;

  const handleOpenDetail = (job: PositionItem) => {
    setDetailJob(job);
  };

  const handleCloseDetail = () => {
    setDetailJob(null);
  };

    return (
    <>
      {/* Positions Section */}
      <section id="open-positions" className="relative z-20 py-16 sm:py-20 md:py-28 lg:py-32 xl:py-36 bg-white text-neutral-900 border-t border-neutral-200/80 overflow-hidden">
        {/* White Abstract Background Visual Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="/assets/careers/white-abstract-bg.png"
            alt="White Abstract Background"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90" />
        </div>

        <div className="relative z-10 container-responsive container-max px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          
          {/* Section Header */}
          <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20 px-2">
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px] font-medium tracking-tight text-neutral-950">
              Current Openings
            </h2>
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed font-sans max-w-lg mx-auto">
              Become part of a high-performing & collaborative team. Review details below and submit your application.
            </p>
          </div>

          {/* Bento Grid Layout of All Open Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {allPositions.map((job) => {
                const isPurple = job.theme === "purple";
                const isLime = job.theme === "lime";
                const isAmber = job.theme === "amber";
                const isSky = job.theme === "sky";
                const isRose = job.theme === "rose";
                const isCyan = job.theme === "cyan";
                const isViolet = job.theme === "violet";
                const isEmerald = job.theme === "emerald";

                return (
                  <div
                    key={job.id}
                    onClick={() => handleOpenDetail(job)}
                    className={`group relative rounded-2xl sm:rounded-[32px] md:rounded-[36px] p-5 sm:p-7 md:p-9 lg:p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 min-h-0 sm:min-h-[460px] md:min-h-[500px] shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] ${job.cardBgClass}`}
                  >
                    {/* Decorative Background Artwork for Gradient Cards */}
                    {(isPurple || isAmber || isSky || isRose || isCyan || isViolet || isEmerald) && (
                      <div className="absolute right-[-10%] bottom-[-10%] w-[70%] h-[70%] rounded-full bg-white/10 blur-[60px] pointer-events-none" />
                    )}

                    {isLime && (
                      <div className="absolute right-[-10%] bottom-[-10%] w-[75%] h-[75%] rounded-full bg-black/10 blur-[50px] pointer-events-none" />
                    )}

                    {/* Top Block: Title & Action Pill */}
                    <div className="space-y-4 sm:space-y-5 relative z-10">
                      <h3 className={`font-sans text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-medium tracking-tight leading-snug sm:leading-tight uppercase break-words ${job.titleColorClass}`}>
                        {job.title}
                      </h3>

                      {/* Apply Button */}
                      <div className="flex items-center pt-1">
                        <a
                          href={job.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer outline-none active:scale-95 shrink-0 bg-white text-black hover:bg-neutral-100"
                        >
                          <span>Apply</span>
                          <ChevronRight size={16} className="stroke-[2.5]" />
                        </a>
                      </div>
                    </div>

                    {/* Middle / Bottom Content: Overview Text & Visual Graphic Layer */}
                    <div className="relative z-10 mt-6 sm:mt-8 space-y-4 sm:space-y-6 flex-grow flex flex-col justify-between">
                      <p className={`text-xs sm:text-sm md:text-base leading-relaxed font-sans ${job.descColorClass}`}>
                        {job.overview}
                      </p>

                      {/* Bottom Image / Decorative Card Mockup Container */}
                      <div className="relative w-full h-32 sm:h-40 md:h-44 lg:h-48 mt-3 sm:mt-4 rounded-xl sm:rounded-2xl overflow-hidden border border-black/10 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:scale-[1.02] transition-transform duration-500">
                        <Image
                          src={job.image}
                          alt={job.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Position Details Slide-over / Modal */}
      <AnimatePresence>
        {detailJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetail}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl touch-none overscroll-contain"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200/80 rounded-[28px] sm:rounded-[36px] py-5 sm:py-7 z-10 shadow-[0_25px_70px_rgba(0,0,0,0.18)] text-neutral-900 overflow-hidden max-h-[88vh] flex flex-col"
            >
              {/* Top Header */}
              <div className="flex items-start justify-between px-5 sm:px-8 pb-4 sm:pb-5 border-b border-neutral-200/80 flex-shrink-0">
                <div>
                  <h3 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950 uppercase">
                    {detailJob.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-xs">
                    <span className="flex items-center gap-1.5 bg-neutral-100 border border-neutral-200/70 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      <MapPin size={12} className="text-[#a855f7]" />
                      {detailJob.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-neutral-100 border border-neutral-200/70 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      <Clock size={12} className="text-[#a855f7]" />
                      {detailJob.type}
                    </span>
                    <span className="flex items-center gap-1.5 bg-neutral-100 border border-neutral-200/70 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      <Briefcase size={12} className="text-[#a855f7]" />
                      {detailJob.experience}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCloseDetail}
                  className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-5 sm:px-8 py-5 space-y-6 text-sm sm:text-base flex-grow [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:h-0">
                {/* Overview */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-[#a855f7] text-xs uppercase tracking-wider">Position Overview</h4>
                  <p className="text-neutral-700 leading-relaxed font-sans text-sm sm:text-base">{detailJob.overview}</p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#a855f7] text-xs uppercase tracking-wider">Key Responsibilities</h4>
                  <ul className="space-y-2.5 text-neutral-700 leading-relaxed font-sans text-sm">
                    {detailJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[#a855f7] text-xs uppercase tracking-wider">Key Requirements</h4>
                  <ul className="space-y-2.5 text-neutral-700 leading-relaxed font-sans text-sm">
                    {detailJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/10 mt-2 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="px-5 sm:px-8 pt-4 sm:pt-5 border-t border-neutral-200/80 flex justify-end gap-3 flex-shrink-0">
                <button
                  onClick={handleCloseDetail}
                  className="px-6 sm:px-7 py-3 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-sm font-semibold cursor-pointer transition-all duration-200"
                >
                  Close
                </button>
                <a
                  href={detailJob.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 sm:px-9 py-3 bg-black text-white hover:bg-neutral-800 font-sans text-sm sm:text-base font-bold rounded-full shadow-md cursor-pointer active:scale-95 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <span>Apply Now</span>
                  <ChevronRight size={16} className="stroke-[2.5]" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
