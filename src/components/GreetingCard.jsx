import { useState, useEffect } from "react";
import { getGreeting } from "../utiles/helpers";


export default function GreetingCard() {
  const { label, icon, sub } = getGreeting();
  const [time, setTime] = useState(new Date());

  
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clockStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div style={styles.card}>
      <div style={{ fontSize: 36 }}>{icon}</div>

      <div style={styles.label}>{label}</div>
      <div style={styles.sub}>{sub}</div>

      <div style={styles.clock}>{clockStr}</div>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 26,
    fontWeight: 700,
    color: "var(--accent)",
    fontFamily: "'Playfair Display', serif",
    letterSpacing: "-0.5px",
  },
  sub: {
    color: "var(--muted)",
    fontSize: 14,
  },
  clock: {
    marginTop: 8,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: "var(--accent2)",
    opacity: 0.85,
    letterSpacing: 1,
  },
};
