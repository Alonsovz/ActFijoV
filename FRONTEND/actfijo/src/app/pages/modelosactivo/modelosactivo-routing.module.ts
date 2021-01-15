import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelosactivoComponent } from './modelosactivo/modelosactivo.component';

const routes: Routes = [
  {
    path: '', component: ModelosactivoComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelosactivoRoutingModule { }
