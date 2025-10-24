---
id: rf-1-17-openapi
title: "RF 1.17 · OpenAPI (borrador)"
parent: rf-1-17-configuracion-sistema
tags: [openapi, rest, java, spring-boot]
status: draft
---

# OpenAPI 3.0 · RF 1.17 (PS) Configuración de Sistema (BORRADOR)

Especificación OpenAPI 3.0 consolidada para todas las operaciones del requerimiento funcional **RF 1.17: Configuración de Sistema**. Basada únicamente en `rf-1-17-raw.txt`.

## Información de la API

```yaml
openapi: 3.0.0
info:
  title: "RF 1.17 - Configuración de Sistema"
  description: "API para configurar parámetros de operación del sistema: motivos, parámetros, almacenes, empresas de transporte y transportistas."
  version: "1.0.0"
  contact:
    name: "John Castillo Rivera"
  x-status: "BORRADOR"
servers:
  - url: "https://api.example.com"
    description: "Servidor de producción"
    variables:
      basePath:
        default: /api/config
```

## Componentes Reutilizables

### Esquemas (Schemas)

```yaml
components:
  schemas:
    
    EstadoOperacion:
      type: object
      description: "Envoltura de respuesta operacional con estado y datos."
      required:
        - estado
      properties:
        estado:
          type: object
          required:
            - codigo
            - mensaje
          properties:
            codigo:
              type: integer
              description: "0: éxito, -1: error en la operación"
              enum: [0, -1]
            mensaje:
              type: string
              description: "Mensaje de resultado de la operación"
        datos:
          type: object
          description: "Datos específicos de la operación (puede variar según endpoint)"
    
    Motivo:
      type: object
      description: "Motivo registrado en el sistema (RF 1.17.1 Consultar)."
      required:
        - id
        - nombre
        - estado
      properties:
        id:
          type: string
          description: "Identificación del motivo [TBD: uuid/string/integer]"
        nombre:
          type: string
          description: "Nombre del motivo"
        estado:
          type: string
          description: "Estado del motivo [TBD: enum values not specified in source]"
    
    MotivoInput:
      type: object
      description: "Datos de entrada para registrar/actualizar motivo (RF 1.17.2, RF 1.17.3)."
      required:
        - nombre
        - estado
      properties:
        nombre:
          type: string
          description: "Nombre de motivo (obligatorio)"
        estado:
          type: string
          description: "Estado del motivo (obligatorio) [TBD: enum values]"
    
    MotivoInputUpdate:
      type: object
      description: "Datos de entrada para actualizar motivo (RF 1.17.3)."
      required:
        - id
        - nombre
        - estado
      properties:
        id:
          type: string
          description: "Identificación del motivo (obligatorio)"
        nombre:
          type: string
          description: "Nombre del motivo (obligatorio)"
        estado:
          type: string
          description: "Estado del motivo (obligatorio)"
    
    Tiempo:
      type: object
      description: "Configuración de tiempo con cantidad y unidad (RF 1.17.4-1.17.6)."
      required:
        - cantidad
        - unidad
      properties:
        cantidad:
          type: integer
          description: "Cantidad de tiempo"
        unidad:
          type: string
          description: "Unidad de medida: MINUTOS, HORAS, DIAS [TBD: confirm enum/case]"
          enum: ["MINUTOS", "HORAS", "DIAS"]
    
    Parametros:
      type: object
      description: "Configuración de parámetros del sistema (desbloqueo y reserva)."
      required:
        - desbloqueo
        - reserva
      properties:
        desbloqueo:
          $ref: "#/components/schemas/Tiempo"
          description: "Cantidad de tiempo para desbloqueo de mercadería (RF 1.17.4)"
        reserva:
          $ref: "#/components/schemas/Tiempo"
          description: "Cantidad de tiempo de reserva de mercadería (RF 1.17.4)"
    
    ParametrosInput:
      type: object
      description: "Datos de entrada para registrar/actualizar parámetros (RF 1.17.5, RF 1.17.6)."
      required:
        - desbloqueo
        - reserva
      properties:
        desbloqueo:
          $ref: "#/components/schemas/Tiempo"
          description: "Cantidad de tiempo para desbloqueo (obligatorio)"
        reserva:
          $ref: "#/components/schemas/Tiempo"
          description: "Cantidad de tiempo de liberación de reserva (obligatorio)"
    
    Almacen:
      type: object
      description: "Almacén registrado en el sistema (RF 1.17.7 Consultar)."
      required:
        - codigo
        - nombre
        - tipo
        - direccion
        - bloqueo
        - estado
      properties:
        codigo:
          type: string
          description: "Código del almacén"
        nombre:
          type: string
          description: "Nombre del almacén"
        tipo:
          type: string
          description: "Tipo de almacén [TBD: enum values]"
        direccion:
          type: string
          description: "Dirección del almacén"
        bloqueo:
          type: string
          description: "Bloqueo del almacén [TBD: enum/format not specified]"
        estado:
          type: string
          description: "Estado del almacén [TBD: enum values]"
    
    EmpresaTransporte:
      type: object
      description: "Empresa de transporte registrada en el sistema (RF 1.17.8 Consultar)."
      required:
        - id
        - razonSocial
        - ruc
      properties:
        id:
          type: string
          description: "Identificación de la empresa de transporte [TBD: uuid/string/integer]"
        razonSocial:
          type: string
          description: "Razón Social de la empresa de transporte"
        ruc:
          type: string
          description: "Nro. de RUC de la empresa de transporte"
    
    Transportista:
      type: object
      description: "Transportista registrado en el sistema (RF 1.17.9 Consultar)."
      required:
        - empresaId
        - transportistaId
        - nombre
        - tipoDocumento
        - numeroDocumento
      properties:
        empresaId:
          type: string
          description: "Identificación de la empresa de transporte"
        transportistaId:
          type: string
          description: "Identificación del transportista"
        nombre:
          type: string
          description: "Nombre del transportista"
        tipoDocumento:
          type: string
          description: "Tipo de documento del transportista [TBD: enum values]"
        numeroDocumento:
          type: string
          description: "Nro. de documento del transportista"
```

