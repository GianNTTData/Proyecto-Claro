import { test, expect } from '@playwright/test';

test.describe('RF 1.28.2: Parámetros', () => {
  test.beforeEach(async ({ page }) => {
    // Inyectar variable para deshabilitar interceptores TypeScript
    await page.addInitScript(() => {
      (window as any).__PLAYWRIGHT__ = true;
    });
    
    // Mock de consulta inicial (RF 1.17.4)
    await page.route('**/api/configuracion/parametros', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 1,
              codigo: 'TIEMPO_RESERVA',
              cantidad: 24,
              unidadMedida: 'HORAS',
              almacenId: 1
            },
            {
              id: 2,
              codigo: 'TIEMPO_BLOQUEO',
              cantidad: 48,
              unidadMedida: 'HORAS',
              almacenId: 1
            }
          ]),
        });
      }
    });

    await page.goto('/parametros');
    await page.waitForLoadState('networkidle');
  });

  test('PAR-01: Carga inicial de parámetros', async ({ page }) => {
    // Verificar que los campos se cargan con los valores mockeados
    await expect(page.locator('[data-test="input-reserva-cantidad"]')).toHaveValue('24');
    // Angular con ngValue genera valores como "1: HORAS", verificamos el texto visible
    const reservaSelect = page.locator('[data-test="select-reserva-unidad"]');
    await expect(reservaSelect.locator('option:checked')).toHaveText('Horas');
    
    await expect(page.locator('[data-test="input-bloqueo-cantidad"]')).toHaveValue('48');
    const bloqueoSelect = page.locator('[data-test="select-bloqueo-unidad"]');
    await expect(bloqueoSelect.locator('option:checked')).toHaveText('Horas');
  });

  test('PAR-02: Validación - campo obligatorio', async ({ page }) => {
    const cantidadInput = page.locator('[data-test="input-reserva-cantidad"]');
    
    // Limpiar el campo
    await cantidadInput.clear();
    
    // Intentar guardar
    await page.click('[data-test="guardar-parametros"]');
    
    // Verificar mensaje de error - debe estar en el span.mensaje-error del HTML
    await expect(page.locator('.mensaje-error', { hasText: 'La cantidad es obligatoria' }).first()).toBeVisible();
  });

  test('PAR-03: Validación - cantidad debe ser mayor a 0', async ({ page }) => {
    const cantidadInput = page.locator('[data-test="input-reserva-cantidad"]');
    
    // Ingresar 0
    await cantidadInput.fill('0');
    
    // Intentar guardar
    await page.click('[data-test="guardar-parametros"]');
    
    // Verificar mensaje de error
    await expect(page.locator('text=La cantidad debe ser mayor a 0')).toBeVisible();
  });

  test('PAR-04: Validación - solo números positivos permitidos', async ({ page }) => {
    const cantidadInput = page.locator('[data-test="input-reserva-cantidad"]');
    
    // Ingresar valor negativo
    await cantidadInput.fill('-5');
    
    // Intentar guardar
    await page.click('[data-test="guardar-parametros"]');
    
    // Verificar mensaje de error
    await expect(page.locator('.mensaje-error', { hasText: 'La cantidad debe ser mayor a 0' }).first()).toBeVisible();
  });

  test('PAR-05: Validación - solo números enteros (sin decimales)', async ({ page }) => {
    const cantidadInput = page.locator('[data-test="input-reserva-cantidad"]');
    
    // Ingresar valor decimal
    await cantidadInput.fill('10.5');
    
    // Intentar guardar
    await page.click('[data-test="guardar-parametros"]');
    
    // Verificar mensaje de error - el componente dice "Solo números enteros permitidos"
    await expect(page.locator('.mensaje-error', { hasText: 'Solo números enteros permitidos' }).first()).toBeVisible();
  });

  test('PAR-06: Guardar parámetros - actualización exitosa', async ({ page }) => {
    // Mock de actualización (RF 1.17.6)
    await page.route('**/api/configuracion/parametros/1', async (route) => {
      if (route.request().method() === 'PUT') {
        const putData = JSON.parse(route.request().postData() || '{}');
        expect(putData.cantidad).toBe(15);
        expect(putData.unidadMedida).toBe('DIAS');
        
        await route.fulfill({ 
          status: 200,
          contentType: 'application/json', 
          body: JSON.stringify({
            id: 1,
            codigo: 'TIEMPO_RESERVA',
            ...putData
          })
        });
      }
    });

    await page.route('**/api/configuracion/parametros/2', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({ 
          status: 200,
          contentType: 'application/json', 
          body: JSON.stringify({
            id: 2,
            codigo: 'TIEMPO_BLOQUEO',
            cantidad: 48,
            unidadMedida: 'HORAS'
          })
        });
      }
    });

    // Modificar valores
    await page.fill('[data-test="input-reserva-cantidad"]', '15');
    await page.selectOption('[data-test="select-reserva-unidad"]', { label: 'Días' });
    
    // Guardar configuración
    await page.click('[data-test="guardar-parametros"]');

    // Verificar mensaje de éxito - el componente dice "guardada satisfactoriamente"
    await expect(page.locator('text=Configuración guardada satisfactoriamente')).toBeVisible();
  });

  test('PAR-07: Guardar parámetros - registro nuevo (sin ID)', async ({ page }) => {
    // Simular parámetros sin ID (primera vez que se configuran)
    await page.route('**/api/configuracion/parametros', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      }
      if (route.request().method() === 'POST') {
        const postData = JSON.parse(route.request().postData() || '{}');
        
        await route.fulfill({ 
          status: 201,
          contentType: 'application/json', 
          body: JSON.stringify({
            id: Date.now(),
            ...postData
          })
        });
      }
    });

    // Recargar para simular parámetros vacíos
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Configurar valores
    await page.fill('[data-test="input-reserva-cantidad"]', '10');
    await page.selectOption('[data-test="select-reserva-unidad"]', { label: 'Horas' });
    await page.fill('[data-test="input-bloqueo-cantidad"]', '20');
    await page.selectOption('[data-test="select-bloqueo-unidad"]', { label: 'Horas' });
    
    // Guardar configuración
    await page.click('[data-test="guardar-parametros"]');

    // Verificar mensaje de éxito
    await expect(page.locator('text=Configuración guardada satisfactoriamente')).toBeVisible();
  });

  test('PAR-08: Validar ambas secciones simultáneamente', async ({ page }) => {
    // Limpiar ambos campos de cantidad
    await page.fill('[data-test="input-reserva-cantidad"]', '');
    await page.fill('[data-test="input-bloqueo-cantidad"]', '');
    
    // Intentar guardar
    await page.click('[data-test="guardar-parametros"]');
    
    // Verificar que aparecen mensajes de error (hay 2, uno por cada sección)
    const errores = page.locator('.mensaje-error', { hasText: 'La cantidad es obligatoria' });
    await expect(errores.first()).toBeVisible();
    // Verificar que hay al menos 2 mensajes (uno por sección)
    await expect(errores).toHaveCount(2);
  });

  test('PAR-09: Cambiar solo unidad de medida', async ({ page }) => {
    await page.route('**/api/configuracion/parametros/1', async (route) => {
      if (route.request().method() === 'PUT') {
        const putData = JSON.parse(route.request().postData() || '{}');
        expect(putData.cantidad).toBe(24);
        expect(putData.unidadMedida).toBe('MINUTOS');
        
        await route.fulfill({ 
          status: 200,
          contentType: 'application/json', 
          body: JSON.stringify({
            id: 1,
            codigo: 'TIEMPO_RESERVA',
            ...putData
          })
        });
      }
    });

    await page.route('**/api/configuracion/parametros/2', async (route) => {
      if (route.request().method() === 'PUT') {
        await route.fulfill({ 
          status: 200,
          contentType: 'application/json', 
          body: JSON.stringify({
            id: 2,
            codigo: 'TIEMPO_BLOQUEO',
            cantidad: 48,
            unidadMedida: 'HORAS'
          })
        });
      }
    });

    // Cambiar solo la unidad de medida
    await page.selectOption('[data-test="select-reserva-unidad"]', { label: 'Minutos' });
    
    // Guardar
    await page.click('[data-test="guardar-parametros"]');

    // Verificar éxito
    await expect(page.locator('text=Configuración guardada satisfactoriamente')).toBeVisible();
  });

  test('PAR-10: Estado de carga - botón deshabilitado durante guardado', async ({ page }) => {
    await page.route('**/api/configuracion/parametros/1', async (route) => {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({ 
        status: 200,
        contentType: 'application/json', 
        body: JSON.stringify({
          id: 1,
          codigo: 'TIEMPO_RESERVA',
          cantidad: 24,
          unidadMedida: 'HORAS'
        })
      });
    });

    await page.route('**/api/configuracion/parametros/2', async (route) => {
      await route.fulfill({ 
        status: 200,
        contentType: 'application/json', 
        body: JSON.stringify({
          id: 2,
          codigo: 'TIEMPO_BLOQUEO',
          cantidad: 48,
          unidadMedida: 'HORAS'
        })
      });
    });

    // Hacer clic en guardar
    await page.click('[data-test="guardar-parametros"]');
    
    // Verificar que el botón muestra "Guardando..." y está deshabilitado
    await expect(page.locator('[data-test="guardar-parametros"]')).toBeDisabled();
    await expect(page.locator('[data-test="guardar-parametros"]')).toContainText('Guardando...');
    
    // Esperar a que termine
    await expect(page.locator('text=Configuración guardada satisfactoriamente')).toBeVisible();
  });
});
