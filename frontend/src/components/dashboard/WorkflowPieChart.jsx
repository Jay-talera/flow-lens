import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell
} from "recharts";

const COLORS = [
    "#6366f1", "#8b5cf6", "#ec4899",
    "#f43f5e", "#f97316", "#eab308",
    "#22c55e", "#14b8a6", "#3b82f6",
    "#06b6d4", "#84cc16", "#a855f7",
];

// ─── Custom Tooltip ───────────────────────
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200
                      rounded-lg shadow-lg p-3">
                <p className="font-semibold text-gray-800 text-sm">
                    {payload[0].name}
                </p>
                <p className="text-gray-600 text-sm">
                    Executions:
                    <span className="font-bold text-indigo-600 ml-1">
            {payload[0].value}
          </span>
                </p>
                <p className="text-gray-600 text-sm">
                    Share:
                    <span className="font-bold text-indigo-600 ml-1">
            {(payload[0].payload.percent * 100).toFixed(1)}%
          </span>
                </p>
            </div>
        );
    }
    return null;
};

// ─── Custom Legend ────────────────────────
const CustomLegend = ({ data }) => {
    const total = data.reduce(
        (sum, item) => sum + item.executions, 0
    );

    return (
        <div className="grid grid-cols-2 gap-2 mt-4
                    max-h-48 overflow-y-auto">
            {data.map((entry, index) => (
                <div
                    key={entry.workflowName}
                    className="flex items-center gap-2
                     text-sm text-gray-600"
                >
                    {/* Color dot */}
                    <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                            backgroundColor: COLORS[index % COLORS.length]
                        }}
                    />
                    {/* Name + percentage */}
                    <span className="truncate" title={entry.workflowName}>
            {entry.workflowName}
          </span>
                    <span className="ml-auto font-medium flex-shrink-0">
            {((entry.executions / total) * 100).toFixed(0)}%
          </span>
                </div>
            ))}
        </div>
    );
};

export default function WorkflowPieChart({ data }) {

    // ─── Loading state ───────────────────────
    if (!data) {
        return (
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                    Workflow Distribution
                </h2>
                <div className="flex items-center justify-center
                        h-[300px] text-gray-400">
                    Loading...
                </div>
            </div>
        );
    }

    // ─── Empty state ─────────────────────────
    if (data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                    Workflow Distribution
                </h2>
                <div className="flex items-center justify-center
                        h-[300px] text-gray-400">
                    No workflow data available
                </div>
            </div>
        );
    }

    // ─── Calculate total ─────────────────────
    const total = data.reduce(
        (sum, item) => sum + item.executions, 0
    );

    // ─── Add percent to each item ────────────
    const dataWithPercent = data.map(item => ({
        ...item,
        percent: item.executions / total
    }));

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            {/* Title + Total */}
            <div className="flex items-center
                      justify-between mb-4">
                <h2 className="text-lg font-semibold">
                    Workflow Distribution
                </h2>
                <span className="text-sm text-gray-500">
          Total: {total} executions
        </span>
            </div>

            {/* Pie Chart - NO labels on slices */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>

                    <Pie
                        data={dataWithPercent}
                        dataKey="executions"
                        nameKey="workflowName"
                        outerRadius={120}
                        innerRadius={50}      // ← donut style looks cleaner
                        label={false}         // ← remove labels from slices
                        paddingAngle={2}      // ← small gap between slices
                    >
                        {dataWithPercent.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip content={<CustomTooltip />} />

                </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend below chart */}
            <CustomLegend data={data} />

        </div>
    );
}