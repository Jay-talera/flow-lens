import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// ─── API ──────────────────────────────────
import {
  getDashboardSummary,
  getSuccessTrend,
  getDurationTrend,
  getBottlenecks,
  getWorkflowDistribution,
  getBranchActivity,
  getRecentRuns,
} from "../api/dashboardApi";

// ─── Components ───────────────────────────
import KpiCard from "../components/dashboard/KpiCard";
import SuccessTrendChart from "../components/dashboard/SuccessTrendChart";
import DurationTrendChart from "../components/dashboard/DurationTrendChart";
import BottleneckChart from "../components/dashboard/BottleneckChart";
import WorkflowPieChart from "../components/dashboard/WorkflowPieChart";
import BranchActivityChart from "../components/dashboard/BranchActivityChart";
import RecentRunsTable from "../components/dashboard/RecentRunsTable";

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const repoId = searchParams.get("repoId");

  // ─── Queries ────────────────────────────
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["dashboard-summary", repoId],
    queryFn: () => getDashboardSummary(repoId),
    enabled: !!repoId
  });

  const {
    data: successTrend = []
  } = useQuery({
    queryKey: ["success-trend", repoId],
    queryFn: () => getSuccessTrend(repoId),
    enabled: !!repoId
  });

  const {
    data: durationTrend = []
  } = useQuery({
    queryKey: ["duration-trend", repoId],
    queryFn: () => getDurationTrend(repoId),
    enabled: !!repoId
  });

  const {
    data: bottlenecks = []
  } = useQuery({
    queryKey: ["bottlenecks", repoId],
    queryFn: () => getBottlenecks(repoId),
    enabled: !!repoId
  });

  const {
    data: workflowDistribution = []
  } = useQuery({
    queryKey: ["workflow-distribution", repoId],
    queryFn: () => getWorkflowDistribution(repoId),
    enabled: !!repoId
  });

  const {
    data: branchActivity = []
  } = useQuery({
    queryKey: ["branch-activity", repoId],
    queryFn: () => getBranchActivity(repoId),
    enabled: !!repoId
  });

  const {
    data: recentRuns = []
  } = useQuery({
    queryKey: ["recent-runs", repoId],
    queryFn: () => getRecentRuns(repoId),
    enabled: !!repoId
  });

  // ─── No repo selected ───────────────────
  if (!repoId) {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-gray-400">
          <p className="text-xl font-semibold">No repository selected</p>
          <p className="text-sm mt-2">Please select a repository to view the dashboard</p>
        </div>
    );
  }

  // ─── Loading ─────────────────────────────
  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p>Loading dashboard...</p>
          </div>
        </div>
    );
  }

  // ─── Error ───────────────────────────────
  if (isError) {
    return (
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-3 text-red-400">
            <p className="text-xl font-semibold">Failed to load dashboard</p>
            <p className="text-sm">Please try again later</p>
          </div>
        </div>
    );
  }

  // ─── Dashboard ───────────────────────────
  return (
      <div className="space-y-12">

        {/* ── SECTION 1: Top of Dashboard (Title & KPI Cards) ── */}
        <section id="dashboard-top" className="scroll-mt-20">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <KpiCard title="Total Runs" value={data.totalRuns} />
            <KpiCard title="Success Rate" value={`${data.successRate.toFixed(2)}%`} />
            <KpiCard title="Failed Runs" value={data.failedRuns} />
            <KpiCard title="Avg Duration" value={`${Math.round(data.averageDurationMs / 1000)}s`} />
            <KpiCard title="Top Bottleneck" value={data.slowestStep} />
          </div>
        </section>

        {/* ── SECTION 2: Success & Duration Performance Trends ── */}
        <section id="trends-section" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SuccessTrendChart data={successTrend} />
            <DurationTrendChart data={durationTrend} />
          </div>
        </section>

        {/* ── SECTION 3: System Bottlenecks & Workflow Pie Chart ── */}
        <section id="bottlenecks-section" className="scroll-mt-20">
          <div>
            <BottleneckChart data={bottlenecks} />
          </div>
        </section>
        <section id="workflow-section" className="scroll-mt-20">
          <div>
            <WorkflowPieChart data={workflowDistribution} />
          </div>
        </section>

        {/* ── SECTION 4: Branch Activity Charts ── */}
        <section id="branch-activity-section" className="scroll-mt-20">
          <div>
            <BranchActivityChart data={branchActivity} />
          </div>
        </section>

        {/* ── SECTION 5: Recent Actions Run Table ── */}
        <section id="recent-runs-section" className="scroll-mt-20">
          <div>
            <RecentRunsTable data={recentRuns} />
          </div>
        </section>

      </div>
  );
}