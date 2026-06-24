package com.jayjain.cibottleneckanalyzer.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class WorkflowRunDto {

    private Long id;

    private String name;

    private String status;

    private String conclusion;

    @JsonProperty("head_branch")
    private String headBranch;

    @JsonProperty("head_sha")
    private String headSha;

    @JsonProperty("run_started_at")
    private LocalDateTime runStartedAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}