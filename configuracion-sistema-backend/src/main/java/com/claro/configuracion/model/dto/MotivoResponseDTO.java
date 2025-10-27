package com.claro.configuracion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuesta de motivo
 * RF 1.17.1, 1.17.2, 1.17.3
 * Según apis-configuracion-spec.md - Nomenclatura del EDS
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MotivoResponseDTO {
    
    /**
     * Identificación del motivo
     */
    private String id;
    
    /**
     * Nombre del motivo
     */
    private String nombreMotivo;
    
    /**
     * Estado del motivo (ACTIVO/INACTIVO u otro valor según negocio)
     */
    private String estadoMotivo;
}
