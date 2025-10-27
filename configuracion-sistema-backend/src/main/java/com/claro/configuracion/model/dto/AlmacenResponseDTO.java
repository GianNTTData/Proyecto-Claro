package com.claro.configuracion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuesta de almacén
 * RF 1.17.7 - Según openapi.md consolidado
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlmacenResponseDTO {
    
    private String codigo;
    private String nombre;
    private String tipo;
    private String direccion;
    private String bloqueo;  // String según openapi.md (TBD: enum values)
    private String estado;   // String según openapi.md (TBD: enum values)
}
