'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ChevronDown, ArrowRight, ArrowDown } from 'lucide-react';
import { useConsultation } from '@/components/providers/ConsultationProvider';
import styles from './ServiceDetailsModal.module.css';

interface SubService {
  title: string;
  subHeading?: string;
  description: string;
}

interface ServiceDetail {
  id: string;
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
    title: 'Human Resource Services',
    categoryTag: 'Human Resource Management Services',
    mainHeader: 'Building Strong Educational Institutions Through Strategic People Management',
    introBodyText: 'Services designed to help educational institutions build, manage, and retain high-performing academic and administrative teams. Our solutions support workforce planning, regulatory compliance, employee development, and organizational growth, ensuring institutions operate efficiently while maintaining a positive and productive work environment.',
    tagline: 'Build Stronger Teams. Strengthen Institutional Performance.',
    bgImage: '/Services/human_resource_services_card_image.png',
    subServices: [
      {
        title: 'HR Policy Development & Compliance',
        description: 'Develop and implement HR policies, employee handbooks, compliance frameworks, and governance procedures aligned with labour regulations and institutional standards.',
      },
      {
        title: 'Payroll Management & Statutory Compliance',
        description: 'Streamline payroll processing, attendance management, employee benefits administration, and statutory compliances like PF, ESI, and tax declarations.',
      },
      {
        title: 'HR Audits & Organizational Development',
        description: 'Assess existing HR practices, identify operational gaps, improve organizational structures, and align human capital with strategic goals.',
      },
      {
        title: 'Performance Management Systems',
        description: 'Design performance appraisal frameworks, KPI structures, faculty evaluation systems, and feedback loops to drive growth and excellence.',
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
    title: 'Financial Services',
    categoryTag: 'Financial Services',
    mainHeader: 'Securing the Financial Future and Operational Sustainability of Institutions',
    introBodyText: 'We provide strategic financial advice, auditing, and structural planning to help educational institutions optimize budgets, identify cost efficiencies, and build sustainable financial models.',
    tagline: 'Optimize Budgets. Secure Long-term Financial Health.',
    bgImage: '/Services/financial_consultancy_card_image.png',
    subServices: [
      {
        title: 'Financial Audits & Risk Assessment',
        description: 'Perform comprehensive audits of institutional expenditures, identify financial risks, and establish internal control systems.',
      },
      {
        title: 'Budgeting & Cost Optimization',
        description: 'Design custom budgeting processes, manage cash flows, and find strategic opportunities to reduce operational costs.',
      },
      {
        title: 'Capital Planning & Funding Strategy',
        description: 'Assist in planning capital expenditures, securing funding for expansion, and managing investment portfolios.',
      },
      {
        title: 'Statutory & Tax Compliance',
        description: 'Ensure complete adherence to institutional tax laws, filing requirements, and regulatory reporting standards.',
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
    title: 'IT Solutions & Digital Transformation',
    categoryTag: 'IT Solutions & Digital Transformation',
    mainHeader: 'IT Solutions That Power Your Business',
    introBodyText: 'We deliver smart, secure and scalable IT solutions that simplify operations, connect people and systems, and accelerate digital growth across key sectors in the UAE.',
    tagline: 'Empowering Education. Enabling Business. Driving Digital Transformation.',
    bgImage: '/Services/it_solutions_&_digital_transformation_card_image.png',
    subServices: [
      {
        title: 'Education — Our Flagship',
        subHeading: 'Transforming Institutions Through Technology',
        description: 'Educational ERP • Digital Campus • Academic Systems • HR & Payroll • Cloud • Cybersecurity • Dashboards • System Integration',
      },
      {
        title: 'Transport',
        subHeading: 'Connected Operations. Smarter Mobility.',
        description: 'Fleet Management • Tracking • Automation • Digital Operations',
      },
      {
        title: 'E-Commerce',
        subHeading: 'Powering Digital Commerce',
        description: 'E-Commerce Platforms • Payment Integration • Inventory • Order Management • Analytics',
      },
      {
        title: 'HR Services',
        subHeading: 'Technology for a Smarter Workforce',
        description: 'HRMS • Payroll • Attendance • Employee Self-Service • Workflow Automation',
      },
      {
        title: 'Apparels',
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
    title: 'Academics',
    categoryTag: 'Academics',
    mainHeader: 'Driving Academic Excellence and Institutional Growth',
    introBodyText: 'From accreditation preparation to curriculum development, our expert consultants guide institutions through the complexities of academic quality assurance and strategic scaling.',
    tagline: 'Elevate Standards. Expand Your Educational Impact.',
    bgImage: '/Services/educational_&_institutional_consulting_card_image.png',
    subServices: [
      {
        title: 'Accreditation & Quality Assurance',
        description: 'Prepare for national and international accreditations (like NAAC, NBA, and international equivalencies) with meticulous mock audits.',
      },
      {
        title: 'Curriculum Design & Development',
        description: 'Create modern, outcome-based curricula aligned with global benchmarks and national education frameworks.',
      },
      {
        title: 'Institution Setup & Planning',
        description: 'Feasibility studies, regulatory approvals, infrastructure planning, and initial launch strategy for new schools and colleges.',
      },
      {
        title: 'Academic Audits',
        description: 'Evaluate teaching-learning methodologies, assessment patterns, and student feedback systems to continuously upgrade academic standards.',
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
    title: 'Transport Service',
    categoryTag: 'Transport Service',
    mainHeader: 'Reliable Mobility. Safe Journeys. Seamless Operations.',
    introBodyText: 'Providing safe, reliable, and compliant passenger transportation solutions across the UAE, supported by a modern fleet, professional drivers, and disciplined operations.',
    tagline: 'Keeping Your Institution Moving Safely.',
    bgImage: '/Service-page/Transportation-&-Fleet-Support.png',
    subServices: [
      {
        title: 'School Transport',
        description: 'Safe & RTA-compliant student transportation with trained drivers and continuous route monitoring.',
      },
      {
        title: 'Corporate Mobility & Fleet Solutions',
        description: 'Employee shuttles and flexible fleet options (13–64 seater buses) tailored for institutional operations.',
      },
      {
        title: 'Route Management & GPS Tracking',
        description: 'Real-time GPS tracking, automated route planning, and optimization for maximum efficiency.',
      },
      {
        title: 'Safety & Compliance Standards',
        description: 'Fully compliant UAE/RTA transport operations, 24/7 service support, and safety-certified drivers.',
      },
    ],
    keyBenefits: [
      'Enhanced Student Safety & Parent Peace of Mind',
      'RTA & UAE Statutory Compliance Guaranteed',
      'Optimized Transport Routes & Lower Operational Costs',
      '24/7 Fleet Coordination & Professional Drivers',
    ],
  },
};

interface ServiceDetailsModalProps {
  serviceId: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

// Framer Motion variants for premium staggered content animations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const slideUpItem = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as any, // easeOutCubic
    },
  },
};

const contentVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 30 : -30,
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1] as any, // easeOutQuart
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -30 : 30,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1] as any,
    },
  }),
};

