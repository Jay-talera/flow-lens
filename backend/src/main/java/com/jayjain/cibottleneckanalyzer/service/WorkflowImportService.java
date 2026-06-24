package com.jayjain.cibottleneckanalyzer.service;

import com.jayjain.cibottleneckanalyzer.config.GitHubClient;
import com.jayjain.cibottleneckanalyzer.dto.github.GitHubJobsResponse;
import com.jayjain.cibottleneckanalyzer.dto.github.GitHubWorkflowRunsResponse;
import com.jayjain.cibottleneckanalyzer.dto.github.JobDto;
import com.jayjain.cibottleneckanalyzer.dto.github.WorkflowRunDto;
import com.jayjain.cibottleneckanalyzer.dto.response.RepositoryImportResponse;
import com.jayjain.cibottleneckanalyzer.entity.PipelineRun;
import com.jayjain.cibottleneckanalyzer.entity.PipelineStep;
import com.jayjain.cibottleneckanalyzer.entity.RepositoryEntity;
import com.jayjain.cibottleneckanalyzer.repository.PipelineRunRepo;
import com.jayjain.cibottleneckanalyzer.repository.PipelineStepRepo;
import com.jayjain.cibottleneckanalyzer.repository.RepositoryRepo;
import com.jayjain.cibottleneckanalyzer.util.RepositoryInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class WorkflowImportService {

    private final RepositoryRepo repositoryRepo;
    private final PipelineRunRepo pipelineRunRepo;
    private final PipelineStepRepo pipelineStepRepo;
    private final GitHubClient gitHubClient;

    public RepositoryImportResponse importWorkflowRuns(
            RepositoryInfo repositoryInfo,
            String repositoryUrl,
            GitHubWorkflowRunsResponse response
    ) {

        RepositoryEntity repository =
                repositoryRepo.findByOwnerAndName(
                                repositoryInfo.owner(),
                                repositoryInfo.repo()
                        )
                        .orElseGet(() -> {

                            RepositoryEntity entity =
                                    new RepositoryEntity();

                            entity.setOwner(repositoryInfo.owner());
                            entity.setName(repositoryInfo.repo());
                            entity.setRepositoryUrl(repositoryUrl);
                            entity.setCiProvider("GITHUB_ACTIONS");

                            return repositoryRepo.save(entity);
                        });

        int importedRuns = 0;
        int importedSteps = 0;

        long successfulRuns = 0;
        long failedRuns = 0;

        long totalDurationMs = 0;

        for (WorkflowRunDto workflowRun :
                response.getWorkflowRuns()) {

            boolean exists =
                    pipelineRunRepo
                            .findByExternalRunId(
                                    workflowRun.getId())
                            .isPresent();

            if (exists) {
                continue;
            }

            importedRuns++;

            PipelineRun run = new PipelineRun();

            run.setExternalRunId(
                    workflowRun.getId());

            run.setWorkflowName(
                    workflowRun.getName());

            run.setBranch(
                    workflowRun.getHeadBranch());

            run.setCommitId(
                    workflowRun.getHeadSha());

            run.setStatus(
                    workflowRun.getStatus());

            run.setConclusion(
                    workflowRun.getConclusion());

            if ("success".equalsIgnoreCase(
                    workflowRun.getConclusion())) {

                successfulRuns++;
            }

            if ("failure".equalsIgnoreCase(
                    workflowRun.getConclusion())) {

                failedRuns++;
            }

            run.setStartTime(
                    workflowRun.getRunStartedAt());

            run.setEndTime(
                    workflowRun.getUpdatedAt());

            if (workflowRun.getRunStartedAt() != null
                    && workflowRun.getUpdatedAt() != null) {

                long duration =
                        Duration.between(
                                workflowRun.getRunStartedAt(),
                                workflowRun.getUpdatedAt()
                        ).toMillis();

                run.setDurationMs(Math.max(0, duration));

                totalDurationMs += duration;
            }

            run.setRepository(repository);

            pipelineRunRepo.save(run);

            GitHubJobsResponse jobsResponse =
                    gitHubClient.getJobs(
                            repositoryInfo.owner(),
                            repositoryInfo.repo(),
                            workflowRun.getId()
                    );

            importedSteps +=
                    savePipelineSteps(
                            run,
                            jobsResponse);
        }

        double successRate =
                importedRuns == 0
                        ? 0
                        : (successfulRuns * 100.0)
                          / importedRuns;

        long averageDurationMs =
                importedRuns == 0
                        ? 0
                        : totalDurationMs / importedRuns;

        log.info(
                """
                Import completed:
                repository={}
                runs={}
                steps={}
                successfulRuns={}
                failedRuns={}
                successRate={}%
                averageDurationMs={}
                """,
                repository.getName(),
                importedRuns,
                importedSteps,
                successfulRuns,
                failedRuns,
                successRate,
                averageDurationMs
        );

        return RepositoryImportResponse.builder()
                .repositoryId(
                        repository.getId())
                .repositoryName(
                        repository.getName())
                .workflowRunsImported(
                        importedRuns)
                .pipelineStepsImported(
                        importedSteps)
                .successfulRuns(
                        successfulRuns)
                .failedRuns(
                        failedRuns)
                .successRate(
                        successRate)
                .totalDurationMs(
                        totalDurationMs)
                .averageDurationMs(
                        averageDurationMs)
                .message(
                        "Analysis completed successfully")
                .build();
    }

    private int savePipelineSteps(
            PipelineRun run,
            GitHubJobsResponse jobsResponse) {

        if (jobsResponse == null
                || jobsResponse.getJobs() == null) {

            return 0;
        }

        int stepCount = 0;

        for (JobDto job :
                jobsResponse.getJobs()) {

            PipelineStep step =
                    new PipelineStep();

            step.setName(
                    job.getName());

            step.setStatus(
                    job.getConclusion() != null
                            ? job.getConclusion()
                            : job.getStatus());

            if (job.getStartedAt() != null) {
                step.setStartTime(
                        job.getStartedAt()
                                .toLocalDateTime());
            }

            if (job.getCompletedAt() != null) {
                step.setEndTime(
                        job.getCompletedAt()
                                .toLocalDateTime());
            }

            if (job.getStartedAt() != null
                    && job.getCompletedAt() != null) {

                step.setDurationMs(Math.max(0,
                        Duration.between(
                                        job.getStartedAt(),
                                        job.getCompletedAt())
                                .toMillis()));
            }

            step.setPipelineRun(run);

            pipelineStepRepo.save(step);

            stepCount++;
        }

        return stepCount;
    }
}