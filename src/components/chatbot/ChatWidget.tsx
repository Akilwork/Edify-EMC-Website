"use client";

import { useState, useEffect, useCallback } from 'react';
import { Message, QuickReply, LeadData } from './engine/types';
import { createChatbotEngine } from './engine/chatbotEngine';
import ChatWindow from './ChatWindow';
import { MessageCircle, X } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [engine] = useState(() => createChatbotEngine());

  // Initialize conversation when widget opens first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen, messages.length]);

  const initializeConversation = async () => {
    setIsTyping(true);
    try {
      const greetingMessage = await engine.startConversation();
      setMessages([greetingMessage]);
    } catch (error) {
      console.error('Failed to start conversation:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Process with engine
      const response = await engine.processUserMessage(text);

      // Add bot response(s)
      if (response.messages.length > 0) {
        setMessages(prev => [...prev, ...response.messages]);

        // If there's lead data, submit it
        if (response.leadData) {
          await submitLead(response.leadData);
        }
      }

      // Check if should hand to human
      if (response.shouldHandToHuman) {
        // Could trigger email or notification here
        console.log('Handing to human agent');
      }
    } catch (error) {
      console.error('Error processing message:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        sender: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = async (reply: QuickReply) => {
    // Add user message for the quick reply
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: reply.text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Process with engine
      const response = await engine.handleQuickReply(reply);

      // Add bot response(s)
      if (response.messages.length > 0) {
        setMessages(prev => [...prev, ...response.messages]);

        // If there's lead data, submit it
        if (response.leadData) {
          await submitLead(response.leadData);
        }
      }
    } catch (error) {
      console.error('Error processing quick reply:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const submitLead = async (leadData: LeadData) => {
    try {
      // Submit to API
      const response = await fetch('/api/chatbot/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        console.error('Failed to submit lead');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  return (
    <>
      {/* Floating Widget Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open chat"
        >
          <div className="relative">
            {/* Pulse effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping opacity-75" />

            {/* Button */}
            <div className="relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300">
              <MessageCircle className="text-white" size={28} />
            </div>

            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce">
                {unreadCount}
              </span>
            )}
          </div>
        </button>
      )}

      {/* Minimized Button (when chat is open but minimized) */}
      {isMinimized && (
        <button
          onClick={handleRestore}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label="Restore chat"
        >
          <MessageCircle className="text-white" size={28} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      <ChatWindow
        isOpen={isOpen && !isMinimized}
        onClose={handleClose}
        onMinimize={handleMinimize}
        onSendMessage={handleSendMessage}
        onQuickReply={handleQuickReply}
        messages={messages}
        isTyping={isTyping}
      />
    </>
  );
}
