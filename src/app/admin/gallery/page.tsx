// src/app/admin/gallery/page.tsx
// Coming Soon — Gallery Management placeholder

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Gallery | Lamsa Admin" };

// ── Hardcoded gallery catalogue (matches the public gallery page) ──────────────

const STATIC_GALLERY = [
  { id: 1, src: "https://lams-event.com/images/1.jpeg",                                                          category: "حفلات زفاف",       title: "كوشة زفاف ملكية" },
  { id: 2, src: "https://lams-event.com/images/2.jpeg",                                                          category: "ديكور وتنسيق",     title: "تنسيق طاولات VIP" },
  { id: 3, src: "https://lams-event.com/images/3.jpeg",                                                          category: "مؤتمرات وشركات",   title: "تجهيز مسرح مؤتمرات" },
  { id: 4, src: "https://lams-event.com/images/4.jpeg",                                                          category: "ليالي الملكة",     title: "جلسة ملكة تراثية" },
  { id: 5, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop",  category: "حفلات زفاف",       title: "قاعة أفراح فندقية" },
  { id: 6, src: "https://images.unsplash.com/photo-1530103862679-de60920ae15a?q=80&w=400&auto=format&fit=crop", category: "ديكور وتنسيق",     title: "ضيافة استقبال" },
  { id: 7, src: "https://images.unsplash.com/photo-1505912755138-08b27ef3c428?q=80&w=400&auto=format&fit=crop", category: "ليالي الملكة",     title: "ديكور رومانسي" },
  { id: 8, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop", category: "مؤتمرات وشركات",   title: "إضاءة وصوتيات" },
  { id: 9, src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop", category: "حفلات زفاف",       title: "زينة مدخل زفاف" },
];

export default function AdminGalleryPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/20
        bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-transparent p-6">
        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-widest text-violet-400/70 uppercase mb-1">
            Media Library
          </p>
          <h2 className="text-2xl font-bold text-white">Gallery Management</h2>
          <p className="text-sm text-slate-400 mt-1">
            {STATIC_GALLERY.length} static images · Upload & delete coming soon.
          </p>
        </div>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* ── Coming Soon Banner ── */}
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-white/[0.1] bg-white/[0.02] py-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20
          flex items-center justify-center text-4xl select-none">
          🖼️
        </div>
        <div>
          <p className="text-lg font-bold text-white">Gallery CMS — Coming Soon</p>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
            Drag-and-drop image upload, categorisation, and deletion are under development.
            Below is a read-only preview of the current gallery.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            disabled
            className="text-xs font-semibold px-4 py-2 rounded-xl border border-violet-500/30
              text-violet-400 bg-violet-500/10 cursor-not-allowed opacity-50"
          >
            + Upload Photo
          </button>
          <button
            disabled
            className="text-xs font-semibold px-4 py-2 rounded-xl border border-white/[0.08]
              text-slate-600 bg-white/[0.03] cursor-not-allowed opacity-50"
          >
            Manage Categories
          </button>
        </div>
      </div>

      {/* ── Image Grid Preview ── */}
      <section>
        <h3 className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
          Current Gallery · {STATIC_GALLERY.length} Items
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {STATIC_GALLERY.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-white/[0.07] hover:border-violet-500/40 bg-[#0f1117] transition-all duration-300"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white text-xs font-semibold leading-tight">{img.title}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{img.category}</p>
              </div>
              {/* Disabled delete chip */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  disabled
                  title="Delete (coming soon)"
                  className="flex items-center justify-center w-7 h-7 rounded-lg
                    bg-red-500/20 border border-red-500/30 text-red-400
                    text-xs cursor-not-allowed opacity-60"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
