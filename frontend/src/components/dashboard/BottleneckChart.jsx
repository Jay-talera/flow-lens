import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function BottleneckChart({
    data
}) {

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold mb-4">
                Top Bottlenecks
            </h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <BarChart
                    data={data}
                    layout="vertical"
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                    />

                    <YAxis
                        type="category"
                        dataKey="stepName"
                        width={180}
                    />

                    <Tooltip
                        formatter={(value) =>
                            `${Math.round(value / 1000)} sec`
                        }
                    />

                    <Bar
                        dataKey="averageDurationMs"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}