import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      console.warn("Gemini API key is missing. Returning fallback response.");
      return NextResponse.json({
        response: "عذراً، أواجه مشكلة في الاتصال حالياً. لكن يسعدني إخبارك أننا في نكسورا نقدم أفضل خدمات تنظيم المناسبات في الرياض! كيف يمكنني مساعدتك بشكل عام؟"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      أنت مساعد ذكي فاخر لشركة "نكسورا للمناسبات الفاخرة" في الرياض.
      مهمتك هي الرد على استفسارات العملاء بأسلوب راقٍ ومختصر ومهني جداً.
      خدمات نكسورا تشمل: كوش الأفراح، طاولات العشاء، ضيافة VIP، إضاءة وصوتيات، وتنسيق شامل للمكان.
      
      استفسار العميل: "${message}"
      
      رد باللغة العربية، بأسلوب ترحيبي، ولا تتجاوز سطرين أو ثلاثة خطوط كحد أقصى.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("AI Chatbot Error:", error);
    return NextResponse.json({
      response: "عذراً، يبدو أن هناك ضغط على الخدمة حالياً. يمكنك التواصل معنا عبر الواتساب للمساعدة الفورية."
    });
  }
}
