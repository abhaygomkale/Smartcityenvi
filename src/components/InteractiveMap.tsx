import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { Sensor } from '../types';

// This is a simplified version to ensure the map renders.
// We will add back the controls and other features step-by-step.

interface InteractiveMapProps {
  sensors: Sensor[];
  onSensorClick: (sensor: Sensor) => void;
}

export function InteractiveMap({ sensors, onSensorClick }: InteractiveMapProps) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [map]);

  return (
    <MapContainer 
      ref={setMap}
      center={[21.1458, 79.0882]} 
      zoom={12} 
      scrollWheelZoom={true} 
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Markers and other features will be added back here */}
    </MapContainer>
  );
}
