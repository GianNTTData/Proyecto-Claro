---
id: rf-1-28-pantalla-configuracion
title: "RF 1.28 (PS) · Pantalla de Configuración"
owner: "John Castillo Rivera"
version: "1.0"
phase: "1.0"
status: "approved"
created: "2025-01-15"
last_modified: "2025-10-06"
domain: "logistica-stock"
layer: "frontend"
tech: ["angular"]
scope: ["frontend-only"]
tags: [configuracion, motivos, parametros, angular]
refs:
  rf_1_17:
    - "1.17.1 Consultar motivo"
    - "1.17.2 Registrar motivo"
    - "1.17.3 Actualizar motivo"
    - "1.17.4 Consultar parámetros"
    - "1.17.5 Registrar parámetros"
    - "1.17.6 Actualizar parámetros"
media:
  - ./media/Image 1.png
  - ./media/Image 2.png
  - ./media/Image 3.png
  - ./media/Image 4.png
---

## Descripción

Pantalla diseñada para configurar las opciones generales y parámetros necesarios para el funcionamiento del sistema. Esta pantalla actúa como hub centralizado para la administración de configuraciones que impactan directamente en los procesos de gestión de devoluciones y logística.

---

## Objetivo

Proveer una herramienta que permita gestionar y personalizar las configuraciones generales del sistema, facilitando a los administradores la toma de decisiones sobre parámetros críticos de negocio.

---

## Propuesta de Solución

Desarrollar pantallas (UI Angular) que permita definir y ajustar las opciones generales del sistema para su administración. La solución se compone de dos módulos principales:

1. **Mantenimiento de Motivos** (1.28.1)
2. **Parámetros** (1.28.2)

Ambos módulos interactúan con servicios backend definidos en el **RF 1.17 (PS) Configuración de sistema**.

---

## Alcance y Fuera de Alcance

### ✅ En Alcance

- **Interfaz Angular** para gestión de motivos de devolución (CRUD)
- **Interfaz Angular** para configuración de parámetros de sistema
- **Validación frontend** de campos y datos ingresados
- **Filtrado y búsqueda** de motivos por descripción y estado
- **Diálogos/modales** para agregar y editar motivos
- **Notificaciones** claras al usuario (éxito, error, validación)
- **Persistencia en sesión** del almacén del usuario

### ❌ Fuera de Alcance

- **Lógica de backend**: Consumo de servicios REST/API (responsabilidad de RF 1.17)
- **Base de datos**: Consultas y almacenamiento (responsabilidad de RF 1.17)
- **Auditoría/Bitácora**: Registro de cambios (responsabilidad de RF 1.17)
- **Autenticación/Autorización**: Gestión de permisos (responsabilidad de seguridad)

---

## Criterios de Aceptación Globales

1. ✅ La pantalla debe permitir configurar y guardar correctamente las opciones generales del sistema
2. ✅ Validar datos ingresados (campos obligatorios, tipos numéricos, opciones válidas)
3. ✅ Reflejar cambios en tiempo real en la interfaz
4. ✅ Notificaciones claras al usuario sobre el resultado de cada acción
5. ✅ Integración funcional con los servicios del **RF 1.17** sin errores de consumo
6. ✅ Filtrado efectivo de motivos por descripción y estado
7. ✅ Gestión de almacén obtenido de la sesión del usuario
8. ✅ Mensajes de confirmación: "Registro realizado satisfactoriamente"
9. ✅ Interfaz responsiva en navegadores web actuales

---

## Navegación Propuesta

```
Pantalla Principal (Dashboard/Inicio)
    ↓
Pantalla de Configuración (RF 1.28)
    ├─ Mantenimiento de Motivos (1.28.1)
    │   ├─ Listado de Motivos
    │   ├─ [Botón] Agregar → Modal Nuevo Motivo
    │   └─ [Botón] Editar → Modal Editar Motivo
    │
    └─ Parámetros (1.28.2)
        ├─ Tiempo de Reserva de Mercadería
        ├─ Tiempo de Bloqueo de Mercadería
        └─ [Botón] Guardar Configuración
```

---

## Arte Visual y Mockups

