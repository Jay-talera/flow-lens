package com.jayjain.cibottleneckanalyzer.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class JobDto {

    private Long id;

    private String name;

    private String status;

    private String conclusion;

    @JsonProperty("started_at")
    private OffsetDateTime startedAt;

    @JsonProperty("completed_at")
    private OffsetDateTime completedAt;
}