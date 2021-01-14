import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tipoactivo } from '../models/tipoactivo';
import { GlobalService } from './global.service';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class TipoactivoService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

 //metodo para obtener objeto de datos para tabla
 public getTipoActivo(): Observable<Tipoactivo[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getTipoActivo').pipe(map(data => data as Tipoactivo[]));
}


  // metodo para guardar nuevo tipoactivo
  public guardarTipoActivo(tipoActivo: Tipoactivo): Observable<Tipoactivo> {
    return this.http.post<Tipoactivo>(this.globalservice.getUrlBackEnd() + 'guardarTipoActivo', tipoActivo, httpOptions)
    .pipe(map(data => data as Tipoactivo ));
  }

    // metodo para guardar edicion tipoactivo
    public editarTipoActivo(tipoActivo: Tipoactivo): Observable<Tipoactivo> {
      return this.http.post<Tipoactivo>(this.globalservice.getUrlBackEnd() + 'editarTipoActivo', tipoActivo, httpOptions)
      .pipe(map(data => data as Tipoactivo ));
    }

    // metodo para guardar edicion tipoactivo
    public eliminarTipoActivo(tipoActivo: Tipoactivo): Observable<Tipoactivo> {
      return this.http.post<Tipoactivo>(this.globalservice.getUrlBackEnd() + 'eliminarTipoActivo', tipoActivo, httpOptions)
      .pipe(map(data => data as Tipoactivo ));
    }
}
