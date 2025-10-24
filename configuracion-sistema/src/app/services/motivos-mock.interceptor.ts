import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { Motivo, EstadoMotivo, MotivoResponse } from '../models/motivo.model';

/**
 * Interceptor HTTP para simular backend RF 1.17.* 
 * Proporciona respuestas mock para desarrollo y testing
 */

// Base de datos mock en memoria
let motivosMock: Motivo[] = [
  {
    id: 1,
    descripcion: 'Producto defectuoso o dañado',
    estado: EstadoMotivo.ACTIVO,
    almacenId: 1
  },
  {
    id: 2,
    descripcion: 'No cumple con las especificaciones',
    estado: EstadoMotivo.ACTIVO,
    almacenId: 1
  },
  {
    id: 3,
    descripcion: 'Entrega incorrecta o incompleta',
    estado: EstadoMotivo.ACTIVO,
    almacenId: 1
  },
  {
    id: 4,
    descripcion: 'Cliente cambió de opinión',
    estado: EstadoMotivo.INACTIVO,
    almacenId: 1
  },
  {
    id: 5,
    descripcion: 'Producto vencido o próximo a vencer',
    estado: EstadoMotivo.ACTIVO,
    almacenId: 1
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

    // Filtrar por descripción (búsqueda parcial)
    const descripcion = params.get('descripcion');
    if (descripcion && descripcion.trim() !== '') {
      resultados = resultados.filter(m => 
        m.descripcion.toLowerCase().includes(descripcion.toLowerCase())
      );
    }

    // Filtrar por estado
    const estado = params.get('estado');
    if (estado) {
      resultados = resultados.filter(m => m.estado === estado);
    }

    // Filtrar por almacén
    const almacenId = params.get('almacenId');
    if (almacenId) {
      resultados = resultados.filter(m => m.almacenId === parseInt(almacenId));
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
      id: nextId++
    };
    
    motivosMock.push(motivoCreado);
    
    const response: MotivoResponse = {
      success: true,
      message: 'Registro realizado satisfactoriamente',
      data: motivoCreado
    };

    console.log('[MOCK] Motivo creado:', motivoCreado);

    return of(new HttpResponse({ 
      status: 201, 
      body: response 
    })).pipe(delay(500));
  }

  // RF 1.17.3 - Actualizar motivo (PUT)
  if (method === 'PUT' && url.includes('/motivos/')) {
    const idMatch = url.match(/\/motivos\/(\d+)$/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      const motivoActualizado = body as Motivo;
      
      const index = motivosMock.findIndex(m => m.id === id);
      if (index !== -1) {
        motivosMock[index] = { 
          ...motivosMock[index], 
          ...motivoActualizado,
          id // Preservar ID original
        };
        
        const response: MotivoResponse = {
          success: true,
          message: 'Registro realizado satisfactoriamente',
          data: motivosMock[index]
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
      body: { success: false, message: 'Motivo no encontrado' }
    })).pipe(delay(500));
  }

  // Si no coincide con ningún endpoint, continuar con la petición original
  return next(req);
};
