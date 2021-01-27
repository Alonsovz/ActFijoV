import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Modelosactivo } from '../models/modelosactivo';
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
export class ModelosactivoService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }

  //metodo para obtener objeto de datos para tabla
  public getModelosActivo(): Observable<Modelosactivo[]> {
   return this.http.get(this.globalservice.getUrlBackEnd() + 'getModelosActivo').pipe(map(data => data as Modelosactivo[]));
 }


 // metodo para guardar nueva marca de activo
 public guardarModelosActivo(modeloActivo: Modelosactivo): Observable<Modelosactivo> {
  return this.http.post<Modelosactivo>(this.globalservice.getUrlBackEnd() + 'guardarModelosActivo', modeloActivo, httpOptions)
  .pipe(map(data => data as Modelosactivo ));
}

 // metodo para editar  marca de activo
 public editarModeloActivo(modeloActivo: Modelosactivo): Observable<Modelosactivo> {
  return this.http.post<Modelosactivo>(this.globalservice.getUrlBackEnd() + 'editarModelosActivo', modeloActivo, httpOptions)
  .pipe(map(data => data as Modelosactivo ));
}


 // metodo para eliminar marca de activo
 public eliminarModeloActivo(modeloActivo: Modelosactivo): Observable<Modelosactivo> {
  return this.http.post<Modelosactivo>(this.globalservice.getUrlBackEnd() + 'eliminarModelosActivo', modeloActivo, httpOptions)
  .pipe(map(data => data as Modelosactivo ));
}


  //metodo para obtener objeto de modelos por marca
  public getModelosByMarca(modeloActivo): Observable<Modelosactivo[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'getModelosByMarca', modeloActivo, httpOptions).pipe(map(data => data as Modelosactivo[]));
  }

}
