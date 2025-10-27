package com.claro.configuracion.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad JPA para Empresa de Transporte
 * RF 1.17.8
 */
@Entity
@Table(name = "empresas_transporte")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaTransporte {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 11)
    private String ruc;
    
    @Column(name = "razon_social", nullable = false, length = 200)
    private String razonSocial;
}
