import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActfijoGestionRoutingModule } from './actfijo-gestion-routing.module';
import { ActfijoGestionComponent } from './actfijo-gestion/actfijo-gestion.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ActfijoGestionComponent],
  imports: [
    CommonModule,
    ActfijoGestionRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ActfijoGestionModule { }
