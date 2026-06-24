package com.jayjain.cibottleneckanalyzer.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PipelineRunResponse {

    private Long id;

    private Long externalRunId;

    private String workflowName;

    private String commitId;

    private String branch;

    private String status;

    private String conclusion;

    private Long durationMs;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
}