## Paths (Endpoints)

### 1.17.1 – Consultar Motivo

```yaml
paths:
  /motivos:
    get:
      tags:
        - "1.17.1 Consultar Motivo"
      summary: "Consultar motivos registrados en el sistema"
      operationId: "consultarMotivos"
      description: |
        Funcionalidad que permite traer la información de los motivos registrados en el sistema.
        Campos de búsqueda: Nombre (opcional), Estado (opcional).
      parameters:
        - name: nombre
          in: query
          description: "Nombre del motivo (opcional)"
          required: false
          schema:
            type: string
        - name: estado
          in: query
          description: "Estado de motivo (opcional)"
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "Consulta exitosa. Retorna lista de motivos."
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Motivo"
              examples:
                success:
                  value:
                    - id: "001"
                      nombre: "Devolución por defecto"
                      estado: "Activo"
                    - id: "002"
                      nombre: "Cambio solicitado"
                      estado: "Activo"
        "400":
          description: "Solicitud inválida. Datos de entrada no válidos."
        "404":
          description: "No se encontraron motivos."
        "500":
          description: "Error interno del servidor."
```

### 1.17.2 – Registrar Motivo

```yaml
  /motivos:
    post:
      tags:
        - "1.17.2 Registrar Motivo"
      summary: "Registrar nuevo motivo en el sistema"
      operationId: "registrarMotivo"
      description: |
        Funcionalidad que permite ingresar la información del motivo en el sistema.
        Campos requeridos: Nombre (obligatorio), Estado (obligatorio).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/MotivoInput"
            examples:
              input:
                value:
                  nombre: "Daño en transporte"
                  estado: "Activo"
      responses:
        "201":
          description: "Motivo registrado exitosamente."
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EstadoOperacion"
              examples:
                success:
                  value:
                    estado:
                      codigo: 0
                      mensaje: "Motivo registrado exitosamente"
                    datos:
                      id: "003"
        "400":
          description: "Solicitud inválida. Nombre o Estado no proporcionados."
        "422":
          description: "Error en validación de datos de entrada."
        "500":
          description: "Error interno del servidor."
```

### 1.17.3 – Actualizar Motivo

