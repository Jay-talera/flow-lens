package com.jayjain.cibottleneckanalyzer.exception;

import com.jayjain.cibottleneckanalyzer.dto.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(PipelineNotFoundException.class)
    public ResponseEntity<ErrorResponse>
    handlePipelineNotFound(
            PipelineNotFoundException ex,
            HttpServletRequest request) {

        log.warn(ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(
                        ErrorResponse.builder()
                                .timestamp(
                                        Instant.now().toString())
                                .status(404)
                                .error("Not Found")
                                .message(ex.getMessage())
                                .path(
                                        request.getRequestURI())
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>
    handleGeneric(
            Exception ex,
            HttpServletRequest request) {

        log.error(
                "Unexpected error",
                ex);

        return ResponseEntity.status(
                        HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ErrorResponse.builder()
                                .timestamp(
                                        Instant.now().toString())
                                .status(500)
                                .error(
                                        "Internal Server Error")
                                .message(
                                        ex.getMessage())
                                .path(
                                        request.getRequestURI())
                                .build()
                );
    }
}