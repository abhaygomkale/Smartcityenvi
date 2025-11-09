import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/card";

export const ZoneTrendsChart = ({ data }) => (
  <Card className="p-6">
    <h3 className="mb-4">Zone-wise CO₂ Trends</h3>
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="sitabuldi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="mihan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0891b2" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="seminary" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
        <Area type="monotone" dataKey="sitabuldi" stroke="#3b82f6" fillOpacity={1} fill="url(#sitabuldi)" />
        <Area type="monotone" dataKey="mihan" stroke="#0891b2" fillOpacity={1} fill="url(#mihan)" />
        <Area type="monotone" dataKey="seminary" stroke="#10b981" fillOpacity={1} fill="url(#seminary)" />
      </AreaChart>
    </ResponsiveContainer>
  </Card>
);