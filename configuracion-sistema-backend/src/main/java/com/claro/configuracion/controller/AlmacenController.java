package com.claro.configuracion.controller;

import com.claro.configuracion.model.dto.AlmacenResponseDTO;
import com.claro.configuracion.model.dto.ApiResponseDTO;
import com.claro.configuracion.service.AlmacenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Controlador REST para consulta de almacenes
 * RF 1.17.7
 * Según apis-configuracion-spec.md
 */
@RestController
@RequestMapping("/v1/almacenes")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Almacenes", description = "API para consulta de almacenes - RF 1.17")
public class AlmacenController {
    
    private final AlmacenService almacenService;
    
    /**
     * RF 1.17.7 - Consultar almacenes
     * GET /v1/almacenes?codigo={codigo}&tipo={tipo}&timestamp={timestamp}
     * Según apis-configuracion-spec.md
     */
    @GetMapping
    @Operation(summary = "Consultar almacenes", 
               description = "RF 1.17.7 - Obtiene la lista de almacenes registrados. Filtros opcionales: codigo, tipo")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta exitosa"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<List<AlmacenResponseDTO>>> consultarAlmacenes(
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
            
            @Parameter(description = "Código del almacén")
            @RequestParam(required = false) String codigo,
            
            @Parameter(description = "Tipo de almacén")
            @RequestParam(required = false) String tipo
    ) {
        log.info("GET /v1/almacenes - idCorrelacion: {}, codigo: {}, tipo: {}", idCorrelacion, codigo, tipo);
        
        List<AlmacenResponseDTO> almacenes = almacenService.consultarAlmacenes(codigo, tipo);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Consulta de almacenes exitosa", almacenes)
        );
    }
}
