import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorActivosRoutingModule } from './supervisor-activos-routing.module';
import { SupervisorActivosComponent } from './supervisor-activos/supervisor-activos.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [SupervisorActivosComponent],
  imports: [
    CommonModule,
    SupervisorActivosRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SupervisorActivosModule { }