### 1.28.1 Mantenimiento de Motivos

#### Pantalla: Listado de Motivos

![Listado de Motivos](./media/Image%201.png)

**Componentes visibles:**
- Filtros: Descripción (texto), Estado (dropdown: Activo/Inactivo)
- Botón "Buscar" para ejecutar consulta
- Tabla con columnas: Descripción, Estado, Acciones (Editar)
- Botón "Agregar" para registrar nuevo motivo

---

#### Modal: Agregar Motivo de Devolución

![Agregar Motivo](./media/Image%202.png)

**Componentes visibles:**
- Campo texto: Descripción del motivo (obligatorio)
- Dropdown: Estado (Activo/Inactivo)
- Botón "Guardar"
- Mensaje de éxito: "Registro realizado satisfactoriamente"

---

#### Modal: Editar Motivo de Devolución

![Editar Motivo](./media/Image%203.png)

**Componentes visibles:**
- Campo texto: Descripción del motivo (obligatorio)
- Dropdown: Estado (Activo/Inactivo)
- Botón "Guardar"
- Mensaje de éxito: "Registro realizado satisfactoriamente"

---

### 1.28.2 Parámetros

#### Pantalla: Configuración de Parámetros

![Configuración de Parámetros](./media/Image%204.png)

**Componentes visibles:**
- **Tiempo de Reserva de Mercadería**
  - Campo numérico: Cantidad (números positivos)
  - Dropdown: Unidad de medida (Minutos, Horas, Días)

- **Tiempo de Bloqueo de Mercadería**
  - Campo numérico: Cantidad (números positivos)
  - Dropdown: Unidad de medida (Minutos, Horas, Días)

- Botón "Guardar Configuración"

---

## Funcionalidades Detalladas

### 1.28.1 Mantenimiento de Motivos

#### Búsqueda de Motivos

| Elemento | Descripción |
|----------|-------------|
| **Filtro 1** | Descripción del motivo (Tipo texto) |
| **Filtro 2** | Estado (Activo/Inactivo) |
| **Acción** | Botón "Buscar" |
| **Servicio Backend** | RF 1.17.1 - Consultar motivo |
| **Contexto** | Usa almacén de la sesión del usuario |

#### Resultados de Búsqueda

| Columna | Tipo | Contenido |
|---------|------|----------|
| Descripción | Texto | Descripción del motivo de devolución |
| Estado | Texto | Activo / Inactivo |
| Acciones | Botón | Editar motivo |

#### Agregar Motivo

| Campo | Tipo | Requerido | Rango/Opciones |
|-------|------|-----------|-----------------|
| Descripción | Texto | ✅ Sí | TBD |
| Estado | Dropdown | ✅ Sí | Activo, Inactivo |

**Flujo:**
1. Usuario pulsa botón "Agregar"
2. Se abre modal con formulario vacío
3. Usuario completa campos
4. Usuario pulsa "Guardar"
5. Sistema valida y ejecuta **RF 1.17.2 - Registrar motivo**
6. Mensaje de éxito: "Registro realizado satisfactoriamente"

#### Editar Motivo

| Campo | Tipo | Requerido | Rango/Opciones |
|-------|------|-----------|-----------------|
| Descripción | Texto | ✅ Sí | TBD |
| Estado | Dropdown | ✅ Sí | Activo, Inactivo |

**Flujo:**
1. Usuario pulsa botón "Editar" en la tabla
2. Se abre modal con datos actuales
3. Usuario modifica campos
4. Usuario pulsa "Guardar"
5. Sistema valida y ejecuta **RF 1.17.3 - Actualizar motivo**
6. Mensaje de éxito: "Registro realizado satisfactoriamente"

---

### 1.28.2 Parámetros

#### Consulta de Parámetros

| Parámetro | Servicio Backend |
|-----------|------------------|
| Estado actual de Tiempo de Reserva | RF 1.17.4 - Consultar parámetros |
| Estado actual de Tiempo de Bloqueo | RF 1.17.4 - Consultar parámetros |

#### Tiempo de Reserva de Mercadería

