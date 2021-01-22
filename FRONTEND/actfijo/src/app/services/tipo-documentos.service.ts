import { TipoDocumentosModule } from './../pages/tipo-documentos/tipo-documentos.module';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoDocumentos } from '../models/tipo-documentos';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentosService {

  constructor(private http: HttpClient, private globalservice: GlobalService) { }

  // guardar tipo de documento
  saveTipoDocumento(tipodocumento: TipoDocumentos): Observable<TipoDocumentos> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'guardarTipoDocumento', tipodocumento).pipe(
      map(data => data as TipoDocumentos)
    );
  }

  // mostrar los tipos de documentos
  getTipoDocumentos(): Observable<TipoDocumentos[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getTipoDocumentos').pipe(
      map(data => data as TipoDocumentos[])
    );
  }

  // editarTipoDocumento
  editarTipoDocumento(tipodocumento: TipoDocumentos): Observable<TipoDocumentos> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'editarTipoDocumento', tipodocumento ).pipe(
      map(data => data as TipoDocumentos)
    );
  }

  // eliminar tipo de documento
  eliminarTipoDocumento(tipodocumento: TipoDocumentos): Observable<TipoDocumentos> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'eliminartipodocumento', tipodocumento).pipe(
      map(data => data as TipoDocumentos)
    );
  }
}
