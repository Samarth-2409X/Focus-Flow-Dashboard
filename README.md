# 🎯 Focus & Flow

A productivity dashboard built with **React** that helps you track deep work sessions using the Pomodoro technique. Built as a hands-on project to practice `useState`, `useEffect`, and `useContext`.

---

## 📸 Preview

> A two-column dashboard with a live greeting, 25-minute focus timer with a circular progress ring, session stats, and an accessibility contrast toggle.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/focus-flow.git

# 2. Navigate into the project
cd focus-flow

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

App will be live at → `http://localhost:5173`

---

## 🗂️ Project Structure

```
src/
├── main.jsx                        # Entry point — mounts <App /> into the DOM
├── App.jsx                         # Root layout — assembles all components
│
├── context/
│   └── SettingsContext.jsx         # Global theme state (useContext)
│
├── components/
│   ├── FocusTimer.jsx              # Smart component — owns all timer logic
│   ├── TimerRing.jsx               # SVG circular progress ring (presentational)
│   ├── TimerControls.jsx           # Start / Pause / Reset buttons (presentational)
│   ├── StatsRow.jsx                # Sessions & focus time stats (presentational)
│   ├── GreetingCard.jsx            # Time-based greeting + live clock
│   ├── ContrastToggle.jsx          # High contrast mode toggle
│   └── HowItWorks.jsx             # Static info card
│
└── utils/
    ├── helpers.js                  # formatTime(), getGreeting(), TOTAL_SECONDS
    └── themes.js                   # Normal & high contrast CSS token objects
```

---

## ✨ Features

| Feature | Description |
|---|---|
| ⏱️ Focus Timer | 25-minute countdown with start, pause, and reset |
| 🔄 Session Tracking | Auto-increments session count when timer completes |
| 📊 Stats | Shows total sessions and total focus minutes today |
| 🌗 Greeting | Changes based on time of day (morning / afternoon / evening / night) |
| 🕐 Live Clock | Real-time clock inside the greeting card |
| ♿ High Contrast | Toggle between normal dark theme and black + neon yellow |
| 🗂️ Browser Tab | Updates to `(MM:SS) Focus!` while timer is running |
| 💾 Session Logger | Logs a simulated API save to the console on session complete |

---

## ⚛️ React Concepts Used

### `useContext` — Global Theme Management
- `SettingsContext` stores the `isHighContrast` boolean
- `SettingsProvider` wraps the entire app so any component can access it
- `useSettings()` is a custom hook for cleaner context consumption
- Toggling contrast re-themes the entire app instantly — no prop drilling

### `useState` — Timer State
Three pieces of state live inside `FocusTimer`:
```js
const [seconds, setSeconds]           = useState(1500); // 25 minutes
const [isActive, setIsActive]         = useState(false);
const [sessionCount, setSessionCount] = useState(0);
```

### `useEffect` — Three Distinct Effects

**Effect 1 — Interval Clock** (runs when `isActive` changes)
```js
useEffect(() => {
  if (isActive) {
    intervalRef.current = setInterval(() => { /* countdown */ }, 1000);
  }
  return () => clearInterval(intervalRef.current); // cleanup on unmount
}, [isActive]);
```

**Effect 2 — Document Title** (runs every second while active)
```js
useEffect(() => {
  document.title = isActive ? `(${formatTime(seconds)}) Focus!` : "Focus & Flow";
}, [seconds, isActive]);
```

**Effect 3 — Session Logger** (runs only when `sessionCount` changes)
```js
useEffect(() => {
  if (sessionCount > 0) {
    console.log(`[API Save] Session #${sessionCount} complete`);
  }
}, [sessionCount]);
```

---

## 🧩 Component Breakdown

### Smart Components (own state/effects)
| Component | Responsibility |
|---|---|
| `FocusTimer` | Owns `seconds`, `isActive`, `sessionCount` + all 3 useEffects |
| `GreetingCard` | Owns live clock state with its own `setInterval` effect |

### Presentational Components (props in → UI out)
| Component | Props Received |
|---|---|
| `TimerRing` | `seconds`, `isActive` |
| `TimerControls` | `isActive`, `onToggle`, `onReset` |
| `StatsRow` | `sessionCount` |
| `ContrastToggle` | reads context via `useSettings()` |
| `HowItWorks` | none — fully static |

---

## 🎨 Theming

CSS variables are injected on the root `<div>` in `App.jsx`. Every child component reads them via `var(--accent)`, `var(--bg)`, etc.

```
Normal Mode       →  Dark background + soft green accent
High Contrast     →  Pure black + neon yellow (accessibility)
```

Switching themes is instant — toggling `isHighContrast` in context causes `App.jsx` to swap the token map, re-theming everything at once.

---

## 🔄 Data Flow

```
SettingsProvider  (holds isHighContrast)
└── App.jsx       (reads theme, builds layout)
    ├── GreetingCard      → own clock state
    ├── ContrastToggle    → reads + writes context
    ├── HowItWorks        → static
    └── FocusTimer        → owns seconds, isActive, sessionCount
        ├── TimerRing         ← seconds, isActive
        ├── TimerControls     ← isActive, onToggle, onReset
        └── StatsRow          ← sessionCount
```

---

## 🛠️ Built With

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- Google Fonts — Playfair Display, DM Sans, JetBrains Mono
- Vanilla CSS via inline styles and CSS variables

---

## 📚 Learning Outcomes

After building this project you will understand:
- How to share global state with `createContext` + `useContext`
- The difference between **smart** and **presentational** components
- How to properly **clean up** `setInterval` inside `useEffect`
- How to use **multiple `useEffect` hooks** with different dependency arrays
- How CSS variables enable **dynamic theming** across a component tree

---
