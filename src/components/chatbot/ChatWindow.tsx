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
    <div className="fixed bottom-24 right-4 w-[calc(100%-2rem)] sm:w-[420px] h-[600px] max-h-[calc(100vh-8rem)] rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-500 ease-out backdrop-blur-xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-800/95 border border-white/10">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10">
        <div className="flex items-center gap-3">
          {/* Animated Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Bot size={24} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full animate-ping" />
          </div>

          <div>
            <h3 className="font-semibold text-white text-base">Edify Assistant</h3>
            <p className="text-xs text-cyan-300/80 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Always here to help
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110"
            aria-label="Minimize"
          >
            <Minimize2 size={18} className="text-white/70 hover:text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110"
            aria-label="Close"
          >
            <X size={18} className="text-white/70 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
        {/* Custom scrollbar */}
        <style>{`
          .chat-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .chat-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          .chat-scroll::-webkit-scrollbar-thumb {
            background: rgba(34, 211, 238, 0.3);
            border-radius: 10px;
          }
          .chat-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(34, 211, 238, 0.5);
          }
        `}</style>

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center">
              <Bot size={32} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-white/90 font-medium">Starting conversation...</p>
              <p className="text-white/50 text-sm mt-1">Give me a moment</p>
            </div>
          </div>
        )}

        {messages.map((message, idx) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
            style={{ animationDelay: `${Math.min(idx * 50, 200)}ms` }}
          >
            <div className={`flex items-end gap-2.5 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Bot size={16} className="text-white" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`relative px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl rounded-br-md shadow-lg shadow-cyan-500/25'
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-md shadow-lg'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                <span className={`text-[10px] mt-1.5 block ${message.sender === 'user' ? 'text-white/60' : 'text-white/40'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>

                {/* Gradient shine effect */}
                {message.sender === 'user' && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
                )}
              </div>

              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <User size={16} className="text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-left-2 fade-in duration-300">
            <div className="flex items-end gap-2.5">
              <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="relative px-5 py-3 border-t border-white/10 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="flex flex-wrap gap-2">
            {lastMessage.quickReplies!.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReplyClick(reply)}
                className="group relative px-4 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 rounded-2xl text-sm font-medium hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">{reply.text}</span>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-3 p-4 border-t border-white/10 bg-gradient-to-b from-slate-900/50 to-slate-900">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="w-full px-5 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            disabled={isTyping}
          />
          {/* Input glow effect on focus */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 pointer-events-none transition-opacity duration-300" id="input-glow" />
        </div>

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="group relative p-3.5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 overflow-hidden"
        >
          <div className="relative z-10">
            <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </form>
    </div>
  );
}
