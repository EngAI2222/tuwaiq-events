import type { Metadata } from "next";
import Link from "next/link";
import { Gem, Palette, ShieldCheck, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن | لمسة إيفنس",
  description:
    "تعرّف على قصة لمسة إيفنس، رؤيتها، ومهمتها في تقديم أرقى تجارب تنظيم المناسبات الفاخرة في الرياض.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const whyCards = [
  {
    id: "details",
    Icon: Gem,
    title: "اهتمام بأدق التفاصيل",
    text: "نؤمن أن الفخامة تكمن في التفاصيل، لذا نعتني بكل زاوية في مناسبتك.",
    gradient: "from-amber-500/20 to-yellow-300/10",
    iconColor: "text-amber-400",
    ringColor: "ring-amber-500/20",
  },
  {
    id: "design",
    Icon: Palette,
    title: "تصاميم حصرية",
    text: "لا نكرر تصاميمنا. كل مناسبة لدينا هي لوحة فنية مستقلة تعبر عن ذوقك الشخصي.",
    gradient: "from-rose-500/20 to-pink-300/10",
    iconColor: "text-rose-400",
    ringColor: "ring-rose-500/20",
  },
  {
    id: "execution",
    Icon: ShieldCheck,
    title: "تنفيذ احترافي",
    text: "فريق متكامل من المهندسين والمصممين لضمان تنفيذ العمل في الوقت المحدد وبأعلى معايير الجودة.",
    gradient: "from-sky-500/20 to-blue-300/10",
    iconColor: "text-sky-400",
    ringColor: "ring-sky-500/20",
  },
];

