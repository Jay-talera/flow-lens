package com.jayjain.cibottleneckanalyzer.config;

import com.jayjain.cibottleneckanalyzer.dto.github.GitHubJobsResponse;
import com.jayjain.cibottleneckanalyzer.dto.github.GitHubWorkflowRunsResponse;
import com.jayjain.cibottleneckanalyzer.dto.github.WorkflowRunDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class GitHubClient {

    private final RestClient restClient;

    @Value("${github.token}")
    private String token;

    /**
     * Fetches up to 10 completed workflow runs per day for the last 10 days
     * to guarantee historical trends on frontend charts.
     */
    public GitHubWorkflowRunsResponse getWorkflowRuns(
            String owner,
            String repo
    ) {
        log.info("Fetching top 10 pipelines per day for the past 10 days for repo: {}/{}", owner, repo);

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // 1. Prepare asynchronous tasks for each of the past 10 days
        List<CompletableFuture<GitHubWorkflowRunsResponse>> futures = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            final String dateStr = today.minusDays(i).format(formatter);
            futures.add(CompletableFuture.supplyAsync(() -> fetchRunsForDate(owner, repo, dateStr)));
        }

        // 2. Wait for all 10 parallel API requests to complete
        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        // 3. Merge individual responses into a single aggregated list (Fully Type-Safe)
        List<WorkflowRunDto> combinedRuns = new ArrayList<>();

        for (CompletableFuture<GitHubWorkflowRunsResponse> future : futures) {
            try {
                GitHubWorkflowRunsResponse dailyResponse = future.get();
                if (dailyResponse != null && dailyResponse.getWorkflowRuns() != null) {
                    combinedRuns.addAll(dailyResponse.getWorkflowRuns());
                }
            } catch (Exception e) {
                log.error("Failed to gather workflow run future result", e);
            }
        }

        // 4. Populate and return combined DTO response
        GitHubWorkflowRunsResponse combinedResponse = new GitHubWorkflowRunsResponse();
        combinedResponse.setWorkflowRuns(combinedRuns);

        return combinedResponse;
    }

    /**
     * Helper method to fetch up to 10 runs for a specific calendar date.
     */
    private GitHubWorkflowRunsResponse fetchRunsForDate(String owner, String repo, String dateStr) {
        try {
            log.debug("Calling GitHub API for date: {}", dateStr);
            return restClient.get()
                    .uri(uriBuilder ->
                            uriBuilder
                                    .scheme("https")
                                    .host("api.github.com")
                                    .path("/repos/{owner}/{repo}/actions/runs")
                                    .queryParam("per_page", 10) // Limit to top 10
                                    .queryParam("status", "completed")
                                    .queryParam("created", dateStr) // Filter to this specific day
                                    .build(owner, repo))
                    .header("Authorization", "Bearer " + token)
                    .header("Accept", "application/vnd.github+json")
                    .retrieve()
                    .body(GitHubWorkflowRunsResponse.class);
        } catch (Exception e) {
            log.error("GitHub API request failed for date: {}", dateStr, e);
            return null;
        }
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