'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useConsultation } from '@/components/providers/ConsultationProvider';
import styles from './ServiceDetailsModal.module.css';

interface SubService {
  title: string;
  subHeading?: string;
  description: string;
}

interface ServiceDetail {
  id: string;
  slug: string;
  title: string; // matches cards_data
  categoryTag: string;
  mainHeader: string;
  introBodyText: string;
  tagline: string;
  subServices: SubService[];
  bgImage: string;
  keyBenefits?: string[];
}

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  hr: {
    id: 'hr',
    slug: 'human-resource-services',
    title: 'Human Resource Services',
    categoryTag: 'Human Resource Management Services',
    mainHeader: 'Empowering People. Enabling Schools. Building Futures.',
    introBodyText: 'A people-first, compliance-driven HR ecosystem supporting educational institutions across the complete employee lifecycle—from talent acquisition to exit management, while enabling a high-performing and engaged workforce',
    tagline: 'Right Talent • Right Processes • Strong Compliance • Engaged People • Better Education',
    bgImage: '/Services/human_resource_services_card_image.png',
    subServices: [
      {
        title: 'Strategic HR & Compliance',
        description: 'MOHRE • KHDA/ADEK/SPEA • Policies • Regulatory Compliance',
      },
      {
        title: 'Talent Acquisition',
        description: 'Workforce Planning • Global Recruitment • Talent Pool • Safer Recruitment',
      },
      {
        title: 'Onboarding & PRO Services',
        description: 'Visas • Emirates ID • Teacher Licensing • Government Liaison',
      },
      {
        title: 'Payroll & Benefits',
        description: 'WPS • Insurance • Allowances • Pension Schemes',
      },
      {
        title: 'Employee Lifecycle',
        description: 'Contracts • Leave • Employee Engagement • Team Building',
      },
      {
        title: 'Performance & Development',
        description: 'Appraisals • PIPs • CPD • Career Growth',
      },
      {
        title: 'Safeguarding & Training',
        description: 'Child Protection • Health & Safety • Code of Conduct',
      },
      {
        title: 'Employee Relations',
        description: 'Grievances • Disciplinary Processes • Labour Compliance',
      },
      {
        title: 'HR Digital & Analytics',
        description: 'HRIS • Attendance • Employee Data • HR Dashboards',
      },
      {
        title: 'Offboarding & Final Settlement',
        description: 'EOSG • Visa Cancellation • Exit Management • Regulatory Closure',
      },
    ],
    keyBenefits: [
      'Enhanced Workforce Productivity & Professional Employee Development',
      'Regulatory And Statutory Compliance. Structured Performance Management',
      'Improved Recruitment Efficiency. Stronger Employee Retention',
      'Optimized HR Operations & Scalable Workforce Strategies',
    ],
  },
  financial: {
    id: 'financial',
    slug: 'financial-consultancy',
    title: 'Financial Services',
    categoryTag: 'Financial Services',
    mainHeader: 'Securing the Financial Future and Operational Sustainability of Institutions',
    introBodyText: 'We provide strategic financial advice, auditing, and structural planning to help educational institutions optimize budgets, identify cost efficiencies, and build sustainable financial models.',
    tagline: 'Optimize Budgets. Secure Long-term Financial Health.',
    bgImage: '/Services/financial_consultancy_card_image.png',
    subServices: [
      {
        title: 'FP&A',
        description: 'Budgeting Planning • Forecasting • Financial Modelling',
      },
      {
        title: 'Accounting & Reporting',
        description: 'Bookkeeping • Ledgers • Financial Reporting • Financial Analysis',
      },
      {
        title: 'Cash & Treasury',
        description: 'Cash Flow Management • Liquidity • Bank Liaisoning',
      },
      {
        title: 'Risk & Compliance',
        description: 'Risk Assessment • Controls • Regulatory Compliance',
      },
      {
        title: 'Tax Management',
        description: 'VAT • Corporate Tax • Tax Planning',
      },
      {
        title: 'Corporate Finance',
        description: 'Capital Planning • Investments • M&A',
      },
      {
        title: 'Business Setup',
        description: 'Startup Costing • Capital Requirements • Feasibility Study',
      },
      {
        title: 'Market & Scenario Planning',
        description: 'Market study • Risk Modelling • Expansion Planning',
      },
      {
        title: 'Internal Audit',
        description: 'Controls Review • Process Audit • Gap Identification',
      },
      {
        title: 'Business Advisory',
        description: 'Strategy • Financial Insights • Decision Support',
      },
      {
        title: 'Banking Support',
        description: 'KYC • Corporate Account Opening • Documentation',
      },
      {
        title: 'Business Growth',
        description: 'Financial Controls • Performance Insights • Sustainable Growth',
      },
    ],
    keyBenefits: [
      'Optimized Capital Structure & Improved Cash Flow Sustainability',
      'Minimized Financial Risks Through Rigorous Audits & Compliance',
      'Enhanced Cost Efficiencies & Strategic Budgetary Control',
      'Scalable Funding Strategies for Long-Term Institutional Growth',
    ],
  },
  it: {
    id: 'it',
    slug: 'it-solutions-digital-transformation',
    title: 'IT Solutions & Digital Transformation',
    categoryTag: 'IT Solutions & Digital Transformation',
    mainHeader: 'IT Solutions That Power Your Business',
    introBodyText: 'We deliver smart, secure and scalable IT solutions that simplify operations, connect people and systems, and accelerate digital growth across key sectors in the UAE.',
    tagline: 'Empowering Education. Enabling Business. Driving Digital Transformation.',
    bgImage: '/Services/it_solutions_&_digital_transformation_card_image.png',
    subServices: [
      {
        title: 'EDUCATION — OUR FLAGSHIP',
        subHeading: 'Transforming Institutions Through Technology',
        description: 'Educational ERP • Digital Campus • Academic Systems • HR & Payroll • Cloud • Cybersecurity • Dashboards • System Integration',
      },
      {
        title: 'TRANSPORT',
        subHeading: 'Connected Operations. Smarter Mobility.',
        description: 'Fleet Management • Tracking • Automation • Digital Operations',
      },
      {
        title: 'E-COMMERCE',
        subHeading: 'Powering Digital Commerce',
        description: 'E-Commerce Platforms • Payment Integration • Inventory • Order Management • Analytics',
      },
      {
        title: 'HR SERVICES',
        subHeading: 'Technology for a Smarter Workforce',
        description: 'HRMS • Payroll • Attendance • Employee Self-Service • Workflow Automation',
      },
      {
        title: 'APPARELS',
        subHeading: 'Digitising Apparel Operations',
        description: 'Order Management • Production • Inventory • Procurement • Sales & Reporting',
      },
    ],
    keyBenefits: [
      'Seamless Learning Experience via Integrated ERP & LMS Platforms',
      'Robust Cybersecurity & Enterprise-Grade Cloud Protection',
      'Streamlined Digital Operations & Automations Across All Teams',
      'Empowered Staff & Faculty Equipped with Modern IT Competencies',
    ],
  },
  educational: {
    id: 'educational',
    slug: 'educational-institutional-consulting',
    title: 'Academics',
    categoryTag: 'Academics',
    mainHeader: 'Administration, Operations, Audit & Risk Management',
    introBodyText: 'We help organizations establish efficient administrative systems, stronger internal controls, risk-aware operations, and sustainable business processes—from start-up setup to continuous improvement.',
    tagline: 'Build Strong • Control Better • Operate Smarter',
    bgImage: '/Services/educational_&_institutional_consulting_card_image.png',
    subServices: [
      {
        title: 'Administration & Operations',
        description: 'Structures • SOPs • Workflows • Documentation',
      },
      {
        title: 'Audit & Controls',
        description: 'Process Audits • Gap Analysis • Corrective Actions',
      },
      {
        title: 'Risk Management',
        description: 'Risk Assessment • Mitigation • Internal Controls',
      },
      {
        title: 'Facilities & Assets',
        description: 'Facility Setup • PPM • Asset Tracking • Safety',
      },
      {
        title: 'Procurement & Vendors',
        description: 'Supplier Management • Cost Comparison • Performance',
      },
      {
        title: 'Compliance & Governance',
        description: 'Licenses • Regulatory Tracking • Audit Readiness',
      },
      {
        title: 'Process Improvement',
        description: 'Process Mapping • Optimization • Standardization',
      },
      {
        title: 'Monitoring & Reporting',
        description: 'KPIs • Management Reports • Performance Tracking',
      },
    ],
    keyBenefits: [
      'Successful National & International Accreditation Alignment',
      'Modern, Outcome-Based Curricula Calibrated to Global Standards',
      'Accelerated Regulatory Approvals & Seamless New Setup Launches',
      'Rigorous Academic Quality Control & Continuous Audit Cycles',
    ],
  },
  behavioural: {
    id: 'behavioural',
    slug: 'behavioural-counselling-student-support',
    title: 'Academics',
    categoryTag: 'Academics',
    mainHeader: 'Fostering Student Well-being and Constructive Learning Environments',
    introBodyText: "Support your students' mental health, career readiness, and behavioural development with integrated support systems, individual counselling, and workshops.",
    tagline: 'Nurture Young Minds. Foster Academic & Personal Growth.',
    bgImage: '/Services/behavioural_counselling_&_student_support_card_image.png',
    subServices: [
      {
        title: 'Student Counselling Services',
        description: 'Provide professional guidance, psychological support, and stress management counselling for students.',
      },
      {
        title: 'Career Guidance & Development',
        description: 'Help students discover academic pathways, prepare for higher education, and identify future career opportunities.',
      },
      {
        title: 'Teacher Training in Student Psychology',
        description: 'Equip educators with the skills to identify learning difficulties, behavioural challenges, and support needs.',
      },
      {
        title: 'Parent-Teacher Engagement Workshops',
        description: 'Strengthen the home-school connection with collaborative workshops on child development and well-being.',
      },
    ],
    keyBenefits: [
      'Enhanced Student Well-being & Mental Health Support Systems',
      'Clear Career Pathways & Academic Readiness Profiles',
      'Empowered Educators Capable of Identifying Student Needs',
      'Strengthened Parent-School Partnerships for Holistic Growth',
    ],
  },
  printing: {
    id: 'printing',
    slug: 'printing-branding-solutions',
    title: 'Marketing',
    categoryTag: 'Marketing',
    mainHeader: 'Shaping a Powerful and Unified Brand Identity for Your Institution',
    introBodyText: "Deliver high-quality printed materials and professional branding strategies that elevate your institution's prestige, community presence, and admissions marketing.",
    tagline: 'Design with Impact. Print with Perfection.',
    bgImage: '/Services/printing_&_branding_solutions_card_image.png',
    subServices: [
      {
        title: 'Prospectus & Admissions Kit Design',
        description: 'Create premium printed and digital brochures, applications, and enrollment materials that convert prospects.',
      },
      {
        title: 'Campus Branding & Signage',
        description: 'Design and install professional external and internal campus signage, banners, and decorative brand elements.',
      },
      {
        title: 'Uniforms & Merchandising',
        description: 'Source and design high-quality, customized school uniforms, sports kits, and institutional merchandise.',
      },
      {
        title: 'Digital & Print Marketing Assets',
        description: 'Develop coordinated marketing collateral, school newsletters, and annual reports to build institutional pride.',
      },
    ],
    keyBenefits: [
      'High-Conversion Admissions Materials & Distinct Brand Identity',
      'Professional Campus Signage & Engaging Visual Environments',
      'Customized Uniforms & Merchandising Built on Brand Pride',
      'Coordinated Marketing Collateral & Dynamic Print Ecosystems',
    ],
  },
  transportation: {
    id: 'transportation',
    slug: 'transportation-fleet-support',
    title: 'Transport Service',
    categoryTag: 'Transport Service',
    mainHeader: 'Reliable Mobility. Safe Journeys. Seamless Operations.',
    introBodyText: 'Providing safe, reliable, and compliant passenger transportation solutions across the UAE, supported by a modern fleet, professional drivers, and disciplined operations.',
    tagline: 'Keeping Your Institution Moving Safely.',
    bgImage: '/Service-page/Transportation-&-Fleet-Support.png',
    subServices: [
      {
        title: 'School Transport',
        description: 'Safe & RTA-compliant student transportation',
      },
      {
        title: 'Corporate Mobility',
        description: 'Employee shuttles & daily staff transport',
      },
      {
        title: 'Fleet Solutions',
        description: '13–64 seater buses for flexible requirements',
      },
      {
        title: 'Route Management',
        description: 'GPS tracking, route planning & optimization',
      },
      {
        title: 'Safety & Compliance',
        description: 'Trained drivers & UAE/RTA-compliant operations',
      },
      {
        title: 'Professional Workforce',
        description: 'Experienced, multilingual & customer-focused drivers',
      },
      {
        title: '24/7 Operations',
        description: 'Reliable coordination and service support',
      },
      {
        title: 'Scalable Mobility',
        description: 'Flexible solutions that grow with client requirements',
      },
    ],
    keyBenefits: [
      'Enhanced Student Safety & Parent Peace of Mind',
      'RTA & UAE Statutory Compliance Guaranteed',
      'Optimized Transport Routes & Lower Operational Costs',
      '24/7 Fleet Coordination & Professional Drivers',
    ],
  },
  transportation_admin: {
    id: 'transportation_admin',
    slug: 'transportation-fleet-support',
    title: 'Transportation and Administration',
    categoryTag: 'Transportation & Administration',
    mainHeader: 'Comprehensive Fleet Mobility & Administrative Operations',
    introBodyText: 'Integrated transportation management and administrative support services designed to streamline institutional logistics, vehicle maintenance, route optimization, and operational governance across educational and corporate institutions.',
    tagline: 'Streamlined Mobility & Institutional Administration.',
    bgImage: '/Service-page/Transportation-&-Fleet-Support.png',
    subServices: [
      {
        title: 'Fleet Logistics & Administration',
        description: 'End-to-end fleet administration, licensing, regulatory compliance, vehicle maintenance schedules, and driver management.',
      },
      {
        title: 'Institutional Operations & Facilities Management',
        description: 'Comprehensive administrative oversight for school facilities, transport safety protocols, and daily campus logistics.',
      },
      {
        title: 'Smart Fleet Tracking & Compliance',
        description: 'Automated fleet tracking, safety audit compliance, fuel management, and real-time administrative reporting.',
      },
      {
        title: 'Vendor & Resource Coordination',
        description: 'Centralized administrative procurement, vendor contract management, and operational resource planning.',
      },
    ],
    keyBenefits: [
      'Complete Institutional Transport & Administrative Integration',
      'Full UAE & RTA Regulatory Compliance',
      'Optimized Operational Costs & Fleet Maintenance',
      'Seamless Facility Oversight & Real-Time Tracking',
    ],
  },
  uniforms: {
    id: 'uniforms',
    slug: 'uniform-solutions',
    title: 'Uniforms services',
    categoryTag: 'Uniform Solutions',
    mainHeader: 'Identity, Quality, and Comfort in Every Stitch',
    introBodyText: 'We design, source, and deliver high-quality uniforms and institutional clothing that reflect your identity and uphold your standards. From everyday school uniforms to sports kits and staff attire, our solutions balance comfort, durability, and affordability — making it easy for families and giving your institution a polished, unified appearance that builds belonging and pride.',
    tagline: 'Identity, Quality, And Comfort In Every Stitch',
    bgImage: '/Service-page/Uniform-&-Clothing-Solutions.png',
    subServices: [
      {
        title: 'Uniform Design',
        description: 'Custom designs that express your institutional identity.',
      },
      {
        title: 'School Uniforms',
        description: 'Durable, comfortable everyday wear for students.',
      },
      {
        title: 'Sports & Activity Kits',
        description: 'High-performance kits for athletics, teams, and events.',
      },
      {
        title: 'Staff Attire',
        description: 'Professional clothing designed for educators and administration staff.',
      },
      {
        title: 'Sourcing & Manufacturing',
        description: 'Reliable, ethical, and quality-controlled garment production.',
      },
      {
        title: 'Distribution & Inventory',
        description: 'Efficient supply management for families and on-campus stores.',
      },
    ],
    keyBenefits: [
      'Custom Designs Expressing Institutional Identity',
      'Durable, Comfortable Everyday School Uniforms',
      'Ethical Sourcing & Quality-Controlled Garment Production',
      'Streamlined Supply & On-Campus Distribution',
    ],
  },
  project_management: {
    id: 'project_management',
    slug: 'project-management-development',
    title: 'Project Management & Development',
    categoryTag: 'Project Management & Development',
    mainHeader: 'Plan • Manage • Deliver • Succeed',
    introBodyText: 'We provide end-to-end project management and consulting for the development of schools, residential projects, offices, and other facilities—ensuring projects are efficient, functional, compliant, and aligned with business objectives.',
    tagline: 'From Concept to Completion — Delivered with Control, Quality & Purpose.',
    bgImage: '/Service-page/Civil-Engineering-&-Infrastructure-Development.png',
    subServices: [
      {
        title: 'Project Planning',
        description: 'Scope • Budget • Timeline • Resources',
      },
      {
        title: 'Project Development',
        description: 'Design • Construction • Infrastructure',
      },
      {
        title: 'Consultancy & Coordination',
        description: 'Client • Consultants • Contractors • Vendors',
      },
      {
        title: 'Cost & Schedule Control',
        description: 'Budget Monitoring • Timelines • Progress Tracking',
      },
      {
        title: 'Facility & Infrastructure',
        description: 'Amenities • Utilities • Operational Readiness',
      },
      {
        title: 'Quality & Compliance',
        description: 'Standards • Approvals • Quality Assurance',
      },
      {
        title: 'Operational Readiness',
        description: 'Functional Planning • Systems • Handover',
      },
      {
        title: 'Business Alignment',
        description: 'Requirements • Objectives • Value Delivery',
      },
    ],
    keyBenefits: [
      'Structured Scope & Realistic Milestone Planning',
      'Seamless Multi-Stakeholder Coordination & Oversight',
      'Disciplined Cost & Schedule Control',
      'Turnkey Operational Readiness & Smooth Handover',
    ],
  },
};

interface ServiceDetailsModalProps {
  serviceId: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function getCapabilityIconUrl(index: number) {
  const frames = [
    '/Service%20details/Frame1.png',
    '/Service%20details/Frame2.png',
    '/Service%20details/Frame3.png',
    '/Service%20details/Frame4.png',
    '/Service%20details/Frame5.png',
    '/Service%20details/Frame6.png',
    '/Service%20details/Frame.png',
  ];
  return frames[index % frames.length];
}

const getColSpanClass = (index: number, totalCount: number) => {
  if (totalCount === 12) {
    if (index === 0 || index === 1) return 'col-span-12 md:col-span-6';
    if (index >= 2 && index <= 7) return 'col-span-12 md:col-span-4';
    return 'col-span-12 md:col-span-6';
  }
  if (totalCount === 10) {
    if (index === 0 || index === 1) return 'col-span-12 md:col-span-6';
    if (index >= 2 && index <= 7) return 'col-span-12 md:col-span-4';
    return 'col-span-12 md:col-span-6';
  }
  if (totalCount === 8) {
    if (index === 0 || index === 1) return 'col-span-12 md:col-span-6';
    return 'col-span-12 md:col-span-4';
  }
  if (totalCount === 7) {
    if (index === 0 || index === 1) return 'col-span-12 md:col-span-6';
    if (index >= 2 && index <= 4) return 'col-span-12 md:col-span-4';
    return 'col-span-12 md:col-span-6';
  }
  if (totalCount === 5) {
    if (index === 0 || index === 1) return 'col-span-12 md:col-span-6';
    return 'col-span-12 md:col-span-4';
  }
  if (totalCount % 3 === 0) {
    return 'col-span-12 md:col-span-4';
  }
  if (totalCount % 2 === 0) {
    return 'col-span-12 md:col-span-6';
  }
  return 'col-span-12 md:col-span-4';
};

export const ServiceDetailsModal = ({
  serviceId,
  onClose,
  onPrev,
  onNext,
}: ServiceDetailsModalProps) => {
  const { openConsultation } = useConsultation();
  const contentRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);

