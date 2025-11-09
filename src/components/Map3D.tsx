import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { AlertCircle, ExternalLink, Globe } from "lucide-react";

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

interface Map3DProps {
  sensors: Sensor[];
  onSensorClick: (sensor: Sensor) => void;
}

export function Map3D({ sensors, onSensorClick }: Map3DProps) {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Show setup instructions instead of trying to load
    setError("Cesium 3D map requires additional setup. See instructions below.");
    setIsLoading(false);

    /* 
    // To enable Cesium 3D map:
    // 1. Get a free token from https://cesium.com/ion/signup
    // 2. Install Cesium: Add <script src="https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Cesium.js"></script> to index.html
    // 3. Uncomment and configure the code below
    
    const CESIUM_TOKEN = "YOUR_CESIUM_ION_TOKEN_HERE";

    const loadCesium = async () => {
      try {
        // Load Cesium CSS
        if (!document.getElementById('cesium-css')) {
          const link = document.createElement('link');
          link.id = 'cesium-css';
          link.rel = 'stylesheet';
          link.href = 'https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Widgets/widgets.css';
          document.head.appendChild(link);
        }

        // Use global Cesium object (loaded via script tag)
        const Cesium = (window as any).Cesium;
        if (!Cesium) {
          throw new Error("Cesium not loaded");
        }
        
        if (!cesiumContainer.current) return;

        // Set the Cesium Ion access token
        (window as any).CESIUM_BASE_URL = '/';
        Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;

        // Create the Cesium Viewer
        const viewer = new Cesium.Viewer(cesiumContainer.current, {
          terrain: Cesium.Terrain.fromWorldTerrain(),
          animation: false,
          timeline: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: true,
          navigationHelpButton: false,
          fullscreenButton: false,
          vrButton: false,
          infoBox: true,
          selectionIndicator: true,
        });

        viewerRef.current = viewer;

        // Fly to Nagpur, Maharashtra, India
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(79.0882, 21.1458, 15000),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            roll: 0.0,
          },
          duration: 3,
        });

        // Add 3D buildings tileset for Nagpur area (Google 3D Tiles)
        try {
          const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
          viewer.scene.primitives.add(tileset);
        } catch (e) {
          console.log("3D buildings not available, continuing with terrain");
        }

        // Add sensor markers
        sensors.forEach((sensor) => {
          const color = getColorFromValue(sensor.value, Cesium);
          
          // Add a point entity for each sensor
          const entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(sensor.lon, sensor.lat, 100),
            point: {
              pixelSize: 15,
              color: color,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 2,
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            },
            billboard: {
              image: createSensorCanvas(sensor.value, color),
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            },
            description: `
              <div style="font-family: Arial, sans-serif;">
                <h3>${sensor.location}</h3>
                <p><strong>Zone:</strong> ${sensor.zone}</p>
                <p><strong>CO₂:</strong> ${sensor.value} ppm</p>
                <p><strong>AQI:</strong> ${sensor.aqi}</p>
                <p><strong>Temperature:</strong> ${sensor.temp}°C</p>
              </div>
            `,
          });

          // Add a cylinder to show emission volume
          viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(sensor.lon, sensor.lat),
            cylinder: {
              length: sensor.value * 0.5,
              topRadius: 200,
              bottomRadius: 200,
              material: color.withAlpha(0.3),
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
            },
          });
        });

        // Add zone polygons
        addZonePolygons(viewer, Cesium);

        setIsLoading(false);
      } catch (err: any) {
        console.error("Error loading Cesium:", err);
        setError(err.message || "Failed to load 3D map. Please check your Cesium token.");
        setIsLoading(false);
      }
    };

    // Uncomment to enable: loadCesium();
    */

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [sensors]);

  const getColorFromValue = (value: number, Cesium: any) => {
    if (value > 1000) return Cesium.Color.RED;
    if (value > 600) return Cesium.Color.ORANGE;
    if (value > 400) return Cesium.Color.YELLOW;
    return Cesium.Color.GREEN;
  };

  const createSensorCanvas = (value: number, color: any): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Draw background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.roundRect(0, 0, 80, 40, 8);
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = color.toCssColorString();
      ctx.lineWidth = 2;
      ctx.roundRect(0, 0, 80, 40, 8);
      ctx.stroke();
      
      // Draw text
      ctx.fillStyle = '#1a2e2a';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${value}`, 40, 25);
      ctx.font = '10px Arial';
      ctx.fillText('ppm', 40, 35);
    }
    
    return canvas.toDataURL();
  };

  const addZonePolygons = (viewer: any, Cesium: any) => {
    // Sitabuldi zone (Central Business District)
    viewer.entities.add({
      name: 'Sitabuldi Zone',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          79.078, 21.150,
          79.095, 21.150,
          79.095, 21.138,
          79.078, 21.138,
        ]),
        material: Cesium.Color.RED.withAlpha(0.2),
        outline: true,
        outlineColor: Cesium.Color.RED,
        outlineWidth: 2,
        height: 0,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      },
    });

    // MIHAN zone (Airport & Industrial)
    viewer.entities.add({
      name: 'MIHAN Zone',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          79.035, 21.085,
          79.055, 21.085,
          79.055, 21.070,
          79.035, 21.070,
        ]),
        material: Cesium.Color.ORANGE.withAlpha(0.2),
        outline: true,
        outlineColor: Cesium.Color.ORANGE,
        outlineWidth: 2,
        height: 0,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      },
    });

    // Seminary Hills zone (Green Residential)
    viewer.entities.add({
      name: 'Seminary Hills Zone',
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          79.045, 21.160,
          79.065, 21.160,
          79.065, 21.145,
          79.045, 21.145,
        ]),
        material: Cesium.Color.GREEN.withAlpha(0.2),
        outline: true,
        outlineColor: Cesium.Color.GREEN,
        outlineWidth: 2,
        height: 0,
        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      },
    });
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#1e293b] via-[#0f4c3a] to-[#0f172a] rounded-xl relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#10b981] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#0ea5e9] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <Card className="p-8 max-w-2xl relative z-10 border-2 border-[#10b981]/30">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-[#10b981] to-[#0ea5e9] rounded-full flex items-center justify-center mb-4">
              <Globe className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="mb-2">3D Globe View Available</h2>
            <p className="text-sm text-[#6b7280] mb-6">
              Enable Cesium.js for an immersive 3D map experience with terrain and buildings
            </p>

            <div className="w-full bg-gradient-to-r from-[#f0fdf4] to-[#f0f9ff] p-6 rounded-lg mb-6">
              <h3 className="text-sm mb-3 flex items-center gap-2">
                <span className="text-2xl">🌍</span>
                Quick Setup (5 minutes):
              </h3>
              <ol className="text-sm text-[#6b7280] space-y-3 text-left">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#10b981] text-white rounded-full flex items-center justify-center text-xs">1</span>
                  <div className="flex-1">
                    <p className="mb-1">Sign up for free Cesium Ion account</p>
                    <a 
                      href="https://cesium.com/ion/signup" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0ea5e9] hover:underline text-xs flex items-center gap-1"
                    >
                      cesium.com/ion/signup <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#10b981] text-white rounded-full flex items-center justify-center text-xs">2</span>
                  <div className="flex-1">
                    <p>Add Cesium script to your HTML:</p>
                    <code className="block mt-1 p-2 bg-[#1a2e2a] text-[#10b981] rounded text-xs overflow-x-auto">
                      {'<script src="https://cesium.com/downloads/cesiumjs/releases/1.111/Build/Cesium/Cesium.js"></script>'}
                    </code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#10b981] text-white rounded-full flex items-center justify-center text-xs">3</span>
                  <div className="flex-1">
                    <p>Update Map3D.tsx with your token</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#10b981] text-white rounded-full flex items-center justify-center text-xs">4</span>
                  <div className="flex-1">
                    <p>Uncomment the loadCesium() call</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="flex gap-3 w-full">
              <Button 
                className="flex-1 bg-[#10b981] hover:bg-[#059669]"
                onClick={() => window.open('https://cesium.com/ion/signup', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Get Free Cesium Token
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => window.open('/MAP_SETUP_GUIDE.md', '_blank')}
              >
                View Setup Guide
              </Button>
            </div>

            <div className="mt-6 p-4 bg-[#fff7ed] border border-[#f59e0b]/30 rounded-lg text-left w-full">
              <p className="text-sm">
                <strong className="text-[#f59e0b]">💡 Note:</strong> The 2D map is fully functional and requires no setup. 
                The 3D globe is optional for enhanced visualization.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl z-10">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#10b981] border-r-transparent mb-4"></div>
            <p className="text-white">Loading 3D Map...</p>
          </div>
        </div>
      )}
      <div ref={cesiumContainer} className="w-full h-full rounded-xl overflow-hidden" />
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 z-10">
        <Badge className="bg-white/95 text-[#1a2e2a] backdrop-blur-md">
          🌍 Nagpur 3D Digital Twin
        </Badge>
      </div>
    </div>
  );
}