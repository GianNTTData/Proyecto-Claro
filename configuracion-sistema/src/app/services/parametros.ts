import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parametro, ParametroRequest, ParametroResponse } from '../models/parametro.model';
import { environment } from '../../environments/environment';

/**
 * Estructura de respuesta del Backend según apis-configuracion-spec.md
 */
interface ApiResponseDTO<T> {
  responseStatus: {
    codigoRespuesta: number;
    mensaje: string;
  };
  responseData: T;
}

/**
 * Servicio para gestión de Parámetros de Configuración
 * RF 1.28.2 - Parámetros
 * Consume servicios del RF 1.17 (PS) Configuración de sistema
 */
@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  private readonly API_URL = `${environment.apiBaseUrl}/parametros`;

  constructor(private http: HttpClient) { }

  /**
   * RF 1.17.4 - Consultar parámetros
   * Obtiene la configuración de parámetros del sistema
   * GET /parametros
   */
  consultarParametros(): Observable<Parametro> {
    return this.http.get<ApiResponseDTO<Parametro>>(this.API_URL).pipe(
      map(response => response.responseData)
    );
  }

  /**
   * RF 1.17.5 - Actualizar parámetros
   * Actualiza la configuración de parámetros
   * PUT /parametros
   */
  actualizarParametros(parametro: ParametroRequest): Observable<ParametroResponse> {
    return this.http.put<ApiResponseDTO<ParametroResponse>>(this.API_URL, parametro).pipe(
      map(response => response.responseData)
    );
  }
}