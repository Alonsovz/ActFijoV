import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasificacionAgdRoutingModule } from './clasificacion-agd-routing.module';
import { ClasificacionAgdComponent } from './clasificacion-agd/clasificacion-agd.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [ClasificacionAgdComponent],
  imports: [
    CommonModule,
    ClasificacionAgdRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ClasificacionAgdModule { }
