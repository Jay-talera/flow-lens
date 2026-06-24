package com.jayjain.cibottleneckanalyzer.exception;

public class PipelineNotFoundException
        extends RuntimeException {

    public PipelineNotFoundException(Long id) {
        super("Pipeline run not found with id: " + id);
    }
}