package com.claro.configuracion.service;

import com.claro.configuracion.exception.BusinessConflictException;
import com.claro.configuracion.exception.ResourceNotFoundException;
import com.claro.configuracion.model.dto.MotivoRequestDTO;
import com.claro.configuracion.model.dto.MotivoResponseDTO;
import com.claro.configuracion.model.dto.MotivoUpdateDTO;
import com.claro.configuracion.model.entity.Motivo;
import com.claro.configuracion.repository.MotivoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestión de motivos
 * RF 1.17.1, 1.17.2, 1.17.3
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MotivoService {
    
    private final MotivoRepository motivoRepository;
    
    /**
     * RF 1.17.1 - Consultar motivos
     * Parámetros opcionales: nombre, estado
     * Según apis-configuracion-spec.md - estado es String
     */
    @Transactional(readOnly = true)
    public List<MotivoResponseDTO> consultarMotivos(String nombre, String estado) {
        log.debug("Consultando motivos - nombre: {}, estado: {}", nombre, estado);
        
        List<Motivo> motivos;
        
        if (nombre != null && !nombre.isBlank() && estado != null && !estado.isBlank()) {
            motivos = motivoRepository.findByNombreContainingIgnoreCaseAndEstado(nombre, estado);
        } else if (nombre != null && !nombre.isBlank()) {
            motivos = motivoRepository.findByNombreContainingIgnoreCase(nombre);
        } else if (estado != null && !estado.isBlank()) {
            motivos = motivoRepository.findByEstado(estado);
        } else {
            motivos = motivoRepository.findAll();
        }
        
        log.info("Encontrados {} motivos", motivos.size());
        return motivos.stream()
                .map(this::convertirAResponseDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * RF 1.17.2 - Registrar motivo
     * Según apis-configuracion-spec.md - usa nombreMotivo y estadoMotivo
     */
    public MotivoResponseDTO registrarMotivo(MotivoRequestDTO requestDTO) {
        log.debug("Registrando motivo: {}", requestDTO.getNombreMotivo());
        
        // Validar que no exista otro motivo con el mismo nombre
        if (motivoRepository.existsByNombre(requestDTO.getNombreMotivo())) {
            throw new BusinessConflictException(
                "Ya existe un motivo con el nombre: " + requestDTO.getNombreMotivo()
            );
        }
        
        Motivo motivo = new Motivo();
        motivo.setNombre(requestDTO.getNombreMotivo());
        motivo.setEstado(requestDTO.getEstadoMotivo());
        
        Motivo motivoGuardado = motivoRepository.save(motivo);
        log.info("Motivo registrado exitosamente con ID: {}", motivoGuardado.getId());
        
        return convertirAResponseDTO(motivoGuardado);
    }
    
    /**
     * RF 1.17.3 - Actualizar motivo
     * Según apis-configuracion-spec.md - id es String en API, Long internamente
     */
    public void actualizarMotivo(String idStr, MotivoUpdateDTO updateDTO) {
        log.debug("Actualizando motivo ID: {}", idStr);
        
        // Convertir String id a Long
        Long id;
        try {
            id = Long.parseLong(idStr);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("ID de motivo inválido: " + idStr);
        }
        
        // Verificar que el motivo existe
        Motivo motivo = motivoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Motivo", "id", id
                ));
        
        // Validar que no exista otro motivo con el mismo nombre
        if (motivoRepository.existsByNombreAndIdNot(updateDTO.getNombreMotivo(), id)) {
            throw new BusinessConflictException(
                "Ya existe otro motivo con el nombre: " + updateDTO.getNombreMotivo()
            );
        }
        
        motivo.setNombre(updateDTO.getNombreMotivo());
        motivo.setEstado(updateDTO.getEstadoMotivo());
        
        motivoRepository.save(motivo);
        log.info("Motivo ID {} actualizado exitosamente", id);
    }
    
    /**
     * Convierte una entidad Motivo a DTO de respuesta
     * Según apis-configuracion-spec.md - id es String en API
     */
    private MotivoResponseDTO convertirAResponseDTO(Motivo motivo) {
        return new MotivoResponseDTO(
            String.valueOf(motivo.getId()),
            motivo.getNombre(),
            motivo.getEstado()
        );
    }
}
