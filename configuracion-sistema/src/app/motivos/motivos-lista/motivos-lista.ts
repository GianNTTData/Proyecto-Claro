import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotivosService } from '../../services/motivos';
import { Motivo, MotivoFiltros } from '../../models/motivo.model';
import { MotivoAgregar } from '../motivo-agregar/motivo-agregar';
import { MotivoEditar } from '../motivo-editar/motivo-editar';

/**
 * Componente para Listado de Motivos de Devolución
 * RF 1.28.1 - Mantenimiento de Motivos
 */
@Component({
  selector: 'app-motivos-lista',
  imports: [CommonModule, FormsModule, MotivoAgregar, MotivoEditar],
  templateUrl: './motivos-lista.html',
  styleUrl: './motivos-lista.scss',
})
export class MotivosLista implements OnInit {
  // Datos
  motivos: Motivo[] = [];
  motivoSeleccionado: Motivo | null = null;
  
  // Filtros de búsqueda
  filtros: MotivoFiltros = {
    nombreMotivo: '',
    estadoMotivo: undefined
  };

  // Estados para dropdowns
  estadosDisponibles = [
    { valor: 'ACTIVO', etiqueta: 'Activo' },
    { valor: 'INACTIVO', etiqueta: 'Inactivo' }
  ];

  // Control de UI
  cargando = false;
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mensajeError = '';
  mensajeExito = '';

  constructor(private motivosService: MotivosService) {}

  ngOnInit(): void {
    this.buscarMotivos();
  }

  /**
   * Busca motivos según filtros aplicados
   * RF 1.17.1 - Consultar motivo
   */
  buscarMotivos(): void {
    this.cargando = true;
    this.mensajeError = '';
    
    // Nota: almacenId NO es un parámetro soportado por el Backend según RF 1.17.1
    // Solo se envían descripcion y estado
    this.motivosService.consultarMotivos(this.filtros).subscribe({
      next: (motivos) => {
        this.motivos = motivos;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al consultar motivos:', error);
        this.mensajeError = 'Error al cargar los motivos. Por favor, intente nuevamente.';
        this.cargando = false;
      }
    });
  }

  /**
   * Abre modal para agregar nuevo motivo
   */
  abrirModalAgregar(): void {
    this.mostrarModalAgregar = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  /**
   * Abre modal para editar motivo existente
   */
  abrirModalEditar(motivo: Motivo): void {
    this.motivoSeleccionado = { ...motivo };
    this.mostrarModalEditar = true;
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  /**
   * Cierra modales
   */
  cerrarModales(): void {
    this.mostrarModalAgregar = false;
    this.mostrarModalEditar = false;
    this.motivoSeleccionado = null;
  }

  /**
   * Maneja el evento de motivo guardado exitosamente
   */
  onMotivoGuardado(mensaje: string): void {
    this.mensajeExito = mensaje;
    this.cerrarModales();
    this.buscarMotivos(); // Recargar lista
    
    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      this.mensajeExito = '';
    }, 5000);
  }

  /**
   * Limpia los filtros de búsqueda
   */
  limpiarFiltros(): void {
    this.filtros = {
      nombreMotivo: '',
      estadoMotivo: undefined
    };
    this.buscarMotivos();
  }
}
