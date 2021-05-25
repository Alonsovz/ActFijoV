import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reportes } from '../models/reportes';
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
export class ReportesActivosService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  //metodo para obtener objeto de municipios por departamento
public getCuadroDepreciacionFinancieraMensual(periodo): Observable<Reportes[]> {
  return this.http.post(this.globalservice.getUrlBackEnd() + 'getCuadroDepreciacionFinancieraMensual', periodo, httpOptions).pipe(map(data => data as Reportes[]));
}

  //metodo para obtener objeto de municipios por departamento
  public getCuadroDepreciacionFiscalMensual(periodo): Observable<Reportes[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'getCuadroDepreciacionFiscalMensual', periodo, httpOptions).pipe(map(data => data as Reportes[]));
  }

   //metodo para obtener objeto de municipios por departamento
   public getDatosCuadroFiscal(periodo): Observable<Reportes[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'getDatosCuadroFiscal', periodo, httpOptions).pipe(map(data => data as Reportes[]));
  }

  


  
  //metodo para obtener objeto de municipios por departamento
  public generarReporteAGD(periodo): Observable<Reportes[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'generarReporteAGD', periodo, httpOptions).pipe(map(data => data as Reportes[]));
  }


  
  //metodo para obtener objeto de municipios por departamento
  public exportar_excel_fiscal(periodo): Observable<Reportes[]> {
    return this.http.post(this.globalservice.getUrlBackEnd() + 'exportar_excel_fiscal', periodo, httpOptions).pipe(map(data => data as Reportes[]));
  }

  
}
