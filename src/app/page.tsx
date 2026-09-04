import Image from "next/image";
import Link from "next/link";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
  Gem,
  Palette,
  ShieldCheck,
  Clock
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f1117] overflow-x-hidden">
      {/* ══════════════════════════════════════════
          HERO SECTION (واجهة الاستقبال)
      ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="bg-cover bg-center bg-no-repeat w-full absolute inset-0"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
          aria-hidden
        />
        {/* Rich multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0f1117]" aria-hidden />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center h-full text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            المنصة الأولى لتنظيم المناسبات في السعودية
          </span>
          <h1 className="font-extrabold leading-tight tracking-tight text-balance text-center max-w-4xl">
            <span className="block text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl drop-shadow-lg mb-2">
              اجعل مناسبتك القادمة
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] drop-shadow-md text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              تحفة فنية لا تُنسى
            </span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light max-w-3xl mx-auto mt-6 sm:mt-8 mb-10 sm:mb-12 leading-loose tracking-wide">
            نجمع بين الفخامة والذكاء الاصطناعي لتصميم وتجهيز حفلات الزفاف والمناسبات الخاصة بدقة متناهية تعكس ذوقك الرفيع.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base w-full sm:w-auto rounded-full shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_36px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/gallery"
              className="bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base w-full sm:w-auto rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              استكشف أعمالنا
            </Link>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════
          FEATURED SERVICES (خدماتنا المتميزة)
      ══════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0f1117] relative">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 text-balance">
            خدماتنا المتميزة
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 sm:mb-16 leading-loose tracking-wide">
            نقدم مجموعة متكاملة من الخدمات الفاخرة لتغطية كافة احتياجات مناسبتك من الألف إلى الياء.
          </p>

          <FeaturedServices />

          <div className="mt-12 sm:mt-16">
            <Link
              href="/services"
              className="inline-block bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white font-semibold text-lg py-4 px-10 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </section>

      {/* Luxury Divider */}
      <div className="w-full flex items-center justify-center py-4 bg-[#0f1117]">
        <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" aria-hidden />
      </div>

      {/* ══════════════════════════════════════════
          AI FEATURE SECTION (فخامة الذكاء الاصطناعي)
      ══════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-16 md:py-24 bg-[#0f1117] overflow-hidden">
        {/* Deep glowing radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 60%)' }}
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold tracking-wider mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse" aria-hidden />
              حصرياً لدى لمسة
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 text-balance">
              صمّم مناسبتك بالذكاء الاصطناعي
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-loose tracking-wide">
              لا داعي للحيرة! أدخل تفضيلاتك، ميزانيتك، وعدد ضيوفك، وسيقوم مساعدنا الذكي باقتراح خطة كاملة تشمل الألوان، الديكور، والخدمات المناسبة لك في ثوانٍ.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-16">
            {[
              { icon: Calendar, title: "تخطيط زمني", desc: "جدول دقيق لجميع التجهيزات والمهام" },
              { icon: MapPin, title: "اختيار المكان", desc: "اقتراحات لأفخم القاعات والمخيمات" },
              { icon: Users, title: "إدارة الضيوف", desc: "توزيع الطاولات واستقبال كبار الشخصيات" },
              { icon: Sparkles, title: "لمسات سحرية", desc: "تصاميم وديكورات فريدة وحصرية" },
            ].map((feat, i) => (
              <div
                key={i}
                className="group flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37] backdrop-blur-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500"
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                  <feat.icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3">{feat.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/ai-planner"
              className="group relative inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-lg py-4 px-10 rounded-full hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                ابدأ التصميم الآن
                <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-2 transition-transform duration-300" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US (لماذا تختارنا)
      ══════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#0a0c10] relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 text-balance">
              لماذا تختارنا
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-loose tracking-wide">
              مبادئ راسخة تجعل لمسة إيفنس الخيار الأول لكل من يطلب الأفضل.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Calendar, title: "التخطيط للمناسبة", desc: "تفاصيل مرتبة وتجربة انسيابية من البداية للنهاية." },
              { icon: Users, title: "الخبرة في التنفيذ", desc: "مشهد متناغم وتنفيذ سلس في أرض الواقع." },
              { icon: Gem, title: "أفكار بتنسيق راقٍ", desc: "حضور أنيق دون مبالغة أو ازدحام بصري." },
              { icon: Clock, title: "الالتزام بالوقت", desc: "جاهزية الموقع قبل الضيوف واحترام الجدول." },
              { icon: Palette, title: "تنوع الخيارات", desc: "حلول لزفاف وملكة وأعياد واستقبالات بمرونة." },
              { icon: ShieldCheck, title: "تجربة أكثر راحة", desc: "تشغيل وجمال معًا لتجربة مرتبة وهادئة." },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 border-b border-b-[#D4AF37]/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-lg hover:bg-white/10 hover:border-b-[#D4AF37] hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] transition-all duration-500 flex flex-col gap-3 sm:gap-5 overflow-hidden"
              >
                <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed sm:leading-loose text-xs sm:text-sm">{item.desc}</p>
                {/* Internal hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden />
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F3E5AB] font-semibold text-lg transition-colors duration-300"
            >
              اقرأ المزيد عن قصتنا
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
