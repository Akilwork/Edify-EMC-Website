import { IntentType, ServiceType, QuickReply } from './types';

/**
 * Knowledge Base - Conversational responses for Edify Assistant
 * Smart, brief, and natural responses about services, benefits, pricing
 */

export interface KnowledgeResponse {
  text: string;
  quickReplies?: QuickReply[];
  intent?: IntentType;
  transitionTo?: 'lead_capture' | 'closing';
}

/**
 * Get conversational response based on intent and context
 */
export function getResponse(
  intent: IntentType,
  context: {
    mentionedServices?: ServiceType[];
    stage?: string;
    previousIntent?: IntentType;
  }
): KnowledgeResponse {
  const { mentionedServices = [], stage, previousIntent } = context;

  // Greeting responses
  if (intent === 'greeting') {
    return {
      text: "Hi! I'm Edify Assistant. I'd be happy to help you explore how we can support your institution. What brings you here today?",
      quickReplies: [
        { text: "Explore Services", intent: "services" },
        { text: "Get Consultation", intent: "consultation" },
        { text: "Why Edify?", intent: "benefits" }
      ]
    };
  }

  // Services inquiry
  if (intent === 'services') {
    if (mentionedServices.length === 0) {
      return {
        text: "We offer comprehensive solutions tailored for educational institutions. Here's what we cover:\n\n📊 HR & Staffing\n💼 Finance & Budgeting\n💻 Technology & Digital Transformation\n⚙️ Operations & Processes\n🏗️ Infrastructure & Facilities\n🎓 Student Development\n\nWhich area would you like to explore?",
        quickReplies: [
          { text: "HR & Staffing", intent: "hr" },
          { text: "Technology", intent: "technology" },
          { text: "Operations", intent: "operations" },
          { text: "All Services", intent: "consultation" }
        ]
      };
    }
  }

  // Specific service inquiries with conversational responses
  if (intent === 'hr') {
    return {
      text: "HR services are at the heart of what we do. We help with:\n\n• Talent acquisition & recruitment\n• Staff development & training\n• Workforce planning\n• HR policy optimization\n\nMany universities we work with have reduced time-to-hire by 60% within 6 months. What specific HR challenge is your institution facing?",
      quickReplies: [
        { text: "Recruitment issues", intent: "consultation", data: { focus: "recruitment" } },
        { text: "Staff training", intent: "consultation", data: { focus: "training" } },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  if (intent === 'technology') {
    return {
      text: "Technology is transforming education. We help institutions:\n\n• Modernize legacy systems\n• Implement digital tools\n• Integrate platforms seamlessly\n• Build custom solutions\n\nWe've guided 50+ institutions through digital transformation. Is your institution looking to upgrade or implement something specific?",
      quickReplies: [
        { text: "System upgrade", intent: "consultation", data: { focus: "upgrade" } },
        { text: "New implementation", intent: "consultation", data: { focus: "implementation" } },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  if (intent === 'operations') {
    return {
      text: "Operational efficiency directly impacts student experience. We help:\n\n• Streamline administrative workflows\n• Reduce process bottlenecks\n• Optimize resource allocation\n• Implement quality systems\n\nTypical institutions see 40% improvement in operational efficiency. What operations area needs attention?",
      quickReplies: [
        { text: "Process issues", intent: "consultation", data: { focus: "process" } },
        { text: "Resource planning", intent: "consultation", data: { focus: "resource" } },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  if (intent === 'finance') {
    return {
      text: "Financial health enables everything else. Our Finance services include:\n\n• Budget planning & optimization\n• Cost management strategies\n• Revenue enhancement\n• Financial reporting systems\n\nWe've helped institutions reduce costs by 25% while improving service quality. What's your biggest financial challenge?",
      quickReplies: [
        { text: "Budget planning", intent: "consultation", data: { focus: "budget" } },
        { text: "Cost reduction", intent: "consultation", data: { focus: "cost" } },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  if (intent === 'infrastructure') {
    return {
      text: "Infrastructure sets the foundation for learning. We help with:\n\n• Campus planning & design\n• Facility optimization\n• Space utilization\n• Safety & compliance audits\n\nGood infrastructure improves student satisfaction by 35%. What type of infrastructure project are you considering?",
      quickReplies: [
        { text: "New facility", intent: "consultation", data: { focus: "new_facility" } },
        { text: "Optimization", intent: "consultation", data: { focus: "optimization" } },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  if (intent === 'student_development') {
    return {
      text: "Student development is the ultimate goal. We support:\n\n• Learning program design\n• Skill development frameworks\n• Student support systems\n• Career readiness programs\n\nInstitutions with strong student development programs see 50% better outcomes. What's your current student development focus?",
      quickReplies: [
        { text: "Skill programs", intent: "consultation", data: { focus: "skills" } },
        { text: "Support systems", intent: "consultation", data: { focus: "support" } },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  // Benefits/Why Edify
  if (intent === 'benefits') {
    return {
      text: "Here's what makes Edify different:\n\n✅ 15+ years specializing in education\n✅ 500+ institutions transformed\n✅ Custom solutions (no cookie-cutter)\n✅ End-to-end support, not just advice\n✅ Measurable results (40% avg improvement)\n✅ We work alongside you, not just consult\n\nIs there a specific benefit you'd like to know more about?",
      quickReplies: [
        { text: "Your approach", intent: "case_study" },
        { text: "Results", intent: "case_study" },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  // Case studies/Results
  if (intent === 'case_study') {
    return {
      text: "Here's a recent example:\n\n🎓 University (larger institution)\n\nChallenge: Slow recruitment, outdated HR processes\n\nSolution: Digital HR system + workflow redesign\n\nResult: 60% faster hiring, 45% cost reduction\n\nWould you like to see how similar solutions could work for your institution?",
      quickReplies: [
        { text: "Yes, tell me more", intent: "consultation" },
        { text: "Get Consultation", intent: "lead_capture" }
      ]
    };
  }

  // Pricing inquiry
  if (intent === 'pricing') {
    return {
      text: "Every institution is unique, so we customize solutions based on:\n\n• Institution size & type\n• Scope of services needed\n• Project duration\n• Specific goals\n\nThis ensures you pay for what you actually need. Would you like a consultation to get a tailored proposal?",
      quickReplies: [
        { text: "Yes, I'd like a proposal", intent: "lead_capture" },
        { text: "Tell me more first", intent: "benefits" },
        { text: "Explore Services", intent: "services" }
      ],
      transitionTo: 'lead_capture'
    };
  }

  // Team inquiry
  if (intent === 'team') {
    return {
      text: "Our team combines education expertise with deep operational experience:\n\n👤 Leadership: Former education administrators\n👤 Specialists: HR, Tech, Finance, Ops experts\n👤 Experience: 15+ years average, 500+ projects\n\nWe've been in your shoes - that's why our solutions work in practice, not just on paper. Want to connect with our team?",
      quickReplies: [
        { text: "Connect with team", intent: "lead_capture" },
        { text: "Explore Services", intent: "services" }
      ]
    };
  }

  // Contact/Get consultation
  if (intent === 'consultation') {
    return {
      text: "Great! I'd love to help you explore this further.\n\nTo give you the most relevant guidance, could you tell me:\n\n1. What type of institution are you?\n2. What's your main challenge right now?",
      quickReplies: [
        { text: "University", intent: "consultation", data: { institution: "university" } },
        { text: "College", intent: "consultation", data: { institution: "college" } },
        { text: "School", intent: "consultation", data: { institution: "school" } }
      ],
      transitionTo: 'lead_capture'
    };
  }

  // Contact
  if (intent === 'contact') {
    return {
      text: "You can reach us anytime:\n\n📧 Email: info@edify.com\n📞 Phone: +971 XX XXX XXX\n🌐 Website: www.edify.com\n\nOr I can connect you right now - just share your email and our team will reach out.",
      quickReplies: [
        { text: "Connect me", intent: "lead_capture" },
        { text: "Thanks, just browsing", intent: "greeting" }
      ],
      transitionTo: 'lead_capture'
    };
  }

  // Help/Support
  if (intent === 'help') {
    return {
      text: "I'm here to help! You can ask me about:\n\n• Our services (HR, Tech, Finance, etc.)\n• Why choose Edify\n• Pricing & consultations\n• Team & experience\n• Case studies & results\n\nWhat would you like to know?",
      quickReplies: [
        { text: "Services", intent: "services" },
        { text: "Why Edify?", intent: "benefits" },
        { text: "Pricing", intent: "pricing" }
      ]
    };
  }

  // Lead capture transition
  if (intent === 'lead_capture') {
    return {
      text: "Perfect! To connect you with the right consultant, could you share:\n\n📧 Your email address\n\nOur team will reach out with relevant information within 24 hours.",
      transitionTo: 'lead_capture'
    };
  }

  // Unknown intent - provide helpful guidance
  return {
    text: "I want to make sure I give you the right information. Could you tell me more about what you're looking for? For example:\n\n• Information about our services\n• How Edify can help your institution\n• Pricing and consultation\n• Case studies and results",
    quickReplies: [
      { text: "Services", intent: "services" },
      { text: "Why Edify?", intent: "benefits" },
      { text: "Get Consultation", intent: "consultation" }
    ]
  };
}

/**
 * Get follow-up response based on user's service interest
 */
export function getServiceFollowUp(service: ServiceType): string {
  const followUps: Record<ServiceType, string> = {
    hr: "Excellent choice! HR is foundational. We've helped institutions reduce hiring time by 60% and improve staff retention by 40%. Would you like to know how?",
    finance: "Smart move. Financial health enables everything else. Our clients typically see 25% cost reduction while improving quality. Interested in the details?",
    technology: "Technology is transforming education fast. We've guided 50+ institutions through digital transformation with measurable results. Shall I explain?",
    operations: "Operational efficiency directly impacts student experience. Our clients see 40% improvement in process efficiency. Want to know how?",
    infrastructure: "Infrastructure sets the foundation. We've helped institutions optimize space utilization by 35% while improving satisfaction. Curious about the approach?",
    student_development: "Student success is the ultimate goal. Institutions with strong development programs see 50% better outcomes. Would you like to explore?",
    all: "Great! Taking a comprehensive approach is often best. We create integrated solutions across all areas. Shall I walk you through how it works?"
  };
  return followUps[service] || followUps.all;
}

/**
 * Get institution-specific response
 */
export function getInstitutionResponse(institution: string): string {
  const institutionLower = institution.toLowerCase();

  if (institutionLower.includes('university') || institutionLower.includes('uni')) {
    return "Universities have unique complexities - we understand that. We've worked with 50+ universities on everything from HR transformation to digital systems.";
  }
  if (institutionLower.includes('college')) {
    return "Colleges need specialized support - we've helped 100+ colleges improve operations and student outcomes.";
  }
  if (institutionLower.includes('school')) {
    return "Schools require focused solutions - we've supported 200+ schools in streamlining processes and enhancing student development.";
  }

  return "Every institution is unique, and that's exactly how we approach it - with tailored solutions.";
}
