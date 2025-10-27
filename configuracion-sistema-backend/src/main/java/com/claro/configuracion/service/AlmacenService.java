package com.claro.configuracion.service;

import com.claro.configuracion.model.dto.AlmacenResponseDTO;
import com.claro.configuracion.model.entity.Almacen;
import com.claro.configuracion.repository.AlmacenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para consulta de almacenes
 * RF 1.17.7
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AlmacenService {
    
    private final AlmacenRepository almacenRepository;
    
    /**
     * RF 1.17.7 - Consultar almacenes
     * Parámetros opcionales: código, tipo
     */
    public List<AlmacenResponseDTO> consultarAlmacenes(String codigo, String tipo) {
        log.debug("Consultando almacenes - codigo: {}, tipo: {}", codigo, tipo);
        
        List<Almacen> almacenes;
        
        if (codigo != null && !codigo.isBlank() && tipo != null && !tipo.isBlank()) {
            almacenes = almacenRepository.findByCodigoAndTipo(codigo, tipo);
        } else if (tipo != null && !tipo.isBlank()) {
            almacenes = almacenRepository.findByTipo(tipo);
        } else if (codigo != null && !codigo.isBlank()) {
            almacenes = almacenRepository.findById(codigo)
                    .map(List::of)
                    .orElse(List.of());
        } else {
            almacenes = almacenRepository.findAll();
        }
        
        log.info("Encontrados {} almacenes", almacenes.size());
        return almacenes.stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }
    
    private AlmacenResponseDTO convertirAResponseDTO(Almacen almacen) {
        return new AlmacenResponseDTO(
            almacen.getCodigo(),
            almacen.getNombre(),
            almacen.getTipo(),
            almacen.getDireccion(),
            almacen.getBloqueo(),
            almacen.getEstado()
        );
    }
}
