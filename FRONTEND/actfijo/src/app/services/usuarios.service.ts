import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })

};
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  public loggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public usuariologueado : BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(new Usuario());

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  get isusuarioLogueado(){
    return this.usuariologueado.asObservable();
  }

  constructor(private http: HttpClient, private router: Router, private globalservice: GlobalService) { }


  // metodo para validar credenciales
  public login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.globalservice.getUrlBackEnd() + 'validarCredenciales', usuario, httpOptions)
    .pipe(map(data => data as Usuario ));
  }

  // metodo para cerrar sesion
  public cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
