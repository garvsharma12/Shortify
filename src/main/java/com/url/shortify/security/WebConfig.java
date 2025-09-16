package com.url.shortify.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // New: allow comma-separated origins via FRONTEND_ALLOWED_ORIGINS
    @Value("${frontend.allowed-origins:}")
    private String allowedOriginsProp;

    // Backward-compat: single origin via FRONTEND_URL
    @Value("${frontend.url:}")
    private String frontEndUrl;

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        List<String> origins = new ArrayList<>();
        if (allowedOriginsProp != null && !allowedOriginsProp.isBlank()) {
            origins.addAll(Arrays.stream(allowedOriginsProp.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .toList());
        } else if (frontEndUrl != null && !frontEndUrl.isBlank()) {
            origins.add(frontEndUrl.trim());
        }

        var reg = registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization", "Content-Type");

        if (origins.isEmpty() || origins.contains("*")) {
            // Fallback: allow any origin pattern without credentials
            reg.allowedOriginPatterns("*")
               .allowCredentials(false);
        } else {
            reg.allowedOrigins(origins.toArray(String[]::new))
               .allowCredentials(true);
        }
    }

    // Provide a CorsConfigurationSource so Spring Security's CORS uses the same rules
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        List<String> origins = new ArrayList<>();
        if (allowedOriginsProp != null && !allowedOriginsProp.isBlank()) {
            origins.addAll(Arrays.stream(allowedOriginsProp.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .toList());
        } else if (frontEndUrl != null && !frontEndUrl.isBlank()) {
            origins.add(frontEndUrl.trim());
        }

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));

        if (origins.isEmpty() || origins.contains("*")) {
            config.setAllowedOriginPatterns(List.of("*"));
            config.setAllowCredentials(false);
        } else {
            config.setAllowedOrigins(origins);
            config.setAllowCredentials(true);
        }

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
