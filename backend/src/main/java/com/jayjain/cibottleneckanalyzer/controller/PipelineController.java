package com.jayjain.cibottleneckanalyzer.controller;

import com.jayjain.cibottleneckanalyzer.dto.response.PipelineRunDetailsResponse;
import com.jayjain.cibottleneckanalyzer.service.PipelineQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pipelines")
@RequiredArgsConstructor
public class PipelineController {

    private final PipelineQueryService pipelineQueryService;

    @GetMapping("/run/{id}")
    public PipelineRunDetailsResponse getPipeline(
            @PathVariable Long id) {

        return pipelineQueryService
                .getPipeline(id);
    }
}