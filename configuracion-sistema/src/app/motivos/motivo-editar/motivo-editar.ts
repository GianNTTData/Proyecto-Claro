import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotivosService } from '../../services/motivos';
import { Motivo, EstadoMotivo, MotivoRequest } from '../../models/motivo.model';

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
  descripcion = '';
  estado: EstadoMotivo = EstadoMotivo.ACTIVO;

  // Estados disponibles
  estadosDisponibles = [
    { valor: EstadoMotivo.ACTIVO, etiqueta: 'Activo' },
    { valor: EstadoMotivo.INACTIVO, etiqueta: 'Inactivo' }
  ];

  // Control de UI
  guardando = false;
  mensajeError = '';

  // Errores de validación
  errores = {
    descripcion: ''
  };

  constructor(private motivosService: MotivosService) {}

  ngOnInit(): void {
    if (this.motivo) {
      this.descripcion = this.motivo.descripcion;
      this.estado = this.motivo.estado;
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
    this.errores = { descripcion: '' };

    // Aplicar trim automáticamente
    this.descripcion = this.descripcion.trim();

    // Validar descripción - Campo vacío
    if (!this.descripcion || this.descripcion.length === 0) {
      this.errores.descripcion = 'La descripción es obligatoria';
      valido = false;
      return valido;
    }

    // Validar descripción - Solo espacios (ya aplicado trim arriba)
    if (this.descripcion.length === 0) {
      this.errores.descripcion = 'La descripción no puede estar vacía';
      valido = false;
      return valido;
    }

    // Validar descripción - Rango de caracteres (3-100)
    if (this.descripcion.length < 3) {
      this.errores.descripcion = 'La descripción debe tener al menos 3 caracteres';
      valido = false;
      return valido;
    }

    if (this.descripcion.length > 100) {
      this.errores.descripcion = 'La descripción no puede exceder 100 caracteres';
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
      descripcion: this.descripcion.trim(),
      estado: this.estado,
      almacenId: this.motivo.almacenId
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
