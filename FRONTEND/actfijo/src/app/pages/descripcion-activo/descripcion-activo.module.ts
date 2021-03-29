import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescripcionActivoRoutingModule } from './descripcion-activo-routing.module';
import { DescripcionActivoComponent } from './descripcion-activo/descripcion-activo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [DescripcionActivoComponent],
  imports: [
    CommonModule,
    DescripcionActivoRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class DescripcionActivoModule { }
