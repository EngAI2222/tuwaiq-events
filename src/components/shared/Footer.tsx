import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

/* ─── Social Icon SVGs ───────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.166 3C8.756 3 6 5.756 6 9.166v.42c0 .398-.06.79-.178 1.166l-.32 1.003c-.09.278.065.576.347.656l.43.12c.49.137.817.595.792 1.1-.017.348-.22.65-.524.812-.198.105-.25.358-.116.527.5.634 1.52.943 3.07.937.253 0 .503.088.705.248.41.326.876.582 1.376.757.336.116.558.43.548.785-.01.334-.238.625-.56.726-.233.072-.46.166-.676.28-.098.052-.118.183-.04.262l.006.006c.304.297.78.351 1.144.13.42-.254.884-.388 1.36-.388.474 0 .938.134 1.357.387.365.22.84.167 1.145-.13l.007-.006c.078-.079.057-.21-.04-.262a4.1 4.1 0 0 0-.678-.28c-.32-.1-.548-.392-.558-.726-.011-.354.211-.669.547-.785.5-.175.966-.43 1.377-.757.2-.16.45-.248.703-.248 1.55.006 2.57-.303 3.07-.937.135-.17.083-.422-.116-.527a1.067 1.067 0 0 1-.523-.813c-.025-.504.3-.962.791-1.1l.43-.12a.576.576 0 0 0 .348-.655l-.321-1.003a3.495 3.495 0 0 1-.178-1.167v-.42C18 5.756 15.244 3 11.834 3h.332Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

/* ─── Social Link ────────────────────────────────────────────── */
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground flex items-center justify-center transition-all duration-200 hover:scale-110"
    >
      {children}
    </a>
  );
}

/* ─── Payment Badge ──────────────────────────────────────────── */
function PaymentBadge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-md border border-border bg-background text-xs font-semibold text-foreground tracking-wide">
      {label}
    </span>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* ── 3-Column Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          {/* ── Column 1: Brand ──────────────────────────── */}
          <div className="flex flex-col items-center">
            <Link href="/">
              <Image
                src="/logo.jpeg"
                alt="LAMSA EVENTS"
                width={120}
                height={40}
                className="object-contain mb-4"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px]">
              لمسة إيفنس للمناسبات الفاخرة
              <br />
              تجارب استثنائية لكل حدث
            </p>
          </div>

          {/* ── Column 2: Contact & Social & Payments ────── */}
          <div className="flex flex-col items-center gap-5">
            {/* Email */}
            <div>
              <p className="font-bold text-primary mb-2 text-base">راسلنا الآن</p>
              <a
                href="mailto:lamsa.events.sa@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                lamsa.events.sa@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialLink href="https://vercel.com/2-de4e/tuwaiq-events" label="إنستقرام">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="#" label="سناب شات">
                <SnapchatIcon />
              </SocialLink>
              <SocialLink href="#" label="تيك توك">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href="#" label="يوتيوب">
                <YouTubeIcon />
              </SocialLink>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-muted-foreground text-xs">خدمة الدفع متاحة عن طريق :</p>
              <div className="flex flex-wrap justify-center gap-2">
                <PaymentBadge label="Tabby" />
                <PaymentBadge label="Apple Pay" />
                <PaymentBadge label="mada" />
              </div>
            </div>
          </div>

          {/* ── Column 3: Legal & Tax ────────────────────── */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <BadgeCheck className="w-7 h-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              {/* ← Easy to replace: update the number below */}
              <p>
                <span className="font-semibold text-foreground">سجل تجاري:</span>{" "}
                1010000000
              </p>
              {/* ← Easy to replace: update the number below */}
              <p>
                <span className="font-semibold text-foreground">الرقم الضريبي:</span>{" "}
                300000000000003
              </p>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ───────────────────────────────────── */}
        <div className="border-t mt-12 pt-6 flex flex-col items-center gap-1 text-center">
          <span suppressHydrationWarning className="text-muted-foreground text-sm">
            جميع الحقوق محفوظة لشركة لمسة إيفنس © {new Date().getFullYear()}
          </span>
          <span className="text-muted-foreground/60 text-xs">
            تم التصميم بواسطة{" "}
            <a
              href="https://github.com/EngAI2222"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              EngAI2222
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
}
