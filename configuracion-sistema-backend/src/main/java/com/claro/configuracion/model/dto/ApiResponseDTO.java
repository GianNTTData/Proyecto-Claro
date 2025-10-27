package com.claro.configuracion.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO genérico para respuestas de la API
 * Según RF 1.17 y apis-configuracion-spec.md: estructura con responseStatus y responseData
 * 
 * @param <T> Tipo de datos de la respuesta
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponseDTO<T> {
    
    /**
     * Estado de la operación (código y mensaje)
     */
    private ApiStatusDTO responseStatus;
    
    /**
     * Datos de la respuesta (opcional)
     */
    private T responseData;
    
    /**
     * Crea una respuesta de éxito con datos
     */
    public static <T> ApiResponseDTO<T> success(String mensaje, T data) {
        return new ApiResponseDTO<>(ApiStatusDTO.success(mensaje), data);
    }
    
    /**
     * Crea una respuesta de éxito sin datos
     */
    public static <T> ApiResponseDTO<T> success(String mensaje) {
        return new ApiResponseDTO<>(ApiStatusDTO.success(mensaje), null);
    }
    
    /**
     * Crea una respuesta de error
     */
    public static <T> ApiResponseDTO<T> error(String mensaje) {
        return new ApiResponseDTO<>(ApiStatusDTO.error(mensaje), null);
    }
}
