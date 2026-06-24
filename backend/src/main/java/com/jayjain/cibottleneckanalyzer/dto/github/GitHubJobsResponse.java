package com.jayjain.cibottleneckanalyzer.dto.github;

import lombok.Data;

import java.util.List;

@Data
public class GitHubJobsResponse {

    private List<JobDto> jobs;
}
