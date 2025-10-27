package com.claro.configuracion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuesta de transportista
 * RF 1.17.9 - Según openapi.md
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransportistaResponseDTO {
    
    private String empresaId;      // String según openapi.md
    private String transportistaId; // String según openapi.md (renombrado de "id")
    private String nombre;
    private String tipoDocumento;
    private String numeroDocumento;
}
