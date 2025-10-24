---
id: rf-1-17-parametros
title: "RF 1.17.x · Parámetros (consultar/registrar/actualizar)"
parent: rf-1-17-configuracion-sistema
tags: [parametros, api, rest, java, spring-boot]
---

# Modelo funcional

Según el RF 1.17, el sistema gestiona dos parámetros clave de configuración:

## Estructura de datos

```json
{
  "desbloqueo": {
    "cantidad": "number",
    "unidad": "string"
  },
  "reserva": {
    "cantidad": "number",
    "unidad": "string"
  }
}
```

### Campo: `desbloqueo`

**Descripción**: Configuración del tiempo de desbloqueo de la mercadería.

- **cantidad**: Número de unidades de tiempo
- **unidad**: Unidad de medida (minutos, horas, días)

**Fuente textual**: "Cantidad de tiempo para el desbloqueo. Unidad de medida de desbloqueo (minutos, horas, días)."

### Campo: `reserva`

**Descripción**: Configuración del tiempo de reserva de la mercadería.

- **cantidad**: Número de unidades de tiempo
- **unidad**: Unidad de medida (minutos, horas, días)

**Fuente textual**: "Cantidad de tiempo de la reserva de mercadería. Unidad de medida de reserva de mercadería (minutos, horas, días)."

### Enumeración sugerida para `unidad`

| Valor | Descripción |
|-------|------------|
| `MINUTOS` | Minutos ⚠️ TBD |
| `HORAS` | Horas ⚠️ TBD |
| `DIAS` | Días ⚠️ TBD |

**Nota**: El RF especifica "(minutos, horas, días)" pero no normaliza valores exactos. **TBD**: confirmar si usar uppercase, lowercase, o valores numéricos (1=minutos, 2=horas, 3=días).

---

# 1.17.4 Consultar parámetros

**Descripción (del RF)**: Crear una funcionalidad que permita consultar la configuración de los parámetros del sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita consultar la configuración de los parámetros del sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita consultar la configuración de los parámetros del sistema.

## Validación de entrada

**Observación**: El RF 1.17.4 no especifica parámetros de entrada. Se asume una consulta simple sin filtros.

**Fuente textual**: "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP."

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
GET /api/v1/config/parametros
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar estructura de ruta.

### Respuesta exitosa (200 OK)

```json
{
  "status": {
    "code": 0,
    "message": "Consulta exitosa"
  },
  "data": {
    "desbloqueo": {
      "cantidad": 30,
      "unidad": "MINUTOS"
    },
    "reserva": {
      "cantidad": 2,
      "unidad": "HORAS"
    }
  }
}
```

**Campos según RF**:
- Cantidad de tiempo para el desbloqueo
- Unidad de medida de desbloqueo (minutos, horas, días)
- Cantidad de tiempo de la reserva de mercadería
- Unidad de medida de reserva de mercadería (minutos, horas, días)

**Fuente textual**: "La respuesta obtenida como resultado será la siguiente: • Cantidad de tiempo para el desbloqueo. • Unidad de medida de desbloqueo (minutos, horas, días). • Cantidad de tiempo de la reserva de mercadería. • Unidad de medida de reserva de mercadería (minutos, horas, días)."

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Consulta exitosa |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Obtener la cantidad de tiempo de desbloqueo de la mercadería.
- Obtener la cantidad de tiempo de reserva de la mercadería.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Obtener la cantidad de tiempo de desbloqueo de la mercadería. • Obtener la cantidad de tiempo de reserva de la mercadería."

## Criterios de aceptación

- Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos.
- El servicio responderá de acuerdo con el estándar de errores HTTP.

**Fuente textual**: "Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos. El servicio responderá de acuerdo con el estándar de errores HTTP."

---

# 1.17.5 Registrar parámetros

**Descripción (del RF)**: Crear una funcionalidad que permita registrar la configuración de los parámetros del sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita registrar la configuración de los parámetros del sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita actualizar la configuración de los parámetros del sistema.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| desbloqueo.cantidad | number | **Sí** | Cantidad de tiempo para el desbloqueo |
| desbloqueo.unidad | string | **Sí** | Unidad de medida de desbloqueo (minutos, horas, días) |
| reserva.cantidad | number | **Sí** | Cantidad de tiempo de liberación de la reserva de mercadería |
| reserva.unidad | string | **Sí** | Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días) |

