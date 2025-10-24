import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parametro, ParametroRequest, ParametroResponse, ConfiguracionParametros } from '../models/parametro.model';

/**
 * Servicio para gestión de Parámetros de Configuración
 * RF 1.28.2 - Parámetros
 * Consume servicios del RF 1.17 (PS) Configuración de sistema
 */
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private readonly API_URL = '/api/configuracion/parametros';

  constructor(private http: HttpClient) { }

  /**
   * RF 1.17.4 - Consultar parámetros
   * Obtiene todos los parámetros del sistema
   */
  consultarParametros(): Observable<Parametro[]> {
    return this.http.get<Parametro[]>(this.API_URL);
  }

  /**
   * Consulta un parámetro específico por código
   */
  consultarParametroPorCodigo(codigo: string): Observable<Parametro> {
    return this.http.get<Parametro>(`${this.API_URL}/${codigo}`);
  }

  /**
   * RF 1.17.5 - Registrar parámetros
   * Registra nuevos parámetros del sistema
   */
  registrarParametro(parametro: ParametroRequest): Observable<ParametroResponse> {
    return this.http.post<ParametroResponse>(this.API_URL, parametro);
  }

  /**
   * RF 1.17.6 - Actualizar parámetros
   * Actualiza parámetros existentes
   */
  actualizarParametro(id: number, parametro: ParametroRequest): Observable<ParametroResponse> {
    return this.http.put<ParametroResponse>(`${this.API_URL}/${id}`, parametro);
  }

  /**
   * Guarda la configuración completa de parámetros
   * (tiempo de reserva y tiempo de bloqueo)
   */
  guardarConfiguracion(config: ParametroRequest[]): Observable<ParametroResponse> {
    return this.http.post<ParametroResponse>(`${this.API_URL}/configuracion`, config);
  }
}
