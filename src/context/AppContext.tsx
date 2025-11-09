import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Sensor } from '../types';

type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  useRealTimeData: boolean;
  toggleDataSource: () => void;
  sensorData: Sensor[];
  setSensorData: (data: Sensor[]) => void;
  username: string;
  setUsername: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [useRealTimeData, setUseRealTimeData] = useState(false);
  const [sensorData, setSensorData] = useState<Sensor[]>([]);
  const [username, setUsername] = useState("Dr. Rajesh Kumar");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    // Load data source preference
    const dataSource = localStorage.getItem("useRealTimeData");
    if (dataSource === "true") {
      setUseRealTimeData(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleDataSource = () => {
    const newValue = !useRealTimeData;
    setUseRealTimeData(newValue);
    localStorage.setItem("useRealTimeData", String(newValue));
  };

  const value = {
    theme,
    toggleTheme,
    useRealTimeData,
    toggleDataSource,
    sensorData,
    setSensorData,
    username,
    setUsername,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
