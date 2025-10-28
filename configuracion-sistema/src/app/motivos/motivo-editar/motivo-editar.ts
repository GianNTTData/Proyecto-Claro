import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotivosService } from '../../services/motivos';
import { Motivo, MotivoRequest } from '../../models/motivo.model';

/**
 * Componente Modal para Editar Motivo de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 */
@Component({
  selector: 'app-motivo-editar',
  imports: [CommonModule, FormsModule],
  templateUrl: './motivo-editar.html',
  styleUrl: './motivo-editar.scss',
})
export class MotivoEditar implements OnInit {
  @Input() motivo: Motivo | null = null;
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

  ngOnInit(): void {
    if (this.motivo) {
      this.nombreMotivo = this.motivo.nombreMotivo;
      this.estadoMotivo = this.motivo.estadoMotivo;
    }
  }

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
   * Guarda las modificaciones del motivo
   * RF 1.17.3 - Actualizar motivo
   */
  guardar(): void {
    if (!this.validarFormulario() || !this.motivo?.id) {
      return;
    }

    this.guardando = true;
    this.mensajeError = '';

    const motivoActualizado: MotivoRequest = {
      nombreMotivo: this.nombreMotivo.trim(),
      estadoMotivo: this.estadoMotivo
    };

    this.motivosService.actualizarMotivo(this.motivo.id, motivoActualizado).subscribe({
      next: (response) => {
        this.guardando = false;
        this.motivoGuardado.emit('Registro realizado satisfactoriamente');
      },
      error: (error) => {
        console.error('Error al actualizar motivo:', error);
        this.mensajeError = 'Error al actualizar el motivo. Por favor, intente nuevamente.';
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
