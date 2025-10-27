package com.claro.configuracion.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para solicitud de actualización de motivo
 * RF 1.17.3 - Actualizar motivo
 * Según apis-configuracion-spec.md - Nomenclatura del EDS
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotivoUpdateDTO {
    
    /**
     * Identificación del motivo (requerido)
     */
    @NotBlank(message = "El ID del motivo es obligatorio")
    private String id;
    
    /**
     * Nombre del motivo (requerido)
     */
    @NotBlank(message = "El nombre del motivo es obligatorio")
    @Size(min = 3, max = 100, message = "El nombre debe tener entre 3 y 100 caracteres")
    private String nombreMotivo;
    
    /**
     * Estado del motivo (requerido)
     * Valores esperados: ACTIVO, INACTIVO u otros según negocio
     */
    @NotBlank(message = "El estado del motivo es obligatorio")
    private String estadoMotivo;
}
