import { Message, IntentType, QuickReply, ServiceType, InstitutionType } from './types';
import { detectIntent, extractService, extractInstitution, extractEmail, isGratitude, wantsToContinue, wantsToStop } from './intentEngine';
import { getResponse, getServiceFollowUp, getInstitutionResponse } from './knowledgeBase';
import { ContextManager, createContextManager } from './contextManager';

/**
 * Chatbot Engine - Main orchestrator
 * Ties together intent detection, knowledge base, and context management
 */

export class ChatbotEngine {
  private contextManager: ContextManager;
  private isProcessing: boolean = false;

  constructor() {
    this.contextManager = createContextManager();
  }

  /**
   * Process user message and generate bot response
   */
  async processUserMessage(userText: string, email?: string): Promise<{
    messages: Message[];
    leadData?: any;
    shouldHandToHuman?: boolean;
  }> {
    if (this.isProcessing) {
      return { messages: [] };
    }

    this.isProcessing = true;

    try {
      // Add user message to history
      const userMessage: Message = {
        id: this.generateMessageId(),
        sender: 'user',
        text: userText,
        timestamp: new Date()
      };
      this.contextManager.addMessage(userMessage);

      // Check special cases
      if (this.isGratitude(userText)) {
        return {
          messages: [{
            id: this.generateMessageId(),
            sender: 'bot',
            text: "You're welcome! Is there anything else I can help you with?",
            timestamp: new Date(),
            quickReplies: [
              { text: "Yes, I have questions", intent: "help" },
              { text: "That's all, thanks!", intent: "greeting" }
            ]
          }]
        };
      }

      if (this.wantsToStop(userText)) {
        return {
          messages: [{
            id: this.generateMessageId(),
            sender: 'bot',
            text: "It was great chatting with you! If you need anything in the future, just click the chat bubble. Have a wonderful day! 👋",
            timestamp: new Date()
          }],
          leadData: this.contextManager.generateLeadData(email)
        };
      }

      // Detect intent
      const intentMatch = detectIntent(userText);
      const context = this.contextManager.getContext();

      // Extract data from message
      const extractedService = intentMatch.extractedData?.service || extractService(userText);
      const extractedInstitution = intentMatch.extractedData?.institution || extractInstitution(userText);
      const extractedEmail = intentMatch.extractedData?.email || extractEmail(userText);

      // Update context
      if (extractedService) {
        this.contextManager.addService(extractedService);
      }
      if (extractedInstitution) {
        this.contextManager.setInstitutionType(extractedInstitution);
      }
      if (extractedEmail) {
        email = extractedEmail;
      }

      // Get response from knowledge base
      const response = getResponse(intentMatch.intent, {
        mentionedServices: context.mentionedServices,
        stage: context.stage,
        previousIntent: context.lastTopic as IntentType | undefined
      });

      // Check if should hand to human
      if (this.contextManager.shouldHandToHuman()) {
        return {
          messages: [{
            id: this.generateMessageId(),
            sender: 'bot',
            text: "I understand you'd like to speak with someone. Let me connect you with our team.",
            timestamp: new Date()
          }],
          shouldHandToHuman: true,
          leadData: this.contextManager.generateLeadData(email)
        };
      }

      // Build bot message
      const botMessage: Message = {
        id: this.generateMessageId(),
        sender: 'bot',
        text: response.text,
        timestamp: new Date(),
        intent: intentMatch.intent,
        quickReplies: response.quickReplies
      };

      // Update stage based on response
      if (response.transitionTo === 'lead_capture') {
        this.contextManager.setStage('lead_capture');
      } else if (context.stage === 'greeting' && intentMatch.intent !== 'greeting') {
        this.contextManager.setStage('exploring');
      } else if (context.stage === 'exploring' && this.contextManager.shouldCaptureLead()) {
        this.contextManager.setStage('qualifying');
      }

      this.contextManager.addMessage(botMessage);

      // Generate lead data if appropriate
      let leadData;
      if (response.transitionTo === 'lead_capture' || this.contextManager.shouldCaptureLead()) {
        leadData = this.contextManager.generateLeadData(email);
      }

      // Add typing indicator effect (simulated)
      await this.simulateTyping();

      return {
        messages: [botMessage],
        leadData
      };

    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Handle quick reply button click
   */
  async handleQuickReply(reply: QuickReply): Promise<{
    messages: Message[];
    leadData?: any;
  }> {
    // Process the quick reply as if it were a user message
    let userText = reply.text;

    // Add context from quick reply data
    if (reply.data) {
      if (reply.data.institution) {
        this.contextManager.setInstitutionType(reply.data.institution as InstitutionType);
      }
      if (reply.data.focus) {
        this.contextManager.addInterest(reply.data.focus);
      }
    }

    return this.processUserMessage(userText);
  }

  /**
   * Start a new conversation (initial greeting)
   */
  async startConversation(): Promise<Message> {
    const context = this.contextManager.getContext();

    const greetingMessage: Message = {
      id: this.generateMessageId(),
      sender: 'bot',
      text: "Hi! I'm Edify Assistant. How can I help you today?",
      timestamp: new Date(),
      quickReplies: [
        { text: "Explore Services", intent: "services" },
        { text: "Get Consultation", intent: "consultation" },
        { text: "Why Edify?", intent: "benefits" }
      ]
    };

    this.contextManager.addMessage(greetingMessage);
    this.contextManager.setStage('greeting');

    return greetingMessage;
  }

  /**
   * Submit lead data
   */
  async submitLead(email?: string): Promise<LeadData> {
    return this.contextManager.generateLeadData(email);
  }

  /**
   * Get conversation history
   */
  getConversationHistory(): Message[] {
    return this.contextManager.getMessages();
  }

  /**
   * Reset conversation
   */
  resetConversation(): void {
    this.contextManager.reset();
  }

  /**
   * Get context info
   */
  getContext() {
    return this.contextManager.getContext();
  }

  // Helper methods
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async simulateTyping(): Promise<void> {
    // Simulate bot thinking/typing (500-1500ms)
    const delay = Math.random() * 1000 + 500;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  private isGratitude(message: string): boolean {
    return isGratitude(message);
  }

  private wantsToStop(message: string): boolean {
    return wantsToStop(message);
  }
}

/**
 * Create a new chatbot engine instance
 */
export function createChatbotEngine(): ChatbotEngine {
  return new ChatbotEngine();
}
