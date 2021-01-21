import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoBienVnr } from '../models/tipo-bien-vnr';
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
export class TipoBienVnrService {

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


    //metodo para obtener objeto de datos para tabla
    public getTiposBienVnr(): Observable<TipoBienVnr[]> {
      return this.http.get(this.globalservice.getUrlBackEnd() + 'getTipoBienVNR').pipe(map(data => data as TipoBienVnr[]));
    }
   
   
    // metodo para guardar nueva tipo de bien
    public guardarTipoBienVnr(tipoBienVnr: TipoBienVnr): Observable<TipoBienVnr> {
     return this.http.post<TipoBienVnr>(this.globalservice.getUrlBackEnd() + 'guardarTipoBienVNR', tipoBienVnr, httpOptions)
     .pipe(map(data => data as TipoBienVnr ));
   }
   
    // metodo para editar  tipo de bien
    public editarTipoBienVnr(tipoBienVnr: TipoBienVnr): Observable<TipoBienVnr> {
     return this.http.post<TipoBienVnr>(this.globalservice.getUrlBackEnd() + 'editarTipoBienVNR', tipoBienVnr, httpOptions)
     .pipe(map(data => data as TipoBienVnr ));
   }
   
   
    // metodo para eliminar tipo de bien
    public eliminarTipoBienVnr(tipoBienVnr: TipoBienVnr): Observable<TipoBienVnr> {
     return this.http.post<TipoBienVnr>(this.globalservice.getUrlBackEnd() + 'eliminarTipoBienVNR', tipoBienVnr, httpOptions)
     .pipe(map(data => data as TipoBienVnr ));
   }
}
