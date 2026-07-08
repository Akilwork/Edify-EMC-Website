import { IntentType, ServiceType, InstitutionType, IntentMatch } from './types';

/**
 * Intent Engine - Pattern matching for user queries
 * Detects what user wants based on keywords and phrases
 */

// Intent patterns with keywords
const INTENT_PATTERNS: Record<IntentType, string[]> = {
  greeting: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'start', 'begin'],
  consultation: ['consultation', 'enquiry', 'get started', 'interested', 'help me', 'want to', 'need help', 'discuss'],
  services: ['service', 'offer', 'provide', 'offerings', 'solutions', 'capabilities', 'what do you', 'what does edify'],
  pricing: ['price', 'cost', 'how much', 'pricing', 'fees', 'charges', 'rate', 'quote', 'budget', 'afford'],
  benefits: ['benefit', 'advantage', 'why choose', 'why edify', 'better', 'difference', 'pro', 'reason'],
  team: ['team', 'who', 'people', 'expert', 'consultant', 'professional', 'staff', 'your team'],
  contact: ['contact', 'reach', 'call', 'email', 'phone', 'speak', 'talk to', 'connect', 'address'],
  hr: ['hr', 'human resource', 'human resources', 'recruit', 'hiring', 'staffing', 'workforce', 'personnel', 'talent'],
  finance: ['finance', 'financial', 'budget', 'accounting', 'cost management', 'revenue', 'fund', 'investment'],
  technology: ['tech', 'technology', 'digital', 'software', 'it', 'system', 'automation', 'digital transformation', 'tech stack'],
  operations: ['operation', 'operational', 'process', 'workflow', 'efficiency', 'streamline', 'optimization', 'procedure'],
  infrastructure: ['infrastructure', 'facility', 'campus', 'building', 'physical', 'amenities', 'space'],
  student_development: ['student', 'learner', 'education', 'learning', 'development', 'skill', 'training'],
  case_study: ['case study', 'example', 'success story', 'result', 'before after', 'achievement', 'worked with'],
  help: ['help', 'support', 'assist', 'question', 'clarification', 'unclear', 'confused'],
  unknown: [],
  lead_capture: []
};

// Service type mappings
const SERVICE_KEYWORDS: Record<ServiceType, string[]> = {
  hr: ['hr', 'human resources', 'recruitment', 'hiring', 'staffing', 'workforce', 'talent', 'personnel'],
  finance: ['finance', 'financial', 'budget', 'accounting', 'cost management', 'revenue', 'fund'],
  technology: ['tech', 'technology', 'digital', 'software', 'it', 'system', 'automation', 'digital transformation'],
  operations: ['operations', 'operational', 'process', 'workflow', 'efficiency', 'streamline', 'optimization'],
  infrastructure: ['infrastructure', 'facility', 'campus', 'building', 'physical', 'amenities'],
  student_development: ['student', 'learner', 'education', 'learning', 'development', 'skill', 'training'],
  all: ['all', 'everything', 'complete', 'full', 'entire', 'whole package']
};

// Institution type mappings
const INSTITUTION_KEYWORDS: Record<InstitutionType, string[]> = {
  university: ['university', 'uni', 'college university'],
  college: ['college', 'colleges'],
  school: ['school', 'schools', 'k-12', 'primary', 'secondary', 'high school'],
  other: ['institute', 'institution', 'academy', 'center', 'organisation']
};

/**
 * Extract service type from user message
 */
export function extractService(message: string): ServiceType | undefined {
  const lower = message.toLowerCase();

  for (const [service, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return service as ServiceType;
    }
  }
  return undefined;
}

/**
 * Extract institution type from user message
 */
export function extractInstitution(message: string): InstitutionType | undefined {
  const lower = message.toLowerCase();

  for (const [institution, keywords] of Object.entries(INSTITUTION_KEYWORDS)) {
    if (keywords.some(keyword => lower.includes(keyword))) {
      return institution as InstitutionType;
    }
  }
  return undefined;
}

/**
 * Extract email from message
 */
export function extractEmail(message: string): string | undefined {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = message.match(emailRegex);
  return match ? match[0] : undefined;
}

/**
 * Detect intent from user message
 */
export function detectIntent(message: string): IntentMatch {
  const lower = message.toLowerCase();
  let bestMatch: IntentType = 'unknown';
  let highestConfidence = 0;

  // Check each intent pattern
  for (const [intent, keywords] of Object.entries(INTENT_PATTERNS)) {
    if (intent === 'unknown' || intent === 'lead_capture') continue;

    const matchCount = keywords.filter(keyword => lower.includes(keyword)).length;
    const confidence = matchCount / keywords.length;

    if (matchCount > 0 && confidence > highestConfidence) {
      bestMatch = intent as IntentType;
      highestConfidence = confidence;
    }
  }

  // Extract additional data
  const extractedData = {
    service: extractService(message),
    institution: extractInstitution(message),
    email: extractEmail(message)
  };

  return {
    intent: bestMatch,
    confidence: highestConfidence,
    extractedData
  };
}

/**
 * Check if message contains gratitude
 */
export function isGratitude(message: string): boolean {
  const gratitudeKeywords = ['thank', 'thanks', 'appreciate', 'helpful', 'great', 'good', 'perfect'];
  return gratitudeKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

/**
 * Check if user wants to continue conversation
 */
export function wantsToContinue(message: string): boolean {
  const continueKeywords = ['yes', 'yeah', 'sure', 'okay', 'ok', 'continue', 'go on', 'tell me', 'more'];
  return continueKeywords.some(keyword => message.toLowerCase().includes(keyword));
}

/**
 * Check if user wants to stop conversation
 */
export function wantsToStop(message: string): boolean {
  const stopKeywords = ['no', 'nope', 'stop', 'that\'s it', 'enough', 'done', 'bye', 'goodbye'];
  return stopKeywords.some(keyword => message.toLowerCase().includes(keyword));
}
