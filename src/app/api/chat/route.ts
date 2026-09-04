import { NextRequest, NextResponse } from "next/server";

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
- للاتصال الصوتي: 0547498239
- للتواصل عبر الواتساب: 0574257484 (‏966574257484+)
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

  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_api_key_here" || apiKey.trim() === "") {
    return NextResponse.json({
      response: "المساعد الذكي غير متاح مؤقتاً. يسعدنا خدمتك مباشرةً عبر الواتساب على الرقم +966 57 425 7484 📲",
    });
  }

  try {
    // التحقق مما إذا كان المفتاح عبارة عن توكن OAuth (يبدأ بـ AQ.) أو مفتاح API عادي
    const isOAuth = apiKey.startsWith("AQ.");
    const url = isOAuth
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (isOAuth) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const apiResponse = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "API request failed");
    }

    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "عذراً، لم أتمكن من صياغة الرد، يسعدنا خدمتك عبر الواتساب.";

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("[Chatbot Error]:", error);
    return NextResponse.json(
      { response: "عذراً، أواجه صعوبة في الاتصال حالياً. يمكنك التواصل معنا مباشرة عبر الواتساب لخدمتك فوراً." },
      { status: 500 }
    );
  }
}