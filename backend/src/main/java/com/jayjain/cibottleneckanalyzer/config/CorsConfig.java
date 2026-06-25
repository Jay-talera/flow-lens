package com.jayjain.cibottleneckanalyzer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/actuator/**")
                        .allowedOrigins(
                                "http://localhost:5173",
                                "http://localhost:3000"
                        )
                        .allowedMethods("GET", "OPTIONS") // Only GET & OPTIONS needed for status polling
                        .allowedHeaders("*")
                        .allowCredentials(true);

                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:5173",
                                "http://localhost:3000",
                                "https://flow-lens-jay-jain.vercel.app"
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}