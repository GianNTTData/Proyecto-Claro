# Backend API REST - Configuración del Sistema

Backend Java Spring Boot para el sistema de configuración según RF 1.17

## 📋 Descripción

API REST desarrollada en Java/Spring Boot que proporciona endpoints para la configuración y consulta de parámetros del sistema, implementando las capacidades definidas en el RF 1.17 (PS) · Configuración de Sistema.

## 🏗️ Arquitectura

**Patrón**: MVC (Model-View-Controller)
- **Model**: Entidades JPA + DTOs
- **Controller**: Controladores REST
- **Service**: Lógica de negocio

### Estructura del Proyecto

```
configuracion-sistema-backend/
├── src/
│   ├── main/
│   │   ├── java/com/claro/configuracion/
│   │   │   ├── ConfiguracionSistemaApplication.java
│   │   │   ├── config/
│   │   │   │   └── OpenApiConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── MotivoController.java
│   │   │   │   ├── ParametroController.java
│   │   │   │   ├── AlmacenController.java
│   │   │   │   ├── EmpresaTransporteController.java
│   │   │   │   └── TransportistaController.java
│   │   │   ├── service/
│   │   │   │   ├── MotivoService.java
│   │   │   │   ├── ParametroService.java
│   │   │   │   ├── AlmacenService.java
│   │   │   │   ├── EmpresaTransporteService.java
│   │   │   │   └── TransportistaService.java
│   │   │   ├── repository/
│   │   │   │   ├── MotivoRepository.java
│   │   │   │   ├── ParametroRepository.java
│   │   │   │   ├── AlmacenRepository.java
│   │   │   │   ├── EmpresaTransporteRepository.java
│   │   │   │   └── TransportistaRepository.java
│   │   │   ├── model/
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Motivo.java
│   │   │   │   │   ├── Parametro.java
│   │   │   │   │   ├── Almacen.java
│   │   │   │   │   ├── EmpresaTransporte.java
│   │   │   │   │   └── Transportista.java
│   │   │   │   └── dto/
│   │   │   │       ├── ApiResponseDTO.java
│   │   │   │       ├── ApiStatusDTO.java
│   │   │   │       ├── MotivoRequestDTO.java
│   │   │   │       ├── MotivoResponseDTO.java
│   │   │   │       ├── MotivoUpdateDTO.java
│   │   │   │       ├── ParametroRequestDTO.java
│   │   │   │       ├── ParametroResponseDTO.java
│   │   │   │       ├── AlmacenResponseDTO.java
│   │   │   │       ├── EmpresaTransporteResponseDTO.java
│   │   │   │       └── TransportistaResponseDTO.java
│   │   │   └── exception/
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       ├── ResourceNotFoundException.java
│   │   │       └── BusinessConflictException.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
│       └── java/
└── pom.xml
```

## 🛠️ Stack Tecnológico

- **Java**: 17
- **Spring Boot**: 3.2.0
- **Spring Data JPA**: Persistencia
- **Spring Validation**: Validaciones
- **H2 Database**: Base de datos en memoria (desarrollo)
- **Lombok**: Reducción de boilerplate
- **SpringDoc OpenAPI**: Documentación Swagger
- **Maven**: Gestión de dependencias

## 📡 Endpoints Implementados

### Base URL: `http://localhost:8080/api`

### 1. Motivos (RF 1.17.1, 1.17.2, 1.17.3)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/v1/motivos` | Consultar motivos (filtros opcionales: nombre, estado) |
| POST | `/v1/motivos` | Registrar nuevo motivo |
| PUT | `/v1/motivos` | Actualizar motivo existente |

**Ejemplo Request POST:**
```json
{
  "nombre": "Devolución por defecto",
  "estado": true
}
```

**Ejemplo Response:**
```json
{
  "status": {
    "code": 0,
    "message": "Motivo registrado exitosamente"
  },
  "data": {
    "id": 1,
    "nombre": "Devolución por defecto",
    "estado": true
  }
}
```

### 2. Parámetros (RF 1.17.4, 1.17.5, 1.17.6)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/v1/parametros` | Consultar configuración de parámetros |
| POST | `/v1/parametros` | Registrar configuración |
| PUT | `/v1/parametros/{id}` | Actualizar configuración |

