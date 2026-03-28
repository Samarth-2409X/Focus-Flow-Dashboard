export default function TimerControls({ isActive, onToggle, onReset }) {
  return (
    <div style={styles.row}>
      
      <button
        onClick={onToggle}
        style={{
          ...styles.primary,
          background: isActive ? "var(--danger)" : "var(--accent)",
          boxShadow: isActive
            ? "0 0 16px var(--danger)"
            : "0 0 16px var(--ring)",
        }}
      >
        {isActive ? "⏸ PAUSE" : "▶ START"}
      </button>

      
      <button onClick={onReset} style={styles.reset}>
        ↺
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: 12,
  },
  primary: {
    padding: "12px 32px",
    borderRadius: 50,
    border: "none",
    color: "#000",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    letterSpacing: 1,
    transition: "all 0.2s",
  },
  reset: {
    padding: "12px 20px",
    borderRadius: 50,
    border: "1px solid var(--border)",
    background: "var(--bg3)",
    color: "var(--muted)",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};
