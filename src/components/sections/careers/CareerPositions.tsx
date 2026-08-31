"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  MapPin,
  Briefcase,
  Clock,
  Send,
  CheckCircle2,
  X,
  Upload,
  ArrowUpRight
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+971", name: "UAE" },
  { code: "+966", name: "KSA" },
  { code: "+965", name: "Kuwait" },
  { code: "+974", name: "Qatar" },
  { code: "+973", name: "Bahrain" },
  { code: "+968", name: "Oman" },
  { code: "+1", name: "USA" },
  { code: "+44", name: "UK" },
  { code: "+91", name: "India" },
  { code: "+92", name: "Pakistan" },
  { code: "+20", name: "Egypt" },
  { code: "+33", name: "France" },
  { code: "+49", name: "Germany" },
];

// Position data organized by pages with unique visual design themes and colors per page
const POSITIONS_PAGES: Record<number, Array<{
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  badge: string;
  theme: string;
  cardBgClass: string;
  titleColorClass: string;
  descColorClass: string;
  badgeClass: string;
  btnClass: string;
  image: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
}>> = {
  1: [
    {
      id: "academic-lead",
      title: "ACADEMIC CONSULTING LEAD",
      department: "Academic Services",
      location: "Dubai, UAE",
      type: "Full-Time",
      experience: "5+ Years",
      badge: "ACADEMIC",
      theme: "purple",
      cardBgClass: "bg-gradient-to-br from-[#5850e6] via-[#4538d6] to-[#251e8c]",
      titleColorClass: "text-white",
      descColorClass: "text-white/85",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-1.png",
      overview:
        "We are seeking a senior Academic Consulting Lead to direct our institutional consulting services. You will design, evaluate, and implement curriculum strategies and development frameworks for client schools, driving educational quality and leadership growth.",
      responsibilities: [
        "Conduct comprehensive audits of institutional curricula, assessment methodologies, and teaching quality.",
        "Collaborate directly with school management to design tailored professional development programs for teachers.",
        "Lead advisory projects on school startup operations, licensing compliance, and inspection readiness.",
        "Drive academic performance enhancement frameworks in line with regional regulatory criteria."
      ],
      requirements: [
        "Master's Degree in Education, School Leadership, or equivalent field.",
        "Proven experience in leadership roles (Principal, Vice Principal, or Head of Department) in international schools.",
        "Deep understanding of regional educational quality standards and inspection frameworks.",
        "Strong analytical skills and exceptional capability in presenting academic strategies to senior management."
      ]
    },
    {
      id: "it-consultant",
      title: "FRONTEND & IT ARCHITECTURE",
      department: "IT Solutions & Digital Transformation",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "7+ Years",
      badge: "IT & DIGITAL",
      theme: "dark",
      cardBgClass: "bg-[#14151f] border border-white/10 hover:border-white/20",
      titleColorClass: "text-white",
      descColorClass: "text-white/70",
      badgeClass: "bg-white/10 text-white/80 border-white/10 font-medium",
      btnClass: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
      image: "/assets/careers/career-2.png",
      overview:
        "Our adaptive design components are built using perfectly structured and readable code. We develop web & enterprise services based on React.js, Next.js, and cloud platforms for client institutions.",
      responsibilities: [
        "Analyze client system requirements to formulate cloud, network, and software architecture plans.",
        "Oversee development and deployment of custom ERP integrations, LMS systems, and student information systems.",
        "Deliver digital audit reports and risk assessments detailing infrastructure updates and cybersecurity protocols.",
        "Interface between client tech leadership and internal dev engineers to execute tech deliverables on time."
      ],
      requirements: [
        "Bachelor's or Master's degree in Computer Science, Software Engineering, or Information Systems.",
        "Exceptional architecture background with standard SaaS platforms, API integrations, and cloud hosting (AWS/Azure).",
        "Prior experience implementing large-scale technology solutions in educational or enterprise environments.",
        "Certifications like AWS Solutions Architect, TOGAF, or CISSP are highly desirable."
      ]
    },
    {
      id: "finance-specialist",
      title: "BACKEND & FINANCIAL ADVISORY",
      department: "Financial Services",
      location: "Dubai Office",
      type: "Full-Time",
      experience: "4+ Years",
      badge: "FINANCE",
      theme: "dark",
      cardBgClass: "bg-[#14151f] border border-white/10 hover:border-white/20",
      titleColorClass: "text-white",
      descColorClass: "text-white/70",
      badgeClass: "bg-white/10 text-white/80 border-white/10 font-medium",
      btnClass: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
      image: "/assets/careers/career-3.png",
      overview:
        "We create architecture and thought-over business logic for online services and institutional clients. Our team helps you select the best internal and external integration & financial advisory solutions.",
      responsibilities: [
        "Formulate custom financial models, budgeting reports, and operational forecast sheets.",
        "Advise educational institutions on cost optimization strategies, vendor contracts, and revenue diversification.",
        "Oversee due diligence audits and financial evaluations for potential acquisitions or expansions.",
        "Deliver regular compliance and advisory reports to client board members."
      ],
      requirements: [
        "Bachelor's degree in Finance, Accounting, Economics, or CPA/CFA equivalent.",
        "Strong analytical skills with a history of analyzing complex corporate budgets or institutional balance sheets.",
        "Prior financial advisory or auditing experience in educational institutions or top consultancy firms.",
        "Outstanding communication and report-writing skills."
      ]
    },
    {
      id: "marketing-lead",
      title: "BRANDING & QUALITY MARKETING",
      department: "Marketing",
      location: "Dubai Office",
      type: "Full-Time",
      experience: "3+ Years",
      badge: "MARKETING",
      theme: "lime",
      cardBgClass: "bg-gradient-to-br from-[#c0ed38] via-[#a3e635] to-[#65a30d]",
      titleColorClass: "text-neutral-950",
      descColorClass: "text-neutral-900/80",
      badgeClass: "bg-black/10 text-neutral-950 border-black/10 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900",
      image: "/assets/careers/career-4.png",
      overview:
        "We are looking for an energetic Marketing Coordinator to construct, manage, and scale the brand presence and enrollment strategies of our educational client partners.",
      responsibilities: [
        "Develop comprehensive multi-channel marketing, enrollment drive, and digital advertising strategies.",
        "Oversee graphic branding, copy direction, and content schedules across print and digital media.",
        "Analyze market trends, demographic data, and campaign ROI metrics to optimize brand placement.",
        "Co-design visual uniforms, banners, and institutional assets alongside client designers."
      ],
      requirements: [
        "Bachelor's degree in Marketing, PR, Communications, or Business Admin.",
        "Proven history running successful brand campaigns or digital marketing operations in the education sector.",
        "Proficient with design suites (Figma/Adobe CC) and advertising/analytics platforms.",
        "Highly creative, self-starting attitude with top-tier presentation skills."
      ]
    }
  ],
  2: [
    {
      id: "institutional-strategy",
      title: "INSTITUTIONAL STRATEGY DIRECTOR",
      department: "Executive Advisory",
      location: "Dubai, UAE",
      type: "Full-Time",
      experience: "8+ Years",
      badge: "STRATEGY",
      theme: "amber",
      cardBgClass: "bg-gradient-to-br from-[#ea580c] via-[#d97706] to-[#78350f]",
      titleColorClass: "text-white",
      descColorClass: "text-white/90",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-5.png",
      overview:
        "Lead high-stakes strategic growth projects, multi-campus expansions, and institutional governance frameworks for prestigious educational groups in the MENA region.",
      responsibilities: [
        "Structure multi-year strategic roadmap plans for corporate and institutional boards.",
        "Evaluate regional market opportunities, licensing acquisitions, and campus scaling.",
        "Direct cross-functional consultancy teams on operational transformation.",
        "Present quarterly performance metrics to C-suite and board directors."
      ],
      requirements: [
        "MBA or Master's degree in Strategic Management or Business Administration.",
        "8+ years of senior strategy experience in top management consultancies.",
        "Track record of scaling institutional operations across GCC region.",
        "Exceptional executive presence and stakeholder management."
      ]
    },
    {
      id: "cybersecurity-lead",
      title: "CYBERSECURITY & DATA PRIVACY",
      department: "IT Solutions & Security",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "6+ Years",
      badge: "CYBERSECURITY",
      theme: "sky",
      cardBgClass: "bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0f172a]",
      titleColorClass: "text-white",
      descColorClass: "text-white/85",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-2.png",
      overview:
        "Design enterprise-grade data security, student privacy protection standards, and zero-trust cloud architectures for large client networks.",
      responsibilities: [
        "Perform vulnerability penetration assessments and cloud security audits.",
        "Implement GDPR and regional data compliance protocols across LMS & ERP databases.",
        "Formulate incident response runbooks and continuous security monitoring systems.",
        "Train client IT personnel on threat detection and secure coding protocols."
      ],
      requirements: [
        "Bachelor's degree in Cybersecurity, Information Security, or Computer Engineering.",
        "Certifications: CISSP, CISM, or CEH.",
        "Hands-on experience with AWS Security Hub, Azure Sentinel, and zero-trust models.",
        "Strong analytical skills with crisis response capability."
      ]
    },
    {
      id: "hr-talent-lead",
      title: "HR & TALENT ACQUISITION LEAD",
      department: "Human Resources",
      location: "Dubai Office",
      type: "Full-Time",
      experience: "5+ Years",
      badge: "HR & TALENT",
      theme: "emerald-dark",
      cardBgClass: "bg-[#0b1713] border border-emerald-500/25 hover:border-emerald-500/40",
      titleColorClass: "text-emerald-300",
      descColorClass: "text-white/75",
      badgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 font-medium",
      btnClass: "bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-bold",
      image: "/assets/careers/career-3.png",
      overview:
        "Orchestrate executive recruitment, international educator placement, and performance management structures for high-profile client accounts.",
      responsibilities: [
        "Direct end-to-end recruitment drives for senior academic and corporate roles.",
        "Design competitive compensation & benefits frameworks aligned with Gulf market trends.",
        "Establish employee retention, onboarding, and leadership development programs.",
        "Manage talent pipelines across GCC, UK, US, and APAC regions."
      ],
      requirements: [
        "Bachelor's or Master's degree in Human Resources, Psychology, or Business.",
        "SHRM-SCP or CIPD Level 7 certification preferred.",
        "5+ years in talent acquisition within education or management consulting.",
        "Demonstrated success in international headhunting and executive search."
      ]
    },
    {
      id: "operations-manager",
      title: "FACILITIES & OPERATIONS HEAD",
      department: "Facilities & Operations",
      location: "Dubai, UAE",
      type: "Full-Time",
      experience: "6+ Years",
      badge: "OPERATIONS",
      theme: "rose",
      cardBgClass: "bg-gradient-to-br from-[#e11d48] via-[#be123c] to-[#4c0519]",
      titleColorClass: "text-white",
      descColorClass: "text-white/85",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-4.png",
      overview:
        "Oversee campus infrastructure readiness, vendor logistics, safety protocols, and operational optimization for client institutional facilities.",
      responsibilities: [
        "Direct physical asset management, campus maintenance, and vendor SLAs.",
        "Ensure full compliance with municipality health, safety, and environmental standards.",
        "Implement energy efficiency and smart building management solutions.",
        "Lead operational crisis management and facility emergency readiness."
      ],
      requirements: [
        "Bachelor's degree in Facilities Management, Engineering, or Operations.",
        "Proven experience managing multi-site educational or commercial real estate facilities.",
        "Deep knowledge of UAE municipal building codes and safety regulations.",
        "Strong vendor negotiation and budget management skills."
      ]
    }
  ],
  3: [
    {
      id: "ai-edtech-lead",
      title: "AI & EDTECH INNOVATION LEAD",
      department: "Technology & Innovation",
      location: "Remote / Hybrid",
      type: "Full-Time",
      experience: "5+ Years",
      badge: "EDTECH",
      theme: "cyan",
      cardBgClass: "bg-gradient-to-br from-[#06b6d4] via-[#0891b2] to-[#164e63]",
      titleColorClass: "text-white",
      descColorClass: "text-white/85",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-1.png",
      overview:
        "Pioneer adaptive AI learning engines, automated student assessment tools, and next-gen classroom technology integrations.",
      responsibilities: [
        "Architect AI-driven personalized learning recommendation systems.",
        "Integrate LLM API workflows into client learning management portals.",
        "Audit existing classroom technologies and recommend digital upgrade paths.",
        "Conduct workshops for educators on AI-assisted pedagogy and tech adoption."
      ],
      requirements: [
        "Master's degree in Computer Science, Artificial Intelligence, or Educational Technology.",
        "Proficiency with Python, OpenAI/Anthropic APIs, Next.js, and Vector DBs.",
        "Experience building or deploying EdTech products in K-12 or Higher Ed.",
        "Passion for transforming educational experiences through technology."
      ]
    },
    {
      id: "global-partnerships",
      title: "GLOBAL PARTNERSHIPS DIRECTOR",
      department: "Business Development",
      location: "Dubai Office",
      type: "Full-Time",
      experience: "10+ Years",
      badge: "PARTNERSHIPS",
      theme: "violet",
      cardBgClass: "bg-gradient-to-br from-[#8b5cf6] via-[#7c3aed] to-[#3b0764]",
      titleColorClass: "text-white",
      descColorClass: "text-white/85",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-2.png",
      overview:
        "Forge strategic international alliances with global universities, accreditation bodies, and enterprise tech providers.",
      responsibilities: [
        "Identify and secure joint-venture educational partnerships worldwide.",
        "Negotiate licensing agreements, dual-degree frameworks, and institutional MoUs.",
        "Represent EDIFY at international education summits and trade delegations.",
        "Scale global network revenues across Europe, Asia, and the Americas."
      ],
      requirements: [
        "Master's degree in International Business, Relations, or Strategic Marketing.",
        "10+ years in international business development or higher ed partnerships.",
        "Established network of contacts in global accreditation and university boards.",
        "Flawless negotiation skills and international travel flexibility."
      ]
    },
    {
      id: "curriculum-specialist",
      title: "CURRICULUM & AUDIT SPECIALIST",
      department: "Academic Quality",
      location: "Dubai, UAE",
      type: "Full-Time",
      experience: "4+ Years",
      badge: "ACADEMIC AUDIT",
      theme: "gold-dark",
      cardBgClass: "bg-[#18130a] border border-amber-500/25 hover:border-amber-500/40",
      titleColorClass: "text-amber-300",
      descColorClass: "text-white/75",
      badgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/20 font-medium",
      btnClass: "bg-amber-500 text-neutral-950 hover:bg-amber-400 font-bold",
      image: "/assets/careers/career-3.png",
      overview:
        "Evaluate institutional learning outcomes, standard-aligned curricula, and classroom instruction benchmarks for client schools.",
      responsibilities: [
        "Conduct thorough curriculum mapping across IB, British, and American frameworks.",
        "Analyze student assessment data to identify learning gaps and subject enhancements.",
        "Prepare comprehensive inspection readiness documentation for regulatory bodies.",
        "Deliver hands-on coaching for department heads and curriculum coordinators."
      ],
      requirements: [
        "Master's in Education, Curriculum & Instruction, or related field.",
        "Prior experience as IB Coordinator, Head of Curriculum, or Inspector.",
        "In-depth knowledge of IB PYP/MYP/DP, US Common Core, or UK National Curriculum.",
        "Analytical mindset with strong report writing skills."
      ]
    },
    {
      id: "legal-counsel",
      title: "CORPORATE LEGAL COUNSEL",
      department: "Legal & Regulatory",
      location: "Dubai Office",
      type: "Full-Time",
      experience: "7+ Years",
      badge: "LEGAL",
      theme: "emerald",
      cardBgClass: "bg-gradient-to-br from-[#10b981] via-[#059669] to-[#022c22]",
      titleColorClass: "text-white",
      descColorClass: "text-white/85",
      badgeClass: "bg-white/15 text-white border-white/20 font-medium",
      btnClass: "bg-black text-white hover:bg-neutral-900 border border-white/10",
      image: "/assets/careers/career-4.png",
      overview:
        "Structure corporate licensing, educational franchising contracts, M&A due diligence, and regulatory compliance across Gulf jurisdictions.",
      responsibilities: [
        "Draft and review commercial contracts, school operating agreements, and vendor leases.",
        "Advise client management on regulatory compliance with education authorities (KHDA, ADEK, MoE).",
        "Manage corporate governance, IP protection, and dispute resolution processes.",
        "Lead legal due diligence for institutional acquisitions and joint ventures."
      ],
      requirements: [
        "LL.B or LL.M degree from a recognized university.",
        "Admitted to practice in UAE or international common law jurisdiction.",
        "7+ years in corporate commercial law with focus on education or corporate advisory.",
        "Fluency in English (Arabic proficiency is a major advantage)."
      ]
    }
  ]
};

