import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../environments/environment';

/**
 * Interceptor HTTP para agregar headers de trazabilidad requeridos por el Backend
 * Según apis-configuracion-spec.md y EDS
 *
 * Headers agregados:
 * - idApp: Identificador de aplicación
 * - idCorrelacion: ID de correlación única por sesión
 * - idMsg: ID único del mensaje/petición
 * - idTransaccion: ID de transacción
 * - timestamp: ISO 8601 format
 * - Authorization: Bearer token (si existe)
 */
@Injectable()
export class TracingInterceptor implements HttpInterceptor {
  private sessionId: string;
  private correlationId: string;

  constructor() {
    // Generar IDs únicos para la sesión
    this.sessionId = uuidv4();
    this.correlationId = uuidv4();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // DEBUG: Log para verificar si el interceptor se ejecuta
    console.log('[TracingInterceptor] Interceptando:', request.url);
    console.log('[TracingInterceptor] apiBaseUrl:', environment.apiBaseUrl);
    console.log('[TracingInterceptor] Incluye apiBaseUrl?', request.url.includes(environment.apiBaseUrl));
    
    // Solo aplicar a peticiones del API backend
    if (!request.url.includes(environment.apiBaseUrl)) {
      console.log('[TracingInterceptor] URL no coincide, pasando sin modificar');
      return next.handle(request);
    }
    
    console.log('[TracingInterceptor] Aplicando headers de trazabilidad');

    // Generar IDs únicos para esta petición
    const messageId = uuidv4();
    const transactionId = this.generateTransactionId();

    // Generar timestamp en formato compatible con Spring Boot LocalDateTime
    // Formato esperado: yyyy-MM-ddTHH:mm:ss
    // Ejemplo: 2025-10-28T14:23:45
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    
    console.log('[TracingInterceptor] Timestamp generado:', timestamp);

    // Clonar la petición y agregar headers de trazabilidad
    let clonedRequest = request.clone({
      setHeaders: {
        'idApp': 'CONFIGURACION-SISTEMA',
        'idCorrelacion': this.correlationId,
        'idMsg': messageId,
        'idTransaccion': transactionId,
        'idUsuario': 'USER-DEFAULT',  // TODO: Obtener del servicio de autenticación
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Agregar timestamp como query parameter
    clonedRequest = clonedRequest.clone({
      url: this.addTimestampToUrl(clonedRequest.url, timestamp)
    });

    // Agregar Authorization si existe en localStorage
    const token = this.getAuthToken();
    if (token) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Log para debugging
    if (environment.logging.enabled) {
      console.log(`[HTTP] ${clonedRequest.method} ${clonedRequest.url}`);
      console.log('[HTTP] Headers enviados:', {
        idApp: clonedRequest.headers.get('idApp'),
        idCorrelacion: clonedRequest.headers.get('idCorrelacion'),
        idMsg: clonedRequest.headers.get('idMsg'),
        idTransaccion: clonedRequest.headers.get('idTransaccion'),
        idUsuario: clonedRequest.headers.get('idUsuario'),
        'Content-Type': clonedRequest.headers.get('Content-Type')
      });
      console.log('[HTTP] Timestamp:', timestamp);
    }

    return next.handle(clonedRequest);
  }

  /**
   * Agregar timestamp como query parameter
   */
  private addTimestampToUrl(url: string, timestamp: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}timestamp=${encodeURIComponent(timestamp)}`;
  }

  /**
   * Generar ID de transacción (puede ser correlación + número aleatorio)
   */
  private generateTransactionId(): string {
    return `${this.correlationId.substring(0, 8)}-${Date.now()}`;
  }

  /**
   * Obtener token de autenticación del almacenamiento local
   */
  private getAuthToken(): string | null {
    // TODO: Implementar lógica de obtención de token desde localStorage o servicio de autenticación
    return localStorage.getItem('auth_token') || null;
  }
}