**Fuente textual**: "Los campos requeridos serán los siguientes: · Cantidad de tiempo para el desbloqueo. · Unidad de medida de desbloqueo (minutos, horas, días). · Cantidad de tiempo de liberación de la reserva de mercadería. · Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)."

**Nota**: El RF distingue entre "cantidad de tiempo de reserva" (en 1.17.4) y "cantidad de tiempo de liberación de la reserva" (en 1.17.5 y 1.17.6). **TBD**: aclarar si son el mismo campo o diferentes.

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
POST /api/v1/config/parametros
Content-Type: application/json
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar estructura de ruta.

### Solicitud (Request Body)

```json
{
  "desbloqueo": {
    "cantidad": 30,
    "unidad": "MINUTOS"
  },
  "reserva": {
    "cantidad": 2,
    "unidad": "HORAS"
  }
}
```

### Respuesta exitosa (201 Created o 200 OK)

```json
{
  "status": {
    "code": 0,
    "message": "Parámetros registrados exitosamente"
  }
}
```

**Estructura según RF**:
- Estado:
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación

**Fuente textual**: "La respuesta obtenida como resultado será la siguiente: • Estado: o Código: 0: Código de éxito / -1: Error en la operación. o Mensaje: Mensaje de resultado de la operación."

### Respuesta de error (200 con código -1)

```json
{
  "status": {
    "code": -1,
    "message": "Descripción del error"
  }
}
```

**Nota**: El RF especifica códigos 0/-1 en el body. **TBD**: aclarar si error -1 va en 200 o en 400/422/500.

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Registro exitoso (código: 0 en body) |
| 201 | Created | Registro exitoso (alternativa) ⚠️ TBD |
| 400 | Bad Request | Parámetros malformados |
| 422 | Unprocessable Entity | Validación fallida o error -1 |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Registrar la cantidad de tiempo de desbloqueo de la mercadería.
- Registrar la cantidad de tiempo de liberación de reserva de la mercadería.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Registrar la cantidad de tiempo de desbloqueo de la mercadería. • Registrar la cantidad de tiempo de liberación de reserva de la mercadería."

## Criterios de aceptación

- Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos.
- El servicio responderá de acuerdo con el estándar de errores HTTP.

**Fuente textual**: "Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos. El servicio responderá de acuerdo con el estándar de errores HTTP."

---

# 1.17.6 Actualización de parámetros

**Descripción (del RF)**: Crear una funcionalidad que permita actualizar la configuración de los parámetros del sistema.

**Objetivo (del RF)**: Establecer una funcionalidad que permita actualizar la configuración de los parámetros del sistema.

**Propuesta de Solución (del RF)**: Crear una funcionalidad en la API que permita actualizar la configuración de los parámetros del sistema.

## Validación de entrada

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| desbloqueo.cantidad | number | **Sí** | Cantidad de tiempo para el desbloqueo |
| desbloqueo.unidad | string | **Sí** | Unidad de medida de desbloqueo (minutos, horas, días) |
| reserva.cantidad | number | **Sí** | Cantidad de tiempo de liberación de la reserva de mercadería |
| reserva.unidad | string | **Sí** | Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días) |

**Fuente textual**: "Los campos requeridos serán los siguientes: · Cantidad de tiempo para el desbloqueo. · Unidad de medida de desbloqueo (minutos, horas, días). · Cantidad de tiempo de liberación de la reserva de mercadería. · Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)."

## Contrato REST (Java/Spring Boot) — BORRADOR

### Endpoint sugerido

```
PUT /api/v1/config/parametros
Content-Type: application/json
```

**Estado**: ⚠️ Sugerencia sin confirmación en RF. **TBD**: validar estructura de ruta (¿con ID o sin?).

### Solicitud (Request Body)

```json
{
  "desbloqueo": {
    "cantidad": 60,
    "unidad": "MINUTOS"
  },
  "reserva": {
    "cantidad": 3,
    "unidad": "HORAS"
  }
}
```

### Respuesta exitosa (200 OK)

```json
{
  "status": {
    "code": 0,
    "message": "Parámetros actualizados exitosamente"
  }
}
```

**Estructura según RF**:
- Estado:
  - Código: 0 (éxito) / -1 (error)
  - Mensaje: Mensaje de resultado de la operación

