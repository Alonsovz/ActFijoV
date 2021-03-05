import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesActivosRoutingModule } from './reportes-activos-routing.module';
import { ReportesActivosComponent } from './reportes-activos/reportes-activos.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [ReportesActivosComponent],
  imports: [
    CommonModule,
    ReportesActivosRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ReportesActivosModule { }
