# APIs de Configuración – **Motivos** y **Parámetros**
**Objetivo:** entregar contratos exactos (headers, path/query params, cuerpos y respuestas) para evitar que se inventen campos al implementar las APIs.  
**Fuente:** EDS `ms-utl-configuracion` (OpenAPI 3.0) y lineamientos de cabeceras comunes en `bff-exp-login`.

> **Base URL del microservicio (`ms-utl-configuracion`)**  
> `https://{ambiente}/v1.0/rec/logistica-stock/ms-utl-configuracion/`  
> donde `ambiente ∈ { d, t, p, produccion }`

> **Convenciones de respuesta (todas las operaciones)**
> ```json
> {
>   "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" },
>   "responseData": { ... } // si aplica
> }
> ```
> `codigoRespuesta`: `0` = OK, `1` = Parámetros obligatorios no válidos o incompletos.  
> Para errores técnicos, usar mecanismo estándar del proyecto (timeout, disponibilidad, etc.) si aplica.

---

## 1) Motivos

### 1.1 Consultar motivos con filtros
- **Método**: `GET`
- **Ruta sugerida**: `/api/config/motivos`  
  **Ruta MS (EDS)**: `/consultarMotivo`
- **Headers requeridos**: `accept`, `authorization`, `idApp`, `idCorrelacion`, `idMsg`, `idTransaccion`
- **Query params requeridos**: `timestamp` (ISO 8601)
- **Query params opcionales (filtros)**: `nombreMotivo`, `tipoMotivo`, `estadoMotivo`
- **Respuesta 200**
  ```json
  {
    "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" },
    "responseData": {
      "id": "string",
      "nombreMotivo": "string",
      "estadoMotivo": "string"
    }
  }
  ```

### 1.2 Registrar nuevo motivo
- **Método**: `POST`
- **Ruta sugerida**: `/api/config/motivos`  
  **Ruta MS (EDS)**: `/registrarMotivo`
- **Headers requeridos**: `accept`, `authorization`, `idApp`, `idCorrelacion`, `idMsg`, `idTransaccion`, `idUsuario`
- **Query params requeridos**: `timestamp` (ISO 8601)
- **Body (JSON)** — *campos definidos por el EDS*:
  ```json
  {
    "estadoMotivo": "string",
    "nombreMotivo": "string"
  }
  ```
  > Nota: el EDS no marca explícitamente requeridos por campo; para `POST` se asume **ambos requeridos**.
- **Respuesta 200**
  ```json
  {
    "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" },
    "responseData": { "id": "string" }
  }
  ```

### 1.3 Actualizar motivo existente
- **Método**: `PATCH` (en EDS). Si se expone como `PUT` en el API Gateway, mantener **el mismo contrato**.
- **Ruta sugerida**: `/api/config/motivos/{id}`  
  **Ruta MS (EDS)**: `/actualizarMotivo/{id}`
- **Headers requeridos**: `accept`, `authorization`, `idApp`, `idCorrelacion`, `idMsg`, `idTransaccion`, `idUsuario`
- **Path params**: `id` (string)
- **Query params requeridos**: `timestamp` (ISO 8601)
- **Body (JSON)** — *campos definidos por el EDS*:
  ```json
  {
    "estadoMotivo": "string",
    "nombreMotivo": "string"
  }
  ```
  > Para actualización, los campos pueden enviarse según la regla de negocio; el EDS los modela como `string`.
- **Respuesta 200**
  ```json
  { "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" } }
  ```

---

## 2) Parámetros del sistema

### 2.1 Consultar parámetros
- **Método**: `GET`
- **Ruta sugerida**: `/api/configuracion/parametros`  
  **Ruta MS (EDS)**: `/consultarParametro`
- **Headers requeridos**: `accept`, `authorization`, `idApp`, `idCorrelacion`, `idMsg`, `idTransaccion`
- **Query params requeridos**: `timestamp` (ISO 8601)
- **Respuesta 200**
  ```json
  {
    "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" },
    "responseData": {
      "cantidadTiempoReserva": 0,
      "unidadMedidaTiempoReserva": "string",
      "cantidadTiempoDesbloqueo": 0,
      "unidadMedidaTiempoDesbloqueo": "string"
    }
  }
  ```

