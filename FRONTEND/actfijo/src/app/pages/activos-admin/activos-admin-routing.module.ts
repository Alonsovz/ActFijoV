import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivosAdminComponent } from './activos-admin/activos-admin.component';


const routes: Routes = [
  {
    path: '', component: ActivosAdminComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivosAdminRoutingModule { }
