import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DescripcionActivo } from 'src/app/models/descripcion-activo';
import { DescripcionActivoService } from 'src/app/services/descripcion-activo.service';
import notie from 'notie';

@Component({
  selector: 'app-descripcion-activo',
  templateUrl: './descripcion-activo.component.html',
  styleUrls: ['./descripcion-activo.component.scss']
})
export class DescripcionActivoComponent implements OnInit {

  texto: any;
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  agregarDescripcionActivoForm: FormGroup;
  editarDescripcionActivoForm : FormGroup;

  listOfData: ReadonlyArray<DescripcionActivo> = [];
  listOfCurrentPageData: ReadonlyArray<DescripcionActivo> = [];

  descActivo: DescripcionActivo = new DescripcionActivo();

  constructor( private descActivosService : DescripcionActivoService) {
    this.agregarDescripcionActivoForm = new FormGroup({
      'nombre' : new FormControl('',[Validators.required]),
    });

    this.editarDescripcionActivoForm = new FormGroup({
      'idDesc' : new FormControl('',[Validators.required]),
      'nombre' : new FormControl('',[Validators.required]),
    });
   }

  ngOnInit(): void {

    this.descActivosService.getDescActivos().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
  }

      //metodo para mostrar card para agregar descripcion de activo

      showCardAgregar() : void{
    
        this.mostrarCardAgregar = true;
        this.mostrarCardListado = false;
        this.mostrarCardEditar = false;
        this.agregarDescripcionActivoForm.reset();
      }
    
      //metodo para mostrar card para ver tabla de descripcion de activo
      showCardListado() : void{
      this.mostrarTablaCarga = false;
      this.mostrarCardAgregar = false;
      this.mostrarCardListado = true;
      this.mostrarCardEditar = false;
    
      this.mostrarSkeleton = true;
  
        
    this.descActivosService.getDescActivos().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarCardAgregar = false;
        this.mostrarCardEditar = false;
        this.mostrarSkeleton = false;
        this.mostrarCardListado = true;
        this.mostrarTablaCarga = true;
      });
    
    }


    
onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<DescripcionActivo>) {
  this.listOfCurrentPageData  = listOfCurrentPageData;

}

_texto:string;
ConvertToLower(evt) {
    this.texto = evt.toLowerCase();
}


  //metodo para guardar descripcion de activo 

  guardarDescActivo(){
    let datos : DescripcionActivo = new DescripcionActivo();
  
    datos = this.agregarDescripcionActivoForm.value;
  
    this.descActivosService.guardarDescActivo(datos).subscribe(
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
            text: 'Descripción de activo guardada con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
       
    
    );
  }




   //metodo para despeglar card de edición de descripcion de activo
 editarDescActivo(obj){
  this.mostrarCardEditar = true;
  this.mostrarCardListado = false;
  this.mostrarCardAgregar = false;
  this.descActivo = obj;
}


 //metodo para cancelar edicion de datos de descripcion de activo
 cancelarEdicionDescActivo(){
  this.mostrarCardEditar = false;
  this.mostrarCardListado = true;
}



 //metodo para guardar cambios de edición de descripcion de activo
 guardarEdicionDescActivo(){
  let datos : DescripcionActivo = new DescripcionActivo();

  datos = this.editarDescripcionActivoForm.value;

  this.descActivosService.guardarEdicionDescActivo(datos).subscribe(
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



 //metodo para eliminar tipo de bien VNR

 eliminarDescActivo(obj){
  this.mostrarTablaCarga = false;
  this.mostrarSkeleton = true;
  this.descActivosService.eliminarDescActivo(obj).subscribe(
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
          text: 'Datos eliminados con éxito',
          stay: false,
          time: 2, 
          position: 'top' 
        });

        this.descActivosService.getDescActivos().subscribe(
          data => {
            this.listOfData = data;
            this.mostrarTablaCarga = true;
            this.mostrarSkeleton = false;
          });
      }
     
  
  );
}


}
