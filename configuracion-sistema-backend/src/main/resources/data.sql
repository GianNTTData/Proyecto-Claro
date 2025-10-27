-- Script SQL para inicializar datos de prueba en H2
-- RF 1.17 - Configuración del Sistema
-- Actualizado según apis-configuracion-spec.md y openapi.md

-- Datos de prueba para Motivos
-- Cambios: nombre → nombre_motivo, estado (Boolean) → estado_motivo (String: ACTIVO/INACTIVO)
INSERT INTO motivos (id, nombre_motivo, estado_motivo, fecha_creacion) VALUES
(1, 'Devolución por defecto', 'ACTIVO', CURRENT_TIMESTAMP),
(2, 'Cambio de producto', 'ACTIVO', CURRENT_TIMESTAMP),
(3, 'Garantía', 'ACTIVO', CURRENT_TIMESTAMP),
(4, 'Cancelación de pedido', 'INACTIVO', CURRENT_TIMESTAMP);

-- Datos de prueba para Parámetros
-- Cambios: tiempo_desbloqueo → cantidad_tiempo_desbloqueo, unidad_desbloqueo → unidad_medida_tiempo_desbloqueo
--          tiempo_reserva → cantidad_tiempo_reserva, unidad_reserva → unidad_medida_tiempo_reserva
INSERT INTO parametros (id, cantidad_tiempo_desbloqueo, unidad_medida_tiempo_desbloqueo, 
                        cantidad_tiempo_reserva, unidad_medida_tiempo_reserva, fecha_creacion) VALUES
(1, 24, 'horas', 48, 'horas', CURRENT_TIMESTAMP);

-- Datos de prueba para Almacenes
-- Cambios: bloqueo (Boolean) → bloqueo (String), estado (Boolean) → estado (String: ACTIVO/INACTIVO)
INSERT INTO almacenes (codigo, nombre, tipo, direccion, bloqueo, estado) VALUES
('ALM001', 'Almacén Central Lima', 'Principal', 'Av. Venezuela 1234, Lima', 'NO_BLOQUEADO', 'ACTIVO'),
('ALM002', 'Almacén Norte', 'Secundario', 'Av. Túpac Amaru 567, Los Olivos', 'NO_BLOQUEADO', 'ACTIVO'),
('ALM003', 'Almacén Sur', 'Secundario', 'Av. Pachacutec 890, Villa El Salvador', 'NO_BLOQUEADO', 'ACTIVO'),
('ALM004', 'Almacén Temporal', 'Temporal', 'Jr. Comercio 123, Cercado', 'BLOQUEADO', 'INACTIVO');

-- Datos de prueba para Empresas de Transporte
INSERT INTO empresas_transporte (id, ruc, razon_social) VALUES
(1, '20123456789', 'Transportes Rápidos SAC'),
(2, '20987654321', 'Logística Express EIRL'),
(3, '20456789123', 'Distribuciones del Norte SA');

-- Datos de prueba para Transportistas
INSERT INTO transportistas (id, empresa_id, nombre, tipo_documento, numero_documento) VALUES
(1, 1, 'Juan Pérez García', 'DNI', '12345678'),
(2, 1, 'María López Sánchez', 'DNI', '87654321'),
(3, 2, 'Carlos Rodríguez Vega', 'DNI', '45678912'),
(4, 2, 'Ana Martínez Torres', 'DNI', '78912345'),
(5, 3, 'Luis Fernández Díaz', 'DNI', '32165498');

-- Actualizar secuencias
ALTER SEQUENCE motivos_seq RESTART WITH 5;
ALTER SEQUENCE parametros_seq RESTART WITH 2;
ALTER SEQUENCE empresas_transporte_seq RESTART WITH 4;
ALTER SEQUENCE transportistas_seq RESTART WITH 6;
