import { Dialog, DialogContent } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Download, MapPin, Users, Building, TrendingDown, TrendingUp, Target, Activity, 
  Wind, Leaf, Factory, TreeDeciduous, Zap
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  AreaChart, Area, PieChart, Pie, Cell, ComposedChart
} from "recharts";

interface ZoneDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  zone: {
    name: string;
    co2: number;
    aqi: number;
    status: string;
    population: string;
    color: string;
    trend: number;
  } | null;
}

export function ZoneDetailModal({ isOpen, onClose, zone }: ZoneDetailModalProps) {
  if (!zone) return null;

  const weeklyData = [
    { day: "Mon", co2: zone.co2 + 80, aqi: zone.aqi + 7, traffic: 75 },
    { day: "Tue", co2: zone.co2 + 50, aqi: zone.aqi + 4, traffic: 68 },
    { day: "Wed", co2: zone.co2 + 120, aqi: zone.aqi + 10, traffic: 82 },
    { day: "Thu", co2: zone.co2 + 90, aqi: zone.aqi + 6, traffic: 71 },
    { day: "Fri", co2: zone.co2 + 180, aqi: zone.aqi + 13, traffic: 95 },
    { day: "Sat", co2: zone.co2 - 50, aqi: zone.aqi - 10, traffic: 45 },
    { day: "Sun", co2: zone.co2 - 100, aqi: zone.aqi - 15, traffic: 32 },
  ];

  const performanceData = [
    { metric: "CO₂", current: 75, target: 60 },
    { metric: "AQI", current: 68, target: 50 },
    { metric: "Traffic", current: 82, target: 60 },
    { metric: "Compliance", current: 70, target: 85 },
    { metric: "Green Cover", current: 55, target: 70 },
  ];

  const emissionBreakdown = [
    { name: "Vehicles", value: 42, fill: "#3b82f6" },
    { name: "Industry", value: 28, fill: "#f59e0b" },
    { name: "Residential", value: 18, fill: "#10b981" },
    { name: "Commercial", value: 12, fill: "#8b5cf6" },
  ];

  const hourlyPattern = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    co2: Math.floor(Math.random() * 300) + 800 + Math.sin(i / 4) * 150,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "moderate": return "bg-amber-500";
      case "poor": return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  const handleExport = () => {
    const data = { zone, weeklyData, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zone-${zone.name}-${Date.now()}.json`;
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
              className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-purple-50"
            >
              {/* Header */}
              <div 
                className="px-6 py-4 flex items-center justify-between text-white"
                style={{ background: `linear-gradient(135deg, ${zone.color} 0%, ${zone.color}dd 100%)` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl">{zone.name}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <Badge className={`${getStatusColor(zone.status)} text-white border-none`}>
                        {zone.status.toUpperCase()}
                      </Badge>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{zone.population}</span>
                      <span className="flex items-center gap-1">
                        {zone.trend < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                        {Math.abs(zone.trend)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button onClick={handleExport} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Download className="h-4 w-4 mr-2" />Export
                  </Button>
                  <Button onClick={onClose} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Row 1: Top Metrics (5 columns) */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                  {[
                    { label: "CO₂", value: zone.co2, unit: "ppm", icon: Wind, gradient: "from-blue-500 to-cyan-500" },
                    { label: "AQI", value: zone.aqi, unit: "", icon: Activity, gradient: "from-green-500 to-emerald-500" },
                    { label: "Population", value: zone.population, unit: "", icon: Users, gradient: "from-purple-500 to-pink-500" },
                    { label: "Trend", value: `${zone.trend > 0 ? '+' : ''}${zone.trend}`, unit: "%", icon: zone.trend < 0 ? TrendingDown : TrendingUp, gradient: zone.trend < 0 ? "from-green-500 to-emerald-500" : "from-red-500 to-rose-500" },
                    { label: "Sensors", value: "12", unit: "active", icon: Activity, gradient: "from-teal-500 to-cyan-500" },
                  ].map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <Card key={idx} className="p-4 bg-white border-2 hover:shadow-lg transition-shadow">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center mb-2`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{metric.label}</p>
                        <div className="flex items-baseline gap-1">
                          <p className="text-xl">{metric.value}</p>
                          <span className="text-xs text-slate-600">{metric.unit}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Row 2: Main Charts (60% + 40%) */}
                <div className="grid grid-cols-[3fr_2fr] gap-6 mb-6">
                  {/* Weekly Trend */}
                  <Card className="p-5 border-2 border-blue-200 bg-white">
                    <h3 className="mb-4 text-lg">Weekly Environmental Metrics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={weeklyData}>
                        <defs>
                          <linearGradient id="co2ZoneGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ borderRadius: "8px", fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Area yAxisId="left" type="monotone" dataKey="co2" stroke="#3b82f6" fill="url(#co2ZoneGrad)" name="CO₂" />
                        <Line yAxisId="right" type="monotone" dataKey="aqi" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="AQI" />
                        <Bar yAxisId="right" dataKey="traffic" fill="#f59e0b" opacity={0.5} name="Traffic" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Performance Radar */}
                  <Card className="p-5 border-2 border-purple-200 bg-white">
                    <h3 className="mb-4 text-lg">Performance vs Target</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={performanceData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="metric" style={{ fontSize: '11px' }} />
                        <PolarRadiusAxis domain={[0, 100]} style={{ fontSize: '10px' }} />
                        <Radar name="Current" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} strokeWidth={2} />
                        <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Row 3: Secondary Charts (33% each) */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  {/* Hourly Pattern */}
                  <Card className="p-5 border-2 border-teal-200 bg-white">
                    <h3 className="mb-3 text-base">24h CO₂ Pattern</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={hourlyPattern}>
                        <defs>
                          <linearGradient id="hourlyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="hour" stroke="#64748b" style={{ fontSize: '10px' }} interval={5} />
                        <YAxis stroke="#64748b" style={{ fontSize: '10px' }} />
                        <Tooltip contentStyle={{ fontSize: '11px' }} />
                        <Area type="monotone" dataKey="co2" stroke="#14b8a6" fill="url(#hourlyGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Emission Sources */}
                  <Card className="p-5 border-2 border-amber-200 bg-white">
                    <h3 className="mb-3 text-base">Emission Sources</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={emissionBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={75}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {emissionBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Key Metrics */}
                  <Card className="p-5 border-2 border-slate-200 bg-white">
                    <h3 className="mb-3 text-base">Key Metrics</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Compliance", value: 75 },
                        { label: "Coverage", value: 92 },
                        { label: "Quality", value: 88 },
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

                {/* Row 4: Info Cards (25% each) */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Infrastructure */}
                  <Card className="p-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      Infrastructure
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Sensors:</span>
                        <span className="text-blue-600">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span className="text-blue-600">8.5 km²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roads:</span>
                        <span className="text-blue-600">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Green Zones:</span>
                        <span className="text-blue-600">5</span>
                      </div>
                    </div>
                  </Card>

                  {/* Green Initiatives */}
                  <Card className="p-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <TreeDeciduous className="h-4 w-4 text-green-600" />
                      Green Initiatives
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-3 w-3 text-green-600" />
                        <span>2,500 trees planted</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="h-3 w-3 text-green-600" />
                        <span>12 air purifiers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Factory className="h-3 w-3 text-green-600" />
                        <span>3 green industries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-green-600" />
                        <span>25% renewable</span>
                      </div>
                    </div>
                  </Card>

                  {/* Recommendations */}
                  <Card className="p-4 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      Recommendations
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Deploy 2 more sensors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Enhance transport</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Increase green 15%</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-purple-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Traffic management</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Target Stats */}
                  <Card className="p-4 border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <Target className="h-4 w-4 text-rose-600" />
                      Targets 2025
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>CO₂ Target:</span>
                        <span className="text-rose-600">800 ppm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AQI Target:</span>
                        <span className="text-rose-600">50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Green Cover:</span>
                        <span className="text-rose-600">70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance:</span>
                        <span className="text-rose-600">85%</span>
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
