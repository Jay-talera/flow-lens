package com.jayjain.cibottleneckanalyzer.service;

import com.jayjain.cibottleneckanalyzer.dto.BottleneckDto;
import com.jayjain.cibottleneckanalyzer.dto.response.RepositoryAnalyticsResponse;
import com.jayjain.cibottleneckanalyzer.entity.PipelineRun;
import com.jayjain.cibottleneckanalyzer.repository.PipelineRunRepo;
import com.jayjain.cibottleneckanalyzer.repository.PipelineStepRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final PipelineRunRepo pipelineRunRepo;
    private final PipelineStepRepo pipelineStepRepo;

    public RepositoryAnalyticsResponse analytics(
            Long repositoryId) {

        List<PipelineRun> runs =
                pipelineRunRepo.findByRepositoryId(
                        repositoryId);

        long totalRuns = runs.size();

        long successfulRuns =
                runs.stream()
                        .filter(run ->
                                "success".equalsIgnoreCase(
                                        run.getConclusion()))
                        .count();

        long failedRuns =
                runs.stream()
                        .filter(run ->
                                "failure".equalsIgnoreCase(
                                        run.getConclusion()))
                        .count();

        double successRate =
                totalRuns == 0
                        ? 0
                        : (successfulRuns * 100.0)
                          / totalRuns;

        long averageDuration =
                (long) runs.stream()
                        .filter(r ->
                                r.getDurationMs() != null)
                        .mapToLong(
                                PipelineRun::getDurationMs)
                        .average()
                        .orElse(0);

        return RepositoryAnalyticsResponse
                .builder()
                .totalRuns(totalRuns)
                .successfulRuns(successfulRuns)
                .failedRuns(failedRuns)
                .successRate(successRate)
                .averageDurationMs(averageDuration)
                .build();
    }
    public List<BottleneckDto> topBottlenecks() {

        return pipelineStepRepo.findTopBottlenecks()
                .stream()
                .map(row ->
                        new BottleneckDto(
                                (String) row[0],
                                ((Double) row[1]),
                                ((Long) row[2])
                        ))
                .toList();
    }
}