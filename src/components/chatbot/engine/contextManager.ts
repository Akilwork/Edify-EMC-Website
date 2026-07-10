import { ConversationContext, ServiceType, InstitutionType, Message, LeadData } from './types';

/**
 * Context Manager - Handles conversation state and memory
 * Tracks what user has discussed, extracts lead data, manages flow
 */

export class ContextManager {
  private context: ConversationContext;
  private messages: Message[] = [];
  private startTime: Date;
  private conversationId: string;

  constructor() {
    this.conversationId = this.generateId();
    this.startTime = new Date();
    this.context = {
      stage: 'greeting',
      lastTopic: null,
      mentionedServices: [],
      userInterests: [],
      captureAttempts: 0
    };
  }

  private generateId(): string {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get current conversation context
   */
  getContext(): ConversationContext {
    return { ...this.context };
  }

  /**
   * Update conversation stage
   */
  setStage(stage: ConversationContext['stage']): void {
    this.context.stage = stage;
  }

  /**
   * Add mentioned service to context
   */
  addService(service: ServiceType): void {
    if (!this.context.mentionedServices.includes(service)) {
      this.context.mentionedServices.push(service);
    }
    this.context.lastTopic = service;
  }

  /**
   * Add user interest to context
   */
  addInterest(interest: string): void {
    if (!this.context.userInterests.includes(interest)) {
      this.context.userInterests.push(interest);
    }
  }

  /**
   * Set institution type
   */
  setInstitutionType(type: InstitutionType): void {
    this.context.institutionType = type;
  }

  /**
   * Add message to history
   */
  addMessage(message: Message): void {
    this.messages.push(message);
  }

  /**
   * Get all messages
   */
  getMessages(): Message[] {
    return [...this.messages];
  }

  /**
   * Increment capture attempts (for email/contact info)
   */
  incrementCaptureAttempts(): void {
    this.context.captureAttempts++;
  }

  /**
   * Check if should move to lead capture
   */
  shouldCaptureLead(): boolean {
    // Conditions for lead capture:
    // 1. User has expressed interest in specific service
    // 2. User has asked about consultation/pricing
    // 3. Conversation has some depth (at least 4 messages)
    // 4. Haven't asked for contact yet
    const hasServiceInterest = this.context.mentionedServices.length > 0;
    const hasConversationDepth = this.messages.length >= 4;
    const isNewConversation = this.context.captureAttempts === 0;

    return (hasServiceInterest && hasConversationDepth) ||
           this.context.stage === 'qualifying' ||
           (isNewConversation && this.messages.length >= 6);
  }

  /**
   * Generate lead data from conversation
   */
  generateLeadData(email?: string): LeadData {
    const summary = this.generateConversationSummary();
    const qualified = this.isQualifiedLead();

    return {
      timestamp: this.startTime.toISOString(),
      serviceInterest: this.context.mentionedServices[0],
      institutionType: this.context.institutionType,
      email: email,
      conversationSummary: summary,
      messageCount: this.messages.length,
      qualified,
      conversationId: this.conversationId
    };
  }

  /**
   * Generate natural conversation summary
   */
  private generateConversationSummary(): string {
    const parts: string[] = [];

    if (this.context.mentionedServices.length > 0) {
      parts.push(`Interested in: ${this.context.mentionedServices.join(', ')}`);
    }

    if (this.context.institutionType) {
      parts.push(`Institution: ${this.context.institutionType}`);
    }

    if (this.context.userInterests.length > 0) {
      parts.push(`Topics: ${this.context.userInterests.slice(0, 3).join(', ')}`);
    }

    return parts.join('. ') || 'General inquiry about Edify services';
  }

  /**
   * Determine if this is a qualified lead
   */
  private isQualifiedLead(): boolean {
    // Qualified if:
    // - Has mentioned specific service interest
    // - Conversation has depth
    // - Or explicitly asked for consultation
    return this.context.mentionedServices.length > 0 &&
           this.messages.length >= 4 &&
           this.context.stage !== 'greeting';
  }

  /**
   * Get conversation duration in seconds
   */
  getDuration(): number {
    return Math.floor((Date.now() - this.startTime.getTime()) / 1000);
  }

  /**
   * Reset context (for new conversation)
   */
  reset(): void {
    this.conversationId = this.generateId();
    this.startTime = new Date();
    this.context = {
      stage: 'greeting',
      lastTopic: null,
      mentionedServices: [],
      userInterests: [],
      captureAttempts: 0
    };
    this.messages = [];
  }

  /**
   * Check if conversation should be handed to human
   */
  shouldHandToHuman(): boolean {
    // Hand to human if:
    // - User seems frustrated (multiple messages with "help", "confused", etc.)
    // - Asked for "human", "person", "agent", "real person"
    // - Complex question repeated multiple times
    const lastMessages = this.messages.slice(-3);
    const humanKeywords = ['human', 'person', 'agent', 'real person', 'speak to someone'];
    const frustrationKeywords = ['frustrated', 'confused', 'not helpful', 'don\'t understand'];

    for (const msg of lastMessages) {
      if (msg.sender === 'user') {
        const text = msg.text.toLowerCase();
        if (humanKeywords.some(k => text.includes(k)) ||
            frustrationKeywords.some(k => text.includes(k))) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check if conversation is ending
   */
  isConversationEnding(userMessage: string): boolean {
    const endingKeywords = ['bye', 'goodbye', 'thanks', 'thank you', 'that\'s all', 'done', 'nothing else'];
    const text = userMessage.toLowerCase();
    return endingKeywords.some(k => text.includes(k));
  }
}

/**
 * Create a new context manager instance
 */
export function createContextManager(): ContextManager {
  return new ContextManager();
}
