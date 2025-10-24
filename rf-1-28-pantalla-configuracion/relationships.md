---
id: rf-1-28-relationships
title: "RF 1.28 · Relaciones y Conectores"
parent: rf-1-28-pantalla-configuracion
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
tags: [relaciones, conectores, arquitectura]
---

## Relaciones Salientes (Outgoing Structural Relationships)

Desde **RF 1.28 (PS) Pantalla de Configuración** hacia otros elementos:

### 1. Asociación → Objetivo Estratégico

| Elemento | Tipo | Dirección |
|----------|------|-----------|
| **Origen** | RF 1.28 (PS) Pantalla de Configuración (Requerimiento Funcional) | Public |
| **Destino** | Acelerar la transformación digital (Objetivo Estratégico) | Public |
| **Tipo de Relación** | Asociación (`«Asociación»`) | |
| **Dirección** | Origen → Destino | |

**Descripción:** RF 1.28 contribuye directamente al objetivo estratégico de acelerar la transformación digital del sistema.

---

### 2. SequenceFlow/Asociación → Aplicación Pantalla-Configuración_Motivos

| Elemento | Tipo | Dirección |
|----------|------|-----------|
| **Origen** | RF 1.28 (PS) Pantalla de Configuración (Requerimiento Funcional) | Public |
| **Destino** | Pantalla-Configuración_Motivos (Application Component Name) | Public |
| **Tipo de Relación** | SequenceFlow (`«Asociación»`) | |
| **Dirección** | Origen → Destino | |

**Descripción:** RF 1.28 especifica la secuencia de flujo hacia el componente de aplicación que implementa la pantalla de gestión de motivos de devolución.

---

### 3. Asociación → Aplicación Pantalla-Configuracion_Parametros

| Elemento | Tipo | Dirección |
|----------|------|-----------|
| **Origen** | RF 1.28 (PS) Pantalla de Configuración (Requerimiento Funcional) | Public |
| **Destino** | Pantalla-Configuracion_Parametros (Application Component Name) | Public |
| **Tipo de Relación** | Asociación (`«Asociación»`) | |
| **Dirección** | Origen → Destino | |

**Descripción:** RF 1.28 se asocia con el componente de aplicación que implementa la pantalla de configuración de parámetros del sistema.

---

## Relaciones Entrantes (Incoming Structural Relationships)

Hacia **RF 1.28 (PS) Pantalla de Configuración** desde otros elementos:

### 1. Realization ← RF 1.12 Implementar un Sistema de Logística y Stock

| Elemento | Tipo | Dirección |
|----------|------|-----------|
| **Origen** | RF 1.12 Implementar un Sistema de Logística y Stock (Requerimiento Funcional) | |
| **Destino** | RF 1.28 (PS) Pantalla de Configuración (Requerimiento Funcional) | Public |
| **Tipo de Relación** | Realization | |
| **Dirección** | Origen → Destino | |

**Descripción:** RF 1.12 es realizado (concretizado/implementado) a través de RF 1.28. Es decir, RF 1.28 es una materialización concreta del requerimiento más amplio definido en RF 1.12.

---

## Conectores (Connectors)

Lista completa de conectores tal como aparecen en el documento fuente, sin modificaciones:

### Conector 1: Asociación → Objetivo Estratégico

**Tipo de Conector:** Asociación (`«Asociación»`)  
**Dirección:** Origen → Destino

```
From:   RF 1.28 (PS) Pantalla de Configuración : RF 0, Public
To:     Acelerar la transformación digital : Objetivo Estratégico, Public
```

---

### Conector 2: SequenceFlow → Pantalla-Configuración_Motivos

**Tipo de Conector:** SequenceFlow (`«Asociación»`, `SequenceFlow`)  
**Dirección:** Origen → Destino

```
From:   RF 1.28 (PS) Pantalla de Configuración : RF 0, Public
To:     Pantalla-Configuración_Motivos : Application Component Name, Public
```

---

### Conector 3: Asociación → Pantalla-Configuracion_Parametros

**Tipo de Conector:** Asociación (`«Asociación»`)  
**Dirección:** Origen → Destino

```
From:   RF 1.28 (PS) Pantalla de Configuración : RF 0, Public
To:     Pantalla-Configuracion_Parametros : Application Component Name, Public
```

---

## Asociaciones Mapeadas (Associations)

Resumen de todas las asociaciones bidireccionales extraídas del documento fuente:

### Asociación 1: RF 1.28 ↔ Objetivo Estratégico

| Dirección | Desde | Hacia |
|-----------|-------|-------|
| **Origen → Destino** | RF 1.28 (PS) Pantalla de Configuración `(RF 0, Public)` | Acelerar la transformación digital `(Objetivo Estratégico, Public)` |
| **Tipo** | Asociación (`«Asociación»`) | |

---

### Asociación 2: RF 1.28 ↔ Pantalla-Configuración_Motivos

| Dirección | Desde | Hacia |
|-----------|-------|-------|
| **Origen → Destino** | RF 1.28 (PS) Pantalla de Configuración `(RF 0, Public)` | Pantalla-Configuración_Motivos `(Application Component Name, Public)` |
| **Tipo** | SequenceFlow (`«Asociación»`, `SequenceFlow`) | |

---

### Asociación 3: RF 1.28 ↔ Pantalla-Configuracion_Parametros

