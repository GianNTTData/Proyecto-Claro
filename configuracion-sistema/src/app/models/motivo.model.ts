/**
 * Modelo para Motivo de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 * Alineado con Backend DTO (nombreMotivo, estadoMotivo)
 */
export interface Motivo {
  id?: string;  // Backend devuelve String
  nombreMotivo: string;  // Backend usa 'nombreMotivo' en la API
  estadoMotivo: string;  // Backend usa 'estadoMotivo' en la API
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}

/**
 * Filtros para búsqueda de motivos
 * nombreMotivo y estadoMotivo según Backend API
 */
export interface MotivoFiltros {
  nombreMotivo?: string;  // Cambiado de 'descripcion' a 'nombreMotivo'
  estadoMotivo?: string;  // Backend espera String
}

/**
 * Request para registrar/actualizar motivo
 * Según Backend DTOs (MotivoRequestDTO)
 */
export interface MotivoRequest {
  nombreMotivo: string;  // Backend espera 'nombreMotivo'
  estadoMotivo: string;   // Backend espera 'estadoMotivo' como String
}

/**
 * Response de operaciones con motivos
 * Según Backend DTOs (MotivoResponseDTO dentro de ApiResponseDTO)
 */
export interface MotivoResponse {
  id: string;
  nombreMotivo: string;  // Backend devuelve 'nombreMotivo'
  estadoMotivo: string;  // Backend devuelve 'estadoMotivo'
  fechaCreacion?: string;
  fechaModificacion?: string;
}
