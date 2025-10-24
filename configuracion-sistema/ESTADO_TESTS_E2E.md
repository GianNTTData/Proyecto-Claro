# Estado de Pruebas E2E - Playwright

**Fecha**: 24 de octubre de 2025  
**Proyecto**: RF 1.28 Pantalla de Configuración  
**Framework**: Playwright + Angular 20.3.7

---

## 📊 Resumen Ejecutivo

| Métrica | Valor | Estado |
|:--------|:------|:-------|
| **Tests Implementados** | 15 | ✅ Completo |
| **Tests Ejecutados** | 15 | ✅ |
| **Tests Pasados** | 0 | ❌ |
| **Tests Fallidos** | 15 | ⚠️ |
| **Cobertura Funcional** | 100% | ✅ |
| **Atributos data-test** | 11 | ✅ |

---

## 🎯 Casos de Prueba Implementados

### RF 1.28.1: Mantenimiento de Motivos (5 tests)

| ID | Descripción | Validaciones |
|:---|:------------|:-------------|
| **MOT-01** | Buscar motivos con filtros | RF 1.17.1, parámetros query, almacén de sesión |
| **MOT-02** | Agregar motivo con validaciones | RF 1.17.2, campo obligatorio, longitud 3-100 |
| **MOT-03** | Editar motivo y guardar | RF 1.17.3, PUT con ID correcto |
| **MOT-04** | Validar trim de espacios | trim() aplicado antes de envío |
| **MOT-05** | Limpiar filtros | Restauración de valores iniciales |

### RF 1.28.2: Parámetros (10 tests)

| ID | Descripción | Validaciones |
|:---|:------------|:-------------|
| **PAR-01** | Carga inicial de parámetros | RF 1.17.4, valores precargados |
| **PAR-02** | Campo obligatorio | Mensaje "La cantidad es obligatoria" |
| **PAR-03** | Cantidad > 0 | Mensaje "La cantidad debe ser mayor a 0" |
| **PAR-04** | Solo números positivos | Rechazo de valores negativos |
| **PAR-05** | Solo números enteros | Rechazo de decimales |
| **PAR-06** | Actualizar parámetros | RF 1.17.6 (PUT), forkJoin |
| **PAR-07** | Registrar nuevos | RF 1.17.5 (POST), sin ID |
| **PAR-08** | Validar ambas secciones | Validación simultánea |
| **PAR-09** | Cambiar unidad de medida | Solo modificar dropdown |
| **PAR-10** | Estado de guardado | Botón deshabilitado, texto "Guardando..." |

---

## 🔴 Problemas Detectados

### 1. **Problema Principal: Componentes no cargan**

**Síntoma**: Timeouts de 30000ms al intentar encontrar elementos con `data-test`

**Ejemplos de errores**:
```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
waiting for locator('[data-test="tabla-motivos"] tbody tr')

Error: element(s) not found
waiting for locator('[data-test="input-reserva-cantidad"]')
```

**Causa raíz probable**:
- Los componentes Angular no se están renderizando correctamente
- Los mocks de interceptores no están funcionando con Playwright
- Posible conflicto entre los interceptores mock del código (`motivos-mock.interceptor.ts`) y los mocks de Playwright (`page.route()`)

### 2. **Configuración de rutas**

**Rutas configuradas**: `/motivos`, `/parametros`  
**Tests intentan acceder**: `page.goto('/motivos')`, `page.goto('/parametros')`

**Verificación necesaria**:
- Confirmar que las rutas funcionan en el navegador real
- Verificar si el servidor de desarrollo está respondiendo correctamente

---

## 🛠️ Archivos Creados/Modificados

### Nuevos archivos

| Archivo | Propósito | Estado |
|:--------|:----------|:-------|
| `playwright.config.ts` | Configuración de Playwright | ✅ Creado |
| `tests/motivos.spec.ts` | 5 casos de prueba para motivos | ✅ Creado |
| `tests/parametros.spec.ts` | 10 casos de prueba para parámetros | ✅ Creado |

