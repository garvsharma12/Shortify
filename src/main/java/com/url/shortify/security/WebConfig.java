package com.url.shortify.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.core.Ordered;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${frontend.allowed-origins:}")
    private String allowedOriginsProp;

    @Value("${frontend.url:}")
    private String frontEndUrl;

    private static String normalizeOrigin(String origin) {
        if (origin == null) return null;
        String trimmed = origin.trim();
        while (trimmed.endsWith("/")) {
            trimmed = trimmed.substring(0, trimmed.length() - 1);
        }
        return trimmed;
    }

    private List<String> loadOrigins() {
        List<String> origins = new ArrayList<>();
        if (allowedOriginsProp != null && !allowedOriginsProp.isBlank()) {
            origins.addAll(Arrays.stream(allowedOriginsProp.split(","))
                    .map(String::trim)
                    .map(WebConfig::normalizeOrigin)
                    .filter(s -> s != null && !s.isEmpty())
                    .toList());
        } else if (frontEndUrl != null && !frontEndUrl.isBlank()) {
            origins.add(normalizeOrigin(frontEndUrl));
        }
        return origins;
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        List<String> origins = loadOrigins();

    var mapping = registry.addMapping("/**")
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
        .allowedHeaders("*")
                .exposedHeaders("Authorization", "Content-Type")
                .maxAge(3600);

        boolean hasWildcard = origins.stream().anyMatch(o -> o.contains("*"));
        if (origins.isEmpty() || hasWildcard) {
            mapping.allowedOriginPatterns("*")
                    .allowCredentials(false);
        } else {
            // Exact origins: echo back and allow credentials
            mapping.allowedOrigins(origins.toArray(String[]::new))
                    .allowCredentials(true);
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        List<String> origins = loadOrigins();

        CorsConfiguration config = new CorsConfiguration();
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
    config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));
        config.setMaxAge(3600L);

        boolean hasWildcard = origins.stream().anyMatch(o -> o.contains("*"));
        if (origins.isEmpty() || hasWildcard) {
            config.setAllowedOriginPatterns(List.of("*"));
            config.setAllowCredentials(false);
        } else {
            // Exact match when no wildcard used
            config.setAllowedOrigins(origins);
            config.setAllowCredentials(true);
        }

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // Extra safety: ensure CORS runs at highest precedence, even on error responses
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistration(CorsConfigurationSource source) {
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}