import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'modelosactivo',
        loadChildren: () => import('./../modelosactivo/modelosactivo.module').then(m => m.ModelosactivoModule)
      },
      {
        path: 'marcasactivo',
        loadChildren: () => import('./../marcasactivo/marcasactivo.module').then(m => m.MarcasactivoModule)
      },
      {
        path: 'tipoactivo',
        loadChildren: () => import('./../tipoactivo/tipoactivo.module').then(m => m.TipoactivoModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./../usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./../roles/roles.module').then(m => m.RolesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