**Fuente textual**: "La respuesta obtenida como resultado será la siguiente: • Estado: o Código: 0: Código de éxito / -1: Error en la operación. o Mensaje: Mensaje de resultado de la operación."

### Respuesta de error (200 con código -1)

```json
{
  "status": {
    "code": -1,
    "message": "Descripción del error"
  }
}
```

**Nota**: El RF especifica códigos 0/-1 en el body. **TBD**: aclarar si error -1 va en 200 o en 400/422/500.

### Códigos HTTP esperados

| Código | Significado | Condición |
|--------|------------|-----------|
| 200 | OK | Actualización exitosa (código: 0 en body) |
| 400 | Bad Request | Parámetros malformados |
| 422 | Unprocessable Entity | Validación fallida o error -1 |
| 500 | Internal Server Error | Error del servidor |

## Procesamiento (según RF)

El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones:

- Actualizar la cantidad de tiempo de desbloqueo de la mercadería.
- Actualizar la cantidad de tiempo de liberación de reserva de la mercadería.

**Fuente textual**: "El servicio una vez que realizó la validación y recepción de la información realizará las siguientes acciones: • Actualizar la cantidad de tiempo de desbloqueo de la mercadería. • Actualizar la cantidad de tiempo de liberación de reserva de la mercadería."

## Criterios de aceptación

- Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos.
- El servicio responderá de acuerdo con el estándar de errores HTTP.

**Fuente textual**: "Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos. El servicio responderá de acuerdo con el estándar de errores HTTP."

---

# Tablas de referencia

## Cobertura del RF

| Sección del RF 1.17 raw | Sección MD | Cobertura |
|------------------------|-----------|-----------|
| 1.17.4 Consultar parámetros | # 1.17.4 Consultar parámetros | ✓ Completa |
| 1.17.5 Registrar parámetros | # 1.17.5 Registrar parámetros | ✓ Completa |
| 1.17.6 Actualización de parámetros | # 1.17.6 Actualización de parámetros | ✓ Completa |

---

## No-alucinación

