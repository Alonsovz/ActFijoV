import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClasificacionAgdComponent } from './clasificacion-agd/clasificacion-agd.component';

const routes: Routes = [
  {
    path: '', component: ClasificacionAgdComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasificacionAgdRoutingModule { }
