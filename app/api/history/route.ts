// app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { formatDate } from "@/lib/streakLogic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const datesParam = searchParams.get("dates");
    const dates: string[] = datesParam ? JSON.parse(datesParam) : [];

    // Deduplicate, sort descending (newest first)
    const sorted = Array.from(new Set(dates))
      .sort()
      .reverse()
      .map((iso) => ({
        iso,
        formatted: formatDate(iso),
      }));

    return NextResponse.json({ history: sorted });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
