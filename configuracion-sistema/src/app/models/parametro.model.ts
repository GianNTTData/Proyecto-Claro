/**
 * Modelo para Parámetros de Configuración
 * RF 1.28.2 - Parámetros
 * Alineado con Backend DTO (ParametroResponseDTO)
 */
export interface Parametro {
  cantidadTiempoDesbloqueo?: number;
  unidadMedidaTiempoDesbloqueo?: string;
  cantidadTiempoReserva?: number;
  unidadMedidaTiempoReserva?: string;
}

/**
 * Request para actualizar parámetros
 * Según Backend ParametroRequestDTO
 */
export interface ParametroRequest {
  cantidadTiempoDesbloqueo: number;
  unidadMedidaTiempoDesbloqueo: string;
  cantidadTiempoReserva: number;
  unidadMedidaTiempoReserva: string;
}

/**
 * Response de operaciones con parámetros
 * Según Backend ApiResponseDTO<ParametroResponseDTO>
 */
export interface ParametroResponse {
  cantidadTiempoDesbloqueo: number;
  unidadMedidaTiempoDesbloqueo: string;
  cantidadTiempoReserva: number;
  unidadMedidaTiempoReserva: string;
}
