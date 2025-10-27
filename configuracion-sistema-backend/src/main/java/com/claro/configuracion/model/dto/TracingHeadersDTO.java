package com.claro.configuracion.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para capturar headers de trazabilidad requeridos
 * Según apis-configuracion-spec.md - Headers comunes en bff-exp-login
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TracingHeadersDTO {
    
    /**
     * Identificador de la aplicación cliente
     */
    @NotBlank(message = "Header idApp es obligatorio")
    private String idApp;
    
    /**
     * Identificador de correlación para trazabilidad
     */
    @NotBlank(message = "Header idCorrelacion es obligatorio")
    private String idCorrelacion;
    
    /**
     * Identificador del mensaje
     */
    @NotBlank(message = "Header idMsg es obligatorio")
    private String idMsg;
    
    /**
     * Identificador de la transacción
     */
    @NotBlank(message = "Header idTransaccion es obligatorio")
    private String idTransaccion;
    
    /**
     * Token de autorización (Bearer token)
     */
    private String authorization;
    
    /**
     * Identificador del usuario (requerido solo en operaciones POST/PUT/PATCH)
     */
    private String idUsuario;
}
