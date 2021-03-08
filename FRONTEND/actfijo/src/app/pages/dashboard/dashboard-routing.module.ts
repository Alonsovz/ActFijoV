import { TipoDocumentosModule } from './../tipo-documentos/tipo-documentos.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'tipoBienVnr',
        loadChildren: () => import('./../tipo-bien-vnr/tipo-bien-vnr.module').then(m => m.TipoBienVnrModule)
      },
      {
        path: 'clasificacionAgd',
        loadChildren: () => import('./../clasificacion-agd/clasificacion-agd.module').then(m => m.ClasificacionAgdModule)
      },
      {
        path: 'actfijoGestion',
        loadChildren: () => import('./../actfijo-gestion/actfijo-gestion.module').then(m => m.ActfijoGestionModule)
      },
      {
        path: 'adminActivos',
        loadChildren: () => import('./../activos-admin/activos-admin.module').then(m => m.ActivosAdminModule)
      },
      {
        path: 'reportesActivos',
        loadChildren: () => import('./../reportes-activos/reportes-activos.module').then(m => m.ReportesActivosModule)
      },
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
      {
        path: 'tiposdocumentos',
        loadChildren: () => import('./../tipo-documentos/tipo-documentos.module').then(m => m.TipoDocumentosModule)
      },
      {
        path: 'bodegas',
        loadChildren: () => import('./../bodegas/bodegas.module').then(m => m.BodegasModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
