package com.claro.configuracion.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para solicitud de registro/actualización de parámetros
 * RF 1.17.5, 1.17.6
 * Según apis-configuracion-spec.md - Nomenclatura del EDS
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParametroRequestDTO {
    
    /**
     * Cantidad de tiempo de desbloqueo de mercadería (requerido)
     */
    @NotNull(message = "La cantidad de tiempo de desbloqueo es obligatoria")
    @Positive(message = "La cantidad de tiempo de desbloqueo debe ser positiva")
    private Integer cantidadTiempoDesbloqueo;
    
    /**
     * Unidad de medida de tiempo de desbloqueo (requerido)
     * Valores permitidos: minutos, horas, dias
     */
    @NotBlank(message = "La unidad de medida de tiempo de desbloqueo es obligatoria")
    @Pattern(regexp = "^(minutos|horas|dias)$", 
             message = "La unidad de medida debe ser: minutos, horas o dias")
    private String unidadMedidaTiempoDesbloqueo;
    
    /**
     * Cantidad de tiempo de reserva de mercadería (requerido)
     */
    @NotNull(message = "La cantidad de tiempo de reserva es obligatoria")
    @Positive(message = "La cantidad de tiempo de reserva debe ser positiva")
    private Integer cantidadTiempoReserva;
    
    /**
     * Unidad de medida de tiempo de reserva (requerido)
     * Valores permitidos: minutos, horas, dias
     */
    @NotBlank(message = "La unidad de medida de tiempo de reserva es obligatoria")
    @Pattern(regexp = "^(minutos|horas|dias)$", 
             message = "La unidad de medida debe ser: minutos, horas o dias")
    private String unidadMedidaTiempoReserva;
}
