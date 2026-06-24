package com.jayjain.cibottleneckanalyzer.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PipelineStepResponse {

    private Long id;

    private String name;

    private Long durationMs;

    private String status;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
}