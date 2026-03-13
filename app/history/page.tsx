// app/history/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HistoryList from "@/components/HistoryList";

const STORAGE_KEY = "streak_study_dates";

type HistoryEntry = {
  iso: string;
  formatted: string;
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

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [totalDays, setTotalDays] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const dates = getDatesFromStorage();
      setTotalDays(dates.length);
      try {
        const res = await fetch(
          `/api/history?dates=${encodeURIComponent(JSON.stringify(dates))}`
        );
        const data = await res.json();
        setHistory(data.history ?? []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
            textDecoration: "none",
            marginBottom: "20px",
            transition: "color 0.15s ease",
          }}
          className="hover:text-white"
        >
          ← Back to dashboard
        </Link>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--text-primary)",
                lineHeight: 1.1,
                marginBottom: "6px",
              }}
            >
              Study <span style={{ color: "var(--amber)" }}>History</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
              }}
            >
              Every session recorded, newest first.
            </p>
          </div>

          {/* Total badge */}
          {totalDays > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "var(--amber-dim)",
                border: "1px solid var(--border-amber)",
              }}
            >
              <span style={{ fontSize: "0.85rem" }}>📚</span>
              <span
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--amber)",
                }}
              >
                {totalDays} total {totalDays === 1 ? "day" : "days"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* History list */}
      <HistoryList history={history} loading={loading} />

      {/* Bottom CTA if empty */}
      {!loading && history.length === 0 && (
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-syne)",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--amber)",
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: "12px",
              background: "var(--amber-dim)",
              border: "1px solid var(--border-amber)",
            }}
          >
            <span className="fire-icon">🔥</span>
            Mark today's session
          </Link>
        </div>
      )}
    </div>
  );
}
