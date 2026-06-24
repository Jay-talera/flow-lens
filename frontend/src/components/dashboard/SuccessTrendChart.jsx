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

export default function SuccessTrendChart({
  data
}) {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Success vs Failure Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="successfulRuns"
          />

          <Line
            type="monotone"
            dataKey="failedRuns"
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}