---
id: rf-1-17-relationships
title: "RF 1.17 · Relaciones y Conectores"
parent: rf-1-17-configuracion-sistema
tags: [relaciones, conectores, arquitectura]
---

# Relaciones estructurales de RF 1.17

Este documento mapea todas las relaciones y conectores explícitos definidos en el RF 1.17 (PS) Configuración de Sistema.

---

# Relaciones estructurales de salida (Outgoing)

El RF 1.17 tiene asociaciones de salida (origen) hacia los siguientes elementos:

## Funciones (PKG_CONFIG)

| Destino | Tipo | Dirección | Estado textual |
|---------|------|-----------|-----------------|
| PKG_CONFIG.TMFSS_CONSULTAR_MOTIVO | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSS_CONSULTAR_DISTRIBUIDOR | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSI_REGISTRAR_PARAMETRO | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSI_REGISTRAR_MOTIVO | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSU_ACTUALIZAR_PARAMETRO | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSU_ACTUALIZAR_MOTIVO | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSS_CONSULTAR_CENTRO | Application Function Name | Origen → Destino | ✓ Textual |
| PKG_CONFIG.TMFSS_CONSULTAR_PARAMETRO | Application Function Name | Origen → Destino | ✓ Textual |

**Fuente textual**: "Asociación «Asociación» from «Requerimiento Funcional» RF 1.17 (PS) Configuracion de Sistema to «Function» PKG_CONFIG.[nombre]"

## Objetivo estratégico

| Destino | Tipo | Dirección | Estado textual |
|---------|------|-----------|-----------------|
| Acelerar la transformación digital | Objetivo Estratégico | Origen → Destino | ✓ Textual |

**Fuente textual**: "Asociación «Asociación» from «Requerimiento Funcional» RF 1.17 (PS) Configuracion de Sistema to «Objetivo Estratégico» Acelerar la transformación digital"

## Servicio aplicativo

| Destino | Tipo | Dirección | Estado textual |
|---------|------|-----------|-----------------|
| bff-exp-gestion-config-reportes | Application Service Name | Origen → Destino | ✓ Textual |

**Fuente textual**: "Asociación «Asociación» from «Requerimiento Funcional» RF 1.17 (PS) Configuracion de Sistema to «Servicio» bff-exp-gestion-config-reportes"

---

# Relaciones estructurales de entrada (Incoming)

El RF 1.17 tiene asociaciones de entrada (destino) desde los siguientes elementos:

| Origen | Tipo | Relación | Destino | Dirección | Estado textual |
|--------|------|----------|---------|-----------|-----------------|
| RF 1.13 Configuración del Sistema | Requerimiento Funcional | Realization | RF 1.17 (PS) Configuracion de Sistema | Origen → Destino | ✓ Textual |

**Fuente textual**: "Realization from «Requerimiento Funcional» RF 1.13 Configuración del Sistema to «Requerimiento Funcional» RF 1.17 (PS) Configuracion de Sistema"

**Interpretación**: RF 1.13 (Configuración del Sistema) se materializa en RF 1.17 (PS) Configuración de Sistema.

---

# Conectores (Connectors)

Los siguientes conectores explícitos formalizan las relaciones anteriormente descritas:

## Conectores de salida (RF 1.17 → Destino)

