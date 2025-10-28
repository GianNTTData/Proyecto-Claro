import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotivosService } from '../../services/motivos';
import { MotivoRequest } from '../../models/motivo.model';

/**
 * Componente Modal para Agregar Motivo de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 */
@Component({
  selector: 'app-motivo-agregar',
  imports: [CommonModule, FormsModule],
  templateUrl: './motivo-agregar.html',
  styleUrl: './motivo-agregar.scss',
})
export class MotivoAgregar {
  @Output() cerrar = new EventEmitter<void>();
  @Output() motivoGuardado = new EventEmitter<string>();

  // Formulario
  nombreMotivo = '';
  estadoMotivo = 'ACTIVO';

  // Estados disponibles
  estadosDisponibles = [
    { valor: 'ACTIVO', etiqueta: 'Activo' },
    { valor: 'INACTIVO', etiqueta: 'Inactivo' }
  ];

  // Control de UI
  guardando = false;
  mensajeError = '';

  // Errores de validación
  errores = {
    nombreMotivo: ''
  };

  constructor(private motivosService: MotivosService) {}

  /**
   * Valida el formulario según especificaciones de motivos.md
   * - Campo obligatorio
   * - Trim automático
   * - No solo espacios
   * - Rango: 3-100 caracteres
   */
  validarFormulario(): boolean {
    let valido = true;
    this.errores = { nombreMotivo: '' };

    // Aplicar trim automáticamente
    this.nombreMotivo = this.nombreMotivo.trim();

    // Validar nombreMotivo - Campo vacío
    if (!this.nombreMotivo || this.nombreMotivo.length === 0) {
      this.errores.nombreMotivo = 'La descripción es obligatoria';
      valido = false;
      return valido;
    }

    // Validar nombreMotivo - Solo espacios (ya aplicado trim arriba)
    if (this.nombreMotivo.length === 0) {
      this.errores.nombreMotivo = 'La descripción no puede estar vacía';
      valido = false;
      return valido;
    }

    // Validar nombreMotivo - Rango de caracteres (3-100)
    if (this.nombreMotivo.length < 3) {
      this.errores.nombreMotivo = 'La descripción debe tener al menos 3 caracteres';
      valido = false;
      return valido;
    }

    if (this.nombreMotivo.length > 100) {
      this.errores.nombreMotivo = 'La descripción no puede exceder 100 caracteres';
      valido = false;
      return valido;
    }

    return valido;
  }

  /**
   * Guarda el nuevo motivo
   * RF 1.17.2 - Registrar motivo
   */
  guardar(): void {
    if (!this.validarFormulario()) {
      return;
    }

    this.guardando = true;
    this.mensajeError = '';

    const motivo: MotivoRequest = {
      nombreMotivo: this.nombreMotivo.trim(),
      estadoMotivo: this.estadoMotivo
    };

    this.motivosService.registrarMotivo(motivo).subscribe({
      next: (response) => {
        this.guardando = false;
        this.motivoGuardado.emit('Registro realizado satisfactoriamente');
      },
      error: (error) => {
        console.error('Error al registrar motivo:', error);
        this.mensajeError = 'Error al guardar el motivo. Por favor, intente nuevamente.';
        this.guardando = false;
      }
    });
  }

  /**
   * Cierra el modal
   */
  cancelar(): void {
    this.cerrar.emit();
  }
}