### 2.2 Registrar parámetros
- **Método**: `POST`
- **Ruta sugerida**: `/api/configuracion/parametros`  
  **Ruta MS (EDS)**: `/registrarParametro`
- **Headers requeridos**: `accept`, `authorization`, `idApp`, `idCorrelacion`, `idMsg`, `idTransaccion`, `idUsuario`
- **Query params requeridos**: `timestamp` (ISO 8601)
- **Body (JSON)** — *campos definidos por el EDS*:
  ```json
  {
    "cantidadTiempoReserva": 0,
    "unidadMedidaTiempoReserva": "string",
    "cantidadTiempoDesbloqueo": 0,
    "unidadMedidaTiempoDesbloqueo": "string"
  }
  ```
  > El EDS modela estos campos; tratar como **requeridos** en `POST` (confirmar reglas de negocio).
- **Respuesta 200**
  ```json
  { "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" } }
  ```

### 2.3 Actualizar parámetros existentes
- **Método**: `PATCH` (en EDS). Si se expone como `PUT`, mantener **el mismo contrato**.
- **Ruta sugerida**: `/api/configuracion/parametros/{id}` *(si el `id` es parte del recurso; el EDS no lo define en la ruta, usar la convención del proyecto si corresponde)*  
  **Ruta MS (EDS)**: `/actualizarParametro`
- **Headers requeridos**: `accept`, `authorization`, `idApp`, `idCorrelacion`, `idMsg`, `idTransaccion`, `idUsuario`
- **Query params requeridos**: `timestamp` (ISO 8601)
- **Body (JSON)** — *campos definidos por el EDS* (en `PATCH` pueden ser parciales):
  ```json
  {
    "cantidadTiempoReserva": 0,
    "unidadMedidaTIempoReserva": "string",
    "cantidadTiempoDesbloqueo": 0,
    "unidadMedidaTiempoDesbloqueo": "string"
  }
  ```
  > Observación: en el modelo aparece `unidadMedidaTIempoReserva` con **I** mayúscula en “Tiempo”. Mantener el nombre exacto según contrato.

- **Respuesta 200**
  ```json
  { "responseStatus": { "codigoRespuesta": 0, "mensaje": "string" } }
  ```

---

## 3) Cabeceras y formatos comunes
| Campo | Ubicación | Tipo | Req. | Comentarios |
|---|---|---|---|---|
| `accept` | header | string | Sí | Usar `application/json` |
| `authorization` | header | string | Sí | Portar token del usuario (esquema estándar del proyecto) |
| `idApp` | header | string | Sí | Identificador de aplicación |
| `idUsuario` | header | string | **Sí en POST/PATCH** | Presente en operaciones de alta/cambio |
| `idCorrelacion` | header | string | Sí | Trazabilidad |
| `idMsg` | header | string | Sí | Identificador de mensaje |
| `idTransaccion` | header | string | Sí | Trazabilidad |
| `timestamp` | query | string (date-time) | Sí | ISO 8601, ej. `2025-05-21T15:04:05Z` |

---

## 4) Códigos de respuesta funcional
| códigoRespuesta | descripción |
|---|---|
| `0` | Operación exitosa |
| `1` | Parámetros obligatorios no válidos o incompletos – Detalle: `[DETALLE]` |

---

## 5) Notas de implementación
- **No agregar** campos fuera de los listados arriba (request ni response).  
- Para `PUT` en gateway, respetar **los mismos modelos** definidos por el EDS (el backend espera `PATCH`).  
- Estandarizar `Content-Type: application/json` para `POST/PATCH`.  
- Validar **headers obligatorios** antes de invocar lógica de negocio.  
- Mantener los **nombres exactos** tal como están en el EDS (ojo con `unidadMedidaTIempoReserva`).