"use client";

import { useState, useEffect } from 'react';
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [engine] = useState(() => createChatbotEngine());

  // Initialize conversation when widget opens first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeConversation();
    }
  }, [isOpen, messages.length]);

  // Show tooltip after 3 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 3000);

    return () => clearTimeout(timer);
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
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await engine.processUserMessage(text);

      if (response.messages.length > 0) {
        setMessages(prev => [...prev, ...response.messages]);

        if (response.leadData) {
          await submitLead(response.leadData);
        }
      }

      if (response.shouldHandToHuman) {
        console.log('Handing to human agent');
      }
    } catch (error) {
      console.error('Error processing message:', error);
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
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: reply.text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await engine.handleQuickReply(reply);

      if (response.messages.length > 0) {
        setMessages(prev => [...prev, ...response.messages]);

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
      const response = await fetch('/api/chatbot/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    setShowTooltip(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    // Reset conversation so reopening starts a fresh chat for every visitor
    setMessages([]);
    engine.resetConversation();
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
        <div className="fixed bottom-8 right-8 z-50">
          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full right-0 mb-4 w-64 p-4 bg-black border border-white/10 rounded-2xl shadow-xl animate-in slide-in-from-bottom-2 fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">Need help?</p>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">Chat with Edify Assistant to learn about our services and get your questions answered.</p>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-black border-r border-b border-white/10 transform rotate-45" />
            </div>
          )}

          <button
            onClick={handleOpen}
            className="group relative w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-white/85 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open chat"
          >
            <MessageCircle className="text-black" size={26} strokeWidth={2} />

            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E8C97A] text-black text-[11px] rounded-full flex items-center justify-center font-bold shadow-md ring-2 ring-black">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Minimized Button */}
      {isMinimized && (
        <button
          onClick={handleRestore}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-white/85 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Restore chat"
        >
          <MessageCircle className="relative z-10 text-black" size={26} strokeWidth={2} />

          {/* Unread badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E8C97A] text-black text-[11px] rounded-full flex items-center justify-center font-bold shadow-md ring-2 ring-black">
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
