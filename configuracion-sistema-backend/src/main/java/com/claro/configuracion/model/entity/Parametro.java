package com.claro.configuracion.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidad JPA para Parámetros del Sistema
 * RF 1.17.4, 1.17.5, 1.17.6
 * Según apis-configuracion-spec.md - Nomenclatura del EDS
 */
@Entity
@Table(name = "parametros")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Parametro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * Cantidad de tiempo de desbloqueo de mercadería
     */
    @Column(name = "cantidad_tiempo_desbloqueo", nullable = false)
    private Integer cantidadTiempoDesbloqueo;
    
    /**
     * Unidad de medida de tiempo de desbloqueo (minutos, horas, dias)
     */
    @Column(name = "unidad_medida_tiempo_desbloqueo", nullable = false, length = 20)
    private String unidadMedidaTiempoDesbloqueo;
    
    /**
     * Cantidad de tiempo de reserva de mercadería
     */
    @Column(name = "cantidad_tiempo_reserva", nullable = false)
    private Integer cantidadTiempoReserva;
    
    /**
     * Unidad de medida de tiempo de reserva (minutos, horas, dias)
     */
    @Column(name = "unidad_medida_tiempo_reserva", nullable = false, length = 20)
    private String unidadMedidaTiempoReserva;
    
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}
