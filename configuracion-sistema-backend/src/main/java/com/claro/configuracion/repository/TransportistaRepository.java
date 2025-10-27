package com.claro.configuracion.repository;

import com.claro.configuracion.model.entity.Transportista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para la entidad Transportista
 * RF 1.17.9
 */
@Repository
public interface TransportistaRepository extends JpaRepository<Transportista, Long> {
    
    List<Transportista> findByEmpresaId(Long empresaId);
    
    List<Transportista> findByTipoDocumentoAndNumeroDocumento(String tipoDocumento, String numeroDocumento);
    
    List<Transportista> findByNombreContainingIgnoreCase(String nombre);
    
    List<Transportista> findByEmpresaIdAndNombreContainingIgnoreCase(Long empresaId, String nombre);
}
