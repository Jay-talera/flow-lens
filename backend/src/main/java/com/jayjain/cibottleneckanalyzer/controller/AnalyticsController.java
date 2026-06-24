package com.jayjain.cibottleneckanalyzer.controller;


import com.jayjain.cibottleneckanalyzer.dto.BottleneckDto;
import com.jayjain.cibottleneckanalyzer.dto.response.RepositoryAnalyticsResponse;
import com.jayjain.cibottleneckanalyzer.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/{repositoryId}")
    public RepositoryAnalyticsResponse analytics(
            @PathVariable Long repositoryId) {

        return analyticsService.analytics(
                repositoryId);
    }
    @GetMapping("/top-bottlenecks")
    public List<BottleneckDto> topBottlenecks() {
        return analyticsService.topBottlenecks();
    }
}