// ─── Decorative SVG Ornament ─────────────────────────────────────────────────

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

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')",
          }}
          aria-hidden
        />
        {/* Luxurious gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80"
          aria-hidden
        />

        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/40 bg-black/30 backdrop-blur-md text-[#F3E5AB] text-sm font-medium tracking-widest mb-8 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            الرياض · المملكة العربية السعودية
          </span>

          {/* Main Heading */}
          <h1 className="font-extrabold leading-tight tracking-tight text-balance max-w-3xl">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              لمسة إيفنس..
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] drop-shadow-md mt-2 text-3xl md:text-5xl lg:text-6xl">
              حيث تلتقي الفخامة بالإبداع
            </span>
          </h1>

          <GoldDivider />

          <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-loose tracking-wide mt-2">
            نصنع لك ذكريات لا تُنسى من خلال التخطيط الاستثنائي والتنفيذ
            الدقيق في قلب الرياض.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-base py-3 px-8 rounded-full shadow-[0_0_24px_rgba(212,175,55,0.45)] hover:shadow-[0_0_32px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-md border border-white/30 hover:border-[#D4AF37] text-white font-semibold text-base py-3 px-8 rounded-full hover:bg-white/15 hover:-translate-y-1 transition-all duration-300"
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════════════════════════════════
          OUR STORY SECTION
      ══════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 md:py-24 bg-background relative overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="container mx-auto px-6 max-w-5xl">
          {/* Section label */}
          <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase text-center mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-balance mb-4">
            من نحن
          </h2>

          <GoldDivider />

          {/* Pull quote */}
          <div className="relative mt-10 mb-12 flex flex-col items-center">
            <Quote
              className="h-10 w-10 text-[#D4AF37]/30 mb-4 rotate-180"
              aria-hidden
            />
            <blockquote className="text-center text-lg md:text-2xl font-light text-muted-foreground leading-loose tracking-wide max-w-3xl italic">
              نحن لسنا مجرد منظمي احتفالات، بل صناع تفاصيل استثنائية.
            </blockquote>
          </div>

          {/* Two-column narrative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-5">
              <p className="text-foreground/80 leading-loose text-base md:text-lg tracking-wide">
                تأسست{" "}
                <span className="text-[#D4AF37] font-semibold">
                  &quot;لمسة إيفنس&quot;
                </span>{" "}
                لترسي معايير جديدة في عالم تنظيم المناسبات الفاخرة، كوش
                الأفراح، وتجهيزات كبار الشخصيات (VIP).
              </p>
              <p className="text-muted-foreground leading-loose text-base md:text-lg tracking-wide">
                نجمع بين الفن المعماري في تصميم القاعات، ولمسات الذوق الرفيع
                لنحول خيالك إلى واقع ملموس يبهر كل من يحضر مناسبتك.
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-muted-foreground leading-loose text-base md:text-lg tracking-wide">
                نعمل مع كل عميل بروح الشراكة الحقيقية؛ نستمع لأحلامك، ونصوغ
                معك خطة إبداعية متكاملة تضمن ليلة لا تنسى.
              </p>
              <p className="text-foreground/80 leading-loose text-base md:text-lg tracking-wide">
                من كوش الأفراح الملكية إلى المخيمات التراثية الفاخرة، خبرتنا
                تمتد لتشمل كل أنواع المناسبات في قلب{" "}
                <span className="text-[#D4AF37] font-semibold">الرياض</span>.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { value: "+500", label: "مناسبة نُفِّذت" },
              { value: "+200", label: "عميل سعيد" },
              { value: "7+", label: "سنوات خبرة" },
              { value: "100%", label: "التزام بالجودة" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center gap-1 p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-card border ring-1 ring-border/50 hover:ring-[#D4AF37]/40 transition-all duration-300"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-[#D4AF37] to-[#B38728]">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VISION SECTION
      ══════════════════════════════════════════ */}
      <section className="relative py-8 sm:py-12 md:py-24 overflow-hidden">
        {/* Full-width gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-zinc-900 to-stone-900 dark:from-zinc-950 dark:via-stone-900 dark:to-neutral-900"
          aria-hidden
        />
        {/* Gold shimmer strips */}
        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
          aria-hidden
        />
        <div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"
          aria-hidden
        />
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-500/8 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Our Vision
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-balance mb-4">
            رؤيتنا
          </h2>

          <GoldDivider />

          <p className="mt-10 text-gray-300 text-lg md:text-2xl font-light leading-loose tracking-wide max-w-3xl mx-auto">
            أن نكون الوجهة الأولى والاسم الأكثر موثوقية لكل من يبحث عن
            <span className="text-[#F3E5AB] font-semibold">
              {" "}التفرد، الفخامة، والتميز{" "}
            </span>
            في ليلة العمر على مستوى المملكة العربية السعودية.
          </p>

          {/* Visual accent strip */}
          <div className="mt-16 grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="h-1 rounded-full bg-gradient-to-r from-[#BF953F] to-[#D4AF37]" />
            <div className="h-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FCF6BA]" />
            <div className="h-1 rounded-full bg-gradient-to-r from-[#FCF6BA] to-[#B38728]" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US SECTION
      ══════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 md:py-24 bg-background relative overflow-hidden">
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-6 sm:mb-10">
            <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-balance mb-4">
              لماذا تختارنا؟
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-loose max-w-xl mx-auto tracking-wide">
              ثلاثة مبادئ راسخة تجعل لمسة إيفنس الخيار الأول لكل من يطلب
              الأفضل.
            </p>
            <GoldDivider />
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-8 md:grid-cols-3">
            {whyCards.map(
              ({ id, Icon, title, text, gradient, iconColor, ringColor }) => (
                <article
                  key={id}
                  className={`group relative flex flex-col gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border ring-1 ${ringColor} backdrop-blur-sm hover:ring-[#D4AF37]/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Card glow bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl pointer-events-none`}
                    aria-hidden
                  />

                  {/* Icon */}
                  <div
                    className={`relative z-10 inline-flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-card border ring-1 ${ringColor} shadow-sm ${iconColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col gap-2 sm:gap-3">
                    <h3 className="text-sm sm:text-base md:text-xl font-bold tracking-tight">
                      {title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed sm:leading-loose tracking-wide text-xs sm:text-sm">
                      {text}
                    </p>
                  </div>

                  {/* Bottom gold accent line */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    aria-hidden
                  />
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CLOSING CTA STRIP
      ══════════════════════════════════════════ */}
      <section className="relative py-8 sm:py-12 md:py-24 overflow-hidden bg-gradient-to-r from-[#1a1100] via-[#2a1d00] to-[#1a1100] dark:from-zinc-950 dark:via-[#1e1600] dark:to-zinc-950">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=40&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10"
          aria-hidden
        />
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
            هل أنت مستعد لصنع لحظة{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
              لا تُنسى؟
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-lg leading-loose">
            تواصل معنا اليوم وسنكون سعداء بتحويل أحلامك إلى واقع فاخر.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-base py-3 px-10 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/services"
              className="border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#F3E5AB] hover:text-white font-semibold text-base py-3 px-10 rounded-full hover:bg-white/5 hover:-translate-y-1 transition-all duration-300"
            >
              استكشف خدماتنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
