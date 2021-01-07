import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoactivoRoutingModule } from './tipoactivo-routing.module';
import { TipoactivoComponent } from './tipoactivo/tipoactivo.component';


@NgModule({
  declarations: [TipoactivoComponent],
  imports: [
    CommonModule,
    TipoactivoRoutingModule
  ]
})
export class TipoactivoModule { }
