"use client";

import { useState, useRef, useEffect } from 'react';
import { Message, QuickReply } from './engine/types';
import { Send, X, Minimize2, Bot, User } from 'lucide-react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSendMessage: (text: string) => Promise<void>;
  onQuickReply: (reply: QuickReply) => Promise<void>;
  messages: Message[];
  isTyping: boolean;
}

export default function ChatWindow({
  isOpen,
  onClose,
  onMinimize,
  onSendMessage,
  onQuickReply,
  messages,
  isTyping
}: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText('');
    setMessageIndex(prev => prev + 1);
    await onSendMessage(text);
  };

  const handleQuickReplyClick = async (reply: QuickReply) => {
    setMessageIndex(prev => prev + 1);
    await onQuickReply(reply);
  };

  if (!isOpen) return null;

  // Get last message's quick replies (if it's a bot message)
  const lastMessage = messages[messages.length - 1];
  const showQuickReplies = lastMessage?.sender === 'bot' && lastMessage.quickReplies && lastMessage.quickReplies.length > 0;

  return (
    <div className="fixed bottom-24 right-4 w-[calc(100%-2rem)] sm:w-[390px] h-[600px] max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 ease-out bg-white ring-1 ring-black/5">
      {/* Header — white with brand-teal accents */}
      <div className="relative flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#3ABAB4]/10 flex items-center justify-center ring-1 ring-[#3ABAB4]/20">
              <Bot size={20} className="text-[#3ABAB4]" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ABAB4] rounded-full border-2 border-white" />
          </div>

          <div className="leading-tight">
            <h3 className="font-semibold text-gray-900 text-[15px]">Edify Assistant</h3>
            <p className="text-gray-400 text-[11px] font-medium uppercase tracking-[0.2em]">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={onMinimize}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Minimize"
          >
            <Minimize2 size={18} className="text-gray-500" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Close"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages Area — light surface */}
      <div className="relative flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth bg-gray-50 chat-scroll">
        {/* Custom scrollbar */}
        <style>{`
          .chat-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .chat-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .chat-scroll::-webkit-scrollbar-thumb {
            background: rgba(58, 186, 180, 0.4);
            border-radius: 10px;
          }
          .chat-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(58, 186, 180, 0.6);
          }
        `}</style>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#3ABAB4]/10 flex items-center justify-center">
              <Bot size={26} className="text-[#3ABAB4]" />
            </div>
            <div>
              <p className="text-gray-800 font-medium text-sm">Starting conversation…</p>
              <p className="text-gray-400 text-xs mt-1">Give me a moment</p>
            </div>
          </div>
        )}

        {messages.map((message, idx) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
            style={{ animationDelay: `${Math.min(idx * 40, 160)}ms` }}
          >
            <div className={`flex items-end gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#3ABAB4] flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`px-3.5 py-2.5 ${
                  message.sender === 'user'
                    ? 'bg-[#3ABAB4] text-white rounded-2xl rounded-br-md'
                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-100 shadow-sm'
                }`}
              >
                <p className="text-[13.5px] whitespace-pre-wrap leading-relaxed">{message.text}</p>
              </div>

              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E8C97A] flex items-center justify-center">
                  <User size={14} className="text-black" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-left-2 fade-in duration-300">
            <div className="flex items-end gap-2">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-teal flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-gray-100 shadow-sm">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-[#3ABAB4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-[#3ABAB4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-[#3ABAB4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies — outlined brand pills */}
      {showQuickReplies && (
        <div className="relative px-4 pt-3 pb-2 bg-white border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {lastMessage.quickReplies!.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReplyClick(reply)}
                className="px-3.5 py-2 bg-white border border-[#3ABAB4] text-[#3ABAB4] rounded-full text-[13px] font-medium hover:bg-[#3ABAB4] hover:text-white transition-colors duration-200 active:scale-[0.97]"
              >
                {reply.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area — white footer */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2 p-3 bg-white border-t border-gray-100">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message…"
            className="w-full px-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#3ABAB4] focus:ring-2 focus:ring-[#3ABAB4]/15 transition-all duration-200"
            disabled={isTyping}
          />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#3ABAB4] text-white rounded-full hover:bg-[#2ea8a2] active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
