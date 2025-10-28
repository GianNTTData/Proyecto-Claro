import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { Parametro, ParametroResponse } from '../models/parametro.model';

/**
 * Interceptor HTTP para simular backend RF 1.17.4/5
 * Proporciona respuestas mock para desarrollo y testing de parámetros
 */

// Base de datos mock en memoria (configuración actual)
let parametrosMock: Parametro = {
  cantidadTiempoDesbloqueo: 48,
  unidadMedidaTiempoDesbloqueo: 'horas',
  cantidadTiempoReserva: 24,
  unidadMedidaTiempoReserva: 'horas'
};

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

export const parametrosMockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;

  // Solo interceptar llamadas a /api/configuracion/parametros
  if (!url.includes('/api/configuracion/parametros')) {
    return next(req);
  }

  console.log(`[MOCK PARAMETROS] ${method} ${url}`, body);

  // RF 1.17.4 - Consultar parámetros (GET)
  if (method === 'GET' && url.endsWith('/parametros')) {
    console.log('[MOCK PARAMETROS] Retornando parámetros:', parametrosMock);

    const response: ApiResponseDTO<Parametro> = {
      responseStatus: {
        codigoRespuesta: 0,
        mensaje: 'Consulta exitosa'
      },
      responseData: parametrosMock
    };

    return of(new HttpResponse({ 
      status: 200, 
      body: response 
    })).pipe(delay(500));
  }

  // RF 1.17.5 - Actualizar parámetros (PUT)
  if (method === 'PUT' && url.endsWith('/parametros')) {
    const parametroActualizado = body as Parametro;
    
    parametrosMock = {
      ...parametrosMock,
      ...parametroActualizado
    };
    
    const responseData: ParametroResponse = {
      cantidadTiempoDesbloqueo: parametrosMock.cantidadTiempoDesbloqueo!,
      unidadMedidaTiempoDesbloqueo: parametrosMock.unidadMedidaTiempoDesbloqueo!,
      cantidadTiempoReserva: parametrosMock.cantidadTiempoReserva!,
      unidadMedidaTiempoReserva: parametrosMock.unidadMedidaTiempoReserva!
    };

    const response: ApiResponseDTO<ParametroResponse> = {
      responseStatus: {
        codigoRespuesta: 0,
        mensaje: 'Actualización exitosa'
      },
      responseData: responseData
    };

    console.log('[MOCK PARAMETROS] Parámetros actualizados:', parametrosMock);

    return of(new HttpResponse({ 
      status: 200, 
      body: response 
    })).pipe(delay(500));
  }

  // Si no coincide con ningún endpoint, continuar con la petición original
  return next(req);
};
