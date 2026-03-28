import { formatTime, TOTAL_SECONDS } from "../utiles/helpers";


export default function TimerRing({ seconds, isActive }) {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - seconds / TOTAL_SECONDS;
  const strokeDash = circumference * progress;

  const statusLabel = isActive ? "focusing…" : seconds === TOTAL_SECONDS ? "ready" : "paused";

  return (
    <div style={styles.wrapper}>
      
      <svg width="210" height="210" style={{ transform: "rotate(-90deg)" }}>
        
        <circle
          cx="105" cy="105" r={radius}
          fill="none"
          stroke="var(--bg3)"
          strokeWidth="10"
        />
        
        <circle
          cx="105" cy="105" r={radius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          style={{
            transition: "stroke-dasharray 0.5s ease",
            filter: "drop-shadow(0 0 6px var(--accent))",
          }}
        />
      </svg>

      
      <div style={styles.center}>
        <div style={styles.time}>{formatTime(seconds)}</div>
        <div style={styles.status}>{statusLabel}</div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: 210,
    height: 210,
  },
  center: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 40,
    fontWeight: 700,
    color: "var(--text)",
    letterSpacing: 2,
    lineHeight: 1,
  },
  status: {
    fontSize: 11,
    color: "var(--muted)",
    marginTop: 4,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
};
