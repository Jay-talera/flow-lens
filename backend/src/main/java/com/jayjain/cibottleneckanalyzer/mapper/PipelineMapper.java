package com.jayjain.cibottleneckanalyzer.mapper;

import com.jayjain.cibottleneckanalyzer.dto.response.PipelineRunDetailsResponse;
import com.jayjain.cibottleneckanalyzer.dto.response.PipelineStepResponse;
import com.jayjain.cibottleneckanalyzer.entity.PipelineRun;
import com.jayjain.cibottleneckanalyzer.entity.PipelineStep;

import java.util.List;

public final class PipelineMapper {

    private PipelineMapper() {
    }

    public static PipelineStepResponse
    toStepResponse(
            PipelineStep step) {

        return PipelineStepResponse.builder()
                .id(step.getId())
                .name(step.getName())
                .durationMs(step.getDurationMs())
                .status(step.getStatus())
                .startTime(step.getStartTime())
                .endTime(step.getEndTime())
                .build();
    }

    public static PipelineRunDetailsResponse
    toDetailsResponse(
            PipelineRun run,
            List<PipelineStepResponse> steps) {

        return PipelineRunDetailsResponse.builder()
                .id(run.getId())
                .externalRunId(
                        run.getExternalRunId())
                .workflowName(
                        run.getWorkflowName())
                .commitId(
                        run.getCommitId())
                .branch(
                        run.getBranch())
                .status(
                        run.getStatus())
                .conclusion(
                        run.getConclusion())
                .durationMs(
                        run.getDurationMs())
                .startTime(
                        run.getStartTime())
                .endTime(
                        run.getEndTime())
                .steps(steps)
                .build();
    }
}