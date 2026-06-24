import { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

// Truncates branch names slightly so they don't take up excessive vertical space
const formatBranchLabel = (label) => {
    if (!label) return "";
    return label.length > 18 ? `${label.slice(0, 15)}...` : label;
};

export default function BranchActivityChart({ data }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div
                className="rounded-xl h-[496px] flex items-center justify-center border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            >
                <p style={{ color: "var(--text)" }}>Loading activity chart...</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div
                className="rounded-xl h-[496px] flex items-center justify-center border"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            >
                <p className="text-sm" style={{ color: "var(--text)" }}>No branch activity data available</p>
            </div>
        );
    }

    // 1. Dynamic Width Calculation:
    // If we have more than 8 branches, allocate 55px per bar so they never squeeze.
    const isScrollable = data.length > 8;
    const innerChartWidth = isScrollable ? `${data.length * 55}px` : "100%";

    return (
        <div
            className="rounded-xl p-6 min-w-0 w-full border transition-all duration-200 text-left"
            style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow)"
            }}
        >
            {/* Self-contained custom scrollbar styles that adapt to light/dark themes */}
            <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 99px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: var(--text);
        }
      `}</style>

            <h2
                className="text-lg font-semibold mb-4 text-left"
                style={{ color: "var(--text-h)" }}
            >
                Branch Activity
            </h2>

            {/*
        2. Scrollable Container:
        Automatically allows horizontal swiping/scrolling if there are many branches.
      */}
            <div className="w-full overflow-x-auto scrollbar-custom pb-2">

                {/*
          3. Sizing Anchor:
          Forces the chart to a comfortable width if scrollable, but remains 100% if not.
        */}
                <div style={{ width: innerChartWidth, minWidth: "100%", height: "380px" }}>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

                            <XAxis
                                dataKey="branch"
                                stroke="var(--text)"
                                fontSize={11}
                                tickLine={false}
                                tickFormatter={formatBranchLabel}
                                interval={0} // Guarantees every single label is displayed
                                tick={{ angle: -35, textAnchor: "end", dy: 5 }} // Rotates slightly for reading ease
                            />

                            <YAxis
                                stroke="var(--text)"
                                fontSize={12}
                                tickLine={false}
                                width={40}
                            />

                            <Tooltip
                                cursor={{ fill: "rgba(170, 59, 255, 0.04)" }}
                                contentStyle={{
                                    backgroundColor: "var(--bg)",
                                    borderColor: "var(--border)",
                                    color: "var(--text-h)",
                                    borderRadius: "8px"
                                }}
                            />

                            <Bar
                                dataKey="executions"
                                fill="var(--accent)"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={32} // Keeps bars elegantly proportioned
                            />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    );
}