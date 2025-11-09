import { AlertTriangle, Lightbulb, Trophy } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function InsightsSection() {
  const alerts = [
    {
      type: "critical",
      location: "Sitabuldi Square",
      value: "1200 ppm",
      message: "Critical CO₂ levels detected at peak traffic zone",
      icon: AlertTriangle,
    },
    {
      type: "warning",
      location: "MIHAN SEZ Area",
      value: "950 ppm",
      message: "Industrial emissions above normal",
      icon: AlertTriangle,
    },
  ];

  const suggestions = [
    {
      action: "Plant 250 trees along Residency Road, Sitabuldi",
      impact: "May reduce CO₂ by 6-9%",
      icon: Lightbulb,
    },
    {
      action: "Implement odd-even vehicle rule near Zero Mile",
      impact: "Could lower emissions by 18%",
      icon: Lightbulb,
    },
    {
      action: "Install 4 CO₂ scrubbers in MIHAN industrial zone",
      impact: "Expected 14% reduction",
      icon: Lightbulb,
    },
  ];

  const leaderboard = {
    mostPolluted: [
      { zone: "Sitabuldi Square", value: 1200, trend: "+5%" },
      { zone: "MIHAN SEZ", value: 950, trend: "+8%" },
      { zone: "Dharampeth", value: 680, trend: "+2%" },
    ],
    greenest: [
      { zone: "Seminary Hills", value: 290, trend: "-12%" },
      { zone: "Laxmi Nagar", value: 320, trend: "-8%" },
      { zone: "Ambazari Lake", value: 340, trend: "-6%" },
    ],
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Alerts */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-[#ef4444]" />
          <h3>Active Alerts</h3>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border-l-4 ${
                alert.type === "critical"
                  ? "bg-[#fef2f2] border-[#ef4444]"
                  : "bg-[#fff7ed] border-[#f59e0b]"
              }`}
            >
              <div className="flex items-start gap-2">
                <alert.icon className={`h-4 w-4 mt-0.5 ${
                  alert.type === "critical" ? "text-[#ef4444]" : "text-[#f59e0b]"
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-[#6b7280] mt-1">
                    {alert.location} - {alert.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggestions */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-[#10b981]" />
          <h3>AI Suggestions</h3>
        </div>
        <div className="space-y-3">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#f0fdf4] border border-[#10b981]/20"
            >
              <div className="flex items-start gap-2">
                <suggestion.icon className="h-4 w-4 mt-0.5 text-[#10b981]" />
                <div className="flex-1">
                  <p className="text-sm">{suggestion.action}</p>
                  <Badge className="mt-2 bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30">
                    {suggestion.impact}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-[#f59e0b]" />
          <h3>Zone Leaderboard</h3>
        </div>
        <div className="space-y-4">
          {/* Most Polluted */}
          <div>
            <h4 className="text-sm text-[#6b7280] mb-2">Most Polluted</h4>
            <div className="space-y-2">
              {leaderboard.mostPolluted.map((zone, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-gradient-to-r from-[#fef2f2] to-transparent rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-5 h-5 rounded-full bg-[#ef4444] text-white flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm">{zone.zone}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#ef4444]">{zone.value}</p>
                    <p className="text-xs text-[#6b7280]">{zone.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Greenest */}
          <div>
            <h4 className="text-sm text-[#6b7280] mb-2">Greenest Zones</h4>
            <div className="space-y-2">
              {leaderboard.greenest.map((zone, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-gradient-to-r from-[#f0fdf4] to-transparent rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-sm">{zone.zone}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#10b981]">{zone.value}</p>
                    <p className="text-xs text-[#6b7280]">{zone.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}