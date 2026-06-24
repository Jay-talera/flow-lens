package com.jayjain.cibottleneckanalyzer.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
public class PipelineStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private long durationMs;
    private String status;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @ManyToOne
    private PipelineRun pipelineRun;
}