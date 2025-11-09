import { useState, useMemo, useEffect } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Calendar, Download, Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAppContext } from "../context/AppContext";
import { generateDemoData } from "../lib/demo-data";
import { MetricCards } from "./analytics/MetricCards";
import { ZoneTrendsChart } from "./analytics/ZoneTrendsChart";
import { HourlyEmissionChart } from "./analytics/HourlyEmissionChart";
import { AnalyticsDetailView } from "./analytics/AnalyticsDetailView";

export function AnalyticsPage() {
  const { useRealTimeData, sensorData } = useAppContext();
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("7days");

  const demoData = useMemo(() => generateDemoData(dateRange), [dateRange, useRealTimeData]);

  const metricCards = useRealTimeData && sensorData.length > 0 ? [
    {
      id: "total-co2",
      title: "Total CO₂ Emissions",
      value: sensorData.reduce((acc, sensor) => acc + sensor.value, 0).toFixed(2),
      unit: "ppm",
      change: "-12%",
      icon: "activity"
    },
    {
      id: "avg-aqi",
      title: "Average AQI",
      value: (sensorData.reduce((acc, sensor) => acc + sensor.aqi, 0) / sensorData.length).toFixed(2),
      unit: "",
      change: "-8%",
      icon: "wind"
    },
    {
      id: "active-sensors",
      title: "Active Sensors",
      value: sensorData.length.toString(),
      unit: "",
      change: "+3%",
      icon: "leaf"
    },
    {
      id: "peak-emission-zone",
      title: "Peak Emission Zone",
      value: sensorData.reduce((prev, current) => (prev.value > current.value) ? prev : current).zone,
      unit: "",
      change: "",
      icon: "map-pin"
    }
  ] : demoData.metricCards;

  const handleExport = () => {
    const data = { weekData: demoData.weekData, predictionData: demoData.predictionData, emissionSources: demoData.emissionSources, zoneComparison: demoData.zoneComparison, hourlyPattern: demoData.hourlyPattern, radarData: demoData.radarData, metricCards: demoData.metricCards, dateRange };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const selectedMetricData = metricCards.find(m => m.id === selectedMetric);
  const Icon = selectedMetricData?.icon;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:to-slate-800 relative">
      <div className="relative p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl mb-2">Advanced Analytics Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-400">Comprehensive emission trends, predictions, and insights</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              <Button onClick={handleExport} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          <MetricCards metrics={metricCards} onCardClick={setSelectedMetric} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ZoneTrendsChart data={demoData.weekData} />
            <HourlyEmissionChart data={demoData.hourlyPattern} />
          </div>

          {/* Redesigned Modal */}
                    <AnimatePresence>
                      {selectedMetric && selectedMetricData && Icon && (
                        <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
                          <DialogContent className="max-w-[1000px] w-[95vw] p-0 bg-white rounded-lg">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col h-full">
                              {/* Modal Header */}
                              <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b">
                                <div className="flex items-center justify-between">
                                  <DialogTitle className="flex items-center gap-3">
                                    <Icon className="h-6 w-6 text-blue-600" />
                                    <span className="text-xl">{selectedMetricData.title}</span>
                                  </DialogTitle>
                                  <DialogDescription className="sr-only">{selectedMetricData.title} details</DialogDescription>
                                  {/* The default shadcn/ui close button will be used */}
                                </div>
                              </div>
                              {/* Modal Content */}
                              <div className="flex-1 overflow-y-auto p-6">
                                <AnalyticsDetailView metric={selectedMetric} data={demoData} />
                              </div>
                            </motion.div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
