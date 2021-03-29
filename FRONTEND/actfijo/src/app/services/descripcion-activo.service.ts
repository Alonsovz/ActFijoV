import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bodegas } from '../models/bodegas';
import { DescripcionActivo } from '../models/descripcion-activo';
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
export class DescripcionActivoService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  
    //metodo para obtener objeto de datos para descricpiones de activo
    public getDescActivos(): Observable<DescripcionActivo[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getDescActivos').pipe(map(data => data as DescripcionActivo[]));
    }


      // metodo para guardar nueva descripcion de activo
    
      public guardarDescActivo(clasificacion: DescripcionActivo): Observable<DescripcionActivo> {
        return this.http.post<DescripcionActivo>(this.globalservice.getUrlBackEnd() + 'guardarDescActivo', clasificacion, httpOptions)
        .pipe(map(data => data as DescripcionActivo ));
      }


      public guardarEdicionDescActivo(clasificacion: DescripcionActivo): Observable<DescripcionActivo> {
        return this.http.post<DescripcionActivo>(this.globalservice.getUrlBackEnd() + 'guardarEdicionDescActivo', clasificacion, httpOptions)
        .pipe(map(data => data as DescripcionActivo ));
      }
      public eliminarDescActivo(clasificacion: DescripcionActivo): Observable<DescripcionActivo> {
        return this.http.post<DescripcionActivo>(this.globalservice.getUrlBackEnd() + 'eliminarDescActivo', clasificacion, httpOptions)
        .pipe(map(data => data as DescripcionActivo ));
      }

      
      
}
