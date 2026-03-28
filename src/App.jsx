import { useSettings, SettingsProvider } from "./context/SettingsContext.jsx";
import { themes } from "./utiles/themes";
import GreetingCard    from "./components/GreetingCard";
import ContrastToggle  from "./components/ContrastToggle";
import HowItWorks      from "./components/HowItWorks";
import FocusTimer      from "./components/FocusTimer";


function Dashboard() {
  const { isHighContrast } = useSettings();
  const tokenMap = isHighContrast ? themes.hc : themes.normal;

  return (
    <div style={{ ...tokenMap, ...styles.root }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Playfair+Display:wght@700&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      
      <header style={styles.header}>
        <div style={styles.eyebrow}>productivity</div>
        <h1 style={styles.title}>Focus &amp; Flow</h1>
      </header>

      
      <main style={styles.grid}>
        
        <div style={styles.leftCol}>
          <GreetingCard />
          <ContrastToggle />
          <HowItWorks />
        </div>

        
        <FocusTimer />
      </main>

      <footer style={styles.footer}>
       
      </footer>
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


const styles = {
  root: {
    minHeight: "100vh",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "48px 20px",
    transition: "background 0.3s, color 0.3s",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  eyebrow: {
    fontSize: 13,
    letterSpacing: 4,
    color: "var(--muted)",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 42,
    fontWeight: 700,
    color: "var(--accent)",
    letterSpacing: "-1px",
    lineHeight: 1,
  },
  grid: {
    width: "100%",
    maxWidth: 720,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  footer: {
    marginTop: 32,
    fontSize: 11,
    color: "var(--muted)",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
};
