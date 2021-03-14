import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupervisorActivosComponent } from './supervisor-activos/supervisor-activos.component';


const routes: Routes = [
  {
    path: '', component: SupervisorActivosComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorActivosRoutingModule { }
