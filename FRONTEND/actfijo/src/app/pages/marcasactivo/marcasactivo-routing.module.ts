import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcasactivoComponent } from './marcasactivo/marcasactivo.component';

const routes: Routes = [
  {
    path: '', component: MarcasactivoComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasactivoRoutingModule { }
