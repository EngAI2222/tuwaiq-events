"use client";

import { useState, useRef, useEffect } from "react";
import { X, Bot, Send, User, Sparkles, Phone, Plus, MapPin } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.374 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.828L.057 23.998l6.305-1.654A11.954 11.954 0 0 0 12 24c6.626 0 12-5.373 12-12S18.626 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.367l-.359-.214-3.741.981.999-3.648-.235-.375A9.772 9.772 0 0 1 2.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
    </svg>
  );
}

export function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

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
      {/* ── Social Speed Dial (Bottom-Left) ───────────────────── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-center gap-3">
        {/* Main Toggle Button */}
        <button
          onClick={() => setIsSocialOpen(!isSocialOpen)}
          aria-label={isSocialOpen ? "إغلاق قائمة التواصل" : "فتح قائمة التواصل"}
          className={`
            relative w-14 h-14 rounded-full flex items-center justify-center
            bg-black/60 backdrop-blur-xl border border-white/10
            text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]
            transition-all duration-300 focus:outline-none
          `}
        >
          <Plus
            className={`absolute w-6 h-6 transition-all duration-300 ${
              isSocialOpen ? "rotate-45 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            className={`absolute w-6 h-6 transition-all duration-300 ${
              isSocialOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-0 opacity-0"
            }`}
          />
        </button>

        {/* Dial Items */}
        <div
          className={`flex flex-col-reverse items-center gap-3 transition-all duration-500 ease-out ${
            isSocialOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {/* Location (Map Pin) — delay 150ms */}
          <div className="group relative" style={{ transitionDelay: isSocialOpen ? "150ms" : "0ms" }}>
            <a
              href="https://maps.app.goo.gl/17mBiWJeXtBDCjMF9?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="الموقع"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-white hover:text-[#D4AF37] hover:scale-110 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <MapPin className="w-5 h-5" />
            </a>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
              الموقع
            </span>
          </div>

          {/* Instagram — delay 100ms */}
          <div className="group relative" style={{ transitionDelay: isSocialOpen ? "100ms" : "0ms" }}>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="انستقرام"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-white hover:text-[#D4AF37] hover:scale-110 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
              انستقرام
            </span>
          </div>

          {/* Phone — delay 50ms */}
          <div className="group relative" style={{ transitionDelay: isSocialOpen ? "50ms" : "0ms" }}>
            <a
              href="tel:+966574257484"
              aria-label="اتصال"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-white hover:text-[#D4AF37] hover:scale-110 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
            </a>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
              اتصال
            </span>
          </div>

          {/* WhatsApp — delay 0ms (appears first) */}
          <div className="group relative" style={{ transitionDelay: "0ms" }}>
            <a
              href="https://wa.me/966574257484"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 text-white hover:text-[#D4AF37] hover:scale-110 hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:block">
              واتساب
            </span>
          </div>
        </div>
      </div>

      {/* ── AI Assistant FAB (Bottom-Right) ───────────────────── */}
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
