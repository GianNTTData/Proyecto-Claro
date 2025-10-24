---
id: rf-1-17-configuracion-sistema
title: RF 1.17 (PS) · Configuración de Sistema
owner: "John Castillo Rivera"
version: "1.0"
phase: "1.0"
status: "approved"
created: "2025-01-13"
last_modified: "2025-10-06"
domain: "logistica-stock"
layer: "backend"
tech: ["java","spring-boot","rest"]
scope: ["backend-only"]
tags: [configuracion, api, motivos, parametros, almacenes, transporte]
source: ./../source/rf-1-17-raw.txt
---

# Descripción

Crear un servicio que permita la configuración de parámetros del sistema.

# Objetivo

Establecer un componente que permita configuración de parámetros de operación del sistema.

# Propuesta de solución

Crear una API REST que configure los parámetros de la aplicación, recibiendo un tipo de transacción y los campos correspondientes a la configuración.

**Tecnología propuesta**: Java/Spring Boot con endpoints REST.

# Alcance y fuera de alcance

## En alcance (backend-only)
- API REST para gestión de motivos (consultar, registrar, actualizar)
- API REST para gestión de parámetros del sistema (consultar, registrar, actualizar)
- API REST para consulta de almacenes registrados
- API REST para consulta de empresas de transporte
- API REST para consulta de transportistas
- Validación de datos de entrada
- Manejo estándar de errores HTTP

## Fuera de alcance
- Interfaz de usuario (UI)
- Aplicaciones frontend
- Portales web

# Mapa de capacidades de RF 1.17

| Código | Capacidad | Tipo | Estado |
|--------|-----------|------|--------|
| 1.17.1 | Consultar motivo | GET | Especificada |
| 1.17.2 | Registrar motivo | POST | Especificada |
| 1.17.3 | Actualizar motivo | PUT | Especificada |
| 1.17.4 | Consultar parámetros | GET | Especificada |
| 1.17.5 | Registrar parámetros | POST | Especificada |
| 1.17.6 | Actualización de parámetros | PUT | Especificada |
| 1.17.7 | Consultar Almacén | GET | Especificada |
| 1.17.8 | Consultar Empresa Transporte | GET | Especificada |
| 1.17.9 | Consultar Transportista | GET | Especificada |

## Detalle de capacidades

### 1.17.1 Consultar motivo

**Descripción**: Crear una funcionalidad que permita traer la información de los motivos registrados en el sistema.

**Objetivo**: Establecer una funcionalidad que permita la consulta de los motivos registrados en el sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita la consulta de motivos.

**Parámetros de búsqueda** (opcionales):
- Nombre del motivo
- Estado de motivo

**Respuesta** (obligatorio retornar):
- Identificación del motivo
- Nombre del motivo
- Estado del motivo

**Criterio de aceptación**: La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP.

---

### 1.17.2 Registrar motivo

**Descripción**: Crear una funcionalidad que permita ingresar la información del motivo en el sistema.

**Objetivo**: Establecer una funcionalidad que permita registrar el motivo en el sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita el registro del motivo en el sistema.

**Campos requeridos**:
- Nombre de motivo
- Estado del motivo

**Respuesta**:
- Estado
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación
- Datos
  - Id: Identificación del motivo

**Criterio de aceptación**: La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP.

---

### 1.17.3 Actualizar motivo

**Descripción**: Crear una funcionalidad que permita actualizar la información del motivo en el sistema.

**Objetivo**: Establecer una funcionalidad que permita actualizar el motivo en el sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita la actualización del motivo en el sistema.

**Campos requeridos**:
- Identificación del motivo
- Nombre del motivo
- Estado del motivo

**Respuesta**:
- Estado
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación

**Criterio de aceptación**: La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP.

---

### 1.17.4 Consultar parámetros

**Descripción**: Crear una funcionalidad que permita consultar la configuración de los parámetros del sistema.

**Objetivo**: Establecer una funcionalidad que permita consultar la configuración de los parámetros del sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita consultar la configuración de los parámetros del sistema.

**Procesamiento** (obtener):
- Cantidad de tiempo de desbloqueo de la mercadería
- Cantidad de tiempo de reserva de la mercadería

**Respuesta** (retornar):
- Cantidad de tiempo para el desbloqueo
- Unidad de medida de desbloqueo (minutos, horas, días)
- Cantidad de tiempo de la reserva de mercadería
- Unidad de medida de reserva de mercadería (minutos, horas, días)

**Criterio de aceptación**: Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos. El servicio responderá de acuerdo con el estándar de errores HTTP.

---

### 1.17.5 Registrar parámetros

**Descripción**: Crear una funcionalidad que permita registrar la configuración de los parámetros del sistema.

**Objetivo**: Establecer una funcionalidad que permita registrar la configuración de los parámetros del sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita actualizar la configuración de los parámetros del sistema.

