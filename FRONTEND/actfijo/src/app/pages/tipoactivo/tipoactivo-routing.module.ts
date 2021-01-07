import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoactivoComponent } from './tipoactivo/tipoactivo.component';

const routes: Routes = [
  {
    path: '', component: TipoactivoComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoactivoRoutingModule { }
