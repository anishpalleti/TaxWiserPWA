import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const SYSTEM_PROMPT = "You are the TaxWiser AI Assistant. Your goal is to simplify tax concepts for low-to-moderate-income US filers. Never give direct, binding legal logic, and always tell them to speak to a Certified VITA volunteer for formal tax preparation.";

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm the TaxWiser AI Assistant. How can I help you understand your taxes today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error("Missing VITE_ANTHROPIC_API_KEY in .env");
      }

      // Convert messages for the Anthropic API
      const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
      apiMessages.push({ role: 'user', content: userMsg });
      
      // Filter out the initial welcome message from the array going to the API if needed, 
      // but Claude allows assistant messages. We just send it.

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerously-allow-browser": "true",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.content[0].text;

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I ran into an error connecting to my brain. Please check the API key setup." }]);
    } finally {
      setLoading(false);
    }
  };

  const starterQuestions = [
    "What is the standard deduction for 2024?",
    "Explain the Child Tax Credit simply.",
    "Do I need to file taxes if I made $10,000?"
  ];

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col bg-[#111] border border-surface rounded-2xl overflow-hidden relative shadow-2xl">
      {/* Header */}
      <div className="bg-surface p-4 border-b border-[#2a2a2a] flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,200,83,0.2)]">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg leading-tight">TaxWiser AI</h2>
          <p className="text-xs text-gray-400">Powered by Anthropic Claude</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-[#333]' : 'bg-primary/20'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-gray-300" /> : <Bot className="w-4 h-4 text-primary" />}
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-surface border border-[#333] text-gray-100 rounded-tr-sm' 
                : 'bg-[#1a1a1a] border border-primary/20 text-gray-300 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
            <div className="shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-primary/20 text-gray-500 text-sm rounded-tl-sm flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce delay-150"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce delay-300"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Constraints & Chips */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {starterQuestions.map(q => (
               <button 
                key={q} 
                onClick={() => setInput(q)}
                className="bg-surface hover:bg-primary/10 border border-[#333] hover:border-primary/50 text-xs text-gray-300 px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
               </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-[#0a0a0a] border-t border-surface">
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask a tax question..."
            className="flex-1 bg-surface border border-[#333] focus:border-primary/50 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-primary text-black rounded-xl flex items-center justify-center hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