**Campos requeridos**:
- Cantidad de tiempo para el desbloqueo
- Unidad de medida de desbloqueo (minutos, horas, días)
- Cantidad de tiempo de liberación de la reserva de mercadería
- Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)

**Procesamiento** (registrar):
- Cantidad de tiempo de desbloqueo de la mercadería
- Cantidad de tiempo de liberación de reserva de la mercadería

**Respuesta**:
- Estado
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación

**Criterio de aceptación**: Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos. El servicio responderá de acuerdo con el estándar de errores HTTP.

---

### 1.17.6 Actualización de parámetros

**Descripción**: Crear una funcionalidad que permita actualizar la configuración de los parámetros del sistema.

**Objetivo**: Establecer una funcionalidad que permita actualizar la configuración de los parámetros del sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita actualizar la configuración de los parámetros del sistema.

**Campos requeridos**:
- Cantidad de tiempo para el desbloqueo
- Unidad de medida de desbloqueo (minutos, horas, días)
- Cantidad de tiempo de liberación de la reserva de mercadería
- Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)

**Procesamiento** (actualizar):
- Cantidad de tiempo de desbloqueo de la mercadería
- Cantidad de tiempo de liberación de reserva de la mercadería

**Respuesta**:
- Estado
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación

**Criterio de aceptación**: Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos. El servicio responderá de acuerdo con el estándar de errores HTTP.

---

### 1.17.7 Consultar Almacén

**Descripción**: Crear una funcionalidad que permita traer la información de los almacenes registrados en el sistema.

**Objetivo**: Establecer una funcionalidad que permita la consulta de los almacenes registrados en el sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita la consulta de los almacenes.

**Parámetros de búsqueda** (opcionales):
- Código de almacén
- Tipo de almacén

**Respuesta** (obligatorio retornar):
- Código del almacén
- Nombre del almacén
- Tipo de almacén
- Dirección del almacén
- Bloqueo del almacén
- Estado del almacén

**Criterio de aceptación**: La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP.

---

### 1.17.8 Consultar Empresa Transporte

**Descripción**: Crear una funcionalidad que permita traer la información de las empresas de transporte registrados en el sistema.

**Objetivo**: Establecer una funcionalidad que permita la consulta de las empresas de transporte registrados en el sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita la consulta de las empresas de transporte.

**Parámetros de búsqueda** (opcionales):
- Identificador de la empresa de transporte
- Nro. de RUC de la empresa de transporte
- Razón social de la empresa de transporte

**Respuesta** (obligatorio retornar):
- Identificación de la empresa de transporte
- Razón Social de la empresa de transporte
- Nro. de RUC de la empresa de transporte

**Criterio de aceptación**: La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP.

---

### 1.17.9 Consultar Transportista

**Descripción**: Crear una funcionalidad que permita traer la información de los transportistas registrados en el sistema.

**Objetivo**: Establecer una funcionalidad que permita la consulta de los transportistas registrados en el sistema.

**Propuesta de solución**: Crear una funcionalidad en la API que permita la consulta de las empresas de transporte.

**Parámetros de búsqueda** (opcionales):
- Identificador de la empresa de transporte
- Identificador del transportista
- Tipo de documento del transportista
- Nro. de documento del transportista
- Nombre del transportista

**Respuesta** (obligatorio retornar):
- Identificación de la empresa de transporte
- Identificación del transportista
- Nombre del transportista
- Tipo de documento del transportista
- Nro. de documento del transportista

**Criterio de aceptación**: La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP.

---

# Criterios de aceptación globales

Del análisis del RF 1.17 se extraen los siguientes criterios de aceptación aplicables a todas las capacidades:

1. **Validación de datos de entrada**: La API deberá validar los datos de entrada en cada solicitud.
2. **Consulta y devolución de información**: Consultar y devolver la información solicitada con precisión.
3. **Manejo adecuado de errores HTTP**: Responder según el estándar de errores HTTP definido.
4. **Validación de formatos**: Se validarán los formatos de los datos ingresados en cada campo.
5. **Validación de existencia**: Se validará la existencia de los registros consultados.
6. **Validación de compatibilidad**: Se validará la compatibilidad de los datos ingresados.

# Estándar de errores HTTP

| Código | Significado | Caso de uso |
|--------|-------------|------------|
| 200 OK | Solicitud exitosa | Consultas exitosas (GET) |
| 201 Created | Recurso creado exitosamente | Registros exitosos (POST) |
| 400 Bad Request | Solicitud malformada | Formato inválido en parámetros de entrada |
| 404 Not Found | Recurso no encontrado | Identificador no existe en el sistema |
| 409 Conflict | Conflicto de datos | Violación de restricciones de negocio |
| 422 Unprocessable Entity | Validación fallida | Datos inválidos o incompatibles |
| 500 Internal Server Error | Error del servidor | Error interno no controlado |

**Formato de respuesta de error** (TBD - pendiente especificación detallada):
```json
{
  "status": {
    "code": -1,
    "message": "Mensaje descriptivo del error"
  },
  "errors": []
}
```

