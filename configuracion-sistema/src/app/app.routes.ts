import { Routes } from '@angular/router';
import { MotivosLista } from './motivos/motivos-lista/motivos-lista';
import { ParametrosConfig } from './parametros/parametros-config/parametros-config';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/motivos',
    pathMatch: 'full'
  },
  {
    path: 'motivos',
    component: MotivosLista,
    title: 'Mantenimiento de Motivos'
  },
  {
    path: 'parametros',
    component: ParametrosConfig,
    title: 'Configuración de Parámetros'
  },
  {
    path: '**',
    redirectTo: '/motivos'
  }
];
