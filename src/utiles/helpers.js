export const TOTAL_SECONDS = 25 * 60;

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { label: "Good Morning",   icon: "☀️",  sub: "Start your day with intent."    };
  if (hour < 17) return { label: "Good Afternoon", icon: "🌤️", sub: "Keep the momentum going."        };
  if (hour < 21) return { label: "Good Evening",   icon: "🌆",  sub: "Wind down with purpose."         };
  return           { label: "Good Night",    icon: "🌙",  sub: "Rest is part of the process."  };
}
