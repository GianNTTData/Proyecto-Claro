package com.claro.configuracion.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad JPA para Almacén
 * RF 1.17.7
 */
@Entity
@Table(name = "almacenes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Almacen {
    
    @Id
    @Column(name = "codigo", length = 20)
    private String codigo;
    
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(nullable = false, length = 50)
    private String tipo;
    
    @Column(length = 255)
    private String direccion;
    
    @Column(nullable = false, length = 50)
    private String bloqueo;
    
    @Column(nullable = false, length = 20)
    private String estado;
}
