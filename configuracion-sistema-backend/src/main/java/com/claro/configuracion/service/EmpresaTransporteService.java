package com.claro.configuracion.service;

import com.claro.configuracion.model.dto.EmpresaTransporteResponseDTO;
import com.claro.configuracion.model.entity.EmpresaTransporte;
import com.claro.configuracion.repository.EmpresaTransporteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para consulta de empresas de transporte
 * RF 1.17.8
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class EmpresaTransporteService {
    
    private final EmpresaTransporteRepository empresaTransporteRepository;
    
    /**
     * RF 1.17.8 - Consultar empresas de transporte
     * Parámetros opcionales: id, ruc, razonSocial
     * IDs como String según openapi.md
     */
    public List<EmpresaTransporteResponseDTO> consultarEmpresasTransporte(
            String id, String ruc, String razonSocial) {
        log.debug("Consultando empresas de transporte - id: {}, ruc: {}, razonSocial: {}", 
                  id, ruc, razonSocial);
        
        List<EmpresaTransporte> empresas;
        
        if (id != null && !id.isBlank()) {
            try {
                Long idLong = Long.parseLong(id);
                empresas = empresaTransporteRepository.findById(idLong)
                        .map(List::of)
                        .orElse(List.of());
            } catch (NumberFormatException e) {
                log.warn("ID de empresa no válido: {}", id);
                empresas = List.of();
            }
        } else if (ruc != null && !ruc.isBlank()) {
            empresas = empresaTransporteRepository.findByRuc(ruc)
                    .map(List::of)
                    .orElse(List.of());
        } else if (razonSocial != null && !razonSocial.isBlank()) {
            empresas = empresaTransporteRepository.findByRazonSocialContainingIgnoreCase(razonSocial);
        } else {
            empresas = empresaTransporteRepository.findAll();
        }
        
        log.info("Encontradas {} empresas de transporte", empresas.size());
        return empresas.stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }
    
    private EmpresaTransporteResponseDTO convertirAResponseDTO(EmpresaTransporte empresa) {
        return new EmpresaTransporteResponseDTO(
            String.valueOf(empresa.getId()),  // Conversión Long → String
            empresa.getRuc(),
            empresa.getRazonSocial()
        );
    }
}