type PositionItem = typeof POSITIONS_PAGES[1][0];

export default function CareerPositions() {
  const [selectedJob, setSelectedJob] = useState<PositionItem | null>(null);
  const [detailJob, setDetailJob] = useState<PositionItem | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openedFromDetail, setOpenedFromDetail] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    cv?: boolean;
  }>({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverNote: "",
    cvName: ""
  });

  // Lock document and body scrolling when any popup modal is open
  useEffect(() => {
    if (detailJob || selectedJob) {
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
  }, [detailJob, selectedJob]);

  // Close country code dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryCodes(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentPositions = POSITIONS_PAGES[currentPage] || POSITIONS_PAGES[1];

  const handleApplyClick = (job: PositionItem, e?: React.MouseEvent, fromDetail: boolean = false) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
    setIsSubmitSuccess(false);
    setOpenedFromDetail(fromDetail);
    setFileError("");
    setFormErrors({});
  };

  const handleOpenDetail = (job: PositionItem) => {
    setDetailJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setFormData({ name: "", email: "", phone: "", coverNote: "", cvName: "" });
    setCvFile(null);
    setFileError("");
    setFormErrors({});
    setOpenedFromDetail(false);
    setCountryCode("+971");
  };

  const handleCloseDetail = () => {
    setDetailJob(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3.5 * 1024 * 1024) {
        setFileError("File Size exceeds 3.5MB limit. Please upload a smaller file.");
        setFormErrors((prev) => ({ ...prev, cv: true }));
        setCvFile(null);
        setFormData((prev) => ({ ...prev, cvName: "" }));
        e.target.value = "";
        return;
      }
      setFileError("");
      setFormErrors((prev) => ({ ...prev, cv: false }));
      setCvFile(file);
      setFormData((prev) => ({ ...prev, cvName: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    // Validate fields on submit button click
    const errors: { name?: boolean; email?: boolean; phone?: boolean; cv?: boolean } = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim() || !formData.email.includes("@")) errors.email = true;
    if (!formData.phone.trim() || formData.phone.length < 5) errors.phone = true;

    if (!cvFile && !formData.cvName) {
      errors.cv = true;
      setFileError("Please upload your CV / Resume file.");
    } else if (cvFile && cvFile.size > 3.5 * 1024 * 1024) {
      errors.cv = true;
      setFileError("File Size exceeds 3.5MB limit. Please upload a smaller file.");
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      let fileBase64 = "";
      let mimeType = "";
      if (cvFile) {
        const reader = new FileReader();
        const readAsDataURL = () => new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(cvFile);
        });
        
        const dataUrl = await readAsDataURL();
        const parts = dataUrl.split(",");
        mimeType = parts[0].split(":")[1].split(";")[0];
        fileBase64 = parts[1];
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          countryCode,
          phone: countryCode + " " + formData.phone,
          coverNote: formData.coverNote,
          cvName: formData.cvName,
          cvBase64: fileBase64,
          cvMimeType: mimeType,
          jobTitle: selectedJob.title,
          jobId: selectedJob.id,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setIsSubmitSuccess(true);
      } else {
        console.error("Submission failed:", result.error);
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("There was a connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

          {/* 2x2 Bento Grid Layout matching reference design with page transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl lg:max-w-7xl mx-auto"
            >
              {currentPositions.map((job) => {
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

                      {/* Tag Row with Pill Badges & Apply Button */}
                      <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-2.5 pt-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border tracking-wide uppercase ${job.badgeClass}`}>
                            {job.badge}
                          </span>
                          <span className={`text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full border tracking-wide ${job.badgeClass}`}>
                            {job.experience}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleApplyClick(job, e)}
                          className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-md cursor-pointer outline-none active:scale-95 shrink-0 ${job.btnClass}`}
                        >
                          <span>Apply</span>
                          <ChevronRight size={14} className="stroke-[2.5]" />
                        </button>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end justify-between p-3 sm:p-4">
                          <span className="text-[10px] sm:text-[11px] text-white/90 font-medium flex items-center gap-1">
                            <MapPin size={12} className="text-[#3ABAB4]" />
                            {job.location}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-white/90 font-medium flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                            Details <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Reference Page Pagination Controls */}
          <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14 md:mt-16 text-sm font-medium">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  currentPage === page
                    ? "bg-black text-white font-bold shadow-lg scale-105"
                    : "text-neutral-500 hover:text-black hover:bg-black/5"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-neutral-400 px-1 text-xs sm:text-sm">...</span>
            <button
              onClick={() => handlePageChange(currentPage < 3 ? currentPage + 1 : 1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-black/5 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Position Details Slide-over / Modal */}
      <AnimatePresence>
        {detailJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
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
              className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200/80 rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 md:p-9 z-10 shadow-[0_25px_70px_rgba(0,0,0,0.18)] text-neutral-900 overflow-hidden max-h-[88vh] flex flex-col"
            >
              {/* Top Header */}
              <div className="flex items-start justify-between pb-5 sm:pb-6 border-b border-neutral-200/80 flex-shrink-0">
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
              <div className="overflow-y-auto pt-6 space-y-6 text-sm sm:text-base flex-grow pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:h-0">
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
              <div className="pt-5 border-t border-neutral-200/80 flex justify-end gap-3 flex-shrink-0">
                <button
                  onClick={handleCloseDetail}
                  className="px-6 py-2.5 rounded-full border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-semibold cursor-pointer transition-all duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const jobToApply = detailJob;
                    handleCloseDetail();
                    if (jobToApply) {
                      handleApplyClick(jobToApply, undefined, true);
                    }
                  }}
                  className="px-7 py-2.5 bg-black text-white hover:bg-neutral-800 font-sans text-xs font-bold rounded-full shadow-md cursor-pointer active:scale-95 transition-all duration-200"
                >
                  Apply Now »
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Application Modal Popup */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl touch-none overscroll-contain"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-neutral-200/80 rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 z-10 shadow-[0_25px_70px_rgba(0,0,0,0.18)] text-neutral-900 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 flex-shrink-0">
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-neutral-950 uppercase">
                    {selectedJob.title}
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Content / Success Panel */}
              <div className="overflow-y-auto pt-6 flex-grow [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:h-0 pr-1">
                {!isSubmitSuccess ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-600 font-semibold uppercase tracking-wider block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: false }));
                        }}
                        placeholder="John Doe"
                        className={`w-full bg-neutral-50 border ${
                          formErrors.name ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-[#a855f7]"
                        } focus:bg-white rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0 transition-all duration-200`}
                      />
                    </div>

                    {/* Grid Email / Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-neutral-600 font-semibold uppercase tracking-wider block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: false }));
                          }}
                          placeholder="john@example.com"
                          className={`w-full bg-neutral-50 border ${
                            formErrors.email ? "border-red-500 focus:border-red-500" : "border-neutral-200 focus:border-[#a855f7]"
                          } focus:bg-white rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0 transition-all duration-200`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-neutral-600 font-semibold uppercase tracking-wider block">
                          Phone Number
                        </label>
                        <div className={`flex items-center bg-neutral-50 border ${
                          formErrors.phone ? "border-red-500 focus-within:border-red-500" : "border-neutral-200 focus-within:border-[#a855f7]"
                        } focus-within:bg-white rounded-xl overflow-visible transition-all duration-200 relative`}>
                          {/* Country Code Dropdown */}
                          <div ref={countryDropdownRef} className="relative flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => setShowCountryCodes(!showCountryCodes)}
                              className="flex items-center gap-1 px-3 py-2.5 text-sm text-neutral-700 hover:text-neutral-900 cursor-pointer h-full border-r border-neutral-200 whitespace-nowrap focus:outline-none"
                            >
                              <span>{countryCode}</span>
                              <ChevronDown
                                size={13}
                                className={`text-neutral-400 transition-transform duration-200 ${showCountryCodes ? "rotate-180" : ""}`}
                              />
                            </button>
                            {showCountryCodes && (
                              <div className="absolute top-full left-0 mt-1 z-[200] bg-white border border-neutral-200 rounded-xl shadow-xl py-1 max-h-48 overflow-y-auto w-44">
                                {COUNTRY_CODES.map((item) => (
                                  <button
                                    key={item.code}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(item.code);
                                      setShowCountryCodes(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                                  >
                                    {item.code} ({item.name})
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Phone number input */}
                          <input
                            type="tel"
                            minLength={5}
                            maxLength={12}
                            value={formData.phone}
                            onChange={(e) => {
                              const numericOnly = e.target.value.replace(/[^0-9]/g, "");
                              setFormData({ ...formData, phone: numericOnly });
                              if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: false }));
                            }}
                            onKeyDown={(e) => {
                              const allowed = ["Backspace","Delete","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Tab","Enter","Home","End"];
                              if (!/^[0-9]$/.test(e.key) && !allowed.includes(e.key) && !e.ctrlKey && !e.metaKey) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="50 123 4567"
                            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0 min-w-0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-600 font-semibold uppercase tracking-wider block">
                        Upload CV / Resume
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`w-full bg-neutral-50 hover:bg-neutral-100/80 border border-dashed ${
                          formErrors.cv || fileError ? "border-red-500" : "border-neutral-300"
                        } rounded-xl py-6 px-4 flex flex-col items-center justify-center text-center gap-2 transition-colors duration-200`}>
                          <Upload size={22} className="text-[#a855f7]" />
                          <span className="text-xs text-neutral-800 font-semibold">
                            {formData.cvName ? "Replace File" : "Choose file or drag here"}
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            {formData.cvName ? formData.cvName : "Supports PDF, DOC, DOCX (Max 3.5MB)"}
                          </span>
                        </div>
                      </div>
                      {fileError && (
                        <p className="text-xs text-red-500 font-medium pt-1 animate-fadeIn">
                          {fileError}
                        </p>
                      )}
                    </div>

                    {/* Cover Note */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-neutral-600 font-semibold uppercase tracking-wider block">
                        Short Cover Note / Message
                      </label>
                      <textarea
                        rows={3}
                        value={formData.coverNote}
                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                        placeholder="Briefly introduce yourself..."
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#a855f7] focus:bg-white rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Footer Row */}
                    <div className="pt-4 flex justify-end gap-3 border-t border-neutral-200/80">
                      {openedFromDetail ? (
                        <button
                          type="button"
                          onClick={() => {
                            const jobToApply = selectedJob;
                            handleCloseModal();
                            if (jobToApply) {
                              setDetailJob(jobToApply);
                            }
                          }}
                          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full hover:bg-neutral-100 border border-neutral-300 text-neutral-700 transition-all duration-200 text-xs font-semibold cursor-pointer outline-none"
                        >
                          <ChevronLeft size={14} className="stroke-[2.5]" />
                          Back
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="px-5 py-2.5 rounded-full hover:bg-neutral-100 border border-neutral-300 text-neutral-700 transition-all duration-200 text-xs font-semibold cursor-pointer outline-none"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-sans text-xs font-bold rounded-full transition-all duration-200 shadow-md cursor-pointer outline-none active:scale-95"
                      >
                        {isSubmitting ? "Uploading..." : (
                          <>
                            Submit Application
                            <Send size={12} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-sans text-lg font-bold text-neutral-950">Application Received!</h4>
                      <p className="text-neutral-600 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                        Thank you for applying, {formData.name}. Our recruitment managers will review your application for the <strong>{selectedJob.title}</strong> role and reach out shortly.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-2 bg-black text-white hover:bg-neutral-800 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer outline-none"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
