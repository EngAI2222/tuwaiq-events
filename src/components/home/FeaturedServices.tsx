"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { db } from "@/lib/db";

const MOCK_SERVICES = [
  {
    title: "كوش الأفراح",
    description: "تصاميم كوش فريدة وعصرية تناسب مختلف الأذواق مع إضاءة مدروسة وزهور طبيعية.",
    imageURL: "https://lams-event.com/images/1.jpeg"
  },
  {
    title: "طاولات عشاء وضيافة",
    description: "تنسيق طاولات ولائم لكبار الشخصيات مع أرقى أنواع الشراشف وأطقم الضيافة.",
    imageURL: "https://lams-event.com/images/2.jpeg"
  },
  {
    title: "جلوس ملكي و VIP",
    description: "كنب فاخر وجلسات ملكية مريحة تعكس فخامة استقبالك لضيوفك المميزين.",
    imageURL: "https://lams-event.com/images/3.jpeg"
  },
  {
    title: "إضاءة وصوتيات",
    description: "تأجير وتركيب أنظمة إضاءة متطورة وسماعات عالية الجودة تناسب حجم القاعة.",
    imageURL: "https://lams-event.com/images/4.jpeg"
  }
];

export function FeaturedServices() {
  const [services, setServices] = useState<any[]>(MOCK_SERVICES);

  useEffect(() => {
    Promise.all([
      db.service.findMany().catch(() => []),
      db.gallery.findMany().catch(() => [])
    ]).then(([servicesData, galleryData]) => {
      const combined = [...(servicesData || []), ...(galleryData || [])];
      if (combined && combined.length > 0) {
        setServices(combined.slice(0, 4));
      } else {
        setServices(MOCK_SERVICES);
      }
    }).catch((err) => {
      console.error("Error fetching featured items:", err);
      setServices(MOCK_SERVICES);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 text-start">
      {services.map((service, i) => {
        // Gallery items store their name in `caption`; service items use `title`.
        const displayTitle = service.title || service.caption || "";
        return (
          <Link
            href="/services"
            key={i}
            className="group relative block aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/80"
            aria-label={`عرض التفاصيل: ${displayTitle}`}
          >
            <Image
              src={service.imageURL || service.image || "https://lams-event.com/images/1.jpeg"}
              alt={displayTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            
            {/* Hover scrim + zoom icon */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-4 h-4 text-white" aria-hidden />
              </div>
            </div>

            {/* Gold top shimmer on hover */}
            <div
              className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
              aria-hidden
            />
          </Link>
        );
      })}
    </div>
  );
}
