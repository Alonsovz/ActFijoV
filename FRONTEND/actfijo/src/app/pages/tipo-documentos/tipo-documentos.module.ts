import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentosRoutingModule } from './tipo-documentos-routing.module';
import { TipoDocumentosComponent } from './tipo-documentos/tipo-documentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZmoduleModule } from 'src/app/zmodule.module';


@NgModule({
  declarations: [TipoDocumentosComponent],
  imports: [
    CommonModule,
    TipoDocumentosRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TipoDocumentosModule { }
