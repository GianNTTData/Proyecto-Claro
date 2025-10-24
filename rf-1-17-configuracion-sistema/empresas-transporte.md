---
id: rf-1-17-empresas-transporte
title: "RF 1.17.8 · Consultar Empresa Transporte"
parent: rf-1-17-configuracion-sistema
tags: [transporte, empresa, api, rest, java, spring-boot]
---

# 1.17.8 Consultar Empresa Transporte

**Descripción (del RF)**: Crear una funcionalidad que permita traer la información de las empresas de transporte registrados en el sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita la consulta de las empresas de transporte registrados en el sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita la consulta de las empresas de transporte.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| id | string | No | Identificador de la empresa de transporte (búsqueda opcional) |
| ruc | string | No | Nro. de RUC de la empresa de transporte (búsqueda opcional) |
| razonSocial | string | No | Razón social de la empresa de transporte (búsqueda opcional) |

**Fuente textual**: "Los campos de búsqueda serán los siguientes: • Identificador de la empresa de transporte: Opcional. • Nro. de RUC de la empresa de transporte: Opcional. • Razón social de la empresa de transporte: Opcional."

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
GET /api/v1/config/empresas-transporte?id={id}&ruc={ruc}&razonSocial={razonSocial}
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
      "id": "string",
      "razonSocial": "string",
      "ruc": "string"
    }
  ]
}
```

**Campos obligatorios en respuesta** (según RF):
- Identificación de la empresa de transporte
- Razón Social de la empresa de transporte
- Nro. de RUC de la empresa de transporte

**Fuente textual**: "La respuesta obtenida como resultado de la consulta será la siguiente: • Identificación de la empresa de transporte: Obligatorio. • Razón Social de la empresa de transporte: Obligatorio. • Nro. de RUC de la empresa de transporte: Obligatorio."

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

**⚠️ NOTA IMPORTANTE**: El RF 1.17.8 textualmente dice "Consulta la información de los **almacenes** registrados" pero debería ser "empresas de transporte". **TBD**: confirmar si es error del RF o si hay relación entre almacenes y empresas de transporte.

## Presentación de resultados

La respuesta obtenida como resultado de la consulta será la siguiente:

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Identificación de la empresa de transporte | Sí | ID único de la empresa de transporte |
| Razón Social de la empresa de transporte | Sí | Nombre legal/comercial de la empresa |
| Nro. de RUC de la empresa de transporte | Sí | Número de RUC (Registro Único del Contribuyente) |

**Fuente textual**: "La respuesta obtenida como resultado de la consulta será la siguiente: • Identificación de la empresa de transporte: Obligatorio. • Razón Social de la empresa de transporte: Obligatorio. • Nro. de RUC de la empresa de transporte: Obligatorio."

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
| 1.17.8 Consultar Empresa Transporte | # 1.17.8 Consultar Empresa Transporte | ✓ Completa |

---

## No-alucinación

| Afirmación en MD | Frase textual del rf-1-17-raw.txt | Verificación |
|-----------------|----------------------------------|--------------|
| 1.17.8: Descripción | "Crear una funcionalidad que permita traer la información de las empresas de transporte registrados en el sistema." | ✓ Textual |
| 1.17.8: Objetivo | "Establecer una funcionalidad que permita la consulta de las empresas de transporte registrados en el sistema." | ✓ Textual |
| 1.17.8: Propuesta | "Crear una funcionalidad en la API que permita la consulta de las empresas de transporte." | ✓ Textual |
| 1.17.8: id empresa opcional | "Identificador de la empresa de transporte: Opcional." | ✓ Textual |
| 1.17.8: ruc empresa opcional | "Nro. de RUC de la empresa de transporte: Opcional." | ✓ Textual |
| 1.17.8: razonSocial empresa opcional | "Razón social de la empresa de transporte: Opcional." | ✓ Textual |
| 1.17.8: procesamiento consulta (según RF) | "Consulta la información de los almacenes registrados." | ✓ Textual (PERO ver nota) |
| 1.17.8: respuesta incluye id | "Identificación de la empresa de transporte: Obligatorio." | ✓ Textual |
| 1.17.8: respuesta incluye razonSocial | "Razón Social de la empresa de transporte: Obligatorio." | ✓ Textual |
| 1.17.8: respuesta incluye ruc | "Nro. de RUC de la empresa de transporte: Obligatorio." | ✓ Textual |
| 1.17.8: criterio validar entrada | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual |

---

## Especificaciones pendientes (TBD)

- **Discrepancia en procesamiento**: El RF 1.17.8 textualmente dice "Consulta la información de los **almacenes** registrados" pero la descripción y objetivo hablan de empresas de transporte. ¿Es un error del RF o intencional? **TBD**: aclarar relación almacenes ↔ empresas transporte.
- **Validación de RUC**: No se especifica formato exacto de RUC. ¿Debe validarse formato numérico o específico? **TBD**: restricciones de validación.
- **Búsqueda casesensitive**: Los filtros no especifican si es case-sensitive. **TBD**: comportamiento de búsqueda en RUC y razón social.
- **Paginación**: No especificada. ¿Se retornan todas las empresas o hay limit/offset? **TBD**: límite de resultados.
- **Campos de entrada adicionales**: ¿Hay otros filtros disponibles (estado, ciudad, etc.)? **TBD**.
- **Autenticación/Autorización**: No mencionada en RF. **TBD**: estrategia de seguridad.
- **Rate limiting**: No mencionado. **TBD**: política de throttling.
- **Orden de resultados**: No especificado cómo se ordenan los resultados. **TBD**: criterio de ordenamiento.

