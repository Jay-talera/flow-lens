package com.jayjain.cibottleneckanalyzer.dto.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class GitHubWorkflowRunsResponse {

    @JsonProperty("workflow_runs")
    private List<WorkflowRunDto> workflowRuns;
}