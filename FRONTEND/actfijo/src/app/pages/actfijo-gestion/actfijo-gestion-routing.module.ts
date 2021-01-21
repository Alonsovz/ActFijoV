import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActfijoGestionComponent } from './actfijo-gestion/actfijo-gestion.component';

const routes: Routes = [
  {
    path: '', component: ActfijoGestionComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActfijoGestionRoutingModule { }
