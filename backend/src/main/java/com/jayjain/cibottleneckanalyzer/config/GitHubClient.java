package com.jayjain.cibottleneckanalyzer.config;

import com.jayjain.cibottleneckanalyzer.dto.github.GitHubJobsResponse;
import com.jayjain.cibottleneckanalyzer.dto.github.GitHubWorkflowRunsResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
@Slf4j
public class GitHubClient {

    private final RestClient restClient;

    @Value("${github.token}")
    private String token;

    public GitHubWorkflowRunsResponse getWorkflowRuns(
            String owner,
            String repo
    ) {

        log.info(
                "https://api.github.com/repos/"
                        + owner
                        + "/"
                        + repo
                        + "/actions/runs"
        );

        return restClient.get()
                .uri(uriBuilder ->
                        uriBuilder
                                .scheme("https")
                                .host("api.github.com")
                                .path("/repos/{owner}/{repo}/actions/runs")
                                .queryParam("per_page", 100)
                                .queryParam("status", "completed")
                                .build(owner, repo))
                .header("Authorization", "Bearer " + token)
                .header("Accept", "application/vnd.github+json")
                .retrieve()
                .body(GitHubWorkflowRunsResponse.class);
    }

    public GitHubJobsResponse getJobs(
            String owner,
            String repo,
            Long runId
    ) {

        return restClient.get()
                .uri(
                        "https://api.github.com/repos/"
                                + owner
                                + "/"
                                + repo
                                + "/actions/runs/"
                                + runId
                                + "/jobs"
                )
                .header(
                        "Authorization",
                        "Bearer " + token
                )
                .header(
                        "Accept",
                        "application/vnd.github+json"
                )
                .retrieve()
                .body(GitHubJobsResponse.class);
    }

}