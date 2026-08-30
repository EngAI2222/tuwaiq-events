import type { Metadata } from "next";
import Link from "next/link";
import {
  Flower2,
  UtensilsCrossed,
  Sofa,
  AudioWaveform,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "الخدمات | لمسة إيفنس",
  description:
    "استكشف خدمات لمسة إيفنس الفاخرة: كوش الأفراح، طاولات VIP، جلوس ملكي، أنظمة صوت وإضاءة، وتصميم المناسبات بالذكاء الاصطناعي.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

type Service = {
  id: string;
  Icon: React.ElementType;
  title: string;
  subtitle: string;
  desc: string;
  price: string;
  isAI?: boolean;
  accentFrom: string;
  accentTo: string;
  iconColor: string;
};

const SERVICES: Service[] = [
  {
    id: "weddings",
    Icon: Flower2,
    title: "كوش الأفراح",
    subtitle: "Luxury Wedding Stages",
    desc: "تصاميم كوش فريدة وعصرية تناسب مختلف الأذواق مع إضاءة مدروسة وزهور طبيعية وتنسيق متكامل للقاعة يعكس الفخامة الحقيقية.",
    price: "يبدأ من 5,000 ريال",
    accentFrom: "from-rose-500/30",
    accentTo: "to-pink-600/10",
    iconColor: "text-rose-400",
  },
  {
    id: "dining",
    Icon: UtensilsCrossed,
    title: "طاولات عشاء وضيافة",
    subtitle: "VIP Dining & Hospitality",
    desc: "تنسيق طاولات ولائم لكبار الشخصيات مع أرقى أنواع الشراشف وأطقم الضيافة المذهبة والفضية، لتجربة ضيافة لا مثيل لها.",
    price: "يبدأ من 150 ريال/طاولة",
    accentFrom: "from-amber-500/30",
    accentTo: "to-yellow-600/10",
    iconColor: "text-amber-400",
  },
  {
    id: "vip-seating",
    Icon: Sofa,
    title: "جلوس ملكي و VIP",
    subtitle: "Royal & VIP Seating",
    desc: "كنب فاخر وجلسات ملكية مريحة تعكس فخامة استقبالك لضيوفك المميزين، مناسبة للرجال والنساء بتصاميم مخصصة.",
    price: "حسب الطلب",
    accentFrom: "from-purple-500/30",
    accentTo: "to-violet-600/10",
    iconColor: "text-purple-400",
  },
  {
    id: "av-systems",
    Icon: AudioWaveform,
    title: "أنظمة صوت وإضاءة",
    subtitle: "Advanced AV Systems",
    desc: "تأجير وتركيب أنظمة إضاءة متطورة وسماعات عالية الجودة تناسب حجم القاعة أو المساحة الخارجية، مع دعم فني طوال الحفل.",
    price: "يبدأ من 1,000 ريال",
    accentFrom: "from-sky-500/30",
    accentTo: "to-blue-600/10",
    iconColor: "text-sky-400",
  },
  {
    id: "ai-design",
    Icon: Sparkles,
    title: "تصميم المناسبات بالذكاء الاصطناعي",
    subtitle: "AI-Powered Event Design",
    desc: "تقنية حصرية لدى لمسة إيفنس: أدخل تفضيلاتك وميزانيتك، وسيقترح مساعدنا الذكي خطة كاملة تشمل الألوان، الديكور، والخدمات في ثوانٍ.",
    price: "مجاناً للعملاء",
    isAI: true,
    accentFrom: "from-[#D4AF37]/40",
    accentTo: "to-amber-600/10",
    iconColor: "text-[#D4AF37]",
  },
];

// ─── Shared decorative divider ────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden>
      <span className="h-px w-16 bg-gradient-to-l from-[#D4AF37] to-transparent" />
      <span className="h-2 w-2 rotate-45 bg-[#D4AF37] opacity-80 inline-block" />
      <span className="h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative w-full min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1530103862679-de60920ae15a?q=80&w=2098&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            خدماتنا المتميزة
          </span>

          <h1 className="font-extrabold leading-tight text-balance max-w-3xl">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              خدماتنا..
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] mt-2 text-3xl md:text-5xl lg:text-6xl">
              فن صناعة الفخامة
            </span>
          </h1>

          <GoldDivider />

          <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-loose tracking-wide">
            نقدم باقة متكاملة من الخدمات الفاخرة لتغطية كافة احتياجات مناسبتك
            من الألف إلى الياء، بأعلى معايير الجودة.
          </p>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════════════════════
          SERVICES GRID
      ══════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          {/* First row: 2 wide cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {SERVICES.slice(0, 2).map((s) => (
              <ServiceCard key={s.id} service={s} tall />
            ))}
          </div>
          {/* Second row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.slice(2).map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          CTA STRIP
      ══════════════════════════════ */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-[#1a1100] via-[#2a1d00] to-[#1a1100]">
        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white text-balance max-w-2xl">
            هل تحتاج باقة{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
              مخصصة لمناسبتك؟
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-lg leading-loose">
            تواصل معنا وسنصمم لك باقة شاملة تناسب ذوقك وميزانيتك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-base py-3 px-10 rounded-full shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_32px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/ai-planner"
              className="border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#F3E5AB] hover:text-white font-semibold text-base py-3 px-10 rounded-full hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              جرّب المخطط الذكي
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Service Card Component ────────────────────────────────────────────────────

function ServiceCard({
  service,
  tall = false,
}: {
  service: Service;
  tall?: boolean;
}) {
  const { Icon, title, subtitle, desc, price, isAI, accentFrom, accentTo, iconColor } =
    service;

  return (
    <article
      className={`group relative flex flex-col gap-5 p-8 rounded-3xl bg-card border overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer
        ${isAI
          ? "ring-2 ring-[#D4AF37]/50 hover:ring-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.3)]"
          : "ring-1 ring-border/50 hover:ring-[#D4AF37]/40 hover:shadow-2xl"
        }
        ${tall ? "md:min-h-[320px]" : "md:min-h-[280px]"}
      `}
    >
      {/* Gold top border */}
      <div
        className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${isAI ? "via-[#D4AF37]" : "via-[#D4AF37]/60"} to-transparent`}
        aria-hidden
      />

      {/* Hover glow bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentFrom} ${accentTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        aria-hidden
      />

      {/* AI badge */}
      {isAI && (
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
          <Sparkles className="h-3 w-3" aria-hidden />
          حصري · AI
        </span>
      )}

      {/* Icon */}
      <div
        className={`relative z-10 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-card border ring-1 ring-border/50 shadow-sm ${iconColor} group-hover:scale-110 transition-transform duration-300 ${isAI ? "mt-6" : ""}`}
      >
        <Icon className="h-6 w-6" aria-hidden />
      </div>

      {/* Text */}
      <div className="relative z-10 flex flex-col gap-2 flex-1">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {subtitle}
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-muted-foreground leading-loose text-sm md:text-base tracking-wide flex-1">
          {desc}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-sm font-semibold text-[#D4AF37]">{price}</span>
        <Link
          href={`/booking?service=${encodeURIComponent(title)}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-[#D4AF37] transition-colors"
        >
          احجز الآن
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
