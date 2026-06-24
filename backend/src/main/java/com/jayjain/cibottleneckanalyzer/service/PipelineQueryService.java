package com.jayjain.cibottleneckanalyzer.service;

import com.jayjain.cibottleneckanalyzer.dto.response.PipelineRunDetailsResponse;
import com.jayjain.cibottleneckanalyzer.dto.response.PipelineStepResponse;
import com.jayjain.cibottleneckanalyzer.entity.PipelineRun;
import com.jayjain.cibottleneckanalyzer.exception.PipelineNotFoundException;
import com.jayjain.cibottleneckanalyzer.mapper.PipelineMapper;
import com.jayjain.cibottleneckanalyzer.repository.PipelineRunRepo;
import com.jayjain.cibottleneckanalyzer.repository.PipelineStepRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PipelineQueryService {

    private final PipelineRunRepo pipelineRunRepo;
    private final PipelineStepRepo pipelineStepRepo;

    public PipelineRunDetailsResponse
    getPipeline(Long pipelineId) {

        log.info(
                "Fetching pipeline details for id={}",
                pipelineId);

        PipelineRun run =
                pipelineRunRepo.findById(
                                pipelineId)
                        .orElseThrow(() ->
                                new PipelineNotFoundException(
                                        pipelineId));

        List<PipelineStepResponse> steps =
                pipelineStepRepo
                        .findByPipelineRun(run)
                        .stream()
                        .map(
                                PipelineMapper::toStepResponse)
                        .toList();

        return PipelineMapper
                .toDetailsResponse(
                        run,
                        steps);
    }
}