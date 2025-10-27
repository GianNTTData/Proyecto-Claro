package com.claro.configuracion.controller;

import com.claro.configuracion.model.dto.ApiResponseDTO;
import com.claro.configuracion.model.dto.MotivoRequestDTO;
import com.claro.configuracion.model.dto.MotivoResponseDTO;
import com.claro.configuracion.model.dto.MotivoUpdateDTO;
import com.claro.configuracion.service.MotivoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Controlador REST para gestión de motivos
 * RF 1.17.1, 1.17.2, 1.17.3
 * Según apis-configuracion-spec.md - Headers de trazabilidad y timestamp requeridos
 */
@RestController
@RequestMapping("/v1/motivos")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Motivos", description = "API para gestión de motivos del sistema - RF 1.17")
public class MotivoController {
    
    private final MotivoService motivoService;
    
    /**
     * RF 1.17.1 - Consultar motivos
     * GET /v1/motivos?nombreMotivo={nombre}&estadoMotivo={estado}&timestamp={timestamp}
     * Según apis-configuracion-spec.md
     */
    @GetMapping
    @Operation(summary = "Consultar motivos", 
               description = "RF 1.17.1 - Obtiene la lista de motivos registrados. Filtros opcionales: nombreMotivo, estadoMotivo")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta exitosa"),
        @ApiResponse(responseCode = "400", description = "Parámetros inválidos"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<List<MotivoResponseDTO>>> consultarMotivos(
            // Headers de trazabilidad requeridos
            @Parameter(description = "Identificador de la aplicación", required = true)
            @RequestHeader("idApp") @NotBlank String idApp,
            
            @Parameter(description = "Identificador de correlación", required = true)
            @RequestHeader("idCorrelacion") @NotBlank String idCorrelacion,
            
            @Parameter(description = "Identificador del mensaje", required = true)
            @RequestHeader("idMsg") @NotBlank String idMsg,
            
            @Parameter(description = "Identificador de la transacción", required = true)
            @RequestHeader("idTransaccion") @NotBlank String idTransaccion,
            
            @Parameter(description = "Token de autorización")
            @RequestHeader(value = "authorization", required = false) String authorization,
            
            // Query parameters
            @Parameter(description = "Timestamp en formato ISO 8601", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timestamp,
            
            @Parameter(description = "Nombre del motivo (búsqueda parcial)")
            @RequestParam(value = "nombreMotivo", required = false) String nombreMotivo,
            
            @Parameter(description = "Estado del motivo (ej: ACTIVO, INACTIVO)")
            @RequestParam(value = "estadoMotivo", required = false) String estadoMotivo
    ) {
        log.info("GET /v1/motivos - idCorrelacion: {}, nombreMotivo: {}, estadoMotivo: {}", 
                 idCorrelacion, nombreMotivo, estadoMotivo);
        
        List<MotivoResponseDTO> motivos = motivoService.consultarMotivos(nombreMotivo, estadoMotivo);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Consulta de motivos exitosa", motivos)
        );
    }
    
    /**
     * RF 1.17.2 - Registrar motivo
     * POST /v1/motivos
     * Según apis-configuracion-spec.md
     */
    @PostMapping
    @Operation(summary = "Registrar motivo", 
               description = "RF 1.17.2 - Registra un nuevo motivo en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Motivo registrado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "409", description = "Ya existe un motivo con ese nombre"),
        @ApiResponse(responseCode = "422", description = "Validación fallida"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<MotivoResponseDTO>> registrarMotivo(
            // Headers de trazabilidad requeridos
            @Parameter(description = "Identificador de la aplicación", required = true)
            @RequestHeader("idApp") @NotBlank String idApp,
            
            @Parameter(description = "Identificador de correlación", required = true)
            @RequestHeader("idCorrelacion") @NotBlank String idCorrelacion,
            
            @Parameter(description = "Identificador del mensaje", required = true)
            @RequestHeader("idMsg") @NotBlank String idMsg,
            
            @Parameter(description = "Identificador de la transacción", required = true)
            @RequestHeader("idTransaccion") @NotBlank String idTransaccion,
            
            @Parameter(description = "Identificador del usuario", required = true)
            @RequestHeader("idUsuario") @NotBlank String idUsuario,
            
            @Parameter(description = "Token de autorización")
            @RequestHeader(value = "authorization", required = false) String authorization,
            
            // Query parameters
            @Parameter(description = "Timestamp en formato ISO 8601", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timestamp,
            
            // Body
            @Valid @RequestBody MotivoRequestDTO requestDTO
    ) {
        log.info("POST /v1/motivos - idCorrelacion: {}, idUsuario: {}, nombreMotivo: {}", 
                 idCorrelacion, idUsuario, requestDTO.getNombreMotivo());
        
        MotivoResponseDTO motivoCreado = motivoService.registrarMotivo(requestDTO);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponseDTO.success(
                    "Motivo registrado exitosamente",
                    motivoCreado
                ));
    }
    
    /**
     * RF 1.17.3 - Actualizar motivo
     * PUT /v1/motivos/{id}
     * Según apis-configuracion-spec.md - ID en path, body con nombreMotivo y estadoMotivo
     */
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar motivo", 
               description = "RF 1.17.3 - Actualiza la información de un motivo existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Motivo actualizado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "404", description = "Motivo no encontrado"),
        @ApiResponse(responseCode = "409", description = "Ya existe otro motivo con ese nombre"),
        @ApiResponse(responseCode = "422", description = "Validación fallida"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<Void>> actualizarMotivo(
            // Path parameter
            @Parameter(description = "ID del motivo a actualizar", required = true)
            @PathVariable String id,
            
            // Headers de trazabilidad requeridos
            @Parameter(description = "Identificador de la aplicación", required = true)
            @RequestHeader("idApp") @NotBlank String idApp,
            
            @Parameter(description = "Identificador de correlación", required = true)
            @RequestHeader("idCorrelacion") @NotBlank String idCorrelacion,
            
            @Parameter(description = "Identificador del mensaje", required = true)
            @RequestHeader("idMsg") @NotBlank String idMsg,
            
            @Parameter(description = "Identificador de la transacción", required = true)
            @RequestHeader("idTransaccion") @NotBlank String idTransaccion,
            
            @Parameter(description = "Identificador del usuario", required = true)
            @RequestHeader("idUsuario") @NotBlank String idUsuario,
            
            @Parameter(description = "Token de autorización")
            @RequestHeader(value = "authorization", required = false) String authorization,
            
            // Query parameters
            @Parameter(description = "Timestamp en formato ISO 8601", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timestamp,
            
            // Body
            @Valid @RequestBody MotivoUpdateDTO updateDTO
    ) {
        log.info("PUT /v1/motivos/{} - idCorrelacion: {}, idUsuario: {}, nombreMotivo: {}", 
                 id, idCorrelacion, idUsuario, updateDTO.getNombreMotivo());
        
        motivoService.actualizarMotivo(id, updateDTO);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Motivo actualizado exitosamente")
        );
    }
}
