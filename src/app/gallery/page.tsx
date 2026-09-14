"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/db";

// ─── Types ─────────────────────────────────────────────────────────────────────

type GalleryItem = {
  id: string;
  imageURL: string;
  caption: string;
  category: string;
  createdAt: string;
};

// ─── Category filter list ──────────────────────────────────────────────────────

const STATIC_CATEGORIES = [
  "الكل",
  "كوش الأفراح",
  "طاولات وضيافة",
  "إضاءة وصوتيات",
  "جلسات ملكية",
  "تنسيق ورود",
  "تصوير كادر تصويري زفاف",
  "تصميم بالذكاء الاصطناعي",
  "حفلات زفاف",
  "ليالي الملكة",
  "مؤتمرات وشركات",
  "ديكور وتنسيق",
  "أخرى",
];

// ─── Lightbox Modal ────────────────────────────────────────────────────────────

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={item.caption}
      >
        {/* Modal panel — stop propagation so clicking inside doesn't close */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
          className="relative w-full max-w-4xl bg-[#0f0f0f] rounded-3xl overflow-hidden
            border border-white/10 shadow-[0_0_80px_rgba(212,175,55,0.15)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close button ── */}
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full
              bg-black/60 border border-white/10 text-white
              hover:bg-white/10 hover:border-[#D4AF37]/50
              flex items-center justify-center transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Gold shimmer line */}
          <div
            className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10"
            aria-hidden
          />

          {/* ── Full-size image ── */}
          <div className="relative w-full aspect-[16/10] bg-black">
            <Image
              src={item.imageURL}
              alt={item.caption}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-contain"
            />
          </div>

          {/* ── Details strip ── */}
          <div className="px-4 py-5 sm:px-6 flex flex-col gap-3 border-t border-white/[0.07]" dir="rtl">
            {/* Category chip */}
            <span className="self-start px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35
              text-[#F3E5AB] text-xs font-semibold tracking-widest uppercase">
              {item.category}
            </span>
            {/* Caption / title — full text, readable line-height on mobile */}
            <p
              className="text-white text-base sm:text-lg font-semibold"
              style={{ lineHeight: "1.75", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
            >
              {item.caption}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    db.gallery.findMany().then((data) => {
      setItems(data as GalleryItem[]);
      setLoading(false);
    });
  }, []);

  const closeModal = useCallback(() => setSelected(null), []);

  // Unique category list
  const categories = [
    "الكل",
    ...Array.from(
      new Set([
        ...STATIC_CATEGORIES.slice(1),
        ...items.map((i) => i.category).filter(Boolean),
      ])
    ),
  ];

  const filtered =
    activeCategory === "الكل"
      ? items
      : items.filter((img) => img.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative w-full min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/90"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            معرض أعمالنا
          </span>

          <h1 className="font-extrabold leading-tight text-balance max-w-3xl">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              معرض الأعمال..
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] mt-2 text-3xl md:text-5xl lg:text-6xl">
              لوحات فنية على أرض الواقع
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 my-6" aria-hidden>
            <span className="h-px w-16 bg-gradient-to-l from-[#D4AF37] to-transparent" />
            <span className="h-2 w-2 rotate-45 bg-[#D4AF37] opacity-80 inline-block" />
            <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>

          <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-loose tracking-wide">
            استكشف مجموعة من أبرز مناسباتنا الفاخرة التي صممناها وأحييناها في
            قلب الرياض.
          </p>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════ CATEGORY FILTERS ══════════════ */}
      <section className="py-8 bg-background sticky top-16 z-20 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300
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

      {/* ══════════════ IMAGE GRID ══════════════ */}
      <section className="py-8 sm:py-12 md:py-20 bg-background relative overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-card/50 border border-border/30 animate-pulse aspect-square"
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && filtered.length === 0 && (
            <div className="py-24 text-center text-muted-foreground text-lg">
              لا توجد صور في هذا القسم حالياً.
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((img) => (
                  <motion.button
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.3, type: "spring", bounce: 0.15 }}
                    onClick={() => setSelected(img)}
                    className="group relative flex flex-col rounded-2xl overflow-hidden
                      border border-border/40 ring-1 ring-transparent bg-card
                      hover:ring-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
                      transition-all duration-400 cursor-pointer text-right focus:outline-none
                      focus-visible:ring-[#D4AF37]/80"
                    aria-label={`عرض: ${img.caption}`}
                  >
                    {/* ── Image (fixed aspect ratio at top) ── */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0">
                      <Image
                        src={img.imageURL}
                        alt={img.caption}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Category badge — top-right inside image */}
                      <div className="absolute top-2 right-2 z-10">
                        <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm
                          border border-white/15 text-white text-[10px] font-semibold tracking-wide
                          line-clamp-1 max-w-[110px] block">
                          {img.category}
                        </span>
                      </div>

                      {/* Hover scrim + zoom icon */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 flex items-center justify-center z-10">
                        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20
                          backdrop-blur-md flex items-center justify-center
                          scale-75 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="w-4 h-4 text-white" aria-hidden />
                        </div>
                      </div>

                      {/* Gold top shimmer on hover */}
                      <div
                        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                        aria-hidden
                      />
                    </div>

                    {/* ── Caption below image ── */}
                    <div className="px-3 py-2.5" dir="rtl">
                      <p className="text-xs sm:text-sm text-foreground/80 font-medium leading-snug
                        line-clamp-2 overflow-hidden text-right">
                        {img.caption}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════ LIGHTBOX ══════════════ */}
      {selected && <Lightbox item={selected} onClose={closeModal} />}
    </div>
  );
}
