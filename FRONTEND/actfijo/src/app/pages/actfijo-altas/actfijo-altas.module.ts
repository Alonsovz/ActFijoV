import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActfijoAltasRoutingModule } from './actfijo-altas-routing.module';
import { ActfijoAltasComponent } from './actfijo-altas/actfijo-altas.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ActfijoAltasComponent],
  imports: [
    CommonModule,
    ActfijoAltasRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ActfijoAltasModule { }
