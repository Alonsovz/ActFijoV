import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import notie from 'notie';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  //mostrarModalAgregar = false;

  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarCardRoles = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  
  objUsuarios : Usuario[];
  objUsuariosTbl : Usuario[];
  objRoles : Rol[];
  usuarioEdit: Usuario = new Usuario();

  agregarUsuarioForm : FormGroup;
  editarUsuarioForm : FormGroup;
  constructor(private usuario: UsuariosService) { 
    this.agregarUsuarioForm = new FormGroup({
      'usuario' : new FormControl(''),
      'rol' : new FormControl(''),

    });

    this.editarUsuarioForm = new FormGroup({
      'idUsuarioRol': new FormControl(''),
      'nombre' : new FormControl(''),
      'idRol' : new FormControl(''),

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
    this.mostrarCardEditar = false;
    this.editarUsuarioForm.reset();
  }



  //metodo para mostrar card para agregar usuario y traer objeto para llenado de tabla de lista de usuario
  showCardListado() : void{
    this.mostrarCardAgregar = false;
    this.agregarUsuarioForm.reset();
    this.editarUsuarioForm.reset();

    this.mostrarSkeleton = true;

    this.usuario.getUsuariosTbl().subscribe(
      data => {
        this.objUsuariosTbl = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
        this.mostrarCardListado = true;
        this.mostrarCardAgregar = false;
        this.mostrarCardEditar = false;
      });

  
  }


  //metodo para guardar usuario 

  guardarUsuario(){
    let datosUsuario : Usuario = new Usuario();

    datosUsuario = this.agregarUsuarioForm.value;

    this.usuario.guardarUsuario(datosUsuario).subscribe(
      response => {
       
      },
      err => {
        notie.alert({ 
          type: 'error', 
          text: 'Error al guardar datos!',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      },
      () => {
       
          notie.alert({ 
            type: 'success', 
            text: 'Usuario guardado con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
       
    
    );
  }

//metodo para eliminar usuario 

  eliminarUsuario(usuario){
    this.mostrarTablaCarga = false;
    this.mostrarSkeleton = true;
    this.usuario.eliminarUsuario(usuario).subscribe(
      response => {
       
      },
      err => {
        notie.alert({ 
          type: 'error', 
          text: 'Error al eliminar datos!',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      },
      () => {
       
          notie.alert({ 
            type: 'success', 
            text: 'Usuario eliminado con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });

          this.usuario.getUsuariosTbl().subscribe(
            data => {
              this.objUsuariosTbl = data;
              this.mostrarTablaCarga = true;
              this.mostrarSkeleton = false;
            });
        }
       
    
    );
  }

  //metodo para despeglar card de edición de usuario
  editarUsuarioCard(usuario){
    this.mostrarCardEditar = true;
    this.mostrarCardListado = false;
    this.mostrarCardAgregar = false;
    this.usuarioEdit = usuario;
  }


  //metodo para cancelar edicion de datos de usuario
  cancelarEdicionUsuario(){
    this.mostrarCardEditar = false;
    this.mostrarCardListado = true;
  }


  //metodo para guardar cambios de edición de usuario
  guardarEdicionUsuario(){
    let datosUsuario : Usuario = new Usuario();

    datosUsuario = this.editarUsuarioForm.value;

    this.usuario.editarUsuario(datosUsuario).subscribe(
      response => {
       
      },
      err => {
        notie.alert({ 
          type: 'error', 
          text: 'Error al guardar datos!',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      },
      () => {
       
          notie.alert({ 
            type: 'success', 
            text: 'Datos modificados con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
       
    
    );
  }

   //metodo para mostrar card Roles

   showCardListadoRoles(){
    this.mostrarCardAgregar = false;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.mostrarCardRoles = true;
  }
}
