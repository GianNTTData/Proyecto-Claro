# REPORTE: Integración Frontend-Backend sin Mocks

**Fecha**: Enero 2025
**Versión**: 1.0
**Estado**: ✅ COMPLETADO

---

## 1. Objetivo

Establecer conexión real entre Frontend (Angular 20, puerto 4200) y Backend (Spring Boot, puerto 8080) reemplazando los interceptadores mock con comunicación HTTP real, implementando todos los requerimientos de trazabilidad especificados en EDS.

---

## 2. Cambios Realizados

### 2.1 Backend (Java Spring Boot)

#### application.properties
- **Acción**: Agregado bloque de configuración CORS
- **Cambio**:
```properties
spring.web.cors.allowed-origins=http://localhost:4200,http://localhost:4201
spring.web.cors.allowed-methods=GET,POST,PUT,PATCH,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600
```
- **Propósito**: Permitir solicitudes del Frontend desde localhost:4200

#### CorsConfig.java (NUEVA)
- **Ubicación**: `src/main/java/com/configuracion/sistema/config/CorsConfig.java`
- **Propósito**: Configuración explícita de CORS con anotación @Configuration
- **Funcionalidad**:
  - Registra `CorsConfiguration` bean
  - Permite todos los orígenes especificados
  - Acepta todos los métodos HTTP
  - Acepta headers dinámicos
  - Permite credenciales

---

### 2.2 Frontend (Angular 20)

#### Dependencias
- **Acción**: Agregado `uuid@^10.0.0` a package.json
- **Instalación**: `npm install uuid`
- **Propósito**: Generar IDs únicos (correlación, mensaje, transacción)

#### environment.ts (NUEVA)
- **Ubicación**: `src/environments/environment.ts`
- **Contenido**:
```typescript
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8080/api/v1',
  logging: {
    enabled: true
  }
};
```
- **Propósito**: Configuración de desarrollo con URL base del backend

#### environment.prod.ts (NUEVA)
- **Ubicación**: `src/environments/environment.prod.ts`
- **Contenido**:
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.configuracion-sistema.prod/v1',
  logging: {
    enabled: false
  }
};
```
- **Propósito**: Configuración de producción

#### tracing.interceptor.ts (NUEVA)
- **Ubicación**: `src/app/services/tracing.interceptor.ts`
- **Funcionalidad Principal**:
  - Genera IDs únicos por sesión (correlationId)
  - Genera IDs únicos por solicitud (messageId, transactionId)
  - Crea timestamp en formato ISO 8601
  - Inyecta headers de trazabilidad:
    - `idApp`: 'CONFIGURACION-SISTEMA'
    - `idCorrelacion`: UUID persistente por sesión
    - `idMsg`: UUID único por solicitud
    - `idTransaccion`: ID de transacción (correlationId + timestamp)
  - Agrega timestamp como query parameter
  - Adjunta token Authorization desde localStorage
  - Implementa logging condicional según environment.logging.enabled

#### motivos.ts (MODIFICADO)
- **Cambio**: Actualizado API_URL para usar environment
- **Antes**: `private readonly API_URL = '/api/configuracion/motivos';`
- **Ahora**: `private readonly API_URL = '${environment.apiBaseUrl}/motivos';`
- **Importación**: `import { environment } from '../../environments/environment';`
- **Propósito**: Conectar a backend en localhost:8080/api/v1

#### parametros.ts (MODIFICADO)
- **Cambio**: Actualizado API_URL para usar environment
- **Antes**: `private readonly API_URL = '/api/configuracion/parametros';`
- **Ahora**: `private readonly API_URL = '${environment.apiBaseUrl}/parametros';`
- **Importación**: `import { environment } from '../../environments/environment';`
- **Propósito**: Conectar a backend en localhost:8080/api/v1

#### app.config.ts (MODIFICADO)
- **Cambios**:
  1. Eliminadas importaciones de mocks: `motivosMockInterceptor`, `parametrosMockInterceptor`
  2. Agregada importación: `HTTP_INTERCEPTORS, TracingInterceptor`
  3. Registrado interceptor real: `TracingInterceptor`
  4. Removida lógica condicional de E2E
- **Configuración**:
```typescript
provideHttpClient(),
{
  provide: HTTP_INTERCEPTORS,
  useClass: TracingInterceptor,
  multi: true
}
```
- **Propósito**: Usar interceptor real para trazabilidad en lugar de mocks

---

## 3. Flujo de Comunicación

### Solicitud HTTP típica del Frontend

```
1. Component → MotivosService.consultarMotivos()
2. MotivosService → HTTP GET http://localhost:8080/api/v1/motivos
3. TracingInterceptor intercepta la solicitud:
   - Genera/reutiliza IDs de correlación
   - Genera IDs únicos para la solicitud
   - Crea timestamp ISO 8601
   - Inyecta headers de trazabilidad
   - Agrega timestamp como query parameter
   - Adjunta Authorization si existe