```yaml
  /motivos/{id}:
    put:
      tags:
        - "1.17.3 Actualizar Motivo"
      summary: "Actualizar motivo existente"
      operationId: "actualizarMotivo"
      description: |
        Funcionalidad que permite actualizar la información del motivo en el sistema.
        Campos requeridos: ID (obligatorio en path), Nombre (obligatorio), Estado (obligatorio).
      parameters:
        - name: id
          in: path
          description: "Identificación del motivo a actualizar"
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/MotivoInput"
            examples:
              input:
                value:
                  nombre: "Daño en transporte - Actualizado"
                  estado: "Inactivo"
      responses:
        "200":
          description: "Motivo actualizado exitosamente."
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EstadoOperacion"
              examples:
                success:
                  value:
                    estado:
                      codigo: 0
                      mensaje: "Motivo actualizado exitosamente"
        "400":
          description: "Solicitud inválida. Campos requeridos no proporcionados."
        "404":
          description: "Motivo no encontrado."
        "422":
          description: "Error en validación de datos de entrada."
        "500":
          description: "Error interno del servidor."
```

### 1.17.4 – Consultar Parámetros

```yaml
  /parametros:
    get:
      tags:
        - "1.17.4 Consultar Parámetros"
      summary: "Consultar configuración de parámetros del sistema"
      operationId: "consultarParametros"
      description: |
        Funcionalidad que permite consultar la configuración de los parámetros del sistema.
        Retorna: Cantidad de tiempo de desbloqueo, Unidad de medida de desbloqueo,
                 Cantidad de tiempo de reserva, Unidad de medida de reserva.
      parameters: []
      responses:
        "200":
          description: "Consulta exitosa. Retorna configuración de parámetros."
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Parametros"
              examples:
                success:
                  value:
                    desbloqueo:
                      cantidad: 24
                      unidad: "HORAS"
                    reserva:
                      cantidad: 7
                      unidad: "DIAS"
        "400":
          description: "Solicitud inválida."
        "500":
          description: "Error interno del servidor."
```

### 1.17.5 – Registrar Parámetros

```yaml
  /parametros:
    post:
      tags:
        - "1.17.5 Registrar Parámetros"
      summary: "Registrar configuración de parámetros del sistema"
      operationId: "registrarParametros"
      description: |
        Funcionalidad que permite registrar la configuración de los parámetros del sistema.
        Campos requeridos: Cantidad de tiempo para desbloqueo, Unidad de desbloqueo,
                          Cantidad de tiempo de liberación de reserva, Unidad de liberación de reserva.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ParametrosInput"
            examples:
              input:
                value:
                  desbloqueo:
                    cantidad: 24
                    unidad: "HORAS"
                  reserva:
                    cantidad: 7
                    unidad: "DIAS"
      responses:
        "201":
          description: "Parámetros registrados exitosamente."
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EstadoOperacion"
              examples:
                success:
                  value:
                    estado:
                      codigo: 0
                      mensaje: "Parámetros registrados exitosamente"
        "400":
          description: "Solicitud inválida. Campos requeridos no proporcionados."
        "422":
          description: "Error en validación de datos de entrada (formato, existencia, compatibilidad)."
        "500":
          description: "Error interno del servidor."
```

### 1.17.6 – Actualizar Parámetros

```yaml
  /parametros:
    put:
      tags:
        - "1.17.6 Actualizar Parámetros"
      summary: "Actualizar configuración de parámetros del sistema"
      operationId: "actualizarParametros"
      description: |
        Funcionalidad que permite actualizar la configuración de los parámetros del sistema.
        Campos requeridos: Cantidad de tiempo para desbloqueo, Unidad de desbloqueo,
                          Cantidad de tiempo de liberación de reserva, Unidad de liberación de reserva.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ParametrosInput"
            examples:
              input:
                value:
                  desbloqueo:
                    cantidad: 48
                    unidad: "HORAS"
                  reserva:
                    cantidad: 14
                    unidad: "DIAS"
      responses:
        "200":
          description: "Parámetros actualizados exitosamente."
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EstadoOperacion"
              examples:
                success:
                  value:
                    estado:
                      codigo: 0
                      mensaje: "Parámetros actualizados exitosamente"
        "400":
          description: "Solicitud inválida. Campos requeridos no proporcionados."
        "422":
          description: "Error en validación de datos de entrada (formato, existencia, compatibilidad)."
        "500":
          description: "Error interno del servidor."
```

### 1.17.7 – Consultar Almacén

