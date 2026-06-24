import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export default function SuccessTrendChart({ data }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <div className="bg-white p-6 rounded-xl shadow h-[446px] flex items-center justify-center">
          <p className="text-gray-400">Loading chart...</p>
        </div>
    );
  }

  if (!data || data.length === 0) {
    return (
        <div className="bg-white p-6 rounded-xl shadow h-[446px] flex items-center justify-center">
          <p className="text-gray-400 text-sm">No trend data available</p>
        </div>
    );
  }

  return (
      <div className="bg-white p-6 rounded-xl shadow min-w-0 w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Success vs Failure Trend
        </h2>

        <ResponsiveContainer width="99%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
            />

            <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
            />

            <Tooltip />
            <Legend verticalAlign="top" height={36} />


            <Line
                type="monotone"
                dataKey="success"
                name="Successes"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
            />


            <Line
                type="monotone"
                dataKey="failed"
                name="Failures"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
  );
}