"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, X, MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "من نحن", href: "/about" },
  { name: "الخدمات", href: "/services" },
  { name: "المناطق", href: "/areas" },
  { name: "المعرض", href: "/gallery" },
  { name: "المدونة", href: "/blog" },
  { name: "تواصل", href: "/contact" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-[110] w-full border-b border-white/10 bg-[#0f1117]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-extrabold text-2xl tracking-tighter flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] to-[#D4AF37]">
                لمسة
              </span>
              <span className="text-white">إيفنس</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-300 hover:text-[#D4AF37] ${pathname === link.href ? "text-[#D4AF37]" : "text-gray-300"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="تبديل المظهر"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2.5 left-2.5" />
            </button>

            <Link
              href="/booking"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#BF953F] to-[#D4AF37] text-black text-sm font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
            >
              طلب عرض
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-gray-300 hover:text-white transition-all relative z-[60]"
              aria-label="تبديل المظهر"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2 left-2" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-[105] p-2 text-white transition-transform duration-300"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-[#D4AF37] rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-7 w-7 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Drawer Overlay ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[120] transition-all duration-500 ease-in-out lg:hidden ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Dark Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div 
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white text-gray-900 shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header inside drawer */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-2xl tracking-tighter flex items-center gap-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] to-[#D4AF37]">
                لمسة
              </span>
              <span className="text-gray-900">إيفنس</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col no-scrollbar">
            
            {/* Action Buttons at the Top */}
            <div className="flex flex-col gap-3 mb-8 w-full">

              <Link
                href="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-6 py-3.5 rounded-full bg-[#D4AF37] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                طلب عرض
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold py-2 transition-colors border-b border-gray-50 last:border-0
                    ${pathname === link.href
                      ? "text-[#D4AF37]"
                      : "text-gray-900 hover:text-[#D4AF37]"
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Contact Info Footer */}
            <div className="mt-auto pt-8">
              <div className="border-t border-gray-200 my-4" />
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50 text-gray-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-600">العنوان: الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50 text-gray-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-600" dir="ltr">البريد الإلكتروني: info@lamsa-events.com</span>
                </div>
                <a href="tel:0547498239" className="flex items-center gap-3 hover:text-[#D4AF37] transition-colors">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-50 text-gray-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-600" dir="ltr">الهاتف: 054 749 8239</span>
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-4 mt-8">
                <a href="https://wa.me/966547498239" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a href="#" className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
