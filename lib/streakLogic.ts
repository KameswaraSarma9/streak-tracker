// lib/streakLogic.ts
// Core business logic for streak calculation

export type StudyRecord = {
  dates: string[]; // ISO date strings e.g. "2026-03-13"
};

/**
 * Returns today's date as a YYYY-MM-DD string (UTC).
 */
export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Returns yesterday's date as a YYYY-MM-DD string.
 */
export function getYesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

/**
 * Formats an ISO date string to a human-readable date.
 * e.g. "2026-03-13" → "13 March 2026"
 */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Calculates the current streak from a sorted array of date strings (ascending).
 *
 * Rules:
 * - If the last study date is today or yesterday, count back consecutive days.
 * - Otherwise streak is 0 (no active streak).
 */
export function calculateStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;

  const today = getTodayString();
  const yesterday = getYesterdayString();

  // Deduplicate and sort descending for streak calculation
  const unique = Array.from(new Set(sortedDates)).sort().reverse();

  const mostRecent = unique[0];

  // If the most recent study is not today or yesterday, streak is broken
  if (mostRecent !== today && mostRecent !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const curr = new Date(unique[i - 1]);
    const prev = new Date(unique[i]);
    const diffDays =
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Checks if the user has already studied today.
 */
export function hasStudiedToday(dates: string[]): boolean {
  return dates.includes(getTodayString());
}

/**
 * Returns streak stats given the raw dates array.
 */
export function getStreakStats(dates: string[]) {
  const sorted = Array.from(new Set(dates)).sort(); // ascending, deduplicated
  const streak = calculateStreak(sorted);
  const totalDays = sorted.length;
  const lastStudied = sorted.length > 0 ? sorted[sorted.length - 1] : null;
  const studiedToday = hasStudiedToday(sorted);

  return {
    streak,
    totalDays,
    lastStudied: lastStudied ? formatDate(lastStudied) : null,
    studiedToday,
  };
}
