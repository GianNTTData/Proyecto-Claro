import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Motivo, MotivoFiltros, MotivoRequest, MotivoResponse } from '../models/motivo.model';
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
 * Servicio para gestión de Motivos de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 * Consume servicios del RF 1.17 (PS) Configuración de sistema
 */
@Injectable({
  providedIn: 'root'
})
export class MotivosService {
  private readonly API_URL = `${environment.apiBaseUrl}/motivos`;

  constructor(private http: HttpClient) { }

  /**
   * RF 1.17.1 - Consultar motivo
   * Busca motivos según filtros proporcionados
   */
  consultarMotivos(filtros: MotivoFiltros): Observable<Motivo[]> {
    let params = new HttpParams();
    
    // Los parámetros ya tienen los nombres correctos: nombreMotivo y estadoMotivo
    if (filtros.nombreMotivo) {
      params = params.set('nombreMotivo', filtros.nombreMotivo);
    }
    if (filtros.estadoMotivo) {
      params = params.set('estadoMotivo', filtros.estadoMotivo);
    }

    // El Backend devuelve ApiResponseDTO<List<MotivoResponseDTO>>
    // Necesitamos extraer responseData
    return this.http.get<ApiResponseDTO<Motivo[]>>(this.API_URL, { params }).pipe(
      map(response => response.responseData || [])
    );
  }

  /**
   * RF 1.17.2 - Registrar motivo
   * Registra un nuevo motivo de devolución
   */
  registrarMotivo(motivo: MotivoRequest): Observable<MotivoResponse> {
    // El Backend devuelve ApiResponseDTO<MotivoResponseDTO>
    return this.http.post<ApiResponseDTO<MotivoResponse>>(this.API_URL, motivo).pipe(
      map(response => response.responseData)
    );
  }

  /**
   * RF 1.17.3 - Actualizar motivo
   * Actualiza un motivo existente
   */
  actualizarMotivo(id: string, motivo: MotivoRequest): Observable<MotivoResponse> {
    // El Backend devuelve ApiResponseDTO<Void> para PUT
    // Devolvemos un observable vacío o el motivo actualizado
    return this.http.put<ApiResponseDTO<any>>(`${this.API_URL}/${id}`, motivo).pipe(
      map(response => motivo as any)
    );
  }

  /**
   * Obtiene un motivo por ID
   */
  obtenerMotivoPorId(id: string): Observable<Motivo> {
    return this.http.get<Motivo>(`${this.API_URL}/${id}`);
  }
}
