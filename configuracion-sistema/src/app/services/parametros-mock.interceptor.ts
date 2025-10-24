import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { Parametro, CodigoParametro, UnidadMedida, ParametroResponse } from '../models/parametro.model';

/**
 * Interceptor HTTP para simular backend RF 1.17.4/5/6
 * Proporciona respuestas mock para desarrollo y testing de parámetros
 */

// Base de datos mock en memoria
let parametrosMock: Parametro[] = [
  {
    id: 1,
    codigo: CodigoParametro.TIEMPO_RESERVA,
    cantidad: 24,
    unidadMedida: UnidadMedida.HORAS,
    descripcion: 'Tiempo de vigencia para una reserva de mercadería',
    fechaCreacion: new Date('2025-01-15'),
    fechaModificacion: new Date('2025-01-15')
  },
  {
    id: 2,
    codigo: CodigoParametro.TIEMPO_BLOQUEO,
    cantidad: 48,
    unidadMedida: UnidadMedida.HORAS,
    descripcion: 'Tiempo de vigencia para un bloqueo de mercadería',
    fechaCreacion: new Date('2025-01-15'),
    fechaModificacion: new Date('2025-01-15')
  }
];

let nextId = 3;

export const parametrosMockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;

  // Solo interceptar llamadas a /api/configuracion/parametros
  if (!url.includes('/api/configuracion/parametros')) {
    return next(req);
  }

  console.log(`[MOCK PARAMETROS] ${method} ${url}`, body);

  // RF 1.17.4 - Consultar parámetros (GET)
  if (method === 'GET' && url.endsWith('/parametros')) {
    console.log(`[MOCK PARAMETROS] Retornando ${parametrosMock.length} parámetros`, parametrosMock);

    return of(new HttpResponse({ 
      status: 200, 
      body: parametrosMock 
    })).pipe(delay(500)); // Simula latencia de red
  }

  // Consultar parámetro específico por código (GET /:codigo)
  if (method === 'GET' && url.match(/\/parametros\/[A-Z_]+$/)) {
    const codigoMatch = url.match(/\/parametros\/([A-Z_]+)$/);
    if (codigoMatch) {
      const codigo = codigoMatch[1];
      const parametro = parametrosMock.find(p => p.codigo === codigo);
      
      if (parametro) {
        console.log('[MOCK PARAMETROS] Parámetro encontrado:', parametro);
        return of(new HttpResponse({ 
          status: 200, 
          body: parametro 
        })).pipe(delay(500));
      }
      
      return of(new HttpResponse({ 
        status: 404, 
        body: { success: false, message: 'Parámetro no encontrado' }
      })).pipe(delay(500));
    }
  }

  // RF 1.17.5 - Registrar parámetro (POST)
  if (method === 'POST' && url.endsWith('/parametros')) {
    const nuevoParametro = body as Parametro;
    
    // Verificar si ya existe un parámetro con ese código
    const existente = parametrosMock.find(p => p.codigo === nuevoParametro.codigo);
    if (existente) {
      console.log('[MOCK PARAMETROS] Parámetro ya existe, usar PUT en su lugar');
      return of(new HttpResponse({ 
        status: 400, 
        body: { 
          success: false, 
          message: 'El parámetro ya existe, use actualización en su lugar' 
        }
      })).pipe(delay(500));
    }

    const parametroCreado: Parametro = {
      ...nuevoParametro,
      id: nextId++,
      fechaCreacion: new Date(),
      fechaModificacion: new Date()
    };
    
    parametrosMock.push(parametroCreado);
    
    const response: ParametroResponse = {
      success: true,
      message: 'Parámetro registrado satisfactoriamente',
      data: parametroCreado
    };

    console.log('[MOCK PARAMETROS] Parámetro creado:', parametroCreado);

    return of(new HttpResponse({ 
      status: 201, 
      body: response 
    })).pipe(delay(500));
  }

  // RF 1.17.6 - Actualizar parámetro (PUT)
  if (method === 'PUT' && url.includes('/parametros/')) {
    const idMatch = url.match(/\/parametros\/(\d+)$/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      const parametroActualizado = body as Parametro;
      
      const index = parametrosMock.findIndex(p => p.id === id);
      if (index !== -1) {
        parametrosMock[index] = { 
          ...parametrosMock[index], 
          ...parametroActualizado,
          id, // Preservar ID original
          fechaModificacion: new Date()
        };
        
        const response: ParametroResponse = {
          success: true,
          message: 'Parámetro actualizado satisfactoriamente',
          data: parametrosMock[index]
        };

        console.log('[MOCK PARAMETROS] Parámetro actualizado:', parametrosMock[index]);

        return of(new HttpResponse({ 
          status: 200, 
          body: response 
        })).pipe(delay(500));
      }
    }

    // Si no se encuentra, retornar error
    return of(new HttpResponse({ 
      status: 404, 
      body: { success: false, message: 'Parámetro no encontrado' }
    })).pipe(delay(500));
  }

  // Si no coincide con ningún endpoint, continuar con la petición original
  return next(req);
};
