import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Building2, Crown, Star, Landmark, Trees } from "lucide-react";

export const metadata: Metadata = {
  title: "مناطق التغطية | لمسة إيفنس",
  description:
    "لمسة إيفنس تغطي أرقى أحياء الرياض وقاعاتها الفاخرة. تعرّف على مناطق تغطيتنا في العاصمة.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const AREAS = [
  {
    id: "north",
    Icon: Crown,
    name: "شمال الرياض",
    desc: "العليا، حي النخيل، حي الملقا — أكثر الأحياء تميزاً وفخامة في العاصمة.",
    tag: "الأكثر طلباً",
    isHighlight: true,
    iconColor: "text-amber-400",
    ringColor: "ring-amber-500/30",
    glowColor: "from-amber-500/20 to-yellow-600/5",
  },
  {
    id: "diriyah",
    Icon: Landmark,
    name: "الدرعية",
    desc: "التراث العريق يلتقي بالفخامة المعاصرة في أيقونة الرياض التاريخية الجديدة.",
    tag: "وجهة مميزة",
    iconColor: "text-rose-400",
    ringColor: "ring-rose-500/20",
    glowColor: "from-rose-500/15 to-pink-600/5",
  },
  {
    id: "palaces",
    Icon: Building2,
    name: "القصور والقاعات الفاخرة",
    desc: "تجهيز وتنسيق داخل أفخم القاعات والقصور المستقلة في الرياض لأبهى المناسبات.",
    tag: "لكبار الشخصيات",
    iconColor: "text-purple-400",
    ringColor: "ring-purple-500/20",
    glowColor: "from-purple-500/15 to-violet-600/5",
  },
  {
    id: "east",
    Icon: Star,
    name: "شرق الرياض",
    desc: "حي الروابي، حي الرمال — مناطق عائلية راقية تتوفر فيها أجمل القاعات.",
    iconColor: "text-sky-400",
    ringColor: "ring-sky-500/20",
    glowColor: "from-sky-500/15 to-blue-600/5",
  },
  {
    id: "west",
    Icon: Trees,
    name: "غرب الرياض",
    desc: "حي العزيزية، حي الشفا — فضاءات خضراء وقاعات مفتوحة مثالية للحفلات الصيفية.",
    iconColor: "text-emerald-400",
    ringColor: "ring-emerald-500/20",
    glowColor: "from-emerald-500/15 to-green-600/5",
  },
  {
    id: "center",
    Icon: MapPin,
    name: "وسط الرياض",
    desc: "قلب العاصمة، موقع استراتيجي مع سهولة وصول الضيوف وتنوع خيارات القاعات.",
    iconColor: "text-orange-400",
    ringColor: "ring-orange-500/20",
    glowColor: "from-orange-500/15 to-amber-600/5",
  },
];

// ─── Decorative divider ────────────────────────────────────────────────────────

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

export default function AreasPage() {
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
              "url('https://images.unsplash.com/photo-1586611292717-f828b167408c?q=80&w=2098&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/90"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            الرياض · المملكة العربية السعودية
          </span>

          <h1 className="font-extrabold leading-tight text-balance max-w-3xl">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              نغطي كافة أنحاء
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] mt-2 text-3xl md:text-5xl lg:text-6xl">
              العاصمة
            </span>
          </h1>

          <GoldDivider />

          <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-loose tracking-wide">
            من الشمال الراقي إلى الدرعية التاريخية — نصل إليك أينما كانت
            مناسبتك في الرياض.
          </p>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════════════════════
          COVERAGE BANNER
      ══════════════════════════════ */}
      <section className="py-10 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              { value: "6+", label: "مناطق مغطاة" },
              { value: "+300", label: "قاعة شريكة" },
              { value: "24/7", label: "دعم ميداني" },
              { value: "100%", label: "التزام بالوصول" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-[#D4AF37] to-[#B38728]">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground tracking-wide mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          AREAS GRID
      ══════════════════════════════ */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        {/* Map-like background texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Coverage Areas
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-balance mb-4">
              مناطق التغطية
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-loose max-w-xl mx-auto tracking-wide">
              نخطو معك في أرقى مناطق الرياض لنحوّل أي مكان إلى تحفة فنية.
            </p>
            <GoldDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREAS.map(({ id, Icon, name, desc, tag, isHighlight, iconColor, ringColor, glowColor }) => (
              <article
                key={id}
                className={`group relative flex flex-col gap-5 p-8 rounded-3xl bg-card border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                  ${isHighlight
                    ? `ring-2 ring-[#D4AF37]/50 hover:ring-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.12)] hover:shadow-[0_0_50px_rgba(212,175,55,0.25)]`
                    : `ring-1 ${ringColor} hover:ring-[#D4AF37]/40`
                  }`}
              >
                {/* Gold top border */}
                <div
                  className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${isHighlight ? "via-[#D4AF37]" : "via-[#D4AF37]/50"} to-transparent`}
                  aria-hidden
                />
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  aria-hidden
                />

                {/* Tag badge */}
                {tag && (
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F3E5AB] text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                    {isHighlight && <Star className="h-3 w-3" aria-hidden />}
                    {tag}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`relative z-10 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-card border ring-1 ring-border/50 shadow-sm ${iconColor} group-hover:scale-110 transition-transform duration-300 ${tag ? "mt-5" : ""}`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col gap-2 flex-1">
                  <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                    {name}
                  </h3>
                  <p className="text-muted-foreground leading-loose text-sm md:text-base tracking-wide">
                    {desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          COMING SOON STRIP
      ══════════════════════════════ */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-r from-[#1a1100] via-[#2a1d00] to-[#1a1100]">
        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center gap-4">
          <MapPin className="h-8 w-8 text-[#D4AF37]" aria-hidden />
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-balance max-w-xl">
            وقريباً في جميع أنحاء{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
              المملكة العربية السعودية
            </span>
          </h2>
          <p className="text-gray-400 text-base leading-loose max-w-md">
            نتوسع لنصل إليك أينما كنت — جدة، مكة المكرمة، الدمام وأكثر.
          </p>
          <Link
            href="/contact"
            className="mt-2 bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-base py-3 px-8 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
