import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelosactivoRoutingModule } from './modelosactivo-routing.module';
import { ModelosactivoComponent } from './modelosactivo/modelosactivo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModelosactivoComponent],
  imports: [
    CommonModule,
    ModelosactivoRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModelosactivoModule { }
