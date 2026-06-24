package com.jayjain.cibottleneckanalyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CiBottleneckAnalyzerApplication {

    public static void main(String[] args) {
        // Set timezone to a name PostgreSQL recognizes
        System.setProperty("user.timezone", "Asia/Kolkata");
        SpringApplication.run(CiBottleneckAnalyzerApplication.class, args);
    }

}
