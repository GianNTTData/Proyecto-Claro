package com.claro.configuracion.controller;

import com.claro.configuracion.model.dto.ApiResponseDTO;
import com.claro.configuracion.model.dto.ParametroRequestDTO;
import com.claro.configuracion.model.dto.ParametroResponseDTO;
import com.claro.configuracion.service.ParametroService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

/**
 * Controlador REST para gestión de parámetros del sistema
 * RF 1.17.4, 1.17.5, 1.17.6
 * Según apis-configuracion-spec.md
 */
@RestController
@RequestMapping("/v1/parametros")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Parámetros", description = "API para gestión de parámetros del sistema - RF 1.17")
public class ParametroController {
    
    private final ParametroService parametroService;
    
    /**
     * RF 1.17.4 - Consultar parámetros
     * GET /v1/parametros?timestamp={timestamp}
     */
    @GetMapping
    @Operation(summary = "Consultar parámetros", 
               description = "RF 1.17.4 - Obtiene la configuración de los parámetros del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta exitosa"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<ParametroResponseDTO>> consultarParametros(
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
            
            @Parameter(description = "Timestamp en formato ISO 8601", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timestamp
    ) {
        log.info("GET /v1/parametros - idCorrelacion: {}", idCorrelacion);
        
        ParametroResponseDTO parametros = parametroService.consultarParametros();
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Consulta de parámetros exitosa", parametros)
        );
    }
    
    /**
     * RF 1.17.5 - Registrar parámetros
     * POST /v1/parametros
     */
    @PostMapping
    @Operation(summary = "Registrar parámetros", 
               description = "RF 1.17.5 - Registra la configuración de parámetros del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Parámetros registrados exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "422", description = "Validación fallida"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<Void>> registrarParametro(
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
            
            @Parameter(description = "Timestamp en formato ISO 8601", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timestamp,
            
            @Valid @RequestBody ParametroRequestDTO requestDTO
    ) {
        log.info("POST /v1/parametros - idCorrelacion: {}, idUsuario: {}", idCorrelacion, idUsuario);
        
        parametroService.registrarParametro(requestDTO);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Parámetros registrados exitosamente")
        );
    }
    
    /**
     * RF 1.17.6 - Actualizar parámetros
     * PUT /v1/parametros
     */
    @PutMapping
    @Operation(summary = "Actualizar parámetros", 
               description = "RF 1.17.6 - Actualiza la configuración de parámetros del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Parámetros actualizados exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
        @ApiResponse(responseCode = "404", description = "Parámetros no encontrados"),
        @ApiResponse(responseCode = "422", description = "Validación fallida"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<Void>> actualizarParametro(
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
            
            @Parameter(description = "Timestamp en formato ISO 8601", required = true)
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime timestamp,
            
            @Valid @RequestBody ParametroRequestDTO requestDTO
    ) {
        log.info("PUT /v1/parametros - idCorrelacion: {}, idUsuario: {}", idCorrelacion, idUsuario);
        
        parametroService.actualizarParametro(requestDTO);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Parámetros actualizados exitosamente")
        );
    }
}
