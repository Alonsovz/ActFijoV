import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoactivoRoutingModule } from './tipoactivo-routing.module';
import { TipoactivoComponent } from './tipoactivo/tipoactivo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [TipoactivoComponent],
  imports: [
    CommonModule,
    TipoactivoRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class TipoactivoModule {

 }
