package com.claro.configuracion.controller;

import com.claro.configuracion.model.dto.ApiResponseDTO;
import com.claro.configuracion.model.dto.TransportistaResponseDTO;
import com.claro.configuracion.service.TransportistaService;
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
 * Controlador REST para consulta de transportistas
 * RF 1.17.9
 * Según apis-configuracion-spec.md
 */
@RestController
@RequestMapping("/v1/transportistas")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Transportistas", description = "API para consulta de transportistas - RF 1.17")
public class TransportistaController {
    
    private final TransportistaService transportistaService;
    
    /**
     * RF 1.17.9 - Consultar transportistas
     * GET /v1/transportistas?empresaId={empresaId}&id={id}&tipoDocumento={tipo}&numeroDocumento={numero}&nombre={nombre}&timestamp={timestamp}
     * Según apis-configuracion-spec.md
     */
    @GetMapping
    @Operation(summary = "Consultar transportistas", 
               description = "RF 1.17.9 - Obtiene la lista de transportistas registrados. Filtros opcionales: empresaId, id, tipoDocumento, numeroDocumento, nombre")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta exitosa"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<List<TransportistaResponseDTO>>> consultarTransportistas(
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
            
            @Parameter(description = "ID de la empresa de transporte")
            @RequestParam(required = false) String empresaId,
            
            @Parameter(description = "ID del transportista")
            @RequestParam(required = false) String id,
            
            @Parameter(description = "Tipo de documento")
            @RequestParam(required = false) String tipoDocumento,
            
            @Parameter(description = "Número de documento")
            @RequestParam(required = false) String numeroDocumento,
            
            @Parameter(description = "Nombre del transportista (búsqueda parcial)")
            @RequestParam(required = false) String nombre
    ) {
        log.info("GET /v1/transportistas - idCorrelacion: {}, empresaId: {}, id: {}, nombre: {}", 
                 idCorrelacion, empresaId, id, nombre);
        
        List<TransportistaResponseDTO> transportistas = 
            transportistaService.consultarTransportistas(
                empresaId, id, tipoDocumento, numeroDocumento, nombre);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Consulta de transportistas exitosa", transportistas)
        );
    }
}
