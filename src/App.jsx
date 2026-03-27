import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

// ─── Context ────────────────────────────────────────────────────────────────
const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  return (
    <SettingsContext.Provider value={{ isHighContrast, setIsHighContrast }}>
      {children}
    </SettingsContext.Provider>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { label: "Good Morning", icon: "☀️", sub: "Start your day with intent." };
  if (h < 17) return { label: "Good Afternoon", icon: "🌤️", sub: "Keep the momentum going." };
  if (h < 21) return { label: "Good Evening", icon: "🌆", sub: "Wind down with purpose." };
  return { label: "Good Night", icon: "🌙", sub: "Rest is part of the process." };
}

function fmt(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

const TOTAL = 25 * 60;

// ─── Theme tokens ────────────────────────────────────────────────────────────
const themes = {
  normal: {
    "--bg": "#0d0f14",
    "--bg2": "#13161e",
    "--bg3": "#1c2030",
    "--border": "rgba(255,255,255,0.07)",
    "--text": "#e8eaf2",
    "--muted": "#6b7280",
    "--accent": "#6ee7b7",
    "--accent2": "#818cf8",
    "--danger": "#f87171",
    "--ring": "rgba(110,231,183,0.35)",
  },
  hc: {
    "--bg": "#000000",
    "--bg2": "#0a0a0a",
    "--bg3": "#111111",
    "--border": "#ffe600",
    "--text": "#ffe600",
    "--muted": "#ccbb00",
    "--accent": "#ffe600",
    "--accent2": "#ffe600",
    "--danger": "#ff4444",
    "--ring": "rgba(255,230,0,0.5)",
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function GreetingCard() {
  const { isHighContrast } = useContext(SettingsContext);
  const { label, icon, sub } = getGreeting();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clockStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      padding: "28px 32px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ fontSize: 36 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "var(--accent)", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}>
        {label}
      </div>
      <div style={{ color: "var(--muted)", fontSize: 14 }}>{sub}</div>
      <div style={{
        marginTop: 8,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: "var(--accent2)",
        opacity: 0.8,
        letterSpacing: 1,
      }}>
        {clockStr}
      </div>
    </div>
  );
}

function ContrastToggle() {
  const { isHighContrast, setIsHighContrast } = useContext(SettingsContext);
  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      padding: "20px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>High Contrast Mode</div>
        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Accessibility toggle</div>
      </div>
      <button
        onClick={() => setIsHighContrast(p => !p)}
        style={{
          position: "relative",
          width: 52,
          height: 28,
          borderRadius: 14,
          border: "1px solid var(--border)",
          background: isHighContrast ? "var(--accent)" : "var(--bg3)",
          cursor: "pointer",
          transition: "background 0.3s",
          flexShrink: 0,
          outline: "none",
        }}
        aria-label="Toggle high contrast"
      >
        <span style={{
          position: "absolute",
          top: 3,
          left: isHighContrast ? 27 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: isHighContrast ? "#000" : "#fff",
          transition: "left 0.3s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }} />
      </button>
    </div>
  );
}

function StatsRow({ sessionCount }) {
  const todayMins = sessionCount * 25;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {[
        { label: "Sessions", value: sessionCount, unit: "" },
        { label: "Focus time", value: todayMins, unit: "min" },
      ].map(({ label, value, unit }) => (
        <div key={label} style={{
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "18px 22px",
        }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
            {value}<span style={{ fontSize: 14, fontWeight: 400, marginLeft: 2, color: "var(--muted)" }}>{unit}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{label} today</div>
        </div>
      ))}
    </div>
  );
}

function FocusTimer() {
  const [seconds, setSeconds] = useState(TOTAL);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const intervalRef = useRef(null);

  // Effect 1: Timer interval with cleanup
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setSessionCount(c => c + 1);
            return TOTAL;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  // Effect 2: Document title
  useEffect(() => {
    if (isActive) {
      document.title = `(${fmt(seconds)}) Focus!`;
    } else {
      document.title = "Focus & Flow";
    }
  }, [seconds, isActive]);

  // Effect 3: Session logger
  useEffect(() => {
    if (sessionCount > 0) {
      console.log(`[API Save] Session #${sessionCount} complete at ${new Date().toISOString()}`);
    }
  }, [sessionCount]);

  const handleToggle = () => setIsActive(p => !p);
  const handleReset = () => { setIsActive(false); setSeconds(TOTAL); };

  const progress = 1 - seconds / TOTAL;
  const r = 88;
  const circ = 2 * Math.PI * r;
  const dash = circ * progress;

  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: 20,
      padding: "36px 32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--text)", letterSpacing: 1 }}>
        FOCUS SESSION
      </div>

      {/* Ring */}
      <div style={{ position: "relative", width: 210, height: 210 }}>
        <svg width="210" height="210" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="105" cy="105" r={r} fill="none" stroke="var(--bg3)" strokeWidth="10" />
          <circle
            cx="105" cy="105" r={r} fill="none"
            stroke="var(--accent)" strokeWidth="10"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.5s ease", filter: "drop-shadow(0 0 6px var(--accent))" }}
          />
        </svg>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 40, fontWeight: 700,
            color: "var(--text)",
            letterSpacing: 2,
            lineHeight: 1,
          }}>
            {fmt(seconds)}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>
            {isActive ? "focusing…" : seconds === TOTAL ? "ready" : "paused"}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={handleToggle} style={{
          padding: "12px 32px",
          borderRadius: 50,
          border: "none",
          background: isActive ? "var(--danger)" : "var(--accent)",
          color: "#000",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          letterSpacing: 1,
          boxShadow: isActive ? "0 0 16px var(--danger)" : "0 0 16px var(--ring)",
          transition: "all 0.2s",
        }}>
          {isActive ? "⏸ PAUSE" : "▶ START"}
        </button>
        <button onClick={handleReset} style={{
          padding: "12px 20px",
          borderRadius: 50,
          border: "1px solid var(--border)",
          background: "var(--bg3)",
          color: "var(--muted)",
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.2s",
        }}>
          ↺
        </button>
      </div>

      <StatsRow sessionCount={sessionCount} />
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
function Dashboard() {
  const { isHighContrast } = useContext(SettingsContext);
  const t = isHighContrast ? themes.hc : themes.normal;

  return (
    <div style={{
      ...Object.fromEntries(Object.entries(t).map(([k, v]) => [k, v])),
      minHeight: "100vh",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "48px 20px",
      transition: "background 0.3s, color 0.3s",
    }}>
      {/* Import fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>
          productivity
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 42,
          fontWeight: 700,
          color: "var(--accent)",
          letterSpacing: "-1px",
          lineHeight: 1,
        }}>
          Focus &amp; Flow
        </h1>
      </div>

      {/* Main grid */}
      <div style={{
        width: "100%",
        maxWidth: 720,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <GreetingCard />
          <ContrastToggle />
          <div style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "20px 22px",
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent2)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
              How it works
            </div>
            {["25 min deep work sprint", "Auto-tracks session count", "Document title updates live", "Toggle contrast anytime"].map(tip => (
              <div key={tip} style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6, display: "flex", gap: 8 }}>
                <span style={{ color: "var(--accent)" }}>→</span> {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <FocusTimer />
      </div>

      <div style={{ marginTop: 32, fontSize: 11, color: "var(--muted)", letterSpacing: 2, textTransform: "uppercase" }}>
        built with useContext · useState · useEffect
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  );
}