  const scrollToCapabilities = () => {
    if (capabilitiesRef.current) {
      capabilitiesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset scroll when service changes
  useEffect(() => {
    if (serviceId && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [serviceId]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (serviceId) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [serviceId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!serviceId) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [serviceId, onClose, onPrev, onNext]);

  if (!serviceId || !SERVICE_DETAILS[serviceId]) return null;

  const detail = SERVICE_DETAILS[serviceId];

  return (
    <AnimatePresence>
      <div className={styles.modalOverlay}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.backdrop}
          onClick={onClose}
        />

        {/* Navigation - Left Arrow */}
        <button
          onClick={onPrev}
          className={`${styles.navButton} ${styles.navLeft}`}
          aria-label="Previous service"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Navigation - Right Arrow */}
        <button
          onClick={onNext}
          className={`${styles.navButton} ${styles.navRight}`}
          aria-label="Next service"
        >
          <ChevronRight size={24} />
        </button>

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.05 }}
          className={styles.modalContainer}
        >
          {/* Dynamic Background Image & Overlay */}
          <div 
            className={styles.modalBgImage} 
            style={{ backgroundImage: `url(${detail.bgImage})` }} 
          />
          <div className={styles.modalBgOverlay} />

          {/* Orbital Decorative Background */}
          <div className={styles.orbitalWrapper}>
            <svg className={styles.orbitalBackground} viewBox="0 0 1000 1000" fill="none">
              <circle cx="500" cy="500" r="400" stroke="url(#orbit-grad-1)" strokeWidth="0.75" />
              <circle cx="500" cy="500" r="280" stroke="url(#orbit-grad-2)" strokeWidth="1.2" strokeDasharray="4 12" />
              <circle cx="500" cy="500" r="180" stroke="url(#orbit-grad-1)" strokeWidth="0.5" />
              <path d="M100 500 C 300 200, 700 800, 900 500" stroke="url(#orbit-grad-3)" strokeWidth="0.75" strokeDasharray="8 8" />
              <defs>
                <linearGradient id="orbit-grad-1" x1="0" y1="0" x2="1000" y2="1000">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="#6366f1" stopOpacity="0.04" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id="orbit-grad-2" x1="1000" y1="0" x2="0" y2="1000">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="orbit-grad-3" x1="0" y1="500" x2="1000" y2="500">
                  <stop offset="0%" stopColor="#d946ef" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Scrollable Content Area */}
          <div
            ref={contentRef}
            className={styles.modalContent}
          >
            {/* Top Intro Section */}
            <div className={styles.introSection}>
              <span className={styles.introCategoryTag}>
                {detail.categoryTag}
              </span>
              <h2 className={styles.introMainTitle}>
                {detail.mainHeader}
              </h2>
              <p className={styles.introText}>
                {detail.introBodyText}
              </p>
              {detail.tagline && (
                <h3 className={styles.introTagline}>
                  {detail.tagline}
                </h3>
              )}
              <div className={styles.introCtaWrapper}>
                <button
                  onClick={() => {
                    onClose();
                    openConsultation();
                  }}
                  className={styles.ctaButton}
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight size={16} className={styles.ctaArrow} />
                </button>
                <Link
                  href={`/services/${detail.slug}`}
                  className={styles.secondaryCtaButton}
                  onClick={onClose}
                >
                  <span>Explore Our Solutions</span>
                </Link>
              </div>
            </div>

