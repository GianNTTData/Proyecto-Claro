package com.claro.configuracion.repository;

import com.claro.configuracion.model.entity.Motivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad Motivo
 * RF 1.17.1, 1.17.2, 1.17.3
 * Actualizado para usar String en estado según apis-configuracion-spec.md
 */
@Repository
public interface MotivoRepository extends JpaRepository<Motivo, Long> {
    
    /**
     * Busca motivos por nombre (búsqueda exacta)
     */
    Optional<Motivo> findByNombre(String nombre);
    
    /**
     * Busca motivos por nombre (búsqueda parcial, case-insensitive)
     */
    List<Motivo> findByNombreContainingIgnoreCase(String nombre);
    
    /**
     * Busca motivos por estado
     * @param estado String con el estado (ej: ACTIVO, INACTIVO)
     */
    List<Motivo> findByEstado(String estado);
    
    /**
     * Busca motivos por nombre y estado
     */
    List<Motivo> findByNombreContainingIgnoreCaseAndEstado(String nombre, String estado);
    
    /**
     * Verifica si existe un motivo con el nombre dado (excluyendo un ID específico)
     */
    boolean existsByNombreAndIdNot(String nombre, Long id);
    
    /**
     * Verifica si existe un motivo con el nombre dado
     */
    boolean existsByNombre(String nombre);
}
