import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { FloatingActions } from "@/components/shared/FloatingActions";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tuwaiq-events.vercel.app'),
  title: 'لمسة إيفنس | Lamsa Evens',
  description: 'لمسة إيفنس لتنظيم الحفلات والمناسبات الفاخرة في الرياض. Lamsa Evens for luxury event and wedding planning in Riyadh, Saudi Arabia.',
  keywords: ['لمسة إيفنس', 'حفلات لمسة إيفنس', 'حفلات إيفنس', 'منظم حفلات بالرياض', 'تنسيق حفلات زفاف', 'Lamsa Evens', 'Event Planner Riyadh', 'Wedding Planner Saudi Arabia'],
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'لمسة إيفنس | Lamsa Evens',
    description: 'لمسة إيفنس لتنظيم الحفلات والمناسبات الفاخرة في الرياض. Lamsa Evens for luxury event and wedding planning in Riyadh, Saudi Arabia.',
    url: 'https://tuwaiq-events.vercel.app',
    siteName: 'لمسة إيفنس | Lamsa Evens',
    images: [
      {
        url: '/logo.jpeg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'لمسة إيفنس | Lamsa Evens',
    description: 'لمسة إيفنس لتنظيم الحفلات والمناسبات الفاخرة في الرياض. Lamsa Evens for luxury event and wedding planning in Riyadh, Saudi Arabia.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EventPlanner"],
  "name": "لمسة إيفنس للمناسبات الفاخرة (LAMSA EVENTS)",
  "image": "https://lams-event.com/images/1.jpeg",
  "description": "منصة رائدة لتنظيم وتجهيز المناسبات وحفلات الزفاف الفاخرة في الرياض.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "شارع العليا",
    "addressLocality": "الرياض",
    "addressRegion": "الرياض",
    "postalCode": "12211",
    "addressCountry": "SA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 24.7136,
    "longitude": 46.6753
  },
  "telephone": "+966500000000",
  "priceRange": "$$$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <FloatingActions />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
