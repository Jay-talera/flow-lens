package com.jayjain.cibottleneckanalyzer.dto.dashboard;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RecentRunResponse {

    private Long runId;

    private String workflowName;

    private String branch;

    private String conclusion;

    private Long durationMs;

    private LocalDateTime startTime;
}