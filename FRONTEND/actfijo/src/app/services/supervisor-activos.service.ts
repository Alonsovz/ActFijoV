import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActfijoGestion } from '../models/actfijo-gestion';
import { Usuario } from '../models/usuario';
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
export class SupervisorActivosService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }
  
//metodo para obtener altas de activos para supervisores
public getAltasSupervisor(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getAltasSupervisor', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

//metodo para obtener traslados de activos para supervisores
public getTrasladosSupervisor(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosSupervisor', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

//metodo para obtener bajas de activos para supervisores
public getBajasSupervisor(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getBajasSupervisor', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

  //metodo para obtener conteo de badges en vista de supervisor
public getConteoSupervisor(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getConteoSupervisor', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

  //metodo para obtener conteo de badges en vista de supervisor
  public getConteoSupervisorActivos(usuario): Observable<ActfijoGestion[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'getConteoSupervisorActivos', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
  }


  //metodo para obtener altas de activos para supervisores
public getAltasSupervisorActivos(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getAltasSupervisorActivos', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

//metodo para obtener traslados de activos para supervisores
public getTrasladosSupervisorActivos(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosSupervisorActivos', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

//metodo para obtener bajas de activos para supervisores
public getBajasSupervisorActivos(usuario): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getBajasSupervisorActivos', usuario, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

  
}
