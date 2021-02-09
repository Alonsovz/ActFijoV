import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelosactivoRoutingModule } from './modelosactivo-routing.module';
import { ModelosactivoComponent } from './modelosactivo/modelosactivo.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [ModelosactivoComponent],
  imports: [
    CommonModule,
    ModelosactivoRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ModelosactivoModule { }
