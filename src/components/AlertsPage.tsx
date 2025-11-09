import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertDetailModal } from "./AlertDetailModal";

export function AlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTakeAction = (alert: any) => {
    setSelectedAlert({
      id: alert.id.toString(),
      zone: alert.zone,
      message: alert.message,
      severity: alert.status === "unresolved" ? "critical" : "warning",
      time: alert.time,
      type: alert.status
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };
  const criticalAlerts = [
    {
      id: 1,
      zone: "Sitabuldi",
      location: "Zero Mile",
      message: "CO₂ levels exceeded 1200 ppm - Immediate action required",
      value: 1200,
      time: "5 mins ago",
      status: "unresolved",
    },
    {
      id: 2,
      zone: "MIHAN",
      location: "SEZ Industrial Area",
      message: "Industrial emissions spike detected - 45% above normal",
      value: 950,
      time: "12 mins ago",
      status: "investigating",
    },
  ];

  const warnings = [
    {
      id: 3,
      zone: "Sitabuldi",
      location: "Residency Road",
      message: "Traffic congestion causing elevated emissions",
      value: 1080,
      time: "23 mins ago",
      status: "monitoring",
    },
    {
      id: 4,
      zone: "MIHAN",
      location: "Airport Terminal",
      message: "AQI approaching unhealthy levels",
      value: 820,
      time: "45 mins ago",
      status: "monitoring",
    },
  ];

  const resolved = [
    {
      id: 5,
      zone: "Seminary Hills",
      location: "Laxmi Nagar",
      message: "Temporary pollution spike resolved",
      value: 380,
      time: "2 hours ago",
      status: "resolved",
      resolution: "Natural wind dispersal",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unresolved": return "bg-[#ef4444]";
      case "investigating": return "bg-[#f59e0b]";
      case "monitoring": return "bg-[#eab308]";
      case "resolved": return "bg-[#10b981]";
      default: return "bg-[#6b7280]";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-5 w-5 text-[#ef4444]" />;
      case "warning": return <AlertCircle className="h-5 w-5 text-[#f59e0b]" />;
      case "info": return <Info className="h-5 w-5 text-[#0ea5e9]" />;
      case "resolved": return <CheckCircle className="h-5 w-5 text-[#10b981]" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-red-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl mb-1">Alert Management</h1>
          <p className="text-[#6b7280]">Real-time monitoring and incident tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-[#ef4444]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6b7280]">Critical</p>
            <AlertTriangle className="h-5 w-5 text-[#ef4444]" />
          </div>
          <p className="text-3xl">2</p>
          <p className="text-xs text-[#6b7280] mt-1">Active incidents</p>
        </Card>
        <Card className="p-4 border-l-4 border-[#f59e0b]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6b7280]">Warnings</p>
            <AlertCircle className="h-5 w-5 text-[#f59e0b]" />
          </div>
          <p className="text-3xl">2</p>
          <p className="text-xs text-[#6b7280] mt-1">Under monitoring</p>
        </Card>
        <Card className="p-4 border-l-4 border-[#10b981]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6b7280]">Resolved Today</p>
            <CheckCircle className="h-5 w-5 text-[#10b981]" />
          </div>
          <p className="text-3xl">8</p>
          <p className="text-xs text-[#6b7280] mt-1">Successfully handled</p>
        </Card>
        <Card className="p-4 border-l-4 border-[#0ea5e9]">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#6b7280]">Avg Response Time</p>
            <Clock className="h-5 w-5 text-[#0ea5e9]" />
          </div>
          <p className="text-3xl">12m</p>
          <p className="text-xs text-[#6b7280] mt-1">Last 24 hours</p>
        </Card>
      </div>

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Alerts ({criticalAlerts.length + warnings.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolved.length})</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {/* Critical Alerts */}
          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#ef4444]" />
              Critical Alerts
            </h3>
            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <Card key={alert.id} className="p-4 border-l-4 border-[#ef4444] bg-[#fef2f2]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4>{alert.zone} - {alert.location}</h4>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6b7280] mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#ef4444]">CO₂: {alert.value} ppm</span>
                        <span className="text-[#6b7280] flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {alert.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleTakeAction(alert)}>View Details</Button>
                      <Button size="sm" className="bg-[#ef4444] hover:bg-[#dc2626]" onClick={() => handleTakeAction(alert)}>
                        Take Action
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Warning Alerts */}
          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#f59e0b]" />
              Warnings
            </h3>
            <div className="space-y-3">
              {warnings.map((alert) => (
                <Card key={alert.id} className="p-4 border-l-4 border-[#f59e0b] bg-[#fff7ed]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4>{alert.zone} - {alert.location}</h4>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6b7280] mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#f59e0b]">CO₂: {alert.value} ppm</span>
                        <span className="text-[#6b7280] flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {alert.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleTakeAction(alert)}>View Details</Button>
                      <Button size="sm" className="bg-[#f59e0b] hover:bg-[#ea580c]" onClick={() => handleTakeAction(alert)}>
                        Investigate
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-3 mt-4">
          {resolved.map((alert) => (
            <Card key={alert.id} className="p-4 border-l-4 border-[#10b981] bg-[#f0fdf4]">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4>{alert.zone} - {alert.location}</h4>
                    <Badge className="bg-[#10b981]">RESOLVED</Badge>
                  </div>
                  <p className="text-sm text-[#6b7280] mb-2">{alert.message}</p>
                  <p className="text-sm text-[#10b981] mb-2">Resolution: {alert.resolution}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[#10b981]">CO₂: {alert.value} ppm</span>
                    <span className="text-[#6b7280] flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {alert.time}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline">View Report</Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="p-8 text-center">
            <Info className="h-12 w-12 text-[#6b7280] mx-auto mb-3" />
            <h3 className="mb-2">Alert History</h3>
            <p className="text-sm text-[#6b7280]">View past 30 days of alerts and resolutions</p>
            <Button className="mt-4 bg-[#10b981] hover:bg-[#059669]">Load History</Button>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </div>

      {/* Alert Detail Modal */}
      <AlertDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        alert={selectedAlert} 
      />
    </div>
  );
}