export const ServiceDetailsModal = ({
  serviceId,
  onClose,
  onPrev,
  onNext,
}: ServiceDetailsModalProps) => {
  const { openConsultation } = useConsultation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0); // 0 = Intro, 1..N = subServices
  const [direction, setDirection] = useState(1); // 1 = scrolling down, -1 = scrolling up

  // Reset scroll and state when service changes
  useEffect(() => {
    if (serviceId) {
      setActiveSection(0);
      setDirection(1);
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
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

  // Scroll handler to track virtual scroll stages
  const handleScroll = () => {
    const container = contentRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight || 810;
    const scrollHeight = container.scrollHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

    // Calculate active stage (0 = Intro, 1..N = Sub-services, N+1 = Key Benefits)
    const pageIndex = Math.round(scrollTop / clientHeight);
    const activeIndex = isAtBottom
      ? detail.subServices.length + 1
      : Math.min(Math.max(pageIndex, 0), detail.subServices.length + 1);

    if (activeIndex !== activeSection) {
      setDirection(activeIndex > activeSection ? 1 : -1);
      setActiveSection(activeIndex);
    }
  };

  const scrollToSection = (index: number) => {
    const container = contentRef.current;
    if (!container) return;

    const clientHeight = container.clientHeight || 810;
    container.scrollTo({
      top: index * clientHeight,
      behavior: 'smooth',
    });
  };

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
            onScroll={handleScroll}
          >
            {/* Sticky Viewport (captures gestures/wheel events, stays pinned) */}
            <div className={styles.stickyViewport}>
              
              {/* Pinned Top Area */}
              <div className={styles.pinnedTop}>
                <span className={styles.introCategoryTag}>
                  {detail.categoryTag}
                </span>
                <h2 className={styles.introMainTitle}>
                  {detail.mainHeader}
                </h2>
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
                </div>
              </div>

              {/* Dynamic Scroll-stage-based content */}
              <div className={`${styles.dynamicArea} ${activeSection > 0 ? styles.subServicesMode : ''}`}>
                <AnimatePresence>
                  {activeSection > 0 && activeSection <= detail.subServices.length && (
                    <motion.div
                      key="subServicesHeader"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={styles.subServicesHeader}
                    >
                      <span className={styles.subServicesLabel}>
                        OUR {detail.id.toUpperCase()} SERVICES
                      </span>
                      
                      {/* Custom Interactive Segment Bar */}
                      <div className={styles.progressBar}>
                        {detail.subServices.map((_, idx) => {
                          const sectionIndex = idx + 1;
                          const isActive = activeSection === sectionIndex;
                          return (
                            <div
                              key={idx}
                              onClick={() => scrollToSection(sectionIndex)}
                              className={`${styles.progressSegment} ${
                                isActive ? styles.activeSegment : ''
                              }`}
                              title={_.title}
                            />
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait" custom={direction}>
                  {activeSection === 0 ? (
                    <motion.div
                      key="intro"
                      custom={direction}
                      variants={contentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={styles.introContentContainer}
                    >
                      <p className={styles.introText}>
                        {detail.introBodyText}
                      </p>
                      {detail.tagline && (
                        <h3 className={styles.introTagline}>
                          {detail.tagline}
                        </h3>
                      )}
                    </motion.div>
                  ) : activeSection <= detail.subServices.length ? (
                    <motion.div
                      key={activeSection}
                      custom={direction}
                      variants={contentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={styles.subServicesContentContainer}
                    >
                      <h4 className={styles.subServiceTitle}>
                        {detail.subServices[activeSection - 1].title}
                      </h4>
                      {detail.subServices[activeSection - 1].subHeading && (
                        <h5 className={styles.subServiceSubHeading}>
                          {detail.subServices[activeSection - 1].subHeading}
                        </h5>
                      )}
                      <p className={styles.subServiceDesc}>
                        {detail.subServices[activeSection - 1].description}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Scroll Down Indicator */}
              {activeSection < detail.subServices.length + 1 && (
                <div className={styles.stickyScrollIndicator}>
                  <div
                    className={styles.scrollDownIndicator}
                    onClick={() => scrollToSection(activeSection + 1)}
                  >
                    <div className={styles.mouseIcon}>
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: 'easeInOut',
                        }}
                        className={styles.mouseWheel}
                      />
                    </div>
                    <ChevronDown
                      size={14}
                      className={styles.scrollDownChevron}
                    />
                    <span className={styles.scrollDownText}>
                      Scroll Down
                    </span>
                  </div>
                </div>
              )}

            </div>

            {/* Spacer to push keyBenefitsSection down to the final stage */}
            <div
              style={{
                height: `${detail.subServices.length * 100}%`,
              }}
            />

            {/* Key Benefits Section - renders in normal scroll flow below sticky area */}
            <div className={styles.keyBenefitsSection}>
              <h4 className={styles.keyBenefitsLabel}>KEY BENEFITS</h4>
              <div className={styles.benefitsGrid}>
                {detail.keyBenefits?.map((benefit, idx) => (
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

