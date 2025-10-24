---
id: rf-1-17-motivos
title: "RF 1.17.x · Motivos (consultar/registrar/actualizar)"
parent: rf-1-17-configuracion-sistema
tags: [motivos, api, rest, java, spring-boot]
---

# 1.17.1 Consultar motivo

**Descripción (del RF)**: Crear una funcionalidad que permita traer la información de los motivos registrados en el sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita la consulta de los motivos registrados en el sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita la consulta de motivos.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| nombre | string | No | Nombre del motivo (búsqueda opcional) |
| estado | string | No | Estado de motivo (búsqueda opcional) |

**Fuente textual**: "Los campos de búsqueda serán los siguientes: • Nombre del motivo: Opcional. • Estado de motivo: Opcional."

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
GET /api/v1/config/motivos?nombre={nombre}&estado={estado}
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar nombre y estructura de ruta.

### Respuesta exitosa (200 OK)

```json
{
  "status": {
    "code": 0,
    "message": "Consulta exitosa"
  },
  "data": [
    {
      "id": "string",
      "nombre": "string",
      "estado": "string"
    }
  ]
}
```

**Campos obligatorios en respuesta** (según RF):
- Identificación del motivo
- Nombre del motivo
- Estado del motivo

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Consulta exitosa |
| 400 | Bad Request | Parámetros malformados |
| 422 | Unprocessable Entity | Validación fallida en filtros |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Consulta la información de los motivos registrados.

Finalizado el proceso, el sistema informará en la respuesta el resultado de la consulta.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Consulta la información de los motivos registrados."

## Criterios de aceptación

- La API deberá validar los datos de entrada.
- Consultar y devolver la información.
- Asegurar un manejo adecuado de errores HTTP.

**Fuente textual**: "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP."

---

# 1.17.2 Registrar motivo

**Descripción (del RF)**: Crear una funcionalidad que permita ingresar la información del motivo en el sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita registrar el motivo en el sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita el registro del motivo en el sistema.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| nombre | string | **Sí** | Nombre de motivo |
| estado | string | **Sí** | Estado del motivo |

**Fuente textual**: "Los campos requeridos serán los siguientes: • Nombre de motivo: Obligatorio. • Estado del motivo: Obligatorio."

**Nota sobre enumeración**: El RF no especifica valores válidos para `estado`. **TBD**: definir enum de estados (ej: ACTIVO, INACTIVO, etc.).

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
POST /api/v1/config/motivos
Content-Type: application/json
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar estructura de ruta.

### Solicitud (Request Body)

```json
{
  "nombre": "string",
  "estado": "string"
}
```

### Respuesta exitosa (201 Created)

```json
{
  "status": {
    "code": 0,
    "message": "Motivo registrado exitosamente"
  },
  "data": {
    "id": "string"
  }
}
```

**Estructura según RF**:
- Estado:
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación
- Datos:
  - Id: Identificación del motivo

### Respuesta de error (201 con código -1)

```json
{
  "status": {
    "code": -1,
    "message": "Descripción del error"
  },
  "data": null
}
```

**Nota**: El RF especifica códigos 0/-1 en el body, pero también requiere manejo de errores HTTP. **TBD**: aclarar si error -1 va en 201 o en 400/422/500.

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 201 | Created | Registro exitoso (código: 0 en body) |
| 400 | Bad Request | Parámetros malformados |
| 422 | Unprocessable Entity | Validación fallida o error -1 |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Registrar la información del motivo.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Registrar la información del motivo."

## Criterios de aceptación

- La API deberá validar los datos de entrada.
- Consultar y devolver la información.
- Asegurar un manejo adecuado de errores HTTP.

**Fuente textual**: "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP."

---

# 1.17.3 Actualizar motivo

**Descripción (del RF)**: Crear una funcionalidad que permita actualizar la información del motivo en el sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita actualizar el motivo en el sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita la actualización del motivo en el sistema.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| id | string | **Sí** | Identificación del motivo |
| nombre | string | **Sí** | Nombre del motivo |
| estado | string | **Sí** | Estado del motivo |

**Fuente textual**: "Los campos requeridos serán los siguientes: • Identificación del motivo: Obligatorio. • Nombre del motivo: Obligatorio. • Estado del motivo: Obligatorio."

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
PUT /api/v1/config/motivos/{id}
Content-Type: application/json
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar estructura de ruta y si `id` va en URL o body.

### Solicitud (Request Body)

```json
{
  "nombre": "string",
  "estado": "string"
}
```

### Respuesta exitosa (200 OK)

```json
{
  "status": {
    "code": 0,
    "message": "Motivo actualizado exitosamente"
  }
}
```

**Estructura según RF**:
- Estado:
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación

### Respuesta de error (200 con código -1)

```json
{
  "status": {
    "code": -1,
    "message": "Descripción del error"
  }
}
```