            {/* Service Capabilities (Card Type Design from DetailCapabilities) */}
            <div ref={capabilitiesRef} className={styles.capabilitiesSection}>
              <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
                <h3 className="font-sans text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight tracking-tight uppercase">
                  OUR SERVICES
                </h3>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-12 gap-6 w-full max-w-6xl mx-auto">
                {detail.subServices.map((item, index) => {
                  const iconUrl = getCapabilityIconUrl(index);
                  const colSpan = getColSpanClass(index, detail.subServices.length);

                  return (
                    <div key={item.title} className={`${colSpan} w-full flex`}>
                      <div className="group relative bg-[#111115] rounded-[16px] border border-white/10 hover:border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(159,125,255,0.15)] transform hover:-translate-y-1 transition-all duration-300 p-6 md:p-8 flex flex-col w-full h-full overflow-hidden text-left">
                        {/* Custom Corner Glow Border */}
                        <div className="absolute top-[-1px] left-[-1px] right-[-1px] h-[20px] border-t-[4px] border-l-[4px] border-r-[4px] border-[#9F7DFF] rounded-t-[16px] pointer-events-none bg-transparent" />

                        {/* Icon container */}
                        <div className="mb-5 flex items-start">
                          <Image
                            src={iconUrl}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="h-12 w-auto object-contain filter brightness-110 transform transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110"
                          />
                        </div>

                        {/* Title */}
                        <h4 className="text-white text-lg md:text-xl font-bold mb-2 font-sans tracking-tight">
                          {item.title}
                        </h4>

                        {/* Subheading if present */}
                        {item.subHeading && (
                          <p className="text-[#9F7DFF] text-xs font-semibold uppercase tracking-wider mb-3">
                            {item.subHeading}
                          </p>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-white/70 text-sm leading-relaxed font-sans font-normal mt-auto">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Benefits Section */}
            {detail.keyBenefits && detail.keyBenefits.length > 0 && (
              <div className={styles.keyBenefitsSection}>
                <h4 className={styles.keyBenefitsLabel}>KEY BENEFITS</h4>
                <div className={styles.benefitsGrid}>
                  {detail.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className={styles.benefitCard}>
                      <div className={styles.cardGlowLine} />
                      <div className={styles.cloverIcon}>
                        <img
                          src="/Services/Frame.png"
                          alt="Benefit Icon"
                          className={styles.cardIconImg}
                        />
                      </div>
                      <p className={styles.benefitText}>{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

