package com.jayjain.cibottleneckanalyzer.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class PipelineRunDetailsResponse {

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

    private List<PipelineStepResponse> steps;
}