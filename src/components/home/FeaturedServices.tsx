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
    db.service.findMany().then((data: any[]) => {
      if (data && data.length > 0) {
        setServices(data.slice(0, 4));
      }
    }).catch((err) => {
      console.error("Error fetching featured services:", err);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-start">
      {services.map((service, i) => (
        <Link 
          href="/services" 
          key={i} 
          className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 h-[280px] md:h-[450px]"
        >
          <Image 
            src={service.imageURL || "https://lams-event.com/images/1.jpeg"} 
            alt={service.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
            sizes="(max-width: 768px) 100vw, 50vw" 
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" 
            aria-hidden 
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-loose max-w-md line-clamp-2">
              {service.description || "استكشف تفاصيل هذه الخدمة الفاخرة لتجعل مناسبتك استثنائية."}
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-[#D4AF37] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-semibold text-sm tracking-wide">
              <Eye className="h-4 w-4" aria-hidden />
              <span>View Details (تفاصيل)</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
