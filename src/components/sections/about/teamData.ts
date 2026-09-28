export interface TeamFeature {
  iconType: "code" | "cart" | "zap" | "chart" | "shield" | "layers" | "users" | "target" | "sparkles" | "globe";
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleSubtitle: string;
  imageSrc: string;
  bio: string;
  features: [TeamFeature, TeamFeature, TeamFeature];
  specializations: string[];
  imageClassName?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "fahim-ejaj",
    name: "Fahim Ejaj",
    title: "Group Administration Manager",
    roleSubtitle: "GROUP ADMINISTRATION MANAGER",
    imageSrc: "/about/team/Fahim Ejaj.jpg",
    bio: "Driving strategic vision and operational transformation for educational institutions globally. Focused on sustainable growth, institutional governance, and building high-impact academic frameworks.",
    features: [
      {
        iconType: "target",
        title: "Strategic Leadership",
        description: "Tailored roadmaps for complex institutional growth and governance.",
      },
      {
        iconType: "globe",
        title: "Global Expansion",
        description: "Scalable educational frameworks and cross-border partnerships.",
      },
      {
        iconType: "chart",
        title: "Measurable Impact",
        description: "Data-backed outcomes for sustainable academic advancement.",
      },
    ],
    specializations: ["Strategic Planning", "Executive Leadership", "Academic Governance", "Institutional Growth"],
  },
  {
    id: "ujjwal-jani",
    name: "Ujjwal Jani",
    title: "Finance Manager",
    roleSubtitle: "FINANCE MANAGER",
    imageSrc: "/about/team/Ujjwal Jani.png",
    bio: "Streamlining operational workflows, optimizing campus resource allocation, and delivering high-performance administrative structures across diverse academic environments.",
    features: [
      {
        iconType: "layers",
        title: "Operations Excellence",
        description: "Standardized administrative systems and high-efficiency workflows.",
      },
      {
        iconType: "chart",
        title: "Resource Planning",
        description: "Strategic allocation of fiscal, human, and physical assets.",
      },
      {
        iconType: "zap",
        title: "Process Optimization",
        description: "Agile change management for institutional longevity.",
      },
    ],
    specializations: ["Operational Strategy", "Change Management", "Resource Allocation", "Performance Optimization"],
  },
  {
    id: "ms-bindu",
    name: "Ms. Bindu",
    title: "Academics - General counseling (SEED)",
    roleSubtitle: "ACADEMICS - GENERAL COUNSELING (SEED)",
    imageSrc: "/about/team/Ms. Bindu.jpg",
    imageClassName: "scale-[1.15] group-hover:scale-[1.20]",
    bio: "Architecting next-generation digital campuses, AI-powered learning infrastructure, and enterprise-grade data security systems for modern education ecosystems.",
    features: [
      {
        iconType: "code",
        title: "Digital Ecosystems",
        description: "Modern cloud architecture and campus IT ecosystem modernization.",
      },
      {
        iconType: "sparkles",
        title: "EdTech Innovation",
        description: "Integration of scalable learning platforms and smart analytics.",
      },
      {
        iconType: "shield",
        title: "Enterprise Security",
        description: "Data privacy compliance, robust security, and resilient uptime.",
      },
    ],
    specializations: ["Cloud Architecture", "AI in Education", "Campus Security", "Enterprise Infrastructure"],
  },
  {
    id: "feroz-mammed",
    name: "Feroz Mammed",
    title: "HR department - Group HR Manager",
    roleSubtitle: "HR DEPARTMENT - GROUP HR MANAGER",
    imageSrc: "/about/team/Feroz Mammed.jpg",
    bio: "Crafting human-centered learning platforms, intuitive digital student experiences, and accessible design systems that foster deep engagement and educational success.",
    features: [
      {
        iconType: "sparkles",
        title: "User Experience",
        description: "Seamless, accessible UI/UX for students, faculty, and leadership.",
      },
      {
        iconType: "layers",
        title: "Design Systems",
        description: "Cohesive digital assets and brand aesthetics across touchpoints.",
      },
      {
        iconType: "target",
        title: "Product Innovation",
        description: "Research-led design strategies for engaging learning tools.",
      },
    ],
    specializations: ["UI/UX Strategy", "Design Systems", "Product Research", "Student Experience"],
  },
  {
    id: "afzal-m",
    name: "Afzal-M",
    title: "IT Director",
    roleSubtitle: "IT DIRECTOR",
    imageSrc: "/about/team/Afzal-M.jpg",
    bio: "Building robust, ultra-fast web platforms and real-time administrative dashboards. Specialist in clean architecture, API design, and high-load web applications.",
    features: [
      {
        iconType: "code",
        title: "Web Development",
        description: "Tailor-made web applications with modern technologies.",
      },
      {
        iconType: "cart",
        title: "E-Commerce Portals",
        description: "Scalable online platforms that simplify processes and sales.",
      },
      {
        iconType: "zap",
        title: "High Performance",
        description: "Optimized solutions for fast load times and best user experience.",
      },
    ],
    specializations: ["React", "Next.js", "Node.js", "Tailwind CSS", "API Systems"],
  },
  {
    id: "zakir-hussain-kamaluddin",
    name: "Zakir Hussain Kamaluddin",
    title: "Chairman",
    roleSubtitle: "CHAIRMAN",
    imageSrc: "/about/team/Zakir_Hussain_Kamaluddin.jpg",
    bio: "Building powerful institutional brand narratives, recruitment campaigns, and global outreach strategies that increase enrollment and elevate market reputation.",
    features: [
      {
        iconType: "sparkles",
        title: "Brand Positioning",
        description: "Distinctive identity crafting and value proposition design.",
      },
      {
        iconType: "target",
        title: "Student Recruitment",
        description: "Data-driven digital acquisition campaigns and funnel growth.",
      },
      {
        iconType: "globe",
        title: "Strategic Outreach",
        description: "High-impact multi-channel engagement and public relations.",
      },
    ],
    specializations: ["Brand Strategy", "Digital Marketing", "Enrollment Growth", "Market Research"],
  },
  {
    id: "samir-bin-kamal",
    name: "Samir Bin Kamal",
    title: "Vice Chairman & Managing Trustee",
    roleSubtitle: "VICE CHAIRMAN & MANAGING TRUSTEE",
    imageSrc: "/about/team/Samir Bin Kamal.jpg",
    bio: "Driving institutional governance, stakeholder engagement, and visionary leadership to ensure sustainable educational excellence and organizational growth.",
    features: [
      {
        iconType: "globe",
        title: "Strategic Vision",
        description: "Aligning institutional goals with long-term educational impact.",
      },
      {
        iconType: "users",
        title: "Stakeholder Engagement",
        description: "Building strong partnerships and community relationships.",
      },
      {
        iconType: "shield",
        title: "Governance & Ethics",
        description: "Ensuring organizational integrity and operational transparency.",
      },
    ],
    specializations: ["Governance", "Strategic Planning", "Leadership", "Institutional Growth"],
  },
  {
    id: "khaleelulla-zakir-hussain",
    name: "Khaleelulla Zakir Hussain",
    title: "Trustee",
    roleSubtitle: "TRUSTEE",
    imageSrc: "/about/team/Khaleelulla_zakir_Hussain.jpg",
    bio: "Focused on shaping ethical frameworks, guiding institutional philosophy, and maintaining long-term educational standards for continuous improvement.",
    features: [
      {
        iconType: "shield",
        title: "Ethical Governance",
        description: "Promoting integrity and transparency in institutional operations.",
      },
      {
        iconType: "target",
        title: "Strategic Advisory",
        description: "Providing high-level guidance for sustainable growth.",
      },
      {
        iconType: "users",
        title: "Community Outreach",
        description: "Building resilient networks with educational stakeholders.",
      },
    ],
    specializations: ["Advisory", "Ethics", "Governance", "Community Relations"],
  },
  {
    id: "ameen-zakir-hussain",
    name: "Ameen Zakir Hussain",
    title: "Trustee",
    roleSubtitle: "TRUSTEE",
    imageSrc: "/about/team/Ameen Zakir Hussain.jpg",
    bio: "Championing educational equity, long-term strategic investments, and robust governance models to foster resilient and impactful academic institutions.",
    features: [
      {
        iconType: "globe",
        title: "Educational Equity",
        description: "Advancing accessible and inclusive learning opportunities.",
      },
      {
        iconType: "chart",
        title: "Strategic Investment",
        description: "Aligning resources for maximum institutional impact.",
      },
      {
        iconType: "users",
        title: "Stakeholder Relations",
        description: "Cultivating lasting partnerships across the education sector.",
      },
    ],
    specializations: ["Strategic Investment", "Governance", "Equity", "Stakeholder Relations"],
  },
  {
    id: "ahammed-zakir-hussain",
    name: "Ahammed Zakir Hussain",
    title: "Trustee",
    roleSubtitle: "TRUSTEE",
    imageSrc: "/about/team/Ahammed_Zakir_Hussain.jpg",
    bio: "Dedicated to institutional excellence, guiding educational policies, and shaping robust frameworks for continuous academic and organizational advancement.",
    features: [
      {
        iconType: "shield",
        title: "Policy Development",
        description: "Creating frameworks for academic and operational excellence.",
      },
      {
        iconType: "target",
        title: "Institutional Strategy",
        description: "Aligning organizational goals with evolving educational standards.",
      },
      {
        iconType: "globe",
        title: "Global Standards",
        description: "Integrating international best practices into local frameworks.",
      },
    ],
    specializations: ["Policy Development", "Institutional Strategy", "Educational Standards", "Governance"],
  },
  {
    id: "abdul-rahman-bin-samir",
    name: "Abdul Rahman Bin Samir",
    title: "Trustee",
    roleSubtitle: "TRUSTEE",
    imageSrc: "/about/team/Abdul Rahman Bin Samir.jpg",
    bio: "Focusing on sustainable institutional practices, community integration, and forward-looking strategies to empower future generations through quality education.",
    features: [
      {
        iconType: "globe",
        title: "Sustainable Practices",
        description: "Implementing long-term operational sustainability strategies.",
      },
      {
        iconType: "users",
        title: "Community Integration",
        description: "Strengthening ties between academic institutions and local communities.",
      },
      {
        iconType: "sparkles",
        title: "Future-Ready Learning",
        description: "Championing innovative approaches to modern education.",
      },
    ],
    specializations: ["Sustainability", "Community Relations", "Innovation", "Governance"],
  },
  {
    id: "abdul-ahad-bin-samir",
    name: "Abdul Ahad Bin Samir",
    title: "Trustee",
    roleSubtitle: "TRUSTEE",
    imageSrc: "/about/team/abdul_ahad_bin_samir.jpg",
    bio: "Dedicated to enhancing academic environments, driving digital transformation, and fostering student-centric learning experiences.",
    features: [
      {
        iconType: "sparkles",
        title: "Digital Transformation",
        description: "Implementing modern technological solutions in education.",
      },
      {
        iconType: "users",
        title: "Student Experience",
        description: "Focusing on holistic development and academic support.",
      },
      {
        iconType: "target",
        title: "Academic Growth",
        description: "Supporting initiatives for continuous institutional improvement.",
      },
    ],
    specializations: ["Digital Strategy", "Student Experience", "Academic Innovation", "Governance"],
  },
  {
    id: "mohamed-arshad-bin-samir",
    name: "Mohamed Arshad Bin Samir",
    title: "Trustee",
    roleSubtitle: "TRUSTEE",
    imageSrc: "/about/team/Mohamed_Arshad_Bin_Samir.jpg",
    bio: "Advancing operational excellence, driving educational partnerships, and ensuring strategic resource allocation to build resilient and forward-thinking academic institutions.",
    features: [
      {
        iconType: "globe",
        title: "Global Partnerships",
        description: "Fostering international collaborations for academic excellence.",
      },
      {
        iconType: "chart",
        title: "Operational Strategy",
        description: "Optimizing institutional resources for sustainable growth.",
      },
      {
        iconType: "users",
        title: "Community Impact",
        description: "Driving initiatives that benefit local and global educational ecosystems.",
      },
    ],
    specializations: ["Partnerships", "Operational Strategy", "Resource Allocation", "Governance"],
  },
  {
    id: "dummy-academic",
    name: "Dummy Name",
    title: "Academic",
    roleSubtitle: "ACADEMIC",
    imageSrc: "/about/team/Mason-Brooks.jpg",
    bio: "Placeholder bio for the academic role. Dedicated to fostering excellence in education and implementing innovative learning methodologies.",
    features: [
      {
        iconType: "sparkles",
        title: "Academic Excellence",
        description: "Driving standards and ensuring quality educational outcomes.",
      },
      {
        iconType: "users",
        title: "Student Success",
        description: "Focusing on holistic development and academic achievement.",
      },
      {
        iconType: "target",
        title: "Curriculum Innovation",
        description: "Designing modern, future-ready learning frameworks.",
      },
    ],
    specializations: ["Education", "Curriculum Design", "Student Success", "Academic Strategy"],
  },
];
