package com.claro.configuracion.repository;

import com.claro.configuracion.model.entity.Almacen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad Almacen
 * RF 1.17.7
 */
@Repository
public interface AlmacenRepository extends JpaRepository<Almacen, String> {
    
    List<Almacen> findByTipo(String tipo);
    
    List<Almacen> findByCodigoAndTipo(String codigo, String tipo);
}
