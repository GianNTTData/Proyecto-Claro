import { test, expect } from '@playwright/test';

test.describe('RF 1.28.1: Mantenimiento de Motivos', () => {
  test.beforeEach(async ({ page }) => {
    // Inyectar variable para deshabilitar interceptores TypeScript
    await page.addInitScript(() => {
      (window as any).__PLAYWRIGHT__ = true;
    });
    
    // Navegar a la página de configuración de motivos
    await page.goto('/motivos');
  });

  test('MOT-01: Buscar motivos con filtros', async ({ page }) => {
    // Mock del servicio de consulta (RF 1.17.1) - URL correcta
    await page.route('**/api/configuracion/motivos*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      
      // Validar que los parámetros de búsqueda están presentes
      expect(url.searchParams.get('descripcion')).toBe('Devolución');
      expect(url.searchParams.get('estado')).toBe('ACTIVO');
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { 
            id: 1, 
            descripcion: 'Devolución por falla', 
            estado: 'ACTIVO',
            almacenId: 1 
          }
        ]),
      });
    });

    // Ingresar filtros
    await page.fill('[data-test="filtro-descripcion"]', 'Devolución');
    await page.selectOption('[data-test="filtro-estado"]', { label: 'Activo' });
    await page.click('[data-test="buscar-motivos"]');

    // Esperar a que se carguen los resultados
    await page.waitForSelector('[data-test="tabla-motivos"] tbody tr');

    // Verificar que se muestra 1 resultado
    await expect(page.locator('[data-test="tabla-motivos"] tbody tr')).toHaveCount(1);
    await expect(page.locator('[data-test="tabla-motivos"] tbody tr:first-child'))
      .toContainText('Devolución por falla');
  });

  test('MOT-02: Agregar motivo con validaciones y guardado', async ({ page }) => {
    // Mock del servicio de registro (RF 1.17.2) - URL correcta
    await page.route('**/api/configuracion/motivos', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        const postData = JSON.parse(request.postData() || '{}');
        expect(postData.descripcion).toBe('Nuevo Motivo Test');
        expect(postData.estado).toBe('ACTIVO');
        
        await route.fulfill({ 
          status: 201, 
          contentType: 'application/json',
          body: JSON.stringify({ 
            id: 2, 
            ...postData 
          }) 
        });
      }
    });

    // Abrir modal de agregar
    await page.click('[data-test="agregar-motivo"]');
    
    // Esperar a que el modal esté visible
    await page.waitForSelector('[data-test="modal-motivo"]');

    // Validación: campo obligatorio (intentar guardar sin datos)
    await page.click('[data-test="guardar-motivo"]');
    await expect(page.locator('text=La descripción es obligatoria')).toBeVisible();

    // Validación: descripción muy corta - el mensaje real es "al menos 3 caracteres"
    await page.fill('[data-test="input-descripcion"]', 'AB');
    await page.click('[data-test="guardar-motivo"]');
    await expect(page.locator('text=La descripción debe tener al menos 3 caracteres'))
      .toBeVisible();

    // Rellenar correctamente
    await page.fill('[data-test="input-descripcion"]', 'Nuevo Motivo Test');
    await page.selectOption('[data-test="select-estado"]', { label: 'Activo' });
    await page.click('[data-test="guardar-motivo"]');

    // Verificar mensaje de éxito
    await expect(page.locator('text=Registro realizado satisfactoriamente')).toBeVisible();
    
    // Verificar que el modal se cierra
    await expect(page.locator('[data-test="modal-motivo"]')).not.toBeVisible();
  });

  test('MOT-03: Editar motivo y guardar', async ({ page }) => {
    // Mock inicial para cargar datos en la tabla - URL correcta
    await page.route('**/api/configuracion/motivos*', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: 1, descripcion: 'Motivo Original', estado: 'ACTIVO', almacenId: 1 }
          ])
        });
      }
    });

    // Recargar para obtener datos mockeados
    await page.reload();
    await page.waitForSelector('[data-test="tabla-motivos"] tbody tr');

    // Mock del servicio de actualización (RF 1.17.3) - URL correcta
    await page.route('**/api/configuracion/motivos/1', async (route) => {
      const request = route.request();
      if (request.method() === 'PUT') {
        const putData = JSON.parse(request.postData() || '{}');
        expect(putData.descripcion).toBe('Motivo Editado Test');
        
        await route.fulfill({ 
          status: 200, 
          contentType: 'application/json',
          body: JSON.stringify({ 
            id: 1, 
            ...putData 
          }) 
        });
      }
    });

    // Hacer clic en el botón editar del primer motivo
    await page.click('[data-test="editar-motivo-1"]');
    
    // Esperar a que el modal esté visible
    await page.waitForSelector('[data-test="input-descripcion"]');

    // Cambiar la descripción
    await page.fill('[data-test="input-descripcion"]', 'Motivo Editado Test');
    await page.click('[data-test="guardar-motivo"]');

    // Verificar mensaje de éxito
    await expect(page.locator('text=Registro realizado satisfactoriamente')).toBeVisible();
  });

  test('MOT-04: Validar trim de espacios en blanco', async ({ page }) => {
    // Mock para el POST - URL correcta
    await page.route('**/api/configuracion/motivos', async (route) => {
      if (route.request().method() === 'POST') {
        const postData = JSON.parse(route.request().postData() || '{}');
        // Verificar que la descripción fue trimmeada
        expect(postData.descripcion).toBe('Motivo con espacios');
        
        await route.fulfill({ 
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ 
            id: 3, 
            ...postData 
          }) 
        });
      }
    });

    await page.click('[data-test="agregar-motivo"]');
    await page.waitForSelector('[data-test="modal-motivo"]');

    // Ingresar descripción con espacios al inicio y final
    await page.fill('[data-test="input-descripcion"]', '   Motivo con espacios   ');
    
    // Mock para verificar que se envía sin espacios
    await page.route('**/api/config/motivos', async (route) => {
      if (route.request().method() === 'POST') {
        const postData = JSON.parse(route.request().postData() || '{}');
        expect(postData.descripcion).toBe('Motivo con espacios');
        
        await route.fulfill({ 
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ id: 3, ...postData }) 
        });
      }
    });

    await page.selectOption('[data-test="select-estado"]', { label: 'Activo' });
    await page.click('[data-test="guardar-motivo"]');

    await expect(page.locator('text=Registro realizado satisfactoriamente')).toBeVisible();
  });

  test('MOT-05: Limpiar filtros restaura valores iniciales', async ({ page }) => {
    // Ingresar valores en los filtros
    await page.fill('[data-test="filtro-descripcion"]', 'Test');
    await page.selectOption('[data-test="filtro-estado"]', { label: 'Activo' });

    // Hacer clic en Limpiar
    await page.click('button:has-text("Limpiar")');

    // Verificar que los campos se limpiaron
    await expect(page.locator('[data-test="filtro-descripcion"]')).toHaveValue('');
    // El limpiarFiltros() pone estado: undefined, que en el select con ngValue se renderiza sin opción seleccionada
    // Verificamos que volvió a la primera opción "Todos"
    const selectedOption = await page.locator('[data-test="filtro-estado"] option:checked').textContent();
    expect(selectedOption).toBe('Todos');
  });
});