**Nota**: El RF especifica códigos 0/-1 en el body. **TBD**: aclarar si error -1 va en 200 o en 400/404/422/500.

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Actualización exitosa (código: 0 en body) |
| 400 | Bad Request | Parámetros malformados |
| 404 | Not Found | ID de motivo no encontrado |
| 422 | Unprocessable Entity | Validación fallida o error -1 |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Actualizar la información del motivo.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Actualizar la información del motivo."

## Criterios de aceptación

- La API deberá validar los datos de entrada.
- Consultar y devolver la información.
- Asegurar un manejo adecuado de errores HTTP.

**Fuente textual**: "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP."

---

# Tablas de referencia

## Cobertura del RF

| Sección del RF 1.17 raw | Sección MD | Cobertura |
|------------------------|-----------|-----------|
| 1.17.1 Consultar motivo | # 1.17.1 Consultar motivo | ✓ Completa |
| 1.17.2 Registrar motivo | # 1.17.2 Registrar motivo | ✓ Completa |
| 1.17.3 Actualizar motivo | # 1.17.3 Actualizar motivo | ✓ Completa |

---

## No-alucinación

| Afirmación en MD | Frase textual del rf-1-17-raw.txt | Verificación |
|-----------------|----------------------------------|--------------|
| 1.17.1: Descripción | "Crear una funcionalidad que permita traer la información de los motivos registrados en el sistema." | ✓ Textual |
| 1.17.1: Objetivo | "Establecer una funcionalidad que permita la consulta de los motivos registrados en el sistema." | ✓ Textual |
| 1.17.1: nombre motivo opcional | "Nombre del motivo: Opcional." | ✓ Textual |
| 1.17.1: estado motivo opcional | "Estado de motivo: Opcional." | ✓ Textual |
| 1.17.1: respuesta incluye id | "Identificación del motivo: Obligatorio." | ✓ Textual |
| 1.17.1: respuesta incluye nombre | "Nombre del motivo: Obligatorio." | ✓ Textual |
| 1.17.1: respuesta incluye estado | "Estado del motivo: Obligatorio." | ✓ Textual |
| 1.17.1: procesamiento consulta motivos | "Consulta la información de los motivos registrados." | ✓ Textual |
| 1.17.1: criterio validar entrada | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual |
| 1.17.2: Descripción | "Crear una funcionalidad que permita ingresar la información del motivo en el sistema." | ✓ Textual |
| 1.17.2: Objetivo | "Establecer una funcionalidad que permita registrar el motivo en el sistema." | ✓ Textual |
| 1.17.2: nombre motivo obligatorio | "Nombre de motivo: Obligatorio." | ✓ Textual |
| 1.17.2: estado motivo obligatorio | "Estado del motivo: Obligatorio." | ✓ Textual |
| 1.17.2: respuesta código 0/-1 | "Código: 0: Código de éxito / -1: Error en la operación." | ✓ Textual |
| 1.17.2: respuesta mensaje | "Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 1.17.2: respuesta incluye Id | "Id: Identificación del motivo." | ✓ Textual |
| 1.17.2: procesamiento registra motivo | "Registrar la información del motivo." | ✓ Textual |
| 1.17.2: criterio validar entrada | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual |
| 1.17.3: Descripción | "Crear una funcionalidad que permita actualizar la información del motivo en el sistema." | ✓ Textual |
| 1.17.3: Objetivo | "Establecer una funcionalidad que permita actualizar el motivo en el sistema." | ✓ Textual |
| 1.17.3: id motivo obligatorio | "Identificación del motivo: Obligatorio." | ✓ Textual |
| 1.17.3: nombre motivo obligatorio | "Nombre del motivo: Obligatorio." | ✓ Textual |
| 1.17.3: estado motivo obligatorio | "Estado del motivo: Obligatorio." | ✓ Textual |
| 1.17.3: respuesta código 0/-1 | "Código: 0: Código de éxito / -1: Error en la operación." | ✓ Textual |
| 1.17.3: respuesta mensaje | "Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 1.17.3: procesamiento actualiza motivo | "Actualizar la información del motivo." | ✓ Textual |
| 1.17.3: criterio validar entrada | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual |

---

## Especificaciones pendientes (TBD)

- **Enumeración de `estado`**: El RF no especifica valores válidos. Ejemplos posibles: `ACTIVO`, `INACTIVO`, `SUSPENDIDO`, etc. **TBD**: confirmar valores.
- **Estructura de respuesta de error**: El RF usa códigos 0/-1 en body, pero también requiere errores HTTP. ¿Va el código -1 en HTTP 422 o permanece en 200/201? **TBD**: clarificar.
- **Paginación en consultas**: No especificada para 1.17.1. ¿Incluir limit/offset? **TBD**.
- **Búsqueda casesensitive**: Los filtros en 1.17.1 no especifican. **TBD**: comportamiento de búsqueda.
- **Autenticación/Autorización**: No mencionada en RF. **TBD**: estrategia de seguridad.
- **Rate limiting**: No mencionado. **TBD**: política de throttling.
- **Validación de caracteres especiales**: No especificada para campos nombre/estado. **TBD**: caracteres permitidos.

