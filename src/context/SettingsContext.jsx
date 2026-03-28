import { createContext, useContext, useState } from "react";


export const SettingsContext = createContext();


export function useSettings() {
  return useContext(SettingsContext);
}


export function SettingsProvider({ children }) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  return (
    <SettingsContext.Provider value={{ isHighContrast, setIsHighContrast }}>
      {children}
    </SettingsContext.Provider>
  );
}
