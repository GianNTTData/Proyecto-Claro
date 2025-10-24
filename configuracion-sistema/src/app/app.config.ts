import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { motivosMockInterceptor } from './services/motivos-mock.interceptor';
import { parametrosMockInterceptor } from './services/parametros-mock.interceptor';

// Detectar si estamos en modo E2E (Playwright)
// En modo E2E, los mocks los maneja Playwright con page.route()
const isE2ETesting = typeof (window as any)['__PLAYWRIGHT__'] !== 'undefined' 
                     || (window as any)['playwright'] !== undefined;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      // Solo usar interceptores mock en desarrollo normal, no en E2E
      isE2ETesting
        ? withInterceptors([]) // Sin interceptores en E2E
        : withInterceptors([
            motivosMockInterceptor,
            parametrosMockInterceptor
          ])
    )
  ]
};
