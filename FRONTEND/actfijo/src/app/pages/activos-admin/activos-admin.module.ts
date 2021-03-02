import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivosAdminRoutingModule } from './activos-admin-routing.module';
import { ActivosAdminComponent } from './activos-admin/activos-admin.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [ActivosAdminComponent],
  imports: [
    CommonModule,
    ActivosAdminRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ActivosAdminModule { }
