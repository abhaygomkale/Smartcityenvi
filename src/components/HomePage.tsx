import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, TrendingDown, AlertTriangle, Leaf, Wind, Activity, ArrowRight, Zap, RefreshCw, MapPin, BarChart, Sparkles } from "lucide-react";
import { Progress } from "./ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNotification } from "./NotificationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ZoneDetailModal } from "./ZoneDetailModal";
import { AlertDetailModal } from "./AlertDetailModal";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export function HomePage() {
  const { showNotification } = useNotification();
  const { useRealTimeData, sensorData } = useAppContext();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<any | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [isZoneModalOpen, setIsZoneModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // Auto-refresh simulation
  useEffect(() => {
    if (useRealTimeData) {
      const interval = setInterval(() => {
        setIsRefreshing(true);
        setTimeout(() => {
          setIsRefreshing(false);
          setLastRefresh(new Date());
        }, 1000);
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [useRealTimeData]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    showNotification("info", "Refreshing Data", "Fetching latest sensor readings...");
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefresh(new Date());
      showNotification("success", "Data Updated", "All sensor data has been refreshed successfully!");
    }, 1500);
  };

  const trendData = [
    { time: "6 AM", co2: 520 },
    { time: "9 AM", co2: 780 },
    { time: "12 PM", co2: 950 },
    { time: "3 PM", co2: 1100 },
    { time: "6 PM", co2: 890 },
    { time: "9 PM", co2: 680 },
    { time: "Now", co2: 642 },
  ];

  const cityStats = useRealTimeData && sensorData.length > 0 ? [
    {
      title: "Total CO₂ Emissions",
      value: sensorData.reduce((acc, sensor) => acc + sensor.value, 0).toFixed(2),
      unit: "ppm",
      trend: "down",
      change: "12%",
      icon: Activity,
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      glowColor: "shadow-blue-500/50",
      color: "#3b82f6",
    },
    {
      title: "Air Quality Index",
      value: (sensorData.reduce((acc, sensor) => acc + sensor.aqi, 0) / sensorData.length).toFixed(2),
      unit: "",
      trend: "down",
      change: "8%",
      icon: Wind,
      bgGradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      glowColor: "shadow-green-500/50",
      color: "#10b981",
    },
    {
      title: "Active Sensors",
      value: sensorData.length.toString(),
      unit: "",
      trend: "up",
      change: "3%",
      icon: Leaf,
      bgGradient: "from-teal-50 to-teal-100",
      borderColor: "border-teal-200",
      glowColor: "shadow-teal-500/50",
      color: "#14b8a6",
    },
    {
      title: "Energy Consumption",
      value: "1.2", // This is mock data, as we don't have energy data
      unit: "MW",
      trend: "down", 
      change: "5%",
      icon: Zap,
      bgGradient: "from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      glowColor: "shadow-amber-500/50",
      color: "#f59e0b",
    },
  ] : [
    {
      title: "Total CO₂ Emissions",
      value: "2,842",
      unit: "ppm",
      trend: "down",
      change: "12%",
      icon: Activity,
      bgGradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      glowColor: "shadow-blue-500/50",
      color: "#3b82f6",
    },
    {
      title: "Air Quality Index",
      value: "42",
      unit: "",
      trend: "down",
      change: "8%",
      icon: Wind,
      bgGradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      glowColor: "shadow-green-500/50",
      color: "#10b981",
    },
    {
      title: "Active Sensors",
      value: "24",
      unit: "",
      trend: "up",
      change: "3%",
      icon: Leaf,
      bgGradient: "from-teal-50 to-teal-100",
      borderColor: "border-teal-200",
      glowColor: "shadow-teal-500/50",
      color: "#14b8a6",
    },
    {
      title: "Energy Consumption",
      value: "1.2",
      unit: "MW",
      trend: "down", 
      change: "5%",
      icon: Zap,
      bgGradient: "from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      glowColor: "shadow-amber-500/50",
      color: "#f59e0b",
    },
  ];

  const zones = useRealTimeData && sensorData.length > 0 ?
    Object.values(sensorData.reduce((acc, sensor) => {
      if (!acc[sensor.zone]) {
        acc[sensor.zone] = {
          name: sensor.zone,
          co2: 0,
          aqi: 0,
          sensorCount: 0,
          population: "N/A", // This is mock data
          status: "good", // This is mock data
          trend: 0, // This is mock data
          color: "#10b981", // This is mock data
        };
      }
      acc[sensor.zone].co2 += sensor.value;
      acc[sensor.zone].aqi += sensor.aqi;
      acc[sensor.zone].sensorCount++;
      return acc;
    }, {} as any)).map((zone: any) => ({
      ...zone,
      aqi: zone.aqi / zone.sensorCount,
    }))
    : [
    {
      name: "Dharampeth",
      co2: 420,
      aqi: 32,
      population: "240k",
      status: "good",
      trend: -2.5,
      color: "#10b981",
    },
    {
      name: "Sadar",
      co2: 580,
      aqi: 65,
      population: "180k",
      status: "moderate", 
      trend: 1.2,
      color: "#f59e0b",
    },
    {
      name: "Mahal",
      co2: 720,
      aqi: 89,
      population: "150k",
      status: "poor",
      trend: 3.5,
      color: "#ef4444",
    },
  ];

  const realtimeAlerts = useRealTimeData && sensorData.length > 0 ?
    sensorData.filter(sensor => sensor.aqi > 75).map(sensor => ({
      zone: sensor.zone,
      message: `High AQI levels detected: ${sensor.aqi}`,
      time: new Date().toLocaleTimeString(),
      severity: sensor.aqi > 100 ? "critical" : "warning",
      icon: AlertTriangle,
    }))
    : [
    {
      zone: "Sadar Zone",
      message: "CO₂ levels approaching threshold",
      time: "2 min ago",
      severity: "warning",
      icon: AlertTriangle,
    },
    {
      zone: "Dharampeth",
      message: "Air quality improving significantly",
      time: "5 min ago",
      severity: "success",
      icon: Activity,
    },
    {
      zone: "Mahal Area",
      message: "Critical emission levels detected",
      time: "8 min ago",
      severity: "critical",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="relative h-64 bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          
          <div className="relative h-full px-8 py-8 flex items-center gap-6">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl"
            >
              <Activity className="h-10 w-10 text-white" />
            </motion.div>
            
            <div className="flex-1">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-white/20 text-white backdrop-blur-sm mb-3 border-white/30">
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mr-2"
                  >
                    ●
                  </motion.span>
                  Live Dashboard
                </Badge>
                <h1 className="text-4xl text-white mb-2">🌍 Nagpur Digital Twin Dashboard</h1>
                <p className="text-white/90 text-lg">Real-time CO₂ monitoring and emission analytics for smart city management</p>
              </motion.div>
            </div>
            
            <div className="flex gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 border border-white/30 shadow-lg hover:bg-white/30 transition-all cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-white/80 mb-1">Last Updated</p>
                <p className="text-white text-lg flex items-center gap-2">
                  {lastRefresh.toLocaleTimeString()}
                  {isRefreshing && (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  )}
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 border border-white/30 shadow-lg hover:bg-white/30 transition-all cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-sm text-white/80 mb-1">Active Sensors</p>
                <p className="text-white text-lg">{sensorData.length} / {sensorData.length}</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleManualRefresh}
                className="bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 border border-white/30 shadow-lg hover:bg-white/30 transition-all cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p className="text-sm text-white/80 mb-1">Refresh Data</p>
                <div className="flex items-center gap-2">
                  <RefreshCw className={`h-5 w-5 text-white ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                  <span className="text-white">Sync</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6">
            {cityStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div
                    whileHover={{ 
                      translateY: -8,
                      transition: { duration: 0.2 }
                    }}
                    className="h-full"
                  >
                    <Card className={`
                      p-6 bg-gradient-to-br ${stat.bgGradient} border-2 ${stat.borderColor}
                      relative overflow-hidden cursor-pointer h-full
                      transition-all duration-300
                      ${hoveredCard === idx ? `shadow-2xl ${stat.glowColor}` : 'shadow-md'}
                    `}>
                      {/* Animated Background Pulse */}
                      <AnimatePresence>
                        {isRefreshing && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.3, scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 rounded-full blur-2xl"
                            style={{ backgroundColor: stat.color }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Decorative Circle */}
                      <motion.div 
                        className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-20"
                        style={{ backgroundColor: stat.color }}
                        animate={hoveredCard === idx ? { scale: 1.2, rotate: 45 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Hover Glow Effect */}
                      {hoveredCard === idx && (
                        <motion.div
                          layoutId="cardGlow"
                          className="absolute inset-0 rounded-xl opacity-20 blur-xl"
                          style={{ backgroundColor: stat.color }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                        />
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: `${stat.color}30` }}
                            animate={hoveredCard === idx ? { 
                              scale: 1.1,
                              rotate: [0, -10, 10, -10, 0],
                            } : { scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="h-7 w-7" style={{ color: stat.color }} />
                          </motion.div>
                          <Badge className={`${stat.trend === 'down' ? 'bg-green-500' : 'bg-blue-500'} text-white shadow-md`}>
                            {stat.trend === 'down' ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                            {stat.change}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{stat.title}</p>
                        <div className="flex items-baseline gap-2">
                          <motion.p 
                            className="text-4xl"
                            style={{ color: stat.color }}
                            animate={isRefreshing ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {stat.value}
                          </motion.p>
                          <span className="text-xl" style={{ color: stat.color }}>{stat.unit}</span>
                        </div>

                        {/* Sparkle Effect on Hover */}
                        {hoveredCard === idx && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-4 right-4"
                          >
                            <Sparkles className="h-5 w-5" style={{ color: stat.color }} />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Dynamic Grid Layout - Trend Chart and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Trend - Takes 2 columns on large screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-blue-300 group h-full">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2>Today's CO₂ Trend</h2>
                      {isRefreshing && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw className="h-4 w-4 text-blue-500" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-sm text-[#64748b]">Real-time emission levels</p>
                  </div>
                  <Link to="/analytics">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-[#3b82f6] hover:text-white transition-all duration-300 group-hover:scale-105 whitespace-nowrap"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="co2" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#co2Gradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Real-time Alerts - Takes 1 column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="lg:col-span-1"
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-amber-300 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2>Live Alerts</h2>
                  <Badge className="bg-red-500 text-white animate-pulse">3</Badge>
                </div>
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {realtimeAlerts.map((alert, idx) => {
                    const Icon = alert.icon;
                    const severityColors = {
                      critical: "bg-red-50 border-red-200 text-red-700",
                      warning: "bg-amber-50 border-amber-200 text-amber-700",
                      success: "bg-green-50 border-green-200 text-green-700"
                    };
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + idx * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`p-3 rounded-xl border-2 ${severityColors[alert.severity as keyof typeof severityColors]} cursor-pointer transition-all`}
                        onClick={() => {
                          setSelectedAlert(alert);
                          setIsAlertModalOpen(true);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm mb-1">{alert.zone}</p>
                            <p className="text-xs opacity-75">{alert.message}</p>
                            <p className="text-xs opacity-60 mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <Link to="/alerts" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all"
                  >
                    View All Alerts
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>

          {/* Zone Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-teal-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2>Zone Performance</h2>
                    <p className="text-sm text-[#64748b]">Emission levels across monitored zones</p>
                  </div>
                </div>
                <Link to="/map">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-teal-500 hover:text-white transition-all duration-300"
                  >
                    View on Map
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {zones.map((zone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setSelectedZone(zone);
                      setIsZoneModalOpen(true);
                    }}
                  >
                    <div className="p-5 rounded-xl border-2 border-slate-200 hover:border-opacity-0 transition-all bg-white hover:shadow-xl relative overflow-hidden">
                      {/* Status Indicator */}
                      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: zone.color }} />
                      
                      {/* Hover Glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl blur-xl"
                        style={{ backgroundColor: zone.color }}
                      />
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3">
                          <Badge 
                            className="text-white border-none"
                            style={{ backgroundColor: zone.color }}
                          >
                            {zone.status.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingDown className="h-4 w-4" />
                            <span className="text-sm">{Math.abs(zone.trend)}%</span>
                          </div>
                        </div>
                        
                        <h3 className="mb-3 text-slate-800">{zone.name}</h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">CO₂ Level:</span>
                            <span className="text-sm" style={{ color: zone.color }}>{zone.co2} ppm</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">AQI:</span>
                            <span className="text-sm" style={{ color: zone.color }}>{zone.aqi}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Population:</span>
                            <span className="text-sm text-slate-800">{zone.population}</span>
                          </div>
                        </div>
                        
                        <Progress 
                          value={(zone.aqi / 150) * 100} 
                          className="mt-3 h-2"
                          style={{
                            backgroundColor: `${zone.color}20`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[ 
              { icon: BarChart, title: "Analytics", desc: "View detailed reports", tab: "analytics", color: "from-purple-500 to-pink-500" },
              { icon: Zap, title: "Simulation", desc: "Run scenarios", tab: "simulation", color: "from-amber-500 to-orange-500" },
              { icon: MapPin, title: "City Map", desc: "Explore zones", tab: "map", color: "from-teal-500 to-cyan-500" },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <Link to={`/${action.tab}`} key={idx}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-4 cursor-pointer hover:shadow-xl transition-all border-2 border-slate-200 hover:border-opacity-0 group overflow-hidden relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="relative flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-800 mb-0.5">{action.title}</h3>
                          <p className="text-sm text-slate-500">{action.desc}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <ZoneDetailModal
        isOpen={isZoneModalOpen}
        onClose={() => {
          setIsZoneModalOpen(false);
          setSelectedZone(null);
        }}
        zone={selectedZone}
      />

      <AlertDetailModal
        isOpen={isAlertModalOpen}
        onClose={() => {
          setIsAlertModalOpen(false);
          setSelectedAlert(null);
        }}
        alert={selectedAlert}
      />
    </div>
  );
}