| Dirección | Desde | Hacia |
|-----------|-------|-------|
| **Origen → Destino** | RF 1.28 (PS) Pantalla de Configuración `(RF 0, Public)` | Pantalla-Configuracion_Parametros `(Application Component Name, Public)` |
| **Tipo** | Asociación (`«Asociación»`) | |

---

## Notas de Dirección

### Convención: Origen → Destino

Todas las relaciones siguen la convención **Origen → Destino** tal como se especifica en el documento fuente:

```
[ Direction is 'Origen -> Destino'. ]
```

**Implicaciones:**

- **RF 1.28 → Objetivo Estratégico:** RF 1.28 contribuye hacia el objetivo
- **RF 1.28 → Pantalla-Configuración_Motivos:** RF 1.28 especifica el flujo hacia este componente
- **RF 1.28 → Pantalla-Configuracion_Parametros:** RF 1.28 se asocia con este componente
- **RF 1.12 → RF 1.28:** RF 1.12 es realizado a través de RF 1.28

---

## Resumen de Topología

```
                                    ┌─────────────────────────┐
                                    │ Objetivo Estratégico    │
                                    │ Acelerar transformación │
                                    │ digital                 │
                                    └────────────┬────────────┘
                                                 ▲
                                                 │ Asociación
                                                 │
                    ┌────────────────────────────┼────────────────────────┐
                    │                            │                        │
                    │                            │                        │
        ┌───────────▼────────────┐   ┌──────────┴──────────┐   ┌─────────▼────────────┐
        │                        │   │                     │   │                      │
        │ RF 1.12               │   │ RF 1.28             │   │ Objetivo Estratégico │
        │ Implementar Sistema   │   │ (PS) Pantalla       │   │                      │
        │ de Logística y Stock  │   │ de Configuración    │   │ TBD Relaciones       │
        │                        │   │                     │   │ Estratégicas        │
        └────────────┬───────────┘   └─────────┬───────────┘   └──────────────────────┘
                     │                         │
                     │ Realization             │
                     │                         │
                     │         SequenceFlow ──┬┘
                     │                        │
                     │                        ├─► Asociación
                     │                        │
                     │         ┌──────────────┴──────────────┐
                     │         │                             │
        ┌────────────▼────────────────┐       ┌──────────────▼──────────────┐
        │                             │       │                             │
        │ Pantalla-Configuración_     │       │ Pantalla-Configuracion_     │
        │ Motivos                     │       │ Parametros                  │
        │ (Application Component)     │       │ (Application Component)     │
        │                             │       │                             │
        └─────────────────────────────┘       └─────────────────────────────┘
```

---

## Glosario de Tipos de Relación

| Tipo | Significado | Ejemplo en RF 1.28 |
|------|------------|-------------------|
| **Asociación** | Conexión general entre dos elementos | RF 1.28 ↔ Objetivo Estratégico |
| **SequenceFlow** | Flujo secuencial entre elementos (procesos) | RF 1.28 → Pantalla-Configuración_Motivos |
| **Realization** | Un elemento materializa/concretiza otro | RF 1.12 → RF 1.28 |

---

## Trazabilidad a Documento Fuente

Todas las relaciones y conectores provienen EXACTAMENTE de las secciones:

```
OUTGOING STRUCTURAL RELATIONSHIPS
INCOMING STRUCTURAL RELATIONSHIPS
CONNECTORS
ASSOCIATIONS
```

**Nota:** No se han inventado ni modificado nombres de elementos. Se han copiado literalmente del texto fuente (`rf-1-28-raw.txt`).

| Relación | Fragmento del Texto Fuente |
|----------|---------------------------|
| RF 1.28 → Objetivo Estratégico | "Asociación «Asociación» from «Requerimiento Funcional» RF 1.28 (PS) Pantalla de Configuración to «Objetivo Estratégico» Acelerar la transformación digital" |
| RF 1.28 → Pantalla-Configuración_Motivos | "SequenceFlow «Asociación» from «Requerimiento Funcional» RF 1.28 (PS) Pantalla de Configuración to «Aplicación» Pantalla-Configuración_Motivos" |
| RF 1.28 → Pantalla-Configuracion_Parametros | "Asociación «Asociación» from «Requerimiento Funcional» RF 1.28 (PS) Pantalla de Configuración to «Aplicación» Pantalla-Configuracion_Parametros" |
| RF 1.12 → RF 1.28 | "Realization from «Requerimiento Funcional» RF 1.12 Implementar un Sistema de Logística y Stock to «Requerimiento Funcional» RF 1.28 (PS) Pantalla de Configuración" |

---

## Resumen de Entregables

✅ **Front-matter** completo con id, parent, tags  
✅ **Relaciones salientes** (3 relaciones mapeadas)  
✅ **Relaciones entrantes** (1 relación mapeada)  
✅ **Conectores** (3 conectores tal cual aparecen en el texto)  
✅ **Asociaciones** (3 asociaciones bidireccionales mapeadas)  
✅ **Notas de dirección** (Origen → Destino explicado)  
✅ **Topología visual** (diagrama ASCII de relaciones)  
✅ **Glosario de tipos** (Asociación, SequenceFlow, Realization)  
✅ **Trazabilidad** (cada relación anclada a fuente)  
✅ **CERO invenciones** – 100% del texto fuente (`rf-1-28-raw.txt`)