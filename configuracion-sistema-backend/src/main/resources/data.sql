-- Script SQL para inicializar datos de prueba en H2
-- RF 1.17 - Configuración del Sistema
-- Actualizado según apis-configuracion-spec.md y openapi.md

-- Datos de prueba para Motivos
-- Campo: estado es STRING (ACTIVO/INACTIVO), nombre es el campo principal
INSERT INTO motivos (nombre, estado, fecha_creacion) VALUES ('Devolución por defecto', 'ACTIVO', CURRENT_TIMESTAMP);
INSERT INTO motivos (nombre, estado, fecha_creacion) VALUES ('Cambio de producto', 'ACTIVO', CURRENT_TIMESTAMP);
INSERT INTO motivos (nombre, estado, fecha_creacion) VALUES ('Garantía', 'ACTIVO', CURRENT_TIMESTAMP);
INSERT INTO motivos (nombre, estado, fecha_creacion) VALUES ('Cancelación de pedido', 'INACTIVO', CURRENT_TIMESTAMP);

-- Datos de prueba para Parámetros
-- Cambios: tiempo_desbloqueo → cantidad_tiempo_desbloqueo, unidad_desbloqueo → unidad_medida_tiempo_desbloqueo
--          tiempo_reserva → cantidad_tiempo_reserva, unidad_reserva → unidad_medida_tiempo_reserva
INSERT INTO parametros (id, cantidad_tiempo_desbloqueo, unidad_medida_tiempo_desbloqueo, cantidad_tiempo_reserva, unidad_medida_tiempo_reserva, fecha_creacion) VALUES (1, 24, 'horas', 48, 'horas', CURRENT_TIMESTAMP);

-- Datos de prueba para Almacenes
-- Cambios: bloqueo (Boolean) → bloqueo (String), estado (Boolean) → estado (String: ACTIVO/INACTIVO)
INSERT INTO almacenes (codigo, nombre, tipo, direccion, bloqueo, estado) VALUES ('ALM001', 'Almacén Central Lima', 'Principal', 'Av. Venezuela 1234, Lima', 'NO_BLOQUEADO', 'ACTIVO');
INSERT INTO almacenes (codigo, nombre, tipo, direccion, bloqueo, estado) VALUES ('ALM002', 'Almacén Norte', 'Secundario', 'Av. Túpac Amaru 567, Los Olivos', 'NO_BLOQUEADO', 'ACTIVO');
INSERT INTO almacenes (codigo, nombre, tipo, direccion, bloqueo, estado) VALUES ('ALM003', 'Almacén Sur', 'Secundario', 'Av. Pachacutec 890, Villa El Salvador', 'NO_BLOQUEADO', 'ACTIVO');
INSERT INTO almacenes (codigo, nombre, tipo, direccion, bloqueo, estado) VALUES ('ALM004', 'Almacén Temporal', 'Temporal', 'Jr. Comercio 123, Cercado', 'BLOQUEADO', 'INACTIVO');

-- Datos de prueba para Empresas de Transporte
INSERT INTO empresas_transporte (id, ruc, razon_social) VALUES (1, '20123456789', 'Transportes Rápidos SAC');
INSERT INTO empresas_transporte (id, ruc, razon_social) VALUES (2, '20987654321', 'Logística Express EIRL');
INSERT INTO empresas_transporte (id, ruc, razon_social) VALUES (3, '20456789123', 'Distribuciones del Norte SA');

-- Datos de prueba para Transportistas
INSERT INTO transportistas (id, empresa_id, nombre, tipo_documento, numero_documento) VALUES (1, 1, 'Juan Pérez García', 'DNI', '12345678');
INSERT INTO transportistas (id, empresa_id, nombre, tipo_documento, numero_documento) VALUES (2, 1, 'María López Sánchez', 'DNI', '87654321');
INSERT INTO transportistas (id, empresa_id, nombre, tipo_documento, numero_documento) VALUES (3, 2, 'Carlos Rodríguez Vega', 'DNI', '45678912');
INSERT INTO transportistas (id, empresa_id, nombre, tipo_documento, numero_documento) VALUES (4, 2, 'Ana Martínez Torres', 'DNI', '78912345');
INSERT INTO transportistas (id, empresa_id, nombre, tipo_documento, numero_documento) VALUES (5, 3, 'Luis Fernández Díaz', 'DNI', '32165498');
