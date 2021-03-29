import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescripcionActivoComponent } from './descripcion-activo/descripcion-activo.component';


const routes: Routes = [
  {
    path: '', component: DescripcionActivoComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescripcionActivoRoutingModule { }
