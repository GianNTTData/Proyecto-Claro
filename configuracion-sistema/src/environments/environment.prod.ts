// Configuración de ambiente para PRODUCCIÓN

export const environment = {
  production: true,
  apiBaseUrl: 'https://api.configuracion-sistema.prod/v1',
  
  // Headers de trazabilidad por defecto
  defaultHeaders: {
    'idApp': 'CONFIGURACION-SISTEMA-FRONTEND',
    'idCorrelacion': 'CORR-PROD-001',
    'Content-Type': 'application/json'
  },
  
  // Configuración de logging
  logging: {
    enabled: false,
    level: 'error'
  }
};
