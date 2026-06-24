package com.jayjain.cibottleneckanalyzer.dto.dashboard;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DashboardSummaryResponse {

    private long totalRuns;

    private long successfulRuns;

    private long failedRuns;

    private double successRate;

    private long averageDurationMs;

    private String slowestStep;

    private Double slowestStepAvgDuration;
}