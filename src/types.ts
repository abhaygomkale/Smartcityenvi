export interface Sensor {
  id: number;
  lat: number;
  lon: number;
  value: number;
  location: string;
  zone: string;
  aqi: number;
  temp: number;
}
