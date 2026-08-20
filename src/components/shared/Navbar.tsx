"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex flex-col">
            <span className="font-bold text-2xl tracking-tighter text-primary">
              نكسورا <span className="text-foreground font-normal">للمناسبات الفاخرة</span>
            </span>
            <span className="text-xs text-muted-foreground font-medium">تنسيق مناسبات — الرياض</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-full">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">تبديل المظهر</span>
          </Button>
          {!isAuthenticated ? (
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary">أهلاً، {user?.name}</span>
              <Button variant="outline" onClick={logout} className="rounded-full">خروج</Button>
            </div>
          )}
          <Button asChild className="rounded-full">
            <Link href="/booking">طلب عرض</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-full">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">تبديل المظهر</span>
          </Button>
          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">القائمة</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-8">
                <Link href="/" className="flex flex-col mb-4">
                  <span className="font-bold text-2xl tracking-tighter text-primary">نكسورا</span>
                  <span className="text-xs text-muted-foreground font-medium">تنسيق مناسبات — الرياض</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-6">
                  {!isAuthenticated ? (
                    <Button variant="outline" asChild className="w-full rounded-full">
                      <Link href="/login">تسجيل الدخول</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={logout} className="w-full rounded-full">
                      تسجيل الخروج ({user?.name})
                    </Button>
                  )}
                  <Button asChild className="w-full rounded-full">
                    <Link href="/booking">طلب عرض</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
