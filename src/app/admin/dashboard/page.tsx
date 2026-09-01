"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  eventType: string;
  date: string | null;
  guests: string | null;
  budget: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchBookings();
    }
  }, [user]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchBookings();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (authLoading || !isAuthenticated || user?.role !== "admin") return null;

  return (
    <div className="py-8 sm:py-12 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-primary">لوحة الإدارة</h1>
          <p className="text-lg text-muted-foreground">إدارة الحجوزات وطلبات النظام</p>
        </div>
        <p className="font-bold text-sm bg-primary/10 text-primary px-4 py-2 rounded-full">
          المدير: {user?.name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-sm text-muted-foreground mb-2">إجمالي الطلبات</h3>
          <p className="text-4xl font-black text-primary">{loadingBookings ? "-" : bookings.length}</p>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-sm text-muted-foreground mb-2">الطلبات المعلقة</h3>
          <p className="text-4xl font-black text-amber-500">
            {loadingBookings ? "-" : bookings.filter(b => b.status === "Pending").length}
          </p>
        </div>
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-sm text-muted-foreground mb-2">الطلبات المؤكدة</h3>
          <p className="text-4xl font-black text-green-500">
            {loadingBookings ? "-" : bookings.filter(b => b.status === "Confirmed").length}
          </p>
        </div>
      </div>

      <div className="bg-card border rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/20">
          <h2 className="text-2xl font-bold">الحجوزات الأخيرة</h2>
        </div>
        
        {loadingBookings ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">لا توجد حجوزات حتى الآن</h3>
            <p className="text-muted-foreground">عندما يقوم العملاء بطلب حجوزات ستظهر هنا.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="p-4 font-semibold">رقم الطلب</th>
                  <th className="p-4 font-semibold">المناسبة</th>
                  <th className="p-4 font-semibold">التاريخ</th>
                  <th className="p-4 font-semibold">الضيوف</th>
                  <th className="p-4 font-semibold">الحالة</th>
                  <th className="p-4 font-semibold text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono text-sm text-muted-foreground">{booking.id.slice(-6).toUpperCase()}</td>
                    <td className="p-4 font-bold">{booking.eventType}</td>
                    <td className="p-4">{booking.date || "غير محدد"}</td>
                    <td className="p-4">{booking.guests || "غير محدد"}</td>
                    <td className="p-4">
                      {booking.status === "Pending" && <span className="bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Clock className="w-3 h-3"/> معلق</span>}
                      {booking.status === "Confirmed" && <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3"/> مؤكد</span>}
                      {booking.status === "Cancelled" && <span className="bg-red-500/10 text-red-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-max"><XCircle className="w-3 h-3"/> ملغي</span>}
                    </td>
                    <td className="p-4 flex gap-2 justify-center">
                      {booking.status === "Pending" && (
                        <>
                          <Button size="sm" onClick={() => updateStatus(booking.id, "Confirmed")} className="bg-green-600 hover:bg-green-700 text-white rounded-full">تأكيد</Button>
                          <Button size="sm" variant="destructive" onClick={() => updateStatus(booking.id, "Cancelled")} className="rounded-full">إلغاء</Button>
                        </>
                      )}
                      {booking.status !== "Pending" && (
                        <Button size="sm" variant="outline" onClick={() => updateStatus(booking.id, "Pending")} className="rounded-full">إعادة لمعلق</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
