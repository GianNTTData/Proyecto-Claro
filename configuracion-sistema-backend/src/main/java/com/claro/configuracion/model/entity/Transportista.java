package com.claro.configuracion.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad JPA para Transportista
 * RF 1.17.9
 */
@Entity
@Table(name = "transportistas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transportista {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "empresa_id", nullable = false)
    private Long empresaId;
    
    @Column(nullable = false, length = 200)
    private String nombre;
    
    @Column(name = "tipo_documento", nullable = false, length = 20)
    private String tipoDocumento;
    
    @Column(name = "numero_documento", nullable = false, length = 20)
    private String numeroDocumento;
}
