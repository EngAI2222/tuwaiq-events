import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const plans = await db.aiPlan.findMany();
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Error fetching AI plans:", error);
    return NextResponse.json({ error: "Failed to fetch AI plans" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, promptData, generatedPlanJSON } = body;

    const newPlan = await db.aiPlan.create({
      data: {
        userId: userId || null,
        promptData: typeof promptData === "string" ? promptData : JSON.stringify(promptData),
        generatedPlanJSON: typeof generatedPlanJSON === "string" ? generatedPlanJSON : JSON.stringify(generatedPlanJSON),
      },
    });

    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    console.error("Error saving AI plan:", error);
    return NextResponse.json({ error: "Failed to save AI plan" }, { status: 500 });
  }
}
