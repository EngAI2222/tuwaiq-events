"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Clock,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  phone: string;
  date: string;
  eventType: string;
  message: string;
};

const EVENT_TYPES = [
  "حفل زفاف (كوشة أفراح)",
  "ليلة الملكة",
  "حفل تخرج",
  "مؤتمر أو افتتاح",
  "عشاء وضيافة VIP",
  "مخيم تراثي",
  "أخرى",
];

const CONTACT_INFO = [
  {
    id: "whatsapp",
    Icon: MessageCircle,
    label: "واتساب",
    value: "+966 50 000 0000",
    href: "https://wa.me/966500000000",
    iconColor: "text-emerald-400",
    ringColor: "ring-emerald-500/20",
    glowColor: "from-emerald-500/15 to-green-600/5",
  },
  {
    id: "phone",
    Icon: Phone,
    label: "هاتف",
    value: "+966 50 000 0000",
    href: "tel:+966500000000",
    iconColor: "text-sky-400",
    ringColor: "ring-sky-500/20",
    glowColor: "from-sky-500/15 to-blue-600/5",
  },
  {
    id: "email",
    Icon: Mail,
    label: "البريد الإلكتروني",
    value: "hello@lamsa-events.sa",
    href: "mailto:hello@lamsa-events.sa",
    iconColor: "text-amber-400",
    ringColor: "ring-amber-500/20",
    glowColor: "from-amber-500/15 to-yellow-600/5",
  },
  {
    id: "location",
    Icon: MapPin,
    label: "الموقع",
    value: "شارع العليا، الرياض",
    href: "https://maps.google.com",
    iconColor: "text-rose-400",
    ringColor: "ring-rose-500/20",
    glowColor: "from-rose-500/15 to-pink-600/5",
  },
  {
    id: "hours",
    Icon: Clock,
    label: "ساعات العمل",
    value: "السبت – الخميس: 9ص – 10م",
    href: null,
    iconColor: "text-purple-400",
    ringColor: "ring-purple-500/20",
    glowColor: "from-purple-500/15 to-violet-600/5",
  },
];