**Ejemplo Request POST:**
```json
{
  "tiempoDesbloqueo": 24,
  "unidadDesbloqueo": "horas",
  "tiempoReserva": 48,
  "unidadReserva": "horas"
}
```

### 3. Almacenes (RF 1.17.7)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/v1/almacenes` | Consultar almacenes (filtros opcionales: codigo, tipo) |

### 4. Empresas de Transporte (RF 1.17.8)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/v1/empresas-transporte` | Consultar empresas (filtros opcionales: id, ruc, razonSocial) |

### 5. Transportistas (RF 1.17.9)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/v1/transportistas` | Consultar transportistas (filtros opcionales: empresaId, id, tipoDocumento, numeroDocumento, nombre) |

## 🚀 Ejecución

### Prerrequisitos

- JDK 17 o superior
- Maven 3.8+

### Compilar y ejecutar

```bash
# Compilar el proyecto
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080/api`

### Acceso a la consola H2

- URL: `http://localhost:8080/api/h2-console`
- JDBC URL: `jdbc:h2:mem:configuracion_db`
- Usuario: `sa`
- Contraseña: (vacía)

### Documentación Swagger

- URL: `http://localhost:8080/api/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/api/v3/api-docs`

## 📊 Códigos de Estado HTTP

| Código | Significado | Caso de uso |
|--------|-------------|-------------|
| 200 | OK | Consultas exitosas (GET) |
| 201 | Created | Registros exitosos (POST) |
| 400 | Bad Request | Formato inválido en parámetros |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Violación de restricciones de negocio |
| 422 | Unprocessable Entity | Validación fallida |
| 500 | Internal Server Error | Error interno |

## 🔒 Validaciones Implementadas

### Motivos
- Nombre: obligatorio, 3-100 caracteres, único
- Estado: obligatorio (true/false)

### Parámetros
- Tiempo desbloqueo/reserva: obligatorio, positivo
- Unidad: obligatoria, valores permitidos: "minutos", "horas", "dias"

## 📦 DTOs y Estructura de Respuesta

Todas las respuestas siguen el formato estándar:

```json
{
  "status": {
    "code": 0,
    "message": "Mensaje descriptivo"
  },
  "data": { }
}
```

- **code**: `0` = éxito, `-1` = error
- **message**: Descripción del resultado
- **data**: Datos de respuesta (opcional)

## 🧪 Datos de Prueba

El archivo `data.sql` incluye datos de prueba:
- 4 motivos
- 1 configuración de parámetros
- 4 almacenes
- 3 empresas de transporte
- 5 transportistas

## 📝 Buenas Prácticas Implementadas

✅ Arquitectura MVC clara y separación de responsabilidades  
✅ DTOs para separar capa de presentación de modelo de datos  
✅ Validaciones con Bean Validation  
✅ Manejo centralizado de excepciones  
✅ Logging estructurado con SLF4J  
✅ Documentación automática con OpenAPI/Swagger  
✅ Transacciones gestionadas con `@Transactional`  
✅ Query methods personalizados en repositories  
✅ Respuestas HTTP estándar según RF 1.17  
✅ Código limpio con Lombok  

## 🔄 Próximos Pasos (Fuera de Alcance Actual)

- [ ] Autenticación y autorización (OAuth2/JWT)
- [ ] Migración a base de datos PostgreSQL/MySQL
- [ ] Tests unitarios y de integración
- [ ] Paginación en endpoints de consulta
- [ ] Rate limiting y throttling
- [ ] Cache con Redis
- [ ] Auditoría de cambios
- [ ] Despliegue con Docker

## 📖 Referencia

- **RF**: RF 1.17 (PS) · Configuración de Sistema
- **Versión**: 1.0.0
- **Fase**: 1.0
- **Owner**: John Castillo Rivera
- **Fecha**: 2025-01-13

## 👥 Equipo de Desarrollo

Claro Development Team

---

**Nota**: Este backend está diseñado exclusivamente para proporcionar APIs REST. No incluye interfaz de usuario (UI) según el alcance definido en el RF 1.17.
