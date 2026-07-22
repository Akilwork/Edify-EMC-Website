/**
 * Service Detail content — single source of truth.
 *
 * Each service has a full 8-section detail page rendered at /services/[slug].
 * - 6 slugs are reused verbatim to match Navbar.tsx MEGA_SERVICES + all-services.ts.
 * - 5 slugs are added for the remaining services.
 *
 * All CTAs route to the site-wide consultation modal (openConsultation).
 */

export type CtaAction = "consultation";

export interface Cta {
  label: string; // "Schedule a Consultation"
  action: CtaAction;
}

/** A capability / "why it matters" bullet — bold lead-in + optional elaboration. */
export interface Bullet {
  title: string;
  description?: string;
}

/** "Our Approach" step — count varies per service. */
export interface ApproachStep {
  number: string; // "01"
  title: string; // "Assess"
  description: string;
}

export interface ServiceDetail {
  // identity / metadata
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string; // hero background
  cardImage: string; // used by Related Services + og:image

  // 1. Hero
  hero: {
    tagline: string; // hero subtitle
    supportingCopy: string;
    ctas: Cta[];
  };

  // 2. Overview
  overview: {
    heading: string;
    body: string; // 50–80 words
  };

  // 3. Service Capabilities
  capabilities: {
    heading: string;
    items: Bullet[];
  };

  // 4. Why It Matters
  whyItMatters: {
    heading: string;
    items: Bullet[];
  };

  // 5. Our Approach
  approach: {
    heading: string;
    steps: ApproachStep[];
  };

  // 6. Why Choose Edify
  whyChoose: {
    heading: string;
    items: string[];
  };

  // 7. Related Services
  related: {
    heading: string;
    slugs: string[]; // resolved at render via SERVICE_INDEX
  };

  // 8. Consultation CTA
  cta: {
    heading: string;
    description: string;
    ctas: Cta[];
  };
}

