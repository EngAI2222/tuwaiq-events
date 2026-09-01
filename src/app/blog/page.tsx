"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Send, CheckCircle2 } from "lucide-react";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulated async submit
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ══════════════════════════════════════════
          ABOUT US (من نحن)
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#0a0c10] relative">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl border border-[#D4AF37]/20 bg-[#0f1117] p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            {/* Subtle glow inside the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none" aria-hidden />
            
            <div className="relative z-10">
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
                  عن لمسة إيفنس
                </span>
              </h2>
              <p className="text-gray-300 text-base md:text-xl lg:text-2xl leading-relaxed md:leading-loose font-light max-w-4xl mx-auto">
                تُعد لمسة إيفنس الوجهة الرائدة والرمز الأرقى لتنظيم وتجهيز الفعّاليات الفاخرة، الأعراس الملكية، والمناسبات الكبرى. نجمع بين براعة التخطيط وأحدث الابتكارات لنصنع تجارب استثنائية تحاكي تطلعات النخب وتلبي كافة الاحتياجات بأعلى معايير الجودة والفخامة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CINEMATIC HERO
      ══════════════════════════════════════════ */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[80vh]">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        {/* Deep overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95"
          aria-hidden
        />
        {/* Subtle gold vignette */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center max-w-3xl">
          {/* Icon */}
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-8 backdrop-blur-sm">
            <BookOpen className="h-9 w-9 text-[#D4AF37]" aria-hidden />
          </div>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            قريباً · Coming Soon
          </span>

          {/* Heading */}
          <h1 className="font-extrabold leading-tight text-balance">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              المدونة..
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] mt-2 text-3xl md:text-5xl lg:text-6xl">
              قريباً
            </span>
          </h1>

          {/* Divider */}
          <div
            className="flex items-center justify-center gap-3 my-8"
            aria-hidden
          >
            <span className="h-px w-16 bg-gradient-to-l from-[#D4AF37] to-transparent" />
            <span className="h-2 w-2 rotate-45 bg-[#D4AF37] opacity-80 inline-block" />
            <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          </div>

          <p className="text-gray-300 text-base md:text-xl font-light leading-loose tracking-wide mb-12">
            استكشف أحدث صيحات المناسبات الفاخرة وتصاميم الذكاء الاصطناعي.
            كن أول من يعلم حين نطلق مدونتنا.
          </p>

          {/* Email Waitlist Form */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md flex flex-col sm:flex-row gap-3"
              aria-label="نموذج الاشتراك في القائمة البريدية"
            >
              <input
                id="blog-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني..."
                dir="ltr"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 backdrop-blur-sm transition-all duration-300 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#F3E5AB] disabled:opacity-70 text-black font-bold text-sm py-3.5 px-7 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden />
                )}
                أعلمني
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-500">
              <CheckCircle2
                className="h-12 w-12 text-[#D4AF37]"
                aria-hidden
              />
              <p className="text-[#F3E5AB] text-lg font-semibold">
                شكراً! سنعلمك فور إطلاق المدونة.
              </p>
            </div>
          )}

          {/* Privacy note */}
          {!submitted && (
            <p className="mt-4 text-gray-500 text-xs tracking-wide">
              لن نشارك بريدك مع أي طرف آخر. يمكنك إلغاء الاشتراك في أي وقت.
            </p>
          )}
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════════════════════════════════
          UPCOMING TOPICS TEASE
      ══════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 md:py-24 bg-background relative overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            مواضيع قادمة
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-balance mb-6 sm:mb-10">
            ماذا ستجد في مدونتنا؟
          </h2>

          <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-3">
            {[
              {
                Icon: Sparkles,
                title: "صيحات الأفراح 2025",
                desc: "أحدث ترندات ديكور وكوشات الأفراح في السعودية والخليج.",
              },
              {
                Icon: BookOpen,
                title: "دليل تنظيم المناسبات",
                desc: "خطوات عملية لتنظيم مناسبتك من الصفر حتى اللمسات الأخيرة.",
              },
              {
                Icon: Send,
                title: "الذكاء الاصطناعي في التصميم",
                desc: "كيف تستخدم تقنية AI لاختيار ألوان وديكور مناسبتك بدقة مذهلة.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border ring-1 ring-border/50 hover:ring-[#D4AF37]/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-400"
              >
                <div className="inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold">{title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed sm:leading-loose">
                  {desc}
                </p>
                <span className="text-xs font-semibold text-[#D4AF37]/70 tracking-wider uppercase mt-auto">
                  قريباً
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
