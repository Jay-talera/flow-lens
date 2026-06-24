import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function BranchActivityChart({
  data
}) {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Branch Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="branch" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="runCount" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}