### Archivos modificados

| Archivo | Cambios | Atributos agregados |
|:--------|:--------|:-------------------|
| `motivos-lista.html` | Agregados data-test | `filtro-descripcion`, `filtro-estado`, `buscar-motivos`, `agregar-motivo`, `tabla-motivos`, `editar-motivo-{id}` |
| `motivo-agregar.html` | Agregados data-test | `modal-motivo`, `input-descripcion`, `select-estado`, `guardar-motivo` |
| `motivo-editar.html` | Agregados data-test | `input-descripcion`, `select-estado`, `guardar-motivo` |
| `parametros-config.html` | Agregados data-test | `input-reserva-cantidad`, `select-reserva-unidad`, `input-bloqueo-cantidad`, `select-bloqueo-unidad`, `guardar-parametros` |
| `package.json` | Scripts de Playwright | `test:e2e`, `test:e2e:ui`, `test:e2e:report` |

---

## 📋 Próximos Pasos Recomendados

### Prioridad ALTA

1. **Verificar servidor de desarrollo**
   ```powershell
   # El servidor debe estar corriendo en http://localhost:4200
   # Confirmar que las rutas /motivos y /parametros funcionan manualmente
   ```

2. **Desactivar interceptores mock en tests**
   - Los interceptores TypeScript (`motivos-mock.interceptor.ts`, `parametros-mock.interceptor.ts`) pueden estar interfiriendo
   - Opción A: Deshabilitar interceptors en `app.config.ts` para pruebas E2E
   - Opción B: Usar variable de entorno para condicionar interceptores

3. **Ajustar configuración de Playwright**
   ```typescript
   // En playwright.config.ts, aumentar timeout inicial
   use: {
     baseURL: 'http://localhost:4200',
     trace: 'on-first-retry',
     screenshot: 'only-on-failure',
     timeout: 60000, // Aumentar a 60 segundos
   },
   ```

### Prioridad MEDIA

4. **Agregar esperas explícitas**
   ```typescript
   // Esperar a que Angular termine de cargar
   await page.waitForLoadState('networkidle');
   await page.waitForSelector('[data-test="filtro-descripcion"]');
   ```

5. **Verificar mocks de Playwright**
   - Los mocks con `page.route()` deben configurarse ANTES de navegar a la página
   - Agregar logs para confirmar que las rutas están siendo interceptadas

### Prioridad BAJA

6. **Optimizar selectores**
   - Algunos selectores dinámicos (`[data-test="editar-motivo-${id}"]`) requieren `attr.data-test`
   - Verificar que Angular esté renderizando correctamente estos atributos

7. **Agregar test de navegación global (GLO-01)**
   - Crear `tests/navigation.spec.ts`
   - Validar que el menú de navegación funciona

---

## 🎬 Cómo Ejecutar las Pruebas

### Opción 1: Línea de comandos

```powershell
# Asegurarse de que el servidor de desarrollo está corriendo
npm run start

# En otra terminal, ejecutar los tests
npm run test:e2e

# Ver el reporte HTML
npm run test:e2e:report
```

### Opción 2: Modo UI (recomendado para debugging)

```powershell
npm run test:e2e:ui
```

### Opción 3: Test individual

```powershell
# Ejecutar solo un archivo
npx playwright test tests/motivos.spec.ts

# Ejecutar un test específico por nombre
npx playwright test -g "MOT-01"
```

---

## 📸 Evidencias Generadas

Playwright ha generado automáticamente:

- **Screenshots**: `test-results/*/test-failed-*.png` (15 capturas)
- **Traces**: `test-results/*/trace.zip` (15 archivos para debugging)
- **Reporte HTML**: `playwright-report/index.html`

### Ver trace de un test fallido

```powershell
npx playwright show-trace test-results/motivos-RF-1-28-1-Mantenim-96f00-con-validaciones-y-guardado-chromium-retry1/trace.zip
```

---

## ✅ Cumplimiento con tests.md