```yaml
  /almacenes:
    get:
      tags:
        - "1.17.7 Consultar Almacén"
      summary: "Consultar almacenes registrados en el sistema"
      operationId: "consultarAlmacenes"
      description: |
        Funcionalidad que permite traer la información de los almacenes registrados en el sistema.
        Campos de búsqueda: Código de almacén (opcional), Tipo de almacén (opcional).
      parameters:
        - name: codigo
          in: query
          description: "Código de almacén (opcional)"
          required: false
          schema:
            type: string
        - name: tipo
          in: query
          description: "Tipo de almacén (opcional)"
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "Consulta exitosa. Retorna lista de almacenes."
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Almacen"
              examples:
                success:
                  value:
                    - codigo: "ALM001"
                      nombre: "Almacén Central Lima"
                      tipo: "Principal"
                      direccion: "Av. Principal 123, Lima"
                      bloqueo: "[TBD]"
                      estado: "Activo"
                    - codigo: "ALM002"
                      nombre: "Almacén Regional"
                      tipo: "Secundario"
                      direccion: "Calle 456, Arequipa"
                      bloqueo: "[TBD]"
                      estado: "Activo"
        "400":
          description: "Solicitud inválida. Datos de entrada no válidos."
        "404":
          description: "No se encontraron almacenes."
        "500":
          description: "Error interno del servidor."
```

### 1.17.8 – Consultar Empresa Transporte

```yaml
  /empresas-transporte:
    get:
      tags:
        - "1.17.8 Consultar Empresa Transporte"
      summary: "Consultar empresas de transporte registradas en el sistema"
      operationId: "consultarEmpresasTransporte"
      description: |
        Funcionalidad que permite traer la información de las empresas de transporte registradas en el sistema.
        Campos de búsqueda: Identificador (opcional), RUC (opcional), Razón Social (opcional).
      parameters:
        - name: id
          in: query
          description: "Identificador de la empresa de transporte (opcional)"
          required: false
          schema:
            type: string
        - name: ruc
          in: query
          description: "Nro. de RUC de la empresa de transporte (opcional)"
          required: false
          schema:
            type: string
        - name: razonSocial
          in: query
          description: "Razón social de la empresa de transporte (opcional)"
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "Consulta exitosa. Retorna lista de empresas de transporte."
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/EmpresaTransporte"
              examples:
                success:
                  value:
                    - id: "EMP001"
                      razonSocial: "TransRapid S.A."
                      ruc: "20123456789"
                    - id: "EMP002"
                      razonSocial: "Logística Express Perú"
                      ruc: "20987654321"
        "400":
          description: "Solicitud inválida. Datos de entrada no válidos."
        "404":
          description: "No se encontraron empresas de transporte."
        "500":
          description: "Error interno del servidor."
```

### 1.17.9 – Consultar Transportista

```yaml
  /transportistas:
    get:
      tags:
        - "1.17.9 Consultar Transportista"
      summary: "Consultar transportistas registrados en el sistema"
      operationId: "consultarTransportistas"
      description: |
        Funcionalidad que permite traer la información de los transportistas registrados en el sistema.
        Campos de búsqueda: Identificador de empresa de transporte (opcional), 
                           Identificador del transportista (opcional),
                           Tipo de documento (opcional),
                           Nro. de documento (opcional),
                           Nombre (opcional).
      parameters:
        - name: empresaId
          in: query
          description: "Identificador de la empresa de transporte (opcional)"
          required: false
          schema:
            type: string
        - name: transportistaId
          in: query
          description: "Identificador del transportista (opcional)"
          required: false
          schema:
            type: string
        - name: tipoDocumento
          in: query
          description: "Tipo de documento del transportista (opcional)"
          required: false
          schema:
            type: string
        - name: numeroDocumento
          in: query
          description: "Nro. de documento del transportista (opcional)"
          required: false
          schema:
            type: string
        - name: nombre
          in: query
          description: "Nombre del transportista (opcional)"
          required: false
          schema:
            type: string
      responses:
        "200":
          description: "Consulta exitosa. Retorna lista de transportistas."
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Transportista"
              examples:
                success:
                  value:
                    - empresaId: "EMP001"
                      transportistaId: "TRAN001"
                      nombre: "Juan Pérez García"
                      tipoDocumento: "DNI"
                      numeroDocumento: "12345678"
                    - empresaId: "EMP001"
                      transportistaId: "TRAN002"
                      nombre: "María López Rodríguez"
                      tipoDocumento: "RUC"
                      numeroDocumento: "20987654321"
        "400":
          description: "Solicitud inválida. Datos de entrada no válidos."
        "404":
          description: "No se encontraron transportistas."
        "500":
          description: "Error interno del servidor."
```