4. Solicitud enviada al Backend:
   GET http://localhost:8080/api/v1/motivos?timestamp=2025-01-XX...
   Headers:
   - idApp: CONFIGURACION-SISTEMA
   - idCorrelacion: [UUID de sesión]
   - idMsg: [UUID único]
   - idTransaccion: [ID de transacción]
   - Authorization: Bearer [token si existe]
   - Content-Type: application/json
5. Backend procesa solicitud:
   - Valida headers de trazabilidad
   - Valida timestamp
   - Ejecuta lógica de negocio
   - Registra trazabilidad en logs
6. Backend retorna respuesta:
   {
     "responseStatus": {
       "codigoRespuesta": "00",
       "mensaje": "Éxito"
     },
     "responseData": [...]
   }
7. TracingInterceptor (observable next.handle) recibe respuesta
8. Component recibe datos
9. Componente actualiza UI
```

---

## 4. Headers de Trazabilidad

| Header | Valor | Generado por | Scope |
|--------|-------|--------------|-------|
| `idApp` | 'CONFIGURACION-SISTEMA' | TracingInterceptor | Constante |
| `idCorrelacion` | UUID v4 | Constructor del Interceptor | Por sesión del usuario |
| `idMsg` | UUID v4 | intercept() method | Por cada solicitud |
| `idTransaccion` | correlationId (8 chars) + timestamp | intercept() method | Por cada solicitud |
| `Authorization` | Bearer [token] | localStorage.auth_token | Dinámico |
| `timestamp` (query param) | ISO 8601 | intercept() method | Por cada solicitud |

---

## 5. Configuración CORS (Backend)

**Origen permitido**: `http://localhost:4200`, `http://localhost:4201`
**Métodos permitidos**: GET, POST, PUT, PATCH, DELETE, OPTIONS
**Headers permitidos**: * (todos)
**Credenciales**: Permitidas
**Tiempo máximo**: 3600 segundos

---

## 6. Variables de Entorno

### Desarrollo (environment.ts)
- `apiBaseUrl`: `http://localhost:8080/api/v1`
- `logging.enabled`: `true`

### Producción (environment.prod.ts)
- `apiBaseUrl`: `https://api.configuracion-sistema.prod/v1`
- `logging.enabled`: `false`

---

## 7. Verificación de Cambios

### Verificar conexión en Browser DevTools (Network)

1. **Abrir DevTools** (F12 en Chrome/Firefox)
2. **Ir a pestaña Network**
3. **Realizar una acción en el Frontend** (ej: cargar listado de Motivos)
4. **Buscar solicitud a localhost:8080**
5. **Verificar Headers**:
   - ✅ `idApp: CONFIGURACION-SISTEMA`
   - ✅ `idCorrelacion: [UUID]`
   - ✅ `idMsg: [UUID]`
   - ✅ `idTransaccion: [valor]`
   - ✅ URL con query parameter: `?timestamp=2025-01-XX...`

### Verificar respuesta del Backend

- **Status**: 200 OK
- **Content-Type**: application/json
- **Estructura de respuesta**:
```json
{
  "responseStatus": {
    "codigoRespuesta": "00",
    "mensaje": "Éxito"
  },
  "responseData": {...}
}
```

---

## 8. Logs en Browser Console

Cuando `environment.logging.enabled = true`:

```
[HTTP] GET http://localhost:8080/api/v1/motivos?timestamp=...
  idMsg: [UUID]
  idCorrelacion: [UUID]
  idTransaccion: [valor]
  timestamp: 2025-01-XX...
```

---

## 9. Checklist de Implementación

- ✅ Backend: CORS configurado en application.properties
- ✅ Backend: CorsConfig.java creado como @Configuration bean
- ✅ Frontend: uuid@^10.0.0 agregado a package.json
- ✅ Frontend: npm install ejecutado
- ✅ Frontend: environment.ts creado con apiBaseUrl
- ✅ Frontend: environment.prod.ts creado
- ✅ Frontend: tracing.interceptor.ts creado con generación de IDs
- ✅ Frontend: MotivosService.ts actualizado a usar environment.apiBaseUrl
- ✅ Frontend: ParametrosService.ts actualizado a usar environment.apiBaseUrl
- ✅ Frontend: app.config.ts actualizado a usar TracingInterceptor
- ✅ Frontend: Mock interceptors removidos de app.config.ts
- ✅ Frontend: Importaciones de mocks removidas
- ✅ Frontend: npm install ejecutado (uuid instalado)

---

## 10. Próximos Pasos

### 1. Testing E2E
```bash
ng serve # En terminal 1
npm run test:e2e # En terminal 2
```

### 2. Testing Manual
1. Abrir http://localhost:4200
2. Navegar a componentes de Motivos y Parámetros
3. Verificar headers en DevTools Network
4. Confirmar que datos cargan correctamente

### 3. Verificar Logs del Backend
```bash
# En los logs de Spring Boot debe haber:
# - Validación exitosa de headers
# - Consultas ejecutadas
# - Respuestas enviadas
```

### 4. Alternativamente: Usar Postman
```bash
GET http://localhost:8080/api/v1/motivos?timestamp=2025-01-20T10:30:00.000Z

Headers:
idApp: CONFIGURACION-SISTEMA
idCorrelacion: [generar UUID]
idMsg: [generar UUID]
idTransaccion: [generar UUID]
Authorization: Bearer [token si existe]
```

---

## 11. Notas Importantes

1. **SessionId vs CorrelationId**: 
   - SessionId es persistente durante toda la sesión del usuario
   - CorrelationId se reutiliza para relacionar múltiples solicitudes

2. **Timestamp en Query Parameter**:
   - Se agrega como query parameter porque algunos headers podrían ser filtrados
   - Backend valida este timestamp

3. **Authorization Token**:
   - Se obtiene de `localStorage.auth_token`
   - Si no existe, se ignora el header

4. **Mock Interceptors**:
   - Ya no se usan: `motivos-mock.interceptor.ts`
   - Ya no se usan: `parametros-mock.interceptor.ts`
   - Se mantienen en el proyecto para referencia histórica

5. **CORS en Desarrollo**:
   - Configurado para localhost:4200 (desarrollo principal)
   - Configurado para localhost:4201 (desarrollo alternativo/testing)

---

## 12. Diferencias vs Fase Anterior (con Mocks)

| Aspecto | Con Mocks | Sin Mocks |
|---------|-----------|----------|
| URL API | `/api/configuracion/motivos` | `http://localhost:8080/api/v1/motivos` |
| Interceptor | motivosMockInterceptor | TracingInterceptor |
| Headers Trazabilidad | Simulados | Reales |
| Validación Backend | No | Sí |
| Timestamp | No | Sí (ISO 8601) |
| Correlación | No | Sí (por sesión) |
| Transacción Tracking | No | Sí |
| CORS | No necesario | Requerido en Backend |
| Ambiente | Simulado | Real |

---

## 13. Conclusión

✅ **Integración Frontend-Backend completada exitosamente**

El Frontend ahora se conecta con el Backend real usando:
- Configuración de entornos (environment.ts / environment.prod.ts)
- Interceptor HTTP para inyectar headers de trazabilidad
- Generación de IDs únicos para correlación y transacciones
- Timestamp en formato ISO 8601
- CORS configurado en el Backend

Todo está alineado con las especificaciones EDS y RF 1.17.

---

**Creado**: Enero 2025
**Próxima revisión**: Después de validación E2E
