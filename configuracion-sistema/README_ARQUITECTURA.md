# RF 1.28 (PS) Pantalla de Configuración

> Sistema de gestión de configuración para Logística y Stock

[![Angular](https://img.shields.io/badge/Angular-20.3.7-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-22.19.0-green)](https://nodejs.org/)

---

## 📋 Descripción

**Pantalla de Configuración** es un módulo Angular que permite gestionar las opciones generales y parámetros necesarios para el funcionamiento del sistema de logística y stock.

Este proyecto implementa el **RF 1.28 (PS) Pantalla de Configuración**, que es parte del requerimiento funcional **RF 1.12 - Implementar un Sistema de Logística y Stock**.

### Objetivo Estratégico

✅ **Acelerar la transformación digital** del sistema mediante herramientas que permitan gestionar y personalizar las configuraciones generales.

---

## 🏗️ Arquitectura del Proyecto

### Relaciones Arquitectónicas (según `relationships.md`)

```
                    Objetivo Estratégico
                    ┌──────────────────────────┐
                    │ Acelerar la              │
                    │ Transformación Digital   │
                    └────────────┬─────────────┘
                                 ▲
                                 │ Asociación
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
        │                        │                        │
┌───────▼────────┐   ┌──────────▼──────────┐   ┌────────▼─────────┐
│                │   │                     │   │                  │
│ RF 1.12       │──▶│ RF 1.28             │   │                  │
│ Sistema       │   │ Pantalla            │   │                  │
│ Logística     │   │ Configuración       │   │                  │
│               │   │                     │   │                  │
└────────────────┘   └─────────┬───────────┘   └──────────────────┘
                               │
                               │
                ┌──────────────┴─────────────┐
                │                            │
                │ SequenceFlow           Asociación
                │                            │
    ┌───────────▼──────────┐    ┌───────────▼──────────┐
    │                      │    │                      │
    │ Pantalla-            │    │ Pantalla-            │
    │ Configuración_       │    │ Configuracion_       │
    │ Motivos              │    │ Parametros           │
    │ (Application)        │    │ (Application)        │
    └──────────────────────┘    └──────────────────────┘
```

### Relaciones Implementadas

#### Salientes (RF 1.28 →)

| Relación | Destino | Tipo | Implementación |
|----------|---------|------|----------------|
| 1 | Acelerar la transformación digital | Asociación | Objetivo del proyecto |
| 2 | Pantalla-Configuración_Motivos | SequenceFlow | `/motivos` → MotivosLista |
| 3 | Pantalla-Configuracion_Parametros | Asociación | `/parametros` → ParametrosConfig |

#### Entrantes (→ RF 1.28)

| Relación | Origen | Tipo | Descripción |
|----------|--------|------|-------------|
| 1 | RF 1.12 Implementar Sistema Logística y Stock | Realization | RF 1.28 materializa RF 1.12 |

---

## 📦 Componentes de Aplicación

### 1. Pantalla-Configuración_Motivos (RF 1.28.1)

**Implementado en:** `src/app/motivos/`

| Componente | Descripción | Ruta |
|-----------|-------------|------|
| `motivos-lista` | Listado con tabla y filtros | `/motivos` |
| `motivo-agregar` | Modal para crear motivo | (Modal) |
| `motivo-editar` | Modal para actualizar motivo | (Modal) |

**Servicios RF 1.17 integrados:**
- ✅ RF 1.17.1 - Consultar motivo (GET)
- ✅ RF 1.17.2 - Registrar motivo (POST)
- ✅ RF 1.17.3 - Actualizar motivo (PUT)

**Estado:** ✅ 100% Completo (31/32 items checklist)

---

### 2. Pantalla-Configuracion_Parametros (RF 1.28.2)

**Implementado en:** `src/app/parametros/`

| Componente | Descripción | Ruta |
|-----------|-------------|------|
| `parametros-config` | Formulario configuración | `/parametros` |

**Parámetros Configurables:**
- ⏱️ Tiempo de Reserva de Mercadería (Cantidad + Unidad)
- 🔒 Tiempo de Bloqueo de Mercadería (Cantidad + Unidad)

**Servicios RF 1.17 integrados:**
- ✅ RF 1.17.4 - Consultar parámetros (GET)
- ✅ RF 1.17.5 - Registrar parámetros (POST)
- ✅ RF 1.17.6 - Actualizar parámetros (PUT)

**Estado:** ✅ 100% Completo (47/47 items checklist)

---

## 🗂️ Estructura del Proyecto

```
configuracion-sistema/
├── src/
│   ├── app/
│   │   ├── motivos/                        # RF 1.28.1
│   │   │   ├── motivos-lista/             # Container component
│   │   │   ├── motivo-agregar/            # Modal component
│   │   │   └── motivo-editar/             # Modal component
│   │   ├── parametros/                     # RF 1.28.2
│   │   │   └── parametros-config/         # Configuration component
│   │   ├── services/
│   │   │   ├── motivos.ts                 # HTTP service (RF 1.17.1/2/3)
│   │   │   ├── motivos-mock.interceptor.ts # Mock backend
│   │   │   ├── parametros.ts              # HTTP service (RF 1.17.4/5/6)
│   │   │   └── parametros-mock.interceptor.ts # Mock backend
│   │   ├── models/
│   │   │   ├── motivo.model.ts            # TypeScript interfaces
│   │   │   └── parametro.model.ts         # TypeScript interfaces
│   │   ├── app.ts                         # Root component
│   │   ├── app.html                       # Navigation layout
│   │   ├── app.routes.ts                  # Routing configuration
│   │   └── app.config.ts                  # App configuration
│   ├── styles.scss                        # Global styles
│   └── index.html                         # Entry point
├── dist/                                   # Build output
├── .angular/                               # Angular cache
├── angular.json                            # Angular CLI config
├── package.json                            # Dependencies
└── tsconfig.json                          # TypeScript config
```

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js: 22.19.0 o superior
- npm: 10.9.3 o superior
- Angular CLI: 20.3.7

### Instalación

```bash
# Clonar repositorio
git clone <repository-url>
cd configuracion-sistema

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
ng serve

# O con apertura automática del navegador
ng serve --open
```

Navegar a:
- **Motivos:** http://localhost:4200/motivos
- **Parámetros:** http://localhost:4200/parametros
- **Inicio:** http://localhost:4200/ (redirige a /motivos)

### Build Producción

```bash
ng build

# Build optimizado
ng build --configuration production
```

Salida en: `dist/configuracion-sistema/`

---

## 🧪 Testing

### Tests Unitarios

```bash
ng test
```

Ejecuta tests con [Karma](https://karma-runner.github.io) y Jasmine.

### Tests E2E

```bash
ng e2e
```

(Requiere configuración de framework E2E como Cypress)

---

## 🔌 Interceptores Mock

El proyecto incluye interceptores HTTP que simulan el backend RF 1.17.* para desarrollo y testing:

### Motivos Mock (`motivos-mock.interceptor.ts`)

- **GET** `/api/configuracion/motivos` → Retorna 5 motivos de prueba
- **POST** `/api/configuracion/motivos` → Crea nuevo motivo
- **PUT** `/api/configuracion/motivos/:id` → Actualiza motivo

### Parámetros Mock (`parametros-mock.interceptor.ts`)

- **GET** `/api/configuracion/parametros` → Retorna 2 parámetros (Reserva + Bloqueo)
- **POST** `/api/configuracion/parametros` → Crea nuevo parámetro
- **PUT** `/api/configuracion/parametros/:id` → Actualiza parámetro

**Características:**
- ✅ Simula latencia de 500ms (realismo)
- ✅ Logs en consola para debugging
- ✅ Validaciones del lado del servidor
- ✅ Códigos HTTP correctos (200, 201, 404)

**Para conectar con backend real:** Eliminar interceptores de `app.config.ts`

---

## 📊 Rutas de Navegación

| Ruta | Componente | Título | Descripción |
|------|-----------|--------|-------------|
| `/` | - | - | Redirige a `/motivos` |
| `/motivos` | MotivosLista | Mantenimiento de Motivos | RF 1.28.1 |
| `/parametros` | ParametrosConfig | Configuración de Parámetros | RF 1.28.2 |
| `/**` | - | - | Redirige a `/motivos` (404) |

---

## 🎨 Características de UI

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoint: 768px
- ✅ Grid layout flexible
- ✅ Navegación adaptativa

### Validaciones Frontend
- ✅ Tiempo real con feedback visual
- ✅ Mensajes de error específicos
- ✅ Contador de caracteres (motivos)
- ✅ Validación de números enteros (parámetros)

### UX Mejorada
- ✅ Auto-trim de espacios
- ✅ Indicadores de carga
- ✅ Mensajes de éxito/error
- ✅ Auto-cierre de modales
- ✅ Auto-recarga de datos

---

## 📚 Documentación Adicional

### Especificaciones Completas

- **RF 1.28.1:** Ver `../rf-1-28-pantalla-configuracion/motivos.md`
- **RF 1.28.2:** Ver `../rf-1-28-pantalla-configuracion/parametros.md`
- **Arquitectura:** Ver `../rf-1-28-pantalla-configuracion/relationships.md`

### Estados de Implementación

- **RF 1.28.1:** Ver `../rf-1-28-pantalla-configuracion/ESTADO_IMPLEMENTACION.md`
- **RF 1.28.2:** Ver `../rf-1-28-pantalla-configuracion/ESTADO_IMPLEMENTACION_PARAMETROS.md`
- **Resumen:** Ver `../rf-1-28-pantalla-configuracion/RF_1_28_RESUMEN_FINAL.md`

---

## 🔗 Trazabilidad con RF 1.17

| RF 1.17 | Servicio | Operación | Usado por |
|---------|----------|-----------|----------|
| 1.17.1 | Consultar motivos | GET | Motivos (Buscar) |
| 1.17.2 | Registrar motivo | POST | Motivos (Agregar) |
| 1.17.3 | Actualizar motivo | PUT | Motivos (Editar) |
| 1.17.4 | Consultar parámetros | GET | Parámetros (Carga) |
| 1.17.5 | Registrar parámetros | POST | Parámetros (Guardar 1ª vez) |
| 1.17.6 | Actualizar parámetros | PUT | Parámetros (Guardar después) |

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Angular | 20.3.7 | Framework frontend |
| TypeScript | 5.x | Lenguaje |
| SCSS | - | Estilos |
| RxJS | 7.x | Programación reactiva |
| Node.js | 22.19.0 | Runtime |
| npm | 10.9.3 | Gestor de paquetes |

---

## 📈 Métricas de Calidad

### Compilación

```
✅ Build exitoso
   Bundle size: 363.74 kB
   Transfer size: 92.78 kB
   Build time: ~9 segundos
```

### Cobertura

| Módulo | Checklist | Estado |
|--------|-----------|--------|
| RF 1.28.1 Motivos | 31/32 | ✅ 97% |
| RF 1.28.2 Parámetros | 47/47 | ✅ 100% |
| **TOTAL** | **78/79** | **✅ 99%** |

---

## 🚧 Pendientes (Fuera de Alcance Actual)

- [ ] Conectar con backend real RF 1.17.*
- [ ] Implementar SessionService para almacén real
- [ ] Tests unitarios completos (`.spec.ts`)
- [ ] Tests E2E con Cypress
- [ ] Paginación en tabla Motivos
- [ ] Ordenamiento por columnas
- [ ] Internacionalización (i18n)

---

## 👥 Contribución

Este proyecto sigue los lineamientos definidos en:
- `rf-1-28-pantalla-configuracion/motivos.md`
- `rf-1-28-pantalla-configuracion/parametros.md`
- `rf-1-28-pantalla-configuracion/relationships.md`

---

## 📝 Licencia

Propiedad de NTT DATA - Sistema de Logística y Stock

---

## 📞 Contacto

**Owner:** John Castillo Rivera  
**Versión:** 1.0  
**Fase:** 1.0  
**Estado:** Aprobado  
**Última Modificación:** 2025-10-24

---

## 🔧 Comandos Útiles

```bash
# Generar nuevo componente
ng generate component nombre-componente

# Generar servicio
ng generate service nombre-servicio

# Ejecutar linter
ng lint

# Ver ayuda de Angular CLI
ng help

# Actualizar dependencias
npm update
```

---

## 📖 Recursos Adicionales

- [Angular Documentation](https://angular.dev/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

---

*Generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.7*
