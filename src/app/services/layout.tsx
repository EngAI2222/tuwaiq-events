import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخدمات | لمسة إيفنس",
  description:
    "استكشف خدمات لمسة إيفنس الفاخرة: كوش الأفراح، طاولات VIP، جلوس ملكي، أنظمة صوت وإضاءة، وتصميم المناسبات بالذكاء الاصطناعي.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