| Campo | Tipo | Requerido | Rango/Opciones |
|-------|------|-----------|-----------------|
| Cantidad | Numérico | ✅ Sí | Números positivos |
| Unidad de medida | Dropdown | ✅ Sí | Minutos, Horas, Días |

**Descripción:** Configura la vigencia de una reserva de mercadería.

#### Tiempo de Bloqueo de Mercadería

| Campo | Tipo | Requerido | Rango/Opciones |
|-------|------|-----------|-----------------|
| Cantidad | Numérico | ✅ Sí | Números positivos |
| Unidad de medida | Dropdown | ✅ Sí | Minutos, Horas, Días |

**Descripción:** Configura la vigencia de un bloqueo de mercadería.

#### Guardar Configuración

**Flujo:**
1. Usuario modifica campos de Tiempo de Reserva y/o Tiempo de Bloqueo
2. Usuario pulsa botón "Guardar Configuración"
3. Sistema valida datos (campos obligatorios, tipo numérico)
4. Sistema ejecuta **RF 1.17.5 - Registrar parámetros** O **RF 1.17.6 - Actualizar parámetros**
5. Cambios reflejados en tiempo real
6. Mensaje de confirmación

---

## Reglas de Validación Frontend

### Mantenimiento de Motivos

| Validación | Condición | Mensaje Error |
|-----------|-----------|------------------|
| Descripción requerida | Campo vacío | "La descripción es obligatoria" |
| Descripción vacía | Solo espacios en blanco | "La descripción no puede estar vacía" |
| Estado requerido | No seleccionado | "Seleccione un estado" |

### Parámetros

| Validación | Condición | Mensaje Error |
|-----------|-----------|------------------|
| Cantidad requerida | Campo vacío | "La cantidad es obligatoria" |
| Cantidad numérica | Contiene letras/caracteres especiales | "Solo números positivos permitidos" |
| Cantidad positiva | Valor ≤ 0 | "La cantidad debe ser mayor a 0" |
| Unidad de medida requerida | No seleccionada | "Seleccione una unidad de medida" |

---

## Referencias a Otros Requerimientos Funcionales

### RF 1.17 (PS) Configuración de Sistema

Este RF depende de los siguientes servicios backend:

| Sección | Servicio | Uso en RF 1.28 |
|---------|---------|-----------------|
| **1.17.1** | Consultar motivo | Búsqueda de motivos (filtrado) |
| **1.17.2** | Registrar motivo | Agregar nuevo motivo |
| **1.17.3** | Actualizar motivo | Editar motivo existente |
| **1.17.4** | Consultar parámetros | Cargar parámetros actuales |
| **1.17.5** | Registrar parámetros | Guardar nuevos parámetros (primera vez) |
| **1.17.6** | Actualizar parámetros | Actualizar parámetros existentes |

### RF 1.12 Implementar un Sistema de Logística y Stock

**Relación:** RF 1.28 es una **Realization** de RF 1.12 (Origen → Destino).  
RF 1.28 contribuye a la implementación del sistema completo de logística y stock.

---

## Notas y TBD

- 🔶 **TBD:** Rango máximo de descripción del motivo de devolución (caracteres)
- 🔶 **TBD:** Rango máximo de cantidad en parámetros (límite superior)
- 🔶 **TBD:** Formato exacto de validación para números positivos (¿decimales permitidos?)
- 🔶 **TBD:** Paginación en listado de motivos (¿cuántos registros por página?)
- 🔶 **TBD:** Comportamiento tras guardar (¿limpiar modal? ¿refrescar tabla automáticamente?)
- 🔶 **TBD:** Manejo de errores de red (reintentos, timeouts)
- 🔶 **TBD:** Sincronización de parámetros entre sesiones múltiples del usuario

---

## Cobertura del RF (Validación)

