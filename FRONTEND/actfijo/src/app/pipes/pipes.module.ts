import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchusuarioPipe } from './searchusuario.pipe';
import { SearchrolesPipe } from './searchroles.pipe';
import { SearchtipoactivoPipe } from './searchtipoactivo.pipe';
import { SearchmarcaactivoPipe } from './searchmarcaactivo.pipe';
import { SearchmodeloactivoPipe } from './searchmodeloactivo.pipe';
import { SearchtipobienvnrPipe } from './searchtipobienvnr.pipe';
import { SearchclasificacionagdPipe } from './searchclasificacionagd.pipe';
import { SearchtipodocsPipe } from './searchtipodocs.pipe';
import { SearchactgestionPipe } from './searchactgestion.pipe';
import { SearchactgestionuserPipe } from './searchactgestionuser.pipe';
import { SearchreportesPipe } from './searchreportes.pipe';
import { SearchdescactivosPipe } from './searchdescactivos.pipe';
import { SearchubicacionPipe } from './searchubicacion.pipe'
import { SearchafCodePipe } from './searchaf-code.pipe';



@NgModule({
  declarations: [
    SearchusuarioPipe,
    SearchrolesPipe, 
    SearchtipoactivoPipe,
    SearchmarcaactivoPipe,
    SearchmodeloactivoPipe,
    SearchtipobienvnrPipe, 
    SearchclasificacionagdPipe,
    SearchtipodocsPipe,
    SearchactgestionPipe,
    SearchactgestionuserPipe,
    SearchreportesPipe,
    SearchdescactivosPipe,
    SearchubicacionPipe,
    SearchafCodePipe
  ],
  imports: [
    CommonModule
  ], exports: [
    SearchusuarioPipe,
    SearchrolesPipe, 
    SearchtipoactivoPipe,
    SearchmarcaactivoPipe,
    SearchmodeloactivoPipe,
    SearchtipobienvnrPipe, 
    SearchclasificacionagdPipe,
    SearchtipodocsPipe,
    SearchactgestionPipe,
    SearchactgestionuserPipe,
    SearchreportesPipe,
    SearchdescactivosPipe,
    SearchubicacionPipe,
    SearchafCodePipe
  ]
})
export class PipesModule { }
