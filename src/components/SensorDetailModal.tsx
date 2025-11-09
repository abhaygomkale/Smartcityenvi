import { Dialog, DialogContent } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Download, Share2, MapPin, Activity, Wind, 
  ThermometerSun, Droplets, TrendingUp, TrendingDown,
  CheckCircle, Zap, Radio, Signal
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, Legend, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart
} from "recharts";

interface SensorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sensor: {
    id: string;
    name: string;
    zone: string;
    co2: number;
    aqi: number;
    temp: number;
    humidity: number;
    status: string;
    lat: number;
    lon: number;
  } | null;
}

export function SensorDetailModal({ isOpen, onClose, sensor }: SensorDetailModalProps) {
  if (!sensor) return null;

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    co2: Math.floor(Math.random() * 300) + 850 + Math.sin(i / 4) * 100,
    aqi: Math.floor(Math.random() * 40) + 90 + Math.cos(i / 3) * 15,
    temp: Math.floor(Math.random() * 10) + 25 + Math.sin(i / 5) * 5,
  }));

  const weeklyData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    avg: Math.floor(Math.random() * 150) + 900,
    min: Math.floor(Math.random() * 100) + 800,
    max: Math.floor(Math.random() * 200) + 1000,
  }));

  const emissionSources = [
    { name: "Vehicles", value: 45, color: "#3b82f6" },
    { name: "Industry", value: 30, color: "#f59e0b" },
    { name: "Residential", value: 15, color: "#10b981" },
    { name: "Other", value: 10, color: "#8b5cf6" },
  ];

  const performanceMetrics = [
    { subject: "Accuracy", current: 95, target: 90 },
    { subject: "Uptime", current: 98, target: 95 },
    { subject: "Response", current: 92, target: 85 },
    { subject: "Calibration", current: 88, target: 90 },
    { subject: "Quality", current: 94, target: 90 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "moderate": return "bg-amber-500";
      case "poor": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "good": return "from-green-500 to-emerald-500";
      case "moderate": return "from-amber-500 to-orange-500";
      case "poor": return "from-red-500 to-rose-500";
      default: return "from-slate-500 to-gray-500";
    }
  };

  const handleExport = () => {
    const data = { sensor, hourlyData, weeklyData, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sensor-${sensor.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-[1400px] max-h-[90vh] p-0 gap-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getStatusGradient(sensor.status)} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl">{sensor.name}</h2>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <Badge className={`${getStatusColor(sensor.status)} text-white border-none`}>
                        {sensor.status.toUpperCase()}
                      </Badge>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{sensor.zone}</span>
                      <span className="flex items-center gap-1"><Signal className="h-3 w-3" />ID: {sensor.id}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button onClick={handleExport} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Download className="h-4 w-4 mr-2" />Export
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Share2 className="h-4 w-4 mr-2" />Share
                  </Button>
                  <Button onClick={onClose} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Row 1: Metrics (4 columns) */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "CO₂", value: sensor.co2, unit: "ppm", icon: Wind, gradient: "from-blue-500 to-cyan-500", change: -5 },
                    { label: "AQI", value: sensor.aqi, unit: "", icon: Activity, gradient: "from-green-500 to-emerald-500", change: 3 },
                    { label: "Temp", value: sensor.temp, unit: "°C", icon: ThermometerSun, gradient: "from-amber-500 to-orange-500", change: 1.2 },
                    { label: "Humidity", value: sensor.humidity, unit: "%", icon: Droplets, gradient: "from-teal-500 to-cyan-500", change: -2 },
                  ].map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <Card key={idx} className="p-4 bg-white border-2 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className={`flex items-center gap-1 text-xs ${metric.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                            {Math.abs(metric.change)}%
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{metric.label}</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl">{metric.value}</p>
                          <span className="text-xs text-slate-600">{metric.unit}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Row 2: Main Charts (70% + 30%) */}
                <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6">
                  {/* Large Chart */}
                  <Card className="p-5 border-2 border-blue-200 bg-white">
                    <h3 className="mb-4 text-lg flex items-center gap-2">
                      <Radio className="h-5 w-5 text-blue-600" />
                      24-Hour Environmental Data
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={hourlyData}>
                        <defs>
                          <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis yAxisId="left" stroke="#3b82f6" style={{ fontSize: '11px' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ borderRadius: "8px", fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Area yAxisId="left" type="monotone" dataKey="co2" stroke="#3b82f6" fill="url(#co2Grad)" name="CO₂ (ppm)" />
                        <Line yAxisId="right" type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="AQI" />
                        <Bar yAxisId="left" dataKey="temp" fill="#f59e0b" opacity={0.3} name="Temp" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Pie Chart */}
                  <Card className="p-5 border-2 border-purple-200 bg-white">
                    <h3 className="mb-4 text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      Sources
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={emissionSources}
                          cx="50%"
                          cy="45%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {emissionSources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {emissionSources.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
                          <span>{s.name} {s.value}%</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Row 3: Secondary Charts (33% each) */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {/* Weekly */}
                  <Card className="p-5 border-2 border-teal-200 bg-white">
                    <h3 className="mb-3 text-base">Weekly Range</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '10px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ fontSize: '11px' }} />
                        <Bar dataKey="max" fill="#0891b2" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="avg" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="min" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Radar */}
                  <Card className="p-5 border-2 border-indigo-200 bg-white">
                    <h3 className="mb-3 text-base">Sensor Health</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <RadarChart data={performanceMetrics}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" style={{ fontSize: '10px' }} />
                        <PolarRadiusAxis domain={[0, 100]} style={{ fontSize: '9px' }} />
                        <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                        <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        <Tooltip contentStyle={{ fontSize: '11px' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Performance */}
                  <Card className="p-5 border-2 border-slate-200 bg-white">
                    <h3 className="mb-3 text-base">Performance</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Accuracy", value: 95 },
                        { label: "Uptime", value: 98 },
                        { label: "Response", value: 92 },
                        { label: "Calibration", value: 88 },
                      ].map((stat, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>{stat.label}</span>
                            <span className="text-blue-600">{stat.value}%</span>
                          </div>
                          <Progress value={stat.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Row 4: Insights (25% each) */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-sm">Good Trends</h3>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>8% decrease this week</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Air quality improving</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>High accuracy 95%</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-5 w-5 text-amber-600" />
                      <h3 className="text-sm">Attention</h3>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Friday CO₂ spikes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Peak hour impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Calibration due soon</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-blue-600" />
                      <h3 className="text-sm">Actions</h3>
                    </div>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Reduce peak traffic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Increase green cover</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Schedule maintenance</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-4 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Signal className="h-5 w-5 text-purple-600" />
                      <h3 className="text-sm">Stats</h3>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Lat/Lon:</span>
                        <span className="text-purple-700">{sensor.lat.toFixed(2)}, {sensor.lon.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active:</span>
                        <span className="text-green-600">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Rate:</span>
                        <span className="text-blue-600">5 min</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
