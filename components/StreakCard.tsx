// components/StreakCard.tsx
"use client";

type Props = {
  streak: number;
  totalDays: number;
  lastStudied: string | null;
  studiedToday: boolean;
};

export default function StreakCard({
  streak,
  totalDays,
  lastStudied,
  studiedToday,
}: Props) {
  return (
    <div
      className="card relative overflow-hidden"
      style={{
        padding: "32px",
        background: streak > 0
          ? "linear-gradient(135deg, #111118 0%, #13120A 100%)"
          : "var(--bg-card)",
        borderColor: streak > 0 ? "rgba(251, 191, 36, 0.2)" : "var(--border)",
      }}
    >
      {/* Decorative amber gradient blob */}
      {streak > 0 && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-40%",
            right: "-10%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Streak count — hero metric */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "8px",
            }}
          >
            Current Streak
          </p>
          <div className="flex items-end gap-3">
            <span
              className="stat-number"
              style={{
                fontSize: "4rem",
                fontWeight: 400,
                lineHeight: 1,
                color: streak > 0 ? "var(--amber)" : "var(--text-secondary)",
                letterSpacing: "-0.04em",
              }}
            >
              {streak}
            </span>
            <span
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                fontSize: "1rem",
                fontWeight: 400,
                color: "var(--text-secondary)",
                paddingBottom: "8px",
              }}
            >
              {streak === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        {/* Fire badge */}
        <div
          className={streak > 0 ? "streak-active" : ""}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background:
              streak > 0 ? "var(--amber-dim)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${streak > 0 ? "var(--border-amber)" : "var(--border)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
          }}
        >
          {streak > 0 ? (
            <span className="fire-icon">🔥</span>
          ) : (
            <span style={{ opacity: 0.4 }}>💤</span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "24px",
        }}
      />

      {/* Secondary stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <StatItem
          label="Total Days"
          value={String(totalDays)}
          icon="📚"
        />
        <StatItem
          label="Last Studied"
          value={lastStudied ?? "—"}
          icon="📅"
          small
        />
      </div>

      {/* Today indicator */}
      {studiedToday && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px 14px",
            borderRadius: "10px",
            background: "rgba(74, 222, 128, 0.08)",
            border: "1px solid rgba(74, 222, 128, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>✅</span>
          <span
            style={{
              fontFamily: "var(--font-plus-jakarta)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "rgba(74, 222, 128, 0.9)",
            }}
          >
            Studied today — streak intact!
          </span>
        </div>
      )}
    </div>
  );
}

function StatItem({
  label,
  value,
  icon,
  small = false,
}: {
  label: string;
  value: string;
  icon: string;
  small?: boolean;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "6px",
        }}
      >
        <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>{icon}</span>
        <span
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </span>
      </div>
      <p
        className={small ? "" : "stat-number"}
        style={{
          fontSize: small ? "0.9rem" : "1.6rem",
          fontWeight: small ? 500 : 400,
          color: "var(--text-primary)",
          letterSpacing: small ? "0" : "-0.03em",
          lineHeight: 1.2,
          fontFamily: small
            ? "var(--font-plus-jakarta)"
            : "var(--font-dm-mono)",
        }}
      >
        {value}
      </p>
    </div>
  );
}
