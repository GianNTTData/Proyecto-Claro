import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motivo, MotivoFiltros, MotivoRequest, MotivoResponse } from '../models/motivo.model';

/**
 * Servicio para gestión de Motivos de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 * Consume servicios del RF 1.17 (PS) Configuración de sistema
 */
@Injectable({
  providedIn: 'root'
})
export class MotivosService {
  private readonly API_URL = '/api/configuracion/motivos';

  constructor(private http: HttpClient) { }

  /**
   * RF 1.17.1 - Consultar motivo
   * Busca motivos según filtros proporcionados
   */
  consultarMotivos(filtros: MotivoFiltros): Observable<Motivo[]> {
    let params = new HttpParams();
    
    if (filtros.descripcion) {
      params = params.set('descripcion', filtros.descripcion);
    }
    if (filtros.estado) {
      params = params.set('estado', filtros.estado);
    }
    if (filtros.almacenId) {
      params = params.set('almacenId', filtros.almacenId.toString());
    }

    return this.http.get<Motivo[]>(this.API_URL, { params });
  }

  /**
   * RF 1.17.2 - Registrar motivo
   * Registra un nuevo motivo de devolución
   */
  registrarMotivo(motivo: MotivoRequest): Observable<MotivoResponse> {
    return this.http.post<MotivoResponse>(this.API_URL, motivo);
  }

  /**
   * RF 1.17.3 - Actualizar motivo
   * Actualiza un motivo existente
   */
  actualizarMotivo(id: number, motivo: MotivoRequest): Observable<MotivoResponse> {
    return this.http.put<MotivoResponse>(`${this.API_URL}/${id}`, motivo);
  }

  /**
   * Obtiene un motivo por ID
   */
  obtenerMotivoPorId(id: number): Observable<Motivo> {
    return this.http.get<Motivo>(`${this.API_URL}/${id}`);
  }
}
