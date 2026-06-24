package com.jayjain.cibottleneckanalyzer.service;

import com.jayjain.cibottleneckanalyzer.dto.BottleneckDto;
import com.jayjain.cibottleneckanalyzer.dto.dashboard.*;
import com.jayjain.cibottleneckanalyzer.dto.response.RepositoryAnalyticsResponse;
import com.jayjain.cibottleneckanalyzer.repository.PipelineRunRepo;
import com.jayjain.cibottleneckanalyzer.repository.PipelineStepRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PipelineRunRepo pipelineRunRepo;
    private final PipelineStepRepo pipelineStepRepo;
    private final AnalyticsService analyticsService;

    public DashboardSummaryResponse summary(Long repoId) {

        RepositoryAnalyticsResponse analytics =
                analyticsService.analytics(repoId);

        Object[] slowestStep =
                pipelineStepRepo.topBottlenecks(repoId)
                        .stream()
                        .findFirst()
                        .orElse(null);

        return DashboardSummaryResponse.builder()
                .totalRuns(
                        analytics.getTotalRuns())
                .successfulRuns(
                        analytics.getSuccessfulRuns())
                .failedRuns(
                        analytics.getFailedRuns())
                .successRate(
                        analytics.getSuccessRate())
                .averageDurationMs(
                        analytics.getAverageDurationMs())
                .slowestStep(
                        slowestStep != null
                                ? (String) slowestStep[0]
                                : null)
                .slowestStepAvgDuration(
                        slowestStep != null
                                ? (Double) slowestStep[1]
                                : null)
                .build();
    }



    public List<TrendPointResponse>
    successTrend(Long repoId) {

        return pipelineRunRepo.successTrend(repoId)
                .stream()
                .map(row ->
                        new TrendPointResponse(
                                row[0].toString(),
                                ((Long) row[1]),
                                ((Long) row[2])
                        ))
                .toList();
    }

    public List<DurationTrendResponse>
    durationTrend(Long repoId) {

        return pipelineRunRepo.durationTrend(repoId)
                .stream()
                .map(row ->
                        new DurationTrendResponse(
                                row[0].toString(),
                                ((Double) row[1]).longValue()
                        ))
                .toList();
    }

    public List<BottleneckDto>
    bottlenecks(Long repoId) {

        return pipelineStepRepo.topBottlenecks(repoId)
                .stream()
                .map(row ->
                        new BottleneckDto(
                                (String) row[0],
                                (Double) row[1],
                                (Long) row[2]
                        ))
                .toList();
    }

    public List<WorkflowDistributionResponse>
    workflowDistribution(Long repoId) {

        return pipelineRunRepo
                .workflowDistribution(repoId)
                .stream()
                .map(row ->
                        new WorkflowDistributionResponse(
                                (String) row[0],
                                (Long) row[1]
                        ))
                .toList();
    }

    public List<BranchActivityResponse>
    branchActivity(Long repoId) {

        return pipelineRunRepo
                .branchActivity(repoId)
                .stream()
                .map(row ->
                        new BranchActivityResponse(
                                (String) row[0],
                                (Long) row[1]
                        ))
                .toList();
    }

    public List<RecentRunResponse>
    recentRuns(Long repoId) {

        return pipelineRunRepo
                .findTop20ByRepositoryIdOrderByStartTimeDesc(
                        repoId)
                .stream()
                .map(run ->
                        RecentRunResponse.builder()
                                .runId(run.getId())
                                .workflowName(
                                        run.getWorkflowName())
                                .branch(
                                        run.getBranch())
                                .conclusion(
                                        run.getConclusion())
                                .durationMs(
                                        run.getDurationMs())
                                .startTime(
                                        run.getStartTime())
                                .build()
                )
                .toList();
    }
}
