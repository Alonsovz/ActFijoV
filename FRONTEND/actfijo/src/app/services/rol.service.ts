import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from '../models/rol';
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
export class RolService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

   //metodo para obtener objeto de datos para tabla
   public getRoles(): Observable<Rol[]> {
    return this.http.get(this.globalservice.getUrlBackEnd() + 'getRoles').pipe(map(data => data as Rol[]));
  }

  // metodo para guardar nuevo rol
  public guardarRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.globalservice.getUrlBackEnd() + 'guardarRol', rol, httpOptions)
    .pipe(map(data => data as Rol ));
  }


  // metodo para guardar nuevo rol
  public eliminarRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.globalservice.getUrlBackEnd() + 'eliminarRol', rol, httpOptions)
    .pipe(map(data => data as Rol ));
  }

   // metodo para editaro rol
   public editarRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.globalservice.getUrlBackEnd() + 'editarRol', rol, httpOptions)
    .pipe(map(data => data as Rol ));
  }

  
}
