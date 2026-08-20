import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="font-bold text-2xl tracking-tighter text-primary block mb-4">
              NEXORA<span className="text-foreground"> EVENTS</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              منصتك الذكية الأولى في المملكة لتنظيم وتجهيز المناسبات الفاخرة، مدعومة بأحدث تقنيات الذكاء الاصطناعي لتجربة لا تُنسى.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">الخدمات</h3>
            <ul className="space-y-3">
              <li><Link href="/services/weddings" className="text-muted-foreground hover:text-primary text-sm">حفلات الزفاف</Link></li>
              <li><Link href="/services/corporate" className="text-muted-foreground hover:text-primary text-sm">مناسبات الشركات</Link></li>
              <li><Link href="/services/decorations" className="text-muted-foreground hover:text-primary text-sm">الديكور والإضاءة</Link></li>
              <li><Link href="/services/hospitality" className="text-muted-foreground hover:text-primary text-sm">الضيافة والاستقبال</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary text-sm">من نحن</Link></li>
              <li><Link href="/packages" className="text-muted-foreground hover:text-primary text-sm">الباقات والأسعار</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary text-sm">معرض الأعمال</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">اتصل بنا</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground text-sm">الرياض، المملكة العربية السعودية</li>
              <li className="text-muted-foreground text-sm">info@nexoraevents.com</li>
              <li className="text-muted-foreground text-sm" dir="ltr">+966 50 000 0000</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-right">
            <span suppressHydrationWarning className="text-muted-foreground text-sm">© {new Date().getFullYear()} NEXORA EVENTS. جميع الحقوق محفوظة.</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm">سياسة الخصوصية</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
