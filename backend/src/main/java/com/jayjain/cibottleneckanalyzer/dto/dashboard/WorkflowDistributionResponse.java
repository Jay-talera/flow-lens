package com.jayjain.cibottleneckanalyzer.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WorkflowDistributionResponse {

    private String workflowName;

    private Long executions;
}