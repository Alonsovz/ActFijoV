import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasactivoRoutingModule } from './marcasactivo-routing.module';
import { MarcasactivoComponent } from './marcasactivo/marcasactivo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [MarcasactivoComponent],
  imports: [
    CommonModule,
    MarcasactivoRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class MarcasactivoModule { }
