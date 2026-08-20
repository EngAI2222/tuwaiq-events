"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      login(email, role);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-muted/20">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-3xl shadow-2xl border">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6" />
              {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "مرحباً بك مجدداً في نكسورا للمناسبات الفاخرة" : "انضم إلينا لتجربة تخطيط مناسبات لا مثيل لها"}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input 
                id="email" 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com" 
                className="h-12 bg-muted/50 focus-visible:ring-primary/50" 
                dir="ltr"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                {isLogin && (
                  <Link href="#" className="text-xs text-primary hover:underline font-medium">
                    نسيت كلمة المرور؟
                  </Link>
                )}
              </div>
              <Input 
                id="password" 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="h-12 bg-muted/50 focus-visible:ring-primary/50" 
                dir="ltr"
              />
            </div>

            {!isLogin && (
              <div className="space-y-3">
                <Label>نوع الحساب</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="role" 
                      value="user" 
                      checked={role === "user"} 
                      onChange={() => setRole("user")}
                      className="accent-primary" 
                    />
                    <span className="text-sm">عميل (طالب خدمة)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="role" 
                      value="admin" 
                      checked={role === "admin"} 
                      onChange={() => setRole("admin")}
                      className="accent-primary" 
                    />
                    <span className="text-sm">إدارة (لوحة تحكم)</span>
                  </label>
                </div>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold gap-2 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "دخول" : "تسجيل"}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">أو</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 rounded-full border-muted-foreground/20">
            الدخول كضيف للمصمم الذكي
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary font-bold hover:underline"
            >
              {isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول"}
            </button>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden bg-primary/10">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1400&auto=format&fit=crop" 
          alt="Luxury Wedding" 
          className="object-cover w-full h-full mix-blend-multiply opacity-80"
        />
        <div className="absolute bottom-20 left-20 right-20 z-20 text-white drop-shadow-lg">
          <h2 className="text-4xl font-bold mb-4">نصنع الذكريات الخالدة</h2>
          <p className="text-xl opacity-90 max-w-lg leading-relaxed">
            منصتك المتكاملة لتخطيط وتنظيم أرقى المناسبات في المملكة، بكل سهولة وبأعلى معايير الجودة.
          </p>
        </div>
      </div>
    </div>
  );
}