### Conectores hacia Funciones PKG_CONFIG

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSS_CONSULTAR_MOTIVO (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSS_CONSULTAR_DISTRIBUIDOR (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSI_REGISTRAR_PARAMETRO (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSI_REGISTRAR_MOTIVO (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSU_ACTUALIZAR_PARAMETRO (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSU_ACTUALIZAR_MOTIVO (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSS_CONSULTAR_CENTRO (Application Function Name, Public)
```

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: PKG_CONFIG.TMFSS_CONSULTAR_PARAMETRO (Application Function Name, Public)
```

### Conector hacia Objetivo Estratégico

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: Acelerar la transformación digital (Objetivo Estratégico, Public)
```

### Conector hacia Servicio Aplicativo

```
Asociación (direction: Origen → Destino) «Asociación»
Source: RF 1.17 (PS) Configuracion de Sistema (RF 0, Public)
Target: bff-exp-gestion-config-reportes (Application Service Name, Public)
```

---

# Mapa consolidado de relaciones

## Resumen por tipo de destino

| Tipo de destino | Cantidad | Ejemplos |
|-----------------|----------|----------|
| Funciones PKG_CONFIG | 8 | CONSULTAR_MOTIVO, REGISTRAR_MOTIVO, ACTUALIZAR_MOTIVO, etc. |
| Objetivo Estratégico | 1 | Acelerar la transformación digital |
| Servicio Aplicativo | 1 | bff-exp-gestion-config-reportes |
| **Total de relaciones de salida** | **10** | - |
| Relaciones de entrada | 1 | RF 1.13 → RF 1.17 (Realization) |

---

# Análisis de relaciones

## Funciones PKG_CONFIG mapeadas

Basado en las relaciones explícitas, el RF 1.17 se conecta a las siguientes funciones del paquete PKG_CONFIG:

### Funciones de consulta (TMFSS_*)
- **TMFSS_CONSULTAR_MOTIVO**: Consultar motivos del sistema
- **TMFSS_CONSULTAR_DISTRIBUIDOR**: Consultar distribuidores ⚠️ **TBD**: confirmación (no mencionado en 1.17.8 explícitamente)
- **TMFSS_CONSULTAR_CENTRO**: Consultar centros ⚠️ **TBD**: confirmación (no mencionado en RF)
- **TMFSS_CONSULTAR_PARAMETRO**: Consultar parámetros del sistema

### Funciones de registro (TMFSI_*)
- **TMFSI_REGISTRAR_MOTIVO**: Registrar motivos
- **TMFSI_REGISTRAR_PARAMETRO**: Registrar parámetros

### Funciones de actualización (TMFSU_*)
- **TMFSU_ACTUALIZAR_MOTIVO**: Actualizar motivos
- **TMFSU_ACTUALIZAR_PARAMETRO**: Actualizar parámetros

**Nota sobre nomenclatura**: 
- TMFSS = Transactional Middle Functional Services Sync (Consulta)
- TMFSI = Transactional Middle Functional Services Insert (Registro)
- TMFSU = Transactional Middle Functional Services Update (Actualización)

## Servicio de frontend (BFF)

El RF 1.17 se conecta explícitamente al servicio:
- **bff-exp-gestion-config-reportes**: Backend For Frontend especializado en gestión de configuración y reportes

**Interpretación**: Este BFF es la capa de integración hacia los clientes frontend que consumen el API de configuración del sistema.

## Objetivo estratégico

El RF 1.17 contribuye al logro del objetivo estratégico:
- **Acelerar la transformación digital**: La configuración parametrizable del sistema es un habilitador clave para la flexibilidad operacional y la transformación digital.

## Relación de herencia/materialización

El RF 1.17 es una **materialización** del RF 1.13 (Configuración del Sistema):
- **RF 1.13 (General)** → **RF 1.17 (PS) (Especializada en Parámetros de Sistema)**
- Relación: Realization
- Significado: RF 1.17 implementa/concretiza los requisitos más generales de RF 1.13

---

# Especificaciones pendientes (TBD)

- **TMFSS_CONSULTAR_DISTRIBUIDOR**: No se menciona en la descripción del RF 1.17, pero aparece en relaciones. **TBD**: aclarar relación con empresas de transporte o almacenes.
- **TMFSS_CONSULTAR_CENTRO**: No se menciona en la descripción del RF 1.17, pero aparece en relaciones. **TBD**: aclarar qué es "centro" (almacén, punto de distribución, etc.).
- **Significado de "distribuidor"**: ¿Es sinónimo de "empresa transporte" u "almacén"? **TBD**: mapeo de términos.
- **Servicios consumidores del BFF**: ¿Qué otros servicios consume `bff-exp-gestion-config-reportes` además de PKG_CONFIG? **TBD**: dependencias del BFF.
- **Versión del RF 1.13**: ¿Está RF 1.13 documentado en otra sección? **TBD**: referencia a RF 1.13.

