---
id: rf-1-17-transportistas
title: "RF 1.17.9 · Consultar Transportista"
parent: rf-1-17-configuracion-sistema
tags: [transportista, api, rest, java, spring-boot]
---

# 1.17.9 Consultar Transportista

**Descripción (del RF)**: Crear una funcionalidad que permita traer la información de los transportistas registrados en el sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita la consulta de los transportistas registrados en el sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita la consulta de las empresas de transporte.

**⚠️ NOTA**: La propuesta de solución dice "consulta de las empresas de transporte" pero la descripción y objetivo hablan de transportistas. **TBD**: aclarar si es error del RF o intencional.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| empresaId | string | No | Identificador de la empresa de transporte (búsqueda opcional) |
| transportistaId | string | No | Identificador del transportista (búsqueda opcional) |
| tipoDocumento | string | No | Tipo de documento del transportista (búsqueda opcional) |
| numeroDocumento | string | No | Nro. de documento del transportista (búsqueda opcional) |
| nombre | string | No | Nombre del transportista (búsqueda opcional) |

**Fuente textual**: "Los campos de búsqueda serán los siguientes: • Identificador de la empresa de transporte: Opcional. • Identificador del transportista: Opcional. • Tipo de documento del transportista: Opcional. • Nro. de documento del transportista: Opcional. • Nombre del transportista: Opcional."

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
GET /api/v1/config/transportistas?empresaId={empresaId}&transportistaId={transportistaId}&tipoDocumento={tipoDocumento}&numeroDocumento={numeroDocumento}&nombre={nombre}
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
      "empresaId": "string",
      "transportistaId": "string",
      "nombre": "string",
      "tipoDocumento": "string",
      "numeroDocumento": "string"
    }
  ]
}
```

**Campos obligatorios en respuesta** (según RF):
- Identificación de la empresa de transporte
- Identificación del transportista
- Nombre del transportista
- Tipo de documento del transportista
- Nro. de documento del transportista

**Fuente textual**: "La respuesta obtenida como resultado de la consulta será la siguiente: • Identificación de la empresa de transporte: Obligatorio. • Identificación del transportista: Obligatorio. • Nombre del transportista: Obligatorio. • Tipo de documento del transportista: Obligatorio. • Nro. de documento del transportista: Obligatorio."

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Consulta exitosa |
| 400 | Bad Request | Parámetros malformados |
| 422 | Unprocessable Entity | Validación fallida en filtros |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Consulta la información de los transportistas registrados.

Finalizado el proceso, el sistema informará en la respuesta el resultado de la consulta.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Consulta la información de los transportistas registrados. Finalizado el proceso, el sistema informará en la respuesta el resultado de la consulta."

## Presentación de resultados

La respuesta obtenida como resultado de la consulta será la siguiente:

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| Identificación de la empresa de transporte | Sí | ID de la empresa de transporte asociada |
| Identificación del transportista | Sí | ID único del transportista |
| Nombre del transportista | Sí | Nombre identificativo del transportista |
| Tipo de documento del transportista | Sí | Tipo de documento de identidad (DNI, RUC, etc.) ⚠️ TBD enum |
| Nro. de documento del transportista | Sí | Número del documento de identidad |

**Fuente textual**: "La respuesta obtenida como resultado de la consulta será la siguiente: • Identificación de la empresa de transporte: Obligatorio. • Identificación del transportista: Obligatorio. • Nombre del transportista: Obligatorio. • Tipo de documento del transportista: Obligatorio. • Nro. de documento del transportista: Obligatorio."

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
| 1.17.9 Consultar Transportista | # 1.17.9 Consultar Transportista | ✓ Completa |

---

## No-alucinación

| Afirmación en MD | Frase textual del rf-1-17-raw.txt | Verificación |
|-----------------|----------------------------------|--------------|
| 1.17.9: Descripción | "Crear una funcionalidad que permita traer la información de los transportistas registrados en el sistema." | ✓ Textual |
| 1.17.9: Objetivo | "Establecer una funcionalidad que permita la consulta de los transportistas registrados en el sistema." | ✓ Textual |
| 1.17.9: Propuesta (según RF) | "Crear una funcionalidad en la API que permita la consulta de las empresas de transporte." | ✓ Textual (PERO inconsistencia) |
| 1.17.9: empresaId opcional | "Identificador de la empresa de transporte: Opcional." | ✓ Textual |
| 1.17.9: transportistaId opcional | "Identificador del transportista: Opcional." | ✓ Textual |
| 1.17.9: tipoDocumento opcional | "Tipo de documento del transportista: Opcional." | ✓ Textual |
| 1.17.9: numeroDocumento opcional | "Nro. de documento del transportista: Opcional." | ✓ Textual |
| 1.17.9: nombre opcional | "Nombre del transportista: Opcional." | ✓ Textual |
| 1.17.9: procesamiento consulta transportistas | "Consulta la información de los transportistas registrados." | ✓ Textual |
| 1.17.9: respuesta incluye empresaId | "Identificación de la empresa de transporte: Obligatorio." | ✓ Textual |
| 1.17.9: respuesta incluye transportistaId | "Identificación del transportista: Obligatorio." | ✓ Textual |
| 1.17.9: respuesta incluye nombre | "Nombre del transportista: Obligatorio." | ✓ Textual |
| 1.17.9: respuesta incluye tipoDocumento | "Tipo de documento del transportista: Obligatorio." | ✓ Textual |
| 1.17.9: respuesta incluye numeroDocumento | "Nro. de documento del transportista: Obligatorio." | ✓ Textual |
| 1.17.9: criterio validar entrada | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." | ✓ Textual |

---

## Especificaciones pendientes (TBD)

- **Inconsistencia en propuesta de solución**: El RF 1.17.9 propone "consulta de las empresas de transporte" pero la descripción/objetivo hablan de transportistas. ¿Es error del RF o hay relación? **TBD**: aclarar.
- **Enumeración de `tipoDocumento`**: No se especifica catálogo válido. Ejemplos posibles: DNI, RUC, PASAPORTE, CÉDULA, etc. **TBD**: valores válidos.
- **Validación de número de documento**: No se especifica formato exacto. ¿Validar según tipo de documento? **TBD**: restricciones por tipo.
- **Búsqueda casesensitive**: Los filtros no especifican si es case-sensitive. **TBD**: comportamiento de búsqueda en nombre y documento.
- **Paginación**: No especificada. ¿Se retornan todos los transportistas o hay limit/offset? **TBD**: límite de resultados.
- **Relación empresa-transportista**: ¿Un transportista puede pertenecer a múltiples empresas? **TBD**: modelo de datos.
- **Campos de entrada adicionales**: ¿Hay otros filtros disponibles (estado, ciudad, etc.)? **TBD**.
- **Autenticación/Autorización**: No mencionada en RF. **TBD**: estrategia de seguridad.
- **Rate limiting**: No mencionado. **TBD**: política de throttling.
- **Orden de resultados**: No especificado cómo se ordenan los resultados. **TBD**: criterio de ordenamiento.

