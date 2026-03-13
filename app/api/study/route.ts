// app/api/study/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getTodayString, getStreakStats } from "@/lib/streakLogic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dates: string[] = body.dates ?? [];

    const today = getTodayString();

    if (dates.includes(today)) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already marked today.",
          ...getStreakStats(dates),
        },
        { status: 409 }
      );
    }

    const updatedDates = [...dates, today];
    const stats = getStreakStats(updatedDates);

    return NextResponse.json({
      success: true,
      message: "Great work! Study session recorded. 🔥",
      dates: updatedDates,
      ...stats,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
