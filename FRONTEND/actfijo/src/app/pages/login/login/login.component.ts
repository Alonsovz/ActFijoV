import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import notie from 'notie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm : FormGroup;
  usuariosesion: Usuario = new Usuario();
  submitted = false;
  
  constructor(private usuarioservice: UsuariosService, private router: Router) {
    this.validateForm = new FormGroup({
      'correo' : new FormControl(''),
      'password' : new FormControl(''),

    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    
  }

  validarCredenciales() {
    let datosUsuario : Usuario = new Usuario();

    datosUsuario = this.validateForm.value;

    this.usuarioservice.login(datosUsuario).subscribe(
      response => {
        this.usuariosesion = response;
        localStorage.setItem('usuario', JSON.stringify(this.usuariosesion));
       
      },
      err => {
       
      },
      () => {
        let obj = this.usuariosesion;


        if( Object.keys(obj).length === 0){

          notie.alert({ 
            type: 'error', 
            text: 'Error al validar credenciales!',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        }else{
          
          this.router.navigate(['dashboard/actfijoGestion']);
        
        }
       
      },
    );
  }

}
