"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  X,
  Phone,
  MapPin,
  Bot,
  Send,
  User,
  Sparkles,
} from "lucide-react";

/* ─── Instagram SVG Icon ─────────────────────────────────────── */
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

/* ─── WhatsApp SVG Icon ──────────────────────────────────────── */
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

/* ─── Speed Dial Item ────────────────────────────────────────── */
interface DialItemProps {
  href?: string;
  onClick?: () => void;
  label: string;
  color: string;
  delay: string;
  isOpen: boolean;
  children: React.ReactNode;
  external?: boolean;
}

function DialItem({
  href,
  onClick,
  label,
  color,
  delay,
  isOpen,
  children,
  external = false,
}: DialItemProps) {
  const base =
    `flex items-center gap-3 group transition-all duration-300 ${delay} ` +
    (isOpen
      ? "opacity-100 translate-y-0 pointer-events-auto"
      : "opacity-0 translate-y-6 pointer-events-none");

  const btn = (
    <div
      className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white transition-transform hover:scale-110 ${color}`}
    >
      {children}
    </div>
  );

  const tooltip = (
    <span className="bg-background/90 backdrop-blur text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-border/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      {label}
    </span>
  );

  if (onClick) {
    return (
      <div className={base}>
        {tooltip}
        <button onClick={onClick} aria-label={label}>
          {btn}
        </button>
      </div>
    );
  }

  return (
    <div className={base}>
      {tooltip}
      <a
        href={href}
        aria-label={label}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {btn}
      </a>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleChatbot = () => {
    setIsOpen(false);
    setIsChatOpen(true);
  };

  return (
    <>
      {/* ── Speed Dial ──────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Child buttons */}
        <div className="flex flex-col items-end gap-3">
          {/* Instagram */}
          <DialItem
            href="https://vercel.com/2-de4e/tuwaiq-events"
            label="إنستقرام"
            color="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"
            delay="duration-[250ms]"
            isOpen={isOpen}
            external
          >
            <InstagramIcon className="w-5 h-5" />
          </DialItem>

          {/* Location */}
          <DialItem
            href="https://maps.app.goo.gl/17mBiWJeXtBDCjMF9?g_st=aw"
            label="موقعنا"
            color="bg-rose-500"
            delay="duration-[220ms]"
            isOpen={isOpen}
            external
          >
            <MapPin className="w-5 h-5" />
          </DialItem>

          {/* Call */}
          <DialItem
            href="tel:+966574257484"
            label="اتصال"
            color="bg-blue-500"
            delay="duration-[200ms]"
            isOpen={isOpen}
          >
            <Phone className="w-5 h-5" />
          </DialItem>

          {/* WhatsApp */}
          <DialItem
            href="https://wa.me/966574257484"
            label="واتساب"
            color="bg-green-500"
            delay="duration-[180ms]"
            isOpen={isOpen}
            external
          >
            <WhatsAppIcon className="w-5 h-5" />
          </DialItem>

          {/* Chatbot */}
          <DialItem
            onClick={handleChatbot}
            label="المساعد الذكي"
            color="bg-primary"
            delay="duration-[160ms]"
            isOpen={isOpen}
          >
            <Bot className="w-5 h-5" />
          </DialItem>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "إغلاق القائمة" : "فتح التواصل"}
          className={
            "w-16 h-16 rounded-full shadow-2xl shadow-primary/40 " +
            "bg-primary hover:bg-primary/90 text-primary-foreground " +
            "flex items-center justify-center transition-all duration-300 " +
            "hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
          }
        >
          <span
            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <MessageCircle className="w-7 h-7" />
            )}
          </span>
        </button>
      </div>

      {/* ── AI Chatbot Panel ─────────────────────────────── */}
      {isChatOpen && (
        <div className="fixed bottom-6 left-6 w-80 sm:w-96 bg-card border border-primary/20 rounded-2xl shadow-2xl shadow-primary/20 z-[100] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 origin-bottom-left">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between text-primary-foreground shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-1">
                  المساعد الذكي <Sparkles className="h-3 w-3 text-yellow-300" />
                </h3>
                <p className="text-[10px] text-primary-foreground/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  متصل الآن
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-white/20 rounded-full"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-[350px] overflow-y-auto flex flex-col gap-4 bg-muted/10">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === "user"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tl-sm"
                      : "bg-card border rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-2xl bg-card border text-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-card border-t flex gap-2 items-center"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اطرح سؤالك هنا..."
              className="flex-1 rounded-full border-muted-foreground/20 bg-muted/30 focus-visible:ring-primary/50"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full shadow-sm"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
