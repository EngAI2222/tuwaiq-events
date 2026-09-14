"use client";

import { useState } from "react";
import { X, Phone, MapPin, Share2 } from "lucide-react";

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
  const [isSocialOpen, setIsSocialOpen] = useState(false);

  return (
    <>
      {/* ── Social Speed Dial (Bottom-Left) ───────────────────── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-center gap-3">
        {/* Main Toggle Button */}
        <div className="relative">
          <button
            onClick={() => setIsSocialOpen(!isSocialOpen)}
            aria-label={isSocialOpen ? "إغلاق قائمة التواصل" : "فتح قائمة التواصل"}
            className={`
              relative w-14 h-14 rounded-full flex items-center justify-center
              bg-black/60 backdrop-blur-xl border border-white/10
              text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]
              transition-all duration-300 focus:outline-none z-10
            `}
          >
            <Share2
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

          {/* Glassmorphic Tooltip */}
          {!isSocialOpen && (
            <div className="hidden sm:flex absolute left-16 top-1/2 -translate-y-1/2 items-center justify-center px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.2)] animate-pulse pointer-events-none">
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-[#D4AF37]/30" />
              <div className="absolute -left-[3px] top-1/2 -translate-y-1/2 border-y-[3px] border-y-transparent border-r-[3px] border-r-black/60 z-10" />
              <span className="text-[#F3E5AB] text-sm font-semibold tracking-wide whitespace-nowrap">
                تواصل معنا
              </span>
            </div>
          )}
        </div>

        {/* Dial Items */}
        <div
          className={`flex flex-col-reverse items-center gap-3 transition-all duration-500 ease-out ${
            isSocialOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          {/* Location (Map Pin) — delay 150ms */}
          <div className="group relative" style={{ transitionDelay: isSocialOpen ? "150ms" : "0ms" }}>
            <a
              href="https://maps.app.goo.gl/QrMvv7oZLZwQ1iw46?g_st=aw"
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
              href="https://www.instagram.com/hflatayfns?utm_source=qr&stkn=MW1taTgzYjhzaW1waw%3D%3D"
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
              href="tel:0547498239"
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
    </>
  );
}
