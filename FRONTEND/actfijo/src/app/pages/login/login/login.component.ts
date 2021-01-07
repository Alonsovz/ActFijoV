import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
       
       
      },
    );
  }

}
