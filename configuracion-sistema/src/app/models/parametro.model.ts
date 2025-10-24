/**
 * Modelo para Parámetros de Configuración
 * RF 1.28.2 - Parámetros
 */
export interface Parametro {
  id?: number;
  codigo: CodigoParametro;
  cantidad: number;
  unidadMedida: UnidadMedida;
  descripcion?: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
}

/**
 * Códigos de parámetros del sistema
 */
export enum CodigoParametro {
  TIEMPO_RESERVA = 'TIEMPO_RESERVA',
  TIEMPO_BLOQUEO = 'TIEMPO_BLOQUEO'
}

/**
 * Unidades de medida para tiempo
 */
export enum UnidadMedida {
  MINUTOS = 'MINUTOS',
  HORAS = 'HORAS',
  DIAS = 'DIAS'
}

/**
 * Request para registrar/actualizar parámetro
 */
export interface ParametroRequest {
  codigo: CodigoParametro;
  cantidad: number;
  unidadMedida: UnidadMedida;
}

/**
 * Response de operaciones con parámetros
 */
export interface ParametroResponse {
  success: boolean;
  message: string;
  data?: Parametro | Parametro[];
}

/**
 * Configuración completa de parámetros
 */
export interface ConfiguracionParametros {
  tiempoReserva: Parametro;
  tiempoBloqueo: Parametro;
}
