package com.claro.configuracion.controller;

import com.claro.configuracion.model.dto.ApiResponseDTO;
import com.claro.configuracion.model.dto.EmpresaTransporteResponseDTO;
import com.claro.configuracion.service.EmpresaTransporteService;
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
 * Controlador REST para consulta de empresas de transporte
 * RF 1.17.8
 * Según apis-configuracion-spec.md
 */
@RestController
@RequestMapping("/v1/empresas-transporte")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Empresas de Transporte", description = "API para consulta de empresas de transporte - RF 1.17")
public class EmpresaTransporteController {
    
    private final EmpresaTransporteService empresaTransporteService;
    
    /**
     * RF 1.17.8 - Consultar empresas de transporte
     * GET /v1/empresas-transporte?id={id}&ruc={ruc}&razonSocial={razonSocial}&timestamp={timestamp}
     * Según apis-configuracion-spec.md
     */
    @GetMapping
    @Operation(summary = "Consultar empresas de transporte", 
               description = "RF 1.17.8 - Obtiene la lista de empresas de transporte registradas. Filtros opcionales: id, ruc, razonSocial")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Consulta exitosa"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<ApiResponseDTO<List<EmpresaTransporteResponseDTO>>> consultarEmpresasTransporte(
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
            @RequestParam(required = false) String id,
            
            @Parameter(description = "RUC de la empresa")
            @RequestParam(required = false) String ruc,
            
            @Parameter(description = "Razón social de la empresa (búsqueda parcial)")
            @RequestParam(required = false) String razonSocial
    ) {
        log.info("GET /v1/empresas-transporte - idCorrelacion: {}, id: {}, ruc: {}, razonSocial: {}", 
                 idCorrelacion, id, ruc, razonSocial);
        
        List<EmpresaTransporteResponseDTO> empresas = 
            empresaTransporteService.consultarEmpresasTransporte(id, ruc, razonSocial);
        
        return ResponseEntity.ok(
            ApiResponseDTO.success("Consulta de empresas de transporte exitosa", empresas)
        );
    }
}