| Requisito de tests.md | Estado | Notas |
|:----------------------|:-------|:------|
| Estrategia E2E definida | ✅ | Playwright sobre Angular frontend |
| Base URL configurada | ✅ | `http://localhost:4200` |
| Mocks de backend | ✅ | Implementados con `page.route()` |
| Atributos data-test | ✅ | 11 atributos agregados en 4 componentes |
| playwright.config.ts | ✅ | Configurado con chromium, reporters |
| Scripts NPM | ✅ | `test:e2e`, `test:e2e:ui`, `test:e2e:report` |
| Matriz de casos de prueba | ✅ | 15 casos (5 motivos + 10 parámetros) |
| Validación de RF 1.17.* | ✅ | Todos los servicios mockeados |
| Anti-alucinación | ✅ | Cada test cita sección de MD fuente |

---

## 🔍 Análisis de Fallos

### Patrón común en todos los fallos

```
Test timeout of 30000ms exceeded.
Error: page.waitForSelector: Test timeout
waiting for locator('[data-test="..."]')
```

**Interpretación**: Los elementos con `data-test` nunca se renderizan en el DOM, lo que sugiere:

1. El componente Angular no se está inicializando
2. El routing no está funcionando correctamente con Playwright
3. Los interceptores mock están bloqueando la carga inicial

### Tests con timeout en carga inicial

- **PAR-01 a PAR-10**: Todos fallan al no encontrar `[data-test="input-reserva-cantidad"]`
- Esto indica que el componente `parametros-config` no se carga en absoluto

### Tests con timeout en búsqueda de tabla

- **MOT-03**: Falla después de `page.reload()` esperando `tabla-motivos`
- Sugiere que los mocks de Playwright no persisten después del reload

---

## 📝 Notas Técnicas

### Interceptores Mock vs Mocks de Playwright

**Conflicto potencial**:
```typescript
// En app.config.ts
withInterceptors([motivosMockInterceptor, parametrosMockInterceptor])

// En tests/*.spec.ts
await page.route('**/api/config/motivos*', route => {...})
```

**Ambos** están intentando interceptar las mismas rutas, lo que puede causar comportamiento impredecible.

### Solución propuesta

Crear un flag de entorno para deshabilitar interceptores en pruebas E2E:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      process.env['E2E_TESTING'] 
        ? withInterceptors([]) // Sin interceptores en E2E
        : withInterceptors([motivosMockInterceptor, parametrosMockInterceptor])
    ),
    // ...
  ]
};
```

---

## 🎯 Métricas de Calidad

| Métrica | Valor Actual | Objetivo | Estado |
|:--------|:-------------|:---------|:-------|
| Cobertura de requisitos | 100% | 100% | ✅ |
| Tests implementados vs. planificados | 15/15 | 100% | ✅ |
| Tests pasando | 0/15 | 15/15 | ❌ |
| Atributos data-test | 11 | 11 | ✅ |
| Documentación | Completa | Completa | ✅ |

---

## 🔗 Referencias

- **Especificación**: `rf-1-28-pantalla-configuracion/tests.md`
- **Requerimientos**: `rf-1-28-pantalla-configuracion/motivos.md`, `parametros.md`
- **Backend Mock**: `rf-1-17-configuracion-sistema/backend Java REST.md`
- **Playwright Docs**: https://playwright.dev/

---

## 📌 Conclusión

**Estado general**: 🟡 **En progreso**

✅ **Completado**:
- Instalación y configuración de Playwright
- Implementación de 15 casos de prueba exhaustivos
- Adición de atributos `data-test` en todos los componentes clave
- Configuración de mocks de backend

❌ **Pendiente**:
- Resolver conflicto de interceptores mock
- Lograr que los componentes Angular se rendericen correctamente en Playwright
- Hacer pasar los 15 tests

🎯 **Siguiente acción recomendada**: Verificar manualmente que `http://localhost:4200/motivos` funciona en el navegador, luego ajustar la configuración de interceptores para pruebas E2E.
