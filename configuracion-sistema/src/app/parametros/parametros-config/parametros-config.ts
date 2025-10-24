import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { ParametrosService } from '../../services/parametros';
import { CodigoParametro, Parametro, ParametroRequest, ParametroResponse, UnidadMedida } from '../../models/parametro.model';

/**
 * Componente para Configuración de Parámetros
 * RF 1.28.2 - Parámetros
 */
@Component({
  selector: 'app-parametros-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './parametros-config.html',
  styleUrl: './parametros-config.scss',
})
export class ParametrosConfig implements OnInit {
  // Tiempo de Reserva de Mercadería
  tiempoReserva = {
    id: undefined as number | undefined,
    cantidad: 0,
    unidadMedida: UnidadMedida.HORAS
  };

  // Tiempo de Bloqueo de Mercadería
  tiempoBloqueo = {
    id: undefined as number | undefined,
    cantidad: 0,
    unidadMedida: UnidadMedida.HORAS
  };

  // Unidades de medida disponibles
  unidadesMedida = [
    { valor: UnidadMedida.MINUTOS, etiqueta: 'Minutos' },
    { valor: UnidadMedida.HORAS, etiqueta: 'Horas' },
    { valor: UnidadMedida.DIAS, etiqueta: 'Días' }
  ];

  // Control de UI
  cargando = false;
  guardando = false;
  mensajeError = '';
  mensajeExito = '';

  // Errores de validación
  errores = {
    reservaCantidad: '',
    reservaUnidad: '',
    bloqueoCantidad: '',
    bloqueoUnidad: ''
  };

  constructor(private parametrosService: ParametrosService) {}

  ngOnInit(): void {
    this.cargarParametros();
  }

  /**
   * Carga los parámetros existentes
   * RF 1.17.4 - Consultar parámetros
   */
  cargarParametros(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.parametrosService.consultarParametros().subscribe({
      next: (parametros) => {
        parametros.forEach(param => {
          if (param.codigo === CodigoParametro.TIEMPO_RESERVA) {
            this.tiempoReserva = {
              id: param.id,
              cantidad: param.cantidad,
              unidadMedida: param.unidadMedida
            };
          } else if (param.codigo === CodigoParametro.TIEMPO_BLOQUEO) {
            this.tiempoBloqueo = {
              id: param.id,
              cantidad: param.cantidad,
              unidadMedida: param.unidadMedida
            };
          }
        });
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar parámetros:', error);
        this.mensajeError = 'Error al cargar los parámetros. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  /**
   * Valida el formulario según especificaciones de parametros.md
   */
  validarFormulario(): boolean {
    let valido = true;
    this.errores = {
      reservaCantidad: '',
      reservaUnidad: '',
      bloqueoCantidad: '',
      bloqueoUnidad: ''
    };

    // Validar Tiempo de Reserva - Cantidad
    // 1. Campo vacío o null
    if (!this.tiempoReserva.cantidad && this.tiempoReserva.cantidad !== 0) {
      this.errores.reservaCantidad = 'La cantidad es obligatoria';
      valido = false;
    }
    // 2. No es número
    else if (isNaN(this.tiempoReserva.cantidad)) {
      this.errores.reservaCantidad = 'La cantidad debe ser un número';
      valido = false;
    }
    // 3. No es positivo (≤ 0)
    else if (this.tiempoReserva.cantidad <= 0) {
      this.errores.reservaCantidad = 'La cantidad debe ser mayor a 0';
      valido = false;
    }
    // 4. Tiene decimales (no es entero)
    else if (!Number.isInteger(this.tiempoReserva.cantidad)) {
      this.errores.reservaCantidad = 'Solo números enteros permitidos';
      valido = false;
    }

    // Validar Tiempo de Reserva - Unidad
    if (!this.tiempoReserva.unidadMedida) {
      this.errores.reservaUnidad = 'Seleccione una unidad de medida';
      valido = false;
    }

    // Validar Tiempo de Bloqueo - Cantidad
    // 1. Campo vacío o null
    if (!this.tiempoBloqueo.cantidad && this.tiempoBloqueo.cantidad !== 0) {
      this.errores.bloqueoCantidad = 'La cantidad es obligatoria';
      valido = false;
    }
    // 2. No es número
    else if (isNaN(this.tiempoBloqueo.cantidad)) {
      this.errores.bloqueoCantidad = 'La cantidad debe ser un número';
      valido = false;
    }
    // 3. No es positivo (≤ 0)
    else if (this.tiempoBloqueo.cantidad <= 0) {
      this.errores.bloqueoCantidad = 'La cantidad debe ser mayor a 0';
      valido = false;
    }
    // 4. Tiene decimales (no es entero)
    else if (!Number.isInteger(this.tiempoBloqueo.cantidad)) {
      this.errores.bloqueoCantidad = 'Solo números enteros permitidos';
      valido = false;
    }

    // Validar Tiempo de Bloqueo - Unidad
    if (!this.tiempoBloqueo.unidadMedida) {
      this.errores.bloqueoUnidad = 'Seleccione una unidad de medida';
      valido = false;
    }

    return valido;
  }

  /**
   * Guarda la configuración de parámetros
   * RF 1.17.5 - Registrar parámetros (POST - primera vez)
   * RF 1.17.6 - Actualizar parámetros (PUT - actualizaciones)
   */
  guardarConfiguracion(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.guardando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    // Preparar requests para ambos parámetros
    const reservaRequest: ParametroRequest = {
      codigo: CodigoParametro.TIEMPO_RESERVA,
      cantidad: this.tiempoReserva.cantidad,
      unidadMedida: this.tiempoReserva.unidadMedida
    };

    const bloqueoRequest: ParametroRequest = {
      codigo: CodigoParametro.TIEMPO_BLOQUEO,
      cantidad: this.tiempoBloqueo.cantidad,
      unidadMedida: this.tiempoBloqueo.unidadMedida
    };

    // Determinar si usar POST (registrar) o PUT (actualizar) para cada parámetro
    const reservaOp: Observable<ParametroResponse> = this.tiempoReserva.id
      ? this.parametrosService.actualizarParametro(this.tiempoReserva.id, reservaRequest)
      : this.parametrosService.registrarParametro(reservaRequest);

    const bloqueoOp: Observable<ParametroResponse> = this.tiempoBloqueo.id
      ? this.parametrosService.actualizarParametro(this.tiempoBloqueo.id, bloqueoRequest)
      : this.parametrosService.registrarParametro(bloqueoRequest);

    // Ejecutar ambas operaciones en paralelo
    forkJoin({
      reserva: reservaOp,
      bloqueo: bloqueoOp
    }).subscribe({
      next: (responses) => {
        this.guardando = false;
        this.mensajeExito = 'Configuración guardada satisfactoriamente';
        this.cargarParametros(); // Recargar para reflejar cambios
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.mensajeExito = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Error al guardar configuración:', error);
        this.mensajeError = 'Error al guardar la configuración. Por favor, intente nuevamente.';
        this.guardando = false;
      }
    });
  }

  /**
   * Valida que el input sea numérico
   */
  validarNumero(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    // Solo permite números (0-9)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
