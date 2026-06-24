package com.jayjain.cibottleneckanalyzer.controller;

import com.jayjain.cibottleneckanalyzer.dto.request.AnalyzeRepositoryRequest;
import com.jayjain.cibottleneckanalyzer.dto.response.RepositoryImportResponse;
import com.jayjain.cibottleneckanalyzer.service.RepositoryAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/repositories")
@RequiredArgsConstructor
public class RepositoryController {

    private final RepositoryAnalysisService repositoryAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<RepositoryImportResponse> analyze(@RequestBody AnalyzeRepositoryRequest request) {

        RepositoryImportResponse response = repositoryAnalysisService.analyze(request.getRepositoryUrl());

        return ResponseEntity.accepted().body(response);
    }
}