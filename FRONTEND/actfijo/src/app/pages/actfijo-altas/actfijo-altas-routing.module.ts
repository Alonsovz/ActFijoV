import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActfijoAltasComponent } from './actfijo-altas/actfijo-altas.component';

const routes: Routes = [
  {
    path: '', component: ActfijoAltasComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActfijoAltasRoutingModule { }
