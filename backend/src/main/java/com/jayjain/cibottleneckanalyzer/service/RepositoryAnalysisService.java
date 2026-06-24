package com.jayjain.cibottleneckanalyzer.service;

import com.jayjain.cibottleneckanalyzer.config.GitHubClient;
import com.jayjain.cibottleneckanalyzer.dto.github.GitHubWorkflowRunsResponse;
import com.jayjain.cibottleneckanalyzer.dto.response.RepositoryImportResponse;
import com.jayjain.cibottleneckanalyzer.util.GitHubUrlParser;
import com.jayjain.cibottleneckanalyzer.util.RepositoryInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RepositoryAnalysisService {

    private final GitHubClient gitHubClient;
    private final WorkflowImportService workflowImportService;

    public RepositoryImportResponse analyze(String repositoryUrl) {

        RepositoryInfo repositoryInfo =
                GitHubUrlParser.parse(repositoryUrl);

        GitHubWorkflowRunsResponse response =
                gitHubClient.getWorkflowRuns(
                        repositoryInfo.owner(),
                        repositoryInfo.repo()
                );

        log.info(String.valueOf(Optional.ofNullable(response.getWorkflowRuns())
                .map(List::size)
                .orElse(0)));

        return workflowImportService.importWorkflowRuns(
                repositoryInfo,
                repositoryUrl,
                response
        );

    }

}