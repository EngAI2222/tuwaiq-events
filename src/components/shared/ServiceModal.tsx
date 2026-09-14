"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowLeft, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Service = {
  id: string;
  title?: string;
  caption?: string;   // gallery items use this instead of title
  description?: string;
  price?: string;
  imageURL: string;
  category: string;
  createdAt?: string;
};

export function displayTitle(s: Service) {
  return s.title || s.caption || "";
}

export function ServiceModal({
  service,
  services,
  onClose,
  onSelect,
}: {
  service: Service;
  services: Service[];
  onClose: () => void;
  onSelect: (s: Service) => void;
}) {
  const title = displayTitle(service);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const relatedItems = services
    .filter((s) => s.id !== service.id && s.category === service.category && s.imageURL)
    .slice(0, 4);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={title}
      >
        {/* Panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
          className="relative w-full max-w-4xl bg-[#0f0f0f] rounded-3xl overflow-y-auto max-h-[90vh] custom-scrollbar
            border border-white/10 shadow-[0_0_80px_rgba(212,175,55,0.15)] flex flex-col pb-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close - Sticky to stay in view while scrolling */}
          <div className="sticky top-0 z-50 w-full flex justify-end pointer-events-none p-4" dir="rtl">
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="pointer-events-auto w-9 h-9 rounded-full
                bg-black/60 border border-white/10 text-white
                hover:bg-white/10 hover:border-[#D4AF37]/50
                flex items-center justify-center transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Full-size image (moved up visually using negative margin) */}
          {service.imageURL && (
            <div className="relative w-full shrink-0 aspect-[16/10] sm:aspect-[16/9] bg-black -mt-[68px]">
              <Image
                src={service.imageURL}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Gold shimmer */}
          <div
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shrink-0"
            aria-hidden
          />

          {/* Details */}
          <div className="px-5 py-6 sm:px-8 sm:py-8 flex flex-col gap-4 shrink-0" dir="rtl">
            {/* Category + price row */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35
                text-[#F3E5AB] text-xs font-semibold tracking-widest uppercase">
                {service.category || "خدمة"}
              </span>
              {service.price && (
                <span className="text-[#D4AF37] font-bold text-sm">{service.price}</span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-extrabold" style={{ lineHeight: "1.6" }}>
              {title || <span className="text-white/40 italic text-base">بدون عنوان</span>}
            </h2>

            {/* Description */}
            {service.description && (
              <p
                className="text-white/80 text-base sm:text-lg"
                style={{ lineHeight: "1.8", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {service.description}
              </p>
            )}

            {/* CTA */}
            {title && (
              <div className="flex flex-col sm:flex-row gap-3 items-center mt-4 self-start w-full sm:w-auto">
                <Link
                  href={`/booking?service=${encodeURIComponent(title)}`}
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2
                    bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-base
                    py-3 px-8 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.35)]
                    hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]
                    hover:-translate-y-0.5 transition-all duration-300"
                >
                  احجز هذه الخدمة
                  <ArrowLeft className="h-5 w-5" aria-hidden />
                </Link>
                <a
                  href="https://wa.me/966574257484"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 
                    bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-base 
                    py-3 px-8 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.35)] 
                    hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] 
                    hover:-translate-y-0.5 transition-all duration-300"
                >
                  تواصل عبر واتساب
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </a>
              </div>
            )}
          </div>

          {/* ── Related Images ── */}
          {relatedItems.length > 0 && (
            <div className="px-5 sm:px-8 shrink-0 mt-4" dir="rtl">
              <h3 className="text-white/50 text-sm font-semibold mb-4">خدمات مشابهة</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedItems.map((related) => (
                  <button
                    key={related.id}
                    onClick={() => onSelect(related)}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-colors focus:outline-none"
                  >
                    <Image
                      src={related.imageURL}
                      alt={displayTitle(related) || ""}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
