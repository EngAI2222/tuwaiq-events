import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { eventType, city, guests, budget, theme } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-1.5-flash for fast text and JSON generation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an elite "Luxury Saudi Event Planner" working for Lamsa Events. 
Generate a premium event plan based on the following details:
- Event Type: ${eventType}
- Region/City: ${city}
- Guests: ${guests}
- Budget: ${budget} Riyals
- Preferred Theme: ${theme}

You must return ONLY a raw JSON object. Do not include markdown formatting, backticks, or any other text.
The JSON schema MUST exactly match:
{
  "suggestedTheme": "اسم الطابع المقترح (مثال: ملكي فاخر)",
  "colors": ["#HEX1", "#HEX2", "#HEX3"],
  "estimatedCost": "رقم يمثل التكلفة التقديرية بناءً على المعطيات",
  "equipment": ["تجهيزة 1", "تجهيزة 2", "تجهيزة 3", "تجهيزة 4", "تجهيزة 5"]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Clean up markdown block if Gemini ignores instruction
    if (text.startsWith("```json")) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith("```")) {
      text = text.substring(3, text.length - 3).trim();
    }

    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("AI Planner Error:", error);
    return NextResponse.json(
      { error: "Failed to generate event plan." },
      { status: 500 }
    );
  }
}
