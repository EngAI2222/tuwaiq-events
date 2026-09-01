"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, Clock, Calendar, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Booking {
  id: string;
  eventType: string;
  date: string | null;
  guests: string | null;
  budget: string | null;
  status: string;
  createdAt: string;
  userId: string | null;
}

interface AiPlan {
  id: string;
  userId: string | null;
  promptData: string;
  generatedPlanJSON: string;
  createdAt: string;
}

export default function CustomerDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [aiPlans, setAiPlans] = useState<AiPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role === "admin") {
        router.push("/admin/dashboard");
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  const fetchData = async () => {
    try {
      const [bookingsRes, plansRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/ai-plans")
      ]);
      const bookingsData = await bookingsRes.json();
      const plansData = await plansRes.json();
      
      // Filter by the current mock user id or show all if we simulate a single user for now
      setBookings(bookingsData);
      setAiPlans(plansData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "user") {
      fetchData();
    }
  }, [user]);

  if (authLoading || !isAuthenticated || user?.role !== "user") return null;

  return (
    <div className="py-8 sm:py-12 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="mb-12 text-center md:text-right">
        <h1 className="text-4xl font-bold mb-2 text-primary">مرحباً، {user?.name}</h1>
        <p className="text-lg text-muted-foreground">تابع تفاصيل مناسبتك وتصاميمك الذكية من مكان واحد.</p>
      </div>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto md:mx-0 grid-cols-2 h-14 bg-muted/50 rounded-full p-1 mb-8">
          <TabsTrigger value="bookings" className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">حجوزاتي</TabsTrigger>
          <TabsTrigger value="ai-plans" className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">تصاميمي الذكية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="mt-0">
          <div className="bg-card border rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
            <div className="p-6 border-b bg-muted/20">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                سجل الحجوزات
              </h2>
            </div>
            
            {loading ? (
              <div className="p-12 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">ليس لديك أي حجوزات بعد</h3>
                <p className="text-muted-foreground mb-6">احجز مناسبتك القادمة ودعنا نهتم بأدق التفاصيل.</p>
                <button onClick={() => router.push("/services")} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-md hover:opacity-90 transition-opacity">تصفح الخدمات</button>
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-2xl p-6 bg-background shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl">{booking.eventType}</h3>
                        <p className="text-sm text-muted-foreground mt-1">رقم الطلب: {booking.id.slice(-6).toUpperCase()}</p>
                      </div>
                      <div className="shrink-0">
                        {booking.status === "Pending" && <span className="bg-amber-500/10 text-amber-600 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1"><Clock className="w-4 h-4"/> قيد المراجعة</span>}
                        {booking.status === "Confirmed" && <span className="bg-green-500/10 text-green-600 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> مؤكد</span>}
                        {booking.status === "Cancelled" && <span className="bg-red-500/10 text-red-600 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1"><XCircle className="w-4 h-4"/> ملغي</span>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-6 p-4 bg-muted/30 rounded-xl">
                      <div>
                        <span className="text-muted-foreground block mb-1">التاريخ المقترح</span>
                        <span className="font-semibold">{booking.date || "غير محدد"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">عدد الضيوف</span>
                        <span className="font-semibold">{booking.guests || "غير محدد"}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">الميزانية التقديرية</span>
                        <span className="font-semibold">{booking.budget ? booking.budget + " ريال" : "غير محدد"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ai-plans" className="mt-0">
          <div className="bg-card border rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
            <div className="p-6 border-b bg-muted/20">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                الخطط الذكية المحفوظة
              </h2>
            </div>
            
            {loading ? (
              <div className="p-12 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : aiPlans.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">لم تقم بتوليد أي خطط ذكية</h3>
                <p className="text-muted-foreground mb-6">استخدم المصمم الذكي لإنشاء خطة مناسبتك المثالية في ثوانٍ.</p>
                <button onClick={() => router.push("/ai-planner")} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-md hover:opacity-90 transition-opacity">تجربة المصمم الذكي</button>
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiPlans.map((plan) => {
                  let parsedPlan = { theme: "مجهول", budget: "", colors: [] };
                  let parsedPrompt = { eventType: "غير محدد" };
                  try {
                    parsedPlan = typeof plan.generatedPlanJSON === 'string' ? JSON.parse(plan.generatedPlanJSON) : plan.generatedPlanJSON;
                    parsedPrompt = typeof plan.promptData === 'string' ? JSON.parse(plan.promptData) : plan.promptData;
                  } catch(e) {}

                  return (
                    <div key={plan.id} className="border rounded-2xl p-6 bg-gradient-to-br from-background to-primary/5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                      <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-xl text-primary">{parsedPrompt.eventType}</h3>
                          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md" suppressHydrationWarning>{plan.createdAt ? plan.createdAt.substring(0, 10) : "جديد"}</span>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm text-muted-foreground">الطابع المختار:</span>
                            <p className="font-semibold">{parsedPlan.theme}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">الميزانية التقديرية للذكاء الاصطناعي:</span>
                            <p className="font-semibold text-lg">{parsedPlan.budget}</p>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground block mb-2">لوحة الألوان:</span>
                            <div className="flex gap-2">
                              {parsedPlan.colors?.map((c: string, i: number) => (
                                <div key={i} className="w-8 h-8 rounded-full shadow-md border border-black/10" style={{ backgroundColor: c }} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <button className="w-full mt-6 bg-background border border-primary/20 text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
                          طلب تنفيذ هذه الخطة
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
