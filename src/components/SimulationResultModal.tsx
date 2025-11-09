import { Dialog, DialogContent } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Download, Share2, TrendingDown, Award, DollarSign, Target, CheckCircle, 
  TreeDeciduous, Car, Factory, Sparkles, Users, Calendar
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart
} from "recharts";

interface SimulationResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: {
    impact: number;
    cost: number;
    roi: string;
    timeline: number;
    interventions: {
      trees: number;
      traffic: number;
      tech: number;
    };
  } | null;
}

export function SimulationResultModal({ isOpen, onClose, results }: SimulationResultModalProps) {
  if (!results) return null;

  const projectionData = [
    { month: "M1", current: 1200, projected: 1200 - (results.impact * 12 * 0.2), target: 900, savings: 50 },
    { month: "M2", current: 1180, projected: 1180 - (results.impact * 12 * 0.4), target: 900, savings: 85 },
    { month: "M3", current: 1150, projected: 1150 - (results.impact * 12 * 0.6), target: 900, savings: 120 },
    { month: "M4", current: 1120, projected: 1120 - (results.impact * 12 * 0.8), target: 900, savings: 150 },
    { month: "M5", current: 1100, projected: 1100 - (results.impact * 12), target: 900, savings: 180 },
    { month: "M6", current: 1080, projected: 1080 - (results.impact * 12), target: 900, savings: 200 },
  ];

  const interventionBreakdown = [
    { name: "Green", impact: Math.round(results.interventions.trees * 0.05), fill: "#10b981" },
    { name: "Traffic", impact: Math.round(results.interventions.traffic * 0.8), fill: "#3b82f6" },
    { name: "Tech", impact: Math.round(results.interventions.tech * 2), fill: "#0891b2" },
  ];

  const costBreakdown = [
    { category: "Green Infra", cost: results.interventions.trees * 0.5, fill: "#10b981" },
    { category: "Traffic Sys", cost: results.interventions.traffic / 10, fill: "#3b82f6" },
    { category: "Technology", cost: results.interventions.tech * 25, fill: "#0891b2" },
    { category: "Implementation", cost: results.cost * 0.15, fill: "#f59e0b" },
  ];

  const benefitMetrics = [
    { metric: "CO₂", value: results.impact, target: results.impact },
    { metric: "Air Quality", value: 85, target: 90 },
    { metric: "Health", value: 78, target: 85 },
    { metric: "Sustainability", value: 92, target: 95 },
    { metric: "Cost Eff", value: 88, target: 90 },
  ];

  const handleExport = () => {
    const data = { results, projectionData, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-[1600px] max-h-[90vh] p-0 gap-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-purple-50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl">Simulation Results</h2>
                    <p className="text-white/90 text-sm">AI-Powered Impact Analysis • Nagpur City</p>
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
                {/* Row 1: Top Metrics (5 columns) */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                  {[
                    { label: "CO₂ Reduction", value: `${results.impact}%`, icon: TrendingDown, gradient: "from-blue-500 to-cyan-500", badge: "Primary" },
                    { label: "ROI Score", value: `${results.roi}/10`, icon: Award, gradient: "from-teal-500 to-emerald-500", badge: "Excellent" },
                    { label: "Investment", value: `₹${results.cost.toFixed(1)}L`, icon: DollarSign, gradient: "from-amber-500 to-orange-500", badge: "Budget" },
                    { label: "Timeline", value: `${results.timeline}mo`, icon: Calendar, gradient: "from-green-500 to-emerald-500", badge: "Duration" },
                    { label: "Beneficiaries", value: "~25K", icon: Users, gradient: "from-purple-500 to-pink-500", badge: "People" },
                  ].map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <Card key={idx} className="p-4 bg-white border-2 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-none text-xs">
                            {metric.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{metric.label}</p>
                        <p className="text-2xl">{metric.value}</p>
                      </Card>
                    );
                  })}
                </div>

                {/* Row 2: Main Charts (50% + 25% + 25%) */}
                <div className="grid grid-cols-[2fr_1fr_1fr] gap-6 mb-6">
                  {/* Projection Chart */}
                  <Card className="p-5 border-2 border-blue-200 bg-white">
                    <h3 className="mb-4 text-lg">6-Month CO₂ Projection</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={projectionData}>
                        <defs>
                          <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <Tooltip contentStyle={{ borderRadius: "8px", fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Area yAxisId="left" type="monotone" dataKey="projected" stroke="#3b82f6" fill="url(#projGrad)" name="With Plan" />
                        <Line yAxisId="left" type="monotone" dataKey="current" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Current" />
                        <Line yAxisId="left" type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} name="Target" />
                        <Bar yAxisId="right" dataKey="savings" fill="#10b981" opacity={0.6} name="Savings" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Impact Pie */}
                  <Card className="p-5 border-2 border-purple-200 bg-white">
                    <h3 className="mb-4 text-lg">Impact Split</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={interventionBreakdown}
                          cx="50%"
                          cy="45%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="impact"
                        >
                          {interventionBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Benefit Radar */}
                  <Card className="p-5 border-2 border-teal-200 bg-white">
                    <h3 className="mb-4 text-lg">Benefits</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={benefitMetrics}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="metric" style={{ fontSize: '10px' }} />
                        <PolarRadiusAxis domain={[0, 100]} style={{ fontSize: '9px' }} />
                        <Radar name="Achieved" dataKey="value" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.6} />
                        <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Row 3: Cost Breakdown (full width) */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <Card className="p-5 border-2 border-amber-200 bg-white">
                    <h3 className="mb-4 text-base">Cost Distribution</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={costBreakdown} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" stroke="#64748b" style={{ fontSize: '11px' }} />
                        <YAxis dataKey="category" type="category" stroke="#64748b" style={{ fontSize: '11px' }} width={120} />
                        <Tooltip contentStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="cost" radius={[0, 4, 4, 0]}>
                          {costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                {/* Row 4: Intervention Details (33% each) */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <Card className="p-5 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <TreeDeciduous className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-base">Green Infrastructure</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Trees:</span>
                        <span className="text-green-700">{results.interventions.trees}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Impact:</span>
                        <span className="text-green-700">{Math.round(results.interventions.trees * 0.05)}%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Cost:</span>
                        <span className="text-green-700">₹{(results.interventions.trees * 0.5).toFixed(1)}L</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Time:</span>
                        <span className="text-green-700">{Math.ceil(results.timeline * 0.4)}mo</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Car className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-base">Traffic Management</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Reduction:</span>
                        <span className="text-blue-700">{results.interventions.traffic}%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Impact:</span>
                        <span className="text-blue-700">{Math.round(results.interventions.traffic * 0.8)}%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Cost:</span>
                        <span className="text-blue-700">₹{(results.interventions.traffic / 10).toFixed(1)}L</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Time:</span>
                        <span className="text-blue-700">{Math.ceil(results.timeline * 0.3)}mo</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5 border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                        <Factory className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-base">Technology Solutions</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Scrubbers:</span>
                        <span className="text-teal-700">{results.interventions.tech} units</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Impact:</span>
                        <span className="text-teal-700">{Math.round(results.interventions.tech * 2)}%</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Cost:</span>
                        <span className="text-teal-700">₹{(results.interventions.tech * 25).toFixed(0)}L</span>
                      </div>
                      <div className="flex justify-between p-2 bg-white rounded text-sm">
                        <span>Time:</span>
                        <span className="text-teal-700">{Math.ceil(results.timeline * 0.3)}mo</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Row 5: Summary (50% each) */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <Card className="p-5 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-base">Key Benefits</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Achieve <strong>{results.impact}%</strong> CO₂ reduction city-wide</span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Improve AQI by <strong>15-20 points</strong></span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Benefit <strong>{(results.impact * 12500).toLocaleString()}</strong> residents</span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>ROI score <strong>{results.roi}/10</strong> - excellent return</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className="p-5 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      <h3 className="text-base">AI Recommendations</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Prioritize <strong>Sitabuldi, MIHAN</strong> zones</span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Phase over <strong>{results.timeline} months</strong> for optimal results</span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Monitor <strong>weekly</strong> and adjust strategies</span>
                      </li>
                      <li className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>Combine all interventions for <strong>maximum impact</strong></span>
                      </li>
                    </ul>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-4 gap-3">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />Approve Plan
                  </Button>
                  <Button variant="outline" className="border-2">
                    <Download className="h-4 w-4 mr-2" />Save Draft
                  </Button>
                  <Button variant="outline" className="border-2">
                    <Target className="h-4 w-4 mr-2" />Modify
                  </Button>
                  <Button variant="outline" className="border-2">
                    <Share2 className="h-4 w-4 mr-2" />Share
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
