package com.jayjain.cibottleneckanalyzer.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DurationTrendResponse {

    private String date;

    private Long averageDurationMs;
}