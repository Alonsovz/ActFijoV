import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionEspecificaRoutingModule } from './ubicacion-especifica-routing.module';
import { UbicacionEspecificaComponent } from './ubicacion-especifica/ubicacion-especifica.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [UbicacionEspecificaComponent],
  imports: [
    CommonModule,
    UbicacionEspecificaRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class UbicacionEspecificaModule { }
