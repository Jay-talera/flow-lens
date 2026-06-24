package com.jayjain.cibottleneckanalyzer.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PipelineRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long externalRunId;

    private String workflowName;

    private String commitId;

    private String branch;

    private String status;

    private String conclusion;

    private Long durationMs;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @ManyToOne
    private RepositoryEntity repository;
}