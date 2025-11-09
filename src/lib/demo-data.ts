import { Activity, TrendingDown, Zap, AlertCircle, Target, CheckCircle } from "lucide-react";

const generateRandomVariance = (base: number, range: number) => {
  return base + Math.floor(Math.random() * range) - range / 2;
};

export const generateDemoData = (dateRange: string) => {
  const weekData = (() => {
    switch (dateRange) {
      case "24hours":
        return Array.from({ length: 24 }, (_, i) => ({
          day: `${i}:00`,
          sitabuldi: generateRandomVariance(1100, 200),
          mihan: generateRandomVariance(850, 150),
          seminary: generateRandomVariance(300, 80),
          temp: generateRandomVariance(31, 6),
          aqi: generateRandomVariance(135, 30),
        }));
      case "30days":
        return Array.from({ length: 30 }, (_, i) => ({
          day: `D${i + 1}`,
          sitabuldi: generateRandomVariance(1150, 300),
          mihan: generateRandomVariance(870, 200),
          seminary: generateRandomVariance(300, 100),
          temp: generateRandomVariance(32, 8),
          aqi: generateRandomVariance(140, 40),
        }));
      case "90days":
        return Array.from({ length: 90 }, (_, i) => ({
          day: `D${i + 1}`,
          sitabuldi: generateRandomVariance(1100, 400),
          mihan: generateRandomVariance(850, 250),
          seminary: generateRandomVariance(290, 120),
          temp: generateRandomVariance(31, 10),
          aqi: generateRandomVariance(138, 50),
        }));
      default: // 7days
        return [
          { day: "Mon", sitabuldi: 1180, mihan: 870, seminary: 310, temp: 32, aqi: 142 },
          { day: "Tue", sitabuldi: 1150, mihan: 850, seminary: 320, temp: 31, aqi: 138 },
          { day: "Wed", sitabuldi: 1220, mihan: 920, seminary: 300, temp: 33, aqi: 145 },
          { day: "Thu", sitabuldi: 1190, mihan: 880, seminary: 315, temp: 32, aqi: 140 },
          { day: "Fri", sitabuldi: 1280, mihan: 950, seminary: 295, temp: 34, aqi: 148 },
          { day: "Sat", sitabuldi: 1050, mihan: 780, seminary: 280, temp: 30, aqi: 125 },
          { day: "Sun", sitabuldi: 980, mihan: 720, seminary: 270, temp: 29, aqi: 118 },
        ];
    }
  })();

  const predictionData = [
    { hour: "Now", actual: 1100, predicted: 1100, confidence: 100 },
    { hour: "+4h", actual: null, predicted: 1180, confidence: 94 },
    { hour: "+8h", actual: null, predicted: 980, confidence: 89 },
    { hour: "+12h", actual: null, predicted: 850, confidence: 85 },
    { hour: "+16h", actual: null, predicted: 920, confidence: 80 },
    { hour: "+20h", actual: null, predicted: 780, confidence: 75 },
    { hour: "+24h", actual: null, predicted: 650, confidence: 70 },
  ];

  const emissionSources = [
    { name: "Vehicles", value: 45, color: "#3b82f6", trend: "+2%" },
    { name: "Industries", value: 35, color: "#f59e0b", trend: "-5%" },
    { name: "Residential", value: 12, color: "#10b981", trend: "+1%" },
    { name: "Commercial", value: 8, color: "#8b5cf6", trend: "-3%" },
  ];

  const zoneComparison = [
    { zone: "Sitabuldi", current: 1200, lastWeek: 1280, target: 900, efficiency: 65 },
    { zone: "MIHAN", current: 890, lastWeek: 920, target: 700, efficiency: 78 },
    { zone: "Seminary Hills", current: 320, lastWeek: 350, target: 300, efficiency: 92 },
  ];

  const hourlyPattern = [
    { hour: "00:00", co2: 620, traffic: 15, industrial: 45 },
    { hour: "04:00", co2: 580, traffic: 10, industrial: 40 },
    { hour: "08:00", co2: 950, traffic: 85, industrial: 60 },
    { hour: "12:00", co2: 1100, traffic: 75, industrial: 80 },
    { hour: "16:00", co2: 1180, traffic: 90, industrial: 85 },
    { hour: "20:00", co2: 890, traffic: 70, industrial: 55 },
    { hour: "23:59", co2: 680, traffic: 20, industrial: 45 },
  ];

  const radarData = [
    { metric: "CO₂ Levels", current: 75, target: 60 },
    { metric: "AQI", current: 68, target: 50 },
    { metric: "Traffic", current: 82, target: 60 },
    { metric: "Industrial", current: 70, target: 55 },
    { metric: "Residential", current: 45, target: 40 },
    { metric: "Temperature", current: 55, target: 50 },
  ];

  const totalEmissions = weekData.reduce((sum, day) => sum + day.sitabuldi + day.mihan + day.seminary, 0);
  const avgEmissions = Math.round(totalEmissions / weekData.length);
  const reductionPercent = dateRange === "24hours" ? "3.2%" : dateRange === "7days" ? "8.5%" : dateRange === "30days" ? "12.3%" : "18.7%";

  const metricCards = [
      {
        id: "emissions",
        title: "Total CO₂ Emissions",
        value: avgEmissions.toLocaleString(),
        unit: "ppm",
        change: "-8.5%",
        trend: "down",
        icon: Activity,
        color: "#3b82f6",
        description: `${dateRange === "24hours" ? "Hourly" : dateRange === "7days" ? "Weekly" : "Period"} average emissions across all zones`
      },
      {
        id: "prediction",
        title: "AI Prediction Accuracy",
        value: "94.2%",
        unit: "",
        change: "+2.1%",
        trend: "up",
        icon: Zap,
        color: "#0891b2",
        description: "Machine learning model confidence"
      },
      {
        id: "zones",
        title: "Critical Zones",
        value: "1",
        unit: "/ 3",
        change: "-1",
        trend: "down",
        icon: AlertCircle,
        color: "#f59e0b",
        description: "Zones requiring immediate attention"
      },
      {
        id: "reduction",
        title: `${dateRange === "24hours" ? "Hourly" : dateRange === "7days" ? "Weekly" : "Period"} Reduction`,
        value: reductionPercent,
        unit: "",
        change: "vs previous period",
        trend: "down",
        icon: TrendingDown,
        color: "#10b981",
        description: "Overall emission reduction trend"
      },
      {
        id: "compliance",
        title: "Target Compliance",
        value: "78%",
        unit: "",
        change: "+5%",
        trend: "up",
        icon: Target,
        color: "#8b5cf6",
        description: "Zones meeting emission targets"
      },
      {
        id: "sensors",
        title: "Active Sensors",
        value: "247",
        unit: "/ 250",
        change: "99%",
        trend: "up",
        icon: CheckCircle,
        color: "#10b981",
        description: "Operational sensor network"
      },
  ];

  return { weekData, predictionData, emissionSources, zoneComparison, hourlyPattern, radarData, metricCards };
};

