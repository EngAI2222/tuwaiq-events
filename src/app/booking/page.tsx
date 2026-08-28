"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Users, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const preSelectedService = searchParams.get("service") || "تنسيق حفلة زفاف";
  
  const [eventType, setEventType] = useState(preSelectedService);
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          date,
          guests,
          budget,
          userId: user?.id || null
        })
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      
    } catch (error) {
      console.error("Booking error:", error);
      alert("عذراً، حدث خطأ أثناء إرسال الطلب.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-card border rounded-3xl p-12 text-center shadow-lg w-full">
        <CheckCircle2 className="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-primary">تم استلام طلبك!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          تم تسجيل طلب الحجز بنجاح. سيقوم فريق لمسة إيفنس بمراجعته والتواصل معك في أقرب وقت.
        </p>
        <p className="text-sm text-muted-foreground">جاري تحويلك إلى لوحة التحكم...</p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-3xl shadow-xl w-full overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 bg-primary p-8 text-primary-foreground flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-4">احجز مناسبتك</h2>
        <p className="opacity-90 mb-6">لمسة إيفنس تضمن لك تجربة استثنائية من التخطيط حتى التنفيذ.</p>
        <ul className="space-y-3 text-sm opacity-80">
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> سرعة في الرد</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> مرونة في الباقات</li>
          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> جودة لا تضاهى</li>
        </ul>
      </div>
      
      <div className="md:w-2/3 p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>نوع المناسبة / الخدمة</Label>
            <Input 
              value={eventType} 
              onChange={(e) => setEventType(e.target.value)} 
              className="h-12 bg-muted/50 rounded-xl"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>التاريخ المقترح</Label>
              <div className="relative">
                <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                  className="h-12 pr-10 bg-muted/50 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>عدد الضيوف</Label>
              <div className="relative">
                <Users className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="number" 
                  placeholder="مثال: 300"
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  className="h-12 pr-10 bg-muted/50 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>الميزانية التقريبية (ريال)</Label>
            <Input 
              type="number"
              placeholder="حسب الاختيار"
              value={budget} 
              onChange={(e) => setBudget(e.target.value)} 
              className="h-12 bg-muted/50 rounded-xl"
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg rounded-xl font-bold shadow-md shadow-primary/20">
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "إرسال الطلب"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="py-24 container mx-auto px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Suspense fallback={<div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
