// Chatbot Types and Interfaces

export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
  intent?: string;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  text: string;
  intent: string;
  data?: Record<string, any>;
}

export type IntentType =
  | 'greeting'
  | 'consultation'
  | 'services'
  | 'pricing'
  | 'benefits'
  | 'team'
  | 'contact'
  | 'hr'
  | 'finance'
  | 'technology'
  | 'operations'
  | 'infrastructure'
  | 'student_development'
  | 'case_study'
  | 'help'
  | 'unknown'
  | 'lead_capture';

export type InstitutionType = 'university' | 'college' | 'school' | 'other';

export interface ConversationContext {
  stage: 'greeting' | 'exploring' | 'qualifying' | 'lead_capture' | 'closing';
  lastTopic: string | null;
  mentionedServices: ServiceType[];
  userInterests: string[];
  institutionType?: InstitutionType;
  captureAttempts: number;
}

export type ServiceType =
  | 'hr'
  | 'finance'
  | 'technology'
  | 'operations'
  | 'infrastructure'
  | 'student_development'
  | 'all';

export interface LeadData {
  timestamp: string;
  serviceInterest?: ServiceType;
  institutionType?: InstitutionType;
  email?: string;
  conversationSummary: string;
  messageCount: number;
  qualified: boolean;
  conversationId: string;
}

export interface IntentMatch {
  intent: IntentType;
  confidence: number;
  extractedData?: {
    service?: ServiceType;
    institution?: InstitutionType;
    email?: string;
  };
}
