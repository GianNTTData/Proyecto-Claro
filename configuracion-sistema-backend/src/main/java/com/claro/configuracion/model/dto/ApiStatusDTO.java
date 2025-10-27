package com.claro.configuracion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para el estado de las respuestas de la API
 * Según RF 1.17 y apis-configuracion-spec.md: código 0 (éxito) / -1 (error)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiStatusDTO {
    
    /**
     * Código de respuesta: 0 = éxito, -1 = error
     */
    private Integer codigoRespuesta;
    
    /**
     * Mensaje descriptivo del resultado de la operación
     */
    private String mensaje;
    
    /**
     * Crea un estado de éxito
     */
    public static ApiStatusDTO success(String mensaje) {
        return new ApiStatusDTO(0, mensaje);
    }
    
    /**
     * Crea un estado de error
     */
    public static ApiStatusDTO error(String mensaje) {
        return new ApiStatusDTO(-1, mensaje);
    }
}
