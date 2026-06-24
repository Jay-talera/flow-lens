package com.jayjain.cibottleneckanalyzer.dto.response;

import lombok.Builder;

@Builder
public record RepositoryImportResponse(
        Long repositoryId,
        String repositoryName,
        int workflowRunsImported,
        int pipelineStepsImported,
        long successfulRuns,
        long failedRuns,
        double successRate,
        long totalDurationMs,
        long averageDurationMs,
        String message
) {
}