package com.claro.configuracion.service;

import com.claro.configuracion.model.dto.TransportistaResponseDTO;
import com.claro.configuracion.model.entity.Transportista;
import com.claro.configuracion.repository.TransportistaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para consulta de transportistas
 * RF 1.17.9
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class TransportistaService {
    
    private final TransportistaRepository transportistaRepository;
    
    /**
     * RF 1.17.9 - Consultar transportistas
     * Parámetros opcionales: empresaId, id, tipoDocumento, numeroDocumento, nombre
     * IDs como String según openapi.md
     */
    public List<TransportistaResponseDTO> consultarTransportistas(
            String empresaId, String id, String tipoDocumento, 
            String numeroDocumento, String nombre) {
        log.debug("Consultando transportistas - empresaId: {}, id: {}, nombre: {}", 
                  empresaId, id, nombre);
        
        List<Transportista> transportistas;
        
        if (id != null && !id.isBlank()) {
            try {
                Long idLong = Long.parseLong(id);
                transportistas = transportistaRepository.findById(idLong)
                        .map(List::of)
                        .orElse(List.of());
            } catch (NumberFormatException e) {
                log.warn("ID de transportista no válido: {}", id);
                transportistas = List.of();
            }
        } else if (tipoDocumento != null && !tipoDocumento.isBlank() && 
                   numeroDocumento != null && !numeroDocumento.isBlank()) {
            transportistas = transportistaRepository.findByTipoDocumentoAndNumeroDocumento(
                    tipoDocumento, numeroDocumento);
        } else if (empresaId != null && !empresaId.isBlank() && nombre != null && !nombre.isBlank()) {
            try {
                Long empresaIdLong = Long.parseLong(empresaId);
                transportistas = transportistaRepository.findByEmpresaIdAndNombreContainingIgnoreCase(
                        empresaIdLong, nombre);
            } catch (NumberFormatException e) {
                log.warn("ID de empresa no válido: {}", empresaId);
                transportistas = List.of();
            }
        } else if (empresaId != null && !empresaId.isBlank()) {
            try {
                Long empresaIdLong = Long.parseLong(empresaId);
                transportistas = transportistaRepository.findByEmpresaId(empresaIdLong);
            } catch (NumberFormatException e) {
                log.warn("ID de empresa no válido: {}", empresaId);
                transportistas = List.of();
            }
        } else if (nombre != null && !nombre.isBlank()) {
            transportistas = transportistaRepository.findByNombreContainingIgnoreCase(nombre);
        } else {
            transportistas = transportistaRepository.findAll();
        }
        
        log.info("Encontrados {} transportistas", transportistas.size());
        return transportistas.stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }
    
    private TransportistaResponseDTO convertirAResponseDTO(Transportista transportista) {
        return new TransportistaResponseDTO(
            String.valueOf(transportista.getEmpresaId()),  // Conversión Long → String
            String.valueOf(transportista.getId()),          // Conversión Long → String
            transportista.getNombre(),
            transportista.getTipoDocumento(),
            transportista.getNumeroDocumento()
        );
    }
}
