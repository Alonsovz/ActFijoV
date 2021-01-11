import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'tipoactivo',
        loadChildren: () => import('./../tipoactivo/tipoactivo.module').then(m => m.TipoactivoModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./../usuarios/usuarios.module').then(m => m.UsuariosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
