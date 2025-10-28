package com.claro.configuracion.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

/**
 * Configuración de CORS para permitir conexión desde Frontend Angular
 * Aplica a todos los endpoints del API
 */
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir credenciales
        config.setAllowCredentials(true);
        
        // Orígenes permitidos (Frontend)
        config.setAllowedOriginPatterns(Arrays.asList("http://localhost:*", "http://127.0.0.1:*"));
        
        // Métodos HTTP permitidos
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // Headers permitidos - IMPORTANTE: usar "*" para permitir todos los headers personalizados
        config.setAllowedHeaders(List.of("*"));
        
        // Headers expuestos en la respuesta
        config.setExposedHeaders(Arrays.asList(
            "Content-Type",
            "Authorization",
            "X-Total-Count"
        ));
        
        // Tiempo de caché de las políticas CORS (en segundos)
        config.setMaxAge(3600L);
        
        // Registrar configuración para todos los paths
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
