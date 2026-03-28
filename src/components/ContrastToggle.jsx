import { useSettings } from "../context/SettingsContext";

export default function ContrastToggle() {
  const { isHighContrast, setIsHighContrast } = useSettings();

  return (
    <div style={styles.card}>
      <div>
        <div style={styles.title}>High Contrast Mode</div>
        <div style={styles.subtitle}>Accessibility toggle</div>
      </div>

      
      <button
        onClick={() => setIsHighContrast((prev) => !prev)}
        aria-label="Toggle high contrast"
        style={{
          ...styles.pill,
          background: isHighContrast ? "var(--accent)" : "var(--bg3)",
        }}
      >
        
        <span
          style={{
            ...styles.knob,
            left: isHighContrast ? 27 : 3,
            background: isHighContrast ? "#000" : "#fff",
          }}
        />
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
    color: "var(--text)",
  },
  subtitle: {
    fontSize: 12,
    color: "var(--muted)",
    marginTop: 2,
  },
  pill: {
    position: "relative",
    width: 52,
    height: 28,
    borderRadius: 14,
    border: "1px solid var(--border)",
    cursor: "pointer",
    transition: "background 0.3s",
    flexShrink: 0,
    outline: "none",
  },
  knob: {
    position: "absolute",
    top: 3,
    width: 20,
    height: 20,
    borderRadius: "50%",
    transition: "left 0.3s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
  },
};
