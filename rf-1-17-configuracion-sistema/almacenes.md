---
id: rf-1-17-almacenes
title: "RF 1.17.7 · Consultar Almacén"
parent: rf-1-17-configuracion-sistema
tags: [almacen, api, rest, java, spring-boot]
---

# 1.17.7 Consultar Almacén

**Descripción (del RF)**: Crear una funcionalidad que permita traer la información de los almacenes registrados en el sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita la consulta de los almacenes registrados en el sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita la consulta de los almacenes.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| codigo | string | No | Código de almacén (búsqueda opcional) |
| tipo | string | No | Tipo de almacén (búsqueda opcional) |

**Fuente textual**: "Los campos de búsqueda serán los siguientes: • Código de almacén: Opcional. • Tipo de almacén: Opcional."

**Nota sobre `bloqueo`**: En la presentación de resultados aparece "Bloqueo del almacén" como obligatorio, pero no se especifica en los campos de búsqueda. **TBD**: aclarar si es parámetro de entrada o solo de salida.

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
GET /api/v1/config/almacenes?codigo={codigo}&tipo={tipo}
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar estructura de ruta y parámetros.

### Respuesta exitosa (200 OK)

```json
{
  "status": {
    "code": 0,
    "message": "Consulta exitosa"
  },
  "data": [
    {
      "codigo": "string",
      "nombre": "string",
      "tipo": "string",
      "direccion": "string",
      "bloqueo": "string",
      "estado": "string"
    }
  ]
}
```

**Campos obligatorios en respuesta** (según RF):
- Código del almacén
- Nombre del almacén
- Tipo de almacén
- Dirección del almacén
- Bloqueo del almacén
- Estado del almacén

**Fuente textual**: "La respuesta obtenida como resultado de la consulta será la siguiente: • Código del almacén: Obligatorio. • Nombre del almacén: Obligatorio. • Tipo de almacén: Obligatorio. • Dirección del almacén: Obligatorio. • Bloqueo del almacén: Obligatorio. • Estado del almacén: Obligatorio."

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Consulta exitosa |
| 400 | Bad Request | Parámetros malformados |
| 422 | Unprocessable Entity | Validación fallida en filtros |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Consulta la información de los almacenes registrados.

Finalizado el proceso, el sistema informará en la respuesta el resultado de la consulta.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Consulta la información de los almacenes registrados. Finalizado el proceso, el sistema informará en la respuesta el resultado de la consulta."

## Presentación de resultados

La respuesta obtenida como resultado de la consulta será la siguiente:

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Código del almacén | Sí | Código único del almacén |
| Nombre del almacén | Sí | Nombre identificativo del almacén |
| Tipo de almacén | Sí | Tipo o categoría del almacén |
| Dirección del almacén | Sí | Ubicación física del almacén |
| Bloqueo del almacén | Sí | Estado de bloqueo/disponibilidad ⚠️ TBD valor |
| Estado del almacén | Sí | Estado del almacén (activo/inactivo/etc.) ⚠️ TBD valor |

**Fuente textual**: "La respuesta obtenida como resultado de la consulta será la siguiente: • Código del almacén: Obligatorio. • Nombre del almacén: Obligatorio. • Tipo de almacén: Obligatorio. • Dirección del almacén: Obligatorio. • Bloqueo del almacén: Obligatorio. • Estado del almacén: Obligatorio."

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
| 1.17.7 Consultar Almacén | # 1.17.7 Consultar Almacén | ✓ Completa |

---

## No-alucinación

| Afirmación en MD | Frase textual del rf-1-17-raw.txt | Verificación |
|-----------------|----------------------------------|--------------|
| 1.17.7: Descripción | "Crear una funcionalidad que permita traer la información de los almacenes registrados en el sistema." | ✓ Textual |
| 1.17.7: Objetivo | "Establecer una funcionalidad que permita la consulta de los almacenes registrados en el sistema." | ✓ Textual |
| 1.17.7: Propuesta | "Crear una funcionalidad en la API que permita la consulta de los almacenes." | ✓ Textual |
| 1.17.7: código almacén opcional | "Código de almacén: Opcional." | ✓ Textual |
| 1.17.7: tipo almacén opcional | "Tipo de almacén: Opcional." | ✓ Textual |
| 1.17.7: procesamiento consulta almacenes | "Consulta la información de los almacenes registrados." | ✓ Textual |
| 1.17.7: respuesta incluye código | "Código del almacén: Obligatorio." | ✓ Textual |
| 1.17.7: respuesta incluye nombre | "Nombre del almacén: Obligatorio." | ✓ Textual |
| 1.17.7: respuesta incluye tipo | "Tipo de almacén: Obligatorio." | ✓ Textual |
| 1.17.7: respuesta incluye direccion | "Dirección del almacén: Obligatorio." | ✓ Textual |
| 1.17.7: respuesta incluye bloqueo | "Bloqueo del almacén: Obligatorio." | ✓ Textual |
| 1.17.7: respuesta incluye estado | "Estado del almacén: Obligatorio." | ✓ Textual |
| 1.17.7: criterio validar entrada | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual |

---

## Especificaciones pendientes (TBD)

- **Campos de entrada adicionales**: Solo se especifican código y tipo como opcionales. ¿Hay otros filtros disponibles (nombre, estado, etc.)? **TBD**.
- **Enumeración de `bloqueo`**: El RF especifica "Bloqueo del almacén: Obligatorio" en respuesta, pero no define valores. Ejemplos posibles: BLOQUEADO, DESBLOQUEADO, DISPONIBLE, etc. **TBD**: valores válidos.
- **Enumeración de `estado`**: El RF especifica "Estado del almacén: Obligatorio" en respuesta, pero no define valores. Ejemplos posibles: ACTIVO, INACTIVO, SUSPENDIDO, etc. **TBD**: valores válidos.
- **Paginación**: No especificada. ¿Se retornan todos los almacenes o hay limit/offset? **TBD**: límite de resultados.
- **Búsqueda casesensitive**: Los filtros no especifican si es case-sensitive. **TBD**: comportamiento de búsqueda.
- **Tipo de almacén**: No se especifica enum de tipos válidos. Ejemplos posibles: GENERAL, CLIMATIZADO, HAZMAT, etc. **TBD**: catálogo de tipos.
- **Autenticación/Autorización**: No mencionada en RF. **TBD**: estrategia de seguridad.
- **Rate limiting**: No mencionado. **TBD**: política de throttling.
- **Validación de formato de código**: No especificada. ¿Formato exacto (longitud, caracteres permitidos)? **TBD**: restricciones de validación.

