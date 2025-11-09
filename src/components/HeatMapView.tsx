import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Layers, Navigation, ZoomIn, ZoomOut } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

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

interface HeatMapViewProps {
  sensors: Sensor[];
  onSensorClick: (sensor: Sensor) => void;
}

const getColorFromValue = (value: number): string => {
  if (value > 1000) return "#ef4444";
  if (value > 600) return "#f59e0b";
  if (value > 400) return "#eab308";
  return "#10b981";
};

export function HeatMapView({ sensors, onSensorClick }: HeatMapViewProps) {
  const [viewMode, setViewMode] = useState<"co2" | "aqi" | "temp">("co2");

  const getValueForMode = (sensor: Sensor, mode: "co2" | "aqi" | "temp"): number => {
    if (mode === "co2") return sensor.value;
    if (mode === "aqi") return sensor.aqi;
    return sensor.temp;
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl overflow-hidden shadow-2xl">
      <MapContainer center={[21.1458, 79.0882]} zoom={12} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sensors.map(sensor => {
          const value = getValueForMode(sensor, viewMode);
          const color = getColorFromValue(value);
          return (
            <Circle
              key={sensor.id}
              center={[sensor.lat, sensor.lon]}
              radius={1500} // Increased radius for a more 'heatmap' feel
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.4,
                stroke: false
              }}
            >
              <Popup>
                {sensor.location}: {value} {viewMode === 'co2' ? 'ppm' : viewMode === 'aqi' ? 'AQI' : '°C'}
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>

      {/* UI Controls can be added here if needed, similar to InteractiveMap */}
    </div>
  );
}