| Sección del Texto Fuente | Sección en Markdown | ✅ Estado |
|--------------------------|-------------------|----------|
| **Encabezado general** | Front-matter + Descripción | ✅ Cubierto |
| Descripción | ## Descripción | ✅ Cubierto |
| Objetivo | ## Objetivo | ✅ Cubierto |
| Propuesta de Solución | ## Propuesta de Solución | ✅ Cubierto |
| **1.28.1 Mantenimiento de Motivos** | ### Funcionalidades Detalladas / 1.28.1 | ✅ Cubierto |
| Listado de Motivo - Filtros | Tabla "Búsqueda de Motivos" | ✅ Cubierto |
| Listado - Botón Buscar | Tabla "Búsqueda de Motivos" | ✅ Cubierto |
| Listado - Servicio RF 1.17.1 | Tabla "Búsqueda de Motivos" + Referencias | ✅ Cubierto |
| Listado - Resultados (columnas) | Tabla "Resultados de Búsqueda" | ✅ Cubierto |
| Listado - Botón Agregar | Funcionalidades / Agregar Motivo | ✅ Cubierto |
| Agregar Motivo - Modal | Modal: Agregar Motivo (Imagen 2) | ✅ Cubierto |
| Agregar - Campos | Tabla "Agregar Motivo" + Imagen 2 | ✅ Cubierto |
| Agregar - Servicio RF 1.17.2 | Tabla "Agregar Motivo" + Flujo | ✅ Cubierto |
| Agregar - Mensaje éxito | Tabla "Agregar Motivo" + Flujo | ✅ Cubierto |
| Editar Motivo - Modal | Modal: Editar Motivo (Imagen 3) | ✅ Cubierto |
| Editar - Campos | Tabla "Editar Motivo" + Imagen 3 | ✅ Cubierto |
| Editar - Servicio RF 1.17.3 | Tabla "Editar Motivo" + Flujo | ✅ Cubierto |
| Editar - Mensaje éxito | Tabla "Editar Motivo" + Flujo | ✅ Cubierto |
| Criterios de Aceptación 1.28.1 | Criterios de Aceptación Globales | ✅ Cubierto |
| **1.28.2 Parámetros** | ### Funcionalidades Detalladas / 1.28.2 | ✅ Cubierto |
| Tiempo de Reserva - Descripción | Tabla "Tiempo de Reserva de Mercadería" | ✅ Cubierto |
| Tiempo de Reserva - Campos | Tabla "Tiempo de Reserva de Mercadería" | ✅ Cubierto |
| Tiempo de Reserva - Servicio RF 1.17.4 | Tabla "Consulta de Parámetros" | ✅ Cubierto |
| Tiempo de Bloqueo - Descripción | Tabla "Tiempo de Bloqueo de Mercadería" | ✅ Cubierto |
| Tiempo de Bloqueo - Campos | Tabla "Tiempo de Bloqueo de Mercadería" | ✅ Cubierto |
| Botón Guardar Configuración | Tabla "Guardar Configuración" + Flujo | ✅ Cubierto |
| Servicios RF 1.17.5 y 1.17.6 | Tabla "Guardar Configuración" + Referencias | ✅ Cubierto |
| Criterios de Aceptación 1.28.2 | Criterios de Aceptación Globales + Reglas Validación | ✅ Cubierto |
| **RELACIONES ESTRUCTURALES** | ## Referencias a Otros RF | ✅ Cubierto |
| Objetivo Estratégico: Acelerar transformación digital | Contexto en Descripción | ✅ Cubierto |
| SequenceFlow → Pantalla-Configuración_Motivos | Navegación Propuesta | ✅ Cubierto |
| Asociación → Pantalla-Configuracion_Parametros | Navegación Propuesta | ✅ Cubierto |
| Realization ← RF 1.12 | ## Referencias a Otros RF | ✅ Cubierto |

---

## Resumen de Entregables

✅ **Documento base** con front-matter completo  
✅ **Alcance delimitado** (frontend-only, Angular)  
✅ **4 imágenes integradas** (mockups/diseños)  
✅ **Referencias funcionales** a RF 1.17.1 a 1.17.6  
✅ **Tablas de funcionalidad detallada** (campos, validaciones, flujos)  
✅ **Reglas de validación frontend** con mensajes de error  
✅ **Navegación propuesta** (diagrama de flujo)  
✅ **Criterios de aceptación globales**  
✅ **Sección de TBD** para clarificar datos faltantes  
✅ **Tabla de cobertura** (validación de completitud)  
✅ **Toda la información proviene EXCLUSIVAMENTE de rf-1-28-raw.txt**
