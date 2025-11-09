import { Activity, Wind, Droplets, ThermometerSun } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function LiveDataPanel() {
  const regions = [
    { name: "Sitabuldi (Central)", value: 1200, status: "hazardous" },
    { name: "MIHAN Airport", value: 890, status: "poor" },
    { name: "Seminary Hills", value: 320, status: "good" },
    { name: "Dharampeth", value: 680, status: "moderate" },
  ];

  const pollutantSources = [
    { source: "Vehicles", percentage: 45, color: "#0ea5e9" },
    { source: "Industries", percentage: 35, color: "#f59e0b" },
    { source: "Residential", percentage: 12, color: "#10b981" },
    { source: "Others", percentage: 8, color: "#6b7280" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-[#10b981]";
      case "moderate": return "bg-[#eab308]";
      case "poor": return "bg-[#f59e0b]";
      case "hazardous": return "bg-[#ef4444]";
      default: return "bg-[#6b7280]";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="w-80 bg-white border-l p-4 space-y-4 overflow-y-auto">
      {/* Current CO₂ Levels */}
      <Card className="p-4 bg-gradient-to-br from-[#10b981]/10 to-[#06b6d4]/10 border-[#10b981]/20">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-5 w-5 text-[#10b981]" />
          <h3>CO₂ Levels by Region</h3>
        </div>
        <div className="space-y-3">
          {regions.map((region, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">{region.name}</span>
                <Badge className={`${getStatusColor(region.status)} text-white`}>
                  {region.value} ppm
                </Badge>
              </div>
              <Progress value={(region.value / 1500) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* AQI Levels */}
      <Card className="p-4">
        <h3 className="mb-3">Air Quality Index</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-[#f0fdf4] rounded-lg">
            <span>Overall AQI</span>
            <Badge className="bg-[#eab308] text-white">Moderate</Badge>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-[#f0f9ff] rounded text-center">
              <p className="text-xs text-[#6b7280]">PM2.5</p>
              <p className="text-lg text-[#0ea5e9]">42</p>
            </div>
            <div className="p-2 bg-[#fef3c7] rounded text-center">
              <p className="text-xs text-[#6b7280]">PM10</p>
              <p className="text-lg text-[#f59e0b]">68</p>
            </div>
            <div className="p-2 bg-[#f0fdf4] rounded text-center">
              <p className="text-xs text-[#6b7280]">O₃</p>
              <p className="text-lg text-[#10b981]">35</p>
            </div>
            <div className="p-2 bg-[#fef2f2] rounded text-center">
              <p className="text-xs text-[#6b7280]">NO₂</p>
              <p className="text-lg text-[#ef4444]">78</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Info - Nagpur */}
      <Card className="p-4">
        <h3 className="mb-3">Weather Conditions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-5 w-5 text-[#f59e0b]" />
              <span className="text-sm">Temperature</span>
            </div>
            <span>32°C</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-[#0ea5e9]" />
              <span className="text-sm">Humidity</span>
            </div>
            <span>58%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-[#06b6d4]" />
              <span className="text-sm">Wind Speed</span>
            </div>
            <span>15 km/h SW</span>
          </div>
          <div className="mt-3 p-2 bg-[#f0f9ff] rounded text-center">
            <p className="text-xs text-[#6b7280]">Forecast</p>
            <p className="text-sm">Partly Cloudy</p>
          </div>
        </div>
      </Card>

      {/* Pollutant Sources */}
      <Card className="p-4">
        <h3 className="mb-3">Emission Sources</h3>
        <div className="space-y-3">
          {pollutantSources.map((source, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm">{source.source}</span>
                <span className="text-sm">{source.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${source.percentage}%`,
                    backgroundColor: source.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <Card className="p-4 bg-gradient-to-br from-[#0ea5e9]/10 to-[#06b6d4]/10 border-[#0ea5e9]/20">
        <h3 className="mb-3">24h Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-2xl text-[#10b981]">-8%</p>
            <p className="text-xs text-[#6b7280]">vs Yesterday</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-[#0ea5e9]">642</p>
            <p className="text-xs text-[#6b7280]">Avg CO₂ ppm</p>
          </div>
        </div>
      </Card>
    </div>
  );
}