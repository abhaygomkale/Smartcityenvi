import { Dialog, DialogContent } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, AlertTriangle, Clock, MapPin, TrendingUp, CheckCircle, Activity, 
  Zap, Bell, Users, Target, Wind, BarChart3, Download
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, Legend, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

interface AlertDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  alert: {
    id?: string;
    zone: string;
    message: string;
    severity: string;
    time: string;
    type?: string;
  } | null;
}

export function AlertDetailModal({ isOpen, onClose, alert }: AlertDetailModalProps) {
  if (!alert) return null;

  const impactData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    level: Math.floor(Math.random() * 400) + 900 + Math.sin(i / 4) * 200,
    threshold: 1200,
  }));

  const comparisonData = [
    { day: "Mon", current: 1150, average: 1000 },
    { day: "Tue", current: 1200, average: 1020 },
    { day: "Wed", current: 1280, average: 1050 },
    { day: "Thu", current: 1350, average: 1080 },
    { day: "Fri", current: 1420, average: 1100 },
    { day: "Sat", current: 950, average: 900 },
    { day: "Sun", current: 850, average: 850 },
  ];

  const affectedAreas = [
    { area: "Traffic", impact: 85 },
    { area: "Residential", impact: 65 },
    { area: "Industrial", impact: 90 },
    { area: "Commercial", impact: 70 },
    { area: "Health", impact: 75 },
  ];

  const forecastData = Array.from({ length: 12 }, (_, i) => ({
    hour: `+${i}h`,
    predicted: Math.floor(Math.random() * 200) + 1000 - (i * 20),
    optimal: 900,
  }));

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "critical":
        return { bg: "from-red-600 to-red-700", color: "#ef4444", icon: AlertTriangle };
      case "warning":
        return { bg: "from-amber-600 to-amber-700", color: "#f59e0b", icon: Activity };
      case "success":
        return { bg: "from-green-600 to-green-700", color: "#10b981", icon: CheckCircle };
      default:
        return { bg: "from-slate-600 to-slate-700", color: "#64748b", icon: Activity };
    }
  };

  const config = getSeverityConfig(alert.severity);
  const Icon = config.icon;

  const handleExport = () => {
    const data = { alert, impactData, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alert-${alert.id || Date.now()}.json`;
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
              className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-red-50"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${config.bg} px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl">Alert Details</h2>
                    <div className="flex items-center gap-3 text-sm text-white/90">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{alert.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{alert.zone}</span>
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
                {/* Row 1: Alert Info (4 columns) */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <Card className="p-4 border-2 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" style={{ color: config.color }} />
                      <h3 className="text-sm">Location</h3>
                    </div>
                    <p className="text-xl mb-1">{alert.zone}</p>
                    <p className="text-xs text-slate-600">Affected Zone</p>
                  </Card>

                  <Card className="p-4 border-2 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" style={{ color: config.color }} />
                      <h3 className="text-sm">Detected</h3>
                    </div>
                    <p className="text-xl mb-1">{alert.time}</p>
                    <p className="text-xs text-slate-600">Time Reported</p>
                  </Card>

                  <Card className="p-4 border-2 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4" style={{ color: config.color }} />
                      <h3 className="text-sm">Priority</h3>
                    </div>
                    <p className="text-xl mb-1">{alert.severity === "critical" ? "High" : alert.severity === "warning" ? "Medium" : "Low"}</p>
                    <p className="text-xs text-slate-600">Action Level</p>
                  </Card>

                  <Card className="p-4 border-2 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" style={{ color: config.color }} />
                      <h3 className="text-sm">Impact</h3>
                    </div>
                    <p className="text-xl mb-1">~25K</p>
                    <p className="text-xs text-slate-600">People Affected</p>
                  </Card>
                </div>

                {/* Alert Message */}
                <Card className="p-5 mb-6 border-2 border-slate-200 bg-white">
                  <h3 className="mb-3 text-base flex items-center gap-2">
                    <Bell className="h-4 w-4" style={{ color: config.color }} />
                    Alert Message
                  </h3>
                  <div className="p-4 rounded-lg border-2 bg-slate-50" style={{ borderColor: config.color + '30' }}>
                    <p className="text-base">{alert.message}</p>
                  </div>
                </Card>

                {/* Row 2: Main Charts (60% + 40%) */}
                <div className="grid grid-cols-[3fr_2fr] gap-6 mb-6">
                  {/* Impact Timeline */}
                  <Card className="p-5 border-2 border-blue-200 bg-white">
                    <h3 className="mb-4 text-lg">Impact Timeline (24h)</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <AreaChart data={impactData}>
                        <defs>
                          <linearGradient id="impactGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={config.color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={config.color} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ borderRadius: "8px", fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Area type="monotone" dataKey="level" stroke={config.color} fill="url(#impactGrad)" name="CO₂ Level" />
                        <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Threshold" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Affected Areas Radar */}
                  <Card className="p-5 border-2 border-purple-200 bg-white">
                    <h3 className="mb-4 text-lg">Impact Areas</h3>
                    <ResponsiveContainer width="100%" height={260}>
                      <RadarChart data={affectedAreas}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="area" style={{ fontSize: '11px' }} />
                        <PolarRadiusAxis domain={[0, 100]} style={{ fontSize: '10px' }} />
                        <Radar 
                          name="Impact" 
                          dataKey="impact" 
                          stroke={config.color} 
                          fill={config.color} 
                          fillOpacity={0.6} 
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Row 3: Secondary Charts (50% each) */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Weekly Comparison */}
                  <Card className="p-5 border-2 border-teal-200 bg-white">
                    <h3 className="mb-3 text-base">Weekly Comparison</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="current" fill={config.color} name="Current" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="average" fill="#14b8a6" name="Average" radius={[4, 4, 0, 0]} opacity={0.6} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Forecast */}
                  <Card className="p-5 border-2 border-indigo-200 bg-white">
                    <h3 className="mb-3 text-base">12-Hour Forecast</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="hour" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#64748b" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Line type="monotone" dataKey="predicted" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="Predicted" />
                        <Line type="monotone" dataKey="optimal" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Optimal" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Row 4: Actions (33% each) */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Action Progress */}
                  <Card className="p-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      Action Progress
                    </h3>
                    <div className="space-y-2">
                      {[
                        { action: "Traffic Diversion", progress: 45 },
                        { action: "Public Advisory", progress: 100 },
                        { action: "Sensor Check", progress: 30 },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1 text-xs">
                            <span>{item.action}</span>
                            <span className="text-blue-600">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Immediate Actions */}
                  <Card className="p-4 border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-rose-600" />
                      Immediate Actions
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-rose-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Notify authorities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-rose-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Activate protocols</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-rose-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Issue advisory</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-rose-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Deploy response team</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Long-term Solutions */}
                  <Card className="p-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <h3 className="mb-3 text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Long-term Solutions
                    </h3>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Traffic diversion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Public transport</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Green infrastructure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1 flex-shrink-0" />
                        <span>Additional sensors</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-4 gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Mark Resolved
                  </Button>
                  <Button variant="outline" className="border-2">
                    Assign Team
                  </Button>
                  <Button variant="outline" className="border-2">
                    Escalate
                  </Button>
                  <Button variant="outline" className="border-2">
                    Generate Report
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
