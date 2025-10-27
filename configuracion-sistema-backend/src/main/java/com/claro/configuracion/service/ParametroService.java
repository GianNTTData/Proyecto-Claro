package com.claro.configuracion.service;

import com.claro.configuracion.exception.ResourceNotFoundException;
import com.claro.configuracion.model.dto.ParametroRequestDTO;
import com.claro.configuracion.model.dto.ParametroResponseDTO;
import com.claro.configuracion.model.entity.Parametro;
import com.claro.configuracion.repository.ParametroRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para gestión de parámetros del sistema
 * RF 1.17.4, 1.17.5, 1.17.6
 * Según apis-configuracion-spec.md - Nomenclatura del EDS
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ParametroService {
    
    private final ParametroRepository parametroRepository;
    
    /**
     * RF 1.17.4 - Consultar parámetros
     * Según apis-configuracion-spec.md - Retorna un único registro de configuración
     */
    @Transactional(readOnly = true)
    public ParametroResponseDTO consultarParametros() {
        log.debug("Consultando parámetros del sistema");
        
        // Obtener el primer (y único) registro de parámetros
        Parametro parametro = parametroRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                    "No existen parámetros configurados en el sistema"
                ));
        
        log.info("Parámetros encontrados con ID: {}", parametro.getId());
        return convertirAResponseDTO(parametro);
    }
    
    /**
     * RF 1.17.5 - Registrar parámetros
     * Según apis-configuracion-spec.md
     */
    public void registrarParametro(ParametroRequestDTO requestDTO) {
        log.debug("Registrando parámetros del sistema");
        
        Parametro parametro = new Parametro();
        parametro.setCantidadTiempoDesbloqueo(requestDTO.getCantidadTiempoDesbloqueo());
        parametro.setUnidadMedidaTiempoDesbloqueo(requestDTO.getUnidadMedidaTiempoDesbloqueo());
        parametro.setCantidadTiempoReserva(requestDTO.getCantidadTiempoReserva());
        parametro.setUnidadMedidaTiempoReserva(requestDTO.getUnidadMedidaTiempoReserva());
        
        Parametro parametroGuardado = parametroRepository.save(parametro);
        log.info("Parámetro registrado exitosamente con ID: {}", parametroGuardado.getId());
    }
    
    /**
     * RF 1.17.6 - Actualizar parámetros
     * Según apis-configuracion-spec.md - No usa ID en path, actualiza el registro existente
     */
    public void actualizarParametro(ParametroRequestDTO requestDTO) {
        log.debug("Actualizando parámetros del sistema");
        
        // Obtener el registro existente (el primero)
        Parametro parametro = parametroRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                    "No existen parámetros configurados en el sistema. Debe registrarlos primero."
                ));
        
        parametro.setCantidadTiempoDesbloqueo(requestDTO.getCantidadTiempoDesbloqueo());
        parametro.setUnidadMedidaTiempoDesbloqueo(requestDTO.getUnidadMedidaTiempoDesbloqueo());
        parametro.setCantidadTiempoReserva(requestDTO.getCantidadTiempoReserva());
        parametro.setUnidadMedidaTiempoReserva(requestDTO.getUnidadMedidaTiempoReserva());
        
        parametroRepository.save(parametro);
        log.info("Parámetros actualizados exitosamente");
    }
    
    /**
     * Convierte una entidad Parametro a DTO de respuesta
     * Según apis-configuracion-spec.md - No incluye ID en la respuesta
     */
    private ParametroResponseDTO convertirAResponseDTO(Parametro parametro) {
        return new ParametroResponseDTO(
            parametro.getCantidadTiempoDesbloqueo(),
            parametro.getUnidadMedidaTiempoDesbloqueo(),
            parametro.getCantidadTiempoReserva(),
            parametro.getUnidadMedidaTiempoReserva()
        );
    }
}
