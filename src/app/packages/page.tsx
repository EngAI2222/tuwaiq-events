import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

export default function PackagesPage() {
  const packages = [
    {
      id: "basic",
      name: "الباقة الأساسية",
      desc: "مثالية للمناسبات العائلية الصغيرة وحفلات الخطوبة.",
      price: "15,000",
      features: [
        "كوشة زفاف بتصميم كلاسيكي",
        "تنسيق طاولات لعدد 100 ضيف",
        "إضاءة أساسية للقاعة",
        "خدمة ضيافة أساسية",
        "ممر استقبال بسيط"
      ],
      isPopular: false,
      color: "bg-zinc-100 dark:bg-zinc-900"
    },
    {
      id: "premium",
      name: "الباقة المميزة",
      desc: "الخيار الأكثر طلباً لحفلات الزفاف المتوسطة والكبيرة.",
      price: "35,000",
      features: [
        "كوشة زفاف بتصميم عصري وخاص",
        "تنسيق طاولات فاخر لعدد 300 ضيف",
        "إضاءة مسرحية متكاملة",
        "خدمة ضيافة VIP مع مشرفين",
        "ممر استقبال فاخر مع زهور طبيعية",
        "تصوير فيديو فوتوغرافي"
      ],
      isPopular: true,
      color: "bg-primary text-primary-foreground"
    },
    {
      id: "luxury",
      name: "الباقة الملكية",
      desc: "للباحثين عن الفخامة الاستثنائية والتفرد في أدق التفاصيل.",
      price: "75,000",
      features: [
        "كوشة زفاف أسطورية بتصميم حصري",
        "تنسيق طاولات ملكي لعدد غير محدود",
        "إضاءة وليزر وشاشات عرض احترافية",
        "خدمة ضيافة ملكية وطاقم كامل",
        "استقبال وتشريفات فندقية 5 نجوم",
        "هندسة صوتية متكاملة",
        "إدارة وتنظيم الحدث بالكامل"
      ],
      isPopular: false,
      color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">الباقات والأسعار</h1>
          <p className="text-lg text-muted-foreground">
            صممنا باقات متكاملة تلبي كافة احتياجاتك وتناسب مختلف الميزانيات. اختر الباقة التي تناسبك أو استخدم مساعدنا الذكي لتصميم باقة مخصصة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`relative flex flex-col rounded-3xl p-8 border shadow-lg transition-transform hover:-translate-y-2 ${pkg.isPopular ? 'border-primary shadow-primary/20 md:-mt-8 md:mb-8' : 'bg-card'}`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                  <Sparkles className="w-4 h-4" />
                  الأكثر طلباً
                </div>
              )}
              
              <div className="mb-8">
                <h2 className={`text-2xl font-bold mb-2 ${pkg.isPopular ? 'text-primary' : ''}`}>{pkg.name}</h2>
                <p className="text-muted-foreground min-h-[48px]">{pkg.desc}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-black">{pkg.price}</span>
                <span className="text-muted-foreground"> ريال سعودي</span>
              </div>
              
              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.isPopular ? 'text-primary' : 'text-green-500'}`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full h-12 text-lg" 
                variant={pkg.isPopular ? 'default' : 'outline'}
                asChild
              >
                <Link href={`/booking?service=${encodeURIComponent(pkg.name)}`}>اختر الباقة</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-3 text-primary">هل تبحث عن شيء مختلف؟</h3>
            <p className="text-muted-foreground text-lg max-w-xl">
              لا تدع الباقات تقيدك! استخدم مساعد LAMSA الذكي لتصميم باقة مخصصة بالكامل تناسب ذوقك وميزانيتك بدقة متناهية.
            </p>
          </div>
          <Button size="lg" className="h-14 px-8 text-lg shrink-0 gap-2" asChild>
            <Link href="/ai-planner">
              <Sparkles className="w-5 h-5" />
              صمم باقتك بالذكاء الاصطناعي
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
