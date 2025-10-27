package com.claro.configuracion.repository;

import com.claro.configuracion.model.entity.EmpresaTransporte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositorio JPA para la entidad EmpresaTransporte
 * RF 1.17.8
 */
@Repository
public interface EmpresaTransporteRepository extends JpaRepository<EmpresaTransporte, Long> {
    
    Optional<EmpresaTransporte> findByRuc(String ruc);
    
    List<EmpresaTransporte> findByRazonSocialContainingIgnoreCase(String razonSocial);
}
