// components/HistoryList.tsx
"use client";

type HistoryEntry = {
  iso: string;
  formatted: string;
};

type Props = {
  history: HistoryEntry[];
  loading?: boolean;
};

export default function HistoryList({ history, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <SkeletonRow key={i} delay={i * 80} />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div
        className="card text-center"
        style={{ padding: "48px 24px" }}
      >
        <div style={{ fontSize: "2rem", marginBottom: "12px", opacity: 0.4 }}>
          📖
        </div>
        <p
          style={{
            fontFamily: "var(--font-plus-jakarta)",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
        >
          No study sessions yet.
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            marginTop: "6px",
            opacity: 0.6,
          }}
        >
          Mark your first session to get started.
        </p>
      </div>
    );
  }

  // Group by month
  const grouped: Record<string, HistoryEntry[]> = {};
  for (const entry of history) {
    const [year, month] = entry.iso.split("-");
    const key = `${year}-${month}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  }

  const monthLabel = (key: string) => {
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {Object.entries(grouped).map(([monthKey, entries], gi) => (
        <div key={monthKey} style={{ animationDelay: `${gi * 60}ms` }} className="page-enter">
          {/* Month header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
              }}
            >
              {monthLabel(monthKey)}
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--border)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.7rem",
                color: "var(--text-secondary)",
                opacity: 0.5,
              }}
            >
              {entries.length} {entries.length === 1 ? "day" : "days"}
            </span>
          </div>

          {/* Date rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {entries.map((entry, i) => {
              const isToday =
                entry.iso === new Date().toISOString().split("T")[0];
              return (
                <div
                  key={entry.iso}
                  className="history-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    border: isToday
                      ? "1px solid rgba(251,191,36,0.25)"
                      : "1px solid var(--border)",
                    background: isToday
                      ? "rgba(251,191,36,0.04)"
                      : "var(--bg-card)",
                    animationDelay: `${gi * 60 + i * 40}ms`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: isToday ? "var(--amber)" : "rgba(255,255,255,0.2)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-plus-jakarta)",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: isToday ? "var(--amber)" : "var(--text-primary)",
                      }}
                    >
                      {entry.formatted}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {isToday && (
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.65rem",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--amber)",
                          background: "rgba(251,191,36,0.1)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        today
                      </span>
                    )}
                    <span style={{ fontSize: "0.85rem", opacity: 0.5 }}>✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonRow({ delay }: { delay: number }) {
  return (
    <div
      style={{
        height: "52px",
        borderRadius: "12px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        opacity: 0,
        animation: `fadeIn 0.3s ease ${delay}ms forwards`,
      }}
    />
  );
}
