import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoBienVnrRoutingModule } from './tipo-bien-vnr-routing.module';
import { TipoBienVnrComponent } from './tipo-bien-vnr/tipo-bien-vnr.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TipoBienVnrComponent],
  imports: [
    CommonModule,
    TipoBienVnrRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TipoBienVnrModule { }
