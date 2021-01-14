import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasactivoRoutingModule } from './marcasactivo-routing.module';
import { MarcasactivoComponent } from './marcasactivo/marcasactivo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MarcasactivoComponent],
  imports: [
    CommonModule,
    MarcasactivoRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MarcasactivoModule { }
