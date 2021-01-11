import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  //mostrarModalAgregar = false;

  mostrarCardAgregar = false;
  mostrarCardListado = true;
  
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  agregarUsuarioForm : FormGroup;
  objUsuarios : Usuario[];
  objUsuariosTbl : Usuario[];
  objRoles : Rol[];

  constructor(private usuario: UsuariosService) { 
    this.agregarUsuarioForm = new FormGroup({
      'usuario' : new FormControl(''),
      'rol' : new FormControl(''),

    });
  }

  ngOnInit(): void {
    this.usuario.getRoles().subscribe(data => {this.objRoles = data;});
    this.usuario.getUsuariosTbl().subscribe(
      data => {
        this.objUsuariosTbl = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
  }

//metodo para mostrar card para agregar usuario y traer objeto para llenado de select
  showCardAgregar() : void{
    this.usuario.getUsuarios().subscribe(data => {this.objUsuarios = data;});
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
  }



  //metodo para mostrar card para agregar usuario y traer objeto para llenado de tabla de lista de usuario
  showCardListado() : void{
    this.mostrarCardAgregar = false;
    this.agregarUsuarioForm.reset();

    this.mostrarSkeleton = true;

    this.usuario.getUsuariosTbl().subscribe(
      data => {
        this.objUsuariosTbl = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
        this.mostrarCardListado = true;
        this.mostrarCardAgregar = false;
      });

  
  }



}