---

## Tabla de Cobertura

| RF | Caso | Descripción | Paths Declarados | Métodos |
|---|---|---|---|---|
| 1.17.1 | Consultar Motivo | Traer información de motivos registrados | `/motivos` | GET |
| 1.17.2 | Registrar Motivo | Ingresar información del motivo | `/motivos` | POST |
| 1.17.3 | Actualizar Motivo | Actualizar información del motivo | `/motivos/{id}` | PUT |
| 1.17.4 | Consultar Parámetros | Consultar configuración de parámetros | `/parametros` | GET |
| 1.17.5 | Registrar Parámetros | Registrar configuración de parámetros | `/parametros` | POST |
| 1.17.6 | Actualizar Parámetros | Actualizar configuración de parámetros | `/parametros` | PUT |
| 1.17.7 | Consultar Almacén | Traer información de almacenes | `/almacenes` | GET |
| 1.17.8 | Consultar Empresa Transporte | Traer información de empresas de transporte | `/empresas-transporte` | GET |
| 1.17.9 | Consultar Transportista | Traer información de transportistas | `/transportistas` | GET |

---

## Tabla de No-Alucinación

| # | Assertion | Fuente (rf-1-17-raw.txt) | Verificación |
|---|---|---|---|
| 1 | RF 1.17.1: GET /motivos con parámetros nombre (opt) y estado (opt) | "Los campos de búsqueda serán los siguientes: Nombre del motivo: Opcional. Estado de motivo: Opcional." | ✓ Textual |
| 2 | RF 1.17.1: Respuesta contiene id, nombre, estado (obligatorios) | "Identificación del motivo: Obligatorio. Nombre del motivo: Obligatorio. Estado del motivo: Obligatorio." | ✓ Textual |
| 3 | RF 1.17.2: POST /motivos con nombre (req) y estado (req) | "Nombre de motivo: Obligatorio. Estado del motivo: Obligatorio." | ✓ Textual |
| 4 | RF 1.17.2: Respuesta con estado.codigo (0/-1), estado.mensaje, datos.id | "Estado: Código: 0: Código de éxito / -1: Error en la operación. Mensaje: Mensaje de resultado de la operación. Datos: Id: Identificación del motivo." | ✓ Textual |
| 5 | RF 1.17.3: PUT /motivos/{id} con id (req), nombre (req), estado (req) | "Identificación del motivo: Obligatorio. Nombre del motivo: Obligatorio. Estado del motivo: Obligatorio." | ✓ Textual |
| 6 | RF 1.17.3: Respuesta con estado.codigo, estado.mensaje | "Estado: Código: 0: Código de éxito / -1: Error en la operación. Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 7 | RF 1.17.4: GET /parametros sin parámetros, retorna desbloqueo y reserva | "Obtener la cantidad de tiempo de desbloqueo de la mercadería. Obtener la cantidad de tiempo de reserva de la mercadería." | ✓ Textual |
| 8 | RF 1.17.4: Respuesta contiene cantidad y unidad (minutos/horas/días) para desbloqueo y reserva | "Cantidad de tiempo para el desbloqueo. Unidad de medida de desbloqueo (minutos, horas, días). Cantidad de tiempo de la reserva de mercadería. Unidad de medida de reserva de mercadería (minutos, horas, días)." | ✓ Textual |
| 9 | RF 1.17.5: POST /parametros con desbloqueo (req) y reserva (req), cada una con cantidad y unidad | "Cantidad de tiempo para el desbloqueo. Unidad de medida de desbloqueo (minutos, horas, días). Cantidad de tiempo de liberación de la reserva de mercadería. Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)." | ✓ Textual |
| 10 | RF 1.17.5: Respuesta con estado.codigo, estado.mensaje | "Estado: Código: 0: Código de éxito / -1: Error en la operación. Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 11 | RF 1.17.6: PUT /parametros con desbloqueo (req) y reserva (req) | "Cantidad de tiempo para el desbloqueo. Unidad de medida de desbloqueo (minutos, horas, días). Cantidad de tiempo de liberación de la reserva de mercadería. Unidad de medida de liberación de la reserva de mercadería (minutos, horas, días)." | ✓ Textual |
| 12 | RF 1.17.6: Respuesta con estado.codigo, estado.mensaje | "Estado: Código: 0: Código de éxito / -1: Error en la operación. Mensaje: Mensaje de resultado de la operación." | ✓ Textual |
| 13 | RF 1.17.7: GET /almacenes con parámetros codigo (opt) y tipo (opt) | "Código de almacén: Opcional. Tipo de almacén: Opcional." | ✓ Textual |
| 14 | RF 1.17.7: Respuesta contiene codigo, nombre, tipo, direccion, bloqueo, estado (obligatorios) | "Código del almacén: Obligatorio. Nombre del almacén: Obligatorio. Tipo de almacén: Obligatorio. Dirección del almacén: Obligatorio. Bloqueo del almacén: Obligatorio. Estado del almacén: Obligatorio." | ✓ Textual |
| 15 | RF 1.17.8: GET /empresas-transporte con parámetros id (opt), ruc (opt), razonSocial (opt) | "Identificador de la empresa de transporte: Opcional. Nro. de RUC de la empresa de transporte: Opcional. Razón social de la empresa de transporte: Opcional." | ✓ Textual |
| 16 | RF 1.17.8: Respuesta contiene id, razonSocial, ruc (obligatorios) | "Identificación de la empresa de transporte: Obligatorio. Razón Social de la empresa de transporte: Obligatorio. Nro. de RUC de la empresa de transporte: Obligatorio." | ✓ Textual |
| 17 | RF 1.17.9: GET /transportistas con 5 parámetros opcionales (empresaId, transportistaId, tipoDocumento, numeroDocumento, nombre) | "Identificador de la empresa de transporte: Opcional. Identificador del transportista: Opcional. Tipo de documento del transportista: Opcional. Nro. de documento del transportista: Opcional. Nombre del transportista: Opcional." | ✓ Textual |
| 18 | RF 1.17.9: Respuesta contiene empresaId, transportistaId, nombre, tipoDocumento, numeroDocumento (obligatorios) | "Identificación de la empresa de transporte: Obligatorio. Identificación del transportista: Obligatorio. Nombre del transportista: Obligatorio. Tipo de documento del transportista: Obligatorio. Nro. de documento del transportista: Obligatorio." | ✓ Textual |
| 19 | HTTP códigos 200/201/400/404/409/422/500 son estándares aplicables | "La API deberá validar los datos de entrada, consultar y devolver la información, asegurando un manejo adecuado de errores HTTP." (repetido en todos los casos) | ✓ Textual |
| 20 | Prefijo /api/config/... es sugerido (no está en fuente) | Generado como convención API RESTful estándar | [TBD] |
| 21 | Tipos exactos (uuid/string/integer) no especificados en fuente | Fuente omite tipos de datos explícitos | [TBD] en schemas |
| 22 | Enumeraciones para estado, bloqueo no especificadas en fuente | Fuente menciona "estado", "bloqueo" sin enum values | [TBD] en schemas |

---

## Notas de Implementación

1. **Prefijo API**: Se sugiere `/api/config` como prefijo base; confirmar en arquitectura.
2. **Tipos de datos**: Marcados como `[TBD]` donde la fuente no especifica (ej: uuid vs string para IDs).
3. **Enumeraciones**: Valores de `estado`, `bloqueo`, `tipoDocumento`, `unidad` marcados como `[TBD]` excepto `unidad` (MINUTOS/HORAS/DIAS) que está explícito en RF 1.17.4-1.17.6.
4. **Response envelope**: Estructura dual `{estado, datos}` para POST/PUT (RF 1.17.2-1.17.3, 1.17.5-1.17.6); arrays directos para GET.
5. **Validación**: Todos los endpoints deben validar según criterios de aceptación especificados en RF.
6. **Errores**: Códigos HTTP estándares aplicados; RF 1.17.8 contiene discrepancia (procesamiento dice "almacenes" en lugar de "empresas transporte") —revisar.
7. **Estatus**: Especificación en estado **BORRADOR**; requiere validación y confirmación de tipos/enums antes de implementación.

