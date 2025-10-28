import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { TracingInterceptor } from './services/tracing.interceptor';

// Detectar si estamos en modo E2E (Playwright)
// En modo E2E, los mocks los maneja Playwright con page.route()
const isE2ETesting = typeof (window as any)['__PLAYWRIGHT__'] !== 'undefined' 
                     || (window as any)['playwright'] !== undefined;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // CRÍTICO: withInterceptorsFromDi() permite que los interceptores registrados con HTTP_INTERCEPTORS funcionen
    provideHttpClient(withInterceptorsFromDi()),
    // Registrar interceptor de trazabilidad para conexión real con Backend
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TracingInterceptor,
      multi: true
    }
  ]
};