| Afirmación en MD | Frase textual del rf-1-17-raw.txt | Verificación |
|-----------------|----------------------------------|--------------|
| Modelo: desbloqueo (cantidad, unidad) | "Cantidad de tiempo para el desbloqueo. Unidad de medida de desbloqueo (minutos, horas, días)." | ✓ Textual |
| Modelo: reserva (cantidad, unidad) | "Cantidad de tiempo de la reserva de mercadería. Unidad de medida de reserva de mercadería (minutos, horas, días)." | ✓ Textual |
| 1.17.4: Descripción | "Crear una funcionalidad que permita consultar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.4: Objetivo | "Establecer una funcionalidad que permita consultar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.4: Propuesta | "Crear una funcionalidad en la API que permita consultar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.4: Procesamiento obtiene desbloqueo | "Obtener la cantidad de tiempo de desbloqueo de la mercadería." | ✓ Textual |
| 1.17.4: Procesamiento obtiene reserva | "Obtener la cantidad de tiempo de reserva de la mercadería." | ✓ Textual |
| 1.17.4: Respuesta desbloqueo cantidad | "Cantidad de tiempo para el desbloqueo." | ✓ Textual |
| 1.17.4: Respuesta desbloqueo unidad | "Unidad de medida de desbloqueo (minutos, horas, días)." | ✓ Textual |
| 1.17.4: Respuesta reserva cantidad | "Cantidad de tiempo de la reserva de mercadería." | ✓ Textual |
| 1.17.4: Respuesta reserva unidad | "Unidad de medida de reserva de mercadería (minutos, horas, días)." | ✓ Textual |
| 1.17.4: Criterio validar formatos | "Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos." | ✓ Textual |
| 1.17.4: Criterio errores HTTP | "El servicio responderá de acuerdo con el estándar de errores HTTP." | ✓ Textual |
| 1.17.5: Descripción | "Crear una funcionalidad que permita registrar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.5: Objetivo | "Establecer una funcionalidad que permita registrar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.5: Campo obligatorio desbloqueo cantidad | "Cantidad de tiempo para el desbloqueo." (en "Los campos requeridos") | ✓ Textual |
| 1.17.5: Campo obligatorio desbloqueo unidad | "Unidad de medida de desbloqueo (minutos, horas, días)." (en "Los campos requeridos") | ✓ Textual |
| 1.17.5: Campo obligatorio reserva cantidad | "Cantidad de tiempo de liberación de la reserva de mercadería." (en "Los campos requeridos") | ✓ Textual |
| 1.17.5: Campo obligatorio reserva unidad | "Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)." (en "Los campos requeridos") | ✓ Textual |
| 1.17.5: Procesamiento registra desbloqueo | "Registrar la cantidad de tiempo de desbloqueo de la mercadería." | ✓ Textual |
| 1.17.5: Procesamiento registra reserva | "Registrar la cantidad de tiempo de liberación de reserva de la mercadería." | ✓ Textual |
| 1.17.5: Respuesta código 0/-1 | "Código: 0: Código de éxito / -1: Error en la operación." | ✓ Textual |
| 1.17.5: Respuesta mensaje | "Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 1.17.5: Criterio validar formatos | "Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos." | ✓ Textual |
| 1.17.5: Criterio errores HTTP | "El servicio responderá de acuerdo con el estándar de errores HTTP." | ✓ Textual |
| 1.17.6: Descripción | "Crear una funcionalidad que permita actualizar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.6: Objetivo | "Establecer una funcionalidad que permita actualizar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.6: Propuesta | "Crear una funcionalidad en la API que permita actualizar la configuración de los parámetros del sistema." | ✓ Textual |
| 1.17.6: Campo obligatorio desbloqueo cantidad | "Cantidad de tiempo para el desbloqueo." (en "Los campos requeridos") | ✓ Textual |
| 1.17.6: Campo obligatorio desbloqueo unidad | "Unidad de medida de desbloqueo (minutos, horas, días)." (en "Los campos requeridos") | ✓ Textual |
| 1.17.6: Campo obligatorio reserva cantidad | "Cantidad de tiempo de liberación de la reserva de mercadería." (en "Los campos requeridos") | ✓ Textual |
| 1.17.6: Campo obligatorio reserva unidad | "Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)." (en "Los campos requeridos") | ✓ Textual |
| 1.17.6: Procesamiento actualiza desbloqueo | "Actualizar la cantidad de tiempo de desbloqueo de la mercadería." | ✓ Textual |
| 1.17.6: Procesamiento actualiza reserva | "Actualizar la cantidad de tiempo de liberación de reserva de la mercadería." | ✓ Textual |
| 1.17.6: Respuesta código 0/-1 | "Código: 0: Código de éxito / -1: Error en la operación." | ✓ Textual |
| 1.17.6: Respuesta mensaje | "Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 1.17.6: Criterio validar formatos | "Se validarán los formatos, existencia y compatibilidad de los datos ingresados en cada uno de los campos." | ✓ Textual |
| 1.17.6: Criterio errores HTTP | "El servicio responderá de acuerdo con el estándar de errores HTTP." | ✓ Textual |

---

## Especificaciones pendientes (TBD)

- **Enumeración de `unidad`**: El RF especifica "(minutos, horas, días)" pero no normaliza valores exactos. ¿Uppercase? ¿Lowercase? ¿Números? **TBD**: confirmar formato.
- **Diferencia entre "reserva" y "liberación de reserva"**: En 1.17.4 aparece "cantidad de tiempo de la reserva" vs. en 1.17.5/1.17.6 "cantidad de tiempo de liberación de la reserva". ¿Son conceptos distintos o el mismo? **TBD**: aclarar.
- **Estructura de respuesta de error**: El RF usa códigos 0/-1 en body, pero también requiere errores HTTP. ¿Va el código -1 en HTTP 422 o permanece en 200/201? **TBD**: clarificar.
- **Identificador único de configuración**: ¿Hay un ID de configuración? ¿Un único registro de parámetros por sistema o múltiples? **TBD**: modelo de datos.
- **Paginación**: No especificada. En 1.17.4 no hay filtros, pero ¿es consulta simple? **TBD**.
- **Autenticación/Autorización**: No mencionada en RF. **TBD**: estrategia de seguridad.
- **Rate limiting**: No mencionado. **TBD**: política de throttling.
- **Validación de rangos**: ¿Qué valores son válidos para "cantidad"? ¿Máximo? ¿Mínimo? **TBD**: restricciones numéricas.
- **Estado global vs. múltiples configuraciones**: ¿Se almacenan múltiples configuraciones de parámetros o una única? **TBD**: modelo de persistencia.

