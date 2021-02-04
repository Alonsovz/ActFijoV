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

  // metodo para iniciar la baja de un activo
  iniciarBaja(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
    return this.http.post<ActfijoGestion>(this.globalservice.getUrlBackEnd() + 'iniciarbajaactivo', activoDatos, httpOptions ).pipe(
      map(data => data as ActfijoGestion)
    );
  }


  // metodo para guardar edición de activo
  public guardarTraslado(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
    return this.http.post<ActfijoGestion>(this.globalservice.getUrlBackEnd() + 'guardarTraslado', activoDatos, httpOptions)
    .pipe(map(data => data as ActfijoGestion ));
  }

 // metodo para guardar aceptación de traslado de activo
 public guardarAceptacionTraslado(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
  return this.http.post<ActfijoGestion>(this.globalservice.getUrlBackEnd() + 'guardarAceptacionTraslado', activoDatos, httpOptions)
  .pipe(map(data => data as ActfijoGestion ));
}

// finalizar el proceso de baja por parte del administrador
finalizarProcesoBaja(activoDatos: ActfijoGestion): Observable<ActfijoGestion> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'finalizacionprocesobaja', activoDatos).pipe(
    map(data => data as ActfijoGestion)
  );
}


 //metodo para obtener listado de activos de altas para administrador
 public getAltasAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getAltasAdmin').pipe(map(data => data as ActfijoGestion[]));
}


 //metodo para obtener listado de activos de bajas para administrador
 public getBajasAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getBajasAdmin').pipe(map(data => data as ActfijoGestion[]));
}


 //metodo para obtener listado de activos de traslados para administrador
 public getTrasladosAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getTrasladosAdmin').pipe(map(data => data as ActfijoGestion[]));
}



 //metodo para obtener listado de activos de altas pendientes para administrador
 public getAltasPendientesAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getAltasPendientesAdmin').pipe(map(data => data as ActfijoGestion[]));
}


 //metodo para obtener listado de activos de bajas pendientes para administrador
 public getBajasPendientesAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getBajasPendientesAdmin').pipe(map(data => data as ActfijoGestion[]));
}


 //metodo para obtener listado de activos de traslados pendientes para administrador
 public getTrasladosPendientesAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getTrasladosPendientesAdmin').pipe(map(data => data as ActfijoGestion[]));
}

  //metodo para obtener conteo de badges en vista de administrador
 public getConteoAdmin(): Observable<ActfijoGestion[]> {
  return this.http.get(this.globalservice.getUrlBackEnd() + 'getConteoAdmin').pipe(map(data => data as ActfijoGestion[]));
}


//metodo para obtener objeto de altas por usuario
public getAltasUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getAltasUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}


//metodo para obtener objeto de bajas por usuario
public getBajasUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getBajasUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}

//metodo para obtener objeto de traslados recibido por usuario
public getTrasladosRecibidosUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosRecibidosUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}

//metodo para obtener objeto de traslados hecho por usuario
public getTrasladosHechosUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosHechosUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}

//metodo para obtener objeto de altas pendientes por usuario
public getAltasPendientesUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getAltasPendientesUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}


//metodo para obtener objeto de bajas pendientes por usuario
public getBajasPendientesUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getBajasPendientesUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}

//metodo para obtener objeto de traslados pendientes por usuario
public getTrasladosPendientesUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosPendientesUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}


//metodo para obtener objeto de altas por usuario
public getConteoUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getConteoUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}


//metodo para obtener objeto de traslados pendientes de recibir por usuario
public getTrasladosRecibidosPendientesUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosRecibidosPendientesUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}

//metodo para obtener objeto de traslados hechos pendientes de aceptación
public getTrasladosHechosPendientesUser(usuario): Observable<Usuario[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getTrasladosHechosPendientesUser', usuario, httpOptions).pipe(map(data => data as Usuario[]));
}


}
