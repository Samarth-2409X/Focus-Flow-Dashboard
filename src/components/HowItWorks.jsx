const TIPS = [
  "25 min deep work sprint",
  "Auto-tracks session count",
  "Document title updates live",
  "Toggle contrast anytime",
];

export default function HowItWorks() {
  return (
    <div style={styles.card}>
      <div style={styles.heading}>How it works</div>
      {TIPS.map((tip) => (
        <div key={tip} style={styles.tip}>
          <span style={styles.arrow}>→</span> {tip}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: "20px 22px",
  },
  heading: {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--accent2)",
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  tip: {
    fontSize: 13,
    color: "var(--muted)",
    marginBottom: 6,
    display: "flex",
    gap: 8,
  },
  arrow: {
    color: "var(--accent)",
  },
};
