// components/StudyButton.tsx
"use client";

import { useState } from "react";

type Props = {
  studiedToday: boolean;
  onStudy: () => Promise<{ success: boolean; message: string }>;
};

export default function StudyButton({ studiedToday, onStudy }: Props) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info";
  } | null>(null);

  async function handleClick() {
    if (studiedToday || loading) return;
    setLoading(true);

    try {
      const res = await onStudy();
      setToast({
        message: res.message,
        type: res.success ? "success" : "info",
      });
    } catch {
      setToast({ message: "Something went wrong. Try again.", type: "info" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        disabled={studiedToday || loading}
        className={`study-btn w-full relative overflow-hidden ${
          studiedToday ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          padding: "18px 32px",
          borderRadius: "14px",
          border: studiedToday
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(251, 191, 36, 0.4)",
          background: studiedToday
            ? "rgba(255,255,255,0.04)"
            : "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.08) 100%)",
          color: studiedToday ? "var(--text-secondary)" : "var(--amber)",
          fontFamily: "var(--font-syne)",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.02em",
          transition: "all 0.2s ease",
          outline: "none",
        }}
      >
        {/* Shimmer on hover */}
        {!studiedToday && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.08) 50%, transparent 100%)",
              transform: "translateX(-100%)",
              transition: "transform 0.6s ease",
            }}
            className="shimmer-effect"
          />
        )}

        <span className="flex items-center justify-center gap-3 relative z-10">
          {loading ? (
            <>
              <Spinner />
              <span>Recording...</span>
            </>
          ) : studiedToday ? (
            <>
              <span>✓</span>
              <span>Studied Today</span>
            </>
          ) : (
            <>
              <span className="fire-icon">🔥</span>
              <span>I Studied Today</span>
            </>
          )}
        </span>
      </button>

      {/* Toast message */}
      {toast && (
        <div
          className="toast absolute left-0 right-0 -bottom-16"
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            background:
              toast.type === "success"
                ? "rgba(74, 222, 128, 0.1)"
                : "rgba(251, 191, 36, 0.08)",
            border: `1px solid ${
              toast.type === "success"
                ? "rgba(74, 222, 128, 0.25)"
                : "rgba(251, 191, 36, 0.2)"
            }`,
            color:
              toast.type === "success"
                ? "rgba(74, 222, 128, 0.9)"
                : "var(--amber)",
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.82rem",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="28"
        strokeDashoffset="10"
        opacity="0.8"
      />
    </svg>
  );
}