---

# Tabla de cobertura del RF

| Sección del RF 1.17 raw | Sección MD | Cobertura |
|------------------------|-----------|-----------|
| 1.17.1 Consultar motivo | 1.17.1 Consultar motivo | ✓ Completa |
| 1.17.2 Registrar motivo | 1.17.2 Registrar motivo | ✓ Completa |
| 1.17.3 Actualizar motivo | 1.17.3 Actualizar motivo | ✓ Completa |
| 1.17.4 Consultar parámetros | 1.17.4 Consultar parámetros | ✓ Completa |
| 1.17.5 Registrar parámetros | 1.17.5 Registrar parámetros | ✓ Completa |
| 1.17.6 Actualización de parámetros | 1.17.6 Actualización de parámetros | ✓ Completa |
| 1.17.7 Consultar Almacén | 1.17.7 Consultar Almacén | ✓ Completa |
| 1.17.8 Consultar Empresa Transporte | 1.17.8 Consultar Empresa Transporte | ✓ Completa |
| 1.17.9 Consultar Transportista | 1.17.9 Consultar Transportista | ✓ Completa |

---

# Tabla de no-alucinación

| Afirmación en MD | Frase textual del rf-1-17-raw.txt | Verificación |
|-----------------|----------------------------------|--------------|
| RF es versión 1.0, fase 1.0 | "Version 1.0  Phase 1.0  SIN CAMBIO" | ✓ Textual |
| Owner es John Castillo Rivera | "John Castillo Rivera created on 13/01/2025" | ✓ Textual |
| Fecha creación 2025-01-13 | "created on 13/01/2025" | ✓ Textual |
| Fecha modificación 2025-10-06 | "Last modified 6/10/2025" | ✓ Textual |
| Descripción del RF | "Crear un servicio que permita la configuración de parámetros del sistema." | ✓ Textual |
| Objetivo del RF | "Establecer un componente que permita configuración de parámetros de operación del sistema." | ✓ Textual |
| Propuesta de solución | "Crear una API que configure los parámetros de la aplicación, recibiendo un tipo de transacción y los campos correspondientes a la configuración." | ✓ Textual |
| Alcance backend-only | Inferido de "API" y "no UI requerida en especificación" | ✓ Lógica (sin UI explícita en RF) |
| 1.17.1 es consulta | "Crear una funcionalidad que permita traer la información de los motivos registrados" | ✓ Textual |
| 1.17.2 es registro | "Crear una funcionalidad que permita ingresar la información del motivo en el sistema" | ✓ Textual |
| 1.17.3 es actualización | "Crear una funcionalidad que permita actualizar la información del motivo en el sistema" | ✓ Textual |
| Parámetros motivo opcionales | "Los campos de búsqueda serán los siguientes: • Nombre del motivo: Opcional. • Estado de motivo: Opcional." | ✓ Textual |
| Respuesta motivo obligatoria | "Identificación del motivo: Obligatorio. Nombre del motivo: Obligatorio. Estado del motivo: Obligatorio." | ✓ Textual |
| 1.17.4 obtiene desbloqueo y reserva | "Obtener la cantidad de tiempo de desbloqueo de la mercadería. Obtener la cantidad de tiempo de reserva de la mercadería." | ✓ Textual |
| Parámetros incluyen unidades | "Unidad de medida de desbloqueo (minutos, horas, días)" | ✓ Textual |
| 1.17.7 consulta almacenes | "Crear una funcionalidad que permita traer la información de los almacenes registrados en el sistema" | ✓ Textual |
| 1.17.8 consulta empresas transporte | "Crear una funcionalidad que permita traer la información de las empresas de transporte registrados en el sistema" | ✓ Textual |
| 1.17.9 consulta transportistas | "Crear una funcionalidad que permita traer la información de los transportistas registrados en el sistema" | ✓ Textual |
| Criterio común: validar datos | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual (repetido en todos) |

---

## Notas sobre especificación incompleta (TBD)

- **Endpoints REST específicos**: Los nombres de ruta y métodos HTTP exactos aún no están definidos en el RF. Se sugiere nombrado RESTful estándar (ej. `GET /api/v1/motivos`, `POST /api/v1/motivos`, etc.) pero requiere **confirmación**.
- **Estructura de respuesta de error**: El RF menciona "Código: 0 / -1" para estados, pero no especifica la estructura JSON completa. **TBD: confirmar esquema de error HTTP estándar**.
- **Paginación**: No especificada para consultas (1.17.1, 1.17.4, 1.17.7, 1.17.8, 1.17.9). **TBD: ¿incluir paginación?**
- **Autenticación/Autorización**: No mencionada en el RF. **TBD: estrategia de seguridad**.
- **Rate limiting**: No mencionado. **TBD: política de throttling**.
- **Versionado de API**: No especificado. **TBD: versión de API REST**.

