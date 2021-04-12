import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ubicacion } from '../models/Ubicacion';
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
export class UbicacionEspecificaService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  //metodo para obtener objeto de datos para tabla
  public getUbicacionesEspecificas(): Observable<Ubicacion[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getUbicacionesEspecificas').pipe(map(data => data as Ubicacion[]));
  }


   // metodo para guardar nueva ubicación especifica
   public guardarUbicacionEspecifica(ubi: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.globalservice.getUrlBackEnd() + 'guardarUbicacionEspecifica', ubi, httpOptions)
    .pipe(map(data => data as Ubicacion ));
  }

   // metodo para editar  ubicación especifica
   public editarUbicacionEspecifica(ubi: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.globalservice.getUrlBackEnd() + 'editarUbicacionEspecifica', ubi, httpOptions)
    .pipe(map(data => data as Ubicacion ));
  }


   // metodo para eliminar ubicación especifica
   public eliminarUbicacionEspecifica(ubi: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.globalservice.getUrlBackEnd() + 'eliminarUbicacionEspecifica', ubi, httpOptions)
    .pipe(map(data => data as Ubicacion ));
  }
}
