import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marcasactivo } from '../models/marcasactivo';
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
export class MarcasactivoService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  //metodo para obtener objeto de datos para tabla
  public getMarcasActivo(): Observable<Marcasactivo[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getMarcasActivo').pipe(map(data => data as Marcasactivo[]));
 }


  // metodo para guardar nueva marca de activo
  public guardarMarcasActivo(marcaActivo: Marcasactivo): Observable<Marcasactivo> {
    return this.http.post<Marcasactivo>(this.globalservice.getUrlBackEnd() + 'guardarMarcasActivo', marcaActivo, httpOptions)
    .pipe(map(data => data as Marcasactivo ));
  }

   // metodo para editar  marca de activo
   public editarMarcaActivo(marcaActivo: Marcasactivo): Observable<Marcasactivo> {
    return this.http.post<Marcasactivo>(this.globalservice.getUrlBackEnd() + 'editarMarcaActivo', marcaActivo, httpOptions)
    .pipe(map(data => data as Marcasactivo ));
  }


   // metodo para eliminar marca de activo
   public eliminarMarcaActivo(marcaActivo: Marcasactivo): Observable<Marcasactivo> {
    return this.http.post<Marcasactivo>(this.globalservice.getUrlBackEnd() + 'eliminarMarcaActivo', marcaActivo, httpOptions)
    .pipe(map(data => data as Marcasactivo ));
  }
 
 
}
