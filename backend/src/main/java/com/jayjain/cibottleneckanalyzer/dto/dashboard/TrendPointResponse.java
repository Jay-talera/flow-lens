package com.jayjain.cibottleneckanalyzer.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrendPointResponse {

    private String date;

    private long success;

    private long failed;
}