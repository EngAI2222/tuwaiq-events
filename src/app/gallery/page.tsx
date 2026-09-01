"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
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

// ─── Category filter list (dynamically built from data + static set) ──────────

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
  "أخرى"
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("الكل");

  useEffect(() => {
    db.gallery.findMany().then((data) => {
      setItems(data as GalleryItem[]);
      setLoading(false);
    });
  }, []);

  // Build unique categories from live data, keeping static set as base
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
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
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

          {/* Gold divider */}
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
          IMAGE GRID
      ══════════════════════════════ */}
      <section className="py-8 sm:py-12 md:py-24 bg-background relative overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="container mx-auto px-6 max-w-7xl">
          {/* Loading skeleton */}
          {loading && (
            <div className="columns-2 md:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-2xl bg-card/50 border border-border/30 animate-pulse"
                  style={{ height: i % 3 === 0 ? "300px" : i % 2 === 0 ? "240px" : "280px" }}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="py-8 sm:py-12 md:py-24 text-center text-muted-foreground text-lg">
              لا توجد صور في هذا القسم حالياً.
            </div>
          )}

          {/* Masonry grid */}
          {!loading && filtered.length > 0 && (
            <div className="columns-2 md:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className="relative group rounded-2xl overflow-hidden break-inside-avoid
                      border border-border/50 ring-1 ring-border/30 hover:ring-[#D4AF37]/50
                      hover:shadow-[0_0_40px_rgba(212,175,55,0.12)] transition-all duration-500
                      cursor-pointer bg-card"
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        aspectRatio:
                          idx % 3 === 0 ? "4/5" : idx % 2 === 0 ? "1/1" : "3/4",
                      }}
                    >
                      <Image
                        src={img.imageURL}
                        alt={img.caption}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />

                      {/* Gold top border shimmer on hover */}
                      <div
                        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                        aria-hidden
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4 sm:p-6 z-10">
                        {/* Category chip */}
                        <span className="inline-block self-start px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-[10px] sm:text-xs font-semibold tracking-wide mb-2 backdrop-blur-sm">
                          {img.category}
                        </span>

                        <div className="flex items-end justify-between gap-2 sm:gap-3">
                          <h3 className="text-white text-sm sm:text-lg font-bold leading-tight translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                            {img.caption}
                          </h3>

                          {/* View icon */}
                          <div className="flex-shrink-0 inline-flex items-center gap-1 sm:gap-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-white text-[10px] sm:text-xs font-semibold translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                            <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
                            <span className="hidden sm:inline">تفاصيل</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
