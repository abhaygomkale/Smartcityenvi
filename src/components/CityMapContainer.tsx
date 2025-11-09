import { useState } from "react";
import { InteractiveMap } from "./InteractiveMap";
import { Map3D } from "./Map3D";
import { HeatMapView } from "./HeatMapView";
import { Button } from "./ui/button";
import { Globe, Map as MapIcon, Flame } from "lucide-react";
import { Sensor } from "../types";
import { useAppContext } from "../context/AppContext";

const demoSensors: Sensor[] = [
  // Sitabuldi (Central Business District) - Main Sensor
  { 
    id: 1, 
    lat: 21.1458, 
    lon: 79.0882, 
    value: 1143, 
    location: "Sitabuldi Central Station", 
    zone: "Sitabuldi", 
    aqi: 142, 
    temp: 33 
  },
  
  // MIHAN (Airport & Industrial Area) - Main Sensor
  { 
    id: 2, 
    lat: 21.0782, 
    lon: 79.0482, 
    value: 887, 
    location: "MIHAN Airport Zone", 
    zone: "MIHAN", 
    aqi: 98, 
    temp: 31 
  },
  
  // Seminary Hills (Green Residential Area) - Main Sensor
  { 
    id: 3, 
    lat: 21.1528, 
    lon: 79.0551, 
    value: 330, 
    location: "Seminary Hills Park", 
    zone: "Seminary Hills", 
    aqi: 45, 
    temp: 28 
  },
];

export function CityMapContainer() {
  const { useRealTimeData, sensorData } = useAppContext();
  const [mapMode, setMapMode] = useState<"2d" | "3d" | "heatmap">("heatmap");
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

  const sensors = useRealTimeData ? sensorData : demoSensors;

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      {/* Map Mode Toggle */}
      <div className="flex items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div>
          <h2 className="text-2xl">Interactive City Map</h2>
          <p className="text-sm text-slate-600">Real-time environmental monitoring across Nagpur</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={mapMode === "heatmap" ? "default" : "outline"}
            onClick={() => setMapMode("heatmap")}
            className={mapMode === "heatmap" ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white" : ""}
          >
            <Flame className="h-4 w-4 mr-2" />
            Heat Map
          </Button>
          <Button
            variant={mapMode === "2d" ? "default" : "outline"}
            onClick={() => setMapMode("2d")}
            className={mapMode === "2d" ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white" : ""}
          >
            <MapIcon className="h-4 w-4 mr-2" />
            2D Map
          </Button>
          <Button
            variant={mapMode === "3d" ? "default" : "outline"}
            onClick={() => setMapMode("3d")}
            className={mapMode === "3d" ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white" : ""}
          >
            <Globe className="h-4 w-4 mr-2" />
            3D Globe
          </Button>
        </div>
      </div>

      {/* Map Display */}
      <div className="flex-1 min-h-0 relative">
        {mapMode === "heatmap" ? (
          <HeatMapView sensors={sensors} onSensorClick={setSelectedSensor} />
        ) : mapMode === "2d" ? (
          <InteractiveMap sensors={sensors} onSensorClick={setSelectedSensor} />
        ) : (
          <Map3D sensors={sensors} onSensorClick={setSelectedSensor} />
        )}
      </div>
    </div>
  );
}