import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventType, city, guests, budget, theme } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      console.warn("Gemini API key is missing or invalid. Returning fallback data.");
      return NextResponse.json(getFallbackData(eventType, city, guests, budget, theme));
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      أنت مصمم مناسبات سعودي محترف وخبير في شركة "لمسة إيفنس للمناسبات الفاخرة".
      العميل يطلب تخطيط مناسبة بالتفاصيل التالية:
      - نوع المناسبة: ${eventType}
      - المدينة: ${city}
      - عدد الضيوف: ${guests || "غير محدد"}
      - الميزانية التقريبية: ${budget || "غير محدد"} ريال
      - الطابع المفضل: ${theme}

      قم بإنشاء خطة مناسبة متكاملة وفاخرة تتناسب مع ذوق العميل، على أن يتم إرجاع الرد بصيغة JSON حصراً بدون أي نصوص إضافية (لا تستخدم Markdown code blocks).
      الهيكل المطلوب للـ JSON هو:
      {
        "theme": "اسم الطابع المستوحى من تفضيل العميل (مثال: سحر كلاسيكي، ليالي نجد، مودرن فخم)",
        "colors": ["لون بصيغة Hex (مثال #FFFFFF)", "لون ثاني", "لون ثالث"],
        "budget": "توزيع الميزانية بشكل جذاب أو نص يصف التكلفة التقديرية بناءً على المدخل",
        "services": [
          "خدمة مقترحة 1 بالتفصيل (مثل: كوشة ورود طبيعية)",
          "خدمة مقترحة 2 (مثل: تنسيق طاولات VIP مع إضاءة)",
          "خدمة مقترحة 3",
          "خدمة مقترحة 4"
        ],
        "timeline": [
          { "time": "وقت (مثال: 08:00 م)", "desc": "وصف للحدث (مثال: استقبال الضيوف بالبخور)" },
          { "time": "وقت آخر", "desc": "وصف" },
          { "time": "وقت", "desc": "وصف" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Attempt to parse JSON response. Sometimes Gemini wraps it in ```json ... ```
    let parsedData;
    try {
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON", e);
      return NextResponse.json(getFallbackData(eventType, city, guests, budget, theme));
    }

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("AI Planner Error:", error);
    // Return fallback data on any error so the UI doesn't break
    return NextResponse.json(getFallbackData(
      "حفل زفاف", "الرياض", "300", "50000", "ملكي فاخر"
    ));
  }
}

function getFallbackData(eventType: string, city: string, guests: string, budget: string, theme: string) {
  return {
    theme: theme || "ملكي فاخر",
    colors: ["#D4AF37", "#002B5B", "#FDFBF7"],
    budget: budget ? `${budget} ريال` : "حسب الاختيار",
    services: [
      `تجهيز متكامل لـ ${eventType}`,
      `تنسيق طاولات VIP لعدد ${guests || "غير محدد"} ضيف في ${city}`,
      "كوشة زفاف كلاسيكية مع زهور الأوركيد البيضاء",
      "إضاءة خافتة (Warm White) مع ليزر للمسرح",
      "ضيافة فندقية 5 نجوم (قهوة، حلا، عشاء فاخر)"
    ],
    timeline: [
      { time: "08:00 م", desc: "استقبال الضيوف بالقهوة السعودية والبخور" },
      { time: "10:30 م", desc: "زفة العروس والإضاءة المسرحية" },
      { time: "11:30 م", desc: "تقديم العشاء الملكي" }
    ]
  };
}
