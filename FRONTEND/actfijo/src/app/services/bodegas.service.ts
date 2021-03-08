import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bodegas } from '../models/bodegas';
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
export class BodegasService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

    //metodo para obtener objeto de datos para tabla
    public getBodegasSupervisor(): Observable<Bodegas[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getBodegasSupervisor').pipe(map(data => data as Bodegas[]));
    }

  // metodo para guardar bodega
  public guardarSupervisorBodega(bodega: Bodegas): Observable<Bodegas> {
    return this.http.post<Bodegas>(this.globalservice.getUrlBackEnd() + 'guardarSupervisorBodega', bodega, httpOptions)
    .pipe(map(data => data as Bodegas ));
  }
    

}
