package com.jayjain.cibottleneckanalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BottleneckDto {

    private String stepName;

    private Double averageDurationMs;

    private Long executions;
}