package com.claro.configuracion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuesta de empresa de transporte
 * RF 1.17.8 - Según openapi.md
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaTransporteResponseDTO {
    
    private String id;  // String según openapi.md
    private String ruc;
    private String razonSocial;
}
