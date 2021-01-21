import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClasificacionAgd } from '../models/clasificacion-agd';
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
export class ClasficacionAgdService {

  
  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


    //metodo para obtener objeto de datos para tabla
    public getClasificacionesAgd(): Observable<ClasificacionAgd[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getClasificacionesAgd').pipe(map(data => data as ClasificacionAgd[]));
    }
   
   
    // metodo para guardar nueva clasficacion AGD
    public guardarClasificacionAgd(clasificacion: ClasificacionAgd): Observable<ClasificacionAgd> {
     return this.http.post<ClasificacionAgd>(this.globalservice.getUrlBackEnd() + 'guardarClasificacionAgd', clasificacion, httpOptions)
     .pipe(map(data => data as ClasificacionAgd ));
   }
   
    // metodo para editar  clasficacion AGD
    public editarClasificacionAgd(clasificacion: ClasificacionAgd): Observable<ClasificacionAgd> {
     return this.http.post<ClasificacionAgd>(this.globalservice.getUrlBackEnd() + 'editarClasificacionAgd', clasificacion, httpOptions)
     .pipe(map(data => data as ClasificacionAgd ));
   }
   
   
    // metodo para eliminar clasficacion AGD
    public eliminarClasificacionAgd(clasificacion: ClasificacionAgd): Observable<ClasificacionAgd> {
     return this.http.post<ClasificacionAgd>(this.globalservice.getUrlBackEnd() + 'eliminarClasificacionAgd', clasificacion, httpOptions)
     .pipe(map(data => data as ClasificacionAgd ));
   }
}
