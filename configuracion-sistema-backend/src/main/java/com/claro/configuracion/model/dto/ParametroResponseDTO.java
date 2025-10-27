package com.claro.configuracion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respuesta de parámetros
 * RF 1.17.4, 1.17.5, 1.17.6
 * Según apis-configuracion-spec.md - Nomenclatura del EDS
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParametroResponseDTO {
    
    /**
     * Cantidad de tiempo de desbloqueo de mercadería
     */
    private Integer cantidadTiempoDesbloqueo;
    
    /**
     * Unidad de medida de tiempo de desbloqueo (minutos, horas, días)
     */
    private String unidadMedidaTiempoDesbloqueo;
    
    /**
     * Cantidad de tiempo de reserva de mercadería
     */
    private Integer cantidadTiempoReserva;
    
    /**
     * Unidad de medida de tiempo de reserva (minutos, horas, días)
     */
    private String unidadMedidaTiempoReserva;
}
