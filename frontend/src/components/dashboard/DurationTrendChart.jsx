import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function DurationTrendChart({
  data
}) {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Average Duration Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="averageDurationMs"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}