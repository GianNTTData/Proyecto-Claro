package com.claro.configuracion.exception;

import com.claro.configuracion.model.dto.ApiResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

/**
 * Manejador global de excepciones para la API
 * Implementa el estándar de errores HTTP del RF 1.17
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    /**
     * Maneja errores de validación (400 Bad Request)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponseDTO<Map<String, String>>> handleValidationExceptions(
            MethodArgumentNotValidException ex
    ) {
        log.warn("Error de validación: {}", ex.getMessage());
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDTO.error("Error de validación en los datos de entrada"));
    }
    
    /**
     * Maneja errores de tipo de argumento incorrecto (400 Bad Request)
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex
    ) {
        log.warn("Error de tipo de parámetro: {}", ex.getMessage());
        
        String message = String.format(
            "El parámetro '%s' debe ser de tipo %s",
            ex.getName(),
            ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "desconocido"
        );
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDTO.error(message));
    }
    
    /**
     * Maneja headers faltantes (400 Bad Request)
     * Esto es crítico para debugging cuando el interceptor del Frontend no funciona
     */
    @ExceptionHandler(MissingRequestHeaderException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleMissingRequestHeader(
            MissingRequestHeaderException ex
    ) {
        log.error("Header requerido faltante: {}", ex.getHeaderName());
        log.error("Detalles: {}", ex.getMessage());
        
        String message = String.format(
            "Header requerido '%s' no encontrado. Headers de trazabilidad requeridos: idApp, idCorrelacion, idMsg, idTransaccion",
            ex.getHeaderName()
        );
        
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseDTO.error(message));
    }
    
    /**
     * Maneja recursos no encontrados (404 Not Found)
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleResourceNotFoundException(
            ResourceNotFoundException ex
    ) {
        log.warn("Recurso no encontrado: {}", ex.getMessage());
        
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponseDTO.error(ex.getMessage()));
    }
    
    /**
     * Maneja conflictos de negocio (409 Conflict)
     */
    @ExceptionHandler(BusinessConflictException.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleBusinessConflictException(
            BusinessConflictException ex
    ) {
        log.warn("Conflicto de negocio: {}", ex.getMessage());
        
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiResponseDTO.error(ex.getMessage()));
    }
    
    /**
     * Maneja errores genéricos del servidor (500 Internal Server Error)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO<Void>> handleGlobalException(
            Exception ex
    ) {
        log.error("Error interno del servidor", ex);
        
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponseDTO.error("Error interno del servidor. Por favor, contacte al administrador."));
    }
}
