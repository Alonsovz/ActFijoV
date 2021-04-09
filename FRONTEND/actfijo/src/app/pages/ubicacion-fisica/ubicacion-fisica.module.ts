import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionFisicaRoutingModule } from './ubicacion-fisica-routing.module';
import { UbicacionFisicaComponent } from './ubicacion-fisica/ubicacion-fisica.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [UbicacionFisicaComponent],
  imports: [
    CommonModule,
    UbicacionFisicaRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class UbicacionFisicaModule { }
