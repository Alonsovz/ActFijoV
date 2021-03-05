import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportesActivosComponent } from './reportes-activos/reportes-activos.component';

const routes: Routes = [
  {
    path: '', component: ReportesActivosComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesActivosRoutingModule { }
