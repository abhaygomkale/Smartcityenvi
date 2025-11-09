import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, FileText, Calendar, TrendingDown, Share2, Eye, BarChart3, PieChart, Activity, Target, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNotification } from "./NotificationProvider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { motion, AnimatePresence } from "motion/react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart as RechartsPieChart, Pie, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Progress } from "./ui/progress";

export function ReportsPage() {
  const { showNotification } = useNotification();
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);

  const handleDownloadReport = (report: typeof reports[0]) => {
    // Create a comprehensive report data
    const reportData = {
      title: report.title,
      period: report.period,
      generated: new Date().toISOString(),
      summary: {
        totalEmissions: "2,470 ppm",
        averageAQI: "142",
        activeZones: 3,
        sensorsActive: "247/250"
      },
      zones: [
        {
          name: "Sitabuldi",
          co2: 1200,
          aqi: 142,
          status: "Poor",
          trend: "-3%"
        },
        {
          name: "MIHAN",
          co2: 890,
          aqi: 98,
          status: "Moderate",
          trend: "-5%"
        },
        {
          name: "Seminary Hills",
          co2: 320,
          aqi: 45,
          status: "Good",
          trend: "-8%"
        }
      ],
      highlights: report.highlights,
      recommendations: [
        "Increase green cover in Sitabuldi area",
        "Implement traffic management during peak hours",
        "Monitor industrial emissions in MIHAN zone"
      ]
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification("success", "Download Complete", `${report.title} has been downloaded successfully`);
  };

  const handleShareReport = (report: typeof reports[0]) => {
    const shareText = `Check out this ${report.title} for ${report.period}`;
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: shareText,
      }).catch(() => {
        showNotification("info", "Sharing", "Share functionality is limited in this browser");
      });
    } else {
      navigator.clipboard.writeText(shareText);
      showNotification("success", "Copied", "Report details copied to clipboard");
    }
  };

  const reports = [
    {
      id: 1,
      title: "Weekly Emission Report",
      period: "Oct 27 - Nov 2, 2025",
      type: "Weekly",
      status: "Ready",
      size: "2.4 MB",
      highlights: ["8.5% reduction", "Sitabuldi hotspot identified"],
    },
    {
      id: 2,
      title: "Monthly Environmental Analysis",
      period: "October 2025",
      type: "Monthly",
      status: "Ready",
      size: "5.8 MB",
      highlights: ["AQI improved by 12%", "Seminary Hills best performer"],
    },
    {
      id: 3,
      title: "Zone Performance Comparison",
      period: "Q4 2025",
      type: "Quarterly",
      status: "Ready",
      size: "8.2 MB",
      highlights: ["Multi-zone analysis", "Predictive insights"],
    },
  ];

  const templates = [
    { name: "Daily Summary", icon: FileText, description: "Quick overview of daily metrics" },
    { name: "Custom Date Range", icon: Calendar, description: "Generate report for specific period" },
    { name: "Zone-specific Analysis", icon: TrendingDown, description: "Detailed zone performance" },
    { name: "Comparative Study", icon: Share2, description: "Compare multiple time periods" },
  ];

  // Mock data for detailed report view
  const trendData = [
    { day: "Mon", sitabuldi: 1180, mihan: 870, seminary: 310 },
    { day: "Tue", sitabuldi: 1150, mihan: 850, seminary: 320 },
    { day: "Wed", sitabuldi: 1220, mihan: 920, seminary: 300 },
    { day: "Thu", sitabuldi: 1190, mihan: 880, seminary: 315 },
    { day: "Fri", sitabuldi: 1280, mihan: 950, seminary: 295 },
    { day: "Sat", sitabuldi: 1050, mihan: 780, seminary: 280 },
    { day: "Sun", sitabuldi: 980, mihan: 720, seminary: 270 },
  ];

  const sourcesData = [
    { name: "Vehicles", value: 45, color: "#3b82f6" },
    { name: "Industries", value: 35, color: "#f59e0b" },
    { name: "Residential", value: 12, color: "#10b981" },
    { name: "Commercial", value: 8, color: "#8b5cf6" },
  ];

  const radarData = [
    { metric: "CO₂", current: 75, target: 60 },
    { metric: "AQI", current: 68, target: 50 },
    { metric: "Traffic", current: 82, target: 60 },
    { metric: "Industrial", current: 70, target: 55 },
    { metric: "Residential", current: 45, target: 40 },
  ];

  const zonePerformance = [
    { zone: "Sitabuldi", performance: 65, status: "Poor" },
    { zone: "MIHAN", performance: 78, status: "Moderate" },
    { zone: "Seminary Hills", performance: 92, status: "Good" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:to-slate-800 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-400 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      <div className="relative p-6">
        <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl mb-1">Reports & Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400">Generate and download comprehensive emission reports</p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white">
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200">
          <p className="text-sm text-slate-600 mb-2">Total Reports</p>
          <p className="text-3xl text-blue-600">47</p>
          <p className="text-xs text-slate-600 mt-1">All time</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200">
          <p className="text-sm text-slate-600 mb-2">This Month</p>
          <p className="text-3xl text-teal-600">12</p>
          <p className="text-xs text-slate-600 mt-1">Generated</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
          <p className="text-sm text-slate-600 mb-2">Avg Report Size</p>
          <p className="text-3xl text-amber-600">3.2 MB</p>
          <p className="text-xs text-slate-600 mt-1">Per report</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-2 border-green-200">
          <p className="text-sm text-slate-600 mb-2">Last Generated</p>
          <p className="text-3xl text-green-600">2h</p>
          <p className="text-xs text-slate-600 mt-1">Ago</p>
        </Card>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="mb-4">Recent Reports</h2>
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3>{report.title}</h3>
                      <p className="text-sm text-slate-600">{report.period}</p>
                    </div>
                  </div>
                  <div className="ml-15 flex gap-2 mb-3">
                    {report.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-4">
                    <Badge className={report.status === "Ready" ? "bg-green-500" : "bg-amber-500"}>
                      {report.status}
                    </Badge>
                    <p className="text-sm text-slate-600 mt-2">{report.type} • {report.size}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={report.status !== "Ready"}
                    onClick={() => setSelectedReport(report)}
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    disabled={report.status !== "Ready"}
                    onClick={() => handleDownloadReport(report)}
                    className="hover:bg-green-50 hover:text-green-600 hover:border-green-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleShareReport(report)}
                    className="hover:bg-teal-50 hover:text-teal-600 hover:border-teal-600"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h2 className="mb-4">Report Templates</h2>
        <div className="grid grid-cols-4 gap-4">
          {templates.map((template, idx) => {
            const Icon = template.icon;
            return (
              <Card key={idx} className="p-5 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2">{template.name}</h3>
                <p className="text-sm text-slate-600">{template.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Export Options */}
      <Card className="p-6 bg-gradient-to-r from-green-500/10 to-teal-500/10 border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1">Automated Report Generation</h3>
            <p className="text-sm text-slate-600">Schedule reports to be generated automatically</p>
          </div>
          <Button variant="outline" className="border-2">Configure Schedule</Button>
        </div>
      </Card>
        </div>
      </div>

      {/* Detailed Report Modal - FULL SCREEN */}
      <AnimatePresence>
        {selectedReport && (
          <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
            <DialogContent className="max-w-[99vw] w-[99vw] max-h-[98vh] p-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-green-600 via-teal-500 to-green-500 px-6 py-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-xl">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white mb-0.5">{selectedReport.title}</h2>
                        <p className="text-white/80 text-xs">{selectedReport.period}</p>
                      </div>
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownloadReport(selectedReport)}
                        className="text-white hover:bg-white/20 w-10 h-10"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleShareReport(selectedReport)}
                        className="text-white hover:bg-white/20 w-10 h-10"
                      >
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Modal Content - FULL WIDTH */}
                <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-green-50 px-4 py-6">
                  <div className="space-y-6">
                    
                    {/* Key Metrics Row - LARGER */}
                    <div className="grid grid-cols-4 gap-4">
                      <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                        <Activity className="h-7 w-7 text-blue-600 mb-2" />
                        <p className="text-sm text-slate-600 mb-1">Total Emissions</p>
                        <p className="text-3xl text-blue-700 mb-1">2,470</p>
                        <p className="text-xs text-slate-600">ppm average</p>
                        <Progress value={75} className="mt-2 h-2" />
                      </Card>
                      <Card className="p-5 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200">
                        <Target className="h-7 w-7 text-teal-600 mb-2" />
                        <p className="text-sm text-slate-600 mb-1">Average AQI</p>
                        <p className="text-3xl text-teal-700 mb-1">142</p>
                        <p className="text-xs text-slate-600">Moderate level</p>
                        <Progress value={60} className="mt-2 h-2" />
                      </Card>
                      <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                        <TrendingDown className="h-7 w-7 text-green-600 mb-2" />
                        <p className="text-sm text-slate-600 mb-1">Improvement</p>
                        <p className="text-3xl text-green-700 mb-1">8.5%</p>
                        <p className="text-xs text-slate-600">vs last period</p>
                        <Progress value={85} className="mt-2 h-2" />
                      </Card>
                      <Card className="p-5 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200">
                        <BarChart3 className="h-7 w-7 text-amber-600 mb-2" />
                        <p className="text-sm text-slate-600 mb-1">Active Sensors</p>
                        <p className="text-3xl text-amber-700 mb-1">247</p>
                        <p className="text-xs text-slate-600">of 250 total</p>
                        <Progress value={99} className="mt-2 h-2" />
                      </Card>
                    </div>

                    {/* Charts Row 1 - Trend and Distribution - LARGER */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-5 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 shadow-lg">
                        <h3 className="mb-4 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          Weekly Emission Trends
                        </h3>
                        <ResponsiveContainer width="100%" height={500}>
                          <AreaChart data={trendData}>
                            <defs>
                              <linearGradient id="sitabuldiGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="mihanGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="seminaryGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "12px", border: "2px solid #e5e7eb" }} />
                            <Legend />
                            <Area type="monotone" dataKey="sitabuldi" stroke="#3b82f6" fillOpacity={1} fill="url(#sitabuldiGrad)" name="Sitabuldi" />
                            <Area type="monotone" dataKey="mihan" stroke="#0891b2" fillOpacity={1} fill="url(#mihanGrad)" name="MIHAN" />
                            <Area type="monotone" dataKey="seminary" stroke="#10b981" fillOpacity={1} fill="url(#seminaryGrad)" name="Seminary Hills" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </Card>

                      <Card className="p-5 bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 shadow-lg">
                        <h3 className="mb-4 flex items-center gap-2">
                          <PieChart className="h-5 w-5 text-teal-600" />
                          Emission Source Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={500}>
                          <RechartsPieChart>
                            <Pie
                              data={sourcesData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={160}
                              fill="#8884d8"
                              dataKey="value"
                              animationBegin={0}
                              animationDuration={800}
                            >
                              {sourcesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </Card>
                    </div>

                    {/* Charts Row 2 - Performance and Radar - LARGER */}
                    <div className="grid grid-cols-2 gap-8">
                      <Card className="p-8 bg-gradient-to-br from-green-50 to-white border-2 border-green-200 shadow-lg">
                        <h3 className="mb-6 flex items-center gap-2 text-xl">
                          <BarChart3 className="h-6 w-6 text-green-600" />
                          Zone Performance Comparison
                        </h3>
                        <ResponsiveContainer width="100%" height={500}>
                          <BarChart data={zonePerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="zone" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "12px", border: "2px solid #e5e7eb" }} />
                            <Bar dataKey="performance" radius={[8, 8, 0, 0]} animationBegin={0} animationDuration={800}>
                              {zonePerformance.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.status === "Good" ? "#10b981" : entry.status === "Moderate" ? "#0891b2" : "#f59e0b"} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </Card>

                      <Card className="p-8 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 shadow-lg">
                        <h3 className="mb-6 flex items-center gap-2 text-xl">
                          <Target className="h-6 w-6 text-purple-600" />
                          Environmental Metrics Radar
                        </h3>
                        <ResponsiveContainer width="100%" height={500}>
                          <RadarChart data={radarData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="metric" />
                            <PolarRadiusAxis />
                            <Radar name="Current" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                            <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                            <Legend />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </Card>
                    </div>

                    {/* Recommendations Section - LARGER */}
                    <Card className="p-8 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 shadow-lg">
                      <h3 className="mb-6 flex items-center gap-2 text-xl">
                        <Activity className="h-6 w-6 text-blue-600" />
                        Key Recommendations
                      </h3>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="p-4 bg-white rounded-lg border-2 border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-600">1</span>
                            </div>
                            <p>Increase Green Cover</p>
                          </div>
                          <p className="text-sm text-slate-600">Plant 500+ trees in Sitabuldi area to reduce CO₂ levels</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600">2</span>
                            </div>
                            <p>Traffic Management</p>
                          </div>
                          <p className="text-sm text-slate-600">Implement odd-even policy during peak hours (4-6 PM)</p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border-2 border-teal-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                              <span className="text-teal-600">3</span>
                            </div>
                            <p>Industrial Monitoring</p>
                          </div>
                          <p className="text-sm text-slate-600">Enhanced monitoring of MIHAN zone industrial emissions</p>
                        </div>
                      </div>
                    </Card>

                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
