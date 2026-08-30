"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Bot, Send, User, Sparkles } from "lucide-react";

export function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Chatbot state
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "أهلاً بك في لمسة إيفنس للمناسبات الفاخرة! كيف يمكنني مساعدتك في تصميم وتجهيز مناسبتك اليوم؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ── AI Assistant FAB ──────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {/* Glassmorphic Tooltip */}
        {!isChatOpen && (
          <div className="hidden sm:flex items-center justify-center px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-pulse">
            <span className="text-[#F3E5AB] text-sm font-semibold tracking-wide whitespace-nowrap">
              المساعد الذكي
            </span>
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-l-4 border-l-black/60" />
          </div>
        )}

        {/* Main AI Button */}
        <button
          onClick={() => setIsChatOpen((v) => !v)}
          aria-label={isChatOpen ? "إغلاق المساعد الذكي" : "فتح المساعد الذكي"}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            bg-gradient-to-r from-[#BF953F] to-[#D4AF37] text-white
            ring-2 ring-white/20 shadow-[0_0_30px_rgba(212,175,55,0.5)]
            transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-4
            ${!isChatOpen ? "animate-bounce hover:animate-none" : ""}
          `}
        >
          <div className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-50 animate-pulse blur-md" />
          <span
            className={`relative z-10 transition-transform duration-300 ${
              isChatOpen ? "rotate-90 scale-110" : "rotate-0"
            }`}
          >
            {isChatOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <Bot className="w-7 h-7 text-white" />
            )}
          </span>
        </button>
      </div>

      {/* ── AI Chatbot Panel ─────────────────────────────── */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-6 w-[90vw] max-w-[380px] bg-[#0f1117]/95 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-3xl shadow-2xl shadow-[#D4AF37]/20 z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#BF953F]/20 to-[#D4AF37]/10 p-5 flex items-center justify-between border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-3">
              <div className="bg-[#D4AF37]/20 p-2.5 rounded-2xl border border-[#D4AF37]/30">
                <Sparkles className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-bold text-white flex items-center gap-1.5 text-lg">
                  المساعد الذكي
                </h3>
                <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)] animate-pulse" />
                  متصل الآن
                </p>
              </div>
            </div>
            <button
              className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 h-[380px] overflow-y-auto flex flex-col gap-5 bg-black/20">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                    msg.role === "user"
                      ? "bg-white/10 border-white/20 text-white"
                      : "bg-[#D4AF37]/20 border-[#D4AF37]/30 text-[#D4AF37]"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`p-3.5 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#D4AF37] text-black font-medium rounded-tl-sm"
                      : "bg-[#1a1d24] border border-white/10 text-gray-200 rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-4 rounded-2xl bg-[#1a1d24] border border-white/10 flex items-center gap-1.5 rounded-tr-sm">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-4 bg-[#0f1117] border-t border-white/10 flex gap-3 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-11 w-11 rounded-full bg-[#D4AF37] hover:bg-[#F3E5AB] disabled:opacity-50 disabled:hover:bg-[#D4AF37] text-black flex items-center justify-center shrink-0 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Send className="h-5 w-5 rtl:rotate-180 -ml-1" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
