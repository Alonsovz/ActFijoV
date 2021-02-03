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
export class ActfijoGestionService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  //metodo para obtener objeto de centro de costos de bien VNR
  public getCCostoBien(): Observable<ActfijoGestion[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getCCostoBien').pipe(map(data => data as ActfijoGestion[]));
 }

 //metodo para obtener objeto de bodegas
 public getBodegas(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getBodegas').pipe(map(data => data as ActfijoGestion[]));
}

 //metodo para obtener objeto de proveedores
 public getProveedores(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getProveedores').pipe(map(data => data as ActfijoGestion[]));
}
 //metodo para obtener objeto de tipo de partida
 public getTipoPartida(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getTipoPartida').pipe(map(data => data as ActfijoGestion[]));
}


//metodo para obtener objeto de departamentos
public getDepartamentos(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getDepartamentos').pipe(map(data => data as ActfijoGestion[]));
}


//metodo para obtener objeto de municipios por departamento
public getMunicipios(departamento): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getMunicipios', departamento, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}

//metodo para obtener cuenta contable asociada al codigo tipo acitvo PPYE
public getCuentaContablePPYE(tipoActivo): Observable<ActfijoGestion[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getCuentaContablePPYE', tipoActivo, httpOptions).pipe(map(data => data as ActfijoGestion[]));
}


//metodo para obtener objeto de sucursales para ubicación física
public getUbicacionFisica(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getUbicacionFisica').pipe(map(data => data as ActfijoGestion[]));
}


  // metodo para guardar alta de activo
  public guardarAltaActivo(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
    return this.http.post<ActfijoGestion>(this.globalservice.getUrlBackEnd() + 'guardarAltaActivo', activoDatos, httpOptions)
    .pipe(map(data => data as ActfijoGestion ));
  }


  //metodo para obtener listado de activos
public getActivosAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getActivosAdmin').pipe(map(data => data as ActfijoGestion[]));
}



//metodo para obtener objeto de actibos por usuario
public getMisActivos(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getMisActivos', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}


// metodo para guardar activación de activo
public guardarActivacionActivo(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
  return this.http.post<ActfijoGestion>(this.globalservice.getUrlBackEnd() + 'guardarActivacionActivo', activoDatos, httpOptions)
  .pipe(map(data => data as ActfijoGestion ));
}

  //metodo para obtener datos de activo por ID

  public getHistorialActivo(activoDatos): Observable<ActfijoGestion[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'getHistorialActivo', activoDatos, httpOptions).pipe(map(data => data as ActfijoGestion[]));
  }

  // metodo para guardar edición de activo
  public guardarEdicionActivo(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
    return this.http.post<ActfijoGestion>(this.globalservice.getUrlBackEnd() + 'guardarEdicionActivo', activoDatos, httpOptions)
    .pipe(map(data => data as ActfijoGestion ));
  }

}