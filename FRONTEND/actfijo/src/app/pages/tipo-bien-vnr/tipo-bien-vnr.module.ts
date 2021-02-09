import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoBienVnrRoutingModule } from './tipo-bien-vnr-routing.module';
import { TipoBienVnrComponent } from './tipo-bien-vnr/tipo-bien-vnr.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [TipoBienVnrComponent],
  imports: [
    CommonModule,
    TipoBienVnrRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class TipoBienVnrModule { }
