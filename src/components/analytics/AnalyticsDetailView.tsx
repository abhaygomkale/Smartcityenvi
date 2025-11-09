import {
  AreaChart, BarChart, PieChart, RadarChart, ComposedChart,
  Area, Bar, Pie, Cell, Radar, Line,
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { MapPin } from 'lucide-react';

const renderEmissionsView = (data) => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3 flex flex-col gap-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Emission Trends Analysis</h3>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.weekData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorSitabuldi" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                <linearGradient id="colorMihan" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/><stop offset="95%" stopColor="#0891b2" stopOpacity={0}/></linearGradient>
                <linearGradient id="colorSeminary" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sitabuldi" stroke="#3b82f6" fill="url(#colorSitabuldi)" />
              <Area type="monotone" dataKey="mihan" stroke="#0891b2" fill="url(#colorMihan)" />
              <Area type="monotone" dataKey="seminary" stroke="#10b981" fill="url(#colorSeminary)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
    <div className="lg:col-span-1 flex flex-col gap-6">
      <Card className="p-4">
        <h3 className="mb-3 text-md font-semibold">Source Distribution</h3>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.emissionSources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {data.emissionSources.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="mb-3 text-md font-semibold">Zone Performance</h3>
        <div className="space-y-2">
          {data.zoneComparison.map((zone) => (
            <div key={zone.zone}>
              <div className="flex justify-between text-xs mb-1"><span>{zone.zone}</span><span>{zone.efficiency}%</span></div>
              <Progress value={zone.efficiency} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const renderPredictionView = (data) => (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
    <div className="xl:col-span-2">
      <Card className="p-6">
        <h3 className="mb-4 text-xl font-semibold">24-Hour AI Prediction Model</h3>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" label={{ value: 'CO₂ (ppm)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Confidence (%)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
              <Line yAxisId="left" type="monotone" dataKey="predicted" stroke="#0891b2" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
              <Area yAxisId="right" type="monotone" dataKey="confidence" fill="#10b981" fillOpacity={0.2} stroke="none" name="Confidence" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Zone Performance Index</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Source Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.emissionSources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {data.emissionSources.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
    <div className="xl:col-span-1 space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">AI Generated Insights</h3>
        <div className="space-y-4 text-sm">
          <p className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            High confidence prediction for the next 8 hours with potential fluctuations in industrial zones.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            An emission peak is expected around 4:00 PM, primarily driven by increased traffic and industrial activity.
          </p>
          <p className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            Overall trend shows a 12% improvement compared to last week, indicating effectiveness of recent mitigation measures.
          </p>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Zone Performance</h3>
        <div className="space-y-4">
          {data.zoneComparison.map((zone) => (
            <div key={zone.zone} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{zone.zone}</span>
                </div>
                <Badge variant={zone.efficiency >= 75 ? "success" : zone.efficiency >= 50 ? "warning" : "destructive"}>
                  {zone.efficiency}%
                </Badge>
              </div>
              <Progress value={zone.efficiency} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const renderZonesView = (data) => (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3">
      <Card className="p-6 h-full">
        <h3 className="mb-4 text-lg font-semibold">Zone Performance Radar</h3>
        <div style={{ height: '450px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data.radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis />
              <Radar name="Current" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
    <div className="lg:col-span-1 flex flex-col gap-6">
      {data.zoneComparison.map((zone) => (
        <Card key={zone.zone} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-blue-500"/>{zone.zone}</h4>
            <Badge className={zone.current > zone.target ? "bg-amber-500" : "bg-green-500"}>
              {zone.current > zone.target ? "Alert" : "Good"}
            </Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div>Current: <span className="font-bold">{zone.current} ppm</span></div>
            <div>Target: <span className="font-bold">{zone.target} ppm</span></div>
            <Progress value={zone.efficiency} />
          </div>
        </Card>
      ))}
    </div>
  </div>
);

export const AnalyticsDetailView = ({ metric, data }) => {
  switch (metric) {
    case 'emissions':
      return renderEmissionsView(data);
    case 'prediction':
      return renderPredictionView(data);
    case 'zones':
      return renderZonesView(data);
    case 'reduction':
      return renderEmissionsView(data);
    case 'compliance':
      return renderZonesView(data);
    case 'sensors':
      return <div className="text-center p-8"><h2 className="text-xl">Sensor data is available on the main dashboard.</h2></div>;
    default:
      return <div className="text-center p-8"><h2 className="text-xl">Detailed view not available for this metric.</h2></div>;
  }
};