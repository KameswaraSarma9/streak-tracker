// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Streak — Daily Learning Tracker",
  description: "Track your daily study streak and build consistent learning habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <div className="bg-ambient" aria-hidden="true" />

        {/* Navigation */}
        <nav
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(10,10,15,0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              style={{ textDecoration: "none" }}
            >
              <span className="fire-icon text-lg">🔥</span>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                streak
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <NavLink href="/">Dashboard</NavLink>
              <NavLink href="/history">History</NavLink>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="pt-14 min-h-screen relative z-10">
          {children}
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 text-center py-8"
          style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}
        >
          <span style={{ fontFamily: "var(--font-dm-mono)" }}>
            keep showing up — every day counts
          </span>
        </footer>
      </body>
    </html>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-plus-jakarta)",
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--text-secondary)",
        textDecoration: "none",
        padding: "6px 12px",
        borderRadius: "8px",
        transition: "all 0.15s ease",
      }}
      className="hover:text-white"
    >
      {children}
    </Link>
  );
}