export const generateDashboardData = async (useRealTimeData: boolean) => {
  const defaultCityStats = [
    {
      title: "Overall CO₂ Level",
      value: "642",
      unit: "ppm",
      change: "-8%",
      trend: "down",
      status: "moderate",
      icon: Wind,
      color: "#3b82f6",
      bgGradient: "from-blue-50 via-blue-100 to-cyan-50",
      borderColor: "border-blue-300",
      glowColor: "shadow-blue-500/50",
    },
    {
      title: "Air Quality Index",
      value: "68",
      unit: "AQI",
      change: "+3%",
      trend: "up",
      status: "moderate",
      icon: Activity,
      color: "#10b981",
      bgGradient: "from-green-50 via-green-100 to-emerald-50",
      borderColor: "border-green-300",
      glowColor: "shadow-green-500/50",
    },
    {
      title: "Temperature",
      value: "32",
      unit: "°C",
      change: "+2°C",
      trend: "up",
      status: "normal",
      icon: ThermometerSun,
      color: "#f59e0b",
      bgGradient: "from-amber-50 via-amber-100 to-orange-50",
      borderColor: "border-amber-300",
      glowColor: "shadow-amber-500/50",
    },
    {
      title: "Humidity",
      value: "65",
      unit: "%",
      change: "-5%",
      trend: "down",
      status: "good",
      icon: Droplets,
      color: "#0891b2",
      bgGradient: "from-cyan-50 via-cyan-100 to-teal-50",
      borderColor: "border-cyan-300",
      glowColor: "shadow-cyan-500/50",
    },
  ];

  const defaultZones = [
    { name: "Sitabuldi (Central)", co2: 1200, aqi: 142, status: "poor", population: "~250K", color: "#ef4444", trend: -3, icon: MapPin },
    { name: "MIHAN (Airport)", co2: 890, aqi: 98, status: "moderate", population: "~80K", color: "#f59e0b", trend: -5, icon: MapPin },
    { name: "Seminary Hills", co2: 320, aqi: 45, status: "good", population: "~120K", color: "#10b981", trend: -8, icon: MapPin },
  ];

  const defaultRealtimeAlerts = [
    { zone: "Sitabuldi", message: "High traffic congestion detected", severity: "critical", time: "5 min ago", icon: AlertCircle },
    { zone: "MIHAN", message: "Industrial emissions spike", severity: "warning", time: "12 min ago", icon: Activity },
    { zone: "Seminary Hills", message: "Air quality improving", severity: "success", time: "20 min ago", icon: CheckCircle },
  ];

  const defaultTrendData = [
    { time: "6 AM", co2: 520 },
    { time: "9 AM", co2: 780 },
    { time: "12 PM", co2: 950 },
    { time: "3 PM", co2: 1100 },
    { time: "6 PM", co2: 890 },
    { time: "9 PM", co2: 680 },
    { time: "Now", co2: 642 },
  ];

  if (!useRealTimeData) {
    return {
      cityStats: defaultCityStats,
      zones: defaultZones,
      realtimeAlerts: defaultRealtimeAlerts,
      trendData: defaultTrendData,
    };
  }

  // --- Real-time data transformation ---
  try {
    const sensors: Sensor[] = await fetchLatestDataForNagpur();

    // Group sensors by location
    const groupedByLocation: { [key: string]: Sensor[] } = sensors.reduce((acc, sensor) => {
      if (!acc[sensor.location]) {
        acc[sensor.location] = [];
      }
      acc[sensor.location].push(sensor);
      return acc;
    }, {});

    const locationToZoneMap: { [key: string]: string } = {
      "Nagpur-Sitabuldi": "Sitabuldi (Central)",
      "Nagpur-MIHAN": "MIHAN (Airport)",
      "Nagpur-SeminaryHills": "Seminary Hills",
    };

    let totalCo2 = 0;
    let totalAqi = 0;
    let totalTemp = 0;
    let totalHumidity = 0; // Placeholder, as OpenAQ doesn't provide humidity
    let activeSensors = sensors.length;

    const realTimeZones = Object.keys(groupedByLocation).map(location => {
      const zoneSensors = groupedByLocation[location];
      const co2Values = zoneSensors.map(s => s.value);
      const aqiValues = zoneSensors.map(s => s.aqi);
      const tempValues = zoneSensors.map(s => s.temp);

      const avgCo2 = co2Values.reduce((sum, val) => sum + val, 0) / co2Values.length || 0;
      const avgAqi = aqiValues.reduce((sum, val) => sum + val, 0) / aqiValues.length || 0;
      const avgTemp = tempValues.reduce((sum, val) => sum + val, 0) / tempValues.length || 0;

      totalCo2 += avgCo2;
      totalAqi += avgAqi;
      totalTemp += avgTemp;

      const status = avgCo2 > 1000 ? "poor" : avgCo2 > 700 ? "moderate" : "good";
      const color = status === "poor" ? "#ef4444" : status === "moderate" ? "#f59e0b" : "#10b981";

      return {
        name: locationToZoneMap[location] || location,
        co2: Math.round(avgCo2),
        aqi: Math.round(avgAqi),
        status: status,
        population: "~Unknown", // Placeholder
        color: color,
        trend: generateRandomVariance(0, 10), // Placeholder trend
        icon: MapPin,
      };
    });

    const realTimeCityStats = [
      {
        title: "Overall CO₂ Level",
        value: Math.round(totalCo2 / realTimeZones.length).toLocaleString(),
        unit: "ppm",
        change: "-8%", // Placeholder
        trend: "down", // Placeholder
        status: "moderate", // Placeholder
        icon: Wind,
        color: "#3b82f6",
        bgGradient: "from-blue-50 via-blue-100 to-cyan-50",
        borderColor: "border-blue-300",
        glowColor: "shadow-blue-500/50",
      },
      {
        title: "Air Quality Index",
        value: Math.round(totalAqi / realTimeZones.length).toLocaleString(),
        unit: "AQI",
        change: "+3%", // Placeholder
        trend: "up", // Placeholder
        status: "moderate", // Placeholder
        icon: Activity,
        color: "#10b981",
        bgGradient: "from-green-50 via-green-100 to-emerald-50",
        borderColor: "border-green-300",
        glowColor: "shadow-green-500/50",
      },
      {
        title: "Temperature",
        value: Math.round(totalTemp / realTimeZones.length).toLocaleString(),
        unit: "°C",
        change: "+2°C", // Placeholder
        trend: "up", // Placeholder
        status: "normal", // Placeholder
        icon: ThermometerSun,
        color: "#f59e0b",
        bgGradient: "from-amber-50 via-amber-100 to-orange-50",
        borderColor: "border-amber-300",
        glowColor: "shadow-amber-500/50",
      },
      {
        title: "Humidity",
        value: Math.round(totalHumidity).toLocaleString(), // Still a placeholder
        unit: "%",
        change: "-5%", // Placeholder
        trend: "down", // Placeholder
        status: "good", // Placeholder
        icon: Droplets,
        color: "#0891b2",
        bgGradient: "from-cyan-50 via-cyan-100 to-teal-50",
        borderColor: "border-cyan-300",
        glowColor: "shadow-cyan-500/50",
      },
    ];

    const realTimeAlerts = sensors.filter(s => s.value > 1200 || s.aqi > 150).map(s => ({
      zone: locationToZoneMap[s.location] || s.location,
      message: `High CO2 (${s.value} ppm) or AQI (${s.aqi}) detected`,
      severity: s.value > 1200 ? "critical" : "warning",
      time: "Just now",
      icon: AlertCircle,
    }));

    // Generate trend data based on current CO2 levels (simplified)
    const currentCo2 = Math.round(totalCo2 / realTimeZones.length);
    const realTimeTrendData = defaultTrendData.map(item => {
      if (item.time === "Now") {
        return { ...item, co2: currentCo2 };
      }
      return { ...item, co2: generateRandomVariance(currentCo2, 100) }; // Simulate some variation
    });

    return {
      cityStats: realTimeCityStats,
      zones: realTimeZones,
      realtimeAlerts: realTimeAlerts,
      trendData: realTimeTrendData,
    };

  } catch (error) {
    console.error("Failed to fetch or transform real-time dashboard data:", error);
    // Fallback to default demo data on error
    return {
      cityStats: defaultCityStats,
      zones: defaultZones,
      realtimeAlerts: defaultRealtimeAlerts,
      trendData: defaultTrendData,
    };
  }
};