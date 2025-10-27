package com.claro.configuracion.repository;

import com.claro.configuracion.model.entity.Parametro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio JPA para la entidad Parametro
 * RF 1.17.4, 1.17.5, 1.17.6
 */
@Repository
public interface ParametroRepository extends JpaRepository<Parametro, Long> {
}
