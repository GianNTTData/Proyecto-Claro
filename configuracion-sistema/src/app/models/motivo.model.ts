/**
 * Modelo para Motivo de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 */
export interface Motivo {
  id?: number;
  descripcion: string;
  estado: EstadoMotivo;
  almacenId?: number;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}

/**
 * Estados posibles de un motivo
 */
export enum EstadoMotivo {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO'
}

/**
 * Filtros para búsqueda de motivos
 */
export interface MotivoFiltros {
  descripcion?: string;
  estado?: EstadoMotivo;
  almacenId?: number;
}

/**
 * Request para registrar/actualizar motivo
 */
export interface MotivoRequest {
  descripcion: string;
  estado: EstadoMotivo;
  almacenId?: number;
}

/**
 * Response de operaciones con motivos
 */
export interface MotivoResponse {
  success: boolean;
  message: string;
  data?: Motivo;
}
