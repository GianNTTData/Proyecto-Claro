package com.claro.configuracion.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidad JPA para Motivos
 * RF 1.17.1, 1.17.2, 1.17.3
 * Según apis-configuracion-spec.md - el estado es String (ej: ACTIVO, INACTIVO)
 */
@Entity
@Table(name = "motivos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Motivo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 100)
    private String nombre;
    
    /**
     * Estado del motivo como String para flexibilidad
     * Valores comunes: ACTIVO, INACTIVO
     */
    @Column(nullable = false, length = 20)
    private String estado;
    
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        if (estado == null || estado.isBlank()) {
            estado = "ACTIVO";
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}
