import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowLeft, 
  Gem, 
  Palette, 
  ShieldCheck, 
  Clock, 
  Eye 
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f1117] overflow-x-hidden">
      {/* ══════════════════════════════════════════
          HERO SECTION (واجهة الاستقبال)
      ══════════════════════════════════════════ */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')" }} 
          aria-hidden
        />
        {/* Rich multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0f1117]" aria-hidden />
        
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
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
          <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl mx-auto mt-6 sm:mt-8 mb-10 sm:mb-12 leading-loose tracking-wide">
            نجمع بين الفخامة والذكاء الاصطناعي لتصميم وتجهيز حفلات الزفاف والمناسبات الخاصة بدقة متناهية تعكس ذوقك الرفيع.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-lg py-4 px-10 rounded-full shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_36px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/gallery"
              className="bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white font-semibold text-lg py-4 px-10 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              استكشف أعمالنا
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AI FEATURE SECTION (فخامة الذكاء الاصطناعي)
      ══════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#0f1117] overflow-hidden">
        {/* Deep glowing radial gradient */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 70%)' }} 
          aria-hidden
        />
        
        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-sm font-bold tracking-wider mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse" aria-hidden />
              حصرياً لدى لمسة
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 text-balance">
              صمّم مناسبتك بالذكاء الاصطناعي
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-loose tracking-wide">
              لا داعي للحيرة! أدخل تفضيلاتك، ميزانيتك، وعدد ضيوفك، وسيقوم مساعدنا الذكي باقتراح خطة كاملة تشمل الألوان، الديكور، والخدمات المناسبة لك في ثوانٍ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Calendar, title: "تخطيط زمني", desc: "جدول دقيق لجميع التجهيزات والمهام" },
              { icon: MapPin, title: "اختيار المكان", desc: "اقتراحات لأفخم القاعات والمخيمات" },
              { icon: Users, title: "إدارة الضيوف", desc: "توزيع الطاولات واستقبال كبار الشخصيات" },
              { icon: Sparkles, title: "لمسات سحرية", desc: "تصاميم وديكورات فريدة وحصرية" },
            ].map((feat, i) => (
              <div 
                key={i} 
                className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37] backdrop-blur-xl hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500"
              >
                <div className="h-16 w-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                  <feat.icon className="h-8 w-8" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
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
      <section className="py-24 bg-[#0a0c10] relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 text-balance">
              لماذا تختارنا
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-loose tracking-wide">
              مبادئ راسخة تجعل لمسة إيفنس الخيار الأول لكل من يطلب الأفضل.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group relative bg-white/5 border border-white/10 border-b border-b-[#D4AF37]/50 p-8 rounded-3xl backdrop-blur-lg hover:bg-white/10 hover:border-b-[#D4AF37] hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] transition-all duration-500 flex flex-col gap-5 overflow-hidden"
              >
                <div className="h-14 w-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-400 leading-loose text-sm md:text-base">{item.desc}</p>
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

      {/* ══════════════════════════════════════════
          FEATURED SERVICES (خدماتنا المتميزة)
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-[#0f1117] relative">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 text-balance">
            خدماتنا المتميزة
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-16 leading-loose tracking-wide">
            نقدم مجموعة متكاملة من الخدمات الفاخرة لتغطية كافة احتياجات مناسبتك من الألف إلى الياء.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
            {[
              {
                title: "كوش الأفراح",
                desc: "تصاميم كوش فريدة وعصرية تناسب مختلف الأذواق مع إضاءة مدروسة وزهور طبيعية.",
                image: "https://lams-event.com/images/1.jpeg"
              },
              {
                title: "طاولات عشاء وضيافة",
                desc: "تنسيق طاولات ولائم لكبار الشخصيات مع أرقى أنواع الشراشف وأطقم الضيافة.",
                image: "https://lams-event.com/images/2.jpeg"
              },
              {
                title: "جلوس ملكي و VIP",
                desc: "كنب فاخر وجلسات ملكية مريحة تعكس فخامة استقبالك لضيوفك المميزين.",
                image: "https://lams-event.com/images/3.jpeg"
              },
              {
                title: "إضاءة وصوتيات",
                desc: "تأجير وتركيب أنظمة إضاءة متطورة وسماعات عالية الجودة تناسب حجم القاعة.",
                image: "https://lams-event.com/images/4.jpeg"
              }
            ].map((service, i) => (
              <Link 
                href="/services" 
                key={i} 
                className="group relative block rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500 h-[350px] md:h-[450px]"
              >
                <Image 
                  src={service.image} 
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
                  <p className="text-gray-300 text-sm md:text-base leading-loose max-w-md">
                    {service.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-[#D4AF37] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 font-semibold text-sm tracking-wide">
                    <Eye className="h-4 w-4" aria-hidden />
                    <span>View Details (تفاصيل)</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16">
            <Link 
              href="/services" 
              className="inline-block bg-white/5 backdrop-blur-md border border-white/20 hover:border-[#D4AF37] text-white font-semibold text-lg py-4 px-10 rounded-full hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
            >
              عرض جميع الخدمات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
