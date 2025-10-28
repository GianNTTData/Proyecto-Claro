// Configuración de ambiente para DESARROLLO
// http://localhost:4200

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081/api/v1',
  
  // Headers de trazabilidad por defecto
  defaultHeaders: {
    'idApp': 'CONFIGURACION-SISTEMA-FRONTEND',
    'idCorrelacion': 'CORR-DEV-001',
    'Content-Type': 'application/json'
  },
  
  // Configuración de logging
  logging: {
    enabled: true,
    level: 'debug'
  }
};
