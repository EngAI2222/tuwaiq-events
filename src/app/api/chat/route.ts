import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `أنت "لمسة" — المساعدة الذكية الشخصية لشركة "لمسة إيفنس للمناسبات الفاخرة" في الرياض، المملكة العربية السعودية.

هويتك:
- أسلوبك راقٍ، ودود، ومهني، ويعكس فخامة العلامة التجارية.
- ترحبين بالعملاء وتشعرينهم بالاهتمام والتميز.
- تردين دائماً باللغة العربية الفصيحة مع لمسة من الدفء.

خدمات الشركة:
- كوش الأفراح الفاخرة والمصممة حسب الطلب.
- طاولات العشاء وضيافة VIP.
- جلوس ملكي وكنب فاخر.
- أنظمة إضاءة وصوتيات متطورة.
- تنسيق شامل للمكان من الألف إلى الياء.
- تصميم باقات مناسبات بالذكاء الاصطناعي.

معلومات التواصل:
- واتساب: 966574257484+
- الموقع الإلكتروني: tuwaiq-events.vercel.app
- الموقع: الرياض، المملكة العربية السعودية.

تعليمات الرد:
- كوني مختصرة (2-4 أسطر كحد أقصى).
- إذا سأل العميل عن أسعار أو تفاصيل، وجّهيه للتواصل عبر الواتساب أو طلب عرض السعر.
- لا تخترعي أسعاراً محددة.
- إذا كان السؤال خارج نطاق خدمات لمسة إيفنس، ردّي بلطف وأعيدي توجيه المحادثة.`;

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ response: "يسعدني مساعدتك! ما الذي تودّ الاستفسار عنه؟" });
  }

  // دعم المتغير الجديد AI_API_KEY وأيضاً الاحتياطي القديم
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here" || apiKey.trim() === "") {
    console.warn("[Chatbot] API Key is not configured.");
    return NextResponse.json({
      response:
        "المساعد الذكي غير متاح مؤقتاً. يسعدنا خدمتك مباشرةً عبر الواتساب على الرقم +966 57 425 7484 📲",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `${SYSTEM_PROMPT}\n\nسؤال العميل: ${message}\n\nالرد:`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("[Chatbot Error]:", error);
    return NextResponse.json(
      { response: "عذراً، أواجه صعوبة في الاتصال حالياً. يمكنك التواصل معنا مباشرة عبر الواتساب لخدمتك فوراً." },
      { status: 500 }
    );
  }
}