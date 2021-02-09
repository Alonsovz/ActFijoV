import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentosRoutingModule } from './tipo-documentos-routing.module';
import { TipoDocumentosComponent } from './tipo-documentos/tipo-documentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [TipoDocumentosComponent],
  imports: [
    CommonModule,
    TipoDocumentosRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class TipoDocumentosModule { }
