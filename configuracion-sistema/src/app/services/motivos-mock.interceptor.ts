import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { Motivo, MotivoResponse } from '../models/motivo.model';

/**
 * Interceptor HTTP para simular backend RF 1.17.* 
 * Proporciona respuestas mock para desarrollo y testing
 */

// Base de datos mock en memoria
let motivosMock: Motivo[] = [
  {
    id: '1',
    nombreMotivo: 'Producto defectuoso o dañado',
    estadoMotivo: 'ACTIVO'
  },
  {
    id: '2',
    nombreMotivo: 'No cumple con las especificaciones',
    estadoMotivo: 'ACTIVO'
  },
  {
    id: '3',
    nombreMotivo: 'Entrega incorrecta o incompleta',
    estadoMotivo: 'ACTIVO'
  },
  {
    id: '4',
    nombreMotivo: 'Cliente cambió de opinión',
    estadoMotivo: 'INACTIVO'
  },
  {
    id: '5',
    nombreMotivo: 'Producto vencido o próximo a vencer',
    estadoMotivo: 'ACTIVO'
  }
];

let nextId = 6;

export const motivosMockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method, body } = req;

  // Solo interceptar llamadas a /api/configuracion/motivos
  if (!url.includes('/api/configuracion/motivos')) {
    return next(req);
  }

  console.log(`[MOCK] ${method} ${url}`, body);

  // RF 1.17.1 - Consultar motivo (GET)
  if (method === 'GET' && url.endsWith('/motivos')) {
    const params = req.params;
    let resultados = [...motivosMock];

    // Filtrar por nombreMotivo (búsqueda parcial)
    const nombreMotivo = params.get('nombreMotivo');
    if (nombreMotivo && nombreMotivo.trim() !== '') {
      resultados = resultados.filter(m => 
        m.nombreMotivo.toLowerCase().includes(nombreMotivo.toLowerCase())
      );
    }

    // Filtrar por estadoMotivo
    const estadoMotivo = params.get('estadoMotivo');
    if (estadoMotivo) {
      resultados = resultados.filter(m => m.estadoMotivo === estadoMotivo);
    }

    console.log(`[MOCK] Retornando ${resultados.length} motivos`, resultados);

    return of(new HttpResponse({ 
      status: 200, 
      body: resultados 
    })).pipe(delay(500)); // Simula latencia de red
  }

  // RF 1.17.2 - Registrar motivo (POST)
  if (method === 'POST' && url.endsWith('/motivos')) {
    const nuevoMotivo = body as Motivo;
    const motivoCreado: Motivo = {
      ...nuevoMotivo,
      id: String(nextId++)
    };
    
    motivosMock.push(motivoCreado);
    
    const response: MotivoResponse = {
      id: motivoCreado.id!,
      nombreMotivo: motivoCreado.nombreMotivo,
      estadoMotivo: motivoCreado.estadoMotivo
    };

    console.log('[MOCK] Motivo creado:', motivoCreado);

    return of(new HttpResponse({ 
      status: 201, 
      body: response 
    })).pipe(delay(500));
  }

  // RF 1.17.3 - Actualizar motivo (PUT)
  if (method === 'PUT' && url.includes('/motivos/')) {
    const idMatch = url.match(/\/motivos\/(\w+)$/);
    if (idMatch) {
      const id = idMatch[1];
      const motivoActualizado = body as Motivo;
      
      const index = motivosMock.findIndex(m => m.id === id);
      if (index !== -1) {
        motivosMock[index] = { 
          ...motivosMock[index], 
          ...motivoActualizado,
          id // Preservar ID original
        };
        
        const response: MotivoResponse = {
          id: motivosMock[index].id!,
          nombreMotivo: motivosMock[index].nombreMotivo,
          estadoMotivo: motivosMock[index].estadoMotivo
        };

        console.log('[MOCK] Motivo actualizado:', motivosMock[index]);

        return of(new HttpResponse({ 
          status: 200, 
          body: response 
        })).pipe(delay(500));
      }
    }

    // Si no se encuentra, retornar error
    return of(new HttpResponse({ 
      status: 404, 
      body: { message: 'Motivo no encontrado' }
    })).pipe(delay(500));
  }

  // Si no coincide con ningún endpoint, continuar con la petición original
  return next(req);
};
