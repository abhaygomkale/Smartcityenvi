import { ComposedChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/card";

export const HourlyEmissionChart = ({ data }) => (
  <Card className="p-6">
    <h3 className="mb-4">Hourly Emission Pattern</h3>
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="traffic" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        <Bar dataKey="industrial" fill="#0891b2" radius={[8, 8, 0, 0]} />
        <Line type="monotone" dataKey="co2" stroke="#f59e0b" strokeWidth={3} />
      </ComposedChart>
    </ResponsiveContainer>
  </Card>
);