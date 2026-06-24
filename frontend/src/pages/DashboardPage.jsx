import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getDashboardSummary }
  from "../api/dashboardApi";

import KpiCard
  from "../components/dashboard/KpiCard";

import SuccessTrendChart
  from "../components/dashboard/SuccessTrendChart";

import DurationTrendChart
  from "../components/dashboard/DurationTrendChart";

import {
  getSuccessTrend,
  getDurationTrend
}
  from "../api/dashboardApi";

import {
  getBottlenecks
}
  from "../api/dashboardApi";

import BottleneckChart
  from "../components/dashboard/BottleneckChart";

import WorkflowPieChart
  from "../components/dashboard/WorkflowPieChart";

import {
  getWorkflowDistribution
}
  from "../api/dashboardApi";

import BranchActivityChart
  from "../components/dashboard/BranchActivityChart";

import {
  getBranchActivity
}
  from "../api/dashboardApi";

import RecentRunsTable
  from "../components/dashboard/RecentRunsTable";

import {
  getRecentRuns
}
  from "../api/dashboardApi";

export default function DashboardPage() {

  const [searchParams] =
    useSearchParams();

  const repoId =
    searchParams.get("repoId");

  const {
    data,
    isLoading,
    isError
  } = useQuery({

    queryKey: [
      "dashboard-summary",
      repoId
    ],

    queryFn: () =>
      getDashboardSummary(repoId),

    enabled: !!repoId
  });

  const {
    data: successTrend = []
  } = useQuery({
    queryKey: [
      "success-trend",
      repoId
    ],
    queryFn: () =>
      getSuccessTrend(repoId),
    enabled: !!repoId
  });

  const {
    data: durationTrend = []
  } = useQuery({
    queryKey: [
      "duration-trend",
      repoId
    ],
    queryFn: () =>
      getDurationTrend(repoId),
    enabled: !!repoId
  });

  const {
    data: bottlenecks = []
  } = useQuery({

    queryKey: [
      "bottlenecks",
      repoId
    ],

    queryFn: () =>
      getBottlenecks(repoId),

    enabled: !!repoId
  });

  const {
    data: workflowDistribution = []
  } = useQuery({

    queryKey: [
      "workflow-distribution",
      repoId
    ],

    queryFn: () =>
      getWorkflowDistribution(repoId),

    enabled: !!repoId
  });


  const {
    data: branchActivity = []
  } = useQuery({

    queryKey: [
      "branch-activity",
      repoId
    ],

    queryFn: () =>
      getBranchActivity(repoId),

    enabled: !!repoId
  });

  const {
    data: recentRuns = []
  } = useQuery({

    queryKey: [
      "recent-runs",
      repoId
    ],

    queryFn: () =>
      getRecentRuns(repoId),

    enabled: !!repoId
  });


  if (isLoading) {
    return <p>Loading dashboard...</p>;
  }

  if (isError) {
    return <p>Failed to load dashboard.</p>;
  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-5
          gap-6
      ">

        <KpiCard
          title="Total Runs"
          value={data.totalRuns}
        />

        <KpiCard
          title="Success Rate"
          value={
            `${data.successRate.toFixed(2)}%`
          }
        />

        <KpiCard
          title="Failed Runs"
          value={data.failedRuns}
        />

        <KpiCard
          title="Avg Duration"
          value={
            `${Math.round(
              data.averageDurationMs / 1000
            )}s`
          }
        />

        <KpiCard
          title="Top Bottleneck"
          value={data.slowestStep}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <SuccessTrendChart
          data={successTrend}
        />

        <DurationTrendChart
          data={durationTrend}
        />

      </div>

      <div className="mt-8">

        <BottleneckChart
          data={bottlenecks}
        />

      </div>

      <div className="mt-8">

        <WorkflowPieChart
          data={workflowDistribution}
        />

      </div>

      <div className="mt-8">

        <BranchActivityChart
          data={branchActivity}
        />

      </div>

      <div className="mt-8">

        <RecentRunsTable
          data={recentRuns}
        />

      </div>

    </div>


  );
}