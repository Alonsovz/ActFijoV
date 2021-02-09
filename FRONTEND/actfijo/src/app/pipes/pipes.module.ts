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



@NgModule({
  declarations: [
    SearchusuarioPipe,
    SearchrolesPipe, 
    SearchtipoactivoPipe,
    SearchmarcaactivoPipe,
    SearchmodeloactivoPipe,
    SearchtipobienvnrPipe, 
    SearchclasificacionagdPipe,
    SearchtipodocsPipe
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
    SearchtipodocsPipe]
})
export class PipesModule { }
