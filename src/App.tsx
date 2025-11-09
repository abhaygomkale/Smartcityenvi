import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { TopNav } from "./components/TopNav";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./components/HomePage";
import { CityMapContainer } from "./components/CityMapContainer";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { AlertsPage } from "./components/AlertsPage";
import { ReportsPage } from "./components/ReportsPage";
import { SettingsPage } from "./components/SettingsPage";
import { ProfilePage } from "./components/ProfilePage";
import { SimulationPage } from "./components/SimulationPage";
import { MapTestPage } from "./components/MapTestPage";
import { NotificationProvider } from "./components/NotificationProvider";
import { LoginPage } from "./components/LoginPage";
import { useAppContext } from "./context/AppContext";
import { fetchLatestDataForNagpur } from "./services/openaq";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, useRealTimeData, setSensorData } = useAppContext();
  const navigate = useNavigate();

  // ✅ Load authentication state once
  useEffect(() => {
  const authState = localStorage.getItem("isAuthenticated");
  console.log("localStorage.isAuthenticated =", authState); // 🧠 Debug line
  setIsAuthenticated(authState === "true");
}, []);
  // ✅ Handle real-time data
  useEffect(() => {
    if (useRealTimeData) {
      fetchLatestDataForNagpur().then(data => setSensorData(data));
    }
  }, [useRealTimeData, setSensorData]);

  // ✅ Login handler
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  // ✅ Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // ✅ 🔥 Important: stop app if not logged in
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ✅ App routes (only show if logged in)
  return (
    <NotificationProvider>
      <div
        className={`h-screen w-screen flex flex-col ${
          theme === "dark" ? "dark bg-slate-900" : "bg-slate-50"
        }`}
      >
        <TopNav onLogout={handleLogout} />

        <div className="flex-1 flex overflow-hidden min-h-0">
          <Sidebar />

          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<CityMapContainer />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/simulation" element={<SimulationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/map-test" element={<MapTestPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </NotificationProvider>
  );
}