// ─── Floating Label Input ─────────────────────────────────────────────────────

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full px-5 pt-6 pb-2.5 rounded-2xl bg-white/5 border border-border/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-foreground placeholder-transparent outline-none transition-all duration-300 backdrop-blur-sm text-sm"
        placeholder={label}
        dir="rtl"
      />
      <label
        htmlFor={id}
        className={`absolute right-5 pointer-events-none text-muted-foreground transition-all duration-200 ${
          active ? "top-2 text-xs text-[#D4AF37]" : "top-4 text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        rows={4}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full px-5 pt-6 pb-3 rounded-2xl bg-white/5 border border-border/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-foreground placeholder-transparent outline-none transition-all duration-300 backdrop-blur-sm resize-none text-sm"
        placeholder={label}
        dir="rtl"
      />
      <label
        htmlFor={id}
        className={`absolute right-5 pointer-events-none text-muted-foreground transition-all duration-200 ${
          active ? "top-2 text-xs text-[#D4AF37]" : "top-4 text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

// ─── Gold Divider ─────────────────────────────────────────────────────────────

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

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    date: "",
    eventType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("عذراً، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')",
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
            تواصل معنا
          </span>

          <h1 className="font-extrabold leading-tight text-balance max-w-3xl">
            <span className="block text-white text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
              تواصل معنا..
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] mt-2 text-2xl md:text-4xl lg:text-5xl">
              لنبدأ بتصميم ليلتك الاستثنائية
            </span>
          </h1>

          <GoldDivider />

          <p className="text-gray-300 text-base md:text-xl font-light max-w-2xl mx-auto leading-loose tracking-wide">
            فريقنا مستعد لسماعك ومساعدتك في تخطيط مناسبة لا تُنسى.
          </p>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent"
          aria-hidden
        />
      </section>

      {/* ══════════════════════════════
          MAIN CONTENT: 2 COLUMNS
      ══════════════════════════════ */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-500/5 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* ─── RIGHT COLUMN: FORM ───────────────────────── */}
            <div className="order-1 lg:order-1">
              <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
                نموذج التواصل
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                أرسل طلبك الآن
              </h2>
              <p className="text-muted-foreground text-sm leading-loose mb-8">
                أخبرنا عن مناسبتك وسنتواصل معك خلال ٢٤ ساعة.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-5 py-16 rounded-3xl bg-card border ring-1 ring-[#D4AF37]/30 text-center">
                  <CheckCircle2
                    className="h-16 w-16 text-[#D4AF37]"
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      تم إرسال طلبك بنجاح!
                    </h3>
                    <p className="text-muted-foreground text-sm leading-loose max-w-xs mx-auto">
                      شكراً لتواصلك مع لمسة إيفنس. سيتصل بك فريقنا خلال ٢٤
                      ساعة.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  aria-label="نموذج التواصل"
                >
                  {/* Glass form container */}
                  <div className="p-6 rounded-3xl bg-card border ring-1 ring-border/50 flex flex-col gap-5 backdrop-blur-sm">
                    <FloatingInput
                      id="contact-name"
                      label="الاسم الكريم"
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                    <FloatingInput
                      id="contact-phone"
                      label="رقم الجوال"
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      required
                    />
                    <FloatingInput
                      id="contact-date"
                      label="تاريخ المناسبة"
                      type="date"
                      value={form.date}
                      onChange={set("date")}
                    />

                    {/* Event type select */}
                    <div className="relative">
                      <label
                        htmlFor="contact-event-type"
                        className="block text-xs text-muted-foreground mb-2 px-1"
                      >
                        نوع المناسبة
                      </label>
                      <select
                        id="contact-event-type"
                        value={form.eventType}
                        onChange={(e) => set("eventType")(e.target.value)}
                        dir="rtl"
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-border/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 text-foreground outline-none transition-all duration-300 backdrop-blur-sm text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          اختر نوع المناسبة
                        </option>
                        {EVENT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <FloatingTextarea
                      id="contact-message"
                      label="رسالتك أو تفاصيل إضافية"
                      value={form.message}
                      onChange={set("message")}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-3 w-full bg-[#D4AF37] hover:bg-[#F3E5AB] disabled:opacity-70 text-black font-bold text-base py-4 px-10 rounded-2xl shadow-[0_0_24px_rgba(212,175,55,0.4)] hover:shadow-[0_0_36px_rgba(212,175,55,0.65)] hover:-translate-y-1 transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <span className="h-5 w-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" aria-hidden />
                        إرسال الطلب
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ─── LEFT COLUMN: CONTACT INFO ────────────────── */}
            <div className="order-2 lg:order-2 flex flex-col gap-6">
              <div>
                <p className="text-[#D4AF37] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
                  بيانات التواصل
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                  نحن دائماً هنا
                </h2>
                <p className="text-muted-foreground text-sm leading-loose mb-8">
                  يسعدنا التواصل معك عبر أي قناة تفضلها.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map(
                  ({ id, Icon, label, value, href, iconColor, ringColor, glowColor }) => (
                    <article
                      key={id}
                      className={`group relative flex items-center gap-5 p-5 rounded-2xl bg-card border ring-1 ${ringColor} hover:ring-[#D4AF37]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-400 overflow-hidden cursor-pointer`}
                    >
                      {/* Hover glow bg */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`}
                        aria-hidden
                      />

                      {/* Icon */}
                      <div
                        className={`relative z-10 flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-card border ring-1 ${ringColor} shadow-sm ${iconColor} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>

                      {/* Text */}
                      <div className="relative z-10 flex flex-col">
                        <span className="text-xs text-muted-foreground tracking-wide mb-0.5">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm md:text-base font-semibold hover:text-[#D4AF37] transition-colors duration-200"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm md:text-base font-semibold">
                            {value}
                          </span>
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>

              {/* WhatsApp quick CTA */}
              <a
                href="https://wa.me/966500000000?text=مرحباً، أريد الاستفسار عن خدماتكم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full border-2 border-emerald-500/50 hover:border-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-500 font-bold text-base py-4 px-8 rounded-2xl hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300 mt-2"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                تواصل عبر واتساب الآن
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
