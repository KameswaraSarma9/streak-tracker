// app/api/streak/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getStreakStats } from "@/lib/streakLogic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const datesParam = searchParams.get("dates");
    const dates: string[] = datesParam ? JSON.parse(datesParam) : [];

    const stats = getStreakStats(dates);

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
