export default function StatsRow({ sessionCount }) {
  const todayMins = sessionCount * 25;

  const stats = [
    { label: "Sessions",    value: sessionCount, unit: ""    },
    { label: "Focus time",  value: todayMins,    unit: "min" },
  ];

  return (
    <div style={styles.grid}>
      {stats.map(({ label, value, unit }) => (
        <div key={label} style={styles.card}>
          <div style={styles.value}>
            {value}
            <span style={styles.unit}>{unit}</span>
          </div>
          <div style={styles.label}>{label} today</div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    width: "100%",
  },
  card: {
    background: "var(--bg3)",
    border: "1px solid var(--border)",
    borderRadius: 14,
    padding: "18px 22px",
  },
  value: {
    fontSize: 28,
    fontWeight: 800,
    color: "var(--accent)",
    fontFamily: "'Playfair Display', serif",
  },
  unit: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 2,
    color: "var(--muted)",
  },
  label: {
    fontSize: 12,
    color: "var(--muted)",
    marginTop: 2,
  },
};