/** Reusable CTA presets — every CTA on every page opens the consultation modal. */
const CONSULTATION_CTA: Cta = { label: "Schedule a Consultation", action: "consultation" };
const BROCHURE_CTA: Cta = { label: "Download Service Brochure", action: "consultation" };
const CONTACT_CTA: Cta = { label: "Contact Our Experts", action: "consultation" };

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  /* ───────────────────────────── 1. Human Resource Services ───────────────────────────── */
  "human-resource-services": {
    slug: "human-resource-services",
    title: "Human Resource Management",
    metaTitle: "Human Resource Management",
    metaDescription:
      "Strategic HR solutions that help educational institutions attract, develop, and retain exceptional talent — from recruitment and payroll to performance and compliance.",
    heroImage: "/Service-page/Human-Resource-Services.png",
    cardImage: "/Service-page/Human-Resource-Services.png",
    hero: {
      tagline: "Building High-Performing Teams For Educational Excellence",
      supportingCopy:
        "Strategic HR solutions that help educational institutions attract, develop, and retain exceptional talent.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Building Strong Institutions Through People",
      body: "Strong institutions begin with great people. Our Human Resource Management services help organizations attract, develop, and retain talent while improving workforce performance, compliance, and long-term organizational growth.",
    },
    capabilities: {
      heading: "Comprehensive HR Solutions",
      items: [
        { title: "Talent Acquisition & Recruitment", description: "Strategic Talent Acquisition And Recruitment Solutions That Connect Organizations With The Right People For Lasting Success." },
        { title: "HR Policy Development", description: "Customized HR Policies That Promote Compliance, Consistency, And A Strong Organizational Culture." },
        { title: "Payroll & Compliance", description: "Accurate Payroll Management And Regulatory Compliance Solutions That Ensure Efficiency, Accuracy, And Peace Of Mind." },
        { title: "HR Audits & Advisory", description: "Expert HR Audits And Strategic Advisory Services To Strengthen Compliance, Governance, And Workforce Performance." },
        { title: "HR Outsourcing", description: "Flexible HR Outsourcing Solutions That Simplify Operations, Reduce Costs, And Enhance Workforce Efficiency." },
        { title: "Performance Management", description: "Performance Management Solutions That Drive Employee Growth, Accountability, And Organizational Excellence." },
        { title: "Employee Training & Development", description: "Employee Training And Development Programs That Enhance Skills, Boost Performance, And Foster Continuous Professional Growth." },
      ],
    },
    whyItMatters: {
      heading: "Supporting Institutional Success",
      items: [
        { title: "Attract Qualified Talent", description: "Reach and recruit the educators your institution deserves." },
        { title: "Improve Workforce Performance", description: "Structured systems that turn effort into measurable outcomes." },
        { title: "Ensure Regulatory Compliance", description: "Stay ahead of labour law and statutory obligations." },
        { title: "Strengthen Employee Engagement", description: "Build a motivated, loyal, and accountable workforce." },
        { title: "Streamline HR Operations", description: "Remove administrative friction with clean, repeatable processes." },
        { title: "Build Long-Term Organizational Capacity", description: "Develop leaders and retain expertise for the future." },
      ],
    },
    approach: {
      heading: "A Structured HR Framework",
      steps: [
        { number: "01", title: "Assess", description: "Audit current HR practices, structures, and compliance to establish a clear baseline." },
        { number: "02", title: "Plan", description: "Design a workforce and HR strategy aligned to your institutional goals." },
        { number: "03", title: "Implement", description: "Roll out policies, systems, and tools with hands-on change support." },
        { number: "04", title: "Optimize", description: "Review outcomes, refine processes, and build continuous improvement." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Educational Sector Focus",
        "Experienced HR Professionals",
        "Tailored Workforce Strategies",
        "End-to-End HR Support",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["transportation-fleet-support", "uniform-solutions", "civil-engineering-infrastructure"],
    },
    cta: {
      heading: "Let's Build A Stronger Workforce Together",
      description: "Discover tailored HR solutions designed to strengthen your institution.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ───────────────────── 2. Educational & Institutional Consulting ───────────────────── */
  "educational-institutional-consulting": {
    slug: "educational-institutional-consulting",
    title: "Educational & Institutional Consulting",
    metaTitle: "Educational & Institutional Consulting",
    metaDescription:
      "Strategic guidance for institutional planning, governance, accreditation, and academic excellence — helping schools and colleges thrive and scale sustainably.",
    heroImage: "/Service-page/Educationalal.png",
    cardImage: "/Service-page/Educationalal.png",
    hero: {
      tagline: "Driving Academic Excellence And Institutional Growth",
      supportingCopy:
        "From accreditation to curriculum design, expert consultants guide institutions through the complexities of academic quality and strategic scaling.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Guiding Institutions Toward Lasting Excellence",
      body: "We partner with schools, colleges, and education providers to strengthen governance, raise academic standards, and plan sustainable growth. Whether preparing for accreditation, designing outcome-based curricula, or planning a new campus, our consultants translate ambition into structured, measurable progress across every layer of your institution.",
    },
    capabilities: {
      heading: "Strategic Consulting Capabilities",
      items: [
        { title: "Accreditation & Quality Assurance", description: "Mock audits and readiness for NAAC, NBA, and international bodies." },
        { title: "Curriculum Design & Development", description: "Modern, outcome-based curricula aligned to global benchmarks." },
        { title: "Institution Setup & Planning", description: "Feasibility, approvals, infrastructure, and launch strategy." },
        { title: "Academic Audits", description: "Evaluate teaching, assessment, and feedback systems." },
        { title: "Governance & Policy Advisory", description: "Clear governance structures and institutional policies." },
        { title: "Strategic Growth Planning", description: "Roadmaps for sustainable scaling and new programmes." },
      ],
    },
    whyItMatters: {
      heading: "Why It Matters",
      items: [
        { title: "Raise Academic Standards", description: "Embed quality and continuous improvement." },
        { title: "Achieve Accreditation", description: "Navigate compliance with confidence." },
        { title: "Strengthen Governance", description: "Clarify roles, accountability, and decision-making." },
        { title: "Plan Sustainable Growth", description: "Scale programmes without diluting quality." },
        { title: "Align Curriculum To Outcomes", description: "Make learning measurable and relevant." },
        { title: "Improve Stakeholder Confidence", description: "Build trust with parents, boards, and regulators." },
      ],
    },
    approach: {
      heading: "A Collaborative Consulting Approach",
      steps: [
        { number: "01", title: "Discover", description: "Understand your vision, strengths, and the gaps holding you back." },
        { number: "02", title: "Strategize", description: "Craft a clear roadmap with prioritised, achievable milestones." },
        { number: "03", title: "Execute", description: "Implement governance, curriculum, and accreditation plans with you." },
        { number: "04", title: "Sustain", description: "Embed review cycles so excellence becomes the norm." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Deep Education Sector Experience",
        "Accreditation Specialists",
        "Outcome-Focused Methodology",
        "Long-Term Partnership",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["human-resource-services", "financial-consultancy", "it-solutions-digital-transformation"],
    },
    cta: {
      heading: "Let's Elevate Your Institution Together",
      description: "Partner with consultants who understand education from strategy to classroom.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ───────────────────────────── 3. Financial Consultancy ───────────────────────────── */
  "financial-consultancy": {
    slug: "financial-consultancy",
    title: "Financial Consultancy",
    metaTitle: "Financial Consultancy",
    metaDescription:
      "Financial planning, budgeting, compliance, auditing, and long-term sustainability strategies that secure the financial future of educational institutions.",
    heroImage: "/Service-page/Financial-Consultancy.png",
    cardImage: "/Service-page/Financial-Consultancy.png",
    hero: {
      tagline: "Securing The Financial Future Of Your Institution",
      supportingCopy:
        "Strategic financial advice, rigorous auditing, and structural planning to optimise budgets and build sustainable financial models.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Building Financial Strength And Sustainability",
      body: "We provide strategic financial guidance that helps educational institutions optimise budgets, identify cost efficiencies, manage risk, and plan for long-term sustainability. From day-to-day compliance to capital planning, our advisory ensures your institution remains financially resilient and well-positioned to invest in growth, facilities, and student outcomes.",
    },
    capabilities: {
      heading: "Comprehensive Financial Capabilities",
      items: [
        { title: "Financial Audits & Risk Assessment", description: "Comprehensive audits and robust internal controls." },
        { title: "Budgeting & Cost Optimization", description: "Smarter budgets and identified cost efficiencies." },
        { title: "Capital Planning & Funding Strategy", description: "Plan expenditure and secure funding for growth." },
        { title: "Statutory & Tax Compliance", description: "Full adherence to tax laws and reporting standards." },
        { title: "Cash Flow Management", description: "Maintain liquidity and financial discipline." },
        { title: "Financial Reporting & Advisory", description: "Clear reporting that supports confident decisions." },
      ],
    },
    whyItMatters: {
      heading: "Supporting Institutional Resilience",
      items: [
        { title: "Optimise Resources", description: "Direct every dirham toward impact." },
        { title: "Minimise Financial Risk", description: "Anticipate and control exposure." },
        { title: "Ensure Compliance", description: "Stay audit-ready, always." },
        { title: "Improve Cash Flow", description: "Maintain stability through every term." },
        { title: "Fund Future Growth", description: "Plan capital with confidence." },
        { title: "Strengthen Decision-Making", description: "Act on clear, reliable financial insight." },
      ],
    },
    approach: {
      heading: "A Disciplined Financial Framework",
      steps: [
        { number: "01", title: "Assess", description: "Audit financials, controls, and risks to establish a baseline." },
        { number: "02", title: "Design", description: "Build budgets, controls, and sustainability models." },
        { number: "03", title: "Implement", description: "Deploy reporting and compliance frameworks." },
        { number: "04", title: "Monitor", description: "Track performance and refine forecasts over time." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Education-Sector Financial Insight",
        "Qualified Audit Professionals",
        "Transparent Reporting",
        "Sustainability-Focused Strategy",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["human-resource-services", "educational-institutional-consulting", "it-solutions-digital-transformation"],
    },
    cta: {
      heading: "Let's Secure Your Financial Future",
      description: "Build a financial strategy that sustains and grows your institution.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ──────────────── 4. Behavioural Counselling & Student Support ──────────────── */
  "behavioural-counselling-student-support": {
    slug: "behavioural-counselling-student-support",
    title: "Behavioural Counselling & Student Support",
    metaTitle: "Behavioural Counselling & Student Support",
    metaDescription:
      "Professional counselling, wellbeing programmes, mentoring, and student support services that nurture mental health, behaviour, and holistic growth.",
    heroImage: "/Service-page/Behavioural-Counselling-&-Student-Support.png",
    cardImage: "/Service-page/Behavioural-Counselling-&-Student-Support.png",
    hero: {
      tagline: "Nurturing Wellbeing And Holistic Student Growth",
      supportingCopy:
        "Support students' mental health, career readiness, and behavioural development through integrated counselling and wellbeing programmes.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Fostering Confident, Resilient Learners",
      body: "We help institutions create caring, constructive environments where students thrive. Through professional counselling, structured wellbeing programmes, mentoring, and career guidance, we support mental health, positive behaviour, and personal growth — strengthening the connection between student wellbeing and academic success across every stage of school life.",
    },
    capabilities: {
      heading: "Comprehensive Student Support",
      items: [
        { title: "Student Counselling Services", description: "Professional psychological support and stress management." },
        { title: "Career Guidance & Development", description: "Pathways for higher education and future careers." },
        { title: "Teacher Training in Student Psychology", description: "Equip educators to identify and support student needs." },
        { title: "Wellbeing Programmes", description: "Structured initiatives for mental and emotional health." },
        { title: "Mentoring & Behaviour Support", description: "Positive behaviour strategies and one-to-one mentoring." },
        { title: "Parent–School Engagement", description: "Workshops that strengthen the home–school connection." },
      ],
    },
    whyItMatters: {
      heading: "Supporting Student Success",
      items: [
        { title: "Enhance Student Wellbeing", description: "Proactive mental health support systems." },
        { title: "Improve Behaviour & Engagement", description: "Positive, constructive classroom cultures." },
        { title: "Strengthen Career Readiness", description: "Clear pathways beyond school." },
        { title: "Empower Educators", description: "Skills to recognise and respond to student needs." },
        { title: "Build Parent Partnerships", description: "Aligned support between home and school." },
        { title: "Promote Holistic Growth", description: "Develop the whole student, not just academics." },
      ],
    },
    approach: {
      heading: "A Student-Centred Framework",
      steps: [
        { number: "01", title: "Listen", description: "Understand student needs and your current support landscape." },
        { number: "02", title: "Design", description: "Tailor counselling, mentoring, and wellbeing programmes." },
        { number: "03", title: "Support", description: "Deliver services and train your educators and parents." },
        { number: "04", title: "Nurture", description: "Sustain a culture of ongoing wellbeing and growth." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Qualified Counselling Professionals",
        "Age-Appropriate Programmes",
        "Holistic Development Focus",
        "Collaborative School Partnerships",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["human-resource-services", "sports-training-talent-development", "educational-institutional-consulting"],
    },
    cta: {
      heading: "Let's Nurture Every Student Together",
      description: "Build a support system where every learner feels seen, valued, and guided.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ─────────────── 5. IT Solutions & Digital Transformation ─────────────── */
  "it-solutions-digital-transformation": {
    slug: "it-solutions-digital-transformation",
    title: "IT Solutions & Digital Transformation",
    metaTitle: "IT Solutions & Digital Transformation",
    metaDescription:
      "Technology consulting, software solutions, automation, infrastructure, and digital modernization that accelerate transformation in educational institutions.",
    heroImage: "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    cardImage: "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    hero: {
      tagline: "Empowering Institutions With Modern Technology",
      supportingCopy:
        "Custom IT solutions, learning platforms, and cloud infrastructure designed to modernise learning environments and streamline operations.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Accelerating Digital Evolution",
      body: "We help institutions modernise with technology that genuinely fits their needs — from school ERP and learning management systems to secure cloud infrastructure and automation. Our consultants assess your current technology, design a realistic digital roadmap, and deliver solutions that improve teaching, streamline administration, and build a secure, future-ready foundation.",
    },
    capabilities: {
      heading: "End-to-End Technology Capabilities",
      items: [
        { title: "School ERP & LMS Integration", description: "Campus management and learning platforms that connect." },
        { title: "Cloud Infrastructure & Cybersecurity", description: "Secure, scalable cloud environments and protection." },
        { title: "IT Audits & Digital Roadmaps", description: "Assess systems and design a transformation plan." },
        { title: "Process Automation", description: "Remove manual work with smart, connected workflows." },
        { title: "Faculty & Staff IT Training", description: "Empower teams to use digital tools effectively." },
        { title: "Ongoing Support & Maintenance", description: "Reliable support that keeps systems running." },
      ],
    },
    whyItMatters: {
      heading: "Why Digital Transformation Matters",
      items: [
        { title: "Cloud & Enterprise IT", description: "Scalable, secure cloud infrastructure and enterprise architecture designed for institutional growth." },
        { title: "Software Development", description: "Custom web and mobile application engineering built to solve complex operational challenges." },
        { title: "Digital Transformation", description: "Comprehensive strategic roadmaps that modernise workflows and elevate campus operations." },
        { title: "Cybersecurity", description: "Advanced threat protection, data encryption, and compliance frameworks safeguarding your data." },
        { title: "AI & Automation", description: "Intelligent automation and AI tools that eliminate manual tasks and boost productivity." },
        { title: "Smart Enterprise Solutions", description: "Integrated IoT and smart campus systems creating connected, future-ready environments." },
      ],
    },
    approach: {
      heading: "A Structured Transformation Framework",
      steps: [
        { number: "01", title: "Assess", description: "Audit current systems, security, and digital maturity." },
        { number: "02", title: "Architect", description: "Design a roadmap and select the right platforms." },
        { number: "03", title: "Deploy", description: "Implement solutions with minimal disruption." },
        { number: "04", title: "Optimize", description: "Train teams, refine, and scale what works." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Education-First Technology Strategy",
        "Certified IT Professionals",
        "Security at the Core",
        "Scalable, Vendor-Neutral Solutions",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["ecommerce-digital-services", "printing-branding-solutions", "educational-institutional-consulting"],
    },
    cta: {
      heading: "Let's Modernise Your Institution Together",
      description: "Discover technology solutions built to accelerate your digital transformation.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ───────────────────── 6. Printing & Branding Solutions ───────────────────── */
  "printing-branding-solutions": {
    slug: "printing-branding-solutions",
    title: "Printing & Branding Solutions",
    metaTitle: "Printing & Branding Solutions",
    metaDescription:
      "Professional branding, printing, promotional materials, and visual communication that shape a powerful, unified brand identity for your institution.",
    heroImage: "/Service-page/Printing-&-Branding-Solutions.png",
    cardImage: "/Service-page/Printing-&-Branding-Solutions.png",
    hero: {
      tagline: "Shaping A Powerful Brand Identity",
      supportingCopy:
        "High-quality printed materials and professional branding strategies that elevate your institution's prestige and presence.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Designing Identity With Impact",
      body: "We help institutions craft a unified, memorable brand and bring it to life across print and digital media. From prospectus and admissions kits to campus signage, uniforms, and marketing collateral, our branding and printing services strengthen identity, build community pride, and support admissions with materials that look exceptional and communicate clearly.",
    },
    capabilities: {
      heading: "Branding & Printing Capabilities",
      items: [
        { title: "Prospectus & Admissions Kit Design", description: "Premium brochures and enrollment materials that convert." },
        { title: "Campus Branding & Signage", description: "External and internal signage that builds presence." },
        { title: "Uniforms & Merchandising", description: "Customised uniforms, kits, and institutional merchandise." },
        { title: "Digital & Print Marketing Assets", description: "Newsletters, reports, and coordinated collateral." },
        { title: "Logo & Visual Identity", description: "Distinct identity systems built to last." },
        { title: "Promotional Materials", description: "Event, campaign, and outreach assets that impress." },
      ],
    },
    whyItMatters: {
      heading: "Why Branding Matters",
      items: [
        { title: "Commercial Printing", description: "High-volume, high-precision print production tailored for all institutional needs." },
        { title: "Creative Branding Studio", description: "Bespoke design concepts that reflect your institution's unique vision and values." },
        { title: "Corporate Brand Identity", description: "Cohesive logo and visual identity systems that build recognition and trust." },
        { title: "Signage & Display Branding", description: "Impactful indoor and outdoor campus signage that guides and inspires." },
        { title: "Promotional Products", description: "Custom branded merchandise that boosts engagement and community pride." },
        { title: "Marketing Print Materials", description: "High-conversion prospectuses, brochures, and campaign collateral." },
      ],
    },
    approach: {
      heading: "A Creative Brand Framework",
      steps: [
        { number: "01", title: "Discover", description: "Understand your story, audience, and brand goals." },
        { number: "02", title: "Design", description: "Craft identity systems and standout materials." },
        { number: "03", title: "Produce", description: "Deliver high-quality print and branded assets." },
        { number: "04", title: "Amplify", description: "Roll out consistently across every channel." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Creative Brand Specialists",
        "Premium Print Quality",
        "Education-Focused Design",
        "End-to-End Production",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["uniform-solutions", "it-solutions-digital-transformation", "ecommerce-digital-services"],
    },
    cta: {
      heading: "Let's Build A Brand That Lasts",
      description: "Shape an identity that elevates your institution and drives growth.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ───────────────────── 7. E-Commerce & Digital Services ───────────────────── */
  "ecommerce-digital-services": {
    slug: "ecommerce-digital-services",
    title: "E-Commerce & Digital Services",
    metaTitle: "E-Commerce & Digital Services",
    metaDescription:
      "Digital platforms, online solutions, web services, and technology-driven growth that help institutions transact, engage, and expand online.",
    heroImage: "/Service-page/E-Commerce-&-Digital-Services.png",
    cardImage: "/Service-page/E-Commerce-&-Digital-Services.png",
    hero: {
      tagline: "Growing Your Institution Through Digital Channels",
      supportingCopy:
        "Digital platforms, online services, and web solutions engineered to extend your institution's reach and revenue online.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Unlocking Digital Growth",
      body: "We help institutions extend their presence and operations into the digital space — building online platforms, e-commerce channels, and web services that make it easy to engage families, sell products and programmes, and reach new audiences. From strategy to launch, we deliver reliable, scalable digital solutions that drive measurable growth and a seamless online experience.",
    },
    capabilities: {
      heading: "Digital Services Capabilities",
      items: [
        { title: "Online Platforms & Portals", description: "Custom web platforms for engagement and transactions." },
        { title: "E-Commerce & Payments", description: "Secure online stores and payment integration." },
        { title: "Web & App Development", description: "Fast, responsive sites and applications." },
        { title: "Digital Marketing", description: "Campaigns that grow reach and conversions." },
        { title: "Analytics & Optimization", description: "Insight-driven improvement over time." },
        { title: "Managed Digital Operations", description: "Ongoing support that keeps you performing." },
      ],
    },
    whyItMatters: {
      heading: "Why Digital Services Matter",
      items: [
        { title: "Modern E-Commerce Platform", description: "Custom, scalable online storefronts designed for seamless digital commerce." },
        { title: "Digital Commerce Analytics", description: "Real-time data insights and performance tracking to optimize online sales." },
        { title: "Software & Web Development", description: "High-performance, responsive websites and web applications built to scale." },
        { title: "Secure Digital Payments", description: "Frictionless, multi-gateway payment processing with robust data security." },
        { title: "Order Fulfillment & Logistics", description: "Streamlined order processing and automated supply chain integration." },
        { title: "Digital Growth Strategy", description: "Targeted digital marketing and strategy to reach new audiences and grow revenue." },
      ],
    },
    approach: {
      heading: "A Growth-Focused Framework",
      steps: [
        { number: "01", title: "Strategize", description: "Define goals, audience, and the right digital channels." },
        { number: "02", title: "Build", description: "Develop platforms, stores, and campaigns." },
        { number: "03", title: "Launch", description: "Go live with secure, tested, optimised experiences." },
        { number: "04", title: "Grow", description: "Analyse, optimise, and scale results." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Full-Stack Digital Expertise",
        "Conversion-Focused Design",
        "Secure & Scalable Platforms",
        "Results-Driven Delivery",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["it-solutions-digital-transformation", "printing-branding-solutions", "uniform-solutions"],
    },
    cta: {
      heading: "Let's Grow Your Digital Presence",
      description: "Build digital channels that extend your reach and drive real growth.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ─────────────── 8. Civil Engineering & Infrastructure Development ─────────────── */
  "civil-engineering-infrastructure": {
    slug: "civil-engineering-infrastructure",
    title: "Civil Engineering & Infrastructure Development",
    metaTitle: "Civil Engineering & Infrastructure Development",
    metaDescription:
      "Infrastructure planning, civil engineering, and construction support that build safe, modern, future-ready learning environments for your institution.",
    heroImage: "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    cardImage: "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    hero: {
      tagline: "Building Future-Ready Learning Environments",
      supportingCopy:
        "Infrastructure planning, civil engineering, and construction expertise that turn campus vision into safe, lasting reality.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Building The Foundations Of Great Institutions",
      body: "We support institutions in planning, developing, and maintaining the physical environments where learning happens. From feasibility and master planning to civil engineering and construction oversight, our infrastructure services ensure your campus is safe, compliant, and built to support growth — creating inspiring, functional spaces that serve students and staff for decades.",
    },
    capabilities: {
      heading: "Infrastructure Capabilities",
      items: [
        { title: "Campus Master Planning", description: "Long-term layouts that support growth and flow." },
        { title: "Civil Engineering & Design", description: "Structural and site engineering you can trust." },
        { title: "Construction Project Management", description: "On-time, on-budget delivery and oversight." },
        { title: "Facilities & Maintenance Planning", description: "Keep assets performing for the long term." },
        { title: "Compliance & Safety Standards", description: "Meet building codes and safety requirements." },
        { title: "Sustainability & Efficiency", description: "Energy-smart, cost-efficient environments." },
      ],
    },
    whyItMatters: {
      heading: "Why Infrastructure Matters",
      items: [
        { title: "Create Inspiring Spaces", description: "Environments that elevate teaching and learning." },
        { title: "Ensure Safety & Compliance", description: "Built to code, safe for everyone." },
        { title: "Support Growth", description: "Scale capacity without disruption." },
        { title: "Control Costs", description: "Plan and deliver within budget." },
        { title: "Improve Efficiency", description: "Lower operating costs over time." },
        { title: "Protect Your Investment", description: "Durable assets that hold their value." },
      ],
    },
    approach: {
      heading: "A Structured Delivery Framework",
      steps: [
        { number: "01", title: "Plan", description: "Master-plan the campus against your vision and budget." },
        { number: "02", title: "Design", description: "Engineer safe, efficient, future-ready structures." },
        { number: "03", title: "Build", description: "Manage construction to quality, time, and cost." },
        { number: "04", title: "Maintain", description: "Sustain assets with planned facilities management." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Qualified Engineering Professionals",
        "Education-Sector Experience",
        "Safety & Compliance First",
        "End-to-End Project Ownership",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["transportation-fleet-support", "uniform-solutions", "financial-consultancy"],
    },
    cta: {
      heading: "Let's Build Your Future Campus",
      description: "Plan and deliver infrastructure that supports generations of learners.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ───────────────────── 9. Transportation & Fleet Support ───────────────────── */
  "transportation-fleet-support": {
    slug: "transportation-fleet-support",
    title: "Transportation & Fleet Support",
    metaTitle: "Transportation & Fleet Support",
    metaDescription:
      "Safe, reliable student transportation, fleet management, route optimisation, and compliance that keep your institution moving with confidence.",
    heroImage: "/Service-page/Transportation-&-Fleet-Support.png",
    cardImage: "/Service-page/Transportation-&-Fleet-Support.png",
    hero: {
      tagline: "Safe, Reliable Transport For Every Student",
      supportingCopy:
        "Fleet management, route optimisation, and compliance solutions that deliver dependable, safe student transportation.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Keeping Your Institution Moving Safely",
      body: "We help institutions manage dependable, safe, and cost-efficient transportation. From fleet procurement and route optimisation to driver standards and compliance, our support ensures students arrive safely and on time — giving parents confidence and reducing the operational burden on your team through well-run, well-monitored transport operations.",
    },
    capabilities: {
      heading: "Transportation Capabilities",
      items: [
        { title: "Fleet Management", description: "Procurement, maintenance, and lifecycle planning." },
        { title: "Route Planning & Optimization", description: "Efficient, safe routes that save time and fuel." },
        { title: "Driver Standards & Training", description: "Vetted, trained, and accountable drivers." },
        { title: "Safety & Compliance", description: "Regulatory adherence and rigorous safety checks." },
        { title: "Tracking & Monitoring", description: "Real-time visibility and parent communication." },
        { title: "Transport Operations Support", description: "Day-to-day management and contingency planning." },
      ],
    },
    whyItMatters: {
      heading: "Why Transportation Matters",
      items: [
        { title: "Keep Students Safe", description: "Safety is the foundation of every journey." },
        { title: "Build Parent Trust", description: "Reliable transport reassures every family." },
        { title: "Improve Efficiency", description: "Optimised routes lower cost and time." },
        { title: "Ensure Compliance", description: "Stay ahead of regulations and standards." },
        { title: "Reduce Operational Burden", description: "Free your team from day-to-day logistics." },
        { title: "Strengthen Accessibility", description: "Reach more students across a wider area." },
      ],
    },
    approach: {
      heading: "A Safety-First Framework",
      steps: [
        { number: "01", title: "Assess", description: "Review fleet, routes, safety, and current operations." },
        { number: "02", title: "Optimize", description: "Redesign routes, standards, and compliance processes." },
        { number: "03", title: "Operate", description: "Run dependable, monitored, well-managed transport." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Transport Operations Specialists",
        "Safety & Compliance Focus",
        "Technology-Enabled Tracking",
        "Reliable, Accountable Service",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["civil-engineering-infrastructure", "uniform-solutions", "human-resource-services"],
    },
    cta: {
      heading: "Let's Keep Your Students Moving Safely",
      description: "Build a transport operation families trust and your team can rely on.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ───────────────────── 10. Uniform Solutions ───────────────────── */
  "uniform-solutions": {
    slug: "uniform-solutions",
    title: "Uniform Solutions",
    metaTitle: "Uniform Solutions",
    metaDescription:
      "Quality school uniforms, sports kits, and institutional clothing — designed, sourced, and delivered to reflect your institution's identity and standards.",
    heroImage: "/Service-page/Uniform-&-Clothing-Solutions.png",
    cardImage: "/Service-page/Uniform-&-Clothing-Solutions.png",
    hero: {
      tagline: "Identity, Quality, And Comfort In Every Stitch",
      supportingCopy:
        "Custom-designed uniforms and institutional clothing that reflect your identity and stand up to daily school life.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Dressing Your Institution With Pride",
      body: "We design, source, and deliver high-quality uniforms and institutional clothing that reflect your identity and uphold your standards. From everyday school uniforms to sports kits and staff attire, our solutions balance comfort, durability, and affordability — making it easy for families and giving your institution a polished, unified appearance that builds belonging and pride.",
    },
    capabilities: {
      heading: "Uniform & Clothing Capabilities",
      items: [
        { title: "Uniform Design", description: "Custom designs that express your institutional identity." },
        { title: "School Uniforms", description: "Durable, comfortable everyday wear." },
        { title: "Sports & Activity Kits", description: "Performance kits for teams and events." },
        { title: "Staff Attire", description: "Professional clothing that looks the part." },
        { title: "Sourcing & Manufacturing", description: "Reliable, ethical, quality-controlled production." },
        { title: "Distribution & Inventory", description: "Efficient supply to families and on-campus stores." },
      ],
    },
    whyItMatters: {
      heading: "Why Uniforms Matter",
      items: [
        { title: "Build Belonging", description: "A unified look fosters pride and community." },
        { title: "Reflect Your Identity", description: "Designs that carry your brand every day." },
        { title: "Ensure Quality & Comfort", description: "Durable, comfortable clothing students enjoy." },
        { title: "Grament Manufacturing", description: "Reliable supply and easy access." },
        { title: "Promote Equality", description: "A consistent look reduces comparison and pressure." },
        { title: "Elevate Professionalism", description: "A polished appearance across campus." },
      ],
    },
    approach: {
      heading: "A Tailored Delivery Framework",
      steps: [
        { number: "01", title: "Design", description: "Create uniform concepts aligned to your identity and needs." },
        { number: "02", title: "Source", description: "Select ethical, quality-controlled manufacturers." },
        { number: "03", title: "Deliver", description: "Supply uniforms efficiently to families and stores." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Quality-Focused Production",
        "Custom Design Capability",
        "Reliable Supply Chain",
        "Affordable, Durable Solutions",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["printing-branding-solutions", "sports-training-talent-development", "ecommerce-digital-services"],
    },
    cta: {
      heading: "Let's Dress Your Institution With Pride",
      description: "Design uniform solutions that reflect your identity and stand the test of time.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },

  /* ─────────────── 11. Sports Training & Talent Development ─────────────── */
  "sports-training-talent-development": {
    slug: "sports-training-talent-development",
    title: "Sports Training & Talent Development",
    metaTitle: "Sports Training & Talent Development",
    metaDescription:
      "Professional sports coaching, athletic development, and talent identification programmes that nurture student athletes and promote healthy, active school life.",
    heroImage: "/Service-page/Sports-Training-&-Talent-Development.png",
    cardImage: "/Service-page/Sports-Training-&-Talent-Development.png",
    hero: {
      tagline: "Developing Talent, Building Character Through Sport",
      supportingCopy:
        "Professional coaching, athletic development, and talent programmes that nurture student athletes and build healthy, active school communities.",
      ctas: [CONSULTATION_CTA],
    },
    overview: {
      heading: "Championing Healthy, Active Students",
      body: "We help institutions build strong sports and athletic programmes that develop talent, promote wellbeing, and build character. From professional coaching and structured curricula to talent identification and competition pathways, our programmes give students of every ability the chance to grow through sport — strengthening health, confidence, teamwork, and school pride.",
    },
    capabilities: {
      heading: "Sports & Talent Capabilities",
      items: [
        { title: "Professional Sports Coaching", description: "Qualified coaches across multiple disciplines." },
        { title: "Athletic Development Programmes", description: "Structured conditioning and skill progression." },
        { title: "Talent Identification", description: "Spot and nurture promising student athletes." },
        { title: "Inter-School & Competition Pathways", description: "Routes from school sport to higher levels." },
        { title: "PE Curriculum Development", description: "Age-appropriate, engaging physical education." },
        { title: "Sports Infrastructure Advisory", description: "Facilities and equipment planning guidance." },
      ],
    },
    whyItMatters: {
      heading: "Why Sport Matters",
      items: [
        { title: "Promote Health & Fitness", description: "Active, healthy habits that last a lifetime." },
        { title: "Build Character", description: "Discipline, resilience, and sportsmanship." },
        { title: "Develop Talent", description: "Pathways for gifted athletes to excel." },
        { title: "Strengthen Teamwork", description: "Collaboration across teams and year groups." },
        { title: "Boost School Pride", description: "Achievement and identity through competition." },
        { title: "Enhance Wellbeing", description: "Physical activity supports mental health." },
      ],
    },
    approach: {
      heading: "A Development-Focused Framework",
      steps: [
        { number: "01", title: "Assess", description: "Evaluate current programmes, facilities, and talent." },
        { number: "02", title: "Develop", description: "Design coaching, curriculum, and pathways." },
        { number: "03", title: "Deliver", description: "Run programmes with qualified, motivated coaches." },
        { number: "04", title: "Excel", description: "Build competition pathways that grow champions." },
      ],
    },
    whyChoose: {
      heading: "Expertise You Can Trust",
      items: [
        "Qualified Coaching Professionals",
        "Age-Appropriate Programmes",
        "Talent-Focused Pathways",
        "Holistic Development Approach",
      ],
    },
    related: {
      heading: "Explore Connected Solutions",
      slugs: ["uniform-solutions", "behavioural-counselling-student-support", "civil-engineering-infrastructure"],
    },
    cta: {
      heading: "Let's Develop Your Student Athletes",
      description: "Build sports programmes that grow talent, health, and character.",
      ctas: [CONSULTATION_CTA, CONTACT_CTA],
    },
  },
};

/** All slugs, for generateStaticParams. */
export const SERVICE_SLUGS: string[] = Object.keys(SERVICE_DETAILS);

/** Lightweight index for Related Services resolution: slug → { title, cardImage }. */
export const SERVICE_INDEX: Record<string, { title: string; cardImage: string }> = Object.fromEntries(
  Object.values(SERVICE_DETAILS).map((s) => [s.slug, { title: s.title, cardImage: s.cardImage }]),
);

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS[slug];
}
