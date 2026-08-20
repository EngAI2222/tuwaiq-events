import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    {
      id: "weddings",
      title: "حفلات الزفاف (كوش الأفراح)",
      desc: "تصاميم كوش فريدة وعصرية تناسب مختلف الأذواق مع إضاءة مدروسة وزهور طبيعية وتنسيق متكامل للقاعة.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      price: "يبدأ من 5,000 ريال",
    },
    {
      id: "dining",
      title: "طاولات عشاء وضيافة",
      desc: "تنسيق طاولات ولائم لكبار الشخصيات مع أرقى أنواع الشراشف وأطقم الضيافة المذهبة والفضية.",
      image: "https://images.unsplash.com/photo-1530103862679-de60920ae15a?q=80&w=800&auto=format&fit=crop",
      price: "يبدأ من 150 ريال/للطاولة",
    },
    {
      id: "vip-seating",
      title: "جلوس ملكي و VIP",
      desc: "كنب فاخر وجلسات ملكية مريحة تعكس فخامة استقبالك لضيوفك المميزين، مناسبة للرجال والنساء.",
      image: "https://images.unsplash.com/photo-1505912755138-08b27ef3c428?q=80&w=800&auto=format&fit=crop",
      price: "حسب الطلب",
    },
    {
      id: "heritage-camps",
      title: "مخيمات تراثية وبيت شعر",
      desc: "تجهيز خيام ملكية وبيوت شعر بلمسات تراثية أصيلة مع توفير كافة سبل الراحة والتدفئة والضيافة.",
      image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop",
      price: "يبدأ من 3,000 ريال",
    },
    {
      id: "corporate",
      title: "افتتاحات تجارية ومؤتمرات",
      desc: "تنظيم افتتاحات الشركات والمحلات والمؤتمرات مع توفير منصات العرض، الإضاءة، والصوتيات الاحترافية.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
      price: "حسب حجم الفعالية",
    },
    {
      id: "lighting-audio",
      title: "إضاءة وصوتيات",
      desc: "تأجير وتركيب أنظمة إضاءة متطورة وسماعات عالية الجودة تناسب حجم القاعة أو المساحة الخارجية.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
      price: "يبدأ من 1,000 ريال",
    }
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">الخدمات</h1>
          <p className="text-lg text-muted-foreground">
            نقدم لك باقة متنوعة من خدمات تنظيم وتجهيز المناسبات، مصممة خصيصاً لتلبي تطلعاتك وترتقي بحدثك إلى آفاق جديدة من الفخامة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group flex flex-col bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-primary">
                  {service.price}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-muted-foreground mb-6 flex-1">{service.desc}</p>
                <div className="flex gap-3 mt-auto">
                  <Button className="flex-1" asChild>
                    <Link href={`/services/${service.id}`}>التفاصيل</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/booking?service=${encodeURIComponent(service.title)}`}>احجز الآن</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
