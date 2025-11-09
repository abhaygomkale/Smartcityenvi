import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card } from "./ui/card";

export function AnalyticsPanel() {
  const weekData = [
    { day: "Mon", co2: 720 },
    { day: "Tue", co2: 680 },
    { day: "Wed", co2: 750 },
    { day: "Thu", co2: 690 },
    { day: "Fri", co2: 820 },
    { day: "Sat", co2: 650 },
    { day: "Sun", co2: 580 },
  ];

  const predictionData = [
    { hour: "00:00", predicted: 620, actual: 610 },
    { hour: "04:00", predicted: 580, actual: 590 },
    { hour: "08:00", predicted: 750, actual: 740 },
    { hour: "12:00", predicted: 820, actual: null },
    { hour: "16:00", predicted: 880, actual: null },
    { hour: "20:00", predicted: 760, actual: null },
    { hour: "23:59", predicted: 680, actual: null },
  ];

  const comparisonData = [
    { category: "Industrial", current: 850, simulated: 620 },
    { category: "Traffic", current: 720, simulated: 580 },
    { category: "Residential", current: 420, simulated: 380 },
    { category: "Commercial", current: 560, simulated: 490 },
  ];

  return (
    <div className="h-80 bg-white border-t p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* CO₂ Trends */}
        <Card className="p-4">
          <h3 className="mb-2">CO₂ Levels - Last 7 Days</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              />
              <Area type="monotone" dataKey="co2" stroke="#10b981" fillOpacity={1} fill="url(#colorCo2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Prediction */}
        <Card className="p-4">
          <h3 className="mb-2">AI Forecast - Next 24 Hours</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              />
              <Line type="monotone" dataKey="actual" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Comparison */}
        <Card className="p-4">
          <h3 className="mb-2">Current vs Simulated Emissions</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              />
              <Bar dataKey="current" fill="#f59e0b" name="Current" radius={[8, 8, 0, 0]} />
              <Bar dataKey="simulated" fill="#10b981" name="Simulated" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}