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
export class UbicacionFisicaService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  //metodo para obtener objeto de datos para tabla
  public getUbicacionesFisicas(): Observable<Ubicacion[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getUbicacionesFisicas').pipe(map(data => data as Ubicacion[]));
  }


   // metodo para guardar nueva ubicacion fisica
   public guardarUbicacionFisica(ubi: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.globalservice.getUrlBackEnd() + 'guardarUbicacionFisica', ubi, httpOptions)
    .pipe(map(data => data as Ubicacion ));
  }

   // metodo para editar  ubicacion fisica
   public editarUbicacionFisica(ubi: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.globalservice.getUrlBackEnd() + 'editarUbicacionFisica', ubi, httpOptions)
    .pipe(map(data => data as Ubicacion ));
  }


   // metodo para eliminar ubicacion fisica
   public eliminarUbicacionFisica(ubi: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.globalservice.getUrlBackEnd() + 'eliminarUbicacionFisica', ubi, httpOptions)
    .pipe(map(data => data as Ubicacion ));
  }
 
}
