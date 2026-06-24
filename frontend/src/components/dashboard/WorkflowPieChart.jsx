import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function WorkflowPieChart({
  data
}) {

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Workflow Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="count"
            nameKey="workflowName"
            outerRadius={130}
            label
          />

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}