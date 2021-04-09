import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionEspecificaComponent } from './ubicacion-especifica/ubicacion-especifica.component';

const routes: Routes = [
  {
    path: '', component: UbicacionEspecificaComponent,
    children: [
 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionEspecificaRoutingModule { }
