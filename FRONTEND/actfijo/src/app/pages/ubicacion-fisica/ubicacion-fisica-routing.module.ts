import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionFisicaComponent } from './ubicacion-fisica/ubicacion-fisica.component';

const routes: Routes = [
  {
    path: '', component: UbicacionFisicaComponent,
    children: [
 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UbicacionFisicaRoutingModule { }
