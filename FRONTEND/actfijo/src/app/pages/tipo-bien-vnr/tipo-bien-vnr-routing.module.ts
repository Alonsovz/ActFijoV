import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoBienVnrComponent } from './tipo-bien-vnr/tipo-bien-vnr.component';

const routes: Routes = [
  {
    path: '', component: TipoBienVnrComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoBienVnrRoutingModule { }
