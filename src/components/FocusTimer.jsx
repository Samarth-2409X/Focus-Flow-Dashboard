import { useState, useEffect, useRef } from "react";
import { TOTAL_SECONDS, formatTime } from "../utiles/helpers";
import TimerRing from "./TimerRing";
import TimerControls from "./TimerControls";
import StatsRow from "./StatsRow";


export default function FocusTimer() {
  const [seconds, setSeconds]           = useState(TOTAL_SECONDS);
  const [isActive, setIsActive]         = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  const intervalRef = useRef(null); 

  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            
            clearInterval(intervalRef.current);
            setIsActive(false);
            setSessionCount((c) => c + 1);
            return TOTAL_SECONDS; 
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  
  useEffect(() => {
    document.title = isActive
      ? `(${formatTime(seconds)}) Focus!`
      : "Focus & Flow";
  }, [seconds, isActive]);

  
  useEffect(() => {
    if (sessionCount > 0) {
      console.log(
        `[API Save] Session #${sessionCount} complete — ${new Date().toISOString()}`
      );
    }
  }, [sessionCount]);

  
  const handleToggle = () => setIsActive((prev) => !prev);
  const handleReset  = () => { setIsActive(false); setSeconds(TOTAL_SECONDS); };

  return (
    <div style={styles.card}>
      <div style={styles.heading}>FOCUS SESSION</div>

      
      <TimerRing seconds={seconds} isActive={isActive} />

      
      <TimerControls
        isActive={isActive}
        onToggle={handleToggle}
        onReset={handleReset}
      />

      
      <StatsRow sessionCount={sessionCount} />
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 28,
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text)",
    letterSpacing: 2,
  },
};
