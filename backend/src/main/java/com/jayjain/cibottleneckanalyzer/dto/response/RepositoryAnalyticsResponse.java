package com.jayjain.cibottleneckanalyzer.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RepositoryAnalyticsResponse {

    private long totalRuns;

    private long successfulRuns;

    private double successRate;

    private long averageDurationMs;

    private long failedRuns;
}