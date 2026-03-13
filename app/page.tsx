// app/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";

const STORAGE_KEY = "streak_study_dates";

type Stats = {
  streak: number;
  totalDays: number;
  lastStudied: string | null;
  studiedToday: boolean;
};

function getDatesFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDatesToStorage(dates: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    streak: 0,
    totalDays: 0,
    lastStudied: null,
    studiedToday: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    const dates = getDatesFromStorage();
    try {
      const res = await fetch(
        `/api/streak?dates=${encodeURIComponent(JSON.stringify(dates))}`
      );
      const data = await res.json();
      setStats(data);
    } catch {
      // fallback: silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  async function handleStudy(): Promise<{ success: boolean; message: string }> {
    const dates = getDatesFromStorage();
    const res = await fetch("/api/study", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dates }),
    });

    const data = await res.json();

    if (data.success && data.dates) {
      saveDatesToStorage(data.dates);
      setStats({
        streak: data.streak,
        totalDays: data.totalDays,
        lastStudied: data.lastStudied,
        studiedToday: data.studiedToday,
      });
    }

    return { success: data.success, message: data.message };
  }

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div
      className="page-enter max-w-3xl mx-auto px-6 py-12"
      style={{ display: "flex", flexDirection: "column", gap: "24px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "4px" }}>
        <p
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
            letterSpacing: "0.06em",
            marginBottom: "6px",
          }}
        >
          {greeting()} 👋
        </p>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          Your learning{" "}
          <span style={{ color: "var(--amber)" }}>dashboard</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.88rem",
            color: "var(--text-secondary)",
            marginTop: "8px",
            fontWeight: 400,
          }}
        >
          Consistency beats intensity. Show up every day.
        </p>
      </div>

      {/* Streak card */}
      {loading ? (
        <div
          style={{
            height: "240px",
            borderRadius: "16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            animation: "pulse 2s ease infinite",
          }}
        />
      ) : (
        <StreakCard
          streak={stats.streak}
          totalDays={stats.totalDays}
          lastStudied={stats.lastStudied}
          studiedToday={stats.studiedToday}
        />
      )}

      {/* Study button + help text */}
      <div style={{ paddingBottom: "40px" }}>
        <StudyButton
          studiedToday={stats.studiedToday}
          onStudy={handleStudy}
        />

        {!stats.studiedToday && (
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              textAlign: "center",
              marginTop: "48px",
              opacity: 0.6,
            }}
          >
            {stats.streak > 0
              ? `Don't break your ${stats.streak}-day streak!`
              : "Start your streak — mark today's session."}
          </p>
        )}
      </div>

      {/* Quick nav to history */}
      <div
        className="card"
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "3px",
            }}
          >
            Study History
          </p>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
            }}
          >
            {stats.totalDays > 0
              ? `${stats.totalDays} recorded sessions`
              : "No sessions yet"}
          </p>
        </div>
        <Link
          href="/history"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--amber)",
            textDecoration: "none",
            padding: "8px 16px",
            borderRadius: "10px",
            background: "var(--amber-dim)",
            border: "1px solid var(--border-amber)",
            transition: "all 0.15s ease",
          }}
        >
          View all →
        </Link>
      </div>

      {/* Motivational tips row */}
      <TipsRow streak={stats.streak} />
    </div>
  );
}

function TipsRow({ streak }: { streak: number }) {
  const tips = [
    {
      icon: "⚡",
      title: "Compound effect",
      body: "30 minutes daily beats 3 hours once a week.",
    },
    {
      icon: "🧠",
      title: "Spaced repetition",
      body: "Review material across multiple days for retention.",
    },
    {
      icon: "🎯",
      title: "One goal",
      body: "Pick one topic per session. Depth over breadth.",
    },
  ];

  const streakTip =
    streak >= 7
      ? { icon: "🏆", title: `${streak}-day streak!`, body: "You're on fire. Keep the momentum going." }
      : streak >= 3
      ? { icon: "🌱", title: "Building momentum", body: "3+ days in — habits are forming. Don't stop now." }
      : null;

  const displayTips = streakTip ? [streakTip, ...tips.slice(0, 2)] : tips;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px",
      }}
    >
      {displayTips.map((tip) => (
        <div
          key={tip.title}
          className="card"
          style={{ padding: "16px 18px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "1rem" }}>{tip.icon}</span>
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {tip.title}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            {tip.body}
          </p>
        </div>
      ))}
    </div>
  );
}
