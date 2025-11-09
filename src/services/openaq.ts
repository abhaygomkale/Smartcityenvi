import { Sensor } from "../types";

const API_KEY = import.meta.env.VITE_OPENAQ_API_KEY;
const API_URL = '/openaq/v3';

export const fetchLatestDataForNagpur = async (): Promise<Sensor[]> => {
  if (!API_KEY) {
    console.error("OpenAQ API key is missing.");
    // Return demo data or handle the error as appropriate for your application
    return []; 
  }

  try {
    // Step 1: Fetch locations for Nagpur
    // Step 1: Fetch locations for Nagpur using coordinates
    const latitude = 21.1458;
    const longitude = 79.0882;
    const radius = 25000; // 25 km radius

    const locationsResponse = await fetch(`${API_URL}/locations?coordinates=${latitude},${longitude}&radius=${radius}`, {
      headers: { 'X-API-Key': API_KEY },
    });

    if (!locationsResponse.ok) {
      console.error('Failed to fetch locations from OpenAQ', await locationsResponse.text());
      return []; // Or handle error appropriately
    }

    const locationsData = await locationsResponse.json();

    // Filter locations to ensure they are within Nagpur
    const nagpurLocations = locationsData.results.filter((location: any) =>
      location.city && location.city.toLowerCase().includes('nagpur') ||
      location.name && location.name.toLowerCase().includes('nagpur')
    );

    // Step 2: Fetch latest data for each filtered location
    const sensorDataPromises = nagpurLocations.map(async (location: any) => {
      const latestResponse = await fetch(`${API_URL}/locations/${location.id}/latest`, {
        headers: { 'X-API-Key': API_KEY },
      });

      if (!latestResponse.ok) {
        console.error(`Failed to fetch latest data for location ${location.id}`, await latestResponse.text());
        return null; // Skip this location if data fetch fails
      }

      const latestData = await latestResponse.json();
      console.log(`Latest data for location ${location.id}:`, latestData);

      // Assuming the latestData.results contains the measurements
      // and we need to transform it to the Sensor format.
      // This part may need adjustment based on the actual structure of the /latest/{id} response
      if (latestData.results && latestData.results.length > 0) {
        // Find the value for 'co' (or a default if not found)
        const coMeasurement = latestData.results.find((item: any) => item.sensorsId === 15259)?.value || 0; // Assuming 15259 is the sensorId for 'co'

        // Find the value for 'pm25' (for AQI)
        const pm25Measurement = latestData.results.find((item: any) => item.sensorsId === 14908)?.value || 0; // Assuming 14908 is the sensorId for 'pm25'

        return {
          id: location.id.toString(),
          lat: location.coordinates.latitude,
          lon: location.coordinates.longitude,
          value: coMeasurement, // Using 'co' as the primary value
          location: location.name,
          zone: location.city,
          aqi: pm25Measurement, // Using 'pm25' for AQI
          temp: 0, // Temperature data is not available from OpenAQ
        };
      }
      return null;
    });

    const sensorData = (await Promise.all(sensorDataPromises)).filter(Boolean) as Sensor[];
    return sensorData;

  } catch (error) {
    console.error('An error occurred during the fetch process:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('This might be a CORS issue. Check the browser console for more details.');
    }
    console.error('Error cause:', (error as Error).cause);
    console.error('Error stack:', (error as Error).stack);
    return []; // Return empty array or handle error as needed
  }
};
