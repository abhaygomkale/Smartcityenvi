import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, ZoomIn, ZoomOut, Navigation, Maximize2 } from "lucide-react";
import { SensorDetailModal } from "./SensorDetailModal";

interface Sensor {
  id: number;
  lat: number;
  lon: number;
  value: number;
  location: string;
  zone: string;
  aqi: number;
  temp: number;
}

interface NagpurMapProps {
  sensors: Sensor[];
  onSensorClick: (sensor: Sensor) => void;
}

export function NagpurMap({ sensors, onSensorClick }: NagpurMapProps) {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simple timeout to show map is ready
    const timer = setTimeout(() => setMapReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSensorClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
    setIsModalOpen(true);
    onSensorClick(sensor);
  };

  const getColorFromValue = (value: number): string => {
    if (value > 1000) return "#ef4444";
    if (value > 600) return "#f59e0b";
    if (value > 400) return "#eab308";
    return "#10b981";
  };

  const getStatusText = (value: number): string => {
    if (value > 1000) return "⚠️ HAZARDOUS";
    if (value > 600) return "POOR";
    if (value > 400) return "MODERATE";
    return "✓ GOOD";
  };

  return (
    <div className="relative h-full w-full bg-[#e0f2fe] rounded-xl overflow-hidden shadow-xl">
      {/* OpenStreetMap iFrame */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=78.98%2C21.05%2C79.18%2C21.25&layer=mapnik&marker=21.1458%2C79.0882"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        className="absolute inset-0"
        title="Nagpur Map"
      />

      {/* Header Card */}
      <div className="absolute top-4 left-4 z-10">
        <Card className="p-4 bg-white/98 backdrop-blur-md shadow-xl border-2 border-[#10b981]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#0ea5e9] flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg">Nagpur Smart City</h2>
              <p className="text-sm text-[#6b7280]">CO₂ Digital Twin Dashboard</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sensor Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {sensors.map((sensor, idx) => {
          // Convert lat/lon to approximate screen positions (simplified)
          const x = 50 + (sensor.lon - 79.0) * 4000;
          const y = 50 + (21.25 - sensor.lat) * 4000;
          const color = getColorFromValue(sensor.value);

          return (
            <div
              key={sensor.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => handleSensorClick(sensor)}
            >
              {/* Pulsing circle */}
              <div className="relative w-16 h-16">
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    backgroundColor: color,
                    opacity: 0.4,
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full flex items-center justify-center shadow-xl border-4 border-white"
                  style={{
                    backgroundColor: color,
                  }}
                >
                  <span className="text-white text-xs font-bold">{sensor.value}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <Card className="p-4 bg-white/98 backdrop-blur-md shadow-xl">
          <h4 className="text-sm mb-3">CO₂ Levels (ppm)</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#10b981]"></div>
              <span className="text-xs">Good (under 400)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#eab308]"></div>
              <span className="text-xs">Moderate (400-600)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f59e0b]"></div>
              <span className="text-xs">Poor (600-1000)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#ef4444]"></div>
              <span className="text-xs">Hazardous (over 1000)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Zone Badges */}
      <div className="absolute bottom-4 left-4 z-10 space-y-2">
        <Badge className="bg-[#ef4444] text-white shadow-lg">🏢 Sitabuldi - Central Business District</Badge>
        <Badge className="bg-[#f59e0b] text-white shadow-lg">✈️ MIHAN - Airport & Industrial</Badge>
        <Badge className="bg-[#10b981] text-white shadow-lg">🌳 Seminary Hills - Residential</Badge>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="p-3 bg-white/98 backdrop-blur-md shadow-xl max-w-xs">
          <p className="text-xs text-[#6b7280]">
            🖱️ Use map controls to navigate • Click colored markers for sensor details
          </p>
        </Card>
      </div>

      {/* Sensor Detail Modal */}
      {selectedSensor && (
        <SensorDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSensor(null);
          }}
          sensor={{
            id: String(selectedSensor.id),
            name: selectedSensor.location,
            zone: selectedSensor.zone,
            co2: selectedSensor.value,
            aqi: selectedSensor.aqi,
            temp: selectedSensor.temp,
            humidity: 65,
            status: selectedSensor.value > 1000 ? "poor" : selectedSensor.value > 600 ? "moderate" : "good",
            lat: selectedSensor.lat,
            lon: selectedSensor.lon,
          }}
        />
      )}

      {/* Loading overlay */}
      {!mapReady && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-30">
          <div className="text-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-[#10b981] border-r-transparent mb-4"></div>
            <h3 className="text-xl mb-2">Loading Nagpur City Map...</h3>
            <p className="text-sm text-[#6b7280]">Fetching real map data from OpenStreetMap</p>
          </div>
        </div>
      )}
    </div>
  );
}