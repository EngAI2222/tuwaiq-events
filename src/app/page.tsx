import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Users, MapPin, ArrowLeft } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat z-0" />
        {/* Dark luxurious overlay — removes foggy effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-0" />
        
        <div className="container relative z-10 mx-auto px-4 text-center flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full bg-background/20 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 animate-fade-in">
            المنصة الأولى لتنظيم المناسبات في السعودية
          </span>
          <h1 className="font-extrabold leading-tight tracking-tight text-center">
            <span className="text-white text-4xl md:text-6xl lg:text-7xl drop-shadow-lg block">
              اجعل مناسبتك القادمة
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] drop-shadow-md block mt-2 text-4xl md:text-6xl lg:text-7xl">
              تحفة فنية لا تُنسى
            </span>
          </h1>
          <p className="text-gray-200 text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto mt-6 mb-10 drop-shadow-md">
            نجمع بين الفخامة والذكاء الاصطناعي لتصميم وتجهيز حفلات الزفاف والمناسبات الخاصة بدقة متناهية تعكس ذوقك الرفيع.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/booking"
              className="bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-lg py-3 px-10 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              احجز مناسبتك الآن
            </Link>
            <Link
              href="/gallery"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/20 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              استكشف أعمالنا
            </Link>
          </div>
        </div>
      </section>

      {/* AI PLANNER CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  <Sparkles className="h-4 w-4" />
                  <span>حصرياً لدى LAMSA</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">صمّم مناسبتك بالذكاء الاصطناعي</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  لا داعي للحيرة! أدخل تفضيلاتك، ميزانيتك، وعدد ضيوفك، وسيقوم مساعدنا الذكي باقتراح خطة كاملة تشمل الألوان، الديكور، والخدمات المناسبة لك في ثوانٍ.
                </p>
                <Button size="lg" className="h-12 px-6 gap-2" asChild>
                  <Link href="/ai-planner">
                    ابدأ التصميم الآن
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center gap-3 transform transition-transform hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">تخطيط زمني</h3>
                  <p className="text-xs text-muted-foreground">جدول دقيق لجميع التجهيزات</p>
                </div>
                <div className="bg-background p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center gap-3 transform transition-transform hover:-translate-y-1 translate-y-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">اختيار المكان</h3>
                  <p className="text-xs text-muted-foreground">اقتراحات للقاعات والمخيمات</p>
                </div>
                <div className="bg-background p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center gap-3 transform transition-transform hover:-translate-y-1 -translate-y-4">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">إدارة الضيوف</h3>
                  <p className="text-xs text-muted-foreground">توزيع الطاولات والاستقبال</p>
                </div>
                <div className="bg-background p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center gap-3 transform transition-transform hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">لمسات سحرية</h3>
                  <p className="text-xs text-muted-foreground">تصاميم وديكورات فريدة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">لماذا تختارنا</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ست نقاط عملية — التفاصيل الكاملة في صفحة من نحن.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-start max-w-6xl mx-auto">
            <div className="bg-background p-8 rounded-3xl border shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Calendar className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold">التخطيط للمناسبة</h3>
              <p className="text-muted-foreground leading-relaxed">تفاصيل مرتبة وتجربة انسيابية من البداية للنهاية.</p>
            </div>
            <div className="bg-background p-8 rounded-3xl border shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Users className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold">الخبرة في التنفيذ</h3>
              <p className="text-muted-foreground leading-relaxed">مشهد متناغم وتنفيذ سلس في أرض الواقع.</p>
            </div>
            <div className="bg-background p-8 rounded-3xl border shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Sparkles className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold">أفكار بتنسيق راقٍ</h3>
              <p className="text-muted-foreground leading-relaxed">حضور أنيق دون مبالغة أو ازدحام بصري.</p>
            </div>
            <div className="bg-background p-8 rounded-3xl border shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><MapPin className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold">الالتزام بالوقت</h3>
              <p className="text-muted-foreground leading-relaxed">جاهزية الموقع قبل الضيوف واحترام الجدول.</p>
            </div>
            <div className="bg-background p-8 rounded-3xl border shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Calendar className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold">تنوع الخيارات</h3>
              <p className="text-muted-foreground leading-relaxed">حلول لزفاف وملكة وأعياد واستقبالات بمرونة.</p>
            </div>
            <div className="bg-background p-8 rounded-3xl border shadow-sm flex flex-col gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Sparkles className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold">تجربة أكثر راحة</h3>
              <p className="text-muted-foreground leading-relaxed">تشغيل وجمال معًا لتجربة مرتبة وهادئة.</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/about">من نحن — المزيد</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">خدماتنا المتميزة</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">
            نقدم مجموعة متكاملة من الخدمات الفاخرة لتغطية كافة احتياجات مناسبتك من الألف إلى الياء.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start max-w-5xl mx-auto">
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
              <Link href="/services" key={i} className="group block rounded-2xl overflow-hidden border bg-card hover:shadow-xl transition-all">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12">
            <Button variant="outline" size="lg" asChild className="rounded-full">
              <Link href="/services">عرض جميع الخدمات</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
