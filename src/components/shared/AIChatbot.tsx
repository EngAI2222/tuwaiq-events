"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "أهلاً بك في لمسة إيفنس للمناسبات الفاخرة! كيف يمكنني مساعدتك في تصميم وتجهيز مناسبتك اليوم؟" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: "assistant", content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-[100] group flex items-center gap-3">
          <div className="hidden sm:flex bg-primary text-primary-foreground px-4 py-2 rounded-2xl shadow-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
            تحدث مع المساعد الذكي
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="h-16 w-16 rounded-full shadow-2xl shadow-primary/50 bg-primary hover:bg-primary/90 hover:scale-110 transition-all flex items-center justify-center p-0 relative"
          >
            <Bot className="h-8 w-8 text-primary-foreground" />
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 left-6 w-80 sm:w-96 bg-card border border-primary/20 rounded-2xl shadow-2xl shadow-primary/20 z-[100] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 origin-bottom-left">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between text-primary-foreground shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold flex items-center gap-1">المساعد الذكي <Sparkles className="h-3 w-3 text-yellow-300" /></h3>
                <p className="text-[10px] text-primary-foreground/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> متصل الآن
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 rounded-full" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-[350px] overflow-y-auto flex flex-col gap-4 bg-muted/10">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === "user" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tl-sm" : "bg-card border rounded-tr-sm"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-card border-t flex gap-2 items-center">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اطرح سؤالك هنا..." 
              className="flex-1 rounded-full border-muted-foreground/20 bg-muted/30 focus-visible:ring-primary/50"
            />
            <Button type="submit" size="icon" className="rounded-full shadow-sm" disabled={!input.trim()}>
              <Send className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

