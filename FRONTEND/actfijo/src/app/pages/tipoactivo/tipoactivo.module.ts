import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoactivoRoutingModule } from './tipoactivo-routing.module';
import { TipoactivoComponent } from './tipoactivo/tipoactivo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';

@NgModule({
  declarations: [TipoactivoComponent],
  imports: [
    CommonModule,
    TipoactivoRoutingModule,
    ZmoduleModule
  ]
})
export class TipoactivoModule {

 }
