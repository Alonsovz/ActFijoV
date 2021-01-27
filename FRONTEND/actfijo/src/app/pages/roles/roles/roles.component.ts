import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import notie from 'notie';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarCardRoles = false;

  mostrarTablaCarga = false;
  mostrarSkeleton = true;
 
  objRoles : Rol[];
  rolEdit: Rol = new Rol();
  agregarRolForm : FormGroup;
  editarRolForm : FormGroup;

  listOfData: ReadonlyArray<Rol> = [];
  listOfCurrentPageData: ReadonlyArray<Rol> = [];


  constructor(private rol: RolService) {
    this.agregarRolForm = new FormGroup({
      'nombreRol' : new FormControl('',[Validators.required]),

    });

    this.editarRolForm = new FormGroup({
      'id' : new FormControl('',[Validators.required]),
      'rol' : new FormControl('',[Validators.required]),
    });
   }

  ngOnInit(): void {
    this.rol.getRoles().subscribe(
      data => {
        this.listOfData = data; 
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
  }

   //metodo para mostrar card para agregar usuario y traer objeto para llenado de tabla de lista de usuario
   showCardListado() : void{
    this.mostrarTablaCarga = false;
    this.mostrarCardAgregar = false;
    this.mostrarCardListado = true;
    this.mostrarCardEditar = false;

    this.mostrarSkeleton = true;

    this.rol.getRoles().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarCardListado = true;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
        
        this.mostrarCardAgregar = false;
        this.mostrarCardEditar = false;
      });

  
  }

  //metodo para mostrar card para agregar usuario y traer objeto para llenado de select
  showCardAgregar() : void{
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.agregarRolForm.reset();
  }

  //metodo para guardar usuario 

  guardarRol(){
    let datosRol : Rol = new Rol();

    datosRol = this.agregarRolForm.value;

    this.rol.guardarRol(datosRol).subscribe(
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
            text: 'Rol guardado con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
       
    
    );
  }

  //metodo para eliminar rol 

  eliminarRol(rol){
    this.mostrarTablaCarga = false;
    this.mostrarSkeleton = true;
    this.rol.eliminarRol(rol).subscribe(
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
            text: 'Rol eliminado con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });

          this.rol.getRoles().subscribe(
            data => {
              this.listOfData = data;
              this.mostrarTablaCarga = true;
              this.mostrarSkeleton = false;
            });
        }
       
    
    );
  }

   //metodo para despeglar card de edición de rol
   editarRolCard(rol){
    this.mostrarCardEditar = true;
    this.mostrarCardListado = false;
    this.mostrarCardAgregar = false;
    this.rolEdit = rol;
  }


  //metodo para cancelar edicion de datos de rol
  cancelarEdicionRol(){
    this.mostrarCardEditar = false;
    this.mostrarCardListado = true;
  }


   //metodo para guardar cambios de edición de rol
   guardarEdicionRol(){
    let datosRol : Rol = new Rol();

    datosRol = this.editarRolForm.value;

    this.rol.editarRol(datosRol).subscribe(
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

 
  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Rol>) {
    this.listOfCurrentPageData  = listOfCurrentPageData;

  }

}
