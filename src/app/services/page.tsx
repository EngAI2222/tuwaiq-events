"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageURL: string;
  category: string;
  createdAt: string;
};

// ─── Shared decorative divider ────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-l from-[#D4AF37] to-transparent" />
      <span className="h-2 w-2 rotate-45 bg-[#D4AF37] opacity-80 inline-block" />
      <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
    </div>
  );
}

// ─── Category filter list (dynamically built from data + static set) ──────────

const STATIC_CATEGORIES = [
  "الكل",
  "كوش الأفراح",
  "طاولات وضيافة",
  "إضاءة وصوتيات",
  "جلسات ملكية",
  "تنسيق زهور",
  "تصميم بالذكاء الاصطناعي",
];

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({ service, tall = false }: { service: Service; tall?: boolean }) {
  const { title, description, price, imageURL } = service;

  return (
    <article
      className={`group relative flex flex-col gap-5 rounded-3xl bg-card border overflow-hidden
        transition-all duration-500 hover:-translate-y-2 cursor-pointer
        ring-1 ring-border/50 hover:ring-[#D4AF37]/40 hover:shadow-2xl h-full
        ${tall ? "md:min-h-[320px]" : "md:min-h-[280px]"}`}
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent"
        aria-hidden
      />

      {/* Cover image (if set) */}
      {imageURL && (
        <div className="relative w-full h-48 overflow-hidden shrink-0">
          <Image
            src={imageURL}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col gap-3 flex-1 ${imageURL ? "p-4 sm:p-6 pt-3 sm:pt-4" : "p-4 sm:p-6"}`}>
        {/* Category chip */}
        <span className="inline-block self-start text-[10px] sm:text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
          {service.category}
        </span>
        <h2 className="text-sm sm:text-base md:text-2xl font-extrabold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground leading-relaxed sm:leading-loose text-xs sm:text-base tracking-wide flex-1">
            {description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-border/50 mt-auto shrink-0">
        <span className="text-xs sm:text-sm font-semibold text-[#D4AF37]">{price || "حسب الطلب"}</span>
        <Link
          href={`/booking?service=${encodeURIComponent(title)}`}
          className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-[#D4AF37] transition-colors"
        >
          احجز الآن
          <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyServices() {
  return (
    <div className="py-8 sm:py-12 md:py-24 text-center text-muted-foreground col-span-full">
      <p className="text-xl font-light">لا توجد خدمات متاحة حالياً في هذا القسم.</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");

  useEffect(() => {
    Promise.all([
      db.service.findMany().catch(() => []),
      db.gallery.findMany().catch(() => [])
    ]).then(([servicesData, galleryData]) => {
      const combined = [...(servicesData || []), ...(galleryData || [])];
      // Sort combined by createdAt (newest first) since they might be out of order after merging
      combined.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      setServices(combined as Service[]);
      setLoading(false);
    });
  }, []);

  const categories = [
    "الكل",
    ...Array.from(
      new Set([
        ...STATIC_CATEGORIES.slice(1),
        ...services.map((s) => s.category).filter(Boolean),
      ])
    ),
  ];

  const filtered =
    activeCategory === "الكل"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative w-full min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1530103862679-de60920ae15a?q=80&w=2098&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            خدماتنا المتميزة
          </span>

          <h1 className="font-extrabold leading-tight text-balance max-w-3xl">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              خدماتنا..
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] mt-2 text-3xl md:text-5xl lg:text-6xl">
              فن صناعة الفخامة
            </span>
          </h1>

          <GoldDivider />

          <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-loose tracking-wide">
            نقدم باقة متكاملة من الخدمات الفاخرة لتغطية كافة احتياجات مناسبتك
            من الألف إلى الياء، بأعلى معايير الجودة.
          </p>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════════════════════
          FILTERS
      ══════════════════════════════ */}
      <section className="py-10 bg-background sticky top-16 z-20 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300
                    ${
                      isActive
                        ? "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105"
                        : "bg-card/60 border border-border/60 backdrop-blur-sm text-muted-foreground hover:border-[#D4AF37]/50 hover:text-foreground hover:bg-card"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          SERVICES GRID
      ══════════════════════════════ */}
      <section className="py-8 sm:py-12 md:py-24 bg-background relative overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-card/50 border border-border/30 animate-pulse min-h-[280px]"
                />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <EmptyServices key="empty" />
                ) : (
                  filtered.map((s, idx) => (
                    <motion.div
                      key={s.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: -10 }}
                      transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                      className={idx < 2 && activeCategory === "الكل" ? "col-span-1 md:col-span-1" : ""}
                    >
                      <ServiceCard service={s} tall={idx < 2 && activeCategory === "الكل"} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════
          CTA STRIP
      ══════════════════════════════ */}
      <section className="relative py-8 sm:py-12 md:py-24 overflow-hidden bg-gradient-to-r from-[#1a1100] via-[#2a1d00] to-[#1a1100]">
        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white text-balance max-w-2xl">
            هل تحتاج باقة{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
              مخصصة لمناسبتك؟
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-lg leading-loose">
            تواصل معنا وسنصمم لك باقة شاملة تناسب ذوقك وميزانيتك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-base py-3 px-10 rounded-full shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_32px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/ai-planner"
              className="border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#F3E5AB] hover:text-white font-semibold text-base py-3 px-10 rounded-full hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              جرّب المخطط الذكي
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
