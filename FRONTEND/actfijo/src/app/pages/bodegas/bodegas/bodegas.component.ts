import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bodegas } from 'src/app/models/bodegas';
import { Usuario } from 'src/app/models/usuario';
import { BodegasService } from 'src/app/services/bodegas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import notie from 'notie';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.scss']
})
export class BodegasComponent implements OnInit {
  texto: any;
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;

  listOfData: ReadonlyArray<Bodegas> = [];
  listOfCurrentPageData: ReadonlyArray<Bodegas> = [];
  asignarSupervisorForm: FormGroup;
  bodegaEdit : Bodegas = new Bodegas();
  objUsuarios : Usuario[];


  constructor(private bodegasService: BodegasService,
    private usuario: UsuariosService) {
    this.asignarSupervisorForm = new FormGroup({
      'nombre' : new FormControl('',[Validators.required]),
      'idUsuario' : new FormControl('',[Validators.required]),
      'idBodega': new FormControl('',[Validators.required]),    
    });
   }
  

  ngOnInit(): void {

    this.bodegasService.getBodegasSupervisor().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
      this.usuario.getUsuarios().subscribe(data => {this.objUsuarios = data;});
  }


  //modal para asginar supervisor a bodega
  asignarSupervisor(obj){
    this.mostrarCardEditar = true;
    this.mostrarCardListado = false;
    this.mostrarCardAgregar = false;
    this.bodegaEdit = obj;
  }


  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Bodegas>) {
    this.listOfCurrentPageData  = listOfCurrentPageData;
  
  }
  
  _texto:string;
  ConvertToLower(evt) {
      this.texto = evt.toLowerCase();
  }

  cancelarAsignarSupervisor(){
    this.mostrarCardEditar = false;
    this.mostrarCardListado = true;
  }


  guardarSupervisorBodega(){
    let datosBodega : Bodegas = new Bodegas();

    datosBodega = this.asignarSupervisorForm.value;
  
    this.bodegasService.guardarSupervisorBodega(datosBodega).subscribe(
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

     //metodo para mostrar card para ver tabla de Clasificacion AGD
     showCardListado() : void{
      this.mostrarTablaCarga = false;
      this.mostrarCardAgregar = false;
      this.mostrarCardListado = true;
      this.mostrarCardEditar = false;
    
      this.mostrarSkeleton = true;
    
    this.bodegasService.getBodegasSupervisor().subscribe(
        data => {
          this.listOfData = data;
          this.mostrarCardAgregar = false;
          this.mostrarCardEditar = false;
          this.mostrarSkeleton = false;
          this.mostrarCardListado = true;
          this.mostrarTablaCarga = true;
        });
  
  }
}
