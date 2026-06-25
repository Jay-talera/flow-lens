import { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

// Smart Formatter: Converts ms to a readable format (ms, seconds, or minutes)
const formatDuration = (ms) => {
    if (ms === undefined || ms === null) return "";
    if (ms < 1000) {
        return `${ms} ms`;
    }
    const seconds = ms / 1000;
    if (seconds < 60) {
        return `${seconds.toFixed(1)}s`;
    }
    const minutes = seconds / 60;
    return `${minutes.toFixed(1)} min`;
};

// Detailed Formatter for hover tooltips
const formatDetailedDuration = (ms) => {
    if (ms === undefined || ms === null) return "";
    if (ms < 1000) return `${ms} ms`;

    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;

    if (mins > 0) {
        return `${mins}m ${secs}s`;
    }
    return `${totalSecs}s`;
};

export default function DurationTrendChart({ data }) {
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
                <p className="text-gray-400 text-sm">No average duration data available</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow min-w-0 w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Average Duration Trend
            </h2>

            <ResponsiveContainer width="99%" height={350}>
                <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="durationColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>

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
                        tickFormatter={formatDuration} // Uses smart formatter (e.g. 11.4 min)
                    />

                    <Tooltip
                        formatter={(value) => [formatDetailedDuration(value), "Average Duration"]}
                    />

                    <Area
                        type="monotone"
                        dataKey="averageDurationMs"
                        stroke="#6366f1"
                        fillOpacity={1}
                        fill="url(#durationColor)"
                        strokeWidth={2}
                        dot={{ r: 6 }} // Guarantees the single point is rendered as a clean dot
                        activeDot={{ r: 8 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}