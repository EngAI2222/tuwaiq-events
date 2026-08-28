"use client";

import { MessageCircle, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a 
        href="https://wa.me/966574257484" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label="تواصل عبر الواتساب"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      
      <Link 
        href="tel:+966500000000" 
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label="اتصل بنا"
      >
        <Phone className="w-6 h-6" />
      </Link>
      
      <a 
        href="https://maps.app.goo.gl/17mBiWJeXtBDCjMF9?g_st=aw" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        aria-label="موقعنا على الخريطة"
      >
        <MapPin className="w-6 h-6" />
      </a>
    </div>
  );
}
