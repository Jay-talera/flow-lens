package com.jayjain.cibottleneckanalyzer.controller;

import com.jayjain.cibottleneckanalyzer.dto.BottleneckDto;
import com.jayjain.cibottleneckanalyzer.dto.dashboard.*;
import com.jayjain.cibottleneckanalyzer.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/{id}/summary")
    public DashboardSummaryResponse summary(
            @PathVariable Long id) {
        return dashboardService.summary(id);
    }

    @GetMapping("/{id}/success-trend")
    public List<TrendPointResponse> successTrend(
            @PathVariable Long id) {
        return dashboardService.successTrend(id);
    }

    @GetMapping("/{id}/duration-trend")
    public List<DurationTrendResponse> durationTrend(
            @PathVariable Long id) {
        return dashboardService.durationTrend(id);
    }

    @GetMapping("/{id}/bottlenecks")
    public List<BottleneckDto> bottlenecks(
            @PathVariable Long id) {
        return dashboardService.bottlenecks(id);
    }

    @GetMapping("/{id}/workflow-distribution")
    public List<WorkflowDistributionResponse>
    workflowDistribution(
            @PathVariable Long id) {

        return dashboardService
                .workflowDistribution(id);
    }

    @GetMapping("/{id}/branch-activity")
    public List<BranchActivityResponse>
    branchActivity(
            @PathVariable Long id) {

        return dashboardService
                .branchActivity(id);
    }

    @GetMapping("/{id}/recent-runs")
    public List<RecentRunResponse>
    recentRuns(
            @PathVariable Long id) {

        return dashboardService
                .recentRuns(id);
    }
}