"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

const GALLERY_CATEGORIES = ["الكل", "حفلات زفاف", "ليالي الملكة", "مؤتمرات وشركات", "ديكور وتنسيق"];

const GALLERY_IMAGES = [
  { id: 1, src: "https://lams-event.com/images/1.jpeg", category: "حفلات زفاف", title: "كوشة زفاف ملكية" },
  { id: 2, src: "https://lams-event.com/images/2.jpeg", category: "ديكور وتنسيق", title: "تنسيق طاولات VIP" },
  { id: 3, src: "https://lams-event.com/images/3.jpeg", category: "مؤتمرات وشركات", title: "تجهيز مسرح مؤتمرات" },
  { id: 4, src: "https://lams-event.com/images/4.jpeg", category: "ليالي الملكة", title: "جلسة ملكة تراثية" },
  { id: 5, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800", category: "حفلات زفاف", title: "قاعة أفراح فندقية" },
  { id: 6, src: "https://images.unsplash.com/photo-1530103862679-de60920ae15a?q=80&w=800", category: "ديكور وتنسيق", title: "ضيافة استقبال" },
  { id: 7, src: "https://images.unsplash.com/photo-1505912755138-08b27ef3c428?q=80&w=800", category: "ليالي الملكة", title: "ديكور رومانسي" },
  { id: 8, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800", category: "مؤتمرات وشركات", title: "إضاءة وصوتيات" },
  { id: 9, src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", category: "حفلات زفاف", title: "زينة مدخل زفاف" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredImages = activeCategory === "الكل" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="py-24 min-h-screen bg-muted/10">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary flex items-center justify-center gap-4">
          <Camera className="w-10 h-10" />
          معرض الأعمال
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          استكشف مجموعة من أبرز مناسباتنا الفاخرة التي قمنا بتصميمها وتنفيذها لعملائنا في الرياض.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-background text-foreground border hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="relative rounded-3xl overflow-hidden group cursor-pointer break-inside-avoid border bg-card"
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: img.id % 3 === 0 ? "4/5" : img.id % 2 === 0 ? "1/1" : "3/4" }}>
                  <Image 
                    src={img.src} 
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-in-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-primary-foreground/80 text-sm font-semibold mb-1">{img.category}</span>
                    <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredImages.length === 0 && (
          <div className="py-20 text-muted-foreground">لا توجد صور في هذا القسم حالياً.</div>
        )}
      </div>
    </div>
  );
}
