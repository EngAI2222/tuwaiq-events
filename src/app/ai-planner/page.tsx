"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIPlannerPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  // Form Data
  const [eventType, setEventType] = useState("حفل زفاف");
  const [city, setCity] = useState("الرياض");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [theme, setTheme] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, city, guests, budget, theme }),
      });
      const data = await res.json();
      setPlan(data);
    } catch (error) {
      console.error("Failed to fetch AI plan:", error);
      // Fallback in case of absolute network failure
      setPlan({
        suggestedTheme: theme || "ملكي فاخر",
        colors: ["#D4AF37", "#002B5B", "#FDFBF7"],
        estimatedCost: budget ? `${budget} ريال` : "حسب الاختيار",
        equipment: ["تنسيق شامل للمناسبة", "استقبال VIP", "إضاءة متقدمة", "منصة عرض", "تنسيق أزهار طبيعية"]
      });
    } finally {
      setIsGenerating(false);
      setStep(4);
    }
  };

  const handleSavePlan = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/ai-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptData: { eventType, city, guests, budget, theme },
          generatedPlanJSON: plan
        })
      });
      alert("تم حفظ واعتماد الخطة بنجاح في قاعدة البيانات!");
    } catch (error) {
      console.error("Failed to save plan:", error);
      alert("حدث خطأ أثناء حفظ الخطة.");
    } finally {
      setIsSaving(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="py-8 sm:py-12 md:py-24 min-h-screen bg-muted/20 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4 text-primary">
            <Sparkles className="w-10 h-10" />
            المصمم الذكي
          </h1>
          <p className="text-lg text-muted-foreground">
            دع الذكاء الاصطناعي يصمم مناسبتك بدقة بناءً على تفضيلاتك وميزانيتك.
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-xl border overflow-hidden relative min-h-[450px]">
          
          {/* Progress Bar */}
          <div className="flex bg-muted/50 border-b relative">
            <div 
              className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 4) * 100}%` }} 
            />
            {["نوع المناسبة", "الموقع والضيوف", "الميزانية والطابع", "النتيجة"].map((label, i) => (
              <div key={i} className={`flex-1 text-center py-4 font-semibold text-xs sm:text-sm transition-colors ${step > i ? 'text-primary' : 'text-muted-foreground'}`}>
                {label}
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">أخبرنا عن مناسبتك</h2>
                  <div className="space-y-4 max-w-md mx-auto">
                    <Label className="text-lg">ما هو نوع المناسبة التي تخطط لها؟</Label>
                    <select 
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="flex h-14 w-full rounded-full border bg-background px-4 py-2 text-lg shadow-sm"
                    >
                      <option>حفل زفاف</option>
                      <option>ملكة / خطوبة</option>
                      <option>مؤتمر شركة / افتتاح</option>
                      <option>حفلة تخرج</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <div className="flex justify-end mt-12">
                    <Button onClick={nextStep} className="h-14 px-8 text-lg rounded-full gap-2">
                      التالي
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">الموقع وعدد الضيوف</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div className="space-y-3">
                      <Label className="text-lg">المدينة</Label>
                      <Input 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="مثال: الرياض" 
                        className="h-14 rounded-2xl bg-muted/50 text-lg px-4" 
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-lg">عدد الضيوف التقريبي</Label>
                      <Input 
                        type="number" 
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        placeholder="مثال: 300" 
                        className="h-14 rounded-2xl bg-muted/50 text-lg px-4" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-12">
                    <Button variant="outline" onClick={prevStep} className="h-14 px-8 text-lg rounded-full gap-2">
                      <ArrowRight className="w-5 h-5" />
                      رجوع
                    </Button>
                    <Button onClick={nextStep} className="h-14 px-8 text-lg rounded-full gap-2" disabled={!city || !guests}>
                      التالي
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">الميزانية والتفضيلات</h2>
                  <div className="space-y-8 max-w-2xl mx-auto">
                    <div className="space-y-3">
                      <Label className="text-lg">الميزانية التقريبية (ريال)</Label>
                      <Input 
                        type="number" 
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="مثال: 50000" 
                        className="h-14 rounded-2xl bg-muted/50 text-lg px-4" 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-lg">الطابع المفضل (Theme)</Label>
                      <div className="flex flex-wrap gap-3">
                        {["كلاسيكي", "مودرن", "تراثي", "ملكي فاخر", "رومانسي", "طبيعي/ريفي"].map((t) => (
                          <button 
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`px-6 py-3 rounded-full border transition-all text-sm font-bold shadow-sm ${
                              theme === t ? 'bg-primary text-primary-foreground border-primary scale-105' : 'bg-background hover:bg-muted'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-12">
                    <Button variant="outline" onClick={prevStep} className="h-14 px-8 text-lg rounded-full gap-2" disabled={isGenerating}>
                      <ArrowRight className="w-5 h-5" />
                      رجوع
                    </Button>
                    <Button onClick={handleGenerate} className="h-14 px-8 text-lg rounded-full font-bold shadow-lg shadow-primary/30 gap-2" disabled={isGenerating || !budget || !theme}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          جاري التصميم...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          توليد الخطة الذكية
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 4 && plan && !isGenerating && (
                <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                  <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-3xl p-8 text-center border border-primary/20 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full"></div>
                    <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6 relative z-10" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 relative z-10">اكتمل التصميم الذكي!</h2>
                    <p className="text-muted-foreground text-lg relative z-10">بناءً على تفضيلاتك، قمنا بإعداد هذه الخطة الاستثنائية لك.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8 p-6 bg-card border rounded-3xl shadow-sm">
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-muted-foreground">الطابع المقترح</h3>
                        <p className="text-3xl font-bold text-primary">{plan.suggestedTheme}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-3 text-muted-foreground">لوحة الألوان</h3>
                        <div className="flex gap-4">
                          {(plan?.colors || []).map((c: string, i: number) => (
                            <div key={i} className="w-14 h-14 rounded-full shadow-lg border-2 border-white/10" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-muted-foreground">التكلفة التقديرية</h3>
                        <p className="text-3xl font-black">{plan.estimatedCost}</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-6">
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        أبرز التجهيزات
                      </h3>
                      <ul className="space-y-4">
                        {(plan?.equipment || []).map((s: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                            <span className="font-medium text-lg leading-snug">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <Button 
                      onClick={handleSavePlan}
                      disabled={isSaving}
                      className="flex-1 h-16 text-xl font-bold rounded-full shadow-xl shadow-primary/20"
                    >
                      {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : "حفظ واعتماد الخطة"}
                    </Button>
                    <Button variant="outline" className="flex-1 h-16 text-xl rounded-full" onClick={() => setStep(1)}>
                      إعادة التصميم
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
