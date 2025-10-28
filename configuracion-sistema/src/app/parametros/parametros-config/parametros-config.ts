import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametrosService } from '../../services/parametros';
import { Parametro, ParametroRequest } from '../../models/parametro.model';

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
  // Configuración actual
  parametros: Parametro = {
    cantidadTiempoDesbloqueo: 0,
    unidadMedidaTiempoDesbloqueo: 'horas',
    cantidadTiempoReserva: 0,
    unidadMedidaTiempoReserva: 'horas'
  };

  // Unidades de medida disponibles (valores en minúscula según Backend)
  unidadesMedida = [
    { valor: 'minutos', etiqueta: 'Minutos' },
    { valor: 'horas', etiqueta: 'Horas' },
    { valor: 'dias', etiqueta: 'Días' }
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
    desbloqueCantidad: '',
    desbloqueoUnidad: ''
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
        this.parametros = parametros;
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
      desbloqueCantidad: '',
      desbloqueoUnidad: ''
    };

    // Validar Tiempo de Reserva - Cantidad
    if (!this.parametros.cantidadTiempoReserva && this.parametros.cantidadTiempoReserva !== 0) {
      this.errores.reservaCantidad = 'La cantidad es obligatoria';
      valido = false;
    } else if (isNaN(this.parametros.cantidadTiempoReserva)) {
      this.errores.reservaCantidad = 'La cantidad debe ser un número';
      valido = false;
    } else if (this.parametros.cantidadTiempoReserva <= 0) {
      this.errores.reservaCantidad = 'La cantidad debe ser mayor a 0';
      valido = false;
    } else if (!Number.isInteger(this.parametros.cantidadTiempoReserva)) {
      this.errores.reservaCantidad = 'Solo números enteros permitidos';
      valido = false;
    }

    // Validar Tiempo de Reserva - Unidad
    if (!this.parametros.unidadMedidaTiempoReserva) {
      this.errores.reservaUnidad = 'Seleccione una unidad de medida';
      valido = false;
    }

    // Validar Tiempo de Desbloqueo - Cantidad
    if (!this.parametros.cantidadTiempoDesbloqueo && this.parametros.cantidadTiempoDesbloqueo !== 0) {
      this.errores.desbloqueCantidad = 'La cantidad es obligatoria';
      valido = false;
    } else if (isNaN(this.parametros.cantidadTiempoDesbloqueo)) {
      this.errores.desbloqueCantidad = 'La cantidad debe ser un número';
      valido = false;
    } else if (this.parametros.cantidadTiempoDesbloqueo <= 0) {
      this.errores.desbloqueCantidad = 'La cantidad debe ser mayor a 0';
      valido = false;
    } else if (!Number.isInteger(this.parametros.cantidadTiempoDesbloqueo)) {
      this.errores.desbloqueCantidad = 'Solo números enteros permitidos';
      valido = false;
    }

    // Validar Tiempo de Desbloqueo - Unidad
    if (!this.parametros.unidadMedidaTiempoDesbloqueo) {
      this.errores.desbloqueoUnidad = 'Seleccione una unidad de medida';
      valido = false;
    }

    return valido;
  }

  /**
   * Guarda la configuración de parámetros
   * RF 1.17.5 - Actualizar parámetros
   */
  guardarConfiguracion(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.guardando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const request: ParametroRequest = {
      cantidadTiempoDesbloqueo: this.parametros.cantidadTiempoDesbloqueo!,
      unidadMedidaTiempoDesbloqueo: this.parametros.unidadMedidaTiempoDesbloqueo!,
      cantidadTiempoReserva: this.parametros.cantidadTiempoReserva!,
      unidadMedidaTiempoReserva: this.parametros.unidadMedidaTiempoReserva!
    };

    this.parametrosService.actualizarParametros(request).subscribe({
      next: (response) => {
        this.guardando = false;
        this.mensajeExito = 'Configuración guardada satisfactoriamente';
        this.cargarParametros();
        
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
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
