# 🧪 Ejemplos de Uso de la API

## Base URL
```
http://localhost:8080/api
```

---

## 1. Motivos

### Consultar todos los motivos
```bash
curl -X GET "http://localhost:8080/api/v1/motivos"
```

### Consultar motivos por nombre
```bash
curl -X GET "http://localhost:8080/api/v1/motivos?nombre=devolución"
```

### Consultar motivos activos
```bash
curl -X GET "http://localhost:8080/api/v1/motivos?estado=true"
```

### Registrar un nuevo motivo
```bash
curl -X POST "http://localhost:8080/api/v1/motivos" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto defectuoso",
    "estado": true
  }'
```

### Actualizar un motivo
```bash
curl -X PUT "http://localhost:8080/api/v1/motivos" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "nombre": "Devolución por defecto de fábrica",
    "estado": true
  }'
```

---

## 2. Parámetros

### Consultar parámetros del sistema
```bash
curl -X GET "http://localhost:8080/api/v1/parametros"
```

### Registrar parámetros
```bash
curl -X POST "http://localhost:8080/api/v1/parametros" \
  -H "Content-Type: application/json" \
  -d '{
    "tiempoDesbloqueo": 24,
    "unidadDesbloqueo": "horas",
    "tiempoReserva": 48,
    "unidadReserva": "horas"
  }'
```

### Actualizar parámetros
```bash
curl -X PUT "http://localhost:8080/api/v1/parametros/1" \
  -H "Content-Type: application/json" \
  -d '{
    "tiempoDesbloqueo": 12,
    "unidadDesbloqueo": "horas",
    "tiempoReserva": 24,
    "unidadReserva": "horas"
  }'
```

---

## 3. Almacenes

### Consultar todos los almacenes
```bash
curl -X GET "http://localhost:8080/api/v1/almacenes"
```

### Consultar almacén por código
```bash
curl -X GET "http://localhost:8080/api/v1/almacenes?codigo=ALM001"
```

### Consultar almacenes por tipo
```bash
curl -X GET "http://localhost:8080/api/v1/almacenes?tipo=Principal"
```

---

## 4. Empresas de Transporte

### Consultar todas las empresas
```bash
curl -X GET "http://localhost:8080/api/v1/empresas-transporte"
```

### Consultar empresa por RUC
```bash
curl -X GET "http://localhost:8080/api/v1/empresas-transporte?ruc=20123456789"
```

### Consultar empresa por razón social
```bash
curl -X GET "http://localhost:8080/api/v1/empresas-transporte?razonSocial=Rápidos"
```

---

## 5. Transportistas

### Consultar todos los transportistas
```bash
curl -X GET "http://localhost:8080/api/v1/transportistas"
```

### Consultar transportistas de una empresa
```bash
curl -X GET "http://localhost:8080/api/v1/transportistas?empresaId=1"
```

### Consultar transportista por documento
```bash
curl -X GET "http://localhost:8080/api/v1/transportistas?tipoDocumento=DNI&numeroDocumento=12345678"
```

### Consultar transportista por nombre
```bash
curl -X GET "http://localhost:8080/api/v1/transportistas?nombre=Juan"
```

---

## Respuestas Esperadas

### Respuesta exitosa (200/201)
```json
{
  "status": {
    "code": 0,
    "message": "Operación exitosa"
  },
  "data": {
    "id": 1,
    "nombre": "Ejemplo",
    "estado": true
  }
}
```

### Error de validación (400)
```json
{
  "status": {
    "code": -1,
    "message": "Error de validación en los datos de entrada"
  }
}
```

### Recurso no encontrado (404)
```json
{
  "status": {
    "code": -1,
    "message": "Motivo no encontrado con id: '999'"
  }
}
```

### Conflicto de negocio (409)
```json
{
  "status": {
    "code": -1,
    "message": "Ya existe un motivo con el nombre: Devolución"
  }
}
```

---

## Testing con Swagger UI

Para probar interactivamente todos los endpoints, visita:

```
http://localhost:8080/api/swagger-ui.html
```

Swagger UI proporciona:
- 📝 Documentación completa de cada endpoint
- ▶️ Botón "Try it out" para ejecutar requests
- 📊 Visualización de respuestas
- 🔍 Esquemas de modelos de datos

---

## Verificar Base de Datos H2

Accede a la consola H2 para ver los datos:

```
URL: http://localhost:8080/api/h2-console
JDBC URL: jdbc:h2:mem:configuracion_db
User: sa
Password: (vacío)
```

Consultas SQL útiles:
```sql
-- Ver todos los motivos
SELECT * FROM motivos;

-- Ver parámetros
SELECT * FROM parametros;

-- Ver almacenes
SELECT * FROM almacenes;

-- Ver empresas de transporte
SELECT * FROM empresas_transporte;

-- Ver transportistas
SELECT * FROM transportistas;
```

---

## Colección Postman

Puedes importar estos ejemplos en Postman usando la especificación OpenAPI:

```
http://localhost:8080/api/v3/api-docs
```

1. Abre Postman
2. Clic en "Import"
3. Pega la URL anterior
4. Postman generará automáticamente toda la colección

---

## Testing Automatizado

### Con curl y jq (Linux/Mac)

```bash
# Test completo de flujo de motivos
MOTIVO_ID=$(curl -s -X POST "http://localhost:8080/api/v1/motivos" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Test Motivo","estado":true}' \
  | jq -r '.data.id')

echo "Motivo creado con ID: $MOTIVO_ID"

# Consultar el motivo creado
curl -s "http://localhost:8080/api/v1/motivos" | jq

# Actualizar el motivo
curl -s -X PUT "http://localhost:8080/api/v1/motivos" \
  -H "Content-Type: application/json" \
  -d "{\"id\":$MOTIVO_ID,\"nombre\":\"Test Actualizado\",\"estado\":false}" \
  | jq
```

---

## Notas Importantes

⚠️ **CORS**: Si llamas desde un frontend en otro dominio, configura CORS en `application.properties`

⚠️ **Base de datos**: H2 es en memoria, los datos se pierden al reiniciar

⚠️ **Validaciones**: Todos los campos obligatorios deben enviarse en los requests

✅ **Swagger**: Usa Swagger UI para documentación interactiva y testing fácil
