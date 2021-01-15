import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: Usuario = new Usuario();
  isusuarioLogueado$ : Observable<Usuario>;
  
  constructor( private router: Router, private usuarioservice : UsuariosService,
    private crf: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(localStorage.getItem('usuario') !== null){
    
        this.user = JSON.parse(localStorage.getItem("usuario"));
  
    }
  }


    
  public cerrarSesion() {

    this.usuarioservice.loggedIn.next(false);
     localStorage.clear();
     this.router.navigate(['login']);
   